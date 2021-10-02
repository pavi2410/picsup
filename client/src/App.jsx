import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [modalOverlay, setmodalOverlay] = useState(false);
  return (
    <>
      <div className="md:mx-16">
        <Header setmodalOverlay={setmodalOverlay}/>
        <Body />
      </div>
      {modalOverlay && <ModalOverlay setmodalOverlay={setmodalOverlay} />}
    </>
  )
}

function Header({ setmodalOverlay, modalOverlay }) {
  return (
    <nav className="flex flex-row justify-between items-center p-8">
      <div className="flex flex-row items-center gap-x-4">
        <div>
          <h1 className="font-bold tracking-wider text-2xl">picsup</h1>
        </div>
        <div className="flex flex-row justify-center items-center rounded-xl border-2 hidden">
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
  const [images, setImages] = useState(null);

  const uploadFile = ()=>{
    const formData = new FormData()
    formData.append(
      'uploaded_file',
      images
    )
    fetch("http://localhost:3100/upload", {method: 'POST', body: formData})
    .then(res => {
      console.log("File Uploaded Sucessfully");
      setImages(null);
      setmodalOverlay(false);
    })
    .catch(err => console.log(err));
  }
  return (
    <div className="absolute left-0 top-0 w-full h-full flex justify-center align-center bg-green-200 backdrop-filter backdrop-blur-3xl bg-opacity-50">
      <div className="py-8 px-10 bg-white m-auto shadow-xl rounded-xl">
        <p className="font-bold text-2xl mb-16">Add a new photo</p>
        <div className="pb-16">
          <label
            className="w-96 flex flex-col items-center px-4 py-6 bg-white font-bold rounded-md shadow-md tracking-wide uppercase border border-green cursor-pointer hover:bg-green-500 hover:text-white text-green-600 ease-linear transition-all duration-150">
            <i className="fas fa-cloud-upload-alt fa-3x"></i>
            {images && <img src={URL.createObjectURL(images)}/>}
            <span className="mt-2 text-base leading-normal">{images ? images.name : "Select a image"}</span>
            <input type='file' className="hidden" onChange={(e)=>setImages(e.target.files[0])}/>
          </label>
          {/* <input className="border-gray-300 focus:ring-blue-600 block w-full overflow-hidden cursor-pointer border text-gray-800 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
            aria-describedby="view_model_avatar_help" id="view_model_avatar" name="view_model[avatar]" }
            type="file"
          /> */}
        </div>
        <div className="flex items-center justify-end pt-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
            className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
            onClick={() => setmodalOverlay(false)}
          >
            Close
          </button>
          <button className="bg-green-500 text-white rounded-xl p-3 font-semibold shadow" onClick={uploadFile}>
            Upload
          </button>
        </div>
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
    <div className="m-4 grid md:grid-cols-3 gap-x-6">
      {images ?
        images.map((image_id, i) => {
          return (
            <div key={i} className="xs:w-full h-auto mb-10 dark:bg-white">
              <img src={`http://localhost:3100/image/${image_id}`} className="object-cover rounded-xl h-auto" />
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
