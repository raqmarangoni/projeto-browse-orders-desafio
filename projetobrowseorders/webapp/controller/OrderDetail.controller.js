sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "com/lab2dev/projetobrowseorders/model/models"
 ],
 function (Controller, JSONModel, ODataModel, models) {
    "use strict";
 
    return Controller.extend("com.lab2dev.projetobrowseorders.controller.OrderDetail", {
 
       onInit: function () {
          // Exemplo de criação de um modelo na Controller
          var oModel = new JSONModel({
             SupplierName: "Nome do Fornecedor",
             // Outras propriedades necessárias
          });
 
          this.getView().setModel(oModel, "myModel");
       },
 
       onAcceptPress: function () {
          // Lógica a ser executada quando o botão "Accept" for pressionado
       },
 
       onRejectPress: function () {
          // Lógica a ser executada quando o botão "Reject" for pressionado
       }
    });
 });
 