let billWithSettingsFunction = function(){
 
    let callCostSetting =0;
    let smsCostSetting = 0;
    let totalCallCost = 0;
    let totalSmsCost = 0;
    let warningSetting = 0;
    let criticalSetting = 0;
    let  smsCost;
    let  callCost;
    let  warningLevel;
    let  criticalLevel;
    let actionList = [];

    let setCallCost = function(callCost) {
        callCostSetting = callCost;
    }

    let updateCallCost = function() {
        return callCostSetting;
    }
    
    let setSmsCost = function(smsCost) {
        smsCostSetting = smsCost;
    }

    let updateSmsCost = function() {
        return smsCostSetting;
    }

    let forEachCallAdd = function(){
        totalCallCost += callCostSetting ;
    
    }

   let newCallTotal = function(){
       return totalCallCost.toFixed(2);
   }

   let forEachSmsAdd = function(){
        totalSmsCost += smsCostSetting ;
      
    }

   let newSmsTotal = function(){
       return totalSmsCost.toFixed(2);
   }
   
   
   let updateTotalCost = function(){
    return totalCallCost + totalSmsCost;
   }

   let stopSumming = function(){
    if( updateTotalCost() > upDateCritical())
    return setCriticalLevel();
    
   }

   let setWarningLevel = function(warningValue){
   warningSetting = warningValue;

   }

   let upDateWarning = function(){

    return warningSetting;
   }

   let setCriticalLevel = function(criticalValue){
    criticalSetting = criticalValue;
 
    }
 
    let upDateCritical = function(){
 
     return criticalSetting;
    }
    var theWarningLevel = function(){
        if( updateTotalCost() >= upDateWarning() )
        return "warning"
    }

    var theCriticalLevel = function(){
        if( updateTotalCost() >= upDateCritical() )
        return "critical"
    }


    var setSettings = function(settings){
      smsCost = Number(settings.smsCost);
      callCost = Number(settings.callCost);
      warningLevel = Number (settings.warningLevel);
      criticalLevel = Number (settings.criticalLevel);

      getSettings(smsCost, callCost, warningLevel,criticalLevel)
    }

 var getSettings = function(){
     return{
         smsCost,
         callCost,
         warningLevel,
         criticalLevel,
     }
 }
 
 var recordAction =function(action){
     let cost = 0;
     if (action ==="sms"){
         cost = smsCost;
     }
     else if (action ==="call"){
        cost = callCost;
    }
    actionList.push({
        type:action,
        cost,
        timestamp: new Date()
    })
 };

 var totals = function(){
     let smsTotal = newSmsTotal();
     let callTotal = newCallTotal();
     let grandTotal = smsTotal + callTotal;
        
     return{
            smsTotal,
            callTotal,
            grandTotal,
        }
 }





return{
    updateCallCost,
    setCallCost,
    updateSmsCost,
    setSmsCost,
    forEachCallAdd ,
    newCallTotal,
    forEachSmsAdd,
    newSmsTotal,
    updateTotalCost,
    setWarningLevel,
    upDateWarning ,
    setCriticalLevel,
    upDateCritical,
    theWarningLevel,
    theCriticalLevel,
    setSettings,
    getSettings,
    recordAction,
    totals,
}
};

module.exports = billWithSettingsFunction;