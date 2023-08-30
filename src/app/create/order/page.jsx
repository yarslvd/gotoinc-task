import Image from "next/image";

import styles from './index.module.scss';

const OrderRequest = () => {
  return(
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src='/assets/images/order_page.jpg'
          fill
          style={{objectFit:"cover"}}
        />
      </div>
    </div>
  )
}

export default OrderRequest;