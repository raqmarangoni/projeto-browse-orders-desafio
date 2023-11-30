sap.ui.define([
    "sap/ui/model/type/Currency"
], function (Currency) {
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
        },

        formatValue: function (nValue) {
            return Number.parseInt(nValue).toFixed(2)
        },
        formatTotalPrice: function (nPrice, nQuantity) {
            const values = (parseInt(nPrice) * parseInt(nQuantity))
            return values.toFixed(2)
        },
        formatHeaderDate: function (sHeaderDate) {
            return new Date(sHeaderDate).toLocaleDateString("en-us",
                {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                })
        },
        sumTotalProduct: function (sPrice, nQuantity) {
            const oCurrency = new Currency({ showMensure: false })
            const sumTotalProduct = +sPrice * nQuantity;

            return oCurrency.formatValue([sumTotalProduct.toFixed(2)], "string")
        },
    }
},  /* bExport= */ true);