import ContentHeader from "../../../components/content/ContentHeader";
import {Box} from "@mui/material";

const Home = () => {
  return (
    <Box m="20px">
      <ContentHeader title='Home' subTitle="Welcome to Home" hideButtons={true} />
      <Box>
        Home Contents...
      </Box>
    </Box>
  )
}

export default Home