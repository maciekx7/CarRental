import apiEndpoint from "./config/api_endpoint.json"
import API from "./config/api.json";

export function APIBuilder(URL) {
    var url = apiEndpoint.Endpoint + URL;
    console.log(url);
    return url;
}

export function APIBuilderWIthParam(URL, paramName, param) {
    var url = apiEndpoint.Endpoint + URL + "?" + paramName + "=" + param;
    console.log("URL: " + url);
    return url;
}

export function APIBuilderDynamic(URL, id) {
    var url = apiEndpoint.Endpoint + URL + "/" + id;
    return url;
}

export function APIBuilderJPG(imageName) {
    var url = apiEndpoint.Endpoint + API.IMAGES.URL + "/" + imageName + ".jpg";
    return url;
}
