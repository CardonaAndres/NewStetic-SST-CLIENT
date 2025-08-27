import { Modal, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { LoginForm } from '../pages/LoginForm';

export const LoginModal = ({ open, onClose }) => {

  if(!open) return null

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      x: 100,
      y: -50
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.2,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
        <Modal open={open} onClose={onClose} closeAfterTransition sx={{
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)'
            }
          }}
        >
          <motion.div variants={backdropVariants} initial="hidden" animate="visible"
            exit="exit" style={{ width: '100%', height: '100%' }}
          >
            <Box sx={{ 
              position: 'absolute',
              top: '5%',
              right: '5%',
              width: { xs: '90%', sm: '45%', md: '40%', lg: '35%' },
              maxWidth: '500px',
              bgcolor: 'transparent',
              outline: 'none'
            }}>
                <LoginForm onClose={onClose} modalVariants={modalVariants} />
            </Box>
          </motion.div>
        </Modal>
  );
};