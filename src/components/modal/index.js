import {Box, Button, IconButton, Modal, TextField, Typography} from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const CustomModal = ({width, title, open, handleClose, children}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${width || '600'}px`,
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'background.default',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  )
}

export default CustomModal