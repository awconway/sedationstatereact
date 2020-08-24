import React from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link } from "gatsby"
import SedState from "../components/sedstate"
import Layout from "../components/layout"
import SEO from "../components/seo"
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

const Account = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

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
        <SedState path="/account/sedstate" />
      </Router>
    </>
  )
}

export default Account
