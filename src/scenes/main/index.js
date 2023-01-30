import ContentHeader from "../../components/ContentHeader";
import {Box} from "@mui/material";

const Main = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <ContentHeader title="MAIN" subTitle="Welcome to your main" />
      </Box>
    </Box>
  )
}

export default Main