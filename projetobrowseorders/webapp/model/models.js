sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/Device",
],
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, ODataModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },

            getODataModel: function () {
                const oDataModel = new ODataModel("/northwind/northwind.svc/");
                return new Promise(function (resolve, reject) {
                    oDataModel.attachMetadataLoaded(() => resolve(oDataModel));
                    oDataModel.attachMetadataFailed(() => reject("Serviço indisponível no momento."));
                });
            },

            getOrders: function () {
                const oDataModel = this.getODataModel();
                return new Promise((resolve, reject) => {
                    oDataModel
                        .then(oModel => {
                            oModel.read("/Orders", {
                                success: oData => {
                                    const oDataOrders = oData.results
                                    const numberOfOrders = oDataOrders.length
                                    const orders = oDataOrders.map(orders => ({
                                        ...orders,
                                        OrderDate: new Date(orders.OrderDate).toLocaleDateString("pt-BT"),
                                        ShippedDate: new Date(orders.ShippedDate).toLocaleDateString("pt-BT")
                                    }))
                                        const oModel = new JSONModel(orders);
                                        oModel.setProperty("/numberOfOrders", numberOfOrders)
                                        resolve(oModel)
                                },
                                error: oError => reject(oError)
                            });
                        })
                        .catch(oError => reject(oError));
                });
            }
        };
    });