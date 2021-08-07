import React, {useContext, useState} from "react"
import {Link} from "react-router-dom"
import {Navbar,Nav, NavDropdown} from 'react-bootstrap'
import EcommerceContext from "../Context/EcommerceContext"
function Menu(){
  const context = useContext(EcommerceContext)
  const handleLogout = (event)=>{
      context.logoutUser()
      alert("Se ha deslogueado correctamente")
      event.preventDefault()
  }
  return (
    <EcommerceContext.Consumer>
      {
        context =>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Ecommerce - React App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              {
                context.userLogin &&
                <>
                  <Nav.Link as={Link} to="/abm">ABM</Nav.Link>
                  <NavDropdown title={context.userInfo.nombre} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#perfil">Perfil</NavDropdown.Item>
                    <NavDropdown.Item href="#preferencias">Preferencias</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              }
              {
                !context.userLogin &&
                <>
                  <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      }
    </EcommerceContext.Consumer>
  );
}
export default Menu;
