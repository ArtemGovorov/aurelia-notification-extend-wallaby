export class AureliaAppStub {
    setRoot(root) { }
}

export class HttpStub {
    fetch(url) {
        let response = this.itemStub || {};
        this.url = url;
        return new Promise((resolve, reject) => {
            if(response.status && response.status !== 200)
                reject("Unauthorized");
            else
                resolve({ json: () => response });
        });
    }

    configure(func) {
    }
}

export class RouterStub {
    configure(handler) {
        handler(this);
    }

    map(routes) {
        this.routes = routes;
    }

    get options() {
        return {};
    }

    addPipelineStep(name, setp) {
        
    }

    navigate(url) {
        
    }
}

export class ValidationStub {
    on() {
        return this;
    }

    ensure() {
        return this;
    }

    isNotEmpty() {
        return this;
    }

    validate() {
        return new Promise((resolve) => {
            resolve();
        });
    }
}

export class ConfigureStub {
    get (key) {
    }
}

export class BindingEngineStub {
    propertyObserver() {
        return this;
    }

    subscribe() {
        return this;
    }

    collectionObserver() {
        return this;
    }
}

export class EventAggregatorStub {
    subscribe() {
        
    }

    publish() {
    }
}