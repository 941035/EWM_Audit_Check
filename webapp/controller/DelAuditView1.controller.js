
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
    
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("com.ewm.audit.parker.zewmauditcheck.controller.DelAuditView1", {
            onInit: function () {
                this.oDataModel = this.getOwnerComponent().getModel();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("RoutAuditView1").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function(){
                this.getView().byId("idInpDelNum").setValue("");
                this.getView().byId("idButCont").setVisible(false);
            },
            onPressCont:function(){
                var that = this;
                var oInpVal = this.getView().byId("idInpDelNum").getValue();
                this.oDataModel.read("/OutbDeliDetailsSet", {
                    urlParameters: {
                        "$filter": "Docno eq '" + oInpVal + "'"
                        
                    },
                    success: function (oData) {
                        console.log(oData);
                        if(oData.results.length > 0){
                        var docModel = new JSONModel();
                        docModel.setData({DocumentData: oData.results});
                        
                        var deliverModel = new JSONModel();
                        deliverModel.setData({DeliveryNumber : oInpVal});
                        that.getOwnerComponent().setModel(deliverModel, "DeliveryModel");
                        that.getOwnerComponent().setModel(docModel, "DocumentModel");
                        that.getOwnerComponent().getRouter().navTo("RoutAuditView2");
                        
                        }
                        else{
                            MessageBox.information("No Document Details Found");
                        }




                    },
                    error: function (oError) {
                        sap.m.MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                        console.log(oError);

                    }
                });
                // this.getOwnerComponent().getRouter().navTo("RoutAuditView2");
            },
            onPressCheck:function(){
                var that=this;
                var oInpVal = this.getView().byId("idInpDelNum").getValue();
                if(oInpVal === ""){
                  sap.m.MessageToast.show("Please enter Outbound Delivery number");
                } else {
                    // this.getView().byId("idInpDelNum").setEnabled(false);
                    // this.getView().byId("idObjStatus").setVisible(true);
                    // this.getView().byId("idButCont").setVisible(true); 
                    // this.getView().byId("idCheck").setVisible(false);


                    this.oDataModel.read("/CheckValidDeliverySet('" + oInpVal + "')" , {
                    
                        success: function (oData) {
                            console.log(oData);
                          if(oData.Status === "Success"){
                            that.getView().byId("idButCont").setVisible(true);
                          }
                          else{
                            that.getView().byId("idButCont").setVisible(false);
                          }
                            
                        },
                        error: function (oError) {
                            that.getView().byId("idButCont").setVisible(false);
                            sap.m.MessageBox.error(JSON.parse(oError.responseText).error.message.value);
        
                        }
                    });




                }
                
            },
            onPressClear:function(){    
                var oInpVal = this.getView().byId("idInpDelNum").getValue();
                if(oInpVal === ""){
                    sap.m.MessageToast.show("There is no value to clear");
                } else {
                    this.getView().byId("idInpDelNum").setEnabled(true);
                    this.getView().byId("idInpDelNum").setValue(""); 
                    this.getView().byId("idObjStatus").setVisible(false); 
                    this.getView().byId("idButCont").setVisible(false);  
                    this.getView().byId("idButCont").setVisible(false);  
                    this.getView().byId("idCheck").setVisible(true);
                }
                
            },
            removeExtraChar: function(oEvent){
                var enteredValue = oEvent.getParameter("newValue");
                if (enteredValue.length == "14") {
                    this.getView().byId("idInpDelNum").setValue(enteredValue.slice(6, 14));
                }
                else {
                    return this.getView().byId("idInpDelNum").setValue(enteredValue);
                }

            }
            
        });
    });
