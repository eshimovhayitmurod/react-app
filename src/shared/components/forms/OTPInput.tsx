import type { FocusEventHandler, InputHTMLAttributes } from 'react';
import { memo } from 'react';
import ReactOtpInput from 'react-otp-input';
import { otpInputClass } from './classNames';
import ErrorMessage from './components/ErrorMessage';
type OTPInputProps = {
   autoFocus?: boolean;
   disabled?: boolean;
   error?: string;
   length?: number;
   onChange?: (value: string) => void;
   onFocus?: FocusEventHandler<HTMLInputElement>;
   placeholder?: string;
   size?: 'sm' | 'md' | 'lg';
   value?: string;
};
const OTPInput = memo(
   ({
      autoFocus = false,
      disabled = false,
      error = '',
      length = 5,
      onChange,
      onFocus,
      placeholder = '',
      size = 'md',
      value = '',
   }: OTPInputProps) => {
      const classNameOptions = { size, error: !!error, disabled };
      return (
         <div>
            <ReactOtpInput
               containerStyle='flex gap-2'
               numInputs={length}
               onChange={(value: string) => onChange?.(value)}
               placeholder={placeholder}
               shouldAutoFocus={autoFocus}
               value={value}
               renderInput={(props: InputHTMLAttributes<HTMLInputElement>) => (
                  <input
                     {...props}
                     className={otpInputClass(classNameOptions)}
                     disabled={disabled}
                     onFocus={onFocus}
                  />
               )}
            />
            <ErrorMessage size={size} error={error} />
         </div>
      );
   },
);
export default OTPInput;
