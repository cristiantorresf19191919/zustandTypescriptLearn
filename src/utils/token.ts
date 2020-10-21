import Axios from 'axios'



export const setAuthToken = (token:string):void => {
    if (token){
        Axios.defaults.headers.common['Authorization'] = "Bearer "+token;
        
    } else {
        delete Axios.defaults.headers.common['Authorization'];
    }
    
}

export const deleteHeaderAuth = () => {
    delete Axios.defaults.headers.common["Authorization"];
}

