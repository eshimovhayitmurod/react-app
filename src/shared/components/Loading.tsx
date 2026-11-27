import Spinner from './Spinner';
const Loading = () => (
   <div className='main-card-box w-full h-50 flex justify-center items-center cursor-wait'>
      <Spinner />
   </div>
);
export default Loading;
