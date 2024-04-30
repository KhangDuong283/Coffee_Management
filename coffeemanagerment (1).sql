-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 30, 2024 lúc 06:52 PM
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
('OD001', 'E006', 1, 45000, 0, 38000),
('OD002', 'E006', 5, 45000, 0, 38000),
('OD003', 'E007', 4, 39000, 2, 24000);

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
('OD001', '2024-04-30 19:33:58', 'B003', ''),
('OD002', '2024-04-30 19:34:41', 'B002', ''),
('OD003', '2024-04-30 23:11:32', 'B004', 'E001');

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
('B002', 'Cà phê 24h', 'Bình Thủy, Cần Thơ', 'khangduong@gmail.com', '0123456789', '2024-04-28 23:34:40', '123123'),
('B003', 'Cà phê mới', 'Bình Thủy, Cần Thơ', 'khang15@gmail.com', '0123456789', '2024-04-30 10:50:22', '123123'),
('B004', 'Demo branch', 'Khoa CNTT, Đại học Cần Thơ', 'demobranch@gmail.com', '0909123456', '2024-04-30 23:02:09', '123123');

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
('E001', 'Khang Dương', 'khang10@gmail.com', '112312312', 6000000.00, 'B004', '25', 'Cashier'),
('E002', 'Khang Dương', 'khang15@gmail.com', '1231231231', 6000000.00, 'B003', '24', 'Cashier'),
('E003', 'Vẫn là Khang Dương', 'khang1022@gmail.com', '', 5000000.00, 'B002', '25', 'Cashier'),
('E004', 'Trần Văn Huy', 'khang1024@gmail.com', '', 5000000.00, 'B002', '24', 'Cashier');

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
('D001', 'Phin sữa đá edit', 1, 29000, 20000, 39000, 30000, 45000, 35000, 0, '', 0),
('E004', 'Phindi Choco', 1, 45000, 35000, 49000, 38000, 55000, 42000, 0, '', 0),
('E005', 'Bạc xĩu', 1, 29000, 20000, 39000, 25000, 45000, 28000, 0, '', 0),
('E006', 'Phindi Hạnh Nhân', 1, 45000, 38000, 49000, 40000, 55000, 42000, 0, '', 0),
('E007', 'Phin đen đá ', 1, 29000, 20000, 35000, 22000, 39000, 24000, 0, '', 0),
('E008', 'Trà sen vàng', 1, 45000, 38000, 55000, 45000, 65000, 50000, 0, '', 0),
('E009', 'Trà thạch đào', 1, 45000, 40000, 55000, 45000, 65000, 55000, 0, '', 0),
('E010', 'Trà thạch vải', 1, 45000, 30000, 55000, 35000, 56000, 40000, 0, '', 0),
('E011', 'Trà xanh đậu đỏ', 1, 45000, 40000, 55000, 45000, 65000, 50000, 0, '', 0),
('P012', 'Cà phê demo niên luận', 1, 25000, 20000, 29000, 22000, 35000, 26000, 0, '', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Chỉ mục cho bảng `billproducts`
--
ALTER TABLE `billproducts`
  ADD PRIMARY KEY (`bill_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

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
  ADD CONSTRAINT `billproducts_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `billproducts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
