import sendErrorMessage from '@shared/helpers/sendErrorMessage';
import { Component } from 'react';
class ErrorBoundary extends Component {
   constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
   }
   static getDerivedStateFromError(error) {
      return { hasError: true, error };
   }
   componentDidCatch(error) {
      const name = error?.name;
      const ErrorType =
         typeof name === 'object'
            ? JSON.stringify(error?.name)
            : String(error?.name);
      const ErrorMessage =
         typeof name === 'object'
            ? JSON.stringify(error?.stack)
            : String(error?.stack);
      const newError = {
         APIData: '',
         APIMethod: '',
         APIResponse: '',
         APIStatus: '',
         APIUrl: '',
         ErrorMessage,
         ErrorPriority: 'High',
         ErrorType,
      };
      sendErrorMessage(newError);
   }
   render() {
      if (this.state.hasError) {
         const Fallback = this.props.Fallback;
         const isValid = ['function', 'object'].includes(typeof Fallback);
         const className =
            this.props.className +
            ' main-bg-color flex items-center justify-center';
         return isValid ? (
            <Fallback />
         ) : (
            <div className={className}>
               <h1 className='text-[#ed4c5c] text-[18px] font-medium text-center'>
                  Kutilmagan xatolik yuz berdi
               </h1>
            </div>
         );
      }
      return this.props.children;
   }
}
export default ErrorBoundary;
