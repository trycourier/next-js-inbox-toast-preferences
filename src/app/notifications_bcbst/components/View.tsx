import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Messages, Events } from '@trycourier/client-graphql';
import { Button, Divider, IconButton } from '@mui/material';
import { filter, get } from 'lodash';
import CloseIcon from '@mui/icons-material/Close';

export interface IParams {
    isRead?: boolean;
    from?: number;
    tags?: string[];
    status?: 'unread' | 'read';
    archived?: boolean;
}
interface IView {
    header: string;
    params?: IParams;
    messagesApi: ReturnType<Messages>;
    eventsApi: ReturnType<Events>;
    archiveMessage: (messageId: string, trackingIds: string) => void;
    trigger: number;
    archived: string[];
}

const View = ({
    params,
    messagesApi,
    header,
    trigger,
    eventsApi,
    archiveMessage,
    archived,
}: IView) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [cursor, setCursor] = useState<string | undefined>();
    const [count, setCount] = useState<number | undefined>();

    useEffect(() => {
        let intervals: NodeJS.Timeout[] = [];
        intervals[0] = setInterval(() => {
            getMessages(params, cursor);
        }, 10000);

        return () => {
            intervals.forEach((interval) => clearInterval(interval));
        };
    }, [trigger]);

    const getMessages = async (params?: IParams, after?: string) => {
        const { startCursor, messages } = await messagesApi.getMessages(
            params,
            after
        );
        setMessages(messages);
        setCursor(startCursor);
    };
    const filtered_messages = messages.filter((m) => !archived.includes(m.id));

    return (
        <Stack width="300px" gap={1}>
            <Typography variant="h6">{header}</Typography>
            <Divider />
            {filtered_messages.map((message: any, i) => {
                const body = get(
                    filter(get(message, ['content', 'blocks'], []), {
                        type: 'text',
                    }),
                    [0, 'text'],
                    ''
                );
                const actions = filter(
                    get(message, ['content', 'blocks'], []),
                    {
                        type: 'action',
                    }
                );
                return (
                    <Stack
                        component={Paper}
                        direction="row"
                        key={i}
                        p={1}
                        justifyContent={'space-between'}
                        position="relative"
                        sx={{
                            '&:hover > .close-button': {
                                visibility: 'visible',
                            },
                        }}
                    >
                        <Stack>
                            <Typography
                                key={message.id}
                                variant="body2"
                                fontWeight={'bold'}
                            >
                                {message.content.title}
                            </Typography>
                            <Typography variant="caption">{body}</Typography>
                        </Stack>
                        <Stack>
                            {actions.map((action: any, i) => {
                                return (
                                    <Button
                                        size="small"
                                        key={i}
                                        variant={'text'}
                                        href={action.url}
                                        sx={{
                                            textTransform: 'none',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {action.text || ''}
                                    </Button>
                                );
                            })}
                        </Stack>
                        <IconButton
                            className="close-button"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                p: 0,
                                visibility: 'hidden',
                            }}
                            onClick={async () => {
                                archiveMessage(
                                    get(message, [
                                        'content',
                                        'trackingIds',
                                        'archiveTrackingId',
                                    ]),
                                    message.id
                                );
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                );
            })}
        </Stack>
    );
};

export default View;
