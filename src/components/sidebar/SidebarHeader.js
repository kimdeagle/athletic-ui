import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {MenuItem} from "react-pro-sidebar";

const SidebarHeader = ({isCollapsed, setIsCollapsed}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <MenuItem
      onClick={() => setIsCollapsed(!isCollapsed)}
      icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
      style={{
        margin: "10px 0 20px 0",
        color: colors.grey[100]
      }}
    >
      {!isCollapsed && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          ml="15px"
        >
          <Typography variant="h3" fontWeight="bold" color={colors.grey[100]}>
            Athletic
          </Typography>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuOutlinedIcon />
          </IconButton>
        </Box>
      )}
    </MenuItem>
  )
}

export default SidebarHeader