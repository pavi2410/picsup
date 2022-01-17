import { useState } from 'react'
import { HOST } from '../App';
import ImageViewerDialog from '../components/ImageViewerDialog';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Stack } from '@mui/material'
import { Masonry } from '@mui/lab'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { deleteImageById, getAllOwnerImages } from '../api/images';

function OwnerPage() {
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const [images, setImages] = useState([])
  const [idx, setIdx] = useState(-1);

  return (
    <>
      <div className="dark:bg-black h-screen">
        <Header />
        <Body setImages={setImages} setIdx={setIdx} setOpenImageModal={setOpenImageViewer} />
      </div>
      <ImageViewerDialog images={images} idx={idx} setIdx={setIdx} open={openImageViewer} onClose={() => setOpenImageViewer(false)} />
    </>
  )
}

function Body({ setOpenImageModal, setImages, setIdx }) {
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery('owner-images', getAllOwnerImages)
  const deleteImageMutation = useMutation(deleteImageById, {
    onSuccess: () => {
      queryClient.invalidateQueries('owner-images')
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

  const openModal = (i) => {
    console.log(i);
    setImages(data.data.images)
    setIdx(i);
    setOpenImageModal(true);
  }

  if (isLoading || !data) {
    return <Loader />
  }

  return (
    <Masonry columns={3} spacing={2}>
      {data?.data?.images?.map((imageId, index) => (
        <Stack key={index} borderRadius={48}>
          <img
            src={HOST + '/images/image/' + imageId}
            loading="lazy"
            onClick={() => openModal(index)}
          />
        </Stack>
      ))}
    </Masonry>
  );
}

export default OwnerPage
