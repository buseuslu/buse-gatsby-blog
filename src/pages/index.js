import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import styled from "styled-components"

const BlogLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  &:hover {
    color: #4b0082;
  }
`

export default ({ data }) => (
  <Layout>
    <div>
      <h1>Buse's thoughts</h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} - {node.frontmatter.date}
            </BlogTitle>
          </BlogLink>
          <p>{node.excerpt}</p>
        </div>
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            description
            date(formatString: "DD MMMM, YYYY")
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
