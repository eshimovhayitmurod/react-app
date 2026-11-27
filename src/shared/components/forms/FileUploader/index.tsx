import { prettyFileSize } from '@shared/helpers/prettyData';
import { memo, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../components/ErrorMessage';
import Upload from '../Icons/Upload';
import FileItem from './FileItem';
import ImageItem from './ImageItem';
type FileUploaderProps = {
   accept?: Record<string, string[]>;
   disabled?: boolean;
   error?: string;
   maxFiles?: number;
   maxSize?: number;
   minSize?: number;
   name?: string;
   onChange?: (files: File[]) => void;
   preview?: 'list' | 'image';
   value?: File[];
};
const FileUploader = memo(
   ({
      accept,
      error = '',
      disabled = false,
      maxFiles = 10,
      maxSize = 20971520,
      minSize = 0,
      name,
      onChange,
      preview = 'list',
      value = [],
   }: FileUploaderProps) => {
      const { t } = useTranslation('common');
      const isError = !!error;
      const memoizedValue = useMemo(
         () => (Array.isArray(value) ? value : []),
         [value],
      );
      const onDrop = useCallback(
         (files: File[]) => {
            if (!disabled && typeof onChange === 'function') {
               const merged = [...memoizedValue, ...files];
               const unique = [];
               const seen = new Set();
               for (const f of merged) {
                  const key = f?.name + '_' + f?.size;
                  if (!seen.has(key)) {
                     seen.add(key);
                     unique.push(f);
                  }
               }
               const newValue = unique.slice(0, maxFiles);
               onChange(newValue);
            }
         },
         [onChange, disabled, memoizedValue, maxFiles],
      );
      const isDisabled = useMemo(
         () => disabled || memoizedValue?.length >= maxFiles,
         [disabled, memoizedValue, maxFiles],
      );
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
         accept,
         disabled,
         maxFiles,
         maxSize,
         minSize,
         multiple: maxFiles > 1,
         onDrop,
         onDropRejected: (e: unknown) => {
            console.log('Rejected files:', e);
         },
      });
      const hasValue = useMemo(
         () => memoizedValue?.length > 0,
         [memoizedValue],
      );
      const maxFileSize = useMemo(() => prettyFileSize(maxSize), [maxSize]);
      const allowedFormats = useMemo(() => {
         const allowedFormats = Object.values(accept || {}).join(', ');
         return allowedFormats;
      }, [accept]);
      const uploaderClass = useMemo(() => {
         const baseClass =
            'focus:outline-none min-h-[250px] flex items-center justify-center border-2 border-(--file-uploader-border-color) border-dashed rounded-xl p-6 text-center';
         const errorClass = isError
            ? 'border-(--file-uploader-border-error-color)'
            : '';
         const activeClass = isDragActive
            ? 'bg-(--file-uploader-active-bg-color) border-(--file-uploader-border-focus-color)!'
            : '';
         const disabledClass = isDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-(--file-uploader-active-bg-color) hover:border-(--file-uploader-border-focus-color) focus:bg-(--file-uploader-active-bg-color) focus:border-(--file-uploader-border-focus-color)';
         const uploaderClass = `${baseClass} ${errorClass} ${activeClass} ${disabledClass}`;
         return uploaderClass;
      }, [isDisabled, isError, isDragActive]);
      return (
         <div className='grid grid-cols-1 gap-1'>
            <div className='border border-(--file-uploader-border-color) rounded-[14px] p-2'>
               <div className='grid grid-cols-1 gap-2'>
                  <div {...getRootProps()} className={uploaderClass}>
                     <input
                        {...getInputProps()}
                        multiple={maxFiles > 1}
                        name={name}
                     />
                     <div className='font-medium'>
                        {isDragActive ? (
                           <p className='text-[20px] text-(--file-uploader-main-text-color)'>
                              {t('file_uploader.drop_here')}
                           </p>
                        ) : (
                           <div className='grid grid-cols-1 gap-2'>
                              <div className='flex items-center justify-center text-(--file-uploader-subtitle-color) pb-3'>
                                 <Upload />
                              </div>
                              <p className='text-[20px] text-(--file-uploader-main-text-color)'>
                                 {t('file_uploader.click_or_drop')}
                              </p>
                              <p className='text-(--file-uploader-subtitle-color) text-[13px]'>
                                 {t('file_uploader.max_size', {
                                    size: maxFileSize,
                                 })}
                              </p>
                              {accept && (
                                 <p className='text-(--file-uploader-subtitle-color) text-[13px]'>
                                    {t('file_uploader.allowed_formats', {
                                       formats: allowedFormats,
                                    })}
                                 </p>
                              )}
                           </div>
                        )}
                     </div>
                  </div>
                  {hasValue && preview === 'image' && (
                     <ul className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                        {memoizedValue.map((file, index) => (
                           <ImageItem
                              file={file}
                              index={index}
                              isEnabled={!disabled}
                              key={file.name + '_' + file.size}
                              onChange={onChange}
                              value={memoizedValue}
                           />
                        ))}
                     </ul>
                  )}
                  {hasValue && preview === 'list' && (
                     <div>
                        <ul className='grid grid-cols-1 gap-2'>
                           {memoizedValue.map((file, index) => (
                              <FileItem
                                 isEnabled={!disabled}
                                 index={index}
                                 key={index}
                                 name={file?.name}
                                 onChange={onChange}
                                 size={file?.size}
                                 value={memoizedValue}
                              />
                           ))}
                        </ul>
                     </div>
                  )}
               </div>
            </div>
            <ErrorMessage size='md' error={error} />
         </div>
      );
   },
);
export default FileUploader;
