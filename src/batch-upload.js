import {inject} from "aurelia-framework";
import {BatchService} from "./services/batch-service";
import {CampaignService} from "./services/campaign-service";
import {SupplierService} from "./services/supplier-service";
import {RequestStatusService} from "./services/request-status-service";
import Campaign from "./models/campaign";
import Supplier from "./models/supplier";
//import {Notification} from "aurelia-notification";

@inject(BatchService, CampaignService, SupplierService, RequestStatusService, Notification)
export class BatchUpload {
    selectedFiles = [];
    campaigns = [];
    suppliers = [];
    selectedCampaignId = null;
    selectedSupplierId = null;

    constructor(batchService, campaignService, supplierService, requestStatus, notification) {
        this.batchService = batchService;
        this.campaignService = campaignService;
        this.supplierService = supplierService;
        this.requestStatus = requestStatus;
        this.notification = notification;
    }

    activate() {
        return Promise.all([
            this.campaignService.getAllItems().then(response => this.campaigns = Array.from(response, x => new Campaign(x))),
            this.supplierService.getAllItems().then(response => this.suppliers = Array.from(response, x => new Supplier(x)))
        ]);
    }

    upload() {
        return this.batchService.uploadBatch(this.selectedCampaignId, this.selectedSupplierId, this.selectedFiles[0])
            //.then(batchId => this.notification.success(`Batch #${batchId} imported`))
            .then(() => this.clearFiles());
    }

    clearFiles() {
        document.getElementById("files").value = "";
    }

    get canUpload() {
        return this.selectedFiles.length > 0 && !this._isEmpty(this.selectedCampaignId) && !this._isEmpty(this.selectedSupplierId);
    }

    _isEmpty(value) {
        return value === undefined || value === null || value === "";
    }
}