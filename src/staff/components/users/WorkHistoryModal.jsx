import { Modal, Box, Backdrop } from '@mui/material';
import { modalStyles } from '../../../app/assets/js/styles';
import { WorkHistory } from './WorkHistory';

export const WorkHistoryModal = ({ open, onClose, user }) => {
  const handleClose = (_, reason) => {
    if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown')) return;
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Box sx={modalStyles} onClick={(e) => e.stopPropagation()}>
        <WorkHistory onClose={onClose} user={user} />
      </Box>
    </Modal>
  );
};
