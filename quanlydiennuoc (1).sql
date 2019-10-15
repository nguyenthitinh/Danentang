-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 15, 2019 lúc 01:58 PM
-- Phiên bản máy phục vụ: 10.1.38-MariaDB
-- Phiên bản PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quanlydiennuoc`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diennuoc`
--

CREATE TABLE `diennuoc` (
  `iddn` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `idphong` int(11) NOT NULL,
  `tieude` text NOT NULL,
  `thangnam` date NOT NULL,
  `chisocu` int(11) NOT NULL,
  `chisomoi` int(11) NOT NULL,
  `dongiadien` float NOT NULL,
  `gianuoc` int(11) NOT NULL,
  `giaphong` int(11) NOT NULL,
  `tongtien` double NOT NULL,
  `nguoinop` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `diennuoc`
--

INSERT INTO `diennuoc` (`iddn`, `iduser`, `idphong`, `tieude`, `thangnam`, `chisocu`, `chisomoi`, `dongiadien`, `gianuoc`, `giaphong`, `tongtien`, `nguoinop`) VALUES
(18, 1, 1, 'Tháng 9 - 2019', '2019-09-01', 1468, 1711, 2500, 60000, 1200000, 1867500, 'Tô Xuân Nam 1997'),
(19, 1, 3, 'Tháng 09-2019', '2019-09-01', 1756, 1789, 3000, 75000, 650000, 824000, 'Hĩm'),
(20, 1, 1, 'Tháng 8 / 2019', '2019-08-01', 1354, 1442, 3500, 25000, 1000000, 1333000, 'Hoàng Minh Hảii'),
(21, 1, 1, 'Tháng 10 / 2019', '2019-10-01', 1789, 1820, 3500, 50000, 1200000, 1358500, 'Tô Xuân Nam'),
(22, 1, 2, 'Thang 7- 2019', '2019-07-01', 1231, 1250, 3000, 50000, 1000000, 1107000, 'Trần Văn Anh'),
(24, 1, 2, 'Tháng 8/2019', '2019-08-01', 1250, 1283, 3500, 25000, 1000000, 1140500, 'Hĩm'),
(25, 1, 3, 'T10/2019', '2019-10-01', 1789, 1812, 3000, 50000, 650000, 769000, 'Hĩm');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phong`
--

CREATE TABLE `phong` (
  `idphong` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `tennguoithue` text NOT NULL,
  `tenphong` text NOT NULL,
  `giaphong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `phong`
--

INSERT INTO `phong` (`idphong`, `iduser`, `tennguoithue`, `tenphong`, `giaphong`) VALUES
(1, 1, 'Tô Xuân Nam', 'Room 1-B', 1000000),
(2, 1, 'Trần Văn Anh', 'Phòng 2', 1000000),
(3, 1, 'Hĩm', 'Room 3', 650000),
(4, 3, 'Hoàng Thành D', 'Phòng 4', 550000),
(5, 1, 'Nô', 'Phòng Hĩm', 1200000),
(6, 1, 'Vũ Tuấn Anh', 'Phòng 6', 550000),
(7, 1, 'Chu Hoàng Vũ', 'Phòng 7', 1200000),
(8, 1, 'Nguyễn Thị Thoa', 'Phòng 8', 550000),
(9, 1, 'Phạm Quang Bình', 'Phòng 9', 550000),
(10, 1, 'Vũ Hoàng Long', 'Phòng 10', 1200000),
(12, 1, 'Lý Thu Ngân', 'Room 12', 1000000),
(14, 1, 'Ngô V Nam, Tô V Thanh', 'Phong 14', 2000000),
(17, 1, 'Tú Anh', 'Vip 5', 1200000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `hoten` text,
  `namsinh` int(11) DEFAULT NULL,
  `diachi` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `hoten`, `namsinh`, `diachi`) VALUES
(1, 'a', 'a', 'Nguyễn Thị Tình', 1997, 'Tổ 4 - P.Tân Thịnh - TP.Thái Nguyên'),
(2, 'tinh97', '123456', NULL, NULL, NULL),
(3, 'tinh', '123', NULL, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `diennuoc`
--
ALTER TABLE `diennuoc`
  ADD PRIMARY KEY (`iddn`),
  ADD KEY `fk2` (`iduser`),
  ADD KEY `fk3` (`idphong`);

--
-- Chỉ mục cho bảng `phong`
--
ALTER TABLE `phong`
  ADD PRIMARY KEY (`idphong`),
  ADD KEY `fk1` (`iduser`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `diennuoc`
--
ALTER TABLE `diennuoc`
  MODIFY `iddn` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `phong`
--
ALTER TABLE `phong`
  MODIFY `idphong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `diennuoc`
--
ALTER TABLE `diennuoc`
  ADD CONSTRAINT `fk2` FOREIGN KEY (`iduser`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk3` FOREIGN KEY (`idphong`) REFERENCES `phong` (`idphong`);

--
-- Các ràng buộc cho bảng `phong`
--
ALTER TABLE `phong`
  ADD CONSTRAINT `fk1` FOREIGN KEY (`iduser`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
