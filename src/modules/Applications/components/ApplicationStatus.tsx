import type { ApplicationStatusType } from '@shared/constants/statuses';
import useStatuses from '@shared/hooks/useStatuses';
const ApplicationStatus = ({
   status_code,
}: {
   status_code: ApplicationStatusType | undefined | null;
}) => {
   const { statusOption, statusName } = useStatuses({
      filter: 'required',
      status: status_code,
   });
   return (
      <span
         className={`inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[13px] font-semibold whitespace-nowrap ${statusOption?.badge ?? ''}`}
      >
         <span className={`size-1.5 rounded-full ${statusOption?.dot ?? ''}`} />
         {statusName}
      </span>
   );
};
export default ApplicationStatus;
