import Link from "next/link";

export default () => (
  <div>
    <div className="main">
      <style jsx>
        {`
          div.main {
            height: 2000px;
          }
        `}
      </style>
      <a onClick={() => window.history.back()}>go back</a>
    </div>
    <footer>This is the bottom of the page</footer>
  </div>
);
