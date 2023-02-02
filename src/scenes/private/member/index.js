import ContentHeader from "../../../components/content/ContentHeader";
import {Box} from "@mui/material";

//TODO 버튼별 함수..
const Member = (props) => {
  const buttonProps = {
    excelUpload: { disabled: false, onClick: () => {} },
  }
  return (
    <Box m="20px">
      <ContentHeader title={props.title} subTitle="Member Management Page" buttonProps={buttonProps} />
      <Box>
        Member Management Contents...
      </Box>
    </Box>
  )
}

export default Member