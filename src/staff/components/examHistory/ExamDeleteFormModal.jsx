import { Modal, Box } from '@mui/material';
import { modalStyles } from '../../../app/assets/js/styles';
import { ExamDeleteForm } from './ExamDeleteForm';

export const ExamDeleteFormModal = ({ itemID, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={{ 
            ...modalStyles, 
            width: { xs: 'auto', sm: 'auto', md: '50%' },
            boxShadow: 0,
            borderRadius: 0 , 
        }}>
            <ExamDeleteForm onClose={onClose} itemID={itemID}/>
        </Box>
    </Modal>
  )
}
