import i18next from 'i18next';
import {
   Component,
   type ComponentType,
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
                  {i18next.t('common:unexpected_error')}
               </h1>
            </div>
         );
      }
      return this.props.children;
   }
}
export default ErrorBoundary;
