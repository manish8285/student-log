const cars = [
    {
        make: "audi",
        model: "r8",
        year: "2012",
    },
    {
        make: "audi",
        model: "rs5",
        year: "2013",
    },
    {
        make: "ford",
        model: "mustang",
        year: "2012",
    },
    {
        make: "ford",
        model: "fusion",
        year: "2015",
    },
    {
        make: "kia",
        model: "optima",
        year: "2012",
    },
];

const groupedCars = {};

for (const car of cars) {
    const { make, ...carInfo } = car;
    if (!groupedCars[make]) {
        groupedCars[make] = [];
    }
    groupedCars[make].push(carInfo);
}

console.log(JSON.stringify(groupedCars, null, 2));