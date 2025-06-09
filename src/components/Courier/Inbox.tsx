'use client';

import { Inbox } from '@trycourier/react-inbox';

interface ICourierInbox { }

const CourierInbox = ({ }: ICourierInbox) => {
    return <Inbox
        views={[{ id: "notifications", label: "Messages" }, {
            id: "archived", label: "Archived", params: { archived: true }
        }, { id: "preferences", label: "Preferences" }
        ]}
    />;
};

export default CourierInbox;
