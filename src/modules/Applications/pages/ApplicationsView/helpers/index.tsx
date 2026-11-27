import type { Admission } from '@modules/Applications/types';
import downloadFile from '@shared/helpers/downloadFile';
import {
   prettyDate,
   prettyDateTime,
   prettyPassportNumber,
} from '@shared/helpers/prettyData';
import type { TFunction } from 'i18next';
import type { ApplicationPdfData } from '../types';
const EMPTY = '—';
const text = (value?: string | number | null) =>
   value === null || value === undefined || value === ''
      ? EMPTY
      : String(value);
export const buildApplicationPdfData = ({
   application,
   genderName,
   statusName,
   t,
}: {
   application: Admission;
   genderName: string;
   statusName: string;
   t: TFunction;
}): ApplicationPdfData => {
   return {
      createdAt: t('pdf_created_at', { date: prettyDateTime(new Date()) }),
      fullName: text(application.person_name),
      photo: undefined,
      title: t('details_title'),
      redTitle: t('pdf_red_title', {
         district: application?.district_name ?? '',
         number: application?.number ?? '',
         region: application?.region_name ?? '',
      })
         .replace(/\s+/g, ' ')
         .trim(),
      sections: [
         {
            icon: 'person',
            title: t('person_info'),
            rows: [
               { label: t('full_name'), value: text(application?.person_name) },
               { label: t('gender'), value: text(genderName) },
               {
                  label: t('birth_date'),
                  value: prettyDate(application?.birth_date),
               },
               { label: t('pinfl'), value: text(application?.pinfl) },
               {
                  label: t('passport'),
                  value: prettyPassportNumber(application?.passport_number),
               },
               {
                  label: t('common:status'),
                  value: text(statusName),
               },
            ],
         },
         {
            icon: 'registration',
            title: t('registration_info'),
            rows: [
               {
                  label: t('common:region'),
                  value: text(application?.region_name),
               },
               {
                  label: t('common:district'),
                  value: text(application?.district_name),
               },
               {
                  label: t('registered_at'),
                  value: prettyDate(application?.created_at),
               },
               {
                  label: t('registered_time'),
                  value: prettyDateTime(application?.created_at).slice(11),
               },
               {
                  label: t('registered_by'),
                  value: text(application?.created_by_name),
               },
               {
                  label: t('found_address'),
                  value: text(application?.found_address),
               },
               {
                  label: t('match_score'),
                  value: text(application?.match_score),
               },
               {
                  label: t('comment'),
                  value: text(application?.description_by_inspector),
               },
            ],
         },
         {
            icon: 'placement',
            title: t('placement_info'),
            rows: [
               {
                  label: t('placed_at'),
                  value: prettyDate(application?.placed_at),
               },
               {
                  label: t('placed_time'),
                  value: prettyDateTime(application?.placed_at).slice(11),
               },
               {
                  label: t('sobering_center_employee'),
                  value: text(application?.placed_by_name),
               },
               { label: t('comment'), value: text(application?.placement) },
            ],
         },
         {
            icon: 'permission',
            title: t('permission_info'),
            rows: [
               {
                  label: t('permitted_at'),
                  value: prettyDate(application?.closed_at),
               },
               {
                  label: t('permitted_time'),
                  value: prettyDateTime(application?.closed_at).slice(11),
               },
               {
                  label: t('sobering_center_employee'),
                  value: text(application?.closed_by_name),
               },
               {
                  label: t('comment'),
                  value: text(application?.description_by_doctor),
               },
            ],
         },
      ],
   };
};
export const exportApplicationPdf = async (
   data: ApplicationPdfData,
   fileName: string,
) => {
   const [{ pdf }, { default: ApplicationPdf }] = await Promise.all([
      import('@react-pdf/renderer'),
      import('../components/ApplicationPdf'),
   ]);
   const blob = await pdf(<ApplicationPdf {...data} />).toBlob();
   const href = URL.createObjectURL(blob);
   downloadFile({ fileExtension: 'pdf', fileName, href });
   setTimeout(() => URL.revokeObjectURL(href), 1000);
};
