-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-05-2021 a las 19:34:27
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `testdsg2021`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` varchar(11) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_pedido` date NOT NULL DEFAULT current_timestamp(),
  `fecha_almacen` date NOT NULL,
  `fecha_envio` date NOT NULL,
  `fecha_recibido` date NOT NULL,
  `fecha_finalizado` date NOT NULL,
  `tipo_transporte` enum('terrestre','aereo','maritimo') COLLATE utf8_spanish_ci NOT NULL,
  `direccion` longtext COLLATE utf8_spanish_ci NOT NULL,
  `estado` enum('activo','inactivo') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_usuario`, `fecha_pedido`, `fecha_almacen`, `fecha_envio`, `fecha_recibido`, `fecha_finalizado`, `tipo_transporte`, `direccion`, `estado`) VALUES
(1, '', '2021-05-01', '2021-05-24', '2013-05-08', '2022-05-05', '2021-05-24', 'terrestre', 'Centro urbano canton san bartolo, calle el sauce casa #15', 'activo'),
(2, '', '2021-05-24', '2021-05-24', '2021-05-24', '2021-05-24', '2021-05-24', 'maritimo', 'Leon Guanajuato', 'activo'),
(3, '', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', 'terrestre', '', 'inactivo'),
(4, '', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', 'terrestre', '', 'inactivo'),
(5, '', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', 'aereo', '', 'inactivo'),
(6, '', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', 'maritimo', '', 'inactivo'),
(7, '', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', 'maritimo', '', 'activo'),
(8, '', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', 'maritimo', '', 'activo'),
(9, '', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', 'terrestre', '', 'activo'),
(10, '', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', 'aereo', '', 'activo'),
(11, '', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', 'maritimo', '', 'activo'),
(12, '', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', 'terrestre', '', 'activo'),
(13, '', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', 'maritimo', '', 'activo'),
(14, '', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', '2021-05-25', 'terrestre', '', 'activo'),
(15, '', '0000-00-00', '2021-05-01', '2021-05-02', '2021-05-04', '2021-05-13', 'aereo', '2322', 'activo'),
(16, '', '0000-00-00', '2021-05-06', '2021-05-14', '2021-05-05', '2021-05-12', '', '1234', 'activo'),
(17, '', '2021-05-01', '2021-05-08', '2021-05-18', '2021-05-31', '2021-05-29', 'terrestre', '1111111111', 'activo'),
(18, '12', '2021-05-01', '2021-05-02', '2021-05-03', '2021-05-04', '2021-05-11', 'terrestre', '12', 'activo'),
(19, 'fsdf', '2021-04-27', '2021-05-03', '2021-05-05', '2021-05-11', '2021-05-03', 'terrestre', 'fsd', 'activo'),
(20, 'zxcz', '2021-05-03', '2021-05-21', '2021-05-02', '2021-05-05', '2021-05-21', 'maritimo', 'czxcc', 'activo'),
(21, 're', '2021-05-05', '2021-04-26', '2021-05-05', '2021-05-14', '2021-05-10', 'terrestre', 'er', 'activo'),
(22, '3232', '2021-05-26', '2021-05-06', '2021-05-18', '2021-06-01', '2021-05-30', 'aereo', '2323', 'activo'),
(23, '12', '2021-05-26', '2021-05-03', '2021-05-03', '2021-05-04', '2021-05-04', 'aereo', '12', 'activo'),
(24, '123', '2021-05-26', '2021-05-22', '2021-04-28', '2021-05-05', '2021-05-02', 'aereo', '12', 'activo'),
(25, 'ewewe', '2021-05-26', '2023-03-06', '2021-04-26', '2021-05-11', '2021-05-01', 'terrestre', 'wew', 'activo'),
(26, '1212', '2021-05-03', '2021-05-06', '2021-05-25', '2021-05-13', '2021-05-25', 'terrestre', '1213', 'activo'),
(27, '12', '2021-05-04', '1721-03-04', '2021-05-24', '2021-05-27', '2021-05-30', 'maritimo', 'CENTRO DE SAN SALVADOR', 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_detalles`
--

CREATE TABLE `pedidos_detalles` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_venta` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `estado_detalle` enum('activo','inactivo') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pedidos_detalles`
--

INSERT INTO `pedidos_detalles` (`id_detalle`, `id_pedido`, `id_producto`, `cantidad`, `precio_venta`, `estado_detalle`) VALUES
(1, 1, 1, 15, '124.45', 'activo'),
(2, 2, 2, 12, '123', 'activo'),
(3, 2, 1, 5, '34', 'activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `pedidos_detalles`
--
ALTER TABLE `pedidos_detalles`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `pedidos_detalles`
--
ALTER TABLE `pedidos_detalles`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos_detalles`
--
ALTER TABLE `pedidos_detalles`
  ADD CONSTRAINT `pk_id_pedidos` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
