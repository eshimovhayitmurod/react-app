const Spinner = ({ size = 'sm' }: { size: 'sm' | 'md' | 'lg' }) => (
   <div
      className='rounded-[50%] cursor-wait relative'
      style={{ width: size, height: size }}
   >
      <div
         className='rounded-[50%] border-4 border-solid border-[#11734b] left-0 top-0 relative spinner-animation'
         style={{ width: size, height: size }}
      ></div>
   </div>
);
export default Spinner;
