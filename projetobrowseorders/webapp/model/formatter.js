sap.ui.define(function () {
  "use strict";

  return {
      deliveryText: function (oRequiredDate, oShippedDate) {
          const requiredDate = new Date(oRequiredDate).getTime()
          const shippedDate = new Date(oShippedDate).getTime()
          // const oResourceBundle = this.getModel("i18n").getResourceBundle();
          if (!shippedDate) { return "None" }

          if (requiredDate - shippedDate > 0 && requiredDate - shippedDate <= 423000000) {
              return "Urgent"
          } else if (requiredDate < shippedDate) {
              return "Too Late"
          } else {
              return "In Time"
          }
      },
      deliveryStatus: function (oRequiredDate, oShippedDate) {
          const requiredDate = new Date(oRequiredDate).getTime()
          const shippedDate = new Date(oShippedDate).getTime()
          // const oResourceBundle = this.getModel("i18n").getResourceBundle();
          if (!shippedDate) { return "None" }

          if (requiredDate - shippedDate > 0 && requiredDate - shippedDate <= 423000000) {
              return "Warning"
          } else if (requiredDate < shippedDate) {
              return "Error"
          } else {
              return "Success"
          }
      }
  }
},  /* bExport= */ true);