import { Modal, Box } from '@mui/material';
import { modalStyles } from '../../../app/assets/js/styles';
import { ExamForm } from './ExamForm';

export const ExamFormModal = ({ open, onClose, recordData = {} }) => {  
  const initialData = {
    checklist_item_id: recordData?.checklist_item_id || null,
    observations: recordData?.observaciones || '',
    document: recordData?.PDF_url || null,
    state: recordData?.estado || 'Pendiente',
    frequencyInDays: recordData?.frecuencia_dias || null,
    expirationDate: recordData?.fecha_vencimiento 
       ? new Date(recordData.fecha_vencimiento).toISOString().split('T')[0] 
       : '',
    dateMade: recordData?.fecha_realizado 
      ? new Date(recordData.fecha_realizado).toISOString().split('T')[0] 
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



