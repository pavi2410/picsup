import { Card, CardBody, CardFooter } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteImageById, getAllOwnerImages, getOwnerImageById } from '../../api/images';
import Header from '../../components/Header';
import ImageViewerDialog from '../../components/ImageViewerDialog';
import Loader from '../../components/Loader';

export const Route = createFileRoute('/me/images')({
  component: OwnerImages,
})

function OwnerImages() {
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
    queryKey: ['images'],
    queryFn: getAllOwnerImages
  })

  const deleteImageMutation = useMutation({
    mutationFn: deleteImageById,
    onSuccess: () => {
      toast.success("Image Sucessfully Deleted!!");
      queryClient.invalidateQueries({ queryKey: ['images'] })
    },
    onError: () => {
      toast("Something went wrong! throw your pc");
    }
  })

  const deleteImage = (image_id, e) => {
    deleteImageMutation.mutateAsync(image_id);
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
          src={getOwnerImageById(imageId)}
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