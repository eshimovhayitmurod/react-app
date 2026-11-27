import type { ComponentType, HTMLAttributes } from 'react';
export type SelectOption = {
   disabled?: boolean;
   label?: string;
   value?: string | number | null;
   apiData?: {
      [key: string]: unknown;
      CN?: string;
      O?: string;
      PINFL?: string;
      TIN?: string;
      mxik?: string;
      name?: string;
      validTo?: string;
   };
};
export type SelectValue = SelectOption | SelectOption[] | null;
export type SelectFilter = {
   page: number;
   search: string;
};
export type SelectOptionComponentProps = {
   activeIndex: number | null;
   index: number;
   isFocused: boolean;
   multiple: boolean;
   isSelected: boolean;
   option: SelectOption;
   value?: SelectValue;
   innerRef: HTMLAttributes<HTMLDivElement> & {
      ref?: (node: HTMLElement | null) => void;
   };
};
export type SelectOptionDisplayProps = Pick<
   SelectOptionComponentProps,
   'innerRef' | 'isFocused' | 'isSelected' | 'option'
>;
export type SelectProps = {
   'data-cy'?: string;
   NoOptions?: ComponentType<{ searchValue?: string }>;
   Option?: ComponentType<SelectOptionComponentProps>;
   background?: string;
   className?: string;
   clearable?: boolean;
   disabled?: boolean;
   error?: string;
   multiple?: boolean;
   noOptionsMessage?: string;
   onBlur?: () => void;
   onChange?: (value: SelectValue) => void;
   onFocus?: () => void;
   options?: SelectOption[];
   placeholder?: string;
   renderOptionType?: 'default' | 'sign' | 'custom';
   searchPlaceholder?: string;
   searchable?: boolean;
   size?: 'sm' | 'md' | 'lg';
   type?: 'select' | 'autocomplete';
   url?: string | ((filter: SelectFilter) => string);
   value?: SelectValue;
   getResponse?: (
      response: unknown,
      filter: SelectFilter,
   ) => { hasMore?: boolean; options?: SelectOption[] };
   service?: (options: {
      signal: AbortSignal;
      url: string;
   }) => Promise<unknown>;
};
