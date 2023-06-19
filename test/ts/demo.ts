import { SolarDate, LunarDate } from "../../bin/dist/index.mjs";

const solar_date = new SolarDate(new Date());
console.log(solar_date);
console.log(solar_date.toLunarDate());

const lunar_date = new LunarDate({day: 10, month:5, year:2023});
lunar_date.init()

console.log(lunar_date.toSolarDate());
console.log(lunar_date.toSolarDate().get());
