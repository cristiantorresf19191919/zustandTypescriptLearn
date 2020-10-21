import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter  } from 'react-router-dom'
import { useAuthStore, AuthState } from '../../store';
import { useIndexedDB } from 'react-indexed-db';
import './styles.scss'
import { validateEmail } from '../../utils/validateEmail';
import Swal from 'sweetalert2';


interface props extends RouteComponentProps<any> {
    loading:boolean
  } 


const Index:React.FC<props> = ({history}) => {

    // INDEXED DB
    const {add} = useIndexedDB("user");

    const [email,setEmail]= useState('example@test.com');

    const bears:any = useAuthStore(state => state.bears)

    // const increasePopulation:any = useAuthStore(state => state.increasePopulation)
    const deleteAllBears:any = useAuthStore(state => state.removeAllBears)
   
    const {emailToken,emailTokenAction,increasePopulation} = useAuthStore();
    

    function onChange(e:React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);
    } 
    function next():void{
        emailTokenAction(email);
        if(!validateEmail(email)){
            Swal.fire("Error","the Email has an incorrect format please double check");
            return;
        } 
        add({email:email}).then(
            (event:any) => {
                
                history.push({
                    pathname:"/password",
                    state:{id :event}
                }) 
            }

        );
        // history.push("/password")
    }
   

    return (
        <>
        <div className="mainContainer">
            <div className="flexc-start">
            <p className="lead"><b>EMAIL</b></p>             
            <br/> 
            </div>
            <div>
            <input onChange={onChange} value={email} type="email" placeholder="" />
            </div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="flexc-center mt-md"> 
            <button onClick={next} >NEXT</button>
            </div>
        </div>
            
        </>
    )
}

export default withRouter(Index);
