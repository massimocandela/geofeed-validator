import ipUtils from "ip-sub";
import IsoAbstraction from "./isoAbstraction";
const iso = new IsoAbstraction();

const fromLine = (line) => {
    return fromArray(line.split(","));
};

const fromArray = ([prefix, country, region, city, zip]) => {
    const out = [];
    const validCountry = !country || iso.isValidCountryCode(country);
    const validRegion = !region || iso.isValidSubdivisionCode(region);
    const validCombination = !country || !region || !!validCountry && !!validRegion && iso.isSubdivisionInCountry(region, country);

    if (!ipUtils.isValidPrefix(prefix) && !ipUtils.isValidIP(prefix)) {
        out.push("Not valid IP/prefix");
    }

    if (!validCountry) {
        out.push("Not valid Country Code (iso-3166-1)");
    }

    if (!validRegion) {
        out.push("Not valid Subdivision Code (iso-3166-2)");
    }

    if (validCountry && validRegion && !validCombination) {
        out.push("The Subdivision is not inside the Country");
    }

    return out;
}

export default { fromArray, fromLine };
