import Document, { Html, Head, Main, NextScript } from "next/document";

const __html = `
function onPopState(stackstate) {
    alert("fired popstate event, stackstate: " + JSON.stringify(stackstate) + "; stackstate.state: " + JSON.stringify(stackstate.state))
}
window.addEventListener('popstate', onPopState)
console.log("loaded: ", window.location.href, new Date())

function identifyPopState(state) {
    const { url, as, options } = history.state;
    history.replaceState({ url, as, options: { ...options, fromExternal: true } }, null, as)
    console.log("unloaded")
}

window.addEventListener('unload', identifyPopState)
`;

const beforePopState = `
window.addEventListener('load', function() {

   window.next.router.beforePopState(state => {
       console.log(":::::::::::::::::::; beforePopState: ", state);
       if (state && state.options && state.options.fromExternal) {
         return false;
       }
       return true;
   });
})
`;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        <body className="custom_class">
          <Main />
          <script dangerouslySetInnerHTML={{ __html }} />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: beforePopState }} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
