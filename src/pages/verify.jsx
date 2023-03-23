import React, { useEffect } from 'react'
import useSession from '../hooks/useSession'

const Verify = () => {
  const { verify } = useSession()
  useEffect(() => {
    verify()
  }, [])
  return <div>Verify</div>
}

export default Verify
