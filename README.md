# Chuyển lịch âm sang lịch dương và ngược lại

- Remake từ code của Hồ Ngọc Đức viết năm 2004
- Thuật toán: https://www.informatik.uni-leipzig.de/~duc/amlich/calrules.html

# Cách sử dụng
- Tải folder dist về là dùng được.
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

# API

## Một chút về dịch thuật
[Can chi trong Tiếng Anh](https://nguyenphuocvinhco.com/2019/02/05/nam-hoi-va-nam-ky-hoi-dich-sang-tieng-anh-nhu-the-nao/#:~:text=Trong%20c%E1%BB%A5m%20t%E1%BB%AB%20n%C4%83m%20'K%E1%BB%B7,th%E1%BA%ADp%20can%20th%E1%BA%ADp%20nh%E1%BB%8B%20chi.)

- lịch hoàng đạo:   Zodiac calendar
- 12 con giáp:      12 animal designations
- can chi:          sexagenary cycle
- can               heavenly stems
- chi               earthly branches

## Vấn đề đổi từ Julian Date sang Solar Date và ngược lại
