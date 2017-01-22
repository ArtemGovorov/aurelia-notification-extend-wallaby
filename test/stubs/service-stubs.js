import {HttpStub} from "./framework-stubs";

export class ServiceStub {
    _promiseStub() {
        let response = this.itemStub;
        return new Promise((resolve) => {
            resolve(response);
        });
    }

    get(url) {
        return this._promiseStub();
    }

    getAllItems() {
        return this._promiseStub();
    }

    edit(url) {
        return this._promiseStub();
    }

    save(url) {
        return this._promiseStub();
    }

    delete(url) {
        return this._promiseStub();
    }

    getPagedItems(page, additionalParams) {
        return this._promiseStub();
    }
}

export class InfrastructureStub extends HttpStub {
    get(url) {
        return this.fetch(url).then(response => response.json());
    }

    post(url) {
        return this.fetch(url).then(response => response.json());
    }

    put(url) {
        return this.fetch(url).then(response => response.json());
    }

    delete(url) {
        return this.fetch(url).then(response => response.json());
    }
}

export class PagedResult {
    constructor(totalPages = 0, results = []) {
        this.totalPages = totalPages;
        this.results = results;
    }
}

export class BatchServiceStub extends ServiceStub {
    uploadBatch() {
        return this._promiseStub();
    }
}

export class AureliaNotificationStub extends ServiceStub {
    success() {
        return this._promiseStub();
    }

    error() {
        return this._promiseStub();
    }
}