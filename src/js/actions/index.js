
export const WS_ELECTRICITY = 'WS_ELECTRICITY';
export const WS_GAS = 'WS_GAS';
export const WS_WATER = 'WS_WATER';
export const WS_TEMPERATRUE = 'WS_TEMPERATRUE';
export const WS_HUMIDITY = 'WS_HUMIDITY';

export const NOTICE = 'NOTICE';

export function updateElectricity(eletricity){
	return {
        type: WS_ELECTRICITY,
        data: eletricity
    }
}


export function updateGas(value){
	return {
        type: WS_GAS,
        data: value
    }
}

export function updateWater(value){
	return {
        type: WS_WATER,
        data: value
    }
}


export function updateTemperature(value){
	return {
        type: WS_TEMPERATRUE,
        data: value
    }
}

export function updateHumidity(value){
	return {
        type: WS_HUMIDITY,
        data: Math.round( value * 10) / 10
    }
}

export function updateNotice(value){
	return {
        type: NOTICE,
        data: value
    }
}
