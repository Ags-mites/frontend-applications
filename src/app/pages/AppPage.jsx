import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { AppLayout } from '../layout/AppLayout';
import { AccountPage } from './AccountPage';

export const AppPage = () => {
  return (
    <AppLayout>
      {/* <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton> */}
    </AppLayout>
  )
}
