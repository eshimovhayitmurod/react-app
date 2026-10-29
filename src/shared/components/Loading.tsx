import Spinner from './Spinner';
const Loading = ({
   size = 'sm',
}: {
   size?: 'sm' | 'md' | 'lg' | undefined;
}) => (
   <div className='main-bg-color items-center cursor-wait flex h-full w-full justify-center rounded-xl'>
      <Spinner size={size} />
   </div>
);
export default Loading;
