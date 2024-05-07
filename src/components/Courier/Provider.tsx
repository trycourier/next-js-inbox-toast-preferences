'use client';
import { CourierProvider as Provider } from '@trycourier/react-provider';

interface ICourierProvider {
    children: React.ReactNode;
}

const CourierProvider = ({ children }: ICourierProvider) => {
    // get user_id cookie, should always be available from ./src/layout.tsx
    const user_id = Object.fromEntries(
        (typeof document !== 'undefined' ? document.cookie : '')
            .split('; ')
            .map((v) => v.split(/=(.*)/s).map(decodeURIComponent))
    )['user_id'];
    return (
        <Provider
            // userId={'2301700f-54c4-41e7-bebb-f989de9ffbd2'}
            // clientKey={'YjM2YWI1MTktYjVhOS00MjRjLTk1M2EtZjU5ZGNiNmFkYmQ2='}
            userId={user_id}
            clientKey={process.env.NEXT_PUBLIC_COURIER_CLIENT_KEY}
        >
            {children}
        </Provider>
    );
};

export default CourierProvider;
