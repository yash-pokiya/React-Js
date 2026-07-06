
import UserContextProvider from './context/UserContextProvider'
import Profile from './components/Profile'

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Profile/>
      </UserContextProvider>
    </>
  )
}

export default App
