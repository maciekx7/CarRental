import apiEndpoint from "./config/api_endpoint.json"
import API from "./config/api.json";
const { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} = process.env;

var Endpoint;

var undef;
if(REACT_APP_SERVER_IP == undef) {
    Endpoint = "http://localhost:3000";
} else {
    Endpoint = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_SERVER_PORT;
}

export function APIBuilder(URL) {
    var url = Endpoint + URL;
    console.log(url);
    return url;
}

export function APIBuilderWIthParam(URL, paramName, param) {
    var url = Endpoint + URL + "?" + paramName + "=" + param;
    console.log("URL: " + url);
    return url;
}

export function APIBuilderDynamic(URL, id) {
    var url = Endpoint + URL + "/" + id;
    console.log("URL: " + url);
    return url;
}

export function APIBuilderJPG(imageName) {
    var url = Endpoint + API.IMAGES.URL + "/" + imageName + ".jpg";
    console.log("URL: " + url);
    return url;
}
