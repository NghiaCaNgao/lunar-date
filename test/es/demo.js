import Calendar from "../../dist/bundle.js";

const SolarDate = Calendar.SolarDate;
const LunarDate = Calendar.LunarDate;

const solarDate = new SolarDate(new Date());
const lunarDate = LunarDate.fromSolarDate(solarDate);
const solarDate_2 = lunarDate.toSolarDate();

console.log(solarDate.get());
console.log(lunarDate.get());
console.log(solarDate_2.get());
console.log(lunarDate.getYearInfo());
console.log(solarDate.toJdn());