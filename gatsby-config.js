module.exports = themeOptions => {
  themeOptions.contentPath = themeOptions.contentPath || 'content/posts';
  themeOptions.basePath = themeOptions.basePath || '/';
  return {
    siteMetadata: {
      title: `Knowledge Base`,
      description: `My knowledge base`,
      author: `Lijun Chen`,
    },
    plugins: [
      `gatsby-plugin-typescript`,
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${__dirname}/src/images`,
        },
      },
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: themeOptions.contentPath,
          path: themeOptions.contentPath,
        },
      },
      `gatsby-transformer-remark`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `gatsby-starter-default`,
          short_name: `starter`,
          start_url: `/`,
          background_color: `#663399`,
          theme_color: `#663399`,
          display: `standalone`,
          icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
        },
      },
      `gatsby-plugin-material-ui`,
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      `gatsby-plugin-offline`,
    ],
  }
};
