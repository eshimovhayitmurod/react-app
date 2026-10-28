import sendErrorMessage from '@shared/helpers/sendErrorMessage';
import { ErrorPayload } from '@shared/types/system/app-error.types';
import { useEffect } from 'react';
const useErrorLogging = (): void => {
   useEffect(() => {
      const handleError: OnErrorEventHandler = (
         event,
         source,
         lineno,
         colno,
         error,
      ) => {
         let ErrorType: ErrorPayload['ErrorType'] = 'OtherError';
         let ErrorPriority: ErrorPayload['ErrorPriority'] = 'Medium';
         if (error instanceof SyntaxError) {
            ErrorPriority = 'Critical';
            ErrorType = 'SyntaxError';
         } else if (error instanceof ReferenceError) {
            ErrorPriority = 'Critical';
            ErrorType = 'ReferenceError';
         } else if (error instanceof TypeError) {
            ErrorPriority = 'Critical';
            ErrorType = 'TypeError';
         }
         const messageStr =
            typeof event === 'string' ? event : event?.type || 'Unknown Error';
         const fileStr = source || '';
         const lineNum = lineno || 0;
         const colNum = colno || 0;
         const ErrorMessage = `
            Col: ${colNum},
            File: ${fileStr},
            Line: ${lineNum},
            Message: ${messageStr},
         `;
         const newError: ErrorPayload = {
            APIData: '',
            APIMethod: '',
            APIResponse: '',
            APIStatus: '',
            APIUrl: '',
            ErrorMessage,
            ErrorPriority,
            ErrorType,
         };
         sendErrorMessage(newError);
      };
      const handleUnhandledRejection = (event: PromiseRejectionEvent): void => {
         const reason = event?.reason;
         const ErrorMessage =
            typeof reason?.message === 'string'
               ? reason.message
               : typeof reason === 'string'
                 ? reason
                 : JSON.stringify(reason || event);
         const newError: ErrorPayload = {
            APIData: '',
            APIMethod: '',
            APIResponse: '',
            APIStatus: '',
            APIUrl: '',
            ErrorMessage,
            ErrorPriority: 'Critical',
            ErrorType: 'PromiseError',
         };
         sendErrorMessage(newError);
      };
      window.onerror = handleError;
      window.addEventListener('unhandledrejection', handleUnhandledRejection);
      return () => {
         window.onerror = null;
         window.removeEventListener(
            'unhandledrejection',
            handleUnhandledRejection,
         );
      };
   }, []);
};
export default useErrorLogging;
