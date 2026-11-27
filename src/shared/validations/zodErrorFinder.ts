import { ZodErrorIssueType, ZodResponseType } from './types';
const zodErrorFinder = ({
   keys,
   zodResponse,
}: {
   keys: string[];
   zodResponse: ZodResponseType;
}): string => {
   const issues = zodResponse?.error?.issues;
   const newErrors = Array.isArray(issues) ? issues : [];
   const newError = newErrors.find((error: ZodErrorIssueType) => {
      const path = error?.path;
      const newPath: unknown[] = Array.isArray(path) ? path : [];
      const isError =
         newPath.every(path => keys.includes(path as string)) &&
         keys?.length === newPath?.length;
      return isError;
   });
   const message = newError?.message || '';
   return message;
};
export default zodErrorFinder;
