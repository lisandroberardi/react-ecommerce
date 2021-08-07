import React, {useContext, useState} from "react"
import firebase from "../Config/firebase"
import FormGroup from "../Components/Forms/FormGroup"
import ButtonWithLoading from "../Components/Forms/ButtonWithLoading"
import AlertCustom from "../Components/AlertCustom"
import EcommerceContext from "../Context/EcommerceContext"
function LoginPage(){
    const context = useContext(EcommerceContext)
    const [form,setForm] = useState({email:'',password:''})
    const [loading,setLoading] = useState(false);
    const [alert,setAlert] = useState({variant:"",text:""})
    const handleSubmit = async (event)=>{
        setLoading(true)
        event.preventDefault()
        try{
            // validar credenciales
            const responseAuth = await firebase.autenticacion.signInWithEmailAndPassword(form.email,form.password)
            setLoading(false)
            setAlert({variant:"success", text:"Ha ingresado correctamente"})
            // obtener info de usuario y loguearlo
            const userInfo = await firebase.db.collection("usuarios")
            .where("userId","==",responseAuth.user.uid)
            .get()
            context.loginUser(userInfo.docs[0]?.data())
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
        <div>
            <form onSubmit={handleSubmit}>
                <FormGroup label="Correo" name="email" type="email" placeholder="Ingrese su correo electronico" value={form.email} change={handleChange} />
                <FormGroup label="Contraseña" name="password" type="password" placeholder="Ingrese su contraseña" value={form.password} change={handleChange} />
                <br></br>
                <ButtonWithLoading loading={loading} type="submit">Login</ButtonWithLoading>
                <AlertCustom variant={alert.variant} text={alert.text} />
            </form>
        </div>
    )
}
export default LoginPage;