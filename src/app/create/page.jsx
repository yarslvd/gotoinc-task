import styles from './index.module.scss'
import RequestItem from "@/components/RequestItem/RequestItem";

const Create = () => {
  return(
    <div className={styles.container}>
      <RequestItem
        src='/assets/images/order_request.jpg'
        href='create/order'
        text='Order request'
      />
      <RequestItem
        src='/assets/images/delivery_request.jpg'
        href='create/delivery'
        text='Delivery request'
      />
    </div>
  );
}

export default Create;