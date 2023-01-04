import { useEffect } from 'react';
import HeadComponent from '../components/head';
import { HomeTable } from '../components/table';
import { useBookiesStore } from '../store';
import styles from '../styles/Home.module.css';
import { fetchAllMatches } from '../axios';


export default function Home() {
  const updateBookiesMatches = useBookiesStore(state => state.updateBookiesMatches);
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
  

  return (
    <>
      <HeadComponent />
      <div className={styles.page}>
        <h2 className={styles.matchesTitle}>Collosium</h2>
        <HomeTable />
      </div>
    </>
  )
}






{/* <Image
  src="/vercel.svg"
  alt="Vercel Logo"
  className={styles.vercelLogo}
  width={100}
  height={24}
  priority
/> */}