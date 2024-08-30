import { Outlet } from 'react-router-dom'
import Header from './componens/Header'
// import Register from './pages/Register'
// import Login from './pages/Login'

function App() {

  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App
