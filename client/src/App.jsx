import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [modalOverlay, setmodalOverlay] = useState(false);
  return (
    <>
      <div className="mx-16">
        <Header setmodalOverlay={setmodalOverlay}/>
        <Body />
      </div>
      {modalOverlay && <ModalOverlay setmodalOverlay={setmodalOverlay} />}
    </>
  )
}

function Header({ setmodalOverlay, modalOverlay }) {
  return (
    <nav className="flex flex-row justify-between p-8">
      <div className="flex flex-row items-center gap-x-4">
        <div>
          <h1 className="font-bold text-xl">picsup</h1>
        </div>
        <div className="flex flex-row justify-center items-center rounded-xl border-2">
          <svg className="z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
            </path>
          </svg>
          <input type="text" placeholder="Search by name" className="p-3 focus:ouline-none bg-clip-content" />
        </div>
      </div>
      <div>
        <button className="bg-green-500 text-white rounded-xl p-3 font-semibold shadow" onClick={() => setmodalOverlay(true)}>Add a photo</button>
      </div>
    </nav>
  )
}

function ModalOverlay({ setmodalOverlay }) {
  return (
    <div className="absolute left-0 top-0 w-full h-full flex justify-center align-center">
      <div className="p-8 bg-white m-auto shadow-xl rounded-xl">
        Hii this is the modal
      </div>
    </div>

  )
}

function Body() {
  const [images, setImages] = useState([])

  useEffect(() => {
    fetch("http://localhost:3100/images")
      .then(res => res.json())
      .then(data => {
        setImages(data.images)
      })
  }, [])

  return (
    <div className="m-8 grid grid-cols-3">
      {images ?
        images.map((image_id, i) => {
          return (
            <div key={i} className="xs:w-full lg:w-5/6 h-auto mb-10 dark:bg-white">
              <img src={`http://localhost:3100/image/${image_id}`} className="rounded-2xl" />
            </div>
          );
        })
        : null
      }
    </div>
  )
}

export default App

/*
https://tailwindcss.com/docs/background-color
https://tailblocks.cc/
https://www.tailwind-kit.com/components/header
https://tailwindcomponents.com/component/responsive-header
https://www.tailwindtoolbox.com/templates/responsive-header
*/
