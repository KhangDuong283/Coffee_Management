-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 11, 2024 lúc 05:08 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `coffeemanagerment`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admins`
--

CREATE TABLE `admins` (
  `admin_id` varchar(255) NOT NULL,
  `admin_username` varchar(255) NOT NULL,
  `admin_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `admins`
--

INSERT INTO `admins` (`admin_id`, `admin_username`, `admin_password`) VALUES
('AM001', 'KhangDuong', 'dlk123'),
('AM002', 'Kddddddd', 'dlk123'),
('AM003', 'aaaaaaaaa', 'getCustomers'),
('AM004', 'KhangDuonga', '123123'),
('AM005', 'DuongLapKhang', '123123'),
('AM006', 'khangdeptrai', 'dlk123');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `billproducts`
--

CREATE TABLE `billproducts` (
  `bill_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `billproduct_quantity` int(11) NOT NULL,
  `billproduct_price` int(11) NOT NULL,
  `billproduct_size` int(11) NOT NULL,
  `billproduct_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `billproducts`
--

INSERT INTO `billproducts` (`bill_id`, `product_id`, `billproduct_quantity`, `billproduct_price`, `billproduct_size`, `billproduct_cost`) VALUES
('OD001', 'P001', 1, 22000, 0, 15000),
('OD001', 'P002', 1, 26000, 0, 15000),
('OD001', 'P002', 2, 32000, 1, 20000),
('OD002', 'P003', 2, 24000, 0, 18000),
('OD002', 'P001', 3, 22000, 0, 15000),
('OD002', 'P002', 2, 26000, 0, 15000),
('OD002', 'P004', 2, 25000, 0, 20000),
('OD003', 'P001', 1, 22000, 0, 15000),
('OD003', 'P002', 1, 26000, 0, 15000),
('OD003', 'P003', 1, 24000, 0, 18000),
('OD004', 'P001', 1, 22000, 0, 15000),
('OD004', 'P003', 1, 24000, 0, 18000),
('OD004', 'P004', 1, 25000, 0, 20000),
('OD004', 'P002', 1, 26000, 0, 15000),
('OD005', 'P001', 1, 22000, 0, 15000),
('OD006', 'P004', 3, 25000, 0, 20000),
('OD006', 'P001', 5, 22000, 0, 15000),
('OD006', 'P002', 4, 26000, 0, 15000),
('OD006', 'P003', 2, 24000, 0, 18000),
('OD007', 'P001', 1, 22000, 0, 15000),
('OD008', 'P004', 1, 25000, 0, 20000),
('OD009', 'P004', 1, 25000, 0, 20000),
('OD010', 'P001', 1, 22000, 0, 15000),
('OD010', 'P004', 3, 30000, 1, 25000),
('OD010', 'P003', 1, 34000, 2, 24000),
('OD010', 'P001', 2, 28000, 1, 20000),
('OD011', 'P003', 1, 24000, 0, 18000),
('OD011', 'P003', 1, 28000, 1, 20000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bills`
--

CREATE TABLE `bills` (
  `bill_id` varchar(255) NOT NULL,
  `bill_datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `branch_id` varchar(255) NOT NULL,
  `employee_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `bills`
--

INSERT INTO `bills` (`bill_id`, `bill_datetime`, `branch_id`, `employee_id`) VALUES
('OD001', '2024-05-01 22:50:24', 'B003', 'E006'),
('OD002', '2024-05-05 23:12:27', 'B003', ''),
('OD003', '2024-05-09 23:13:32', 'B003', ''),
('OD004', '2024-05-09 23:14:52', 'B001', ''),
('OD005', '2024-05-09 23:15:02', 'B001', ''),
('OD006', '2024-05-01 23:15:20', 'B001', ''),
('OD007', '2024-05-09 23:16:22', 'B002', ''),
('OD008', '2024-05-10 23:55:28', 'B001', 'E001'),
('OD009', '2024-05-11 13:11:50', 'B001', ''),
('OD010', '2024-05-11 19:30:35', 'B002', 'E004'),
('OD011', '2024-05-11 21:04:07', 'B002', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `branches`
--

CREATE TABLE `branches` (
  `branch_id` varchar(255) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `branch_address` varchar(255) DEFAULT NULL,
  `branch_email` varchar(255) DEFAULT NULL,
  `branch_phone` varchar(20) DEFAULT NULL,
  `branch_create_date` datetime DEFAULT current_timestamp(),
  `branch_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `branches`
--

INSERT INTO `branches` (`branch_id`, `branch_name`, `branch_address`, `branch_email`, `branch_phone`, `branch_create_date`, `branch_password`) VALUES
('B001', 'Highland Coffee', '3/2, Ninh Kieu, Can Tho', 'highlandcoffee@gmail.com', '0123456789', '2024-05-09 22:13:15', '123123'),
('B002', 'Phuc Long', 'Mau Than, Ninh Kieu, Can Tho', 'phuclong@gmail.com', '0123456789', '2024-05-09 22:27:01', '123123'),
('B003', 'Sonder', 'Mac Thien Tich, Ninh Kieu, Can Tho', 'sonder@gmail.com', '0123456789', '2024-05-09 22:27:39', '123123');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employees`
--

CREATE TABLE `employees` (
  `employee_id` varchar(255) NOT NULL,
  `employee_name` varchar(255) NOT NULL,
  `employee_email` varchar(255) DEFAULT NULL,
  `employee_phone` varchar(20) DEFAULT NULL,
  `employee_salary` decimal(10,2) DEFAULT NULL,
  `branch_id` varchar(255) NOT NULL,
  `employee_age` varchar(255) NOT NULL,
  `employee_position` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `employees`
--

INSERT INTO `employees` (`employee_id`, `employee_name`, `employee_email`, `employee_phone`, `employee_salary`, `branch_id`, `employee_age`, `employee_position`) VALUES
('E001', 'Khang Dương', 'khangduong@gmail.com', '0123456789', 6000000.00, 'B001', '22', 'Cashier'),
('E002', 'Vẫn Là Khang Dương', 'khang1024@gmail.com', '0123456789', 5000000.00, 'B001', '24', 'Server'),
('E004', 'Trần Văn Huy', 'huy@gmail.com', '0123456789', 6000000.00, 'B002', '25', 'Cashier'),
('E005', 'Huy nè', 'huy1@gmail.com', '1231231231', 5000000.00, 'B002', '22', 'Server'),
('E006', 'Khoa Lê', 'khoa10@gmail.com', '0123456789', 6000000.00, 'B003', '26', 'Cashier'),
('E007', 'Thiện Đạt', 'dat@gmail.com', '0123456789', 6000000.00, 'B002', '25', 'Cashier');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `product_id` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_active` tinyint(1) NOT NULL,
  `product_price_s` decimal(10,0) NOT NULL,
  `product_cost_s` decimal(10,0) NOT NULL,
  `product_price_m` decimal(10,0) NOT NULL,
  `product_cost_m` decimal(10,0) NOT NULL,
  `product_price_l` decimal(10,0) NOT NULL,
  `product_cost_l` decimal(10,0) NOT NULL,
  `product_current_size` int(11) NOT NULL DEFAULT 0,
  `product_img` varchar(255) NOT NULL,
  `product_quantity` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_active`, `product_price_s`, `product_cost_s`, `product_price_m`, `product_cost_m`, `product_price_l`, `product_cost_l`, `product_current_size`, `product_img`, `product_quantity`) VALUES
('P001', 'Cà phê đen', 1, 22000, 15000, 28000, 20000, 32000, 22000, 0, 'cf-den.jpg', 0),
('P002', 'Cà Phê Muối', 1, 26000, 15000, 32000, 20000, 37000, 26000, 0, 'cf-muoi.png', 0),
('P003', 'Cà Phê Sữa', 1, 24000, 18000, 28000, 20000, 34000, 24000, 0, 'cf-sua.png', 0),
('P004', 'Trà Sữa Thái Xanh', 1, 25000, 20000, 30000, 25000, 35000, 30000, 0, 'thai-xanh.jpg', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Chỉ mục cho bảng `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`bill_id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Chỉ mục cho bảng `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`branch_id`);

--
-- Chỉ mục cho bảng `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `employees_ibfk_1` (`branch_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `billproducts`
--
ALTER TABLE `billproducts`
  ADD CONSTRAINT `billproducts_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
