-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2021 a las 16:22:27
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `recipedia`
--
CREATE DATABASE IF NOT EXISTS `recipedia` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `recipedia`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(1),
(1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recipe`
--

CREATE TABLE `recipe` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ingredients` varchar(1500) COLLATE utf8_spanish_ci DEFAULT NULL,
  `steps` varchar(10000) COLLATE utf8_spanish_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `recipe_book_id` bigint(20) DEFAULT NULL,
  `imageurl` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `views` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `recipe`
--

INSERT INTO `recipe` (`id`, `description`, `ingredients`, `steps`, `title`, `recipe_book_id`, `imageurl`, `views`) VALUES
(16, 'Cómo hacer calamares en su tinta con arroz blanco.', '1 kg. calamares de calidad\n3 cebollas grandes\n2 dientes de ajo\n200 ml. vino blanco\n200 ml. de agua\n6 cucharadas de aceite de oliva virgen extra\n1 sobre de tinta de calamar\nSal (al gusto)\nOpcional: 3-4 pimientas negras enteras (sin moler)\nPara acompañar: Arroz blanco redondo', 'Limpiamos los calamares retirándoles tripas, ojos, boca y concha interior. Los lavamos bien bajo el grifo para retirar posibles restos y escurrimos.\n\nTenemos que tener precaución con reservar y no romper la bolsita de tinta que se encuentra en su interior. Esta tinta la utilizaremos para darle sabor y color a nuestro guiso. Cortamos el calamar en anillos y los tentáculos en trocitos y reservamos.\n\nColocamos la tinta en un vaso con agua y aplastamos hasta romper la bolsa que la guarda para que se desprenda y tiña el agua. Reservamos.\n\nEn un cazo incorporamos aceite de oliva virgen extra. Mientras este se calienta pelamos y cortamos la cebolla en trozos irregulares y los dientes de ajo muy picaditos.\n\nIncorporamos al cazo cuando el aceite esté caliente. Rehogamos a fuego medio durante 10 minutos, removiendo de vez en cuando para evitar que se queme al fondo. Añadimos los calamares cortados y dejamos que se sofrían con la cebolla durante 10 minutos más. Salpimentamos.\n\n\nGuiso y cocción de los calamares en su tinta:\n\nVertemos el vino a la cazuela y seguimos cocinando durante 2 minutos hasta que se evapore el alcohol. Salamos y agregamos el agua teñida que tenemos reservada pasándola por un colador.\n\nSi queremos podemos agregar el contenido de un sobrecito de tinta de calamar comercializada. Es suficiente con que el agua cubra los calamares, no haría falta más. Dejamos que se cocine nuestro guiso a fuego medio durante 60 minutos, removiendo ocasionalmente para evitar que se pegue. \n\nSi por alguna razón la salsa es demasiado líquida y nos gusta más espesa sólo tendremos que añadir una cucharadita de almidón de maíz.\n\nLa vamos a disolver en un par de cucharadas de agua. Así conseguiremos que espese la salsa ligeramente. Si por el contrario vemos que el agua se está quedando escasa durante el proceso, agregamos un poco más sin problema. Rectificando de sal si es preciso.\n\n\nPreparamos el arroz blanco y presentación final\n\nEn una cazuela pequeña ponemos dos cucharadas de aceite de oliva virgen extra. Dejamos que se caliente y añadimos los dos vasos de arroz. Lo sofreímos. A continuación agregamos el agua caliente. Dos vasos y medio de agua, por cada vaso de arroz. En nuestro caso serán 5 vasos completos de agua caliente. \nPonemos sal, al gusto. Removemos.\n\nLo llevamos a ebullición e inmediatamente después lo bajamos al mínimo. Tapamos la cacerola y vamos comprobando hasta que el agua se evapore. Lo apagamos y lo dejamos reposar 2 ó 3 minutos. Servimos los calamares acompañados de arroz blanco para poder empaparlo con la salsa.', 'Calamares en su tinta', 1, 'https://firebasestorage.googleapis.com/v0/b/recipedia-edabe.appspot.com/o/images%2Fcalamares.jpg?alt=media&token=7826d301-6d19-4e0b-b1aa-fd3a91aadebd', 2),
(20, 'Clásica receta china', 'Arroz de grano largo 400 g\nZanahoria 1\nGambas 150 g\nGuisantes 75 g\nJamón de York en taquitos 75 g\nHuevos 2\nSalsa de soja 20 ml\nAzúcar 10 g\nAceite de oliva virgen extra 20 ml', 'Cortamos la zanahoria en dados pequeños y la ponemos a cocer en una cacerola con agua y un poco de sal. Abrimos la lata de guisantes. Batimos los huevos con la sal y una cucharadita de azúcar y preparamos una tortilla francesa en dos tandas, usando una sartén bien caliente con media cucharada de aceite de oliva. La tortilla debe quedarnos bastante fina, tipo crêpe.\n\nMientras tanto, ponemos en otro cazo con agua de sal el arroz largo tipo basmati o thai a cocer. En unos diez minutos estará listo, dependiendo de la variedad, momento en el que lo escurrimos y reservamos. Mientras cuece, cortamos el jamón de York en taquitos.\n\nSalteamos las gambas ligeramente en una sartén amplia con el resto del aceite de oliva, y como ya tenemos todos los ingredientes listos, procedemos a preparar el plato de arroz tres delicias. Para ello, añadimos el arroz bien escurrido a la sartén, y sazonamos con las cucharadas de salsa de soja.\n\nUna vez bien salteado, agregamos los demás ingredientes, salteando para que todos se mezclen en la sartén y una vez listos lo pasamos a una fuente y lo servimos inmediatamente, muy caliente con un poco de salsa de soja aparte para que quien quiera pueda añadirla a su gusto.', 'Arroz tres delicias', 1, 'https://firebasestorage.googleapis.com/v0/b/recipedia-edabe.appspot.com/o/images%2FArroz%20tres%20delicias.jpg?alt=media&token=761d4047-e98d-4a2c-ab98-f0e6d797eee8', 3),
(21, 'Uma delicia', '2 puerros\n2 zanahorias grandes\n1 cebolla\n1 zanco de pollo\n250 g. morrillo de ternera\n1 hueso de rodilla de ternera\n1 manojo de perejil fresco\n1 hoja de laurel\nAceite de oliva virgen extra\n4 l. de agua\nSal (al gusto)', 'Retiramos la piel y posibles restos de grasa del zanco de pollo.\n\nEn una olla grande calentamos 4 cucharadas de aceite de oliva. Cuando esté caliente doramos el zanco de pollo y la carne de morrillo de ternera.\n\nMientras doramos la carne pelamos la cebolla y la cortamos en dos.\n\nLavamos las zanahorias y los puerros y los cortamos en 3 trozos.\n\nCuando la carne esté dorada incorporamos el resto de ingredientes. Los puerros, las zanahorias y la cebolla, la hoja de laurel, el manojo de perejil entero, el hueso de rodilla de ternera. Incorporamos el agua y salamos.\n\nPonemos a cocer la olla a fuego medio tapada durante 2 horas.\n\nDe vez en cuando, con una cuchara iremos retirando la espuma que se va a ir creando. \nSi queremos reducir considerablemente el tiempo de cocción podemos utilizar una olla expres en lugar de una olla tradicional. En este caso con media hora de cocción será suficiente.\n\nPasado el tiempo de cocción retiramos las carnes, el hueso y las verduras.', 'Consomé', 1, 'https://firebasestorage.googleapis.com/v0/b/recipedia-edabe.appspot.com/o/images%2Fconsome.jpg?alt=media&token=40c5faec-abfa-43d5-b2d9-fab62a9c9ee8', 26),
(23, 'Esta es una receta personal', 'Cosas secretas', 'Pasos secretos', 'Receta privada', 7, '/images/recipe/default-recipe.png', 25),
(25, 'Clásica tarta americana de cerezas', 'Harina de trigo (para la masa) 250 g\nMantequilla muy fría (para la masa) 125 g\nSal (para la masa) 2 g\nAzúcar (para la masa) 60 g\nLeche helada (para la masa) 30\nHuevo para pincelar la tarta 1\nCerezas deshuesadas (para el relleno) 800 g\nAzúcar (para el relleno) 200 g\nHarina de maíz refinada (para el relleno) 30 g\nEsencia de vainilla (para la masa) 5 ml\nClara de huevo (para la masa) 1', 'Lavamos bien las cerezas y las deshuesamos. Pesamos para obtener los 800 gramos necesarios para el relleno de nuestra tarta o cherry pie. Ponemos las cerezas deshuesadas y el azúcar en un recipiente amplio y hondo. Tapamos con papel film y dejamos reposar en la nevera entre 8 y 10 horas.\n\nPreparamos la base de la tarta siguiendo las instrucciones de nuestra receta infalible de masa brisa, pero sin llegar a hornearla. Esto lo haremos una vez rellena de cerezas y montada la tarta. Reservamos la masa en la nevera, dividida en dos mitades (una un poco más grande que otra) envueltas en papel film.\n\nCuando llegue el momento de montar la tarta, estiramos la mitad más grande de masa en forma circular y la colocamos en un molde de 25 cm, en cuya base habremos colocado un disco de papel vegetal. Retiramos el sobrante y guardamos en el congelador mientras continuamos con la receta.\n\nEstiramos la otra porción de masa, dando forma rectangular. Con un cortapastas de zigzag o un cuchillo afilado cortamos en tiras de un centímetro de ancho, cubrimos con papel film y guardamos también en el congelador.\n\nAñadimos la harina de maíz refinada a las cerezas, que habrán soltado todo su jugo, y removemos bien hasta que no se aprecien grumos. Sacamos la masa base del congelador y distribuimos el relleno por encima. Sacamos la otra masa del congelador y formamos un enrejado con las tiras sobre las cerezas.\n\nBatimos el huevo y pincelamos el enrejado. Introducimos la tarta en la parte inferior del horno, precalentado a 220 ºC con calor abajo, y cocemos durante 12 minutos. Después bajamos la temperatura a 200 ºC y cocemos entre 35 y 40 minutos, según como se vea de dorada.\n\nRetiramos la tarta del horno y dejamos enfriar completamente antes de desmoldar. Es una tarta muy frágil que hay que manipular con cuidado. Está deliciosa en el día de elaboración, pero también uno o dos días más tarde.', 'Cherry pie', 8, 'https://firebasestorage.googleapis.com/v0/b/recipedia-edabe.appspot.com/o/images%2Ftarta.jpg?alt=media&token=34755c92-5366-43bd-bbc2-650c58c6b269', 4),
(26, '', '500 g de habas\n1 punta de jamón\n2 chorizos\n1 tocino con carne (opcional)\n1 pegote de sobrasada (opcional)\n1 cabeza de ajo\n1 cucharadita colmada de pimentón dulce \nUn poco de pimentón picante\n1-2 hojas de laurel\n1 cayena\nsal y pimienta.', 'Las habas secas deben estar a remojo, como mínimo 12 horas, pero es mucho más recomendable extender el tiempo a más de 24 horas, cambiando el agua un par de veces en el proceso. \n\nUna vez remojadas y escurridas, poner las habas en una olla grande con el laurel. \nAñadir el hueso de jamón entero o troceado, los chorizos cortados en rodajas más bien gordas, la panceta o tocino troceado, y la cabeza de ajo cortada por la mitad, pelada solo en las capas más exteriores y sueltas. \n\nAñadir las cayenas, una cucharadita de pimentón dulce y un poco de picante, al gusto. \nSi se agrega la sobrasada, reducir la cantidad de pimentones. Salpimentar ligeramente y agregar agua suficiente para cubrirlas un par de dedos.\n\n Calentar, llevar a ebullición y cocinar a fuego vivo 10-15 minutos, retirando la espuma que pueda salir.\n\n Bajar el fuego, tapar y dejar cocinando a fuego lento entre dos y tres horas. El tiempo final dependerá del remojo de las habas, su edad y de la dureza del agua.\n\nMenear la olla desde las asas, no metiendo una cuchara para no romper demasiado la legumbre. Probar y ajustar de sal al final. Si tuvieran mucho caldo, cocer unos minutos más a fuego vivo con la olla destapada.', 'Michirones', 8, 'https://firebasestorage.googleapis.com/v0/b/recipedia-edabe.appspot.com/o/images%2Fmichirones.jpg?alt=media&token=ae492581-c930-4503-8d99-ea368b4d5b11', 2),
(27, 'Al estilo de Murcia', '1 pulpo de 1kg\nAceite de oliva virgen extra\nAgua \nUn corcho \nEl zumo de un par de limones \nSal.', 'Esta receta tiene tres pasos previos a su degustación, y el primero de ellos es limpiar la bolsa del pulpo (nos lo puede hacer nuestro profesional en la pescadería) y congelarlo. Este paso es importante porque al congelar, se rompen las fibras y al cocinarlo queda más tierno.\n\nEl segundo paso es, una vez descongelado, cocer el pulpo en agua con un corcho (cultura tradicional), durante 30 minutos.\n\nY el tercer y definitivo paso es asar al pulpo ya cocido, con su jugo de cocción, durante otros 30 minutos, y gratinar después otros 5 minutos, de manera que el animal quedará tierno por dentro y crujiente por fuera.\n\nTroceamos, aliñamos con zumo de limón, Aceite de oliva virgen extra y pizca de sal y solo queda disfrutar de el.', 'Pulpo al horno', 8, 'https://firebasestorage.googleapis.com/v0/b/recipedia-edabe.appspot.com/o/images%2Fpulpo.jpg?alt=media&token=4141050f-6077-4e5f-8546-4888823a5251', 2),
(28, 'Postre típico de la huerta murciana', '1 vaso de leche\n1 huevo\n1 vaso de harina\n1/2 sobre de levadura química\nRalladura de limón\nHojas de limonero de un tamaño uniforme, mejor verde más claro que muy oscuro y con un poco de rabito para facilitar la elaboración de la receta\nAceite de oliva para freír\n1 vaso de azúcar y 1 cucharadita de canela para espolvorear', 'Lava y seca bien las hojas de limonero. Si tienen un poco de rabito, mejor\n\nEcha en un cuenco la leche, huevo, harina, levadura y ralladura de limón. Puedes batirlo hasta que no tenga grumos con la batidora o un robot de cocina, pero con la batidora sobra.\n\nSi la masa está muy líquida, añade un pelín más de harina. Si está muy espesa, un pelín más de leche. La textura tiene que ser la de una papilla ligera que cubra la hoja con una capa ni muy fina ni muy gruesa.\n\nEcha el aceite en una sartén y ponlo a calentar a unos 180 ºC (como para freír patatas).\nMientras mezcla el azúcar con la canela para espolvorear cuando estén fritos.\n\nCuando esté caliente, ve untando cada hoja bien lavada y seca en la mezcla por las dos caras y échala a la sartén. Puedes ir echando 4 o 5 seguidos.\n\nCuando esté dorado por un lado, dale la vuelta, y cuando esté frito, ponlo a escurrir sobre un trozo de papel absorbente de cocina.\n\nTodavía calientes, pásalos a un plato y espolvoréalos por las dos caras con la mezcla de azúcar y canela.\n\nSe sirven templados o fríos pero recién hechos (aguantan varias horas perfectos).\n\nSi te sobran, puedes calentarlos en el microondas o tomarlos tal cual, no están tan crujientes pero siguen estando muy ricos.', 'PAPARAJOTES MURCIANOS', 8, 'https://firebasestorage.googleapis.com/v0/b/recipedia-edabe.appspot.com/o/images%2FPaparajotes-murcianos.jpg?alt=media&token=52820678-e06b-4d76-bf1a-8aab2dd1bef4', 1),
(29, '', '2 zanahorias grandes\n1 limón\n3 huevos M\n15 g de Stevia\n100 ml de aceite de oliva virgen extra\n125 ml de yogur natural sin azúcar\n220 g de harina integral\n25 ml. de leche entera o bebida vegetal de vuestro gusto (la que mejor le iría es la de almendras)\nUna pizca de sal (3 gramos aprox.)\n1 sobre de levadura química en polvo tipo Royal (12 gramos), también valdría gasificante en polvo (misma cantidad)\nOpcional para decorar: Unos copos de avena o picadillo de frutos secos', 'Primero pelamos y rayamos bien las zanahorias y la reservamos para más adelante.\n\nRayamos la corteza del limón con cuidado de no llegar a la parte blanca y lo reservamos también.\n\nPonemos los huevos y la Stevia en un bol a temperatura ambiente y batimos todo bien durante 5 minutos. Después añadimos el aceite y batimos 15 segundos hasta que esté bien unido. Después añadimos la leche, el yogur y batimos 10 segundos.\n\nTamizamos la harina y la metemos en la mezcla con la levadura química y la pizca de sal. Lo mezclamos todo hasta que quede bien unido y añadimos la ralladura de limón y la zanahoria, batiendo todo bien para que quede cohesionado.\n\n\nHorneado y presentación de las magdalenas\n\nPrecalentamos el horno a 250º C y mientras tanto echamos la masa en los moldes de las magdalenas que habremos colocado en una bandeja de horno. \n\nEspolvoreamos con avena o con trocitos de vuestros frutos secos preferidos (las nueces le van genial). Metemos la bandeja de horno durante 15 minutos en la nevera para que reposen.\n\nUna buena recomendación es meter las magdalenas (con sus capsulas o tulipas de papel) en flaneras metálicas para que tengan una superficie dura donde crecer en el horno y salga el famoso copete al hornear. \nTambién vale la tradicionales bandejas metálicas para hornear magdalenas o muffins.\n\nCon el horno previamente caliente con calor arriba y abajo y sin ventilador, horneamos los muffins a 200º C durante unos 15-16 minutos. Comprobamos que están bien cocidos cuando al pincharlos con un palito este salga limpio.\n\nPasado este tiempo, sacamos las magdalenas y las dejamos reposar unos minutos para que se enfríen. Listas para comer.\n\nEste tipo de magdalenas no llevan azúcar integrado, pero si lo llevan varios de los ingredientes de su preparación. \n\nSi sois diabéticos, lo mejor es tomarlas solo muy de vez en cuando o evitarlas. \nNo deja de ser un dulce o postre, y tiene algo de azúcar (lactosa en la leche, azúcar en las zanahorias y fructosa en el limón). Así que una no hace daño pero tomarlas habitualmente, sí.', 'Magdalenas de zanahoria', 8, 'https://firebasestorage.googleapis.com/v0/b/recipedia-edabe.appspot.com/o/images%2Fmagdalenas.jpg?alt=media&token=54d8b72c-3adb-476a-9cf9-b04b9c0eb368', 1),
(30, 'Nuestra receta fácil que siempre triunfa', '350 g. guisantes\n1 kg. patatas\n450 g. atún en conserva\n600 g. zanahorias\n4 huevos\nSal (al gusto)\nPara la mayonesa: 1 huevo\n250 g. aceite de girasol\n2 cdas. vinagre de Jerez', 'Como base de ingredientes para una ensaladilla tradicional tenemos patatas, zanahorias, guisantes, atún en aceite y huevos. \nPor supuesto, todo ello ligado con mayonesa. A partir de aquí que cada uno haga su propia receta y la adapte a su gusto.\n\nSi empezamos por la mayonesa debemos tener claro que donde esté una mayonesa casera que se retiren todos los botes. \nPreparar una mayonesa en casa es muy sencillo y la diferencia puede marcar la diferencia entre una ensaladilla de rechupete y otra del montón. \n\nA la hora de elegir el aceite a emplear en la mayonesa, sólo comentar que la elaborada con aceite de girasol será mucho más suave y ligera que la que hagamos con aceite de oliva, por esto la primera, en el caso de la ensaladilla, puede resultar más adecuada, aunque para este punto no hay nada escrito.\n\nPor otro lado tenemos el atún o bonito en conserva en aceite de oliva. \nLa calidad del atún es fundamental para conseguir una ensaladilla perfecta. Cuanto más rico sea el atún, más rica será la ensaladilla.\n\nLa cocción de los vegetales merece un trato especial. Debemos tener en cuenta que cada uno necesita un tiempo distinto de cocción. No es lo mismo cocer los guisantes que las patatas, por esto lo ideal es que preparemos cada uno por separado.\n\nDebemos cuidar mucho que estén en su punto. Nada mejor para fastidiar una ensaladilla que tener unas patatas chafadas y aguadas o unos guisantes rotos y abiertos. \nEl punto de cocción es importante. Con estas premisas claras, podremos conseguir una súper tradicional ensaladilla elaborada de forma perfecta. A partir de aquí que cada uno la adapte a su gusto si lo desea.\n\n\nPreparación de la mayonesa\n\nEn el vaso de la batidora añadimos el aceite, el huevo y una pizca de sal. Colocamos el brazo de la batidora apoyado en el fondo y, sin moverlo para nada, comenzamos a batir. Al cabo de unos segundos veremos que la mayonesa comienza a cuajarse. \n\nA partir de este momento podremos mover con tranquilidad el brazo si es necesario.\nAñadimos el vinagre o incluso un chorrito de zumo de limón si lo deseamos, en este momento. \nGuardamos la mahonesa en el frigo hasta que vayamos a utilizarla.\n\n\nPreparación de la ensaladilla rusa y presentación final\n\nCocemos los guisantes en agua ligeramente salada durante 10 minutos. \nEscurrimos y reservamos.\n\nCocemos las zanahorias cortadas en daditos, en agua ligeramente salada durante unos 15-20 minutos.\nCuando estén tiernas apagamos el fuego, escurrimos y reservamos.\n\nCocemos los huevos durante 7-8 minutos. Los enfriamos bajo el grifo con agua fría y dejamos que se templen antes de pelarlos y reservarlos.\n\nPelamos las patatas y las cortamos en dados. Cocemos las patatas en agua salada durante 12-15 minutos. Cuando veamos que están tiernas las escurrimos y reservamos. \n\nDebemos estar pendientes de la cocción para evitar que se nos pasen.\n\nEn un bol añadimos las zanahorias, los guisantes y las patatas cocidas.\n Mezclamos con cuidado para no romper las verduras. Desmenuzamos el atún y lo añadimos. Troceamos los huevos cocidos y los incorporamos también. \n\nSólo nos queda incorporar la mayonesa a la mezcla. \nGuardamos la ensaladilla en el frigo hasta el momento de servirla.', 'Ensaladilla rusa casera', 8, 'https://firebasestorage.googleapis.com/v0/b/recipedia-edabe.appspot.com/o/images%2Fensaladilla.jpg?alt=media&token=e582507e-d59d-40c1-a87c-ff015577b753', 1),
(31, 'De patata, guisantes y tofu', 'Para la hamburguesa vegetariana: 450 g. de patatas (mejor si son especiales para cocer)\n95 de harina fina de maíz\n70 g. de guisantes\n1 cebolla morada\n1 cucharada de semillas de sésamo\n1 cayena\nJengibre en polvo\nComino en polvo\n1 limón\n275 g. de tofu seco\nVinagre de manzana\nAcompañamiento: Lechuga\n1 tomate grande\nPan de Viena\nAceite de oliva virgen extra\nSal', 'Empezamos por la salsa: en el vaso de una batidora echamos el tofu, el zumo de medio limón, una cucharada de vinagre de manzana y dos de aceite de oliva virgen extra. Picamos todo junto hasta tener una salsa uniforme y con la consistencia de la mostaza.\n\nPelamos las patatas y las hervimos unos 20 minutos en agua con una pizca de sal. En otra cazuela cocemos los guisantes. Retiramos del fuego, escurrimos y reservamos para que enfríen.\n\nPelamos y picamos la cebolla en trozos muy pequeños. En una sartén echamos un par de cucharadas de aceite, las semillas de sésamo y la cayena. Lo doramos removiendo y con cuidado para que no se quemen.\n\nCuando están doradas añadimos la cebolla picada, removemos y dejamos que se poche 3 o 4 minutos. Incorporamos los guisantes escurridos, removemos todo junto y dejamos que las verduras se doren. Cuando han enfriado las patatas las echamos en un bol grande y las machacamos con la ayuda de un tenedor.\n\nAñadimos una cucharadita de jengibre y otra de comino, junto con la harina fina de maíz. Removemos bien con una espátula de silicona o con una cuchara de madera. Entonces echamos la cebolla con los guisantes, escurriendo el aceite antes si es necesario, sumamos el zumo de la otra mitad del limón y mezclamos muy bien.\n\nAmasamos con las manos hasta tener una bola de masa que podamos manejar y trocear. Hacemos hamburguesas tomando un trozo de masa y dándole forma con las manos.\n\nEn una sartén con un chorrito de aceite, hacemos a la plancha las hamburguesas, dorándolas primero por un lado y después por el otro.\n\nTostamos el pan en la misma sartén (sin aceite) y montamos: sobre el pan ponemos primero una capa de salsa, después una hoja de lechuga, la hamburguesa, una rodaja de tomate y por último otra capa de salsa. Tapamos con la otra mitad de pan y a la mesa.\n', 'Hamburguesas vegetarianas', 9, 'https://firebasestorage.googleapis.com/v0/b/recipedia-edabe.appspot.com/o/images%2Famborgesas.jpg?alt=media&token=bd0ba743-eaf2-4691-be79-d4b054554272', 0),
(32, 'Receta tradicional gallega\n', 'Un pulpo gallego de 2-2,5 Kg\nSal gorda o en escamas\nPimentón de la Vera picante y dulce\nAceite de oliva virgen extra', 'Para ello no podemos dejar de leer cómo cocer el pulpo para que no esté muy blando ni muy duro. Un poco duro nada más para que no tengas dificultades a la hora de hincarle el diente.\n\nEl caldo de la cocción podéis utilizarlo para cocer patatas y acompañar el pulpo á feira. Podemos reservarlo para un arroz, un guiso o también para volver a cocer pulpo en él. El pulpo tendré todavía más sabor si lo cocináis en este caldo.\n\n\nEmplatado del pulpo á feira\n\nQuitamos un tentáculo del pulpo, lo agarramos por la parte central y vamos cortando en rodajas de aprox. 1 cm. de grosor. Colocamos uniformemente en el plato. Añadimos también un poco de cabeza. Si preferís no utilizarla, es ideal para luego hacer unas croquetas o unas empanadillas.\n\nSalamos con sal gorda o sal en escamas, espolvoreamos con una mezcla de pimentón picante/dulce. Finalmente rociamos con abundante aceite de oliva virgen extra.\n\nEsta mezcla de pimentón la he probado hace poco en Ourense. La verdad es que le da un toque especial. De todas maneras, usad el que más os guste, ya sea picante o dulce. Un puñado de palillos en el centro del plato. Un buen pan de pueblo para mojar en el aceite, y ya está listo para disfrutar del auténtico Pulpo á feira. Como en las Ferias de Galicia.\n', 'Pulpo á feira', 9, 'https://firebasestorage.googleapis.com/v0/b/recipedia-edabe.appspot.com/o/images%2Fpulpo_a_feira-768x527.jpg?alt=media&token=a01429c0-c969-4424-b9fa-8df1975cb372', 0),
(33, '', '15 langostinos cocidos (unos 200 g.)\n300 g. de rape o el pescado blanco que más os guste\n1 pata de pulpo cocido Gallego Pereira (Galicia Calidade) 150 g.\n4 huevos camperos\n1 buey de mar o una centolla\n1 pimiento verde\n1 pimiento rojo\n1 cebolla mediana\nPara la vinagreta: 80 ml. de aceite de oliva virgen extra y 40 ml. de vinagre de Jerez\nSal y pimienta negra recién molida (al gusto de cada casa)\nOpcional: Cebollino fresco', 'Ponemos a calentar agua en una cazuela grande y cuando esté hirviendo añadimos los langostinos. Cocemos durante unos 4 minutos. Retiramos los langostinos.\n\nEn la misma agua de los langostinos cocemos el rape en gruesas rodajas de unos 3 o 4 cm de grosor. Cocemos en agua con sal entre 7 y 8 minutos (cuenta desde que empiece a hervir), compruebas pinchando cerca de la espina central si está en su punto, cuida de no pasarte. Retiramos y reservamos. Si son rapitos (rapes pequeños) en 5 minutos estarán listos. Desmenuzamos el rape en trocitos pequeños y los echamos al bol.\n\nEl pulpo ya lo hemos comprado cocido. Viene en una cazuela perfecto para servir, en este caso sólo tenemos que partirlo a la mitad y añadir al bol. Si compráis el pulpo fresco, podéis ver cómo cocer pulpo en este post.\n\nEl buey de mar o la centolla se añaden enteros una vez cocidos y preparados. Podéis ver en este artículo como hacerlo. Cómo cocer centollas y cómo abrir un buey de mar.\n\nMientras en otro fuego vamos a cocer los huevos. Los cubrimos con agua fría y cocemos 10 minutos a partir de la ebullición. No debemos cocerlos más tiempo ya que se forma un halo oscuro de color verdoso alrededor de la yema desagradable a la vista. Con estas indicaciones os tienen que quedar perfectos.\n\nPelamos los langostinos, retirando el hilo negro y troceamos en pedacitos de 1/2 cm. aproximadamente. Añadimos al bol más grande que tengamos en casa. Quitamos la cáscara de los huevos y separamos la clara de la yema. Picamos las claras y las yemas (excepto una que vamos a emplear para la vinagreta). Añadimos todo al bol.\n\nCortamos la cebolla y los pimientos  en cuadraditos (brunoise) pequeñitos y echamos al bol.\n\n\nPreparación de la vinagreta y presentación del salpicón\n\nLas proporciones irán en función del gusto de cada uno, el tipo de aceite, vinagre e ingredientes utilizados pueden cambiar la intensidad del sabor. En un bote de cristal añadimos una pizca de sal y la pimienta negra recién molida. Introducimos el aceite de oliva virgen extra y el vinagre de Jerez. Removemos enérgicamente hasta que quede ligado.\n\nAñadimos la yema de huevo anteriormente desmenuzadas. Agitamos el bote (cerrado) hasta que esté bien mezclado, casi enmulsionado. Reservamos. Por último, añadimos la vinagreta al bol y mezclamos muy bien con unas cucharas. Debe quedar todo perfectamente integrado, para que se junten bien los sabores.\n\nVolcamos en una fuente o en platos individuales como veis en el vídeo. Podemos decorar con un poco de cebollino fresco muy picadito.', 'Salpicón de marisco', 9, 'https://firebasestorage.googleapis.com/v0/b/recipedia-edabe.appspot.com/o/images%2Fsalpicon_marisco-768x527.jpg?alt=media&token=ff8352ad-e492-429f-b3d2-6b62737eb689', 0),
(34, '', '150 g de soja texturizada fina\n150 g de caldo de verdura\n3 dientes de ajo\n1 cebolla\n50 g de tomate concentrado\n200 g de tomate troceado en conserva\n1 cucharada de hierbas provenzales\n1 cucharada de ajo en polvo\nSal y pimienta negra recién molida (al gusto de casa)\nAceite de oliva virgen extra\n12 láminas de pasta para canelones\n25 g de mantequilla\n25 g de harina de trigo\n400 ml de leche\n50 g de queso rallado fundente, tipo Gouda o Emmental', 'Hidratamos la soja poniéndola en remojo en el caldo de verduras durante un mínimo de 10 minutos, removiendo de vez en cuando para que se hidrate por igual. No pasa nada sí está más tiempo.\n\nMientras tanto pelamos y picamos los dientes de ajo y la cebolla. Calentamos un poco de aceite de oliva virgen extra en una cacerola y pochamos a fuego suave. Cuando la cebolla esté transparente añadimos el tomate troceado, el concentrado de tomate, las hierbas provenzales, el ajo en polvo, sal y pimienta negra molida al gusto.\n\nCocemos a fuego medio durante 15 minutos, lo suficiente para que todos los ingredientes y sabores se amalgamen, y trituramos en la misma cacerola con una batidora de mano. A continuación añadimos la soja texturizada hidratada y cocemos de nuevo a fuego medio hasta que la salsa haya tomado cuerpo. Aproximadamente 20 minutos.\n\nDejamos enfriar completamente la salsa para que sea más manejable a la hora de rellenar los canelones.\n\nMientras tanto preparamos una salsa bechamel con la que cubrir los canelones. Para ello calentamos la mantequilla en una sartén y, cuando esté fundida, añadimos la harina.\n\nRemovemos durante uno o dos minutos para formar una roux y dorar ligeramente la harina. Con ello se pierde el sabor a crudo. Añadimos la leche poco a poco, removiendo constantemente para que no se formen grumos o desleír los que no podamos evitar. Podemos usar unas varillas y asegurarnos que la bechamel queda bien fina.\n\nSalpimentamos al gusto y cocemos durante 15-20 minutos a fuego suave. Retiramos del fuego y reservamos.\n\nA continuación, cocemos las láminas de pasta para canelones, usando una olla grande con abundante agua para que no se peguen unas a otras. Seguimos las instrucciones del paquete, restando un par de minutos del tiempo indicado porque la pasta terminará de hacerse en el horno.\n\nRetiramos las láminas de canelones y las sumergimos en un recipiente con agua helada para cortar la cocción. Una vez frías, escurrimos y colocamos sobre un trapo de cocina limpio. Secamos ligeramente.\n\nColocamos una cucharada del relleno de soja texturizada en el centro de cada canelón, a lo largo de izquierda a derecha. Cerramos la masa doblando los extremos sobre el relleno. Engrasamos cuatro fuentes individuales para horno y cubrimos la base con un par de cucharadas de salsa bechamel. Disponemos tres canelones en cada fuente, con el cierre de la pasta en la parte de abajo.\n\nPrecalentamos el horno a 200º C. Napamos los canelones con la salsa bechamel y cubrimos con queso rallado, generosamente. Introducimos en el horno, precalentado a 200º C (con calor arriba y abajo) y cocemos 15 minutos a unos 200º C. Si fuera necesario, cambiamos el horno a la función de gratinar y doramos la superficie durante 5 minutos más.\n\nRetiramos del horno y dejamos atemperar un par de minutos antes de servir.', 'Canelones vegetarianos', 9, '/images/recipe/default-recipe.png', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recipe_book`
--

CREATE TABLE `recipe_book` (
  `id` bigint(20) NOT NULL,
  `author` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `deletable` bit(1) NOT NULL,
  `description` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `privacy` bit(1) NOT NULL,
  `title` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `recipe_book`
--

INSERT INTO `recipe_book` (`id`, `author`, `deletable`, `description`, `privacy`, `title`, `owner_id`) VALUES
(1, 'Test12345', b'0', 'This is your default recipe book', b'0', 'My Recipes', 1),
(7, 'Test12345', b'1', 'Recetas de rechupete', b'1', 'Recetas privadas', 1),
(8, 'Hugo12345', b'0', 'This is your default recipe book', b'0', 'My Recipes', 2),
(9, 'DemoUser', b'0', 'This is your default recipe book', b'0', 'My Recipes', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(0, 'ROLE_USER'),
(1, 'ROLE_ADMIN');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(120) COLLATE utf8_spanish_ci DEFAULT NULL,
  `username` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `username`) VALUES
(1, 'Test12345@gmail.com', '$2a$10$KMaXKMSGACERl9Imq/loVegJEESfi4B3O6Qo8YlHbrpTUo1yGJCbW', 'Test12345'),
(2, 'solo1punto@gmail.com', '$2a$10$lND6QCeza9wCVUSEMaH2WeO8VTETtbU9F5qAG5goGdrZvIDsxBvqa', 'Hugo12345'),
(3, 'Email@gmail.com', '$2a$10$w6Hd2lpQUbyHFwwRd150FuzBw2rzkrQbpxmbnx3lCeNsLCNJ1j6UK', 'DemoUser');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_role`
--

CREATE TABLE `user_role` (
  `user_id` bigint(20) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `user_role`
--

INSERT INTO `user_role` (`user_id`, `role_id`) VALUES
(1, 0),
(2, 0),
(3, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_saved_recipes`
--

CREATE TABLE `user_saved_recipes` (
  `user_id` bigint(20) NOT NULL,
  `saved_recipes` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `user_saved_recipes`
--

INSERT INTO `user_saved_recipes` (`user_id`, `saved_recipes`) VALUES
(1, 23),
(2, 20),
(2, 16),
(3, 28),
(3, 27),
(3, 26),
(3, 20);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK7arb29rsgjc4vgu6sfahp6r4e` (`recipe_book_id`);

--
-- Indices de la tabla `recipe_book`
--
ALTER TABLE `recipe_book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKktjk6xl8g0ejp2i1m9utslg5b` (`owner_id`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKsb8bbouer5wak8vyiiy4pf2bx` (`username`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`);

--
-- Indices de la tabla `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKa68196081fvovjhkek5m97n3y` (`role_id`);

--
-- Indices de la tabla `user_saved_recipes`
--
ALTER TABLE `user_saved_recipes`
  ADD KEY `FKovn1bo53sqcyt0by79h2bb4i` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `recipe_book`
--
ALTER TABLE `recipe_book`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `FK7arb29rsgjc4vgu6sfahp6r4e` FOREIGN KEY (`recipe_book_id`) REFERENCES `recipe_book` (`id`);

--
-- Filtros para la tabla `recipe_book`
--
ALTER TABLE `recipe_book`
  ADD CONSTRAINT `FKktjk6xl8g0ejp2i1m9utslg5b` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKa68196081fvovjhkek5m97n3y` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Filtros para la tabla `user_saved_recipes`
--
ALTER TABLE `user_saved_recipes`
  ADD CONSTRAINT `FKovn1bo53sqcyt0by79h2bb4i` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
