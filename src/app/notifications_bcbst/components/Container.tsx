'use client';
import React, { useReducer, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import View from './View';

import {
    createCourierClient,
    Messages,
    Events,
} from '@trycourier/client-graphql';

interface IContainer {}

const Container = ({}: IContainer) => {
    // counter with reducer
    const [state, dispatch] = useReducer(
        (acc, value) => ({ count: acc.count + 1 }),
        { count: 0 }
    );
    const [archived, setArchived] = useState<string[]>([]);

    const user_id = Object.fromEntries(
        (typeof document !== 'undefined' ? document.cookie : '')
            .split('; ')
            .map((v) => v.split(/=(.*)/s).map(decodeURIComponent))
    )['user_id'];

    const courierClient = createCourierClient({
        clientKey: process.env.NEXT_PUBLIC_COURIER_CLIENT_KEY,
        userId: user_id,
    });

    const messagesApi = Messages({ client: courierClient });
    const eventsApi = Events({ client: courierClient });

    const archiveMessage = async (trackingIds: string, messageId: string) => {
        await eventsApi.trackEvent(trackingIds);
        dispatch('');
        setArchived((p) => [...p, messageId]);
    };

    console.log(state.count);

    return (
        <Stack direction="row" justifyContent={'space-around'} flexGrow={1}>
            <View
                trigger={state.count}
                eventsApi={eventsApi}
                header="All"
                messagesApi={messagesApi}
                archiveMessage={archiveMessage}
                archived={archived}
            />
            <View
                trigger={state.count}
                eventsApi={eventsApi}
                header="Documents"
                params={{ tags: ['documents'] }}
                messagesApi={messagesApi}
                archiveMessage={archiveMessage}
                archived={archived}
            />
            <View
                trigger={state.count}
                eventsApi={eventsApi}
                header="Claims"
                params={{
                    tags: ['claims'],
                }}
                messagesApi={messagesApi}
                archiveMessage={archiveMessage}
                archived={archived}
            />
        </Stack>
    );
};

export default Container;
