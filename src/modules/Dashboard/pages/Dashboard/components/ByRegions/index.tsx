import DashboardService from '@modules/Dashboard/services';
import { RootStateType } from '@shared/store';
import axios, { AxiosResponse } from 'axios';
import {
   Fragment,
   useCallback,
   useEffect,
   useLayoutEffect,
   useMemo,
   useRef,
   useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ConnectorLine, { type Hit } from './ConnectorLine';
import { CYCLE_MS, DARK, LIGHT, MAP_CODES, type Palette } from './constants';
import { placeholderRegions, sameLine, toRegions } from './helpers';
import RegionDetail from './RegionDetail';
import RegionList from './RegionList';
import RegionMap from './RegionMap';
import { splash } from './splash';
import type { Line, Rect, Region } from './types';
const ByRegions = () => {
   const { t, i18n } = useTranslation(['dashboard', 'common']);
   const language = i18n.language;
   const dark = useSelector(
      (state: RootStateType) => state?.ui?.theme === 'dark',
   );
   const c: Palette = dark ? DARK : LIGHT;
   const [data, setRegions] = useState<Region[]>([]);
   const [loading, setLoading] = useState(true);
   const placeholders = useMemo(() => placeholderRegions(MAP_CODES), []);
   const regions = data.length ? data : placeholders;
   useEffect(() => {
      const controller = new AbortController();
      const options = {
         signal: controller.signal,
         onEnd: () => setLoading(false),
         onError: (error: unknown) => {
            if (!axios.isCancel(error)) setRegions([]);
         },
         onStart: () => setLoading(true),
         onSuccess: (response: AxiosResponse) =>
            setRegions(toRegions(response?.data)),
      };
      DashboardService.getStatisticsByRegions(options);
      return () => controller.abort();
   }, [language]);
   const total = useMemo(
      () => regions.reduce((s, r) => s + r.value, 0),
      [regions],
   );
   const count = regions.length;
   const countRef = useRef(count);
   countRef.current = count;
   const boxRef = useRef<HTMLDivElement>(null);
   const detailRef = useRef<HTMLDivElement>(null);
   const hovering = useRef(false);
   const markerRef = useRef<SVGCircleElement>(null);
   const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
   const timer = useRef<number | undefined>(undefined);
   const [activeState, setActive] = useState(0);
   const active = activeState < count ? activeState : 0;
   const [line, setLine] = useState<Line | null>(null);
   const [paused, setPaused] = useState(false);
   const pausedRef = useRef(paused);
   pausedRef.current = paused;
   const startTimer = useCallback(() => {
      window.clearInterval(timer.current);
      timer.current = window.setInterval(() => {
         const n = countRef.current;
         if (!hovering.current && n) setActive(a => (a + 1) % n);
      }, CYCLE_MS);
   }, []);
   const pick = useCallback(
      (i: number) => {
         const n = countRef.current;
         if (!n) return;
         setActive(((i % n) + n) % n);
         if (!hovering.current && !pausedRef.current) startTimer();
      },
      [startTimer],
   );
   const hoverStart = useCallback((i: number) => {
      hovering.current = true;
      window.clearInterval(timer.current);
      setActive(i);
   }, []);
   const hoverEnd = useCallback(() => {
      if (!hovering.current) return;
      hovering.current = false;
      if (!pausedRef.current) startTimer();
   }, [startTimer]);
   const togglePause = useCallback(() => setPaused(v => !v), []);
   const splashes = useRef<Animation[]>([]);
   const stopSplashes = useCallback(() => {
      splashes.current.forEach(a => a.cancel());
      splashes.current = [];
   }, []);
   const onHit = useCallback(
      (hits: Hit[]) => {
         stopSplashes();
         const targets = [
            rowRefs.current[active],
            detailRef.current?.firstElementChild,
         ];
         hits.forEach(({ rect, at }, i) => {
            const el = targets[i];
            if (!(el instanceof HTMLElement)) return;
            splashes.current.push(
               ...splash(el, [at[0] - rect.l, at[1] - rect.t], dark),
            );
         });
      },
      [active, dark, stopSplashes],
   );
   const measure = useCallback(() => {
      stopSplashes();
      const box = boxRef.current,
         marker = markerRef.current,
         row = rowRefs.current[active];
      if (!box || !marker || !row) {
         setLine(prev => (prev ? null : prev));
         return;
      }
      const b = box.getBoundingClientRect();
      const k = box.offsetWidth ? b.width / box.offsetWidth : 1;
      const X = (v: number) => (v - b.left) / k;
      const Y = (v: number) => (v - b.top) / k;
      const m = marker.getBoundingClientRect(),
         r = row.getBoundingClientRect();
      const rect = (el: DOMRect): Rect => ({
         l: X(el.left),
         t: Y(el.top),
         r: X(el.right),
         b: Y(el.bottom),
      });
      const detail = detailRef.current
         ? rect(detailRef.current.getBoundingClientRect())
         : null;
      const next: Line = {
         mx: X(m.left + m.width / 2),
         my: Y(m.top + m.height / 2),
         row: rect(r),
         detail,
         w: box.offsetWidth,
         h: box.offsetHeight,
         k: active,
      };
      setLine(prev => (sameLine(prev, next) ? prev : next));
   }, [active, regions, stopSplashes]);
   const measureRef = useRef(measure);
   measureRef.current = measure;
   useEffect(() => {
      if (paused) window.clearInterval(timer.current);
      else startTimer();
      return () => window.clearInterval(timer.current);
   }, [paused, startTimer]);
   useLayoutEffect(() => {
      measure();
   }, [measure]);
   useEffect(() => {
      const box = boxRef.current;
      if (!box) return;
      let frame = 0;
      const run = () => {
         if (frame) return;
         frame = requestAnimationFrame(() => {
            frame = 0;
            measureRef.current();
         });
      };
      const ro = new ResizeObserver(run);
      ro.observe(box);
      window.addEventListener('resize', run);
      const t = window.setTimeout(run, 400);
      return () => {
         ro.disconnect();
         window.removeEventListener('resize', run);
         window.clearTimeout(t);
         cancelAnimationFrame(frame);
      };
   }, []);
   return (
      <Fragment>
         <section
            aria-label={t('by_regions_label')}
            className='relative grid grid-cols-4 gap-4'
            ref={boxRef}
         >
            <RegionList
               active={active}
               loading={loading}
               onHoverEnd={hoverEnd}
               onHoverStart={hoverStart}
               onPick={pick}
               regions={regions}
               rowRefs={rowRefs}
            />
            <RegionMap
               active={active}
               c={c}
               loading={loading}
               markerRef={markerRef}
               onHoverEnd={hoverEnd}
               onHoverStart={hoverStart}
               onPick={pick}
               onTogglePause={togglePause}
               paused={paused}
               regions={regions}
            />
            <RegionDetail
               active={active}
               c={c}
               detailRef={detailRef}
               loading={loading}
               onPick={pick}
               regions={regions}
               total={total}
            />
            {line && line.k === active && (
               <ConnectorLine
                  dark={dark}
                  key={active}
                  line={line}
                  onHit={onHit}
                  track={c.track}
               />
            )}
         </section>
      </Fragment>
   );
};
export default ByRegions;
