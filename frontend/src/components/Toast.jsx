import { BsFillExclamationCircleFill } from 'react-icons/bs';

export default function Toast({ message }) {
  return (
    <div class="fixed right-5 bottom-20 flex bg-orange-400 w-3/12 border-l-4 border-orange-700 py-2 px-3 shadow-md mb-2">
      <div class="h-5 w-5 text-orange-500 rounded-full bg-white mr-3">
        <BsFillExclamationCircleFill className="h-5 w-5 fill-current" />
      </div>
      <div class="text-white max-w-xs ">
        {message}
      </div>
    </div>
  )
}