import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.imageContainer}>
        <Image
          src='/assets/images/home.jpg'
          fill
          style={{objectFit:"cover"}}
        />
        <div className={styles.content}>
          <h1 className={styles.heading}>Create and track your parcels</h1>
          <div className={styles.btnContainer}>
            <Link href='/create' className={styles.createBtn}>Create</Link>
            <Link href='/requests' className={styles.requestsBtn}>Requests</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
