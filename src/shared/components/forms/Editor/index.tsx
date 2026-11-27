import sanitizeHtml from '@shared/helpers/sanitizeHtml';
import type { EditorEvents } from '@tiptap/core';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { useEffect } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Toolbar from './Toolbar';
type EditorProps = {
   'data-cy'?: string;
   disabled?: boolean;
   error?: string;
   onBlur?: (props: EditorEvents['blur']) => void;
   onChange?: (value: string) => void;
   onFocus?: (props: EditorEvents['focus']) => void;
   placeholder?: string;
   value?: string;
};
const Editor = ({
   'data-cy': dataCY,
   disabled = false,
   error = '',
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   value,
}: EditorProps) => {
   const editor = useEditor({
      content: value,
      editable: !disabled,
      injectCSS: false,
      onBlur,
      onFocus,
      onUpdate: ({ editor }) => {
         if (!disabled) {
            const rawHtml = editor.getHTML();
            const cleanHtml = sanitizeHtml(rawHtml);
            onChange?.(cleanHtml);
         }
      },
      extensions: [
         StarterKit,
         Highlight.configure({ multicolor: true }),
         Placeholder.configure({ placeholder, showOnlyWhenEditable: true }),
         Subscript,
         Superscript,
         TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ],
      editorProps: {
         attributes: {
            ...(dataCY ? { 'data-cy': dataCY } : {}),
            'data-error': String(!!error),
         },
         transformPastedHTML(html: string) {
            const cleanHtml = sanitizeHtml(html);
            return cleanHtml;
         },
      },
   });
   useEffect(() => {
      if (editor && editor.isEditable === disabled) {
         editor.setEditable(!disabled, false);
      }
   }, [editor, disabled]);
   return (
      <div className={clsx('w-full')}>
         <div
            className={clsx(
               // ELEMENT STYLES
               'rounded-[10px] overflow-hidden w-full',
               // PROSE MIRROR STYLES
               '[&_.ProseMirror]:px-2.5 [&_.ProseMirror]:border [&_.ProseMirror]:rounded-b-[10px] [&_.ProseMirror]:field-sizing:content [&_.ProseMirror]:max-h-125 [&_.ProseMirror]:min-h-23.5 [&_.ProseMirror]:outline-none [&_.ProseMirror]:overflow-y-auto [&_.ProseMirror_*]:[all:revert] [&_.ProseMirror_*]:isolate',
               // PROSE MIRROR BACKGROUND
               '[&_.ProseMirror]:bg-transparent',
               `[&_.ProseMirror[contenteditable='false']]:bg-(--editor-disabled-bg-color)`,
               // PROSE MIRROR COLOR
               '[&_.ProseMirror]:text-(--editor-color) [&_.ProseMirror_*]:text-(--editor-color)!',
               // PROSE MIRROR BORDER COLOR
               '[&_.ProseMirror]:border-(--editor-border-color)',
               `[&_.ProseMirror:focus:not([contenteditable='false'])]:border-(--input-border-focus-color) [&_.ProseMirror:hover:not([contenteditable='false'])]:border-(--input-border-focus-color)`,
               {
                  "[&_.ProseMirror:not([contenteditable='false'])]:border-(--input-border-error-color)":
                     !!error,
               },
            )}
         >
            <div>
               <Toolbar disabled={!!disabled} editor={editor} />
            </div>
            <EditorContent editor={editor} />
         </div>
         <ErrorMessage size='md' error={error} />
      </div>
   );
};
export default Editor;
