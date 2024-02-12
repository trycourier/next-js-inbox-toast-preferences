'use client';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useRef, useState } from 'react';

interface ISendForm {}

const SendForm = ({}: ISendForm) => {
    const [actions, setActions] = useState(0);
    const ref = useRef<HTMLFormElement>(null);
    const handleClick = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        var formData = Array.from(
            new FormData(e.currentTarget).entries()
        ).reduce((p, v, k) => {
            if (v[0].startsWith('actions')) {
                const [_, index, key] =
                    v[0].match(/actions\[(\d+)\]\[(\w+)\]/) ?? [];
                if (!p['actions']) {
                    p['actions'] = [];
                }
                if (!p['actions'][index]) {
                    p['actions'][index] = {};
                }
                p['actions'][index][key] = v[1];
                return p;
            } else {
                p[v[0]] = v[1];
            }
            return p;
        }, {});

        console.log(formData);
        const r = await fetch('/api/courier/send-inbox-test', {
            method: 'POST',
            body: JSON.stringify(formData),
        }).then((r) => r.json());
        console.log(r);
    };

    return (
        <Stack
            component={'form'}
            ref={ref}
            onSubmit={handleClick}
            gap={1}
            p={2}
        >
            <TextField variant="standard" label="Title" name="title" />
            <TextField
                variant="standard"
                label="Body"
                name="body"
                multiline
                minRows={2}
            />
            {actions > 0 && (
                <Stack direction="row" gap={1} alignItems={'flex-end'}>
                    <TextField
                        variant="standard"
                        label="Text"
                        name="actions[0][content]"
                    />
                    <TextField
                        variant="standard"
                        label="href"
                        name="actions[0][href]"
                    />
                    <IconButton
                        onClick={() => setActions((a) => a - 1)}
                        sx={{
                            visibility: actions > 1 ? 'hidden' : 'visible',
                            height: 'fit-content',
                        }}
                        size="small"
                    >
                        <RemoveIcon />
                    </IconButton>
                </Stack>
            )}
            {actions > 1 && (
                <Stack direction="row" gap={1} alignItems={'flex-end'}>
                    <TextField
                        variant="standard"
                        label="Text"
                        name="actions[1][content]"
                    />
                    <TextField
                        variant="standard"
                        label="href"
                        name="actions[1][href]"
                    />
                    <IconButton
                        onClick={() => setActions((a) => a - 1)}
                        size="small"
                        sx={{
                            height: 'fit-content',
                        }}
                    >
                        <RemoveIcon />
                    </IconButton>
                </Stack>
            )}
            <Stack
                direction="row"
                gap={1}
                justifyContent={'space-between'}
                mt={1}
            >
                <Button
                    variant="text"
                    onClick={() => setActions((a) => a + 1)}
                    sx={{ visibility: actions > 1 ? 'hidden' : 'visible' }}
                >
                    Add Action
                </Button>
                <Button variant="contained" type="submit">
                    Send to Inbox
                </Button>
            </Stack>
        </Stack>
    );
};

export default SendForm;
