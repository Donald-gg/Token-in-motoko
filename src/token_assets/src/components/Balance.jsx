import React, { useState, useRef, useEffect } from "react";
import { Principal } from '@dfinity/principal';
import { token } from '../../../declarations/token/index';

function Balance() {
  const [balance, setBalance] = useState('0')
  const addressRef = useRef();
  const [symbol, setSymbol] = useState("")

  useEffect(()=>{
    const getSymbol = async () => {
      const symobl = await token.getSymbol()
      setSymbol(symobl)
    }

    getSymbol()
  }, [])

  async function handleClick() {
    try {
      const address = addressRef.current.value
      if (!address)
        throw Error('Invalid address')

      const principal = Principal.fromText(address)
      const balance = await token.balanceOf(principal)
      setBalance(balance.toLocaleString())

    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          ref={addressRef}
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p>This account has a balance of {balance} {symbol}.</p>
    </div>
  );
}

export default Balance;
