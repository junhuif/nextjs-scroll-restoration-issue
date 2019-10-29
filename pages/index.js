import Link from "next/link";
import { Component } from "react";

export default class extends Component {
  static async getInitialProps() {
    if (typeof window !== "undefined") {
      alert("called getInitialProps in browser!");
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ ts: Date() });
      }, 300);
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

    return (
      <ul>
        <li>ts:{this.props.ts}</li>
        {links}
      </ul>
    );
  }
}
