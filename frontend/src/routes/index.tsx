import { Card, CardBody, CardFooter } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteImageById, getAllImages, getImageById } from '../api/images';
import Header from '../components/Header';
import ImageViewerDialog from '../components/ImageViewerDialog';
import Loader from '../components/Loader';

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad: async ({ location }) => {
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
      <div className="h-screen">
        <Header />
        <Body setImages={setImages} setIdx={setIdx} setOpenImageModal={setOpenImageViewer} />
      </div>
      <ImageViewerDialog images={images} idx={idx} setIdx={setIdx} open={openImageViewer} setOpen={setOpenImageViewer} />
    </>
  )
}

function Body({ setOpenImageModal, setImages, setIdx }) {
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery({
    queryKey: ['public_images'],
    queryFn: getAllImages
  })

  const deleteImageMutation = useMutation({
    mutationFn: deleteImageById,
    onSuccess: () => {
      toast.success("Image Sucessfully Deleted!!");
      queryClient.invalidateQueries({ queryKey: ['public_images'] })
    },
    onError: () => {
      toast("Something went wrong! throw your pc");
    }
  })

  const deleteImage = (image_id, e) => {
    deleteImageMutation.mutateAsync(image_id);
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {data.images.map((imageId, index) => (
        <ImageCard key={index} imageId={imageId} onClick={() => openModal(index)} />
      ))}
    </div>
  );
}

function ImageCard({ imageId, onClick }) {
  return (
    <Card isFooterBlurred>
      <CardBody>
        <img
          src={getImageById(imageId)}
          loading="lazy"
          className='rounded-2xl w-full'
          onClick={onClick}
        />
      </CardBody>
      <CardFooter className='absolute bottom-0 p-4'>
        {JSON.stringify(imageId)}
      </CardFooter>
    </Card>
  )
}
