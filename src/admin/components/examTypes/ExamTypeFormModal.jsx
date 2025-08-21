import { modalStyles } from '../../../app/assets/js/styles.js';
import { Modal, Box } from '@mui/material';
import { ExamTypeForm } from './ExamTypeForm.jsx';

export const ExamTypeFormModal = ({ open, onClose, examTypeData = {} }) => {
    const examTypeFormatData = {
        exam_type_id: examTypeData.tipo_examen_id || null,
        name: examTypeData.nombre || '',
        state: examTypeData.estado || 'Activo',
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
            <ExamTypeForm onClose={onClose} examTypeData={examTypeFormatData} />
        </Box>
    </Modal>
  )
}

