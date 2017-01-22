export class RequestStatusService {
    constructor() {
        this._isRequesting = false;
    }

    get isRequesting() {
        return this._isRequesting;
    }

    set isRequesting(value) {
        this._isRequesting = value;
    }
}