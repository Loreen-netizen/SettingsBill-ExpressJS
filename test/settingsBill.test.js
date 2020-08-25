const billWithSettingsFunction = require("../settingsBill");
const assert = require("assert");

describe("billWithSettingsFunction", function () {
    it("should update call cost when call cost is set and update settings button is clicked", function () {
        var billWithSettings = billWithSettingsFunction();
        billWithSettings.setCallCost(3);
        assert.equal(3, billWithSettings.updateCallCost())

    });
    it("should update call cost to R2.50 when call cost is set and update settings button is clicked", function () {
        var billWithSettings2 = billWithSettingsFunction();
        billWithSettings2.setCallCost(2.50);
        assert.equal(2.50, billWithSettings2.updateCallCost())

    });

    it("should update sms cost when sms cost is set and update settings button is clicked", function () {
        var billWithSettings3 = billWithSettingsFunction();
        billWithSettings3.setSmsCost(0.50);
        assert.equal(0.50, billWithSettings3.updateSmsCost())

    });
    it("should update sms cost to R0.85 when sms cost is set and update settings button is clicked", function () {
        var billWithSettings4 = billWithSettingsFunction();
        billWithSettings4.setSmsCost(0.85);
        assert.equal(0.85, billWithSettings4.updateSmsCost())

    });
    it("should update call total and total cost when call is selected and add button is clicked", function () {
        var billWithSettings5 = billWithSettingsFunction();
        billWithSettings5.setCallCost(2.75);
        billWithSettings5.forEachCallAdd();
        assert.equal(2.75, billWithSettings5.newCallTotal())
        assert.equal(2.75, billWithSettings5.updateTotalCost())
    });

    it("should update call total to R10 and total cost to R10 when call 5 Calls at R2 each are made", function () {
        var billWithSettings6 = billWithSettingsFunction();
        billWithSettings6.setCallCost(2.00);
        billWithSettings6.forEachCallAdd();
        billWithSettings6.forEachCallAdd();
        billWithSettings6.forEachCallAdd();
        billWithSettings6.forEachCallAdd();
        billWithSettings6.forEachCallAdd();
        assert.equal(10, billWithSettings6.newCallTotal())
        assert.equal(10, billWithSettings6.updateTotalCost())
    });


    it("should update sms total and total cost when sms is selected and add button is clicked", function () {
        var billWithSettings7 = billWithSettingsFunction();
        billWithSettings7.setSmsCost(0.75);
        billWithSettings7.forEachSmsAdd();
        assert.equal(0.75, billWithSettings7.newSmsTotal())
        assert.equal(0.75, billWithSettings7.updateTotalCost())

    });
    it("should update sms total to R4 and total cost to R4 when 4 sms' at R1 each are made", function () {
        var billWithSettings7 = billWithSettingsFunction();
        billWithSettings7.setSmsCost(1.00);
        billWithSettings7.forEachSmsAdd();
        billWithSettings7.forEachSmsAdd();
        billWithSettings7.forEachSmsAdd();
        billWithSettings7.forEachSmsAdd();
        assert.equal(4, billWithSettings7.newSmsTotal())
        assert.equal(4, billWithSettings7.updateTotalCost())
    });
    it("should update sms total to R4.20 , call total to R4.80 and total cost to R9 when 3 sms' at R1.40 each and 2 calls at R2.40 each are made", function () {
        var billWithSettings8 = billWithSettingsFunction();
        billWithSettings8.setSmsCost(1.40);
        billWithSettings8.setCallCost(2.40);
        billWithSettings8.forEachSmsAdd();
        billWithSettings8.forEachSmsAdd();
        billWithSettings8.forEachSmsAdd();
        billWithSettings8.forEachCallAdd();
        billWithSettings8.forEachCallAdd();
        assert.equal(4.20, billWithSettings8.newSmsTotal())
        assert.equal(4.80, billWithSettings8.newCallTotal())
        assert.equal(9.00, billWithSettings8.updateTotalCost())
    });
    it("should be able to set warning level to R25 when warning level is set and update settings button is clicked ", function () {
        var billWithSettings9 = billWithSettingsFunction();
        billWithSettings9.setWarningLevel(25),
            assert.equal(25, billWithSettings9.upDateWarning())
    });
    it("should be able to set critical level to R35 when critical level is set and update settings button is clicked ", function () {
        var billWithSettings10 = billWithSettingsFunction();
        billWithSettings10.setCriticalLevel(35),
            assert.equal(35, billWithSettings10.upDateCritical())
    });

    it("should change class color to orange when warning level of R8 is reached for 3 calls at R4 each", function () {
        var billWithSettings11 = billWithSettingsFunction();
        billWithSettings11.setWarningLevel(8);
        billWithSettings11.setCallCost(4.00);
        billWithSettings11.forEachCallAdd();
        billWithSettings11.forEachCallAdd();
        billWithSettings11.forEachCallAdd();
        assert.equal("warning", billWithSettings11.theWarningLevel())
    });

    it("should change class color to red when critical level of R5 is reached for 3 calls at R3 each", function () {

        var billWithSettings12 = billWithSettingsFunction();
        billWithSettings12.setCriticalLevel(5);
        billWithSettings12.setCallCost(3.00);
        billWithSettings12.forEachCallAdd();
        billWithSettings12.forEachCallAdd();
        billWithSettings12.forEachCallAdd();
        assert.equal("critical", billWithSettings12.theCriticalLevel())
    });

    it("should prevent any new costs from being added when total cost exceeds critical level of R10", function () {
        var billWithSettings13 = billWithSettingsFunction();
        billWithSettings13.setCriticalLevel(10);
        billWithSettings13.setCallCost(4.00);
        billWithSettings13.forEachCallAdd();
        billWithSettings13.forEachCallAdd();
        billWithSettings13.forEachCallAdd();
        assert.equal("critical", billWithSettings13.theCriticalLevel())

    });



    it("should return grand total", function () {
        var billWithSettings15 = billWithSettingsFunction();


        billWithSettings15.setSmsCost(1);
        billWithSettings15.setCallCost(3);
        billWithSettings15.setWarningLevel(15);
        billWithSettings15.setCriticalLevel(20);

        billWithSettings15.forEachSmsAdd();
        billWithSettings15.forEachCallAdd();
        billWithSettings15.forEachCallAdd();

        assert.deepEqual(7, billWithSettings15.updateTotalCost());

    });

    // it("should change class color to red when critical level of R5 is reached for 3 calls at R3 each", function () {

    //     var billWithSettings12 = billWithSettingsFunction();
    //     billWithSettings12.setSmsCost(1);
    //     billWithSettings12.setCallCost(3);
    //     var warning = billWithSettings12.setWarningLevel(10);
    //     var critical = billWithSettings12.setCriticalLevel(5);

    //     billWithSettings12.forEachCallAdd();
    //     billWithSettings12.forEachCallAdd();
    //     billWithSettings12.forEachCallAdd();
    //     var totalCost = billWithSettings12.updateTotalCost();

    //     assert.equal("danger", billWithSettings12.colors(totalCost, warning, critical))

    // });
});
