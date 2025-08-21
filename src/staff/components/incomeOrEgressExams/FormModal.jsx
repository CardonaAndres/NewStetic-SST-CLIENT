import { Modal, Box } from '@mui/material';
import { ExamForm } from './ExamForm';
import { modalStyles } from '../../../app/assets/js/styles';

export const FormModal = ({ open, onClose, exam = {}, cc = null }) => {  
  const initialData = {
    userDocument: exam?.cc_empleado || cc,
    checklist_item_id: exam?.checklist_item_id || null,
    observations: exam?.observaciones || '',
    document: exam?.PDF_url || null,
    state: exam?.estado_item || 'Pendiente',
    dateMade: exam?.fecha_realizado 
      ? new Date(exam.fecha_realizado).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0],
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
            <ExamForm onClose={onClose} initialData={initialData} />
        </Box>
    </Modal>
  )
}



