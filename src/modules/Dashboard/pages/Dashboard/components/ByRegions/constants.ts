import { GEO } from './geo';
export const LIGHT = {
   surface: '#FFFFFF',
   track: '#E2E7EE',
   strong: '#CFD7E2',
   chip: '#EDF1F6',
   text: '#0A0E14',
   text2: '#3D4757',
   s1: '#2F6FEB',
   s2: '#EB6834',
   s3: '#1BAF7A',
   unk: '#A7B1BE',
   hl: '#2F6FEB',
   seqLo: [228, 233, 240],
   levels: ['#0b8a5f', '#f5a524', '#d23048'],
};
export const DARK: typeof LIGHT = {
   surface: '#121822',
   track: '#232D3B',
   strong: '#2E3A4B',
   chip: '#1E2733',
   text: '#E8EDF4',
   text2: '#A3AFBF',
   s1: '#3987E5',
   s2: '#D95926',
   s3: '#199E70',
   unk: '#4A5668',
   hl: '#5B9BFF',
   seqLo: [30, 39, 51],
   levels: ['#0b8a5f', '#f5a524', '#d23048'],
};
export type Palette = typeof LIGHT;
export const REGION_KEYS: [string, string[]][] = [
   ['UZ-QR', ['qoraqalpog', 'қорақалпоғ', 'каракалпак', 'karakalpak']],
   ['UZ-AN', ['andijon', 'андижон', 'андижан', 'andijan']],
   ['UZ-BU', ['buxoro', 'бухоро', 'бухара', 'bukhara']],
   ['UZ-FA', ['fargona', 'фарғона', 'фергана', 'fergana']],
   ['UZ-JI', ['jizzax', 'жиззах', 'джизак', 'jizzakh']],
   ['UZ-NG', ['namangan', 'наманган']],
   ['UZ-NW', ['navoiy', 'навоий', 'навои', 'navoi']],
   ['UZ-QA', ['qashqadaryo', 'қашқадарё', 'кашкадар', 'kashkadarya']],
   ['UZ-SA', ['samarqand', 'самарқанд', 'самарканд', 'samarkand']],
   ['UZ-SI', ['sirdaryo', 'сирдарё', 'сырдар', 'syrdarya']],
   ['UZ-SU', ['surxondaryo', 'сурхондарё', 'сурхандар', 'surkhandarya']],
   ['UZ-XO', ['xorazm', 'хоразм', 'хорезм', 'khorezm']],
];
export const TASHKENT_KEYS = ['toshkent', 'тошкент', 'ташкент', 'tashkent'];
export const CITY_KEYS = [
   'shahar',
   'shahri',
   'sh.',
   'шаҳар',
   'шаҳри',
   'ш.',
   'город',
   'city',
];
export const TK_INSET = {
   x: 812,
   y: 24,
   size: 180,
   cx: 902,
   cy: 100,
   scale: 10.4,
   ox: 770.45,
   oy: 332.05,
};
export const MAP_CODES = Object.keys(GEO).sort(
   (x, y) => Number(x === 'UZ-TK') - Number(y === 'UZ-TK'),
);
export const CHART_MARGIN = { top: 0, right: 48, bottom: 0, left: 0 };
export const BAR_RADIUS: [number, number, number, number] = [0, 999, 999, 0];
export const X_DOMAIN: [number, string] = [0, 'dataMax'];
export const NO_POINTER = { pointerEvents: 'none' } as const;
export const MARKER_STYLE = {
   transformBox: 'fill-box',
   transformOrigin: 'center',
   pointerEvents: 'none',
} as const;
export const NAV_BTN =
   'flex size-10 cursor-pointer items-center justify-center rounded-xl text-[#3D4757] dark:text-[#A3AFBF] focus:outline-2 focus:outline-solid focus:outline-[#3a79f3] border border-[#E2E7EE] dark:border-[#232D3B]';
export const CARD_RADIUS = 16;
export const CURVE_STEPS = 96;
export const CURVE_BEND = 0.35;
export const ARC_STEPS = 12;
export const WHITE: [number, number, number] = [255, 255, 255];
export const TRAIL_COLOR: [number, number, number] = [0, 102, 255];
export const TRAIL_SLICES = 24;
export const TRAIL_MAX = 400;
export const CYCLE_MS = 3000;
export const LINE_WIDTH = 2.5;
export const HIT_AT = 0.45;
export const BORDER_TIME = 0.38;
export const TRAIL_RATIO = 0.3;
export const SLICE_PAD = 1 + LINE_WIDTH;
export const SPLASH_MS = 700;
export const SPLASH_RINGS = 3;
export const SPLASH_SQUASH = 50;
export const SPLASH_SQUASH_MAX = 0.06;
export const SKELETON = 'animate-pulse bg-[#EDF1F6] dark:bg-[#1E2733]';
