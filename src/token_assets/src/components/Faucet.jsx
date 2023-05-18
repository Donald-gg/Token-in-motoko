import React, {useState} from "react";
import { canisterId, createActor } from '../../../declarations/token/index';
import { AuthClient } from '../../../../node_modules/@dfinity/auth-client/lib/cjs/index';

function Faucet(props) {
  const [btnText, setBtnText] = useState("Gimme gimme")
  async function handleClick(event) {
    
    const authClient = await AuthClient.create()
    const identity = await authClient.getIdentity()
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    console.log( canisterId.toString())
    const msg = await authenticatedCanister.payOut()
    setBtnText(msg)
    // const msg = await token.payOut()
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your 2vxsx-fae.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick}>
          {btnText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
