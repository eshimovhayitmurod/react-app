import type { AutoFill, FocusEventHandler, Ref, SyntheticEvent } from 'react';
export type FormAutoComplete = AutoFill;
export type FormControlSize = 'lg' | 'md' | 'sm';
export type FormChangeEvent<TElement extends HTMLElement = HTMLInputElement> =
   | Event
   | SyntheticEvent<TElement>;
export type FormChangeHandler<
   TValue,
   TElement extends HTMLElement = HTMLInputElement,
> = (value: TValue, options?: { event: FormChangeEvent<TElement> }) => void;
export type FormInputProps<TElement extends HTMLElement = HTMLInputElement> = {
   'aria-label'?: string;
   'data-cy'?: string;
   autoComplete?: FormAutoComplete;
   background?: string;
   clearable?: boolean;
   disabled?: boolean;
   error?: string;
   id?: string;
   loading?: boolean;
   name?: string;
   onBlur?: FocusEventHandler<TElement>;
   onChange?: FormChangeHandler<string, TElement>;
   onFocus?: FocusEventHandler<TElement>;
   placeholder?: string;
   ref?: Ref<TElement>;
   size?: FormControlSize;
   value?: string;
};
