import createEmotionCache from "@/createEmotionCache";
import AdminLayout from "@/layouts/AdminLayout";
import BlankLayout from "@/layouts/BlankLayout";
import "@/styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const layouts = {
  Admin: AdminLayout,
};

export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const Layout = layouts[Component.layout] || BlankLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
