/* eslint-disable no-new */
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Intro from './components/Intro';
import './app.css';
import UploadDialog from './components/UploadDialog';
import ImageItem from './models/ImageItem';


const AppContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3),
  boxSizing: 'border-box',
}));

const IntroContainer = styled(Grid)(({ theme }) => ({
  height: theme.spacing(62),
  backgroundImage: "url('https://images.unsplash.com/photo-1632266692969-032546816ab8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundColor: theme.palette.bg.contrastText,
  backgroundBlendMode: 'overlay',
  backgroundPosition: 'center center',
  [theme.breakpoints.down('sm')]: {
    height: theme.spacing(50),
  },
}));

// eslint-disable-next-line no-unused-vars
const ImagesContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  columnCount: 3,
  columnWidth: '33%',
  [theme.breakpoints.down('md')]: {
    columnCount: 2,
    columnWidth: '50%',
  },
  [theme.breakpoints.down('sm')]: {
    columnCount: 1,
    columnWidth: '100%',
  },
}));

function App() {
  const [isOpenUploadDialog, setIsOpenUploadDialog] = useState(false);
  const images: ImageItem[] = JSON.parse(localStorage.getItem('images') as string) || [];

  const handleClickUploadDialog = () => {
    setIsOpenUploadDialog(!isOpenUploadDialog);
  };
  // eslint-disable-next-line no-undef
  
  return (
    <AppContainer>
      <IntroContainer container justifyContent="space-between" alignItems="center">
        <Intro handleClickUploadDialog={handleClickUploadDialog} />
      </IntroContainer>
      <ImagesContainer>
        {
          images.map(it => (
            <div className="image-item" key={it.id}>
              <img src={it.fileUrl} alt="" />
            </div>
          ))
        }
      </ImagesContainer>
      <UploadDialog
        handleCloseDialog={handleClickUploadDialog}
        isOpen={isOpenUploadDialog}
      />
    </AppContainer>
  );
}

export default App;
