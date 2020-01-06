import React from "react"
import { Link, useStaticQuery,graphql } from "gatsby"
import { rhythm, scale } from "../utils/typography"

export const query = graphql`
  query LayoutQuery {
      linkedin: file(absolutePath: { regex: "/social-icons/linkedin.png/" }) {
        ...squareImage
      }
      instagram: file(absolutePath: { regex: "/social-icons/instagram.png/" }) {
        ...squareImage
      }
      github: file(absolutePath: { regex: "/social-icons/github.png/" }) {
        ...squareImage
      },
      site {
        siteMetadata {
          author
          social {
            linkedin
            instagram
            github
          }
        }
      }
  }
`

export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
      fluid(maxWidth: 40, maxHeight: 40) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

function Layout({children,location,title}){

  const data = useStaticQuery(query);

  let header
  const rootPath = `${__PATH_PREFIX__}/`

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(0.7),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <br />
      <footer style={{display : 'flex',justifyContent : 'center',alignItems : 'center',flexDirection : 'column'}}>
        <p style={{fontStyle : 'italic',fontWeight : 'bold'}}>ariverak {new Date().getFullYear()} ©</p>
        <div style={{width : 150,display : 'flex', justifyContent : 'space-around'}}>
          {Object.keys(data.site.siteMetadata.social).map(socialName=>(
            <a 
            style={{boxShadow : 'none'}}
            href={data.site.siteMetadata.social[socialName]}
            target="_blank"
            rel="noopener noreferrer"
            >
              <img alt="" src={data[socialName].childImageSharp.fluid.base64} />
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}


export default Layout
