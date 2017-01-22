export default class Project {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.customerId = data.customerId || 0;
        this.name = data.name || "";        
    }
}