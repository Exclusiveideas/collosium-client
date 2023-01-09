import React, { useEffect, useState } from 'react'
import { ArbitrageTable, BookiesTable } from '../components/table';
import styles from '../styles/Home.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paid } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useBookiesStore } from '../store';
import { fetchAllMatches, fetchBetking } from '../axios';
import { calculateBiasedArbitrage, calculateUnbiasedArbitrage, fetchFromBookie } from '../utils';
import CircularProgress from '@mui/material/CircularProgress';



let matchesNames: any = [];

let fetchCheck: any = {
  onexbet: false,
  parimatch: false,
  betway: false,
  betking: false,
  sportybet: false,
};

const Match = () => {
  const router: any = useRouter();
  const [stakeVal, setStakeVal] = useState<any>('');
  const [teams, setTeams] = useState<any>({});
  const [rows, setRows] = useState<any>([]);
  const [textError, setTextError] = useState<boolean>(false);
  const [processingStake, setProcessingStake] = useState<boolean>(false);
  const [unbiasedResponse, setUnbiasedResponse] = useState<any>({});
  const [biasedResponse, setBiasedResponse] = useState<any>({});
  const [fetchedKing, setFetchedKing] = useState<any>(false);


  const { onexbet, betway, updateBookiesMatches } = useBookiesStore((state) => ({
    onexbet: state.onexbet,
    betway: state.betway,
    updateBookiesMatches: state.updateBookiesMatches
  }));


  useEffect(() => {
    
    matchesNames = [];
    fetchCheck = {
      onexbet: false,
      betway: false,
      betking: false,
    };

    const updateRowInterval = setInterval(() => {
      setRows([...matchesNames])
    }, 1000)

    setTimeout(() => {
      clearInterval(updateRowInterval)
    }, 63000);

    if (onexbet.length < 2) fetchAllMatches(updateBookiesMatches);

    return () => clearInterval(updateRowInterval);
  }, []);


  useEffect(() => {
    if (router.query.match) {
      setTeams({
        team1: router.query?.match?.split(" vs ")[0]?.trim(),
        team2: router.query?.match?.split(" vs ")[1]?.trim()
      });
    }

  }, [router.query]);

  useEffect(() => {
    teams.team1 && getbetkingMatchNames();
  }, [teams]);

  useEffect(() => {

    function getMatchesNames() {
      if (!teams.team1) return;

      if (onexbet.length > 1) getBookiesMatchNames("onexbet", onexbet);
      if (betway.length > 1) getBookiesMatchNames("betway", betway);
    }

    getMatchesNames();

  }, [teams, onexbet, betway]);

  const getBookiesMatchNames = (bookieName: any, bookie: any) => {
    if (fetchCheck[bookieName] == true) return;

    matchesNames.push(...fetchFromBookie(bookie, teams, bookieName));
    fetchCheck[bookieName] = true;
  }


  const getbetkingMatchNames = async () => {
    if (fetchCheck.betking == true) return;

    const info = await fetchBetking(teams);
    let kingMatch = {
      bookie: "betking",
      info
    };

    setFetchedKing(true);
    fetchCheck.betking = true;
    if(!info?.team1) return;

    matchesNames.push(kingMatch);
  }

  const updateStake = (val: any) => {
    if (textError) setTextError(false);
    setStakeVal(val);
  }


  const processStake = () => {
    setUnbiasedResponse({})
    setBiasedResponse({})

    for (let i = 0; i < stakeVal.length; i++) {
      if (isNaN(stakeVal[i])) {
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
      {!fetchedKing && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
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
      {biasedResponse?.homeStake && !processingStake && (
        <div className={styles.biasedContainer}>
          <h2 className={styles.subTitle}>Biased Arbitrage</h2>
          <ArbitrageTable val={biasedResponse} />
        </div>
      )}
      {unbiasedResponse?.homeStake && !processingStake && (
        <div className={styles.biasedContainer}>
          <h2 className={styles.subTitle}>Unbiased Arbitrage</h2>
          <ArbitrageTable val={unbiasedResponse} />
        </div>
      )}
    </div>
  )
}

export default Match;