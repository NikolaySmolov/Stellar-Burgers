import styles from './order-details.module.css';
import doneImg from '../../images/done.jpg';

interface IOrderDetails {
  orderNumber: string;
}

export function OrderDetails({ orderNumber }: IOrderDetails) {
  return (
    <div className={`${styles.wrapper} pt-30 pr-25 pb-30 pl-25`}>
      <h2 className={`${styles.title} text text_type_digits-large`}>{orderNumber}</h2>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img className="mt-15 mb-15" src={doneImg} alt="успех" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на&nbsp;орбитальной станции
      </p>
    </div>
  );
}
