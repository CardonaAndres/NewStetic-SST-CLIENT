export const modalStyles = {
    position: 'absolute' ,
    top: '50%' ,
    left: '50%' ,
    transform: 'translate(-50%, -50%)' ,
    width: { xs: '90%', sm: '70%', md: '90%' }, 
    bgcolor: 'background.black',
    boxShadow: 24 ,
    borderRadius: 2 ,
    maxHeight: '90vh', 
    overflowY: 'auto'
};

export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return `${dateString.substring(0, 4)}/${dateString.substring(4, 6)}/${dateString.substring(6, 8)}`;
};

export const formatDocumentNumber = (number) => { 
  const numberStr = number.toString();
  return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
 }