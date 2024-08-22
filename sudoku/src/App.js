import './App.css';
import Home from './Homee';
import Message from './Components/Message';
//import {Route, Routes,Router} from "react-router-dom";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route  path="/board" element={<Home />}/>
        <Route path="/Message" element = {<Message />}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
