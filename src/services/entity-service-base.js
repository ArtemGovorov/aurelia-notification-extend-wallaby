import {inject} from "aurelia-framework";
import Api from "./api";
import {Router} from "aurelia-router";
import {Configure} from "./configuration";
import {RequestStatusService} from "./request-status-service";

@inject(Configure, RequestStatusService, Router)
export class EntityServiceBase {
    constructor (baseUrl = "", configuration, requestStatusService, router) {
        this.baseUrl = baseUrl;
        this.api = new Api(`${this.baseUrl}`, configuration, requestStatusService, router);
    }

    getAllItems() {
        return this.api.get("/all").then(response => response);
    }

    get(id) {
        return this.api.get(`/${id}`);
    }

    edit(id) {
        return this.api.get("/edit", `id=${id}`);
    }

    save(id, data) {
        return id ? this.api.post("/", data) : this.api.put("/", data);
    }

    delete(id) {
        return this.api.delete(`/${id}`);
    }

    getPagedItems(page = 0, url = "") {
        if(page > 0) 
            page = page - 1;

        return this.api.get(`/${url}`,`page=${page}`);
    }
}