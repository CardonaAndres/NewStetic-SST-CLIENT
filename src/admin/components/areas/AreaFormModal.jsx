import { modalStyles } from '../../../app/assets/js/styles.js';
import { Modal, Box } from '@mui/material';
import { AreaForm } from './AreaForm.jsx';

export const AreaFormModal = ({ open, onClose, areaData = {} }) => {
    const areaFormatData = {
        area_id: areaData.area_id || null,
        name: areaData.nombre || '',
        state: areaData.estado || 'Activa',
    }

    return (
    <Modal open={open} onClose={onClose}>
        <Box sx={{ 
            ...modalStyles, 
            width: { xs: 'auto', sm: 'auto', md: '50%' },
            boxShadow: 0,
            borderRadius: 0 , 
        }}>
            <AreaForm onClose={onClose} areaData={areaFormatData} />
        </Box>
    </Modal>
  )
}

