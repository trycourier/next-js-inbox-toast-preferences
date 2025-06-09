import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CourierInbox from '../Courier/Inbox';
import CourierToast from '../Courier/Toast';
import MenuItems from './MenuItems';
import MenuItemResponsive from './MenuItemsResponsive';
import UserMenu from './UserMenu';

export const pages = [
  { label: 'Preferences', href: '/preferences' },
  { label: 'Send Inbox', href: '/send' },
];

function NavBar() {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#521e65', // Courier purple
        color: '#fff',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            COURIER DEMO
          </Typography>

          {/* Mobile Logo */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            COURIER
          </Typography>

          <MenuItemResponsive />
          <MenuItems />
          <CourierToast />

          <Stack direction="row" gap={1} alignItems="center">
            <CourierInbox />
            <UserMenu />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;