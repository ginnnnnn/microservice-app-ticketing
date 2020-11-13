import { useState } from 'react'
import useRequest from '../../hooks/use-request'
import Router from 'next/router';


const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { doRequest, errors } = useRequest()
  const onSubmit = (e) => {
    e.preventDefault()
    // Router.push('/')
    doRequest('/api/users/signin', "post", { email, password }, () => {
      Router.push('/')
    })

  }
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {errors}
      <button className="btn btn-primary">Sign In</button>
    </form>
  )
}

export default SignIn
