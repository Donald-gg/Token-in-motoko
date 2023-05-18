import React, { useRef, useState } from "react";
import { token } from '../../../declarations/token/index';
import { Principal } from '@dfinity/principal';

function Transfer() {
  const toRef = useRef()
  const amountRef = useRef()
  const [btnText, setBtnText] = useState('Transfer')
  async function handleClick() {
    const to = toRef.current.value
    const amount = amountRef.current.value
    if (to && amount) {
      const result = await token.transferTo(Principal.fromText(to), Number(amount))
      setBtnText(result)
    }
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                ref={toRef}
                type="text"
                id="transfer-to-id"
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                ref={amountRef}
                type="number"
                id="amount"
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} >
            {btnText}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
