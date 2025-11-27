import {useContext,createContext,useState} from 'react'

const AlertContext = createContext(null)

import React from 'react'

const AlertProvider = () => {
  const [alertMsg,setAlertMsg] = useState('')
  return (
    <div>AlertProvider</div>
  )
}

export default AlertProvider