import React from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link } from "gatsby"
import SedState from "../components/sedstate"
import Layout from "../components/layout"
import SEO from "../components/seo"

import ApolloClient from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

const createApolloClient = authToken => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://honest-longhorn-93.hasura.app/v1/graphql",
      headers: {
        Authorization: `Bearer ${authToken}`,
        // "X-Hasura-Admin-Secret":
        // "{admin-secret",
      },
    }),
    cache: new InMemoryCache(),
  })
}

const Home = ({ user }) => {
  return (
    <>
      <Layout>
        <SEO title="Home" />
        <p>Hi, {user.name ? user.name : "friend"}!</p>
      </Layout>
    </>
  )
}

const Account = ({ data }) => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()
  const client = createApolloClient(user.idToken)

  return (
    <>
      <nav>
        <Link to="/account/">Home</Link>{" "}
        <Link to="/account/sedstate/">Start monitoring</Link>{" "}
        <a
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a>
      </nav>
      <Router>
        <Home path="/account/" user={user} />
        <SedState client={client} path="/account/sedstate" />
      </Router>
    </>
  )
}

export default Account
