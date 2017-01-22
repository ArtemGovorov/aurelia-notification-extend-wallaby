export default class Customer {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.name = data.name || "";
    }
}