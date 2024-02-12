'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { pages } from '.';
// import MUILink from '@mui/material/Link';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

function MenuItems() {
    const path = usePathname();

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
            }}
        >
            {pages.map((page) => (
                <Box
                    key={page.href}
                    sx={{
                        my: 2,
                        borderBottom:
                            page.href === path ? '2px solid white' : 'none',
                    }}
                >
                    <Button
                        href={page.href}
                        component={NextLink}
                        sx={{
                            color: 'white',
                            display: 'block',
                            textTransform: 'none',
                        }}
                    >
                        {page.label}
                    </Button>
                </Box>
            ))}
        </Box>
    );
}
export default MenuItems;
