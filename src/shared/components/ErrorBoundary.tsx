import sendErrorMessage from '@shared/helpers/sendErrorMessage';
import {
   Component,
   type ComponentType,
   type ErrorInfo,
   type ExoticComponent,
   type ReactNode,
} from 'react';
type ErrorBoundaryProps = {
   children: ReactNode;
   className?: string;
   Fallback?: ComponentType | ExoticComponent;
};
type ErrorBoundaryState = {
   hasError: boolean;
   error: Error | null;
};
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
   constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false, error: null };
   }
   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
      return { hasError: true, error };
   }
   componentDidCatch(error: Error, _errorInfo: ErrorInfo) {
      const name: unknown = error?.name;
      const ErrorType =
         typeof name === 'object'
            ? JSON.stringify(error?.name)
            : String(error?.name);
      const stack: unknown = error?.stack;
      const ErrorMessage =
         typeof stack === 'object'
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
         const className =
            this.props.className +
            ' main-bg-color flex items-center justify-center';
         return Fallback ? (
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
