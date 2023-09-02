import styles from "./index.module.scss";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

export const MenuModal = ({ isOpen, toggle }) => {
  return(
    <>
      {
        isOpen && (
          <div className={styles.modalOverlay} onClick={toggle}>
            <div onClick={(e) => e.stopPropagation()} className={styles.modalBox}>
              <IconButton onClick={toggle} className={styles.button}>
                <CloseIcon />
              </IconButton>
              <div className={styles.menu}>
                <ul className={styles.links}>
                  <li><Link href='/create' onClick={toggle}>Create</Link></li>
                  <li><Link href='/requests' onClick={toggle}>Requests</Link></li>
                </ul>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}