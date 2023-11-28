sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "com/lab2dev/projetobrowseorders/model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, models) {
        "use strict";

        return Controller.extend("com.lab2dev.projetobrowseorders.controller.Home", {
            onInit: function () {
                const orders = models.getOrders();

                orders
                    .then(oOrdersModel => this.getView().setModel(oOrdersModel, 'orders'))
                    .catch(oError => MessageBox.error(oError));
            }
        });
    });