import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CourierClient } from '@trycourier/courier';
import { cookies } from 'next/headers';
import UserTable from '../../components/UserTable';

const courier = new CourierClient();
export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
    const cookieStore = cookies();
    const user_id = cookieStore.get('user_id')?.value;
    var rows = [{ label: 'user_id', value: user_id }];
    if (user_id) {
        const user_profile = await courier.profiles.get(user_id);
        rows = Object.keys(user_profile['profile']).reduce((p, v, k) => {
            const value = user_profile['profile'][v];
            if (typeof value === 'undefined') return p;
            p.push({
                label: v,
                value:
                    typeof value === 'object'
                        ? JSON.stringify(value)
                        : `${value}`,
            });
            return p;
        }, rows);
    } else {
        await Promise.resolve();
    }

    return (
        <Stack pt={3} px={3} maxWidth={400}>
            <Typography variant="h4" mb={2}>
                Courier Profile
            </Typography>
            <UserTable rows={rows} />
        </Stack>
    );
}
