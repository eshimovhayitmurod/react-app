import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { errorClass } from '../classNames';
type ErrorMessageProps = {
   error?: string;
   id?: string;
   size?: 'lg' | 'md' | 'sm';
};
const ErrorMessage = memo(
   ({ error = '', size = 'md', id }: ErrorMessageProps) => {
      const { t } = useTranslation('validation');
      const isError = useMemo(() => !!error, [error]);
      return (
         isError && (
            <h5 id={id} className={errorClass({ size })} role='alert'>
               {t(error, { defaultValue: error })}
            </h5>
         )
      );
   },
);
export default ErrorMessage;
