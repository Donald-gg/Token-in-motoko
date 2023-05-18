import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '../../../node_modules/@dfinity/auth-client/lib/cjs/index';

const init = async () => {
  ReactDOM.render(<App />, document.getElementById("root"));

  const authClient = await AuthClient.create()

  if (await authClient.isAuthenticated()) {
    handleAuth(authClient)
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuth(authClient)
      }
    })
  }
}

async function handleAuth(authClient) {
  const identity = await authClient.getIdentity()
  const userPrincipal = identity._principal.toString()
  ReactDOM.render(<App loggedInPrincipal={userPrincipal} />), document.getElementById("root")
}

init();


