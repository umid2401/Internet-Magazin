import { combineReducers } from "redux";
import { auth } from "./auth";
import { category } from "./category";
import { globalState } from "./globalState";
import { lang } from "./lang";
import { isLoading } from "./loading";
import { products } from "./products";

export const rootReducers=combineReducers({
    auth:auth,
    isLoading:isLoading,
    lang:lang,
    globalState:globalState,
    products:products,
    category:category,

})