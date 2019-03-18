import { Component } from "react";

export default class extends Component {
  static async getInitialProps() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({});
        if (typeof window !== "undefined") {
          window.alert("loaded");
        }
      }, 2000);
    });
  }
  render() {
    const links = [];
    for (let i = 0; i < 1000; i++) {
      links.push(
        <li key={i}>
          <a href="/next-page">{i}</a>
        </li>
      );
    }

    return <ul>{links}</ul>;
  }
}
