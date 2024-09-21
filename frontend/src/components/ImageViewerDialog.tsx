import { Button, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';
import { API_HOST } from '../api/config';

export default function ImageViewerDialog({ open, setOpen, images, idx, setIdx }) {
  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <img src={API_HOST + '/images/image/' + images[idx]} />

            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>Close</Button>
              <Button onPress={() => { if (idx > 0) setIdx(idx - 1) }}>Prev</Button>
              <Button onPress={() => { if (idx < images.length - 1) setIdx(idx + 1) }}>Next</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
