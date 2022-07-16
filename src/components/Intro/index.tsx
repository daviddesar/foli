import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const TaglineText = styled(Typography)(({ theme }) => ({
  color: '#e6e4e5',
  margin: theme.spacing(1, 0),
}));

const Container = styled(Box)(({ theme }) => ({
  width: '60%',
  [theme.breakpoints.down('md')]: {
    width: '90%',
  },
}));
const Logo = styled(LinkedCameraIcon)(({ theme }) => ({
  color: '#e6e4e5',
  fontSize: theme.spacing(6),
}));
const LogoContainer = styled(Grid)(({ theme }) => ({
  color: theme.palette.bg.main,
}));
const UploadIcon = styled(FileUploadIcon)(({ theme }) => ({
  color: theme.palette.bg.main,
}));
const UploadButtonContainer = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.bg.main,
  ':hover': {
    borderColor: theme.palette.bg.main,
  },
  color: theme.palette.bg.main,
}));

interface IntroProps {
  handleClickUploadDialog: () => void;
}
const Intro = (props: IntroProps) => {
  const { handleClickUploadDialog } = props;
  return (
    <Container width="60%" margin="0 auto">
      <Grid container justifyContent="space-between">
        <LogoContainer container alignItems="center ">
          <Logo />
          <Typography variant="h3">
            Foli
          </Typography>
        </LogoContainer>
      </Grid>
      <TaglineText variant="h4" marginTop={2} fontSize={20}>
        We bring art to life,
      </TaglineText>
      <TaglineText variant="h4">
        How about you? Come and join us!
      </TaglineText>
      <UploadButtonContainer
        disableRipple
        variant="outlined"
        onClick={handleClickUploadDialog}
      >
        <Typography variant="subtitle2" fontWeight="bold" marginRight={0.5}>
          Upload yours
        </Typography>
        <UploadIcon />
      </UploadButtonContainer>
    </Container>
  );
};

export default Intro;
