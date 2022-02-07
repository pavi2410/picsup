import { useState, useEffect, useMemo, useRef } from "react";
import { toast } from 'react-toastify';
import ml5 from 'ml5'
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImage } from "../api/images";
import { useMutation } from 'react-query'
import { Button, Chip, Dialog, DialogTitle, DialogActions, DialogContent, Stack } from '@mui/material'

export default function ImageUploadDialog({ onClose, open }) {
  const imageFileRef = useRef()
  const classifier = useMemo(() => ml5.imageClassifier('MobileNet', { topk: 1 }), [])
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);

  const uploadImageMutation = useMutation(uploadImage)

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
    onClose();
  };

  const uploadFile = () => {
    const formData = new FormData()
    formData.append('uploaded_file', file)
    formData.append('tags', tags)

    uploadImageMutation.mutateAsync(formData)
      .then(res => {
        toast.success("File Uploaded Sucessfully!!");
        setFile(null);
      })
      .catch(err => {
        toast.error("Some error occured! Try harder ;)");
      });
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add a new photo</DialogTitle>
      <DialogContent>
        <div>
          <label
            className="md:w-96 flex flex-col items-center px-4 py-6 bg-white dark:bg-black font-bold rounded-md shadow-md tracking-wide uppercase border border-green cursor-pointer hover:bg-green-500 hover:text-white text-green-600 ease-linear transition-all duration-150">
            {file ? (
              <img className="max-h-64" src={URL.createObjectURL(file)} ref={imageFileRef} />
            ) : (
              <FaCloudUploadAlt fontSize="3rem" />
            )}
            <span className="mt-2 text-base leading-normal">{file ? file.name : "Select a image"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          </label>
        </div>
        <Stack direction="row" spacing={1} pt={4}>
          {tags.map((tag, i) => (
            <Chip key={i} label={tag} color="primary" variant="outlined" />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button variant="contained" onClick={uploadFile}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
}
