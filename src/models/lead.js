export default class Lead {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.supplierId = data.supplierId || 0;
        this.campaignId = data.campaignId || 0;
        this.date = data.date || null;
        this.gender = data.gender || "";
        this.initials = data.initials || "";
        this.name = data.name || "";
        this.surname = data.surname || "";
        this.dateOfBirth = data.initials || null;
        this.emailAddress = data.emailAddress || "";
        this.address = data.address || "";
        this.street = data.street || "";
        this.houseNumber = data.houseNumber || "";
        this.houseNumberAddition = data.houseNumberAddition || "";
        this.postcode = data.postcode || "";
        this.city = data.city || "";
        this.phone1 = data.phone1 || "";
        this.phone2 = data.phone2 || "";
        this.country  = data.country || "";
        this.delivery  = data.delivery || "";
        this.source  = data.source || "";
        this.partnerId = data.partnerId || 0;
        this.soi_timestamp = data.soi_timestamp || null;
        this.soi_ip = data.soi_ip || "";
        this.doi_timestamp = data.doi_timestamp || null;
        this.doi_ip = data.doi_ip || "";
        this.question = data.question || "";
        this.answer = data.answer || "";
        this.interface = data.interface || "";
        this.newsletter = data.newsletter || "";
        this.status = data.status || "";
        this.errorDescription = data.errorDescription || "";
    }
}