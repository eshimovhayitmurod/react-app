import ApplicationStatus from '@modules/Applications/components/ApplicationStatus';
import { Loading, PageTitle } from '@shared/components';
import {
   DateInput,
   Label,
   Select,
   Textarea,
   TextInput,
   TimeInput,
} from '@shared/components/forms';
import NotFound from '@shared/components/NotFound';
import notification from '@shared/helpers/notification';
import useGenders from '@shared/hooks/useGenders';
import useStatuses from '@shared/hooks/useStatuses';
import { Fragment, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import { Header } from './components';
import { buildApplicationPdfData, exportApplicationPdf } from './helpers';
import { useApplication } from './hooks';
const ApplicationsView = () => {
   const { t } = useTranslation(['applications', 'common']);
   const { id } = useParams<{ id: string }>();
   const { application, isLoading, isSuccess, isError } = useApplication(id);
   const {
      birth_date,
      closed_at,
      closed_by_name,
      created_at,
      created_by_name,
      description_by_doctor,
      description_by_inspector,
      district_name,
      found_address,
      gender,
      match_score,
      passport_number,
      person_name,
      pinfl,
      placed_at,
      placed_by_name,
      placement,
      region_name,
      status_code,
   } = application ? application : {};
   const { genderName, genderOption } = useGenders({ gender });
   const { statusName } = useStatuses({
      filter: 'required',
      status: status_code,
   });
   const [isExporting, setIsExporting] = useState(false);
   const exportPdf = useCallback(async () => {
      if (!application) {
         return;
      }
      setIsExporting(true);
      try {
         const data = buildApplicationPdfData({
            application,
            genderName,
            statusName,
            t,
         });
         await exportApplicationPdf(
            data,
            application.person_name || t('details_title'),
         );
      } catch {
         notification(t('common:unexpected_error'), { type: 'error' });
      } finally {
         setIsExporting(false);
      }
   }, [application, genderName, statusName, t]);
   return (
      <Fragment>
         <PageTitle title={t('details_title')} />
         <div className='main-page-wrapper'>
            <div className='flex flex-col gap-4'>
               <div>
                  <Header
                     isExporting={isExporting}
                     onExport={isSuccess && application ? exportPdf : undefined}
                     title={t('details_title')}
                  />
               </div>
               {isLoading && <Loading />}
               {isSuccess && application && (
                  <div className='flex flex-col gap-4'>
                     <div className='main-card-box'>
                        <div className='flex flex-col gap-5'>
                           <div className='flex justify-between items-center gap-2'>
                              <h2 className='text-xl font-bold'>
                                 {t('person_info')}
                              </h2>
                              <ApplicationStatus status_code={status_code} />
                           </div>
                           <div className='flex flex-col gap-5 lg:flex-row lg:items-start'>
                              <div className='aspect-3/4 w-full max-w-45 shrink-0 overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] dark:border-[#2A3441] dark:bg-[#1E2733]'>
                                 <img
                                    alt={person_name || ''}
                                    className='size-full object-cover'
                                    src='/user-test.png'
                                 />
                              </div>
                              <div className='grid flex-1 grid-cols-1 gap-5 md:grid-cols-3'>
                                 <div className='md:col-span-2'>
                                    <Label>{t('full_name')}</Label>
                                    <TextInput
                                       disabled
                                       value={person_name || '—'}
                                    />
                                 </div>
                                 <div>
                                    <Label>{t('gender')}</Label>
                                    <Select
                                       disabled
                                       value={
                                          genderOption
                                             ? genderOption
                                             : { label: '—' }
                                       }
                                    />
                                 </div>
                                 <div>
                                    <Label>{t('birth_date')}</Label>
                                    <DateInput
                                       disabled
                                       value={birth_date || '—'}
                                    />
                                 </div>
                                 <div>
                                    <Label>{t('pinfl')}</Label>
                                    <TextInput disabled value={pinfl || '—'} />
                                 </div>
                                 <div>
                                    <Label>{t('passport')}</Label>
                                    <TextInput
                                       disabled
                                       value={passport_number || '—'}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='main-card-box'>
                        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
                           <div className='md:col-span-3'>
                              <h2 className='text-xl font-bold'>
                                 {t('registration_info')}
                              </h2>
                           </div>
                           <div>
                              <Label>{t('common:region')}</Label>
                              <TextInput disabled value={region_name || '—'} />
                           </div>
                           <div>
                              <Label>{t('common:district')}</Label>
                              <TextInput
                                 disabled
                                 value={district_name || '—'}
                              />
                           </div>
                           <div>
                              <Label>{t('registered_at')}</Label>
                              <DateInput
                                 disabled
                                 value={created_at?.slice(0, 10) || '—'}
                              />
                           </div>
                           <div>
                              <Label>{t('registered_time')}</Label>
                              <TimeInput
                                 disabled
                                 value={created_at?.slice(11, 19) || '—'}
                              />
                           </div>
                           <div>
                              <Label>{t('registered_by')}</Label>
                              <TextInput
                                 disabled
                                 value={created_by_name || '—'}
                              />
                           </div>
                           <div>
                              <Label>{t('found_address')}</Label>
                              <TextInput
                                 disabled
                                 value={found_address || '—'}
                              />
                           </div>
                           <div>
                              <Label>{t('match_score')}</Label>
                              <TextInput disabled value={match_score || '—'} />
                           </div>
                           <div className='md:col-span-3'>
                              <Label>{t('comment')}</Label>
                              <Textarea
                                 disabled
                                 value={description_by_inspector || '—'}
                              />
                           </div>
                        </div>
                     </div>
                     <div className='main-card-box'>
                        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
                           <div className='md:col-span-3'>
                              <h2 className='text-xl font-bold'>
                                 {t('placement_info')}
                              </h2>
                           </div>
                           <div>
                              <Label>{t('placed_at')}</Label>
                              <DateInput
                                 disabled
                                 value={String(placed_at).slice(0, 10) || '—'}
                              />
                           </div>
                           <div>
                              <Label>{t('placed_time')}</Label>
                              <TimeInput
                                 disabled
                                 value={String(placed_at).slice(11, 19) || '—'}
                              />
                           </div>
                           <div>
                              <Label>{t('sobering_center_employee')}</Label>
                              <TextInput
                                 disabled
                                 value={placed_by_name || '—'}
                              />
                           </div>
                           <div className='md:col-span-3'>
                              <Label>{t('comment')}</Label>
                              <Textarea disabled value={placement || '—'} />
                           </div>
                        </div>
                     </div>
                     <div className='main-card-box'>
                        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
                           <div className='md:col-span-3'>
                              <h2 className='text-xl font-bold'>
                                 {t('permission_info')}
                              </h2>
                           </div>
                           <div>
                              <Label>{t('permitted_at')}</Label>
                              <DateInput
                                 disabled
                                 value={String(closed_at).slice(0, 10) || '—'}
                              />
                           </div>
                           <div>
                              <Label>{t('permitted_time')}</Label>
                              <TimeInput
                                 disabled
                                 value={String(closed_at).slice(11, 19) || '—'}
                              />
                           </div>
                           <div>
                              <Label>{t('sobering_center_employee')}</Label>
                              <TextInput
                                 disabled
                                 value={closed_by_name || '—'}
                              />
                           </div>
                           <div className='md:col-span-3'>
                              <Label>{t('comment')}</Label>
                              <Textarea
                                 disabled
                                 value={description_by_doctor || '—'}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               )}
               {isError && (
                  <NotFound
                     backButton={
                        <Link
                           className='btn btn-primary'
                           to='/account/applications'
                        >
                           {t('title')}
                        </Link>
                     }
                  />
               )}
            </div>
         </div>
      </Fragment>
   );
};
export default ApplicationsView;
