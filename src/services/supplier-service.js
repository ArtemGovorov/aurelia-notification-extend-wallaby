import {inject} from "aurelia-framework";
import {EntityServiceBase} from "./entity-service-base";

export class SupplierService extends EntityServiceBase {
    constructor(...rest) {
        super("supplier", ...rest);
    }
}