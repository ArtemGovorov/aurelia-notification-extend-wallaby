import {inject} from "aurelia-framework";
import {EntityServiceBase} from "./entity-service-base";

export class TrackingPixelService extends EntityServiceBase {
    constructor(...rest) {
        super("/tracking", ...rest);        
    }
}