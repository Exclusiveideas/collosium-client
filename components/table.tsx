import React, { useEffect, useState, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/navigation';
import { useBookiesStore } from '../store';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface matchName {
    match: string
}

export const HomeTable = () => {
    const router: any = useRouter();

    let matchesName: any = useMemo(() => [], []);
    const [rows, setRows] = useState<any>([]);

    const { onexbet } = useBookiesStore((state) => ({
        onexbet: state.onexbet,
    }));

    const extractOnexbet = () => {
        for (let i = 0; i < onexbet.length; i++) {
            const match = `${onexbet[i]?.team1 || 'unknown'} vs ${onexbet[i]?.team2 || 'unknown'}`;
            matchesName.push(match);
        }
    }


    useEffect(() => {
        if (onexbet[0].team1) extractOnexbet()
    }, [onexbet, extractOnexbet]);

    useEffect(() => {
        if (matchesName[0]) {
            let tableNames = [];

            for (let i = 0; i < matchesName.length; i++) {
                tableNames.push({ match: matchesName[i] });
            }

            setRows([...tableNames])

        }
    }, [matchesName])



    return ( 
        <Paper>
            <TableContainer>
                <Table sx={{ minWidth: 300, maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Match</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row: matchName, i: number) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => router.push({
                                    pathname: '/match',
                                    query: {
                                        match: row?.match
                                    },
                                })}
                                className={styles.tableRow}
                            > 
                                <TableCell align="center">{row?.match}</TableCell>

                            </TableRow>
                        ))}
                        {!rows[0]?.match && (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={styles.tableRow}
                            >
                                <TableCell align="center">
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgress />
                                    </Box></TableCell>

                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
    )
}




interface Row {
    bookie: string,
    info: {
        homeOdd: number,
        drawOdd: number,
        awayOdd: number,
    }
}

interface mInfo {
    bookie: string,
    info: {
        home: number,
        draw: number,
        away: number,
    }
}

export const BookiesTable = ({ rows }: any) => (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300, maxWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Bookies</TableCell>
                        <TableCell align="center">1 (Home)</TableCell>
                        <TableCell align="center">X (Draw)</TableCell>
                        <TableCell align="right">2 (Away)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row: Row, i: number) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className={styles.tableRow}
                        >
                            <TableCell align="left">{row?.bookie}</TableCell>
                            <TableCell align="center">{row?.info?.homeOdd}</TableCell>
                            <TableCell align="center">{row?.info?.drawOdd}</TableCell>
                            <TableCell align="right">{row?.info?.awayOdd}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
);


export const ArbitrageTable = ({val}:any) => (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300, maxWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Bookmaker</TableCell>
                        <TableCell align="center">Side</TableCell>
                        <TableCell align="center">Odd</TableCell>
                        <TableCell align="right">Stake</TableCell>
                        <TableCell align="right">Profit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className={styles.tableRow}
                        >
                            <TableCell align="left">{val?.homeBookie}</TableCell>
                            <TableCell align="center">Home</TableCell>
                            <TableCell align="center">{val?.homeOdd}</TableCell>
                            <TableCell align="right">{val?.homeStake}</TableCell>
                            <TableCell align="right">{val?.homeWin}</TableCell>

                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className={styles.tableRow}
                        >
                            <TableCell align="left">{val?.awayBookie}</TableCell>
                            <TableCell align="center">Away</TableCell>
                            <TableCell align="center">{val?.awayOdd}</TableCell>
                            <TableCell align="right">{val?.awayStake}</TableCell>
                            <TableCell align="right">{val?.awayWin}</TableCell>

                        </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
);


export const LoadingTable = ({ header }: any) => (
    <Paper>
        <TableContainer>
            <Table sx={{ minWidth: 300, maxWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{header}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        className={styles.tableRow}
                    >
                        <TableCell align="center">
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box></TableCell>

                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
);