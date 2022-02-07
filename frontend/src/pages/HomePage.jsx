import { useState } from 'react'
import ImageViewerDialog from '../components/ImageViewerDialog';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { Box } from '@mui/material'
import { Masonry } from '@mui/lab'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { deleteImageById, getAllImages, getImageById } from '../api/images';

function HomePage() {
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

  const { isLoading, data } = useQuery('images', getAllImages)
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

  const openModal = (i) => {
    setImages(data.data.images)
    setIdx(i);
    setOpenImageModal(true);
  }

  if (isLoading || !data) {
    return <Loader />
  }

  return (
    <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={2} sx={{ pl: 4 }}>
      {data?.data?.images.map((imageId, index) => (
        <ImageCard key={index} imageId={imageId} onClick={() => openModal(index)} />
      ))}
    </Masonry>
  );
}

function ImageCard({ imageId, onClick }) {
  return (
    <Box w="1" bgcolor="white" borderRadius="1rem">
      <img
        src={getImageById(imageId)}
        loading="lazy"
        style={{ borderRadius: '1rem', width: '100%' }}
        onClick={onClick}
      />
    </Box>
  )
}

export default HomePage
