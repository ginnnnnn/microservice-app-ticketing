import buildClient from '../api/build-client'
const LandingPage = ({ currentUser }) => {
  return <h1>{currentUser ? "you are signed in" : "you are not signed in"}</h1>
}


LandingPage.getInitialProps = async context => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

// export async function getServerSideProps(context) {
//   const client = buildClient(context.req)
//   const { data } = await client.get('/api/users/currentuser')
//   return { props: data }
// }
// export async function getStaticProps(context) {
//   console.log(Object.keys(context))
//   const client = buildClient(context.req)
//   const { data } = await client.get('/api/users/currentuser')
//   return { props: data }
// }

export default LandingPage