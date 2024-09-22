import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CloudUploadIcon } from 'lucide-react';
import { useRef, useState } from "react";
import { toast } from 'sonner';
import { uploadImage } from "../api/images";
import { getTagsFromImage } from '../imageClassifier';

export default function ImageUploadDialog({ open, setOpen }) {
  const imageFileRef = useRef()
  const [file, setFile] = useState<File | null>(null);

  const queryClient = useQueryClient()

  const tagsQuery = useQuery({
    enabled: file !== null,
    queryKey: ['tags', file?.name],
    queryFn: () => getTagsFromImage(imageFileRef.current)
  })

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      toast.success("File Uploaded Sucessfully!!");
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['public_images'] })
      queryClient.invalidateQueries({ queryKey: ['images'] })
    },
    onError: () => {
      toast.error("Some error occured! Try harder ;)");
    }
  });

  const handleOpnChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setFile(null)
    }
  };

  const uploadFile = () => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('tags', tagsQuery.data?.join(',') ?? '')

    uploadImageMutation.mutateAsync(formData);
  }

  return (
    <Modal isOpen={open} onOpenChange={handleOpnChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              Add a new photo
            </ModalHeader>
            <ModalBody>
              <div>
                <label
                  className="md:w-96 flex flex-col items-center px-4 py-6 bg-white dark:bg-black font-bold rounded-md shadow-md tracking-wide uppercase border border-green cursor-pointer hover:bg-green-500 hover:text-white text-green-600 ease-linear transition-all duration-150">
                  {file ? (
                    <img className="max-h-64" src={URL.createObjectURL(file)} ref={imageFileRef} />
                  ) : (
                    <CloudUploadIcon />
                  )}
                  <span className="mt-2 text-base leading-normal">{file ? file.name : "Select a image"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0])} />
                </label>
              </div>
              {
                tagsQuery.isLoading ? (
                  <Spinner label='Loading...' />
                ) : tagsQuery.isError ? (
                  <p>Error loading tags</p>
                ) : (
                  <div className="flex flex-row flex-wrap gap-2 pt-4">
                    {tagsQuery.data?.map((tag, i) => (
                      <Chip key={i} color="primary" variant="bordered">{tag}</Chip>
                    ))}
                  </div>
                )
              }
            </ModalBody>
            <ModalFooter>
              <Button variant='bordered' onPress={onClose}>Close</Button>
              <Button color='success' onPress={uploadFile}>Upload</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
