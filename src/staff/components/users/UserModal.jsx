import { Modal, Box, Backdrop } from '@mui/material';
import { modalStyles } from '../../../app/assets/js/styles';
import { UserDetailComponent } from './UserDetailComponent';

export const UserModal = ({ open, onClose, user }) => {
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
        <UserDetailComponent user={user} onClose={onClose} />
      </Box>
    </Modal>
  );
};
