import Customer from "./customer";
import Supplier from "./supplier";

export default class Campaign {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.name = data.name || "";

        this.customer = data.customer ? new Customer(data.customer) : new Customer();
        this.supplier = data.supplier ? new Supplier(data.supplier) : new Supplier();
    }
}