import {inject} from "aurelia-framework";
import {EntityServiceBase} from "./entity-service-base";

export class LeadService extends EntityServiceBase {
    constructor(...rest) {
        super("lead", ...rest);
    }
}