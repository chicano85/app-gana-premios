import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Lopd() {
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      console.log('No nos hemos podido loguear');
    }
  }, [error]);

  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout />

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Welcome to the App!
          </Typography>
          <img src="/static/illustrations/illustration_register.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Now it's time to upload LOPD
            </Typography>
            {error ? (
              <Typography sx={{ color: 'text.error' }}>{error}</Typography>
            ) : (
              <Typography sx={{ color: 'text.secondary' }}>
                Click the button to download it!
              </Typography>
            )}
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
