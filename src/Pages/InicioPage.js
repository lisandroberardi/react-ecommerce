import React, {useState,useEffect} from "react"
import Producto from "../Components/Producto"
import firebase from "../Config/firebase"
import Spinner from 'react-bootstrap/Spinner'
import {Container} from "react-bootstrap"
function InicioPage(){
    const [loading,setLoading] = useState(true)
    const [productos,setProductos] = useState([])
    const getProductos = async ()=>{
        try{
            setLoading(true)
            const querySnapshot = await firebase.db.collection("productos")
            .get()
            setProductos(querySnapshot.docs)
            setLoading(false)
        }catch(e){
            console.log("Error",e)
        }
    }
    useEffect(
        ()=>{
            getProductos()
        },
        []
    )
    if(loading){
        return(
            <Container>
                <h3>Productos</h3>
                <Spinner animation="border" /> Cargando información...
            </Container> 
        )
    }else{
        return(
            <Container>
                <h3>Productos</h3>
                {productos.map(producto=><Producto datos={{...producto.data()}} mostrarDescripcion={false} mostrarBotonDetalle={true} />)}
            </Container> 
        )
    }
}
export default InicioPage;