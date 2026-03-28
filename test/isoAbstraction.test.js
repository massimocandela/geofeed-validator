const { expect } = require("chai");

const IsoAbstraction = require("../src/isoAbstraction").default;

describe("IsoAbstraction", function () {
    it("validates country codes case-insensitively", function () {
        const iso = new IsoAbstraction();
        expect(iso.isValidCountryCode("it")).to.equal(true);
        expect(iso.isValidCountryCode("ZZ")).to.equal(false);
    });

    it("validates subdivision codes case-insensitively", function () {
        const iso = new IsoAbstraction();
        expect(iso.isValidSubdivisionCode("it-rm")).to.equal(true);
        expect(iso.isValidSubdivisionCode("IT-XXX")).to.equal(false);
    });

    it("checks subdivision-country membership", function () {
        const iso = new IsoAbstraction();
        expect(iso.isSubdivisionInCountry("IT-RM", "IT")).to.equal(true);
        expect(iso.isSubdivisionInCountry("IT-RM", "FR")).to.equal(false);
    });

    it("applies known correction for CN-HK to HK", function () {
        const iso = new IsoAbstraction();
        expect(iso.isSubdivisionInCountry("CN-HK", "HK")).to.equal(true);
        expect(iso.isSubdivisionInCountry("CN-HK", "CN")).to.equal(false);
    });
});
