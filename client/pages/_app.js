import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../api/build-client';
import Header from '../components/header'

const AppComponent = ({ Component, pageProps }) => {
  return (<div>
    <Header currentUser={pageProps.currentUser} />
    <Component {...pageProps} />
  </div>)
}
export default AppComponent

AppComponent.getInitialProps = async (appContext) => {
  let pageProps = {};
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return {
    pageProps,
    ...data
  };
}

// export async function getServerSideProps(context) {
//   console.log(Object.keys(context), "!!!")
//   const client = buildClient(context.req)
//   const { data } = await client.get('/api/users/currentuser')
//   return { props: data }
// }

// export async function getStaticProps(context) {
//   console.log(Object.keys(context), "!!!")
//   const client = buildClient(context.req)
//   const { data } = await client.get('/api/users/currentuser')
//   return { props: data }
// }