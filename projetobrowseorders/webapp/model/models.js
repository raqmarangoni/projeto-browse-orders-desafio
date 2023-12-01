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

            getOrders: function (oURLParam) {
                const oDataModel = this.getODataModel();
                return new Promise((resolve, reject) => {
                    oDataModel
                        .then(oModel => {
                            oModel.read("/Orders", {
                                ...oURLParam,
                                success: oData => {
                                    const oDataOrders = oData.results
                                    const numberOfOrders = oDataOrders.length
                                    const orders = oDataOrders.map(orders => ({
                                        ...orders,
                                        OrderDate: this.formatOrderDate(orders.OrderDate),
                                        ShippedDate: this.formatShippedDate(orders.ShippedDate)
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
            },
            formatOrderDate: function (sOrderDate) {
                const orderDate = new Intl.DateTimeFormat("en-us", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit"
                }).format(new Date(sOrderDate))
                return orderDate
            },
            formatShippedDate: function (sShippedDate) {
                const shippedDate = new Date(sShippedDate).toLocaleDateString("en-us",
                    {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                    })
                return shippedDate
            },

            getOrderData: function (OrderID) {
                const oDataModel = this.getODataModel();
                return new Promise((resolve, reject) => {
                    oDataModel
                        .then((oModel) => {
                            oModel.read(`/Orders(${OrderID})`, {
                                urlParameters: {
                                    $expand: "Customer,Order_Details/Product,Employee",
                                },
                                success: (oData) => {
                                    const sum = this.sumPrice(oData.Order_Details.results)
                                    oData.sum = sum
                                    return resolve(new JSONModel(oData))
                                },
                                error: (oError) => reject(oError)
                            });
                        }).catch((oError) => reject(oError))
                })
            },

            sumPrice: function(aProducts){
                const totalAmount = aProducts.reduce((acc, actualValue) => {
                          const productTotal = actualValue.Quantity * +actualValue.UnitPrice
                          return acc + productTotal
                       }, 0)
                       return totalAmount.toFixed(2)
            
            }
        };
    });