import {inject} from "aurelia-framework";
import {EntityServiceBase} from "./entity-service-base";

export class BatchService extends EntityServiceBase {
    constructor(...rest) {
        super("batch", ...rest);
    }

    uploadBatch(campaignId, supplierId, file) {
        return this.api.upload("/uploadBatch", {campaignId: campaignId, supplierId: supplierId}, [file]);
    }
}