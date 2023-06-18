# Chuyển lịch âm sang lịch dương và ngược lại

- Remake từ code của Hồ Ngọc Đức viết năm 2004
- Thuật toán:

# Cách sử dụng

- Tải folder dist về là dùng được.

- npm

```bash
npm i @nghiavuive/lunar_date_vi
```

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

## Interface

### ICalendarDate

Input option của Calendar Object

```ts
export interface ICalendar {
  day: number;
  month: number;
  year: number;
}
```

### ISolarDate

Input option cho Solar Object. Kế thừa từ [ICalendar](###ICalendar)

```ts
interface ISolarDate extends ICalendar
```

### ILunarDate

Input option cho LunarDate. Kế thừa từ [ICalendar](###ICalendar)

```ts
interface ILunarDate extends ICalendar {
  leap?: boolean;
  jd?: number;
}
```

### IZodiacHour

Cung hoàng đạo

```ts
interface IZodiacHour {
  name: string;
  time: number[];
}
```

## Solar Class

### Solar constructor 1

Tạo thực thể Solar Calendar từ [`ISolarDate`](###ISolarDate). Lưu ý: Nếu nhập sai ngày tháng thì đối thì sẽ báo lỗi `Invalid date`. Chi tiết về ngày hợp lệ xem [tại đây](https://github.com/NghiaCaNgao/lunarDate/wiki/Valid-dae)

```ts
public constructor(date: ISolarDate);
```

**Ví dụ:**

```ts
new SolarDate({ day: 1, month: 1, year: 2023 });
```

### Solar constructor 2

Tạo thực thể Solar Calendar từ Date object. Lưu ý: Nếu nhập sai ngày tháng thì đối tượng Date sẽ tự sửa lại. Nếu ngày nhập vào nằm trong khoảng từ **05-14/10/1582** thì sẽ báo lỗi `Invalid date`. Chi tiết về ngày hợp lệ xem [tại đây](https://github.com/NghiaCaNgao/lunarDate/wiki/Valid-dae)

```ts
public constructor(date: Date);
```

**Ví dụ:**

```ts
new SolarDate(new Date());
```

### SolarDate.fromJd()

Trả về một thực thể Solar Calendar từ ngày Julian.

```ts
static fromJd(jd: number): SolarDate
```

**Ví dụ:**

```ts
console.log(SolarDate.fromJd(2460035));

// SolarDate { day: 31, month: 3, year: 2023, jd: 2460035, leap: false }
```

### solar.toDate()

Chuyển thực thể Solar Calendar về dạng Date

```ts
toDate(): Date
```

**Ví dụ:**

```ts
const solar = new SolarDate(new Date());
console.log(solar.toDate());

// 2023-03-30T17:00:00.000Z
```

### solar.get()

Lấy thông tin của đối tượng solar

```ts
get(): ISolarDate;
```

```ts
const dl = new SolarDate(new Date());
console.log(dl.get());

// { day: 31, month: 3, year: 2023, leap_year: false, julian: 2460035 }
```

## Lunar class

### Constructor 1

```ts
constructor(date: ILunarDate)
```

- Ví dụ:

```ts
const al = new LunarDate({ day: 1, month: 1, year: 2023 });
```

### SolarDate.fromSolarDate()

- Chuyển từ dương lịch sang âm lịch

```ts
const dl = new SolarDate(new Date());
console.log(LunarDate.fromSolarDate(dl));

// LunarDate2 { day: 10, month: 2, year: 2023, leap: true, jd: 2460035 }
```

### lunar.get()

- Lấy thông tin của đối tượng lunar

```ts
get();
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.get());

// {
//   day: 10,
//   month: 2,
//   year: 2023,
//   leap: true,
//   julian: 2460035,
//   name: 'Quý Mão'
// }
```

### lunar.getYearCanChi()

- Lấy can chi của năm

```ts
getYearCanChi(): string
```

- Ví dụ:

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getYearCanChi());

// Quý Mão
```

### lunar.getMonthCanChi()

- Lấy Can của tháng

```ts
getMonthCanChi(): string
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getMonthCanChi());

// Ất Mão (nhuận)
```

### lunar.getDayCanChi()

- Lấy Can của ngày

```ts
getDayCanChi(): string
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getDayCanChi());

// Mậu Tý
```

### lunar.getGioCanChi()

- Lấy Can của giơ

```ts
getGioCanChi(): string
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getGioCanChi());

// Nhâm Tý
```

### lunar.getDayOfWeek()

- Thứ trong tuần

```ts
getDayOfWeek(): string
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getDayOfWeek());

// Thứ sáu
```

### lunar.getTietKhi()

- Thứ trong tuần

```ts
getTietKhi(): string
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getTietKhi());

// Xuân phân
```

### lunar.getZodiacHour()

- Lấy giờ hoàng đạo

```ts
getZodiacHour(): Array
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getZodiacHour());

// [
//   { name: 'Tý', time: [ 23, 1 ] },
//   { name: 'Sửu', time: [ 1, 3 ] },
//   { name: 'Mão', time: [ 5, 7 ] },
//   { name: 'Ngọ', time: [ 11, 13 ] },
//   { name: 'Thân', time: [ 15, 17 ] },
//   { name: 'Dậu', time: [ 17, 19 ] }
// ]
```

### lunar.toSolarDate()

- Lấy giờ hoàng đạo

```ts
toSolarDate(): SolarDate
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.toSolarDate());
```
