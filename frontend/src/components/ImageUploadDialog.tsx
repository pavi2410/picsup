import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { CloudUploadIcon } from 'lucide-react';
import ml5 from 'ml5';
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import { uploadImage } from "../api/images";

export default function ImageUploadDialog({ open, setOpen }) {
  const imageFileRef = useRef()
  const classifier = useMemo(() => ml5.imageClassifier('MobileNet', { topk: 1 }), [])
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      toast.success("File Uploaded Sucessfully!!");
      setFile(null);
    },
    onError: () => {
      toast.error("Some error occured! Try harder ;)");
    }
  });

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => {
        classifier
          .then(it => it.classify(imageFileRef.current))
          .then(result => {
            const predictions = [...new Set(result[0].label.replaceAll(',', '').split(' '))]
            console.log({ result, predictions })
            setTags(predictions);
          })
      }, 1000)
      return () => clearTimeout(timer);
    }
  }, [file])

  const handleClose = () => {
    setFile(null)
    setTags([])
    setOpen(false);
  };

  const uploadFile = () => {
    const formData = new FormData()
    formData.append('uploaded_file', file)
    formData.append('tags', tags)

    uploadImageMutation.mutateAsync(formData);
  }

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
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
              <div className="flex flex-row gap-2 pt-4">
                {tags.map((tag, i) => (
                  <Chip key={i} color="primary" variant="bordered">{tag}</Chip>
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>Close</Button>
              <Button onPress={uploadFile}>Upload</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
