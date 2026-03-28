import iso31661 from './dataset/iso3166-1.json';
import iso31662 from './dataset/iso3166-2.json';

export default class IsoAbstraction {
    constructor() {
        this.indexCountries = {};
        this.indexSubdivisions = {};

        this._createIndex();
    };

    _createIndex = () => {
        for (let item of iso31661["3166-1"]) {
            const alpha2 = item["alpha_2"];
            this.indexCountries[alpha2] = true;
        }
        for (let item of iso31662["3166-2"]) {
            const code = item["code"];
            const separatorIndex = code.indexOf("-");
            this.indexSubdivisions[code] = separatorIndex === -1 ? code : code.slice(0, separatorIndex);
        }
        this._applyCorrectionsSubdivisions();
    };

    _applyCorrectionsSubdivisions = () => {
        this.indexSubdivisions["CN-HK"] = "HK";

        // const rename = [["PL-DS", "PL-02"], ["PL-KP", "PL-04"], ["PL-LB", "PL-08"], ["PL-LD", "PL-10"], ["PL-LU", "PL-06"], ["PL-MA", "PL-12"], ["PL-MZ", "PL-14"], ["PL-OP", "PL-16"], ["PL-PD", "PL-20"], ["PL-PK", "PL-18"], ["PL-PM", "PL-22"], ["PL-SK", "PL-26"], ["PL-SL", "PL-24"], ["PL-WN", "PL-28"], ["PL-WP", "PL-30"], ["PL-ZP", "PL-32"]];
        // for (let [from, to] of rename) {
        //     this.indexSubdivisions[to] = this.indexSubdivisions[from];
        //     delete this.indexSubdivisions[from];
        // }
    };

    isValidCountryCode = (code) => {
        if (typeof code !== "string") {
            return false;
        }
        return this.indexCountries[code.toUpperCase()] || false;
    };

    isValidSubdivisionCode = (code) => {
        if (typeof code !== "string") {
            return false;
        }
        return !!this.indexSubdivisions[code.toUpperCase()] || false;
    };

    isSubdivisionInCountry = (subdivisionCode, countryCode) => {
        if (typeof subdivisionCode !== "string" || typeof countryCode !== "string") {
            return false;
        }
        return this.indexSubdivisions[subdivisionCode.toUpperCase()] === countryCode.toUpperCase();
    };
}