import React from "react"
import { Router } from "@reach/router"
import {
  login,
  logout,
  isAuthenticated,
  getProfile,
  getToken,
} from "../utils/auth"
import { Link } from "gatsby"
import SedState from "../components/sedstate"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const createApolloClient = authToken => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://honest-longhorn-93.hasura.app/v1/graphql",
      headers: {
        Authorization: `Bearer ${authToken}`,
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
