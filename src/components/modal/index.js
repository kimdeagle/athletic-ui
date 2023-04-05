import {Box, IconButton, Modal, Typography} from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const CustomModal = ({width, title, subtitle, open, handleClose, children}) => {
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
          flexDirection='column'
          mb={2}
        >
          {title &&
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mb={1}
            >
              <Typography id="modal-title" variant="h3">
                {title}
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
          }
          {subtitle &&
            <Typography id="modal-subtitle" variant="h5">
              {subtitle}
            </Typography>
          }
        </Box>
        {children}
      </Box>
    </Modal>
  )
}

export default CustomModal