import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

interface UploadDialogProps {
    handleCloseDialog: () => void;
    handleUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isOpen: boolean;
}
const DialogContainer = styled(Dialog)(({ theme }) => ({
  '& > * > .MuiPaper-root': {
    minWidth: theme.spacing(40),
  },
}));
const ImageInfoTextField = styled(TextField)(({ theme }) => ({
  display: 'block',
}));

const UploadDialog = (props: UploadDialogProps) => {
  const {
    handleCloseDialog,
    handleUploadFile,
    isOpen,
  } = props;
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  }
  return (
    <DialogContainer onClose={handleCloseDialog} open={isOpen}>
      <DialogTitle>Upload Images</DialogTitle>
      <DialogContent>
        <Box>
          <input
            type="file"
            onChange={handleUploadFile}
            accept="image/png, image/jpeg, image/jpg"
          />
          <ImageInfoTextField
            label="Name"
            value={name}
            onChange={onChangeName}
          />
          <ImageInfoTextField
            label="Description"
            value={desc}
            onChange={onChangeDesc}
          />
        </Box>

      </DialogContent>

    </DialogContainer>
  );
};

export default UploadDialog;
