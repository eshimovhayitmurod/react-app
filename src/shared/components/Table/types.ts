import {
   prettyCardNumber,
   prettyCardValid,
   prettyDate,
   prettyDateTime,
   prettyFileSize,
   prettyNumber,
   prettyPassportNumber,
   prettyPhoneNumber,
} from '@shared/helpers/prettyData';
import type { MouseEvent, ReactNode } from 'react';
type RenderTypeValue =
   | 'card-number'
   | 'card-valid'
   | 'custom'
   | 'date'
   | 'datetime'
   | 'file-size'
   | 'number'
   | 'passport'
   | 'phone'
   | 'string'
   | 'string-number';
type Renderer = {
   value: RenderTypeValue | undefined;
   getContent?: (value: unknown) => ReactNode;
};
const isStringOrNumber = (value: unknown): value is string | number =>
   typeof value === 'string' || typeof value === 'number';
export const renders = [
   {
      value: 'card-number',
      getContent: (value: unknown) => {
         return prettyCardNumber(isStringOrNumber(value) ? value : undefined);
      },
   },
   {
      value: 'card-valid',
      getContent: (value: unknown) => {
         return prettyCardValid(isStringOrNumber(value) ? value : undefined);
      },
   },
   {
      value: 'custom',
   },
   {
      value: 'date',
      getContent: (value: unknown) => {
         return typeof value === 'string' ||
            typeof value === 'number' ||
            value instanceof Date
            ? prettyDate(value)
            : '—';
      },
   },
   {
      value: 'datetime',
      getContent: (value: unknown) => {
         return typeof value === 'string' ||
            typeof value === 'number' ||
            value instanceof Date
            ? prettyDateTime(value)
            : '—';
      },
   },
   {
      value: 'file-size',
      getContent: (value: unknown) => {
         return typeof value === 'number' ? prettyFileSize(value) : '—';
      },
   },
   {
      value: 'number',
      getContent: (value: unknown) => {
         const isValid = typeof value === 'number';
         return isValid ? value : '—';
      },
   },
   {
      value: 'passport',
      getContent: (value: unknown) => {
         return prettyPassportNumber(
            isStringOrNumber(value) ? value : undefined,
         );
      },
   },
   {
      value: 'phone',
      getContent: (value: unknown) => {
         return prettyPhoneNumber(isStringOrNumber(value) ? value : undefined);
      },
   },
   {
      value: 'string',
      getContent: (value: unknown) => {
         const isValid = typeof value === 'string' && value;
         return isValid ? value : '—';
      },
   },
   {
      value: 'string-number',
      getContent: (value: unknown) => {
         return isStringOrNumber(value)
            ? prettyNumber(value)
            : prettyNumber('');
      },
   },
   {
      value: undefined,
      getContent: (value: unknown) => value as ReactNode,
   },
] satisfies Renderer[];
export const renderTypes = renders.map(t => t?.value);
export type RenderType = Renderer['value'];
export type TableHeader<T extends object> = {
   getContent?: (params: { data: T; key: string; index: number }) => ReactNode;
   isClickable?: boolean;
   key?: keyof T;
   label?: ReactNode;
   renderType?: RenderType;
};
export type TableRowClickHandler<T extends object> = (params: {
   columnIndex: number;
   data: T;
   event: MouseEvent<HTMLTableCellElement>;
   rowIndex: number;
}) => void;
export type TableProps<T extends object> = {
   data?: T[];
   emptyMessage?: string;
   headers?: TableHeader<T>[];
   isLoading?: boolean;
   withPadding?: boolean;
   onClickRow?: TableRowClickHandler<T>;
};
export type BodyProps<T extends object> = {
   data?: T[];
   headers?: TableHeader<T>[];
   withPadding?: boolean;
   onClickRow?: TableRowClickHandler<T>;
};
export type BodyCellProps<T extends object> = {
   columnIndex: number;
   data: T;
   header: TableHeader<T>;
   onClickRow?: TableRowClickHandler<T>;
   renderType?: RenderType;
   rowIndex: number;
   withPadding: boolean;
};
export type HeaderProps<T extends object> = {
   headers?: TableHeader<T>[];
   withPadding?: boolean;
};
export type LoadingProps = { colSpan?: number };
export type NoInfoProps = { colSpan?: number; emptyMessage?: string };
