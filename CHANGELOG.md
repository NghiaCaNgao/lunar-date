# Changelog
## [2.0.1] - 2023-08-23
### Fixed
- Sửa lỗi import để tương thích với commonjs typescript
## [2.0.0] - 2023-06-22
### Added
- Thêm interfaces: list **`ILunarDateEx`**, **`ILunarDateLeap`**
### Fixed
- Sửa lỗi `init` luôn nhận tháng nhuận đối với tháng có tháng nhuận. Fixed #9
- SolarDate.jdn đã có kiểm tra ngày tháng nhập có đúng không
### Removed
- constructor không còn attrs: `leap_year` và `jd`

## [1.0.11] - 2023-06-20
### Added
- function `setDate`
### Fixed
- function convert from `LunarDate` to `SolarDate`
### Removed
- Rename function
### Changed
- Refactor code
