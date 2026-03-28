const { expect } = require("chai");

const validator = require("../src/validator").default;

describe("validator.fromLine", function () {
    it("returns undefined for blank lines", function () {
        expect(validator.fromLine("   ")).to.equal(undefined);
    });

    it("returns undefined for comment lines", function () {
        expect(validator.fromLine("# comment")).to.equal(undefined);
    });

    it("returns no errors for a valid geofeed line", function () {
        const errors = validator.fromLine("193.201.40.0/24,IT,IT-RM,Rome,");
        expect(errors).to.deep.equal([]);
    });

    it("reports invalid IP or prefix", function () {
        const errors = validator.fromLine("not-an-ip,IT,IT-RM,Rome,");
        expect(errors).to.include("Not valid IP/prefix");
    });

    it("reports invalid country code", function () {
        const errors = validator.fromLine("193.201.40.0/24,ZZ,IT-RM,Rome,");
        expect(errors).to.include("Not valid Country Code (iso-3166-1)");
    });

    it("reports invalid subdivision code", function () {
        const errors = validator.fromLine("193.201.40.0/24,IT,IT-XXX,Rome,");
        expect(errors).to.include("Not valid Subdivision Code (iso-3166-2)");
    });

    it("reports mismatch between valid subdivision and country", function () {
        const errors = validator.fromLine("193.201.40.0/24,FR,IT-RM,Rome,");
        expect(errors).to.include("The Subdivision is not inside the Country");
    });
});

describe("validator.fromArray", function () {
    it("accepts a valid single IP and country only", function () {
        const errors = validator.fromArray(["8.8.8.8", "US", "", "", ""]);
        expect(errors).to.deep.equal([]);
    });

    it("validates subdivision even if country is missing", function () {
        const errors = validator.fromArray(["8.8.8.8", "", "NOT-REAL", "", ""]);
        expect(errors).to.include("Not valid Subdivision Code (iso-3166-2)");
    });
});
