import Link from "next/link";
import { Component } from "react";

export default class extends Component {
  static async getInitialProps() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({});
      }, 2000);
    });
  }
  render() {
    const links = [];
    for (let i = 0; i < 1000; i++) {
      links.push(
        <li key={i}>
          <Link href="/next-page">
            <a>{i}</a>
          </Link>
        </li>
      );
    }

    return <ul>{links}</ul>;
  }
}
