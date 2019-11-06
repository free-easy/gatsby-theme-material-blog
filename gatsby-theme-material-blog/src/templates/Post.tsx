import React, { useEffect, useContext, useState } from "react";

import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import {
  Box,
  SwipeableDrawer,
  useMediaQuery,
  Fab,
  Portal,
  Hidden,
} from "@material-ui/core";
import TocIcon from "@material-ui/icons/Toc";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  useTheme,
  createStyles,
  styled,
} from "@material-ui/core/styles";

import get from "lodash/get";

import SEO from "../components/SEO";
import PostCard from "../components/Post/PostCard";
import CommentsCard from "../components/Post/CommentsCard";
import { LayoutContext } from "../components/Layout";
import { PostPageQuery } from "../generated/graphql";
import CategoriesNavMenu from "../components/CategoriesNavMenu";
import Toc from "../components/Post/Toc/";
import { useLocation } from "react-use";

type BlogPost = NonNullable<PostPageQuery["blogPost"]>;

const MobileToc: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const layoutContext = useContext(LayoutContext);

  const location = useLocation();

  useEffect(() => {
    if (location) {
      setOpen(false);
    }
  }, [location]);
  return (
    <>
      <SwipeableDrawer
        variant="temporary"
        anchor={theme.direction === "rtl" ? "left" : "right"}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Box width={250}>
          <Toc listItemProps={{ button: true }} />
        </Box>
      </SwipeableDrawer>
      <Portal container={layoutContext.fabSpace}>
        <Fab
          onClick={() => setOpen(!open)}
          color="secondary"
          size="small"
          aria-label="scroll back to top"
        >
          <TocIcon />
        </Fab>
      </Portal>
    </>
  );
};

const ResponsiveToc: React.FC = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  if (smallScreen) {
    return <MobileToc />;
  } else {
    return (
      <Box minWidth="15%">
        <Box position="sticky" top={theme.mixins.toolbar.minHeight}>
          <Toc listProps={{ dense: true }} />
        </Box>
      </Box>
    );
  }
};

const PostHeader: React.FC<{ post: BlogPost }> = props => {
  const { post } = props;
  return (
    <Typography
      variant="h1"
      style={{
        color: "white",
      }}
    >
      Hello
    </Typography>
  );
};

const Post: React.FC<{ data: PostPageQuery }> = ({ data }) => {
  const post = data.blogPost!;

  const context = useContext(LayoutContext);
  const img = get(
    data,
    "blogPost.featuredImage.childImageSharp.fluid",
    undefined
  );
  useEffect(() => {
    context.setHeaderProps({
      title: post!.title,
      coverImg: img ? [img] : undefined,
      children: () => <PostHeader post={post} />,
    });
    return () => {
      context.setHeaderProps({});
    };
  }, []);

  const theme = useTheme();

  return (
    <React.Fragment>
      <SEO title={post!.title} description={post!.excerpt} />
      <Box display="flex" flexDirection="row">
        <Hidden mdDown>
          <Box minWidth={["15%"]}>
            <Box position="sticky" top={theme.mixins.toolbar.minHeight}>
              <CategoriesNavMenu enableLeafNode={true} />
            </Box>
          </Box>
        </Hidden>
        <Box
          flexGrow={1}
          marginTop={["-5vh", "-10vh"]}
          marginBottom="10vh"
          minHeight="50vh"
          mx={[1, 2, 4, 5]}
        >
          <Box marginBottom={5}>
            <PostCard post={post} />
          </Box>
          <CommentsCard />
        </Box>
        <ResponsiveToc />
      </Box>
    </React.Fragment>
  );
};

export const query = graphql`
  query PostPage($id: String!, $previousId: String, $nextId: String) {
    blogPost(id: { eq: $id }) {
      id
      excerpt(pruneLength: 200)
      body
      slug
      title
      body
      tags
      keywords
      wordCount
      timeToRead
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    previous: blogPost(id: { eq: $previousId }) {
      id
      excerpt(pruneLength: 200)
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
    next: blogPost(id: { eq: $nextId }) {
      id
      excerpt(pruneLength: 200)
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;

export default Post;
