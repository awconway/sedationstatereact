import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
// import { Link } from "gatsby"
import SedState from "../components/sedstate.js"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    {/* <Link
      to="/account"
      style={{
        color: `white`,
        textDecoration: `none`,
        textAlign: `center`,
      }}
    >
      Sign in to your account
    </Link> */}
    <SedState />
  </Layout>
)

export default IndexPage
