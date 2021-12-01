import { useState, useEffect } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { HOST } from '../App';

function HomePage() {
  const [modalOverlay, setmodalOverlay] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(-1);

  return (
    <>
      <div className="md:mx-16">
        <Header setmodalOverlay={setmodalOverlay} />
        <Body loading={loading} setLoading={setLoading} images={images} setImages={setImages} setIdx={setIdx} modalOverlay={modalOverlay} setOpenImageModal={setOpenImageModal} />
      </div>
      {modalOverlay && <ModalOverlay setmodalOverlay={setmodalOverlay} loading={loading} setLoading={setLoading} />}
      {openImageModal && <ImageModalOverlay images={images} idx={idx} setIdx={setIdx} setOpenImageModal={setOpenImageModal} loading={loading} setLoading={setLoading} />}
    </>
  )
}

function Header({ setmodalOverlay }) {
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
  const [file, setFile] = useState(null);

  const uploadFile = () => {
    const formData = new FormData()
    formData.append(
      'uploaded_file',
      file
    )
    fetch(`${HOST}/upload`, { method: 'POST', body: formData })
      .then(res => {
        console.log("File Uploaded Sucessfully");
        setFile(null);
        setmodalOverlay(false);
      })
      .catch(err => console.log(err));
  }
  return (
    <div className="fixed left-0 top-0 z-10 overflow-y-hidden w-full h-full flex justify-center align-center bg-green-200 backdrop-filter backdrop-blur-3xl bg-opacity-50">
      <div className="h-full w-full md:h-auto md:w-auto py-8 px-10 bg-white m-auto shadow-xl rounded-xl">
        <p className="font-bold text-2xl mb-16">Add a new photo</p>
        <div className="pb-16">
          <label
            className="md:w-96 flex flex-col items-center px-4 py-6 bg-white font-bold rounded-md shadow-md tracking-wide uppercase border border-green cursor-pointer hover:bg-green-500 hover:text-white text-green-600 ease-linear transition-all duration-150">
            <i className="fas fa-cloud-upload-alt fa-3x"></i>
            {file && <img className="max-h-64" src={URL.createObjectURL(file)} />}
            <span className="mt-2 text-base leading-normal">{file ? file.name : "Select a image"}</span>
            <input type='file' className="hidden" onChange={(e) => setFile(e.target.files[0])} />
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

function Body({ modalOverlay, loading, setLoading, setOpenImageModal, images, setImages, setIdx }) {
  const [refresh, setRefresh] = useState(0)

  //-----------For deleting image --------------------
  const deleteImage = (image_id, e) => {
    // console.log(image_id);
    const deleteMethod = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }
    fetch(`${HOST}/image/${image_id}`, deleteMethod)
      .then(res => {
        console.log("Image Sucessfully Deleted");
        setRefresh(refresh + 1);
      })
      .catch(err => {
        console.log(err + "Error occured! Please try Again!!!");
      })
  }

  //--------------refresh after modal closes -----------------
  useEffect(() => {
    if (modalOverlay == false) {
      setRefresh(refresh + 1)
    }
  }, [modalOverlay])

  //---------------useeffect to display when load or refresh changes------------
  useEffect(() => {
    fetch(`${HOST}/images`)
      .then(res => res.json())
      .then(data => {
        setImages(data.images)
      })
      .then(() => {
        setLoading(false)
      })
  }, [refresh])

  const openmodal = (i, e) => {
    console.log(images[i]);
    setIdx(i);
    setOpenImageModal(true);
  }

  if (loading)
    return <Loader />
  return (<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
    <Masonry gutter={24}>
      {images ?
        images.map((image_id, i) => {
          return (
            <div className="container" key={i}>
              <img src={`${HOST}/image/${image_id}`} onClick={(e) => { openmodal(i, e) }} key={i} className="rounded-md w-full" />
              <button onClick={(e) => deleteImage(image_id, e)} className="btn">
                <div style={{ color: "#EB5757", fontWeight: "500", fontSize: "18px", padding: "8px" }} className="text">delete</div>
              </button>
            </div>
          );
        })
        : null
      }
    </Masonry>
  </ResponsiveMasonry>);
}

// https://react-icons.github.io/react-icons/

function ImageModalOverlay({ images, idx, setOpenImageModal, setIdx }) {
  return (
    <div className="fixed left-0 top-0 z-10 overflow-y-hidden w-full h-full flex justify-center align-center bg-green-200 backdrop-filter backdrop-blur-3xl bg-opacity-50">
      <div className="m-auto">
        <img src={`${HOST}/image/${images[idx]}`} className="max-h-96" />
        <div className="flex items-center justify-center pt-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
            className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
            onClick={() => setOpenImageModal(false)}
          >
            Close
          </button>
          <button
            className="bg-green-500 text-white rounded-xl p-3 font-semibold shadow mr-1"
            onClick={() => {if(idx>=0) setIdx(idx-1)}}
          >
            Prev
          </button>
          <button className="bg-green-500 text-white rounded-xl p-3 font-semibold shadow" onClick={() => {if(idx<images.length) setIdx(idx+1)}}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

function Loader() {
  return (
    <div className="flex justify-center items-center">
      {/* <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /> */}
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
  )
}

export default HomePage
