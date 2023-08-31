import Image from "next/image";
import {Form} from "@/components/Form/Form";

import styles from './index.module.scss';

const Delivery = () => {
  return(
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src='/assets/images/delivery_page.jpg'
          fill
          style={{objectFit:"cover"}}
          alt='Image'
        />
      </div>
      <div className={styles.content}>
        <Form />
      </div>
    </div>
  )
}

export default Delivery