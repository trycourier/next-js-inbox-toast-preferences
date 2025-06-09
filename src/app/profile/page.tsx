'use client';

import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import UserTable from '@/components/UserTable';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  scope: string;
  [key: string]: any;
}

export default function ProfilePage() {
  const [rows, setRows] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem('courier_token');
      if (!token) return;

      const decoded = jwtDecode<DecodedToken>(token);
      const user_id = decoded.scope.replace('user_id:', '');

      const res = await fetch(`/api/profile?user_id=${user_id}`);
      const data = await res.json();

      const profileRows = Object.entries(data.profile || {}).map(
        ([label, value]) => ({
          label,
          value: typeof value === 'object' ? JSON.stringify(value) : `${value}`,
        })
      );

      setRows([{ label: 'user_id', value: user_id }, ...profileRows]);
    };

    loadProfile();
  }, []);

  return (
    <Stack pt={3} px={3} maxWidth={400}>
      <Typography variant="h4" mb={2}>
        Courier Profile
      </Typography>
      <UserTable rows={rows} />
    </Stack>
  );
}