import {inject} from "aurelia-framework";
import AuthService from "./services/auth-service";
import {RequestStatusService} from "./services/request-status-service";

@inject(AuthService, RequestStatusService)
export class App {
    
    constructor(requestStatusService, authService) {
        this.requestStatusService = requestStatusService;
        this.auth = authService; // we use it to bind it to the nav-bar-top        
    }

    configureRouter(config, router) {
        
        config.title = "24seven Leads";
        config.options.pushState = true;

        config.map([
            { route: ["", "home"], name: "home", moduleId: "home", nav: true, title: "Home" },
            { route: "login", name: "login", moduleId: "login", nav:false, title: "Login" },
            { route: "campaigns", name: "campaigns", moduleId: "campaigns-overview", nav:true, title: "Campagnes" },
            { route: "suppliers", name: "suppliers", moduleId: "suppliers-overview", nav:true, title: "Suppliers" },
            { route: "trackingdata", name: "tracking", moduleId: "tracking-pixel-information", nav:true, title: "Tracking pixel" },
            { route: "leads", name: "leads", moduleId: "leads-overview", nav:true, title: "Leads" },
            { route: "batches", name: "leads", moduleId: "batch-overview", nav:true, title: "Batches" },
            { route: "upload-batch", moduleId: "batch-upload", nav:true, title: "Batches uploaden" }
        ]);

        this.router = router;
    }
}