import {
   Bounce,
   Flip,
   Slide,
   ToastOptions,
   TypeOptions,
   Zoom,
   toast,
} from 'react-toastify';
export type NotificationType = TypeOptions; // 'info' | 'success' | 'warning' | 'error' | 'default'
export interface NotificationOptions extends Omit<ToastOptions, 'transition'> {
   type?: NotificationType;
   transition?: ToastOptions['transition'];
}
export const notification = (
   message: React.ReactNode = '',
   options: NotificationOptions = {},
): void => {
   const { type = 'info', ...restOptions } = options;
   const transitions = [Bounce, Flip, Slide, Zoom];
   const randomTransition =
      transitions[Math.floor(Math.random() * transitions.length)];
   const finalOptions: ToastOptions = {
      ...restOptions,
      transition: options.transition || randomTransition,
   };
   const validTypes: NotificationType[] = [
      'error',
      'info',
      'success',
      'warning',
   ];
   if (validTypes.includes(type as NotificationType)) {
      toast[type as 'error' | 'info' | 'success' | 'warning'](
         message,
         finalOptions,
      );
   } else {
      toast(message, finalOptions);
   }
};
export default notification;
