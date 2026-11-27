import { X } from 'lucide-react';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
type ImageItemProps = {
   file: File;
   index: number;
   isEnabled?: boolean;
   onChange?: (files: File[]) => void;
   value: File[];
};
const ImageItem = memo(
   ({ file, index, isEnabled = false, onChange, value }: ImageItemProps) => {
      const { t } = useTranslation('common');
      const [src, setSrc] = useState('');
      useEffect(() => {
         const url = URL.createObjectURL(file);
         setSrc(url);
         return () => URL.revokeObjectURL(url);
      }, [file]);
      const removeFile = useCallback(() => {
         if (typeof onChange === 'function') {
            onChange(value.filter((_, order) => order !== index));
         }
      }, [onChange, index, value]);
      return (
         <li className='relative aspect-square overflow-hidden rounded-[10px] border border-solid border-(--file-uploader-border-color) bg-[#F1F4F8] dark:bg-[#1E2733]'>
            {src && (
               <img
                  alt={file.name}
                  className='h-full w-full object-cover'
                  src={src}
                  title={file.name}
               />
            )}
            {isEnabled && (
               <button
                  aria-label={t('delete')}
                  className='absolute top-1.5 right-1.5 flex h-6.5 w-6.5 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-colors hover:bg-[#E5484D] focus-visible:bg-[#E5484D] dark:bg-black/70 dark:hover:bg-[#E5484D]'
                  onClick={removeFile}
                  title={t('delete')}
                  type='button'
               >
                  <X size={16} strokeWidth={2.5} />
               </button>
            )}
         </li>
      );
   },
);
export default ImageItem;
