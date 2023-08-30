import Link from 'next/link';

import styles from './index.module.scss';

export const Navigation = () => {
  return(
    <div className={styles.container}>
      <h1 className={styles.logo}><Link href="/">parcels.</Link></h1>
      <ul className={styles.links}>
        <li><Link href='/create'>Create</Link></li>
        <li><Link href='/requests'>Requests</Link></li>
      </ul>
    </div>
  );
}