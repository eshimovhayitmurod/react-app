import { Spinner } from '@shared/components';
const Loading = () => (
   <div className='h-dvh w-screen bg-white dark:bg-slate-900 flex items-center justify-center cursor-wait'>
      <Spinner />
   </div>
);
export default Loading;
