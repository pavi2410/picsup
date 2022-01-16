import { useState, useEffect } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { HOST } from '../App';
import ModalOverlay from '../components/ModalOverlay';
import ImageModalOverlay from '../components/ImageModalOverlay';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { useAuth } from '../auth';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

function OwnerPage() {
  const [modalOverlay, setmodalOverlay] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(-1);

  return (
    <>
      <div className="dark:bg-black h-screen" >
        <Header setmodalOverlay={setmodalOverlay} />
        <Body loading={loading} setLoading={setLoading} images={images} setImages={setImages} setIdx={setIdx} modalOverlay={modalOverlay} setOpenImageModal={setOpenImageModal} />
      </div>
      {modalOverlay && <ModalOverlay setmodalOverlay={setmodalOverlay} loading={loading} setLoading={setLoading} />}
      {openImageModal && <ImageModalOverlay images={images} idx={idx} setIdx={setIdx} setOpenImageModal={setOpenImageModal} loading={loading} setLoading={setLoading} />}
    </>
  )
}

function Body({ modalOverlay, loading, setLoading, setOpenImageModal, images, setImages, setIdx }) {
  const auth = useAuth()

  const [refresh, setRefresh] = useState(0)

  //-----------For deleting image --------------------
  const deleteImage = (image_id, e) => {
    // console.log(image_id);
    const deleteMethod = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `JWT ${auth.token}`
      }
    }
    fetch(`${HOST}/image/${image_id}`, deleteMethod)
      .then(res => {

        if (!res.ok) {
          toast("You cannot delete this image!!", { type: "error" });
          return
        }
        toast("Image Sucessfully Deleted!!", { type: "success" });
        console.log("Image Sucessfully Deleted");
        setRefresh(refresh + 1);
      })
      .catch(err => {
        console.log(err + "Error occured! Please try Again!!!");
        toast("Something went wrong! throw your pc")
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
    fetch(`${HOST}/me/images`, {
      headers: {
        'Authorization': `JWT ${auth.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setImages(data.images)
        setLoading(false)
      })
  }, [refresh])

  const openmodal = (i, e) => {
    console.log(images[i]);
    setIdx(i);
    setOpenImageModal(true);
  }

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }} className="px-16 dark:bg-black">
      <Masonry gutter="24px">
        {(images && images.length) ?
          images.map((image_id, i) => {
            return (
              <div className="container" key={i}>
                <img src={`${HOST}/image/${image_id}`} onClick={(e) => { openmodal(i, e) }} key={i} className="rounded-md w-full" loading="lazy" />
                <button onClick={(e) => deleteImage(image_id, e)} className="btn rounded-full border-2 border-red-500 text-red-500 m-2 p-2">
                  <FaTrashAlt />
                </button>
              </div>
            );
          })
          : (
            <div className="">
              You have no images. Upload some now!
            </div>
          )
        }
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default OwnerPage