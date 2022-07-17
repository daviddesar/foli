import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Compressor from 'compressorjs';
import { v4 as uuidv4 } from 'uuid';
import ImageItem from '../../models/ImageItem';

interface UploadDialogProps {
    handleCloseDialog: () => void;
    isOpen: boolean;
}
const DialogContainer = styled(Dialog)(({ theme }) => ({
  '& > * > .MuiPaper-root': {
    minWidth: theme.spacing(40),
  },
}));
const ImageInfoTextField = styled(TextField)(({ theme }) => ({
  display: 'block',
  margin: theme.spacing(2, 0),
  '& > .MuiOutlinedInput-root': {
    width: '100%',
  },
  '& > .MuiOutlinedInput-root > .MuiOutlinedInput-input': {
    padding: theme.spacing(1.5),
  },
  '& > * > .MuiOutlinedInput-notchedOutline': {
    '&:focus': {
      borderColor: 'red !important',
    }
  }
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.bg.contrastText,
  color: theme.palette.bg.main,
  marginLeft: theme.spacing(1),
  ':hover': {
    backgroundColor: theme.palette.bg.main,
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.bg.contrastText,
  borderColor: theme.palette.bg.contrastText,
  ':hover': {
    borderColor: theme.palette.bg.contrastText,
  }
}));

const UploadDialog = (props: UploadDialogProps) => {
  const {
    handleCloseDialog,
    isOpen,
  } = props;
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const reset = () => {
    setName('');
    setDesc('');
    setFileUrl('');
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const onCloseUploadDialog = () => {
    reset();
    handleCloseDialog();
  }
  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files![0];
    new Compressor(file, {
      quality: 0.3,
      success(blob: Blob) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
          setFileUrl(reader.result as string);
        };
      },
    });
  }
  const handleUploadFile = () => {
    const images: ImageItem[] = JSON.parse(localStorage.getItem('images') as string) || [];
    const newImageItem: ImageItem = {
      id: uuidv4(),
      fileUrl,
      description: desc,
      name,
    };
    images.push(newImageItem);
    localStorage.setItem('images', JSON.stringify(images));
    reset();
    handleCloseDialog();
  };
  return (
    <DialogContainer onClose={onCloseUploadDialog} open={isOpen}>
      <DialogTitle>Upload Images</DialogTitle>
      <DialogContent>
        <Box>
          <input
            type="file"
            onChange={onUploadFile}
            accept="image/png, image/jpeg, image/jpg"
          />
          <ImageInfoTextField
            placeholder="Name"
            value={name}
            onChange={onChangeName}
          />
          <ImageInfoTextField
            placeholder="Description"
            value={desc}
            onChange={onChangeDesc}
          />
        </Box>
        <Grid container justifyContent="flex-end">
          <CancelButton variant="outlined" onClick={onCloseUploadDialog}>
            Cancel
          </CancelButton>
          <SaveButton variant="contained" disableRipple disableElevation onClick={handleUploadFile}>
            Save
          </SaveButton>
        </Grid>

      </DialogContent>

    </DialogContainer>
  );
};

export default UploadDialog;
