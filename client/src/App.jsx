import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [modalOverlay, setmodalOverlay] = useState(false);
  return (
    <div className="m-10">
      <Header setmodalOverlay={setmodalOverlay}/>
      {modalOverlay && <ModalOverlay setmodalOverlay={setmodalOverlay} />}
      <Body />
    </div>
  )
}

function Header({setmodalOverlay}) {
  return (
    <nav className="flex flex-row justify-between px-8 py-4">
      <div className="flex flex-row">
        <h1 className="font-bold">picsup</h1>
        <div>
          <svg className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
            </path>
          </svg>
          <input type="text" placeholder="Search by name" className="p-2 rounded-xl border-2" />
        </div>
      </div>
      <div>
        <button className="" onClick={() => setmodalOverlay(true)}>Add a photo</button>
      </div>
    </nav>
  )
}

function ModalOverlay({setmodalOverlay}) {
  return (
    <div>
      
    </div>
  )
}

function Body() {
  const [images, setImages] = useState([{id:1,url:"https://via.placeholder.com/150"}])
  return (
    <div>
      {images ?
        images.map((image) => {
          return (
          <div key={image.id} className="xs:w-full lg:w-5/6 h-auto mb-10 dark:bg-white">
            <img src={image.url} className="rounded-2xl"/>
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
https://tailblocks.cc/
https://www.tailwind-kit.com/components/header
https://tailwindcomponents.com/component/responsive-header
https://www.tailwindtoolbox.com/templates/responsive-header
*/
