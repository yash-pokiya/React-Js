import Header from "./components/Header/Header";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home";
import Post from "./components/Post";
import Form from "./components/Form";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} /> */}
        <Route path="/" element={<Form />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};



export default App;
