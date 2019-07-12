import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

class StripeContainer extends React.Component {
  render() {
    return (
      <StripeCheckout
        amount={5 * 100}
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      />
    )
  }
}

export default StripeContainer;