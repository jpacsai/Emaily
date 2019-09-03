import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { handleToken } from './../store/actions';

import './StripeContainer.scss';

const mapDispatchToProps = { handleToken };

class StripeContainer extends React.Component {
  render() {
    const { handleToken } = this.props;
    return (
      <div className="StripeCheckout">
        <StripeCheckout
          amount={5 * 100}
          token={token => handleToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          name="Emaily"
          description="$5 for 5 survey credits"
          ComponentClass="div"
        >
          <button className="btn">Add credits</button>
        </StripeCheckout>
      </div>
    );
  }
}
export default connect(
  null,
  mapDispatchToProps
)(StripeContainer);
