// import { globalTypes } from "../actions/globalTypes"
// export const category=(state="",action)=>{
//     switch(action.type){
//         case globalTypes.category:{
//             return action.payLoad
//         }
//         default:{
//             return state;
//         }
//     }
// }
import { globalTypes } from "../actions/globalTypes";
const initialState=localStorage.getItem("category")?localStorage.getItem("category"):"Kompyuter";
export const category=(state=initialState,action)=>{
    switch(action.type){
        
        case globalTypes.category:{
            localStorage.setItem("category",action.payLoad)
            return action.payLoad
        }
        default:{
            return state;
        }
    }
}