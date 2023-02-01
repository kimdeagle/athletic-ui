import ContentHeader from "../../../components/content/ContentHeader";
import {Box} from "@mui/material";

const Member = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <ContentHeader title="MEMBER" subTitle="Member Management Page" />
      </Box>
      <Box>
        Member Management Contents...
      </Box>
    </Box>
  )
}

export default Member