import {HttpClient, json} from "aurelia-fetch-client";
//import AuthService from "./auth-service";
//import "fetch";
import {Router} from "aurelia-router";

export default class Api {
    constructor (baseUrl, configuration, requestStatusService = {}, router) {
        this.apiUrl = configuration.get("api.endpoint");
        this.requestStatusService = requestStatusService;
        this.router = router; 

        this.http = new HttpClient();
        this.http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(`${this.apiUrl}/${baseUrl}`);
        });

        this.requestStatusService.isRequesting = false; // https://github.com/aurelia/app-contacts/blob/master/src/app.html
    }

    get(url, queryString, contentType) {
        queryString = queryString ? `?${queryString}` : "";
        return this._ajax(`${url}${queryString}`, null, "GET", contentType);
    }

    post(url, data, contentType) {
        return this._ajax(url, data, "POST", contentType);
    }

    blob(url, data) {
        return this._ajax(url, data, "POST", "application/pdf");
    }

    put(url, data, contentType) {
        return this._ajax(url, data, "PUT", contentType);
    }

    delete(url, contentType) {
        return this._ajax(url, null, "DELETE", contentType);
    }

    upload(url, data, files, method = "POST") {
        this.requestStatusService.isRequesting = true;

        let formData = new FormData();
        for (let key of Object.keys(data)) {
            formData.append(key, data[key]);
        }
        for (let i = 0; i < files.length; i++) {
            formData.append(`files[${i}]`, files[i]);
        }

        return this.http.fetch(url, {
            method: method,
            body: formData,
            headers: this._getSecurityHeaders()
        }).then(response => {
            this.requestStatusService.isRequesting = false;
            return response.json();
        });
    }
    
    _ajax(url, data, method, contentType = "application/json; charset=utf-8", files = null) {
        this.requestStatusService.isRequesting = true;

        data = this._needsJsonBody(method) ? json(data) : data;
        
        return this.http.fetch(url, {
            method: method,
            body: data,
            headers: this._getSecurityHeaders(contentType),
            files: files
        }).then(response => {
            this.requestStatusService.isRequesting = false;
            if (contentType.includes("pdf"))
                return response.blob();
            return this._needsJsonResponse(method) ? response.json() : response;
        }).catch(error => {
            console.log(error);
            if (error.status === 401)
                this.router.navigate("login");

            this.requestStatusService.isRequesting = false;
            throw error;
        });
    }

    _getSecurityHeaders(contentType) {
        let headers = new Headers();
        let accessToken = "token";//AuthService.accessToken();

        if (contentType && contentType !== "application/json; charset=utf-8")
            headers.append("Content-Type", contentType );

        if (accessToken) {
            headers.append("Authorization", `Bearer ${accessToken.token}` );
        }

        return headers;
    }

    _needsJsonBody(method) {
        return method !== "GET";
    }

    _needsJsonResponse(method) {
        return method !== "DELETE";
    }
}