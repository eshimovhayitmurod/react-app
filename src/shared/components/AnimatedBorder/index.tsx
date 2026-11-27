import { useEffect, useMemo, useRef } from 'react';
import { CANVAS_CLASS, HOVERS, ROOT_CLASS, THEMES } from './constants';
import { createBorderEngine, type BorderEngine } from './engine';
import { clamp } from './helpers';
import type { AnimatedBorderProps, Settings } from './types';
export type {
   AnimatedBorderProps,
   StarBorderHover,
   StarBorderTheme,
} from './types';
const AnimatedBorder = <T extends React.ElementType = 'button'>({
   as,
   backgroundColor,
   borderColor,
   children,
   className = '',
   clickPulse = true,
   color = '#0066ff',
   direction = 'clockwise',
   duration = 5,
   glow = 0,
   hover = 'none',
   isActive = false,
   radius = 12,
   sparkle = false,
   stars = 2,
   style,
   textColor,
   theme = 'dark',
   thickness = 2,
   trailColor,
   trailLength = 0.3,
   ...rest
}: AnimatedBorderProps<T>) => {
   const tag = as || 'button';
   const Component = tag as unknown as React.FC<Record<string, unknown>>;
   const rootRef = useRef<HTMLElement>(null);
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const engineRef = useRef<BorderEngine | null>(null);
   const palette = THEMES[theme] ?? THEMES.dark;
   const light = color ?? palette.light;
   const settings = useMemo<Settings>(
      () => ({
         light: theme === 'light',
         color: light,
         trailColor: trailColor ?? light,
         duration: Math.max(0.3, duration),
         thickness: Math.max(0.5, thickness),
         radius: Math.max(0, radius),
         trailLength: clamp(trailLength, 0, 1),
         stars: clamp(Math.round(stars), 1, 6),
         glow: clamp(glow, 0, 1),
         sparkle,
         direction: direction === 'counterclockwise' ? -1 : 1,
         hover: HOVERS.includes(hover) ? hover : 'lap',
         isActive,
         clickPulse,
      }),
      [
         theme,
         light,
         trailColor,
         duration,
         thickness,
         radius,
         trailLength,
         stars,
         glow,
         sparkle,
         direction,
         hover,
         isActive,
         clickPulse,
      ],
   );
   const settingsRef = useRef(settings);
   settingsRef.current = settings;
   const rootStyle = useMemo(
      () =>
         ({
            '--star-border-radius': `${settings.radius}px`,
            '--star-border-thickness': `${settings.thickness}px`,
            '--star-border-surface': backgroundColor ?? palette.surface,
            '--star-border-text': textColor ?? palette.text,
            '--star-border-track': borderColor ?? palette.track,
            ...style,
         }) as React.CSSProperties,
      [
         settings.radius,
         settings.thickness,
         backgroundColor,
         textColor,
         borderColor,
         palette,
         style,
      ],
   );
   const clickable = tag === 'button' || tag === 'a';
   useEffect(() => {
      const root = rootRef.current;
      const canvas = canvasRef.current;
      if (!root || !canvas) return;
      const engine = createBorderEngine(
         root,
         canvas,
         () => settingsRef.current,
      );
      engineRef.current = engine;
      return () => {
         engine?.destroy();
         engineRef.current = null;
      };
   }, []);
   useEffect(() => {
      const engine = engineRef.current;
      if (!engine) return;
      if (!settings.isActive) engine.clear();
      engine.wake();
   }, [settings]);
   return (
      <Component
         className={`${ROOT_CLASS}${clickable ? ' cursor-pointer' : ''}${className ? ` ${className}` : ''}`}
         ref={rootRef}
         style={rootStyle}
         {...rest}
      >
         <canvas ref={canvasRef} className={CANVAS_CLASS} aria-hidden='true' />
         {children}
      </Component>
   );
};
export default AnimatedBorder;
