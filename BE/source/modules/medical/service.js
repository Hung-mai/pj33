const getAge = require("../../utils/getAge");

class MedicalService {
    static hasSymptom(record) {
        return (
            record.bodyTemperature > 37.5 ||
            record.isFever ||
            record.isCough ||
            record.isSoreThroat ||
            record.isOxygenSupport ||
            record.isHardBreath ||
            record.isMusclePain ||
            record.isLossOfTaste
        );
    }

    static isEmergency(record) {
        return (
            record.breathingFrequency > 25 ||
            record.heartbeat > 120 ||
            record.bloodPresure < 90
        );
    }
}

module.exports = MedicalService;