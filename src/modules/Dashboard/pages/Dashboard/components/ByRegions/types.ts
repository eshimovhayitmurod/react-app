export type DistrictItem = {
   id: string;
   label: string;
   value: number;
};
export type Region = {
   closed: number;
   code: string | null;
   districts: DistrictItem[];
   id: string;
   name: string;
   placed: number;
   registered: number;
   value: number;
};
export type Pt = [number, number];
export type Rect = { l: number; t: number; r: number; b: number };
export type Line = {
   mx: number;
   my: number;
   row: Rect;
   detail: Rect | null;
   w: number;
   h: number;
   k: number;
};
export type Handlers = {
   onPick: (i: number) => void;
   onHoverStart: (i: number) => void;
   onHoverEnd: () => void;
};
export type Comet = {
   d: string;
   len: number;
   trail: number;
   t0: number;
   t1: number;
   track: boolean;
};
export type Rgb = [number, number, number];
