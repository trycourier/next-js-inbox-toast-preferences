'use client';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface IUserTable {
    rows: { label: string; value?: string }[];
}

const UserTable = ({ rows }: IUserTable) => {
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{
                    '& > tbody > tr > td:nth-child(1)': {
                        backgroundColor: 'grey.100',
                    },
                    '& > thead > tr > th': {
                        fontWeight: 'bold',
                        backgroundColor: 'grey.200',
                    },
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>{row.label}</TableCell>
                                <TableCell>{row.value}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
