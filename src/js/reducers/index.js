import { combineReducers } from "redux";
import * as types from "../actions";

function electricityData(state={
    data: {
        amperage: {
            a: 0,
            b: 0,
            c: 0
        },
        voltage: {
            a:0,
            b:0,
            c:0
        },
        power:{
            power:0,
            frequency:0,
            power_fator_avg:0,
            peak_damand: 0,
            time_of_peak_demand: 0
        },
        totalized_energ:0,
        total: 0
    }
}, action){
    switch(action.type){
        case types.WS_ELECTRICITY:
            return Object.assign({}, state, action);
        default :
            return state;
    }
}

function gasData(state={
    data: 0
}, action){
    switch(action.type){
        case types.WS_GAS:
            return Object.assign({}, state, action);
        default :
            return state;
    }
}

function waterData(state={
    data: 0
}, action){
    switch(action.type){
        case types.WS_WATER:
            return Object.assign({}, state, action);
        default :
            return state;
    }
}

function temperatureData(state={
    data: {
        indoor: 0,
        outdoor: 0
    }
}, action){
    switch(action.type){
        case types.WS_TEMPERATRUE:
            return Object.assign({}, state, action);
        default :
            return state;
    }
}

function humidityData(state={
    type: types.WS_HUMIDITY,
    data: 0
}, action){
    switch(action.type){
        case types.WS_HUMIDITY:
            return Object.assign({}, state, action);
        default :
            return state;
    }
}

function noticeData(state={
    type: types.NOTICE,
    data: {
        Id: null,
        Title: '',
        Content: ''
    }
}, action){
    switch(action.type){
        case types.NOTICE:
            return Object.assign({}, state, action);
        default :
            return state;
    }
}


const rootReducer = combineReducers({
    electricityData,
    gasData,
    waterData,
    temperatureData,
    humidityData,
    noticeData
});


export default rootReducer;
