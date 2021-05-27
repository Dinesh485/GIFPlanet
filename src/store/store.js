import { combineReducers, createStore } from "redux";


const searchStringreducer = (state , action) =>{
    if(action.type === 'UPDATE_STRING'){
        return action.payload
    }else{
        return ''
    }
}

const rootReducer = combineReducers({
    searchString : searchStringreducer,
})


const store = createStore(rootReducer,   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store