import { Modal, Box } from '@mui/material';
import { PDFViewer } from './PDFViewer';

export const PDFViewerModal = ({ exam, open, onClose }) => {
  if (!open) return null;
  
  return (
    <Modal 
      open={open} 
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Box sx={{ 
        width: { xs: '95vw', sm: '90vw', md: '80vw', lg: '90vw' },
        height: { xs: '90vh', sm: '85vh', md: '95vh' },
        maxWidth: '1200px',
        outline: 'none',
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
        <PDFViewer
          onClose={onClose} 
          pdfUrl={exam?.PDF_url} 
        />
      </Box>
    </Modal>
  )
}