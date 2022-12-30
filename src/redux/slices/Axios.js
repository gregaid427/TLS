import Axios from "axios";

export const axios = Axios.create({ 
baseUrl: `${process.env.REACT_APP_HOST}`, 




})