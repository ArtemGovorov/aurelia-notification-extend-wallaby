export default class Supplier {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.name = data.name || "";        
    }
}