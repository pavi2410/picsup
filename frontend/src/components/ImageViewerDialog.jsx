import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'
import { API_HOST } from '../config'

export default function ImageViewerDialog({ onClose, open, images, idx, setIdx }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent>
        <img src={API_HOST + '/images/image/' + images[idx]} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button variant="contained" onClick={() => { if (idx > 0) setIdx(idx - 1) }}>Prev</Button>
        <Button variant="contained" onClick={() => { if (idx < images.length - 1) setIdx(idx + 1) }}>Next</Button>
      </DialogActions>
    </Dialog>
  );
}
