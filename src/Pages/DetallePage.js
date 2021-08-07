import React, {useState,useEffect} from "react"
import Producto from "../Components/Producto"
import firebase from "../Config/firebase"
import Spinner from 'react-bootstrap/Spinner'
import {Container} from "react-bootstrap"
function DetallePage(props){
    const id = props.match.params.id
    const [loading,setLoading] = useState(true);
    const [producto,setProducto]=useState({})
    useEffect(
        ()=>{
            async function request(){
                try{
                    const document = await firebase.db.doc("productos/"+id)
                    .get()
                    setLoading(false);
                    setProducto(document.data());
                }catch(e){
                    console.log("Error",e)
                }
            }
            request();
        },
        []
    )
    if(loading){
        return(
            <Container>
                <h3>Detalle del producto</h3>
                <Spinner animation="border" /> Cargando información...
            </Container>
        )
    }else{
        return(
            <div>
                <h3>Detalle del producto</h3>
                <Producto datos={producto} mostrarDescripcion={true} mostrarBotonComprar={true} />
            </div>
        )
    }
}
export default DetallePage;