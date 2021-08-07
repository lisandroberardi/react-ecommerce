import React, {useState} from "react"
import firebase from "../Config/firebase"
import ButtonWithLoading from "../Components/Forms/ButtonWithLoading"
import FormGroup from "../Components/Forms/FormGroup"
import AlertCustom from "../Components/AlertCustom"
function RegistroPage(){
    const [form,setForm] = useState({nombre:'',apellido:'',email:'',password:''})
    const [loading,setLoading] = useState(false);
    const [alert,setAlert] = useState({variant:"",text:""})
    const handleSubmit = async (event)=>{
        setLoading(true)
        event.preventDefault()
        try{
            const responseAuth = await firebase.autenticacion.createUserWithEmailAndPassword(form.email,form.password)
            const document = await firebase.db.collection("usuarios")
            .add({
                nombre:form.nombre,
                apellido:form.apellido,
                userId:responseAuth.user.uid
            })
            setLoading(false)
            setAlert({variant:"success", text:"Registro exitoso"})
        }catch(e){
            setLoading(false)
            setAlert({variant:"danger", text:e.message})
        }
    }
    const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        setForm({...form,[name]:value})
    }
    return(
        <form onSubmit={handleSubmit}>
            <FormGroup label="Nombre" name="nombre" type="text" placeholder="Ingrese su nombre" value={form.nombre} change={handleChange} />
            <FormGroup label="Apellido" name="apellido" type="text" placeholder="Ingrese su apellido" value={form.apellido} change={handleChange} />
            <FormGroup label="Correo" name="email" type="email" placeholder="Ingrese su correo" value={form.email} change={handleChange} />
            <FormGroup label="Contraseña" name="password" type="password" placeholder="Ingrese su contraseña" value={form.password} change={handleChange} />
            <br></br>
            <ButtonWithLoading loading={loading} type="submit">Registrarse</ButtonWithLoading>
            <AlertCustom variant={alert.variant} text={alert.text} />
        </form>
    )
}
export default RegistroPage;