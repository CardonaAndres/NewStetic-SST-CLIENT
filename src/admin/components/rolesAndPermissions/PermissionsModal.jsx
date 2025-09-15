import { Modal, Box } from '@mui/material';
import { modalStyles } from '../../../app/assets/js/styles.js';
import { PermissionsView } from './PermissionsView.jsx';

export const PermissionsModal = ({ open, onClose, role = null }) => {
 
    if(!open) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ 
                ...modalStyles, 
                boxShadow: 0,
                borderRadius: 0 , 
            }}>
                <PermissionsView onClose={onClose} role={role} />
            </Box>
        </Modal>
    )
}
