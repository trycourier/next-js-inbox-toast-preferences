import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CourierClient } from '@trycourier/courier';
import fetch from 'node-fetch';
import SendForm from './components/Form';

const courier = new CourierClient({
    fetcher: async (args) => {
        const r = await fetch(args.url, args).then((r) => r.json());
        return { body: r.data, error: {}, ok: r.ok, status: r.status };
    },
});

export default async function SendPage() {
    return (
        <Stack justifyContent={'center'} mt={4} width="100%">
            <Stack component={Paper} px={3} maxWidth={500} width="100%">
                <Typography variant="h6" textAlign={'center'}>
                    Message current user&apos;s inbox
                </Typography>
                <SendForm />
            </Stack>
        </Stack>
    );
}
