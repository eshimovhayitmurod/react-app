import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { SelectProps } from './types';
type NoOptionsProps = {
   CustomNoOptions?: SelectProps['NoOptions'];
   noOptionsMessage?: string;
   searchValue?: string;
};
const NoOptions = ({
   searchValue,
   noOptionsMessage,
   CustomNoOptions,
}: NoOptionsProps) => {
   const { t } = useTranslation('common');
   const noOptions = useMemo(() => {
      const isValid = typeof noOptionsMessage === 'string' && noOptionsMessage;
      const noOptions = isValid
         ? noOptionsMessage
         : t('no_options');
      return noOptions;
   }, [noOptionsMessage, t]);
   if (CustomNoOptions) {
      return <CustomNoOptions searchValue={searchValue} />;
   }
   return (
      <div className='items-center text-(--option-empty-color) flex text-[16px] font-medium h-full justify-center'>
         {noOptions}
      </div>
   );
};
export default NoOptions;
