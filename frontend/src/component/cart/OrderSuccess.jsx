import React from 'react';
import './styles/order-success.scss';
import { ReactComponent as SuccessIcon } from './../../assests/check-success.svg';
const OrderSuccess = () => {
  return (
    <div className="order-success">
      <div className="order-success__container">
        <div className="success-png">
          <SuccessIcon />
        </div>
        <div className="success-text">
          <p className="success-text__content">
            Thank you for choosing Ltreda.Your Order has been successfully
            received,You Can,You Get Information about your order By{' '}
            <strong>My Pofile ▶ My Order</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
