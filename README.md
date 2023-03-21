# Chuyển lịch âm sang lịch dương và ngược lại

- Remake từ code của Hồ Ngọc Đức viết năm 2004
- Thuật toán: https://www.informatik.uni-leipzig.de/~duc/amlich/calrules.html

# Cách sử dụng

## Chuyển đổi từ dương sang âm

```javascript
import { LunarDate, SolarDate } from "../../dist/bundle.js";

const solarDate = new SolarDate(new Date());
const lunarDate = LunarDate.fromSolarDate(solarDate);

console.log(solarDate.get());
console.log(lunarDate.get());

// { day: 21, month: 3, year: 2023, leap: false, julian: 2460025 }
// {day: 1, month: 3, year: 2023, leap: false, julian: 2460025, name: 'Quý Mão'}
```

## Chuyển từ lịch âm sang dương

```javascript
import { LunarDate, SolarDate } from "../../dist/bundle.js";

const al = new LunarDate({ day: 10, month: 3, year: 2023 });
const dl = al.toSolarDate().get();

// { day: 30, month: 3, year: 2023, leap: false, julian: 2460034 }
```
