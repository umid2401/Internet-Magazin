import { globalTypes } from "../actions/globalTypes"
const initialstate={cart:[],page:1};
export const globalState=(state=initialstate,action)=>{
    switch(action.type){
        case globalTypes.addtocart:{
            return {...state,cart:action.payLoad}
        }
        case globalTypes.page:{
            return {...state,page:state.page+1}
        }
        default:{
            return state;
        }
       
    }
};