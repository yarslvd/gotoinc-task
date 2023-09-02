"use client"
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';

import styles from './index.module.scss';

import useModal from "@/hooks/useModal";
import {MenuModal} from "@/components/MenuModal/MenuModal";

export const Navigation = () => {
  const { isOpen, toggle } = useModal();

  return(
    <div className={styles.container}>
      <MenuModal isOpen={isOpen} toggle={toggle} />
      <h1 className={styles.logo}><Link href="/">parcels.</Link></h1>
      <ul className={styles.links}>
        <li><Link href='/create'>Create</Link></li>
        <li><Link href='/requests'>Requests</Link></li>
      </ul>
      <div className={styles.mobileMenu} onClick={toggle}>
        <MenuIcon size="large" />
      </div>
    </div>
  );
}