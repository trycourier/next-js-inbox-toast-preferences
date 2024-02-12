import AdbIcon from '@mui/icons-material/Adb';
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
    // { label: 'Inbox Drawer (Custom)', href: '/inbox-drawer' },
    // { label: 'Custom Preferences', href: '/preferences-custom' },
];

function NavBar() {
    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <MenuItemResponsive />
                    <AdbIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <MenuItems />
                    <CourierToast />
                    <Stack direction="row" gap={1} alignItems={'center'}>
                        <CourierInbox />
                        <UserMenu />
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;
