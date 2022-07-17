import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Intro from "./components/Intro";
import UploadDialog from "./components/UploadDialog";
import ImageItemData from "./models/ImageItemData";
import ImageSliderDialog from "./components/ImageSliderDialog";
import ImagesFeed from "./components/ImagesFeed";

const AppContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(3),
  boxSizing: "border-box",
}));

const IntroContainer = styled(Grid)(({ theme }) => ({
  height: theme.spacing(62),
  backgroundImage:
    "url('https://images.unsplash.com/photo-1632266692969-032546816ab8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundColor: theme.palette.bg.contrastText,
  backgroundBlendMode: "overlay",
  backgroundPosition: "center center",
  [theme.breakpoints.down("sm")]: {
    height: theme.spacing(50),
  },
}));


function App() {
  const [isOpenUploadDialog, setIsOpenUploadDialog] = useState(false);
  const [isOpenSliderDialog, setIsOpenSliderDialog] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const images: ImageItemData[] =
    JSON.parse(localStorage.getItem("images") as string) || [];

  const handleClickUploadDialog = () => {
    setIsOpenUploadDialog(!isOpenUploadDialog);
  };

  const handleSelectImage = (id: string) => {
    const index = images.findIndex((it) => it.id === id);
    setIsOpenSliderDialog(true);
    setStartIndex(index);
  };

  const onChangeStartIndex = (index: number) => {
    setStartIndex(index);
  };

  return (
    <AppContainer>
      <IntroContainer
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Intro handleClickUploadDialog={handleClickUploadDialog} />
      </IntroContainer>
      <ImagesFeed 
        images={images}
        handleSelectImage={handleSelectImage}
      />
      
      <UploadDialog
        handleCloseDialog={handleClickUploadDialog}
        isOpen={isOpenUploadDialog}
      />
      {(images && images.length > 0) && (<ImageSliderDialog
        handleChangeStartIndex={onChangeStartIndex}
        startIndex={startIndex}
        images={images}
        onClose={() => setIsOpenSliderDialog(!isOpenSliderDialog)}
        isOpen={isOpenSliderDialog}
      />)}
    </AppContainer>
  );
}

export default App;
