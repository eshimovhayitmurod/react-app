import type {
   StatisticsByDistrict,
   StatisticsByRegion,
} from '@modules/Dashboard/types';
import type { TFunction } from 'i18next';
import { fmt } from '../../helpers';
import { CITY_KEYS, REGION_KEYS, TASHKENT_KEYS } from './constants';
import type { Line, Rect, Region, Rgb } from './types';
export const normalize = (s: string) =>
   s
      .toLowerCase()
      .replace(/[‘’ʻʼ`'ʹ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
export const getRegionCode = (name: string): string | null => {
   const n = normalize(name || '');
   if (TASHKENT_KEYS.some(k => n.includes(k))) {
      return CITY_KEYS.some(k => n.includes(k)) ? 'UZ-TK' : 'UZ-TO';
   }
   return (
      REGION_KEYS.find(([, keys]) => keys.some(k => n.includes(k)))?.[0] ?? null
   );
};
export const regionName = (
   t: TFunction<'dashboard'>,
   r: Pick<Region, 'code' | 'name'>,
   short = false,
) =>
   r.code
      ? t(`${short ? 'regions_short' : 'regions'}.${r.code}`, {
           defaultValue: r.name,
        })
      : r.name;
export const fmtLabel = (v: unknown) => fmt(Number(v));
export const mix = (a: number[], b: number[], k: number) =>
   'rgb(' + a.map((x, i) => Math.round(x + (b[i] - x) * k)).join(',') + ')';
export const mixRgb = (a: Rgb, b: Rgb, k: number) =>
   a.map((x, i) => Math.round(x + (b[i] - x) * k)).join(',');
export const sumCounts = (
   x: Pick<
      StatisticsByDistrict,
      'closed_count' | 'placed_count' | 'registered_count'
   >,
) =>
   (Number(x?.registered_count) || 0) +
   (Number(x?.placed_count) || 0) +
   (Number(x?.closed_count) || 0);
// API javobini ro'yxat uchun tayyor ko'rinishga keltiradi (kamayish tartibida)
// Yuklanish paytida yoki ma'lumot bo'lmasa hududlar 0 qiymat bilan ko'rsatiladi
export const placeholderRegions = (codes: string[]): Region[] =>
   codes.map(code => ({
      closed: 0,
      code,
      districts: [],
      id: code,
      name: '',
      placed: 0,
      registered: 0,
      value: 0,
   }));
export const toRegions = (data: unknown): Region[] => {
   const list: StatisticsByRegion[] = Array.isArray(data) ? data : [];
   return list
      .map(item => {
         const districts: StatisticsByDistrict[] = Array.isArray(
            item?.districts,
         )
            ? item.districts
            : [];
         return {
            closed: Number(item?.closed_count) || 0,
            code: getRegionCode(item?.region_name),
            id: String(item?.region_id),
            name: item?.region_name,
            placed: Number(item?.placed_count) || 0,
            registered: Number(item?.registered_count) || 0,
            value: sumCounts(item),
            districts: districts
               .map(district => ({
                  id: String(district?.district_id),
                  label: district?.district_name,
                  value: sumCounts(district),
               }))
               .sort((a, b) => b.value - a.value)
               .slice(0, 5),
         };
      })
      .sort((a, b) => b.value - a.value);
};
const near = (a: number, b: number) => Math.abs(a - b) < 0.5;
const sameRect = (a: Rect | null, b: Rect | null) =>
   a === b ||
   (!!a &&
      !!b &&
      near(a.l, b.l) &&
      near(a.t, b.t) &&
      near(a.r, b.r) &&
      near(a.b, b.b));
// O'lchamlar o'zgarmagan bo'lsa ConnectorLine qayta hisoblanmasligi uchun
export const sameLine = (a: Line | null, b: Line | null) =>
   a === b ||
   (!!a &&
      !!b &&
      a.k === b.k &&
      near(a.mx, b.mx) &&
      near(a.my, b.my) &&
      near(a.w, b.w) &&
      near(a.h, b.h) &&
      sameRect(a.row, b.row) &&
      sameRect(a.detail, b.detail));
