let billWithSettingsFunction = require("../settingsBill.js");
let assert = require("assert");

describe("billWithSettingsFunction", function () {
    

    it('should be able to record calls', function(){
        let billWithSettings = billWithSettingsFunction()
        billWithSettings.recordAction('call');
        assert.equal(1, billWithSettings.actionsFor('call').length);
    });

    it('should be able to set the settings', function(){
        let billWithSettings = billWithSettingsFunction()
        billWithSettings.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        assert.deepEqual({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        }, billWithSettings.getSettings())


    });

    it('should calculate the right totals', function(){
        let billWithSettings = billWithSettingsFunction();
       
        billWithSettings.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        billWithSettings.recordAction('call');
        billWithSettings.recordAction('sms');

        assert.equal(2.35, billWithSettings.totals().smsTotal);
        assert.equal(3.35, billWithSettings.totals().callTotal);
        assert.equal(5.70, billWithSettings.totals().grandTotal);

    });

    it('should calculate the right totals for multiple actions', function(){
        let billWithSettings = billWithSettingsFunction();
        billWithSettings.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        billWithSettings.recordAction('call');
        billWithSettings.recordAction('call');
        billWithSettings.recordAction('sms');
        billWithSettings.recordAction('sms');

        assert.equal(4.70, billWithSettings.totals().smsTotal);
        assert.equal(6.70, billWithSettings.totals().callTotal);
        assert.equal(11.40, billWithSettings.totals().grandTotal);

    });

    it('should know when warning level reached', function(){
        let billWithSettings = billWithSettingsFunction();
        billWithSettings.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        billWithSettings.recordAction('call');
        billWithSettings.recordAction('sms');

        assert.equal(true, billWithSettings.hasReachedWarningLevel());
    });

    it('should know when critical level reached', function(){
        let billWithSettings = billWithSettingsFunction();
        billWithSettings.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        billWithSettings.recordAction('call');
        billWithSettings.recordAction('call');
        billWithSettings.recordAction('sms');

        assert.equal(true, billWithSettings.hasReachedCriticalLevel());

    });
});
