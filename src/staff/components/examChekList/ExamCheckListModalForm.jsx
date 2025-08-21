import { Modal, Box } from '@mui/material';
import { modalStyles } from '../../../app/assets/js/styles';
import { ExamCheckListForm } from './ExamCheckListForm';

export const ExamCheckListModalForm = ({ open, onClose, examCheckListItemData = {} }) => {
  const itemDataFormat = {
    checklist_id: examCheckListItemData?.checklist_id || null,
    userDocument: examCheckListItemData?.cc_empleado || null,
    examTypeId: examCheckListItemData?.tipo_examen_id || null,
    isRequired: examCheckListItemData?.es_requerido || 'SI',
    state: examCheckListItemData?.esta_activo || 'Activo',
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
            <ExamCheckListForm onClose={onClose} initialData={itemDataFormat} />
        </Box>
    </Modal>
  )
}

