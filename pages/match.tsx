import React, { useEffect, useState } from 'react'
import { ArbitrageTable, BookiesTable, LoadingTable } from '../components/table';
import styles from '../styles/Home.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paid } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useBookiesStore } from '../store';
import { fetchAllMatches } from '../axios';
import { calculateBiasedArbitrage, calculateUnbiasedArbitrage, fetchFromBetking, fetchFromBetway, fetchFromOnexbet, fetchFromParimatch } from '../utils';
import CircularProgress from '@mui/material/CircularProgress';



const Match = () => {
  const router: any = useRouter();
  const [stakeVal, setStakeVal] = useState<any>('');
  const [teams, setTeams] = useState<any>({});
  const [rows, setRows] = useState<any>([]);
  const [textError, setTextError] = useState<boolean>(false);
  const [processingStake, setProcessingStake] = useState<boolean>(false);
  const [unbiasedResponse, setUnbiasedResponse] = useState<any>({});
  const [biasedResponse, setBiasedResponse] = useState<any>({});

  let matchInfo: any = [];


  const { onexbet, betway, betking, parimatch, updateBookiesMatches } = useBookiesStore((state) => ({
    onexbet: state.onexbet,
    betway: state.betway,
    betking: state.betking,
    parimatch: state.parimatch,
    updateBookiesMatches: state.updateBookiesMatches
}));


  let interval = 10 * 60000 // x * 1 min 

  useEffect(() => {
    const intervalRef = setInterval(() => {
      fetchAllMatches(updateBookiesMatches);
    }, interval);


    return () => { 
      clearInterval(intervalRef);
      console.log("unmounted");
    }
  }, []);


  useEffect(() => {
    if(router.query.match) {
      setTeams({
      team1: router.query?.match?.split(" vs ")[0]?.trim(),
      team2: router.query?.match?.split(" vs ")[1]?.trim()
    });
  }

  }, [router.query]);

  useEffect(() => {
    if ( teams.team1 && matchInfo.length == 0 && onexbet.length > 1 && betway.length > 1 && betking.length > 1 && parimatch.length > 1) {
        fetchFromOnexbet(onexbet, teams, matchInfo);
        fetchFromBetway(betway, teams, matchInfo);
        fetchFromParimatch(parimatch, teams, matchInfo);
        fetchFromBetking(betking, teams, matchInfo);
    }
}, [teams, onexbet, betway, betking, parimatch]);




  useEffect(() => {
    if(matchInfo.length > 0) setRows(matchInfo);
  }, [matchInfo]);

  const updateStake = (val: any) => {
    if(textError) setTextError(false);
    setStakeVal(val);
  }


  const processStake = () => {
    setUnbiasedResponse({})
    setBiasedResponse({})

    for(let i = 0; i < stakeVal.length; i++) {
      if(isNaN(stakeVal[i])) {
        setTextError(true);
        return
      }
    }
    
    setProcessingStake(true);
    calculateArbitrage();
  }

  const calculateArbitrage = () => {
    const unbiasedResult = calculateUnbiasedArbitrage(rows, (stakeVal * 1));
    const biasedResult = calculateBiasedArbitrage(rows, (stakeVal * 1));

    setUnbiasedResponse(unbiasedResult);
    setBiasedResponse(biasedResult);

    setProcessingStake(false);
  }

  return (
    <div className={`${styles.matchPage} ${styles.page}`}>
      <h2 className={styles.matchesTitle}>{teams?.team1} - {teams?.team2}</h2>
      {rows.length > 0 &&
        <BookiesTable rows={rows} />}
      {rows.length < 1 && <LoadingTable header="Odds" />}
      <div className={styles.stakeWrapper}>
        <Paid className={styles.stakeIcon} />
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.stakeBox}
        >
          <TextField value={stakeVal} onChange={(e) => updateStake(e.target.value)} disabled={!(teams?.team1)} className={styles.stakeInput} id="outlined-basic" label="Stake" variant="outlined" />
          <div onClick={processStake} className={styles.stakeBtn}>Run</div>
        </Box>
      </div>
      {textError && <p className={styles.text_error}>stake should only contain number</p>}
      {processingStake && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      { biasedResponse?.homeStake && !processingStake && (
        <div className={styles.biasedContainer}>
          <h2 className={styles.subTitle}>Biased Arbitrage</h2>
          <ArbitrageTable val={biasedResponse} />
        </div>
      )}
      { unbiasedResponse?.homeStake && !processingStake && (
        <div className={styles.biasedContainer}>
          <h2 className={styles.subTitle}>Unbiased Arbitrage</h2>
          <ArbitrageTable val={unbiasedResponse} />
        </div>
      )}
    </div>
  )
}

export default Match;