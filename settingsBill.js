let billWithSettingsFunction = function () {

    let callCostSetting = 0;
    let smsCostSetting = 0;
    let totalCallCost = 0;
    let totalSmsCost = 0;
    let criticalSetting = 0;
    let smsCost;
    let callCost;
    let warningLevel;
    let criticalLevel;
    let actionList = [];

    let setCallCost = function (callCost) {
        callCostSetting = callCost;
    }


    let setSmsCost = function (smsCost) {
        smsCostSetting = smsCost;
    }


    let forEachCallAdd = function () {
        totalCallCost += callCostSetting;

    }



    let updateTotalCost = function () {
        return totalCallCost + totalSmsCost;
    }


    let setCriticalLevel = function (criticalValue) {
        criticalSetting = criticalValue;

    }

    let upDateCritical = function () {

        return criticalSetting;
    }

    var theCriticalLevel = function () {
        if (updateTotalCost() >= upDateCritical())
            return "critical"
    }


    var setSettings = function (settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = Number(settings.warningLevel);
        criticalLevel = Number(settings.criticalLevel);

        getSettings(smsCost, callCost, warningLevel, criticalLevel)
    }

    var getSettings = function () {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel,
        }
    }

    var recordAction = function (action) {
        if (!hasReachedCriticalLevel())
        {
            let cost = 0;
         
            if (action === "sms") {
                cost = smsCost;
            }
            else if (action === "call") {
                cost = callCost;
            }
            actionList.push({
                type: action,
                cost,
                timestamp: new Date()
            })
        }
        
    };

//     var time = function(){
//         let action = actions ();
// for (let timestamp in action){
//     console.log(timestamp.value)
//     return timestamp.value
// }
//     };

    var setValues = function (action) {
        let total = 0;
        for (let i = 0; i < actionList.length; i++) {
            if (actionList[i].type === action) {
                total += actionList[i].cost
            }

        }
        return total;

    };

    var grandTotal = function () {
        var overallTotal = setValues("sms") + setValues("call");
        return overallTotal.toFixed(2);
    };

    function hasReachedWarningLevel(){
        let total = grandTotal();
        let reachedWarningLevel = total >= warningLevel 
            && total < criticalLevel;

        return reachedWarningLevel;
    }

    function hasReachedCriticalLevel(){
        let total = grandTotal();
        return total >= criticalLevel;
    }


    var totals = function () {
        let smsTotal = (setValues("sms")).toFixed(2);
        let callTotal = (setValues("call")).toFixed(2);

        return {
            smsTotal,
            callTotal,
            grandTotal: grandTotal(),
            color: colors(),
        }
    }

    var colors = function () {
        if (hasReachedCriticalLevel()) {
            return "danger"
        }
        else if  (hasReachedWarningLevel()) {
            return "warning"

        }
    };



    var actions = function () {
        return actionList
    }

   

    var actionsFor = function (type) {
        let filteredActions = [];

        for (let i = 0; i < actionList.length; i++) {
            let action = actionList[i];
            // console.log(actionList[i]);
            if (action.type === type) {
                filteredActions.push(action);
            }
        }
        return filteredActions
    };



    return {
        setCallCost,
        setSmsCost,
        forEachCallAdd,
        updateTotalCost,
        setCriticalLevel,
        upDateCritical,
        theCriticalLevel,
        setSettings,
        getSettings,
        recordAction,
        totals,
        setValues,
        grandTotal,
        colors,
        actions,
        actionsFor,
        hasReachedCriticalLevel,
        hasReachedWarningLevel,
        // time,
    }
};

module.exports = billWithSettingsFunction;