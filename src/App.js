import './App.css';
import {BrowserRouter,Route} from "react-router-dom"
import {Container} from "react-bootstrap"
import InicioPage from "./Pages/InicioPage"
import RegistroPage from "./Pages/RegistroPage"
import LoginPage from "./Pages/LoginPage"
import DetallePage from "./Pages/DetallePage"
import ABMPage from './Pages/ABMPage'
import Menu from "./Components/Menu"
import GlobalState from './Context/GlobalState'
function App(){
  return (
    <GlobalState>
      <BrowserRouter>
        <Menu />
        <Container>
          <Route path="/" exact component={InicioPage} />
          <Route path="/registro" exact component={RegistroPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/producto/:id" exact component={DetallePage} />
          <Route path="/abm" exact component={ABMPage} />
        </Container>
      </BrowserRouter>
    </GlobalState>
  );
}
export default App