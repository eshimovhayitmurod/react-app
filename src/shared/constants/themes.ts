export const Themes = ['light', 'dark'] as const;
export type ThemeType = (typeof Themes)[number];
