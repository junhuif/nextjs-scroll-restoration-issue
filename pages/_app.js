import React from "react";
import App, { Container } from "next/app";
import Router from "next/router";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    Router.beforePopState(state => {
      console.log("Registered beforePopState: ", state);
      if (state && state.options && state.options.fromExternal) {
        return false;
      }
      return true;
    });

    if (/Safari/.test(navigator.userAgent)) {
      console.log("Safari workaround");
      window.addEventListener("unload", () => {
        console.log("unloaded");
        const { url, as, options } = history.state;
        history.replaceState(
          { url, as, options: { ...options, fromExternal: true } },
          null,
          as
        );
      });
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <header>App Layout</header>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
