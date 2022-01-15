const Level = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    VERY_HIGHT: 4,
    UNKNOW: 5
};

const hospitalType = {
    base: 0,
    hospital: 1,
    testcamp: 2
}

const Role = {
    admin: 1,
    nurse: 2,
    doctor: 3,
    testcampstaff: 4,
    hospitaladmin: 5,
}

module.exports = {
    Level, Role, hospitalType
}

