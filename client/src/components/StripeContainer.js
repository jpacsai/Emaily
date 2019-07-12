import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { handleToken } from './../store/actions';

const mapDispatchToProps = { handleToken };

class StripeContainer extends React.Component {
  render() {
    const { handleToken } = this.props;
    return (
      <StripeCheckout
        amount={5 * 100}
        token={token => handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        name="Emaily"
        description="$5 for 5 survey credits"
      >
        <button className="btn">Add credits</button>
      </StripeCheckout>
    );
  }
}
export default connect(
  null,
  mapDispatchToProps
)(StripeContainer);
