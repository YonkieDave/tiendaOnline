CREATE DATABASE shopOnline;

USE shopOnline;

CREATE TABLE usuarios 
(id_cliente INT NOT NULL IDENTITY(1,1),
nombre VARCHAR(60) NOT NULL,
apellido_paterno VARCHAR(60) NOT NULL,
apellido_materno VARCHAR(60) NOT NULL,
correo VARCHAR(60) NOT NULL,
direccion VARCHAR(60) NOT NULL,
telefono VARCHAR(60) NOT NULL,
contraseña VARCHAR(60) NOT NULL,
rol VARCHAR(50);
fecha_registro DATE,
fecha_actualizacion DATE,
PRIMARY KEY (id_cliente)
);


CREATE TABLE metodo_pago 
(id_metodo_pago INT NOT NULL,
id_cliente INT NOT NULL,
numero_tarjeta INT NOT NULL,
vencimiento DATE,
cvv INT,
fecha_registro DATE,
fecha_actualizacion DATE,
PRIMARY KEY (id_metodo_pago),
FOREIGN KEY (id_cliente) REFERENCES usuarios(id_cliente),
);


CREATE TABLE articulos 
(id_articulo INT NOT NULL IDENTITY(1,1),
nombre_articulo VARCHAR(255) NOT NULL,
descripcion VARCHAR(255),
precio_articulo FLOAT NOT NULL,
stock INT,
fecha_registro DATE,
fecha_actualizacion DATE,
PRIMARY KEY (id_articulo)
);

CREATE TABLE ventas 
(id_venta INT NOT NULL IDENTITY(1,1),
id_cliente INT NOT NULL,
id_articulo INT NOT NULL,
cantidad_vendida INT NOT NULL,
precio_articulo FLOAT NOT NULL,
total_venta FLOAT NOT NULL,
tipo_pago VARCHAR(25),
estatus VARCHAR(15),
fecha_venta DATE,
fecha_registro DATE,
fecha_actualizacion DATE,
PRIMARY KEY (id_venta),
FOREIGN KEY (id_cliente) REFERENCES usuarios(id_cliente),
FOREIGN KEY (id_articulo) REFERENCES articulos(id_articulo)
);

CREATE TABLE pedidos 
(id_pedido INT NOT NULL IDENTITY(1,1),
id_venta INT NOT NULL,
id_cliente INT NOT NULL,
id_articulo INT NOT NULL,
cantidad_vendida INT NOT NULL,
precio_articulo FLOAT NOT NULL,
total_pedido FLOAT NOT NULL,
dirección_envio VARCHAR(255) NOT NULL,
estatus VARCHAR(15),
fecha_envio DATE,
fecha_registro DATE,
fecha_actualizacion DATE,
PRIMARY KEY (id_pedido),
FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
FOREIGN KEY (id_cliente) REFERENCES usuarios(id_cliente),
FOREIGN KEY (id_articulo) REFERENCES articulos(id_articulo)
);


use shopOnline;

SELECT * FROM articulos;

ALTER TABLE articulos
ADD img VARCHAR(100);

--Tabla para nuestros productos propios

INSERT INTO articulos VALUES
(1,'SAMSUNG S9','Telefono samsung S9 usado sin detalles',5500.00,5,GETDATE(),GETDATE(),'http://http2.mlstatic.com/D_869177-MLA31274985683_062019-I.jpg'),
(2,'MOTOROLA ONE VISION','Telefono Motorola usado con detalle en las orillas',2500.00,10,GETDATE(),GETDATE(),'http://http2.mlstatic.com/D_833656-MLM41971750692_052020-O.jpg'),
(3,'OPO','Telefono OPO NUEVP',4000.00,3,GETDATE(),GETDATE(),'http://http2.mlstatic.com/D_663710-MLM47654241182_092021-O.jpg'),
(4,'IPHONE X','Telefono IPHONE bloqueado de IMEI',3490.00,1,GETDATE(),GETDATE(),'http://http2.mlstatic.com/D_808182-MLA43711683036_102020-I.jpg'),
(5,'HUAWEI P30 PRO','Telefono HUAWEI con servicios de google',12000.00,2,GETDATE(),GETDATE(),'http://http2.mlstatic.com/D_687927-MLA40127407768_122019-O.jpg'),
(6,'SAMSUNG S20','Telefono samsung usado sin detalles',15500.00,6,GETDATE(),GETDATE(),'http://http2.mlstatic.com/D_716099-MLA44188585155_112020-I.jpg'),
(7,'NOKIA','Telefono Nokia usado sin detalles rope pisos',380.00,10,GETDATE(),GETDATE(),'http://http2.mlstatic.com/D_836820-MLA41571945204_042020-I.jpg'),
(8,'BLACKBERRY','Telefono blackberry usado sin detalles para colección',7500.00,4,GETDATE(),GETDATE(),'http://http2.mlstatic.com/D_989583-MLM31646762456_072019-O.jpg'),
(9,'Zte Blade A71','Telefono ZTE NUEVO',4500.00,7,GETDATE(),GETDATE(),'http://http2.mlstatic.com/D_993716-MLM47074689635_082021-O.jpg');



SELECT * FROM usuarios;

SELECT * FROM usuarios WHERE correo = 'qwe';
SELECT * FROM usuarios WHERE correo = 'asdasdsaddsa@asdasd.com';


ALTER TABLE usuarios
ADD rol VARCHAR(100);

DELETE usuarios;


DROP TABLE articulos;