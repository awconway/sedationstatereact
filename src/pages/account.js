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
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlBtc3FWNVNQblZNRElBTXhOZWtTUCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDVmNDA2ZDQ1MzhkMWEyMDA2ZDIxYmMxZSJ9LCJuaWNrbmFtZSI6ImF6emFfMDciLCJuYW1lIjoiYXp6YV8wN0Bob3RtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9hNTZiNTEwMGNjMTkyMWY0YmRkYTkxZmFmMmY1NTQ1Nj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmF6LnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIwLTA4LTI2VDEzOjM0OjU1LjQ0MFoiLCJpc3MiOiJodHRwczovL2Rldi0yeDk0bnkyYi51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY0MDZkNDUzOGQxYTIwMDZkMjFiYzFlIiwiYXVkIjoiVlQ5WjdCSjRmeXY2bm02dVpUNnVPNTFrRW9tRUh6VlMiLCJpYXQiOjE1OTg0NDg4OTUsImV4cCI6MTU5ODQ4NDg5NSwiYXRfaGFzaCI6Ilc0OUR6Qk51LXozYmh0eDJ6Q2FXZHciLCJub25jZSI6ImViTHVxT3NSLTNvM210SjV5LlpSYm1zWFhra2VhMC5RIn0.jpuInX417DA3itRKFp-FXnl1Xs_u73CH7m9SV5UUO4DeK6lVJ4cq6-CGwr4Fp0s7DxGBSW--TZQlFFoX8jKB14mNylp1b5A-6NrbOJ7WDgO0OISiApIzluPODBRBfPgp3SpAs4n2dKcs3eLSthxsjRJrTsPGX-nRagMgc848iHFNMh3nKtt1skk9plBPLehoBIq4wdtJ-ST0cmSkrc4bQIuaFcHNDrr6KbCS8W0ZLsvLB3TVOAKWdUTJ5OiD3G2Jw_nJ9_Hp2kphdoExcvsAq5AcqNV2Duo-obXdUJEHNpD22gxFarsarkKn3ZZzHMiTDDqM_MOiT7_3yswaSNKOcA`,
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
