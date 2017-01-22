import {inject} from "aurelia-framework";
import {EntityServiceBase} from "./entity-service-base";

export class CampaignService extends EntityServiceBase {
    constructor(...rest) {
        super("campaign", ...rest);
    }
}