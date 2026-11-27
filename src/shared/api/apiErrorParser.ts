import i18next from 'i18next';
export const apiErrorParser = (error: any) => {
   const incomingError =
      typeof error?.toJSON === 'function' ? error?.toJSON() : {};
   const message = incomingError?.message;
   const isValidMessage = typeof message === 'string' && message;
   const details = incomingError?.details;
   const firstMessage = details?.[Object.keys(details || {})?.[0]];
   const isValidObject =
      typeof details === 'object' &&
      details !== null &&
      !Array.isArray(details) &&
      firstMessage &&
      typeof firstMessage === 'string';
   const errorMessage = isValidMessage
      ? message
      : isValidObject
        ? firstMessage
        : i18next.t('common:error_occurred');
   return errorMessage;
};
