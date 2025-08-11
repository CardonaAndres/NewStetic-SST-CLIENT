import { ExamLogs } from './ExamLogs';
import { Modal, Box } from '@mui/material';
import { modalStyles } from '../../../app/assets/js/styles';

export const ExamLogsModal = ({ open, onClose, checkListItemID }) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={{ 
            ...modalStyles, 
            width: { xs: 'auto', sm: 'auto', md: '50%' },
            boxShadow: 0,
            borderRadius: 0 , 
        }}>
            <ExamLogs checkListItemID={checkListItemID} onClose={onClose} />
        </Box>
    </Modal>
  )
}

