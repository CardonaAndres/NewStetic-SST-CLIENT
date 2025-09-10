import { modalStyles } from '../../../app/assets/js/styles.js';
import { Modal, Box } from '@mui/material';
import { UserForm } from './UserForm.jsx';

export const ModalForm = ({ open, onClose, userInfo = {} }) => {

    if (!open) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ 
                ...modalStyles, 
                width: { xs: 'auto', sm: 'auto', md: '50%' },
                boxShadow: 0,
                borderRadius: 0 , 
            }}>
                <UserForm onClose={onClose} />
            </Box>
        </Modal>
    )
}
