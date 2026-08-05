import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CollectionPage from './pages/CollectionPage'
 import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <>

      <ToastContainer />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/collection' element={<CollectionPage/>}/>
    </Routes>
    </>
  )
}

export default App