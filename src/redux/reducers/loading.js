import { globalTypes } from "../actions/globalTypes";
export const isLoading=(state=false,action)=>{
    switch(action.type){
        case globalTypes.isLoading:{
            return action.payLoad
        }
        default:{
            return state;
        }
    }
}