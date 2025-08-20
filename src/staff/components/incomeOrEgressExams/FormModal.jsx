import { Modal, Box } from '@mui/material';
import { modalStyles } from '../../../app/assets/js/styles';

export const FormModal = ({ open, onClose, exam = {}, cc }) => {  
  const initialData = {
    userDoc: cc,
    observations: exam?.observaciones || '',
    document: exam?.PDF_url || null,
    state: exam?.estado || 'Pendiente',
  }

  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={{ 
            ...modalStyles, 
            width: { xs: 'auto', sm: 'auto', md: '50%' },
            boxShadow: 0,
            borderRadius: 0 , 
        }}>
            
        </Box>
    </Modal>
  )
}



