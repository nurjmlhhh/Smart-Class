import { Outlet } from 'react-router-dom'
import Header from './componens/Header'
import Footer from './componens/Footer'
// import Register from './pages/Register'
// import Login from './pages/Login'

function App() {

  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
