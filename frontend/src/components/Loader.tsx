import { Spinner } from '@nextui-org/react';

export default function Loader() {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Spinner />
    </div>
  )
}