import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import ImageItemData from "../../models/ImageItemData";
import { Slide } from "react-slideshow-image";
import Typography from "@mui/material/Typography";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import DownloadDoneRoundedIcon from "@mui/icons-material/DownloadDoneRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface ImageSliderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageItemData[];
  startIndex: number;
}
const DialogContainer = styled(Dialog)(({ theme }) => ({
  "& > * > .MuiPaper-root": {
    minWidth: "80%",
    maxHeight: "100%",
  },
  "& > * > .MuiPaper-root > .MuiBox-root > div > .react-slideshow-container > .react-slideshow-wrapper > .images-wrap > *":
    {
      height: "fit-content",
    },
}));
const ImageContainer = styled(Grid)(({ theme }) => ({
  maxHeight: theme.spacing(100),
  width: "50%",
  overflowY: "auto",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxHeight: theme.spacing(75),
  },
}));

const EditIcon = styled(EditRoundedIcon)(({ theme }) => ({
//   backgroundColor: theme.palette.bg.contrastText,
  color: theme.palette.bg.contrastText,
//   padding: theme.spacing(0.5),
//   borderRadius: theme.spacing(0.5),
  cursor: "pointer",
  fontSize: theme.spacing(3),
}));

const DoneIcon = styled(DownloadDoneRoundedIcon)(({ theme }) => ({
  backgroundColor: theme.palette.bg.contrastText,
  color: theme.palette.bg.main,
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5),
  cursor: "pointer",
  fontSize: theme.spacing(2),
}));

const CancelIcon = styled(CloseRoundedIcon)(({ theme }) => ({
  backgroundColor: theme.palette.bg.contrastText,
  color: theme.palette.bg.main,
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5),
  cursor: "pointer",
  fontSize: theme.spacing(2),
  marginRight: theme.spacing(1),
}));

const EditTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(1, 0),
  "& > * > .MuiInputBase-input": {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
}));

const ImageSliderDialog = (props: ImageSliderDialogProps) => {
  const { isOpen, onClose, images, startIndex } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(images[startIndex].name);
  const [desc, setDesc] = useState(images[startIndex].description);

  const resetStates = () => {
    setIsEditMode(false);
  };
  const onClickEdit = () => {
    setIsEditMode(true);
  };

  const onClickCancel = () => {
    setIsEditMode(false);
  };
  const onClickSave = () => {
    setIsEditMode(false);
    const copiedImages = [...images];
    copiedImages[startIndex].description = desc;
    copiedImages[startIndex].name = name;
    localStorage.setItem("images", JSON.stringify(copiedImages));
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const onCloseImageSliderDialog = () => {
    resetStates();
    onClose();
  };

  return (
    <DialogContainer onClose={onCloseImageSliderDialog} open={isOpen}>
      <Box marginTop={2} marginBottom={2}>
        <Slide
          autoplay={false}
          defaultIndex={startIndex}
          transitionDuration={300}
          onChange={() => resetStates()}
        >
          {images.map((it) => (
            <ImageContainer container key={it.id}>
              <img
                src={it.fileUrl}
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Box width="100%">
                  {isEditMode ? (
                    <Box marginTop={1}>
                      <Box width="100%">
                        <EditTextField
                          label="Name"
                          value={name}
                          onChange={onChangeName}
                        />
                        <EditTextField
                          label="Description"
                          value={desc}
                          onChange={onChangeDesc}
                        />
                      </Box>
                      <Grid container justifyContent="flex-end">
                        <CancelIcon onClick={onClickCancel} />
                        <DoneIcon onClick={onClickSave} />
                      </Grid>
                    </Box>
                  ) : (
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="flex-start"
                      marginTop={1}
                    >
                      <Box maxWidth="80%">
                        <Typography variant="h6">{it.name}</Typography>
                        <Typography variant="subtitle2" fontWeight="normal">
                          {it.description}
                        </Typography>
                      </Box>
                      <EditIcon onClick={onClickEdit} />
                    </Grid>
                  )}
                </Box>
              </Grid>
            </ImageContainer>
          ))}
        </Slide>
      </Box>
    </DialogContainer>
  );
};

export default ImageSliderDialog;
