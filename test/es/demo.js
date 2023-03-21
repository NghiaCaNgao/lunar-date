import {LunarDate, SolarDate} from "../../dist/bundle.js";

const solarDate = new SolarDate({day: 25, month: 3, year: 2023});
const lunarDate = LunarDate.fromSolarDate(solarDate);
const solarDate_2 = lunarDate.toSolarDate();

console.log(solarDate.get());
console.log(lunarDate.get());
console.log(solarDate_2.get());
console.log(lunarDate.getYearInfo());
console.log(solarDate.toJdn());

const al = new LunarDate({day: 10, month: 3, year: 2023});
const dl = al.toSolarDate().get();
console.log(dl);
