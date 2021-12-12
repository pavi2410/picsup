import { HOST } from '../App';

export default function ImageModalOverlay({ images, idx, setOpenImageModal, setIdx }) {
    return (
      <div className="fixed left-0 top-0 z-10 overflow-y-hidden w-full h-full flex justify-center align-center bg-green-200 backdrop-filter backdrop-blur-3xl bg-opacity-50">
        <div className="m-auto">
          <img src={`${HOST}/image/${images[idx]}`} className="sm:w-screen sm:h-auto md:w-auto md:h-96" />
          <div className="flex items-center justify-center pt-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              onClick={() => setOpenImageModal(false)}
            >
              Close
            </button>
            <button
              className="bg-green-500 text-white rounded-xl p-3 font-semibold shadow mr-1"
              onClick={() => { if (idx > 0) setIdx(idx - 1) }}
            >
              Prev
            </button>
            <button className="bg-green-500 text-white rounded-xl p-3 font-semibold shadow" onClick={() => { if (idx < images.length-1) setIdx(idx + 1) }}>
              Next
            </button>
          </div>
        </div>
      </div>
    )
  }