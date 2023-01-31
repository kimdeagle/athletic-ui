import ContentHeader from "../../components/ContentHeader";
import {Box} from "@mui/material";

const Home = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <ContentHeader title="HOME" subTitle="Welcome to Home" />
      </Box>
    </Box>
  )
}

export default Home