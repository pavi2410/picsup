import { useState } from 'react'
import { HOST } from '../App';
import ModalOverlay from '../components/ModalOverlay';
import ImageModalOverlay from '../components/ImageModalOverlay';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { Stack } from '@mui/material'
import { Masonry } from '@mui/lab'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { deleteImageById, getAllImages } from '../api/images';

function HomePage() {
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

function Body({ modalOverlay, setOpenImageModal, setIdx }) {
  const queryClient = useQueryClient()

  const { isLoading, res } = useQuery('images', getAllImages)
  const deleteImageMutation = useMutation(deleteImageById, {
    onSuccess: () => {
      queryClient.invalidateQueries('images')
    }
  })

  const deleteImage = (image_id, e) => {
    deleteImageMutation.mutateAsync({ image_id })
      .then(res => {
        toast.success("Image Sucessfully Deleted!!");
      })
      .catch(err => {
        toast("Something went wrong! throw your pc")
      })
  }

  const openModal = (i, e) => {
    // console.log(images[i]);
    setIdx(i);
    setOpenImageModal(true);
  }

  if (isLoading || !res) {
    return (
      <Loader />
    )
  }

  return (
    <Masonry columns={3} spacing={2}>
      {res?.data?.images.map((imageId, index) => (
        <Stack key={index} borderRadius={48}>
          <img
            src={HOST + '/images/image/' + imageId}
            loading="lazy"
          />
        </Stack>
      ))}
    </Masonry>
  );
}

export default HomePage
