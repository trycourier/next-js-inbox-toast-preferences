'use client';

import { Footer, Header, PreferencesV4 } from '@trycourier/react-preferences';

interface ICourierPreferences {}

const CourierPreferences = ({}: ICourierPreferences) => {
    return (
        <>
            <Header />
            <PreferencesV4 />
            <Footer />
        </>
    );
};

export default CourierPreferences;
