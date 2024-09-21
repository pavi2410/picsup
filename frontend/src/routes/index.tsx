import { Card, CardBody } from '@nextui-org/react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'sonner';
import { deleteImageById, getAllImages, getImageById } from '../api/images';
import Header from '../components/Header';
import ImageViewerDialog from '../components/ImageViewerDialog';
import Loader from '../components/Loader';
import Masonry from '../components/Masonry';

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad: async ({ location }) => {
    console.log('jwt', document.cookie, document.cookie.includes('jwt='))
    if (!document.cookie.includes('jwt=')) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
})

function Index() {
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const [images, setImages] = useState([])
  const [idx, setIdx] = useState(-1);

  return (
    <>
      <div className="dark:bg-black h-screen">
        <Header />
        <Body setImages={setImages} setIdx={setIdx} setOpenImageModal={setOpenImageViewer} />
      </div>
      <ImageViewerDialog images={images} idx={idx} setIdx={setIdx} open={openImageViewer} setOpen={setOpenImageViewer} />
    </>
  )
}

function Body({ setOpenImageModal, setImages, setIdx }) {
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery({ queryKey: 'images', queryFn: getAllImages })
  const deleteImageMutation = useMutation({
    mutationFn: deleteImageById,
    onSuccess: () => {
      toast.success("Image Sucessfully Deleted!!");
      queryClient.invalidateQueries('images')
    },
    onError: () => {
      toast("Something went wrong! throw your pc");
    }
  })

  const deleteImage = (image_id, e) => {
    deleteImageMutation.mutateAsync({ image_id });
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
    <Card>
      <CardBody>
        <img
          src={getImageById(imageId)}
          loading="lazy"
          style={{ borderRadius: '1rem', width: '100%' }}
          onClick={onClick}
        />
      </CardBody>
    </Card>
  )
}
