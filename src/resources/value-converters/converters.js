//import moment from "moment";

export class BooleanToTextValueConverter {
    toView(value) {
        return value ? "Ja" : "Nee";
    }
}

export class CapitalizeWordsValueConverter {
    fromView(value) {
        return value.capitalizeAllWords();
    }
}

export class CurrencyValueConverter {
    toView(value, withCurrencySymbol = false) {

        numeral.language("nl-nl", nl);
        numeral.language("nl-nl");

        let currencySymbol = withCurrencySymbol ? "$" : "";
        return numeral(value).format(`${currencySymbol}0,0.00`);
    }

    fromView(value) {
        value = _toFixedFloat(value);
        return isNaN(value) ? null : value;
    }
}

export class NumericValueConverter {
    toView(value, useDecimals = false) {
        numeral.language("nl-nl", nl);
        numeral.language("nl-nl");

        return value === null ? null : numeral(value).format(useDecimals ? "0.00" : "0,0");
    }

    fromView(value, useDecimals = false) {
        value = _toFixedFloat(value, useDecimals ? 2 : 0);
        return isNaN(value) ? null : value;
    }
}

export class TakeValueConverter {
    toView(array, count) {
        return array.slice(0, count);
    }
}

export class SkipValueConverter {
    toView(array, count) {
        return array.slice(count, array.length);
    }
}

export class TimeFormatValueConverter {
    toView(value) {
        return moment(value).format("HH:mm");
    }
}

export class DateFormatValueConverter {
    toView(value) {
        return moment(value).format("DD-MM-YYYY");
    }
}

function _toFixedFloat(x, precision) {
    precision = precision === null || precision === undefined ? 2 : precision;
    let value = x.replace(/[,]/g, ".").replace(/[^\.\d]/g, "");
    return Number(parseFloat(value).toFixed(precision));
};