import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import {Form} from '../Form/Form';

import styles from './index.module.scss';

export const EditModal = ({ isOpen, toggle }) => {
  return(
    <>
      {
        isOpen && (
          <div className={styles.modalOverlay} onClick={toggle}>
            <div onClick={(e) => e.stopPropagation()} className={styles.modalBox}>
              <div className={styles.header}>
                <h1>Edit</h1>
                <IconButton onClick={toggle}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div className={styles.formContainer}>
                <Form toggle={toggle} />
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}