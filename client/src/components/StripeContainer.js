import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

class StripeContainer extends React.Component {
  render() {
    return (
      <StripeCheckout
        amount={5 * 100}
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        name="Emaily"
        description="$5 for 5 survey credits"
      >
        <button className="btn">Add credits</button>
      </StripeCheckout>
    )
  }
}

export default StripeContainer;