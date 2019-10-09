/** @jsx jsx */
import React from "react";

import { useThemeUI, jsx, Styled } from "theme-ui";
import { transparentize } from "polished";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Slide, useMediaQuery, useScrollTrigger } from "@material-ui/core";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";

import { useStaticQuery, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";

import Search from "./search/";

const TransformOnScroll: React.FC<{ children: React.ReactElement }> = props => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 150,
  });

  const theme = useTheme();

  return React.cloneElement(children, {
    css: {
      backgroundColor: trigger ? theme.palette.primary : "transparent",
    },
    elevation: trigger ? 4 : 0,
  });
};

interface AppBarProps {
  onToggleMainSidenav?(): void;
}

const Cover: React.FC = props => {
  const data = useStaticQuery(
    graphql`
      query CoverImg {
        file(relativePath: { eq: "cover.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  );

  const { theme } = useThemeUI();

  const backgroundFluidImageStack = [
    data.file.childImageSharp.fluid,
    `linear-gradient(to left,
                     ${transparentize(0.5, theme.colors!.secondary!)},
                     ${transparentize(0.6, theme.colors!.secondary!)}
                    )`,
  ].reverse();

  return (
    <BackgroundImage
      Tag="div"
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
      fluid={backgroundFluidImageStack}
      backgroundColor={`#040e18`}
    >
      <h1
        sx={{
          color: theme => "white",
          fontSize: 7,
          fontFamily: "heading",
        }}
      >
        Boolshelf
      </h1>
    </BackgroundImage>
  );
};

const CustomAppBar = React.forwardRef<Element, AppBarProps>((props, ref) => {
  return (
    <AppBar {...props} ref={ref}>
      <Toolbar>
        <IconButton
          onClick={(): void =>
            props.onToggleMainSidenav && props.onToggleMainSidenav()
          }
          edge="start"
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          sx={{
            flexGrow: 1,
            display: "block",
          }}
        >
          Material-UI
        </Typography>
        <Search />
      </Toolbar>
    </AppBar>
  );
});

const Header = React.forwardRef<Element, AppBarProps>((props, ref) => {
  return (
    <React.Fragment>
      <TransformOnScroll>
        <CustomAppBar {...props} ref={ref} />
      </TransformOnScroll>
      <Cover />
    </React.Fragment>
  );
});

export default Header;