import { LunarDate, SolarDate } from "../../dist/index.js";

// const solarDate = new SolarDate({day: 25, month: 3, year: 2023});
// const lunarDate = LunarDate.fromSolarDate(solarDate);
// const solarDate_2 = lunarDate.toSolarDate();

// console.log(solarDate.get());
// console.log(lunarDate.get());
// console.log(solarDate_2.get());
// console.log(lunarDate.getYearInfo());
// console.log(solarDate.toJdn());

// const dl = new SolarDate(new Date());
// const al = LunarDate.fromSolarDate(dl);

// const al = new LunarDate({day: 10, month: 3, year: 2023});
// const dl = al.toSolarDate().get();

// console.log(dl);
// console.log(al);
// console.log(al.getZodiacHour());
// console.log(al.getGioCanChi());
// console.log(al.getDayCanChi());
// console.log(al.getMonthCanChi());
// console.log(al.getYearCanChi());
// console.log(al.getTietKhi());
// console.log(al.getDayOfWeek());


// const dl = SolarDate.fromJd(2299159);
// const dl2 = SolarDate.fromJd(2299160);
// const dl3 = SolarDate.fromJd(2299161);
// console.log(dl);
// console.log(dl2);
// console.log(dl3);

const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(dl);
console.log(al);
console.log(al.toSolarDate());