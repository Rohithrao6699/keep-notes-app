import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Appcontexts from './context/contextuser.jsx'
import './index.css'

const el = document.getElementById('root')
const Root = ReactDOM.createRoot(el)
Root.render(
  <Appcontexts>
      <App/>
  </Appcontexts>
)
