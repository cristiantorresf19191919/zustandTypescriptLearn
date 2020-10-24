import create, { GetState, SetState } from 'zustand' 
import Axios from 'axios'   
import { devtools } from 'zustand/middleware'
import { deleteHeaderAuth, setAuthToken } from '../utils/token'

export type AuthState = {
    emailToken: string,
    bears: number,
    name:string,
    posts:PostResponse,
    logOut:() => Promise<boolean | undefined>,
    mainToken:string,
    increasePopulation: () => void,
    postsLoaded:boolean,
    removeAllBears: () => void,
    signInAction: (password: string) => Promise<true | undefined>,
    emailTokenAction : (email:string) => Promise<true | undefined>
    loadPosts: () => void
}

export type PasswordResponse = {
    name:string,
    token:string
}

 type PostObj = {
    title: string,
    image:string,
    content:string
}

type PostResponse = PostObj[];

export type EmailResponse = {
    result:string
}
const config = {
    headers: {
        'Content-Type': 'Application/json'
    }
}

const server_Url = "https://api.joonik.com";
export const useAuthStore = create<AuthState>((set:SetState<AuthState>, get:GetState<AuthState>) => ({
    emailToken:"",
    bears:0,
    name:"",
    posts:[],
    postsLoaded:false,
    mainToken:"",
    increasePopulation: (): void => {
        const {bears} = get();
        set({bears: bears +1});
    },
    removeAllBears: () => set({bears:0}),
    emailTokenAction: async (email:string) =>{
        try{          
            const body = JSON.stringify({email});
            const response = await Axios.post(`${server_Url}/login/email`,body,config);
            set({emailToken: (response.data as EmailResponse).result})
            localStorage.setItem("emailToken",get().emailToken);
            setAuthToken(get().emailToken)
            return true
            
        }catch(error){
            console.log("error in the communication");
            localStorage.removeItem("emailToken");
            set({emailToken:""});
            deleteHeaderAuth();
        }
    },
    signInAction: async (password:string) => {
        try{
            // clean the token header
            deleteHeaderAuth();
            const body = JSON.stringify({password});
            const {emailToken} = get();
            setAuthToken(emailToken)
      
            const response = await Axios.post(`${server_Url}/login/password`,body,config);
            const responseBody = response.data as PasswordResponse
            // set           
            set({name: responseBody.name, mainToken: responseBody.token})
            const {mainToken} = get();
            localStorage.setItem("mainToken",mainToken);
            deleteHeaderAuth();
            //set headers ready to hit posts endpoints
            setAuthToken(mainToken);
            // add authorization header token automatically
            return true


        }catch(error){
            console.log("error in the communication");
            localStorage.removeItem("mainToken");
            set({emailToken:""});
            deleteHeaderAuth();

        }
    },
     loadPosts: async () => {

        try{
            const response = await Axios.get(`${server_Url}/posts`,config);
            const responseBody = response.data as PostResponse;
            set({posts: responseBody, postsLoaded:true})
            const state = get();
            

        }catch(err){
            console.log('error en cargar los posts ',err);
   
         

        }
     


    },
    logOut: async () => {
        localStorage.removeItem("mainToken");
        localStorage.removeItem("emailToken");
        set({emailToken:"", name:"", postsLoaded:false});
        return true;
    }
}))
