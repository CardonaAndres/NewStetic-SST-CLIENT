import { Modal, Box } from '@mui/material';
import { modalStyles } from '../../../app/assets/js/styles.js';
import { RoleAndPermissionsForm } from './RoleAndPermissionsForm.jsx'

export const FormModal = ({ open, onClose, roleInfo = {} }) => {

    if(!open) return null;

    const initialData = {
        roleID: roleInfo.rol_id || null,
        name: roleInfo.nombre || '',
        description: roleInfo.descripcion || '',
        permissions: roleInfo.permissions || []
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ 
                ...modalStyles, 
                boxShadow: 0,
                borderRadius: 0 , 
            }}>
                <RoleAndPermissionsForm onClose={onClose} initialData={initialData} />
            </Box>
        </Modal>
    )
}
