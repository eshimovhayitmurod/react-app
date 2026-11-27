import clsx from 'clsx';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Heading from './Heading';
import Bold from './Icons/Bold';
import BulletList from './Icons/BulletList';
import Center from './Icons/Center';
import HighLight from './Icons/Highlight';
import Italic from './Icons/Italic';
import Justify from './Icons/Justify';
import Left from './Icons/Left';
import OrderedList from './Icons/OrderedList';
import Redo from './Icons/Redo';
import Right from './Icons/Right';
import Strike from './Icons/Strike';
import SubScript from './Icons/SubScript';
import SuperScript from './Icons/SuperScript';
import UnderLine from './Icons/Underline';
import Undo from './Icons/Undo';
import Tooltip from './Tooltip';
import type { EditorLike, EditorToolbarButton } from './types';
const Toolbar = ({
   editor,
   disabled = false,
}: {
   disabled?: boolean;
   editor: EditorLike | null;
}) => {
   const { t } = useTranslation('common');
   if (!editor) return null;
   const toolGroups: Array<{ buttons: EditorToolbarButton[] }> = [
      {
         buttons: [
            {
               action: () => editor.chain().focus().undo().run(),
               active: false,
               icon: <Undo />,
               title: t('editor.undo'),
            },
            {
               action: () => editor.chain().focus().redo().run(),
               active: false,
               icon: <Redo />,
               title: t('editor.redo'),
            },
         ],
      },
      {
         buttons: [
            {
               type: 'heading',
               component: <Heading editor={editor} disabled={disabled} />,
            },
            {
               action: () => editor.chain().focus().toggleBulletList().run(),
               active: 'bulletList',
               icon: <BulletList />,
               title: t('editor.bullet_list'),
            },
            {
               action: () => editor.chain().focus().toggleOrderedList().run(),
               active: 'orderedList',
               icon: <OrderedList />,
               title: t('editor.ordered_list'),
            },
         ],
      },
      {
         buttons: [
            {
               action: () => editor.chain().focus().toggleBold().run(),
               active: 'bold',
               icon: <Bold />,
               title: t('editor.bold'),
            },
            {
               action: () => editor.chain().focus().toggleItalic().run(),
               active: 'italic',
               icon: <Italic />,
               title: t('editor.italic'),
            },
            {
               action: () => editor.chain().focus().toggleUnderline().run(),
               active: 'underline',
               icon: <UnderLine />,
               title: t('editor.underline'),
            },
            {
               action: () => editor.chain().focus().toggleStrike().run(),
               active: 'strike',
               icon: <Strike />,
               title: t('editor.strike'),
            },
            {
               action: () => editor.chain().focus().toggleHighlight().run(),
               active: 'highlight',
               icon: <HighLight />,
               title: t('editor.highlight'),
            },
         ],
      },
      {
         buttons: [
            {
               action: () => editor.chain().focus().toggleSubscript().run(),
               active: 'subscript',
               icon: <SubScript />,
               title: t('editor.subscript'),
            },
            {
               action: () => editor.chain().focus().toggleSuperscript().run(),
               active: 'superscript',
               icon: <SuperScript />,
               title: t('editor.superscript'),
            },
         ],
      },
      {
         buttons: [
            {
               action: () => editor.chain().focus().setTextAlign('left').run(),
               active: { textAlign: 'left' },
               icon: <Left />,
               title: t('editor.align_left'),
            },
            {
               action: () =>
                  editor.chain().focus().setTextAlign('center').run(),
               active: { textAlign: 'center' },
               icon: <Center />,
               title: t('editor.align_center'),
            },
            {
               action: () => editor.chain().focus().setTextAlign('right').run(),
               active: { textAlign: 'right' },
               icon: <Right />,
               title: t('editor.align_right'),
            },
            {
               action: () =>
                  editor.chain().focus().setTextAlign('justify').run(),
               active: { textAlign: 'justify' },
               icon: <Justify />,
               title: t('editor.align_justify'),
            },
         ],
      },
   ];
   return (
      <div className='flex flex-wra[ gap-1.25 p-1.25 border-solid border-(--editor-border-color) rounded-t-[10px] border-l border-r border-t'>
         {toolGroups.map((group, index) => (
            <div
               className="flex gap-0.5 relative not-last:before:content-[''] not-last:before:absolute not-last:before:-right-0.75 not-last:before:top-0.5 not-last:before:h-[calc(100%-4px)] not-last:before:w-px not-last:before:bg-(--editor-border-color)"
               key={index}
            >
               {group?.buttons?.map((btn, subIndex) => {
                  const isActive =
                     typeof btn.active === 'string' ||
                     (typeof btn.active === 'object' && btn.active !== null)
                        ? editor.isActive(btn.active)
                        : false;
                  return btn?.type === 'heading' ? (
                     <Fragment key={`${index}_${subIndex}`}>
                        {btn?.component}
                     </Fragment>
                  ) : (
                     <Tooltip
                        disabled={disabled}
                        key={`${index}_${subIndex}`}
                        title={btn?.title}
                     >
                        <button
                           disabled={disabled}
                           type='button'
                           className={clsx(
                              'cursor-pointer disabled:cursor-default border-none rounded-xl w-8 h-8 outline-none flex items-center justify-center',
                              'enabled:hover:bg-(--editor-toolbar-hover-bg-color)',
                              {
                                 'bg-(--editor-toolbar-active-bg-color)':
                                    isActive,
                                 'bg-transparent': !isActive,
                              },
                           )}
                           onClick={(
                              e: React.MouseEvent<HTMLButtonElement>,
                           ) => {
                              e.preventDefault();
                              btn.action?.();
                           }}
                        >
                           {btn.icon}
                        </button>
                     </Tooltip>
                  );
               })}
            </div>
         ))}
      </div>
   );
};
export default Toolbar;
