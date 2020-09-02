import React from "react"
import { Router } from "@reach/router"
import {
  login,
  logout,
  isAuthenticated,
  getProfile,
  getToken,
} from "../utils/auth"
import SedState from "../components/sedstate"

import {
  from,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client"

import { RetryLink } from "@apollo/client/link/retry"

const createApolloClient = authToken => {
  return new ApolloClient({
    link: from([
      new RetryLink({
        delay: {
          initial: 300,
          max: Infinity,
          jitter: true,
        },
        attempts: {
          max: Infinity,
          retryIf: (error, _operation) => !!error,
        },
      }),
      new HttpLink({
        uri: "https://honest-longhorn-93.hasura.app/v1/graphql",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
    ]),
    cache: new InMemoryCache(),
  })
}

export default function Account({ data }) {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()
  const idToken = getToken()

  const client = createApolloClient(idToken)

  return (
    <>
      <nav>
        <a
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out from {user.name} account
        </a>
      </nav>
      <ApolloProvider client={client}>
        <Router>
          <SedState path="/account/" client={client} />
        </Router>
      </ApolloProvider>
    </>
  )
}
