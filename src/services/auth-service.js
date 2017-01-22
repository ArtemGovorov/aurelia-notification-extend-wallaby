import {inject, Aurelia} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Configure} from "./configuration";
import {RequestStatusService} from "./request-status-service";

@inject(Aurelia, HttpClient, Configure, RequestStatusService)
export default class AuthService {
    constructor(aurelia, http, configuration, requestStatusService) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(configuration.get("api.endpoint"));
        });

        this.http = http;
        this.app = aurelia;
        this._userRole = "";
        this.requestStatusService = requestStatusService;
    }

    logIn(userData, rememberMe = false) {
        this.requestStatusService.isRequesting = true;
        
        return this.http
            .fetch("/account/login",
            {
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
                method: "POST", 
                body: json(userData)
            })
            .then(response => {
                if (response.status === 200) {
                    this.app.setRoot("app");
                    this.requestStatusService.isRequesting = false;
                } else {
                    throw "Unauthorized";
                }
            });
    }

    logOff() {
        this.requestStatusService.isRequesting = true;
        this.http.fetch("/account/logout").then(() => {
            this.app.setRoot("login");
            this.requestStatusService.isRequesting = false;
        });

    }

    isAuthenticated() {       
        return this.http.fetch("/account/IsAuthenticated").then(response => response.json());
    }
}