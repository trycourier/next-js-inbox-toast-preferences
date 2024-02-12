import CourierPreferences from '@/components/Courier/Preferences';
import Box from '@mui/material/Box';

interface IPreferencePage {}

const PreferencePage = ({}: IPreferencePage) => {
    return (
        <Box px={3}>
            <CourierPreferences />
        </Box>
    );
};

export default PreferencePage;
