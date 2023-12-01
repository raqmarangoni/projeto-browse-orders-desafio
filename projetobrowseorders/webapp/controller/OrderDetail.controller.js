sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/odata/v2/ODataModel",
   "com/lab2dev/projetobrowseorders/model/models",
   "com/lab2dev/projetobrowseorders/model/formatter"
],
   function (Controller, JSONModel, ODataModel, models, formatter) {
      "use strict";

      return Controller.extend("com.lab2dev.projetobrowseorders.controller.OrderDetail", {
         formatter: formatter,
         onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter()
            this.oRouter.getRoute("OrderDetail").attachPatternMatched(this._onRouteMatched, this)
         },
         
         _onRouteMatched: function (oEvent) {
            const oArgs = oEvent.getParameter("arguments")
            const order = models.getOrderData(oArgs.orderID)
            order.then(oOrder => this.getView().setModel(oOrder, "order"))
         },

         onDeclinePress: function(){
            this.oRouter.navTo("RouteHome")
         },
      });
   });
