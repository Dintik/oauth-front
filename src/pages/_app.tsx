import { SessionProvider } from "next-auth/react"
// import { ThemeProvider } from "@chakra-ui/core";
// import Layout from "../components/layouts/Layout";
// import theme from "../components/theme";
import "../assets/styles/index.scss";

// const MyApp = ({ Component, pageProps, auth }) => {
const MyApp = ({ Component, pageProps: { session, ...pageProps } }: any) => {
  return (
    // <ThemeProvider theme={theme}>
    <SessionProvider session={session}>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </SessionProvider>
    // </ThemeProvider>
  )
}

// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext)
//   const auth = await getUser(appContext.ctx)
//   return { ...appProps, auth: auth }
// }

export default MyApp;