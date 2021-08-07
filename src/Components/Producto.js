import React, {useEffect,useState} from "react"
import {Link} from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import EcommerceContext from "../Context/EcommerceContext"
function Producto(props){
    const {datos} = props
    const {name,price,sku,image,description,id} = datos
    const mostrarDescripcion = (props.mostrarDescripcion==true?true:false)
    const mostrarBotonDetalle = (props.mostrarBotonDetalle==true?true:false)
    const mostrarBotonComprar = (props.mostrarBotonComprar==true?true:false)
    const mostrarBotonModificar = (props.mostrarBotonModificar==true?true:false)
    const mostrarBotonEliminar = (props.mostrarBotonEliminar==true?true:false)
    const [message,setMessage] = useState({mensaje:''})
    const handlePurchase = (event)=>{
        setMessage({...message,mensaje:<Alert variant='success'>Gracias por su compra!</Alert>})
        event.preventDefault()
    }
    return(
        <EcommerceContext.Consumer>
            {
                context =>
                <Card className="text-center" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>Precio: ${price} / SKU: {sku}</Card.Text>
                        {
                            mostrarDescripcion &&
                            <Card.Text>{description}</Card.Text>
                        }
                        {
                        context.userLogin && mostrarBotonComprar &&
                        <Button variant="primary" onClick={handlePurchase}>Comprar</Button>
                        }
                        {
                        !context.userLogin && mostrarBotonComprar &&
                        <Button variant="info"><Link to={"/login/"}>Login to Buy</Link></Button>
                        }
                        {
                        mostrarBotonDetalle &&
                        <Button variant="info"><Link to={"/producto/"+id}>Detalle</Link></Button>
                        }
                        {
                        mostrarBotonModificar &&
                        <Button variant="primary" onClick={(e)=>props.clickModificar(datos)}>Modificar</Button>
                        }
                        {
                        mostrarBotonEliminar &&
                        <Button variant="primary" onClick={(e)=>props.clickEliminar(datos)}>Eliminar</Button>
                        }
                        <Card.Text></Card.Text>
                        <Card.Text>{message.mensaje}</Card.Text>
                    </Card.Body>
                </Card>
            }
        </EcommerceContext.Consumer>
    )
}
export default Producto