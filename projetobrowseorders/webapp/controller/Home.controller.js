sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/lab2dev/projetobrowseorders/model/models",
    "com/lab2dev/projetobrowseorders/model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, Filter, FilterOperator, models, formatter) {
        "use strict";

        return Controller.extend("com.lab2dev.projetobrowseorders.controller.Home", {
            formatter:formatter,
            onInit: function () {
                const parameters = {
                    urlParameters: {
                        $expand:"Customer"
                    }
                }
                const orders = models.getOrders(parameters);
                orders
                    .then(oOrdersModel => this.getView().setModel(oOrdersModel, "orders"))
                    .catch(oError => MessageBox.error(oError));
            },

            onSearch: function(oEvent) {
                const aFilters = [];
                const sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    const filter = new Filter("Customer/CompanyName", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                };

                const oList = this.byId("list");
                const oBinding = oList.getBinding("items");
                oBinding.filter(aFilters);
                this.updateOrderCount()
            },

            updateOrderCount: function () {
                var oList = this.getView().byId("list"); // captura o valor pelo id do elemento da view
                var oBinding = oList.getBinding("items"); // captura o valor do campo "items"
                var iFilteredCount = oBinding.getLength(); // verifica o tamanho da lista
                var oViewModel = this.getView().getModel("orders"); //  captura a model "orders"
                oViewModel.setProperty("/numberOfOrders", iFilteredCount);  // seta a propriedade numberOfOrders com valor atualizado
            },

             onNavToOrderDetails: function(){
                this.getOwnerComponent().getRouter().navTo("OrderDetail")
                // this.oRouter.navTo("OrderDetail")
            },
            _countItems(aOrders){
                
                return aOrders.length
            }
        });
    });