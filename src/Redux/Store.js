import rdcFilm from "./Reducer/rdcFilm";
import rdcTicket from "./Reducer/rdcTicket";
import {composeWithDevTools} from "redux-devtools-extension";
import rdcDetailFilm from "./Reducer/detailFilmReducer";
import rdcUser from "./Reducer/userReducer";
import rdcBank from "./Reducer/bankReducer";
import rdcPayment from "./Reducer/rdcPayment";

const redux = require('redux')

const rootReducer = redux.combineReducers({
    Film: rdcFilm,
    Ticket: rdcTicket,
    Payment: rdcPayment,
    rdcFilm: rdcFilm,
    rdcDetailFilm: rdcDetailFilm,
    rdcUser: rdcUser,
    rdcBank: rdcBank

})

const store = redux.createStore(rootReducer, composeWithDevTools())

export default store