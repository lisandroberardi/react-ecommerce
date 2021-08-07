import React, {useState,useEffect} from "react"
import Producto from "../Components/Producto"
import firebase from "../Config/firebase"
import Spinner from 'react-bootstrap/Spinner'
import {Container} from "react-bootstrap"
import FormGroup from "../Components/Forms/FormGroup"
import ButtonWithLoading from "../Components/Forms/ButtonWithLoading"
import AlertCustom from "../Components/AlertCustom"
function ABMPage(){
    const [loading,setLoading] = useState(true)
    const [productoForm,setProductoForm] = useState({name:"",price:"",sku:"",image:"",description:"",id:null})
    const [productos,setProductos] =useState([])
    const [reload,setReload]= useState(false)
    const [alert,setAlert] = useState({variant:"",text:""})
    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            let document=null
            if(productoForm.id===null){
                 document = await firebase.db.collection("productos")
                .add(productoForm)
                setAlert({variant:"success", text:"Producto agregado correctamente"})
            }else{
                 document = await firebase.db.doc("productos/"+productoForm.id)
                .set(productoForm)
                setAlert({variant:"success", text:"Producto editado correctamente"})
            }
            setReload(true)
        }catch(e){
            setAlert({variant:"danger", text:e.message})
        }
    }
    const getProductos = async ()=>{
        try{
            setLoading(true)
            const querySnapshot = await firebase.db.collection("productos")
            .get() 
            setProductos(querySnapshot.docs)
            setLoading(false);
            setReload(false)
        }catch(e){
            setAlert({variant:"danger", text:e.message})
        }
    }
    useEffect(
        ()=>{
            getProductos()
        },
        []
    )
    useEffect(
        ()=>{
            if(reload)
            getProductos()
        },
        [reload]
    )
    const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        setProductoForm({...productoForm,[name]:value})
    }
    const handleClickModificar = (producto)=>{
        setProductoForm(producto)
        setAlert({variant:"success", text:"Producto seleccionado para editar"})
    }
    const handleClickEliminar = async (producto)=>{
        try{
            const document = await firebase.db.doc("productos/"+producto.id)
            .delete()
            setReload(true)
            setAlert({variant:"danger", text:"Producto eliminado correctamente"})
        }catch(e){
            setAlert({variant:"danger", text:e.message})
        }
    }
    if(loading){
        return(
            <Container>
                <h3>Alta / Baja / Modificacion</h3>
                <Spinner animation="border" /> Cargando información...
            </Container>
        )
    }else{
        return(
            <div>
                <h3>Alta / Baja / Modificacion</h3>
                {productos.map(producto=><Producto datos={{...producto.data(),id:producto.id}} mostrarBotonModificar={true} clickModificar={handleClickModificar} mostrarBotonEliminar={true} clickEliminar={handleClickEliminar} />)}
               
                <h3>Alta / Modificacion</h3>
                <form onSubmit={handleSubmit}>
                    <FormGroup label="Nombre" name="name" type="text" placeholder="Nombre del producto" value={productoForm.name} change={handleChange} />
                    <FormGroup label="Precio" name="price" type="number" placeholder="Precio del producto" value={productoForm.price} change={handleChange} />
                    <FormGroup label="SKU" name="sku" type="number" placeholder="SKU del producto" value={productoForm.sku} change={handleChange} />
                    <FormGroup label="Imagen" name="image" type="text" placeholder="Imagen del producto" value={productoForm.image} change={handleChange} />
                    <FormGroup label="Descripcion" name="description" type="text" placeholder="Descripción del producto" value={productoForm.description} change={handleChange} />
                    <br></br>
                    <ButtonWithLoading loading={loading} type="submit">Guardar</ButtonWithLoading>
                    <AlertCustom variant={alert.variant} text={alert.text} />
                </form>
            </div>
        )
    }
}
export default ABMPage;