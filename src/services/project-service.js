import {inject} from "aurelia-framework";
import {EntityServiceBase} from "./entity-service-base";

export class ProjectService extends EntityServiceBase {
    constructor(...rest) {
        super("project", ...rest);
    }
}