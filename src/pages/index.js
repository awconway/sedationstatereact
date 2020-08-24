import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Link
      to="/account"
      style={{
        color: `white`,
        textDecoration: `none`,
        textAlign: `center`,
      }}
    >
      Sign in to your account
    </Link>
  </Layout>
)

export default IndexPage
