import type { Palette, Rgb, StarBorderHover, StarBorderTheme } from './types';
export const ROOT_CLASS =
   'relative overflow-hidden isolate no-underline [-webkit-tap-highlight-color:transparent] disabled:cursor-not-allowed disabled:opacity-50';
export const CANVAS_CLASS =
   'pointer-events-none absolute top-[-48px] left-[-48px] -z-1 h-[calc(100%+96px)] w-[calc(100%+96px)]';
export const THEMES: Record<StarBorderTheme, Palette> = {
   dark: {
      light: '#ffffff',
      surface: '#0c0c0f',
      text: '#fafafa',
      track: 'rgba(255, 255, 255, 0.1)',
   },
   light: {
      light: '#18181b',
      surface: '#ffffff',
      text: '#18181b',
      track: 'rgba(24, 24, 27, 0.12)',
   },
};
export const BLEED = 48;
export const HOVERS: StarBorderHover[] = ['lap', 'brighten', 'reveal', 'none'];
export const LAP = 0.9;
export const PULSE_LIFE = 0.65;
export const MAX_PULSES = 4;
export const MAX_DUST = 48;
export const TAU = Math.PI * 2;
export const WHITE: Rgb = [255, 255, 255];
