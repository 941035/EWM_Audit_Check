sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.ewm.audit.parker.zewmauditcheck.controller.DelAuditView2", {
            onInit: function () {
            var oTable = this.byId("documentTable");
			oTable._getSelectAllCheckbox().setVisible(false);
            this.oDataModel = this.getOwnerComponent().getModel();
            this.getView().byId("deliveryNumber").setText(this.getOwnerComponent().getModel("DeliveryModel").getData().DeliveryNumber);
            },
            handleSelectionChange: function(){

            },
            onNavButtonPress:function(){
                this.getOwnerComponent().getRouter().navTo("RoutAuditView1");
            },
            onpressSave: function(){
                var oTable= this.getView().byId("documentTable");
                var selectedItems= oTable.getSelectedItems();
                var bFlag = false;
                var that = this;

                if(selectedItems.length > 0 ){
                for(var count =0; count < selectedItems.length ; count++ ){

                    if(selectedItems[count].getAggregation("cells")[3].getSelectedKey() == ""){
                        selectedItems[count].getAggregation("cells")[3].setValueState("Error");
                        selectedItems[count].getAggregation("cells")[3].setValueStateText("Select Audit Check");
                        sap.m.MessageBox.error("Audit check should be done for selected items");
                        bFlag = true;
                        break;
                    }
                    else{
                        selectedItems[count].getAggregation("cells")[3].setValueState("None");
                        selectedItems[count].getAggregation("cells")[3].setValueStateText("");
                    }
                }

                if(!bFlag){
                    this.preparePayload(selectedItems);
                    this.oDataModel.create("/CheckValidDeliverySet", this.requestBody, {
                        success: function(oData){
                            sap.m.MessageBox.show("Audit Checked Successfully",{
                                action:["OK"],
                                onClose: function(){
                                    that.getOwnerComponent().getRouter().navTo("RoutAuditView1");
                                }
                            })
                            console.log(oData);
                        },
                        error: function(oError){
                            sap.m.MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                        }
                    })
                }
            }
            else{
                sap.m.MessageBox.error("Select line items to save");
            }
            },
            preparePayload: function(arraySelectedItems){
                this.requestBody={};
                this.selectedItem =[];

                for(var a =0; a < arraySelectedItems.length; a++ ){
                var lineItems =this.getOwnerComponent().getModel("DocumentModel").getProperty(arraySelectedItems[a].getBindingContextPath());
                lineItems.Auditcheck = arraySelectedItems[a].getAggregation("cells")[3].getSelectedKey()
                this.selectedItem.push(lineItems);
                }
                this.requestBody.Docno = this.selectedItem[0].Docno ;
                this.requestBody.ToLineitems = this.selectedItem;
                
            },
            onAuditSelected: function(oEvent){
                oEvent.getSource().setValueState("None");
                oEvent.getSource().setValueStateText("");
            }
        });
    });