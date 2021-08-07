import React, {useState} from "react"
import {Button,Spinner} from 'react-bootstrap'
import "./ButtonWithLoading.css"
const styles={
    button:{
        color:"#000000",
        fontSize:"20px"
    }
}
function ButtonWithLoading(props){
    const {variant,type,loading} = props    
    return(
        <Button 
            type={type || "submit"} 
            variant={variant || "primary"} 
            disabled={loading} 
            style={styles.button}
            className="buttonWithLoading"
        >
            {
                loading &&
                <Spinner animation="border" size="sm" />
            }
            {props.children}
        </Button>
    )
}
export default ButtonWithLoading;
