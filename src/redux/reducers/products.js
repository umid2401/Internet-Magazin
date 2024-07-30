import { globalTypes } from "../actions/globalTypes";
export const products=(state=[],action)=>{
    switch(action.type){
        case globalTypes.products:{
            return action.payLoad
        }
        default:{
            return state;
        }
    }
}