import "./setup";
import {BatchUpload} from "../../src/batch-upload";
import {BatchServiceStub, AureliaNotificationStub, ServiceStub, PagedResult} from "../stubs/service-stubs";
import Campaign from "../../src/models/campaign";
import Supplier from "../../src/models/supplier";

describe("the BatchUpload module", () => {
    let sut, batchService, campaignService, supplierService, notification;
    let campaigns, suppliers;

    let rawCampaigns = [
       {
           id: 1, 
           name: "Campaign 1"
       }, 
       {
           id: 2,
           name: "Campaign 2"
       }
    ];

    let rawSuppliers = [
    {
        id: 10,
        name: "Supplier 1"
    },
    {
        id: 20,
        name: "Supplier 2"
    }];

    beforeEach(() => {
        batchService = new BatchServiceStub();
        campaignService = new ServiceStub();
        supplierService = new ServiceStub();
        notification = new AureliaNotificationStub();

        campaigns = Array.from(rawCampaigns, x => new Campaign(x));
        suppliers = Array.from(rawSuppliers, x => new Supplier(x));

        sut = new BatchUpload(batchService, campaignService, supplierService, {}, notification);
    });

    it("is defined", () => {
        expect(sut).toBeDefined();
    });

    it("should fetch all campaigns", done => {
        spyOn(campaignService, "getAllItems").and.callThrough();
        spyOn(supplierService, "getAllItems").and.callThrough();

        supplierService.itemStub = [];
        campaignService.itemStub = rawCampaigns;

        sut.activate().then(() => {
            expect(sut.campaigns).toEqual(campaigns);
            done();
        });
    });

    it("should fetch all suppliers", done => {
        spyOn(supplierService, "getAllItems").and.callThrough();
        spyOn(campaignService, "getAllItems").and.callThrough();

        supplierService.itemStub = rawSuppliers;
        campaignService.itemStub = [];

        sut.activate().then(() => {
            expect(sut.suppliers).toEqual(suppliers);
            done();
        });
    });

    it("should upload the selected file", done => {
        spyOn(batchService, "uploadBatch").and.callThrough();
        spyOn(sut, "clearFiles");
        spyOn(notification, "success");

        sut.selectedFiles = ["some file"];
        sut.selectedCampaignId = 99;
        sut.selectedSupplierId = 77;
        let batchId = 2345;

        batchService.itemStub = batchId;

        sut.upload().then(() => {
            expect(batchService.uploadBatch).toHaveBeenCalledWith(99, 77, "some file");
            expect(sut.clearFiles).toHaveBeenCalled();
            //expect(notification.success).toHaveBeenCalledWith(`Batch #${batchId} imported`);
            done();
        });
    });

    it("should not allow the upload if either campaignId, supplierId or the file are missing", () => {
        reset(sut);

        var result = sut.canUpload;
        expect(result).toBe(false);

        sut.selectedFiles = ["some file"];
        
        result = sut.canUpload;
        expect(result).toBe(false);

        reset(sut);

        sut.selectedCampaignId = 1;
        result = sut.canUpload;
        expect(result).toBe(false);

        reset(sut);

        sut.selectedSupplierId = 1;
        result = sut.canUpload;
        expect(result).toBe(false);

        reset(sut);

        sut.selectedCampaignId = 1;
        sut.selectedSupplierId = 2;
        sut.selectedFiles = ["some file"];
        
        result = sut.canUpload;
        expect(result).toBe(true);
    });

    function reset(sut) {
        sut.selectedFiles = [];
        sut.selectedSupplierId = null;
        sut.selectedCampaignId = null;
    }
});