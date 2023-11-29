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
            },
        });
    });