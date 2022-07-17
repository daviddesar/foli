import ImageItemData from "../../models/ImageItemData";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";


interface ImagesContainerProps {
  images: ImageItemData[];
  handleSelectImage: (id: string) => void;
}

const ImagesContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  columnCount: 3,
  columnWidth: "33%",
  [theme.breakpoints.down("md")]: {
    columnCount: 2,
    columnWidth: "50%",
  },
  [theme.breakpoints.down("sm")]: {
    columnCount: 1,
    columnWidth: "100%",
  },
}));
const ImageItem = styled(Box)(({ theme }) => ({
  height: "min-content",
  marginBottom: theme.spacing(1),
  cursor: "pointer",
  position: "relative",
  "& > img": {
    width: "100%",
    height: "auto",
  },
  "& > .info": {
    position: "absolute",
    top: "70%",
    width: "100%",
    height: "30%",
    opacity: 0,
    color: "white",
    backgroundColor: "black",
    "& > .name": {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.spacing(4),
      margin: theme.spacing(0.5),
    },
    "& > .desc": {
      fontSize: theme.spacing(2),
      margin: theme.spacing(0.5),
    },
  },
  ":hover": {
    "& > .info": {
      opacity: 0.8,
      transition: "opacity .2s ease-out",
      "& > p": {
        marginLeft: theme.spacing(2),
      },
    },
    transform: "scale(1.01)",
    transition: "all .2s ease-out",
  },
}));

const ImagesFeed = (props: ImagesContainerProps) => {
  const { images, handleSelectImage } = props;
  return (
    <ImagesContainer>
      {images.map((it) => (
        <ImageItem key={it.id} onClick={() => handleSelectImage(it.id)}>
          <img src={it.fileUrl} alt="" />
          {(it.name || it.description) && (
            <div className="info">
              <p className="name">{it.name}</p>
              <p className="desc">{it.description}</p>
            </div>
          )}
        </ImageItem>
      ))}
    </ImagesContainer>
  );
};

export default ImagesFeed;
