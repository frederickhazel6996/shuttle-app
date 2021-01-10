import { LOADING, LOGIN, REGISTER, ARRIVAL, LOCATION } from '../actions/types';

let INITIAL_STATE = {
    loading: false,
    name: '',
    arrival_time: 'estimating',
    latitude: 5.652226,
    longitude: -0.187073
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case LOGIN:
            let temp_name = action.name;
            return { ...state, name: temp_name, loading: false };
        case REGISTER:
            let temp_name2 = action.name;
            return { ...state, name: temp_name2, loading: false };
        case ARRIVAL:
            let temp_name3 = action.message;
            return { ...state, arrival_time: temp_name3 };
        case LOCATION:
            let temp_name4 = parseFloat(action.data.lat);
            let temp_name5 = parseFloat(action.data.lon);

            return { ...state, latitude: temp_name4, longitude: temp_name5 };

        default:
            return state;
    }
}
