import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import ImageItem from "../../models/ImageItem";
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
  images: ImageItem[];
  startIndex: number;
}
const DialogContainer = styled(Dialog)(({ theme }) => ({
  "& > * > .MuiPaper-root": {
    minWidth: "80%",
    maxHeight: "100%",
  },
}));
const ImageContainer = styled(Grid)(({ theme }) => ({
  height: "min-content",
  maxHeight: "90%",
  width: "50%",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const EditIcon = styled(EditRoundedIcon)(({ theme }) => ({
  backgroundColor: theme.palette.bg.contrastText,
  color: theme.palette.bg.main,
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5),
  cursor: "pointer",
  fontSize: theme.spacing(2),
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
                <Box margin={1} width="100%">
                  {isEditMode ? (
                    <Box>
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
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="subtitle2">
                          Name: {it.name}
                        </Typography>
                        <Typography variant="subtitle2">
                          Description: {it.description}
                        </Typography>
                      </Box>
                      <Box>
                        <EditIcon onClick={onClickEdit} />
                      </Box>
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
