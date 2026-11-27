export type StarBorderTheme = 'dark' | 'light';
export type StarBorderHover = 'lap' | 'brighten' | 'reveal' | 'none';
export type StarBorderOwnProps = {
   backgroundColor?: string;
   borderColor?: string;
   children?: React.ReactNode;
   className?: string;
   clickPulse?: boolean;
   color?: string;
   direction?: 'clockwise' | 'counterclockwise';
   duration?: number;
   glow?: number;
   hover?: StarBorderHover;
   isActive?: boolean;
   radius?: number;
   sparkle?: boolean;
   stars?: number;
   style?: React.CSSProperties;
   textColor?: string;
   theme?: StarBorderTheme;
   thickness?: number;
   trailColor?: string;
   trailLength?: number;
};
export type AnimatedBorderProps<T extends React.ElementType = 'button'> =
   StarBorderOwnProps & {
      as?: T;
   } & Omit<React.ComponentPropsWithoutRef<T>, keyof StarBorderOwnProps | 'as'>;
export type Palette = {
   surface: string;
   text: string;
   track: string;
   light: string;
};
export type Rgb = [number, number, number];
export type Segment = {
   angle: number | null;
   dx: number;
   dy: number;
   length: number;
   x: number;
   y: number;
};
export type Shape = { r: number; segments: Segment[]; total: number };
export type Point = { x: number; y: number; nx: number; ny: number };
export type Pulse = { origin: number; age: number };
export type Mote = {
   age: number;
   life: number;
   seed: number;
   size: number;
   vx: number;
   vy: number;
   x: number;
   y: number;
};
export type Settings = {
   clickPulse: boolean;
   color: string;
   direction: number;
   duration: number;
   glow: number;
   hover: StarBorderHover;
   isActive: boolean;
   light: boolean;
   radius: number;
   sparkle: boolean;
   stars: number;
   thickness: number;
   trailColor: string;
   trailLength: number;
};
