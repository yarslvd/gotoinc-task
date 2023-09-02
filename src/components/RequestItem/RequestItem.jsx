import Image from "next/image";
import Link from "next/link";

import styles from './index.module.scss';

const RequestItem = ({ src, href, text }) => {
  return(
    <Link href={href} className={styles.container}>
      <Image
        src={src}
        fill
        style={{objectFit:"cover"}}
        alt="Image illustration"
      />
      <h2 className={styles.heading}>{text}</h2>
    </Link>
  )
}

export default RequestItem;