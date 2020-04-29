import { combineReducers } from 'redux';
import {reducer} from "./reducer";
import { reducer as reduxFormReducer } from 'redux-form';

export const rootReducer = combineReducers({
    form: reduxFormReducer,
    store: reducer
});