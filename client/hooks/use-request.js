import { useState } from 'react'
import axios from 'axios'

const useRequestHooks = () => {
  const [errors, setErrors] = useState(null)

  const doRequest = async (url, method, body, onSuccess) => {
    try {
      setErrors(null)
      const respone = await axios[method](url, body)
      if (onSuccess) {
        onSuccess(respone.data)

      }
    } catch (err) {
      setErrors(<div className="alert alert-danger">
        <h4>Ooops..</h4>
        <ul className="my-0">
          {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
        </ul>
      </div>)
    }
  }
  return { doRequest, errors }
}

export default useRequestHooks