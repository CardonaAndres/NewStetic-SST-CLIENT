import { modalStyles } from '../../../app/assets/js/styles.js';
import { Modal, Box } from '@mui/material';
import { UserFormModal } from './UserFormModal.jsx';

export const ModalForm = ({ open, onClose, userInfo = {} }) => {

    const initialData = {
        userID: userInfo?.usuario_id || null,
        username: userInfo?.username || null,
        documentNumber: userInfo?.numero_documento || null,
        email: userInfo?.email || null,
        state: userInfo?.estado || 'Activo',
        roleID: userInfo?.rol_id || null,
    }

    if (!open) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ 
                ...modalStyles, 
                width: { xs: 'auto', sm: 'auto', md: '50%' },
                boxShadow: 0,
                borderRadius: 0 , 
            }}>
                <UserFormModal onClose={onClose} initialData={initialData} />
            </Box>
        </Modal>
    )
}
