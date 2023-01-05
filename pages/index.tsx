import { useEffect } from 'react';
import HeadComponent from '../components/head';
import { HomeTable } from '../components/table';
import { useBookiesStore } from '../store';
import styles from '../styles/Home.module.css';
import { fetchAllMatches } from '../axios';


export default function Home() {
  const updateBookiesMatches = useBookiesStore(state => state.updateBookiesMatches);
    
  useEffect(() => {
      fetchAllMatches(updateBookiesMatches);
  }, []);
  

  return (
    <>
      <HeadComponent />
      <div className={styles.page}>
        <h2 className={styles.matchesTitle}>Collosium</h2>
        <HomeTable />
      </div>
    </>
  )
};