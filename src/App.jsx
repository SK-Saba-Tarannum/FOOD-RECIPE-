
import './App.css';
import Dashboard from './components/dashboard';
import {Route,Routes} from "react-router-dom"
import Recipe from './recipe';
import Favorite from "./components/Favorite"

function App() {
  return(
    <Routes>  
       <Route path="/" element={<Dashboard/>}/>
       <Route path="/Recipe" element={<Recipe/>}/>
       <Route path="/Favorite" element={<Favorite/>}/>
    </Routes>
 
  )
}
export default App;

