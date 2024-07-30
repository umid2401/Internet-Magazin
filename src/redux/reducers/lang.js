import { globalTypes } from "../actions/globalTypes";
const initialState=localStorage.getItem("lang")?localStorage.getItem("lang"):"Uz";
export const lang=(state=initialState,action)=>{
    switch(action.type){
        
        case globalTypes.lang:{
            localStorage.setItem("lang",action.payLoad)
            return action.payLoad
        }
        default:{
            return state;
        }
    }
}