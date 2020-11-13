import useRequest from '../../hooks/use-request'
import Router from 'next/router';
import { useEffect } from 'react'


const SignOut = () => {

  const { doRequest, errors } = useRequest()
  useEffect(() => {
    doRequest('/api/users/signout', "post", {}, () => {
      Router.push('/')
    })
  }, [])
  return (
    <div>Signing you out!</div>
  )
}

export default SignOut
