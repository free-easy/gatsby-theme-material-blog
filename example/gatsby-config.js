module.exports = {
  plugins: [
    { resolve: `gatsby-theme-material-blog` },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `free-easy-knowledge-base`,
        short_name: `Knowledge Base`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `logo.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
  siteMetadata: {
    title: `My Blog`,
    author: `Lijun Chen`,
    description: `My Blog`,
    social: [
      {
        name: `Twitter`,
        url: `https://twitter.com/gatsbyjs`,
      },
      {
        name: `GitHub`,
        url: `https://github.com/gatsbyjs`,
      },
    ],
  },
};
