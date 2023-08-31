import Image from "next/image";

import styles from './index.module.scss';
import {Form} from "@/components/Form/Form";

const OrderRequest = () => {
  return(
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src='/assets/images/order_page.jpg'
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

export default OrderRequest;