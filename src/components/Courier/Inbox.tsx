'use client';

import { Inbox, useInbox } from '@trycourier/react-inbox';
import { IInboxMessagePreview } from '@trycourier/react-provider';
import { uniqueId } from 'lodash';
import { useState } from 'react';

interface ICourierInbox {}

const MessageContainer = ({
    saved,
    message,
}: {
    saved: boolean;
    message: IInboxMessagePreview;
}) => {
    const [local_saved, setLocalSaved] = useState(saved);
    console.log(uniqueId());
    const { removeTag, addTag } = useInbox();
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <div style={{ flexGrow: 1 }}>
                <h5>{message.title}</h5>
                <p>{message.preview}</p>
            </div>
            <div>
                <button
                    onClick={() => {
                        if (saved) {
                            removeTag(message.messageId, 'saved');
                            setLocalSaved(false);
                        } else {
                            addTag(message.messageId, 'saved');
                            setLocalSaved(true);
                        }
                    }}
                >
                    {local_saved ? 'Unsave' : 'Save'}
                </button>
            </div>
        </div>
    );
};

const CourierInbox = ({}: ICourierInbox) => {
    return (
        <Inbox
            views={[
                { id: 'notifications', label: 'Notifications' },
                // { id: 'preferences', label: 'Preferences' },
                {
                    id: 'archived',
                    label: 'Archived',
                    params: { archived: true },
                },
                {
                    id: 'saved',
                    label: 'Saved',
                    params: { tags: ['saved'] },
                },
            ]}
            renderMessage={(message, context) => {
                const saved = message.tags?.includes('saved') ?? false;
                return <MessageContainer saved={saved} message={message} />;
            }}
        />
    );
};

export default CourierInbox;
