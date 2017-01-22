import Campaign from "./campaign";
import Supplier from "./supplier";

export default class TrackingPixelData {
    constructor(data = {}) {
        this.id = data.id || 0;        
        this.numberOfVisits = data.numberOfVisits || 0;
        this.campaign = new Campaign(data.campaign);
        this.supplier = new Supplier(data.supplier);
        this.month = data.month || "";
    }
}