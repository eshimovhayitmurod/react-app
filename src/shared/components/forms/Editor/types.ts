import type { Editor as TiptapEditor } from '@tiptap/core';
import type { ReactNode } from 'react';
export type EditorLike = TiptapEditor;
export type EditorToolbarButton = {
   action?: () => unknown;
   active?: boolean | string | Record<string, string>;
   component?: ReactNode;
   icon?: ReactNode;
   title?: string;
   type?: 'heading';
};
