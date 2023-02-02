import ContentHeader from "../../../components/content/ContentHeader";
import {Box} from "@mui/material";

const Home = (props) => {
  return (
    <Box m="20px">
      <ContentHeader title={props.title} subTitle="Welcome to Home" />
      <Box>
        Home Contents...
      </Box>
    </Box>
  )
}

export default Home