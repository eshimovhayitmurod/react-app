import ApplicationService from '@modules/Applications/services';
import type { Admission } from '@modules/Applications/types';
import { apiErrorParser } from '@shared/api/apiErrorParser';
import notification from '@shared/helpers/notification';
import axios from 'axios';
import { useEffect, useState } from 'react';
type ApplicationStatus = 'LOADING' | 'SUCCESS' | 'ERROR';
export const useApplication = (id: string | undefined) => {
   const [application, setApplication] = useState<Admission | null>(null);
   const [status, setStatus] = useState<ApplicationStatus>('LOADING');
   useEffect(() => {
      if (!id) {
         setStatus('ERROR');
         return;
      }
      const controller = new AbortController();
      const signal = controller.signal;
      ApplicationService.getApplication({
         id,
         signal,
         onStart: () => {
            if (!signal.aborted) {
               setStatus('LOADING');
            }
         },
         onSuccess: response => {
            if (!signal.aborted) {
               setApplication(response.data);
               setStatus('SUCCESS');
            }
         },
         onError: error => {
            if (axios.isCancel(error) || signal.aborted) {
               return;
            }
            setStatus('ERROR');
            notification(apiErrorParser(error), { type: 'error' });
         },
      });
      return () => controller.abort();
   }, [id]);
   return {
      application,
      isError: status === 'ERROR',
      isLoading: status === 'LOADING',
      isSuccess: status === 'SUCCESS',
   };
};
