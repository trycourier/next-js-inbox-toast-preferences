import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

export default function Home() {
    return (
        <Stack
            component="main"
            pt={4}
            justifyContent={'center'}
            textAlign={'center'}
        >
            <Stack
                width={'100%'}
                maxWidth={700}
                gap={2}
                sx={{ flexDirection: { sx: 'column', md: 'row' } }}
                justifyContent="space-around"
                alignSelf={'center'}
            >
                <Link href="https://courier.com">
                    <img src="/courier.svg" alt="Courier" height={60} />
                </Link>
                <Link href="https://nextjs.org">
                    <img src="/next.svg" alt="NextJS" height={60} />
                </Link>
            </Stack>
            <Stack
                pt={2}
                textAlign={'center'}
                alignSelf="center"
                gap={2}
                sx={{
                    '& > a': {
                        textDecoration: 'none',
                        color: 'inherit',
                    },
                }}
            >
                <Typography variant="h4"></Typography>
                <Link href="/preferences">Preferences Example</Link>
                <Link href="https://github.com/trycourier/courier-react/tree/main/packages/react-inbox">
                    Inbox Readme
                </Link>
                <Link href="https://github.com/trycourier/courier-react/tree/main/packages/react-preferences">
                    Preferences Readme
                </Link>
                <Link href="https://github.com/trycourier/courier-react/tree/main/packages/react-toast">
                    Toast Readme
                </Link>
            </Stack>
        </Stack>
    );
}
