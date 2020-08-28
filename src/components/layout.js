/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Container from "react-bootstrap/Container"
import Header from "./header"
import favicon from "../images/favicon.ico"
import Helmet from "react-helmet"

const Layout = ({ children }) => (
  <div>
    <Helmet>
      <link rel="icon" href={favicon} />
    </Helmet>

    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <main>
            <Container>{children}</Container>
          </main>
        </>
      )}
    />
  </div>
)
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
