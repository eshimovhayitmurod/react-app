import { useTranslation } from 'react-i18next';
type StatusChipProps = {
   activeLabel?: string;
   inactiveLabel?: string;
   isActive: boolean;
};
const StatusChip = ({
   activeLabel,
   inactiveLabel,
   isActive,
}: StatusChipProps) => {
   const { t } = useTranslation('common');
   return (
      <span
         className={`inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[13px] font-semibold whitespace-nowrap ${
            isActive
               ? 'bg-[#0B8A5F1A] dark:bg-[#3DD6A61F] text-[#0B8A5F] dark:text-[#3DD6A6]'
               : 'bg-[#D230481A] dark:bg-[#FF7A7A24] text-[#D23048] dark:text-[#FF7A7A]'
         }`}
      >
         <span
            className={`size-1.5 rounded-full ${
               isActive
                  ? 'bg-[#0B8A5F] dark:bg-[#3DD6A6]'
                  : 'bg-[#D23048] dark:bg-[#FF7A7A]'
            }`}
         />
         {isActive
            ? (activeLabel ?? t('active'))
            : (inactiveLabel ?? t('inactive'))}
      </span>
   );
};
export default StatusChip;
