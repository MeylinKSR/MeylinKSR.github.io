/*
  CASO DE ESTUDIO BI · Ventas de vinos
  ------------------------------------------------------------
  Contenido del caso de estudio. La estructura (BI_CASES[slug]) sirve para
  futuros casos de Business Intelligence: basta con añadir otra entrada con
  las mismas claves y poner bi: true en el proyecto de projects.js.

  Cifras recalculadas con Facturas.xlsx y Maestras.xlsx (162.083 filas).
  Nombres de vendedores y supervisores anonimizados; URLs de fotos eliminadas.
*/
window.BI_CASES = window.BI_CASES || {};
(function () {
  var S = {"raw": [["REGISTRO DE VENTAS ", null, null, null, null, null, null, null, null, null, null], ["Vinos Company S.A.", null, null, null, null, null, null, null, null, null, null], [null, "Número", "Fecha", "Código Sector", "Código País", "Código Vendedor", "Código Vino", "Cantidad", "Subtotal", "IVA", "Total"], [null, "FV00025", "01/01/2020", 4, 1, 9, 3, 900, 2160, 453.6, 2613.6], [null, "FV00052", "01/01/2020", 2, 4, 12, 3, 725, 1740, 365.4, 2105.4], [null, "FV00022", "01/01/2020", 2, 1, 5, 2, 800, 2480, 520.8, 3000.8], [null, "FV00061", "01/01/2020", 3, 5, 3, 4, 90, 288, 60.48, 348.48], [null, "FV00009", "01/01/2020", 2, 1, 17, 8, 740, 2664, 559.44, 3223.44], [null, "FV00062", "01/01/2020", 1, 5, 22, 3, 900, 2160, 453.6, 2613.6], [null, "FV00051", "01/01/2020", 4, 4, 25, 7, 825, 3217.5, 675.67, 3893.18], [null, "FV00026", "01/01/2020", 2, 1, 35, 1, 115, 253.0, 53.13, 306.13], [null, "FV00004", "01/01/2020", 5, 1, 33, 4, 125, 400, 84, 484], [null, "FV00007", "01/01/2020", 2, 1, 38, 5, 345, 1242, 260.82, 1502.82]], "factura": [["FV05931", "12/04/2020", 1, 4, 23, 1, 480, 1056.0, 221.76, 1277.76], ["FV10585", "29/06/2020", 2, 2, 35, 1, 300, 660.0, 138.6, 798.6], ["FV11296", "11/07/2020", 2, 2, 35, 7, 450, 1755.0, 368.55, 2123.55], ["FV12438", "30/07/2020", 4, 5, 14, 3, 500, 1200.0, 252.0, 1452.0], ["FV15081", "13/09/2020", 5, 1, 5, 6, 400, 1360.0, 285.6, 1645.6], ["FV25736", "18/06/2021", 1, 5, 17, 3, 400, 960.0, 201.6, 1161.6], ["FV30148", "01/09/2021", 4, 1, 20, 7, 600, 2340.0, 491.4, 2831.4], ["FV30217", "02/09/2021", 2, 2, 14, 4, 200, 640.0, 134.4, 774.4], ["FV30901", "14/09/2021", 4, 4, 10, 5, 180, 648.0, 136.08, 784.08], ["FV34609", "17/11/2021", 1, 2, 14, 8, 500, 1800.0, 378.0, 2178.0], ["FV51147", "11/08/2022", 2, 4, 35, 6, 435, 1479.0, 310.59, 1789.59], ["FV52559", "24/08/2022", 4, 4, 28, 8, 150, 540.0, 113.4, 653.4], ["FV55028", "16/09/2022", 2, 3, 27, 2, 235, 728.5, 152.98, 881.49], ["FV60388", "05/11/2022", 3, 1, 34, 6, 400, 1360.0, 285.6, 1645.6], ["FV64200", "11/12/2022", 1, 3, 35, 4, 765, 2448.0, 514.08, 2962.08], ["FV79462", "28/02/2023", 2, 4, 11, 5, 240, 864.0, 181.44, 1045.44], ["FV80905", "07/03/2023", 1, 1, 32, 3, 100, 240.0, 50.4, 290.4], ["FV91240", "23/04/2023", 5, 5, 3, 3, 400, 960.0, 201.6, 1161.6], ["FV100253", "11/06/2023", 2, 1, 16, 2, 700, 2170.0, 455.7, 2625.7], ["FV116586", "09/11/2023", 4, 1, 9, 3, 900, 2160.0, 453.6, 2613.6], ["FV131341", "24/03/2024", 4, 5, 36, 6, 300, 1020.0, 214.2, 1234.2], ["FV134218", "19/04/2024", 3, 3, 37, 6, 350, 1190.0, 249.9, 1439.9], ["FV140307", "15/06/2024", 3, 4, 22, 4, 945, 3024.0, 635.04, 3659.04], ["FV148931", "03/09/2024", 3, 4, 6, 4, 90, 288.0, 60.48, 348.48], ["FV160555", "17/12/2024", 4, 5, 15, 2, 400, 1240.0, 260.4, 1500.4]], "producto": [[1, "Porrera Vi", 1.49, 2.2], [2, "Alabaster", 2.02, 3.1], [3, "Aalto PS", 1.52, 2.4], [4, "Doix Costers", 2.69, 3.2], [5, "Gran Reserva 890", 2.66, 3.6], [6, "Calvario", 2.79, 3.4], [7, "Capellanes", 2.13, 3.9], [8, "Gran Muralles", 1.94, 3.6]], "pais": [[1, "España"], [2, "Portugal"], [3, "Alemania"], [4, "Francia"], [5, "Italia"], [6, "Reino Unido"]], "sector": [[1, "Supermercados"], [2, "Bares"], [3, "Tiendas online"], [4, "Restaurantes"], [5, "Hoteles"]], "vendedor": [[1, "Vendedor 01", 6], [2, "Vendedor 02", 6], [3, "Vendedor 03", 2], [4, "Vendedor 04", 1], [5, "Vendedor 05", 4], [6, "Vendedor 06", 3], [7, "Vendedor 07", 5], [8, "Vendedor 08", 6], [9, "Vendedor 09", 3], [10, "Vendedor 10", 7], [11, "Vendedor 11", 6], [12, "Vendedor 12", 5], [13, "Vendedor 13", 4], [14, "Vendedor 14", 2], [15, "Vendedor 15", 4], [16, "Vendedor 16", 4], [17, "Vendedor 17", 1], [18, "Vendedor 18", 2], [19, "Vendedor 19", 2], [20, "Vendedor 20", 4], [21, "Vendedor 21", 6], [22, "Vendedor 22", 6], [23, "Vendedor 23", 3], [24, "Vendedor 24", 2], [25, "Vendedor 25", 2], [26, "Vendedor 26", 5], [27, "Vendedor 27", 6], [28, "Vendedor 28", 4], [29, "Vendedor 29", 4], [30, "Vendedor 30", 1], [31, "Vendedor 31", 6], [32, "Vendedor 32", 2], [33, "Vendedor 33", 4], [34, "Vendedor 34", 6], [35, "Vendedor 35", 1], [36, "Vendedor 36", 3], [37, "Vendedor 37", 6], [38, "Vendedor 38", 2]], "supervisor": [[1, "Supervisor 1", "(URL eliminada)"], [2, "Supervisor 2", "(URL eliminada)"], [3, "Supervisor 3", "(URL eliminada)"], [4, "Supervisor 4", "(URL eliminada)"], [5, "Supervisor 5", "(URL eliminada)"], [6, "Supervisor 6", "(URL eliminada)"], [7, "Supervisor 7", "(URL eliminada)"]], "years": [[2020, 33.73, 21578, 8.78], [2021, 24.71, 15709, 6.41], [2022, 45.68, 29014, 11.9], [2023, 88.67, 55967, 23.08], [2024, 62.63, 39815, 16.32]], "paises": [["España", 97.64], ["Alemania", 47.68], ["Francia", 41.17], ["Portugal", 33.23], ["Italia", 32.13], ["Reino Unido", 3.56]], "sectores": [["Bares", 73.65], ["Restaurantes", 72.58], ["Supermercados", 59.48], ["Hoteles", 26.94], ["Tiendas online", 22.77]], "vinos": [["Porrera Vi", 21.7, 8.15, 5.79, 32.27], ["Alabaster", 32.48, 8.66, 9.35, 34.84], ["Aalto PS", 23.69, 8.16, 7.18, 36.67], ["Doix Costers", 34.68, 8.96, 4.57, 15.94], ["Gran Reserva 890", 35.77, 8.21, 7.72, 26.11], ["Calvario", 33.0, 8.02, 4.89, 17.94], ["Capellanes", 38.82, 8.23, 14.56, 45.38], ["Gran Muralles", 35.28, 8.1, 13.45, 46.11]], "caida": {"pais": [-36.3, -28.0], "sector": [-31.1, -25.8], "vino": [-31.5, -26.5]}, "tot": {"T": 255.43, "U": 66.49, "I": 211.1, "C": 143.59, "B": 67.51, "n": 162083}};

  window.BI_CASES["ventas-vinos"] = {
    eyebrow: "Caso de estudio · Business Intelligence",
    title: "Análisis del rendimiento comercial de una empresa de vinos",
    sub: "Business Intelligence con Power BI: de los datos originales al análisis comercial.",
    context: "Proyecto académico de la asignatura Inteligencia y Análisis de Negocio, en el Grado en Ciencia, Gestión e Ingeniería de Servicios (Universidad Rey Juan Carlos).",
    ledger: [
      ["162.083", "registros de venta, 2020–2024"],
      ["2 → 6", "Excel y consultas en Power Query"],
      ["8 · 6", "tablas y relaciones en el modelo"],
      ["9", "medidas DAX"],
      ["6 + 1", "páginas y un tooltip"],
    ],
    phases: [
      ["biReto", "Reto"], ["biDatos", "Datos"], ["biEtl", "ETL"], ["biModelo", "Modelo"],
      ["biDax", "DAX"], ["biInforme", "Informe"], ["biHallazgos", "Análisis"], ["biMejoras", "Mejoras"],
    ],

    /* 1 · Reto */
    reto: {
      given: ["Dos Excel con los datos originales.", "Una imagen del informe que había que reproducir."],
      missing: "No había un enunciado que explicara cómo transformar los datos, cómo montar el modelo ni qué medidas crear. Tenía que deducirlo a partir del resultado.",
      did: [
        "Explorar las dos fuentes y entender qué contiene cada hoja.",
        "Preparar las seis consultas en Power Query.",
        "Construir el modelo: tabla de hechos, dimensiones y relaciones.",
        "Crear la tabla Calendario y las nueve medidas DAX.",
        "Montar las visualizaciones, los segmentadores, la navegación entre páginas y el tooltip.",
      ],
      note: "El diseño visual del informe era la referencia de la asignatura, no es mío. Mi parte fue construir todo lo que hay debajo para que funcionara igual.",
    },

    /* 2 · Fuentes */
    files: [
      {
        name: "Facturas.xlsx",
        sheets: [
          {
            name: "Factura", kind: "Transaccional", total: S.tot.n,
            purpose: "Cada fila es una venta: qué vino, cuántas unidades, en qué sector y país, qué vendedor y cuándo. Es la tabla que crece con el tiempo.",
            cols: ["Número", "Fecha", "Código Sector", "Código País", "Código Vendedor", "Código Vino", "Cantidad", "Subtotal", "IVA", "Total"],
            rows: S.factura, raw: S.raw,
            sampleNote: "Muestra de 25 filas: 5 al azar de cada año.",
          },
        ],
      },
      {
        name: "Maestras.xlsx",
        sheets: [
          { name: "País", kind: "Descriptiva", total: 6, purpose: "Traduce cada código de país a su nombre.", cols: ["Código País", "País"], rows: S.pais },
          { name: "Vendedor", kind: "Descriptiva", total: 38, purpose: "El equipo comercial. Cada vendedor depende de un supervisor.", cols: ["Código Vendedor", "Vendedor", "Código Supervisor"], rows: S.vendedor, anon: true },
          { name: "Supervisor", kind: "Descriptiva", total: 7, purpose: "Los responsables de cada equipo. La foto se usa en un segmentador del informe.", cols: ["Código Supervisor", "Supervisor", "Foto Supervisor"], rows: S.supervisor, anon: true },
          { name: "Producto", kind: "Descriptiva", total: 8, purpose: "Los ocho vinos, con su coste y su precio de venta por unidad. Es la base de Ingresos y Costes.", cols: ["Código Vino", "Vino", "Coste", "PrecioVenta"], rows: S.producto },
          { name: "Sector", kind: "Descriptiva", total: 5, purpose: "Los canales de venta: supermercados, bares, tiendas online, restaurantes y hoteles.", cols: ["Código Sector", "Sector"], rows: S.sector },
        ],
      },
    ],
    checks: [
      "Ningún número de factura se repite y no hay celdas vacías en las 162.083 filas.",
      "El IVA es el 21 % del subtotal en todas las ventas.",
      "El subtotal coincide siempre con cantidad × precio de venta del vino.",
    ],

    /* 3 · ETL */
    etl: {
      queries: [
        { name: "Factura", file: "Facturas.xlsx", shot: "assets/img/bi/pq-factura.webp",
          steps: [
            { n: "Origen", d: "Conexión con Facturas.xlsx.", v: { nav: ["Factura"] } },
            { n: "Navegación", d: "Selección de la hoja Factura. Power Query la lee tal cual: con el título del informe arriba y una columna vacía a la izquierda.", v: { raw: true } },
            { n: "Tipo de columna cambiado", d: "Power Query asigna unos tipos iniciales a las columnas, que todavía no tienen nombre.", v: { raw: true } },
            { n: "Columnas quitadas", d: "Elimino la primera columna, que está vacía.", v: { raw: true, dropFirst: true } },
            { n: "Filas superiores quitadas", d: "Quito las dos filas del título («REGISTRO DE VENTAS» y el nombre de la empresa), que no son ventas.", v: { raw: true, dropFirst: true, skip: 2 } },
            { n: "Encabezados promovidos", d: "La primera fila pasa a ser el nombre de las columnas.", v: { raw: true, dropFirst: true, skip: 2, promote: true } },
            { n: "Tipo de columna cambiado 1", d: "Tipos definitivos: texto para el número de factura, fecha, enteros para los códigos y la cantidad, decimales para los importes.", v: { raw: true, dropFirst: true, skip: 2, promote: true, types: ["ABC", "fecha", "123", "123", "123", "123", "123", "1.2", "1.2", "1.2"] } },
          ] },
        { name: "Producto", file: "Maestras.xlsx", sheet: "Producto", shot: "assets/img/bi/pq-producto.webp", types: ["ABC", "ABC", "1.2", "1.2"] },
        { name: "País", file: "Maestras.xlsx", sheet: "País", shot: "assets/img/bi/pq-pais.webp", types: ["ABC", "ABC"] },
        { name: "Sector", file: "Maestras.xlsx", sheet: "Sector", shot: "assets/img/bi/pq-sector.webp", types: ["ABC", "ABC"] },
        { name: "Supervisor", file: "Maestras.xlsx", sheet: "Supervisor", shot: "assets/img/bi/pq-supervisor.webp", types: ["ABC", "ABC", "ABC"], blurred: true },
        { name: "Vendedor", file: "Maestras.xlsx", sheet: "Vendedor", shot: "assets/img/bi/pq-vendedor.webp", types: ["ABC", "ABC", "ABC"], blurred: true },
      ],
      masterSteps: function (q) {
        return [
          { n: "Origen", d: "Conexión con Maestras.xlsx.", v: { nav: ["País", "Vendedor", "Supervisor", "Producto", "Sector"], pick: q.sheet } },
          { n: q.sheet + "_Sheet", d: "Selección de la hoja " + q.sheet + ". Los nombres de las columnas llegan como la primera fila de datos.", v: { master: true } },
          { n: "Encabezados promovidos", d: "La primera fila pasa a ser el nombre de las columnas.", v: { master: true, promote: true } },
          { n: "Tipo cambiado", d: "Tipos definitivos de la consulta.", v: { master: true, promote: true, types: q.types } },
        ];
      },
      load: "Las seis consultas se cargan al modelo. Calendario y Medidas no vienen de Power Query: las creé después, ya en Power BI.",
      pending: "En Factura los códigos son números enteros y en las tablas maestras son texto. Las relaciones funcionan en el modelo final, pero no he podido comprobar en qué tipo quedaron las columnas dentro del modelo, así que lo dejo como revisión pendiente.",
    },

    /* 4 · Modelo (posiciones en un lienzo de 960 × 600) */
    model: {
      shot: "assets/img/bi/modelo.webp",
      tables: [
        { id: "Factura", kind: "hechos", x: 370, y: 205, w: 220,
          d: "La tabla de hechos: una fila por venta. Recibe el filtro de todas las dimensiones.",
          f: [["Número"], ["Fecha", "fk", "oculta en la vista de informe"], ["Código Sector", "fk"], ["Código País", "fk"], ["Código Vendedor", "fk"], ["Código Vino", "fk"], ["Cantidad"], ["Subtotal"], ["IVA"], ["Total"], ["Día de la semana", "", "columna calculada en el modelo"], ["Nombre del día", "", "columna calculada en el modelo"]] },
        { id: "Producto", kind: "dim", x: 395, y: 18, w: 170,
          d: "Los vinos, con su coste y su precio. Además de filtrar las ventas por vino, Ingresos y Costes leen de aquí el precio y el coste de cada unidad con RELATED.",
          f: [["Código Vino", "pk"], ["Vino"], ["Coste"], ["PrecioVenta"]] },
        { id: "País", kind: "dim", x: 60, y: 40, w: 170, d: "Segmentación geográfica: seis países. Alimenta el mapa y el embudo de Facturación regional.", f: [["Código País", "pk"], ["País"]] },
        { id: "Sector", kind: "dim", x: 730, y: 40, w: 170, d: "Segmentación por canal de venta: cinco sectores.", f: [["Código Sector", "pk"], ["Sector"]] },
        { id: "Vendedor", kind: "dim", x: 60, y: 250, w: 170, d: "El equipo comercial. Filtra Factura y, a la vez, recibe el filtro de Supervisor.", f: [["Código Vendedor", "pk"], ["Vendedor"], ["Código Supervisor", "fk"]] },
        { id: "Supervisor", kind: "dim", x: 60, y: 460, w: 170, d: "No toca Factura directamente: filtra a Vendedor y, a través de él, llega a las ventas. Es la parte en copo de nieve del modelo.", f: [["Código Supervisor", "pk"], ["Supervisor"], ["Foto Supervisor"]] },
        { id: "Calendario", kind: "cal", x: 730, y: 250, w: 170, d: "Tabla de fechas creada con DAX. Permite agrupar por periodos y comparar con el año anterior.", f: [["Date", "pk"]] },
        { id: "Medidas", kind: "med", x: 730, y: 450, w: 170, d: "Una tabla sin datos que solo sirve para tener las nueve medidas juntas. No tiene relaciones: las medidas se calculan sobre las demás tablas.", f: [["Beneficios"], ["Cantidad"], ["Costes"], ["Facturación"], ["Facturación Total"], ["Ingresos"], ["KPI"], ["Periodo Anterior"], ["Unidades Vendidas"]] },
      ],
      rels: [
        { from: "País", to: "Factura", key: "Código País" },
        { from: "Producto", to: "Factura", key: "Código Vino" },
        { from: "Sector", to: "Factura", key: "Código Sector" },
        { from: "Vendedor", to: "Factura", key: "Código Vendedor" },
        { from: "Calendario", to: "Factura", key: "Date → Fecha" },
        { from: "Supervisor", to: "Vendedor", key: "Código Supervisor" },
      ],
      summary: "Es un modelo en estrella con una extensión en copo de nieve: Supervisor no se relaciona con Factura, sino con Vendedor. Las seis relaciones son de uno a varios y filtran en una sola dirección, de la dimensión a los hechos.",
    },

    /* 5 · DAX (fórmulas originales, sin cambios) */
    dax: {
      groups: ["Ventas", "Rentabilidad", "Indicadores relativos", "Inteligencia temporal"],
      measures: [
        { n: "Facturación", g: "Ventas", f: "Facturación = SUM (Factura[Total])",
          plain: "Suma el total de las facturas que quedan después de aplicar los filtros.",
          why: "Es el importe facturado, IVA incluido. Por eso no coincide con Ingresos.",
          val: "255,43 M sin filtros", used: "Tarjetas de casi todas las páginas, la línea temporal, el embudo por país, la dispersión de vinos y el tooltip." },
        { n: "Cantidad", g: "Ventas", f: "Cantidad = SUM(Factura[Cantidad])",
          plain: "Suma las unidades vendidas.", why: "Es la base de Unidades Vendidas.", val: "66,49 M unidades sin filtros" },
        { n: "Unidades Vendidas", g: "Ventas", f: "Unidades Vendidas = [Cantidad]",
          plain: "Reutiliza Cantidad con un nombre más claro para quien lee el informe.", why: "Separa el cálculo de cómo se presenta.", val: "66,49 M unidades sin filtros", used: "Tarjetas, matrices y la dispersión de vinos." },
        { n: "Ingresos", g: "Rentabilidad", star: true, f: "Ingresos = SUMX(Factura, Factura[Cantidad]*RELATED(Producto[PrecioVenta]))",
          plain: "Recorre las ventas una a una, multiplica las unidades por el precio de venta del vino y suma el resultado.",
          why: "SUMX trabaja fila a fila y RELATED trae el precio desde Producto gracias a la relación. Comprobé con los Excel que coincide con la suma de Subtotal: la diferencia con Facturación es el IVA.",
          val: "211,10 M sin filtros" },
        { n: "Costes", g: "Rentabilidad", star: true, f: "Costes = SUMX(Factura, Factura[Cantidad]*RELATED(Producto[Coste]))",
          plain: "Igual que Ingresos, pero con el coste unitario del vino.", why: "Sin esta medida no se podría calcular el beneficio por vino, país o sector.", val: "143,59 M sin filtros" },
        { n: "Beneficios", g: "Rentabilidad", f: "Beneficios = [Ingresos]-[Costes]",
          plain: "Resta los costes a los ingresos.", why: "Reutiliza dos medidas en vez de repetir sus fórmulas. Es el margen sobre el coste del producto, no el beneficio neto de la empresa: no incluye otros gastos.", val: "67,51 M sin filtros" },
        { n: "Facturación Total", g: "Indicadores relativos", star: true, f: "Facturación Total = SUMX(ALL(Factura), [Facturación])",
          plain: "Busca una facturación de referencia: ALL quita los filtros de la tabla Factura y SUMX suma la facturación fila a fila.",
          why: "Sirve de denominador para el KPI. En «Mejoras» explico qué comprobaría de su comportamiento con filtros.", val: "255,43 M sin filtros" },
        { n: "KPI", g: "Indicadores relativos", star: true, f: "KPI = [Facturación]/[Facturación Total]*100",
          plain: "Qué parte de la facturación de referencia representa lo que está seleccionado, en porcentaje.", why: "Da contexto: no es lo mismo vender 10 M si el total es 20 M que si es 200 M.", val: "100 sin filtros", used: "El medidor de la página Análisis de ventas." },
        { n: "Periodo Anterior", g: "Inteligencia temporal", star: true, f: "Periodo Anterior = CALCULATE([Facturación], SAMEPERIODLASTYEAR(Calendario[Date]))",
          plain: "Calcula la facturación del mismo periodo, pero un año antes.",
          why: "CALCULATE cambia el filtro de fechas y SAMEPERIODLASTYEAR lo desplaza un año. Necesita la tabla Calendario para funcionar.",
          val: "88,67 M si se mira 2024 (la facturación de 2023)", used: "El gráfico de columnas y línea de Comparativa interanual." },
      ],
      calendar: {
        f: "Calendario = CALENDARAUTO()",
        d: "No es una medida: es una tabla calculada. CALENDARAUTO busca las fechas del modelo y crea una fila por día, completando los años enteros.",
        facts: [["1.827", "días, del 1 de enero de 2020 al 31 de diciembre de 2024"], ["1 → N", "relación con Factura por la fecha"]],
        why: "Las funciones de inteligencia temporal como SAMEPERIODLASTYEAR necesitan una tabla de fechas continua. Sin Calendario no habría comparativa interanual.",
      },
    },

    /* 6 · Informe (páginas comprobadas en el PBIX) */
    report: {
      pages: [
        { n: "Inicio", d: "Portada con el navegador de páginas y una tarjeta con la facturación y las unidades vendidas." },
        { n: "Análisis de ventas", d: "La página más completa: segmentadores de país, sector, vendedor, vino, rango de precio y supervisor (con foto), una matriz por fecha y día de la semana, la evolución de la facturación y un medidor con el KPI." },
        { n: "Comparativa interanual", d: "Columnas con la facturación y una línea con el Periodo Anterior, filtrables por sector, país y vino." },
        { n: "Facturación regional", d: "Un mapa por países, un embudo con la facturación de cada país y un segmentador para elegir país." },
        { n: "Rendimiento de vinos", d: "Un gráfico de dispersión que cruza facturación y unidades vendidas de cada vino, filtrable por país." },
        { n: "Detalle de ventas", d: "Una matriz por fecha y día, barras con la facturación por vino y segmentadores de país y supervisor." },
        { n: "Detalle por vino", tip: true, d: "Página auxiliar de tipo tooltip (320 × 240 px): un gráfico circular con el reparto de la facturación por vino que aparece al pasar por encima de otros gráficos." },
      ],
    },

    /* 7 · Análisis posterior (no formaba parte del ejercicio) */
    findings: {
      totals: [["255,43 M", "facturación con IVA"], ["211,10 M", "ingresos (medida DAX)"], ["67,51 M", "beneficios (medida DAX)"], ["31,98 %", "margen sobre ingresos"]],
      years: S.years, paises: S.paises, sectores: S.sectores, vinos: S.vinos, caida: S.caida,
      items: [
        { id: "y", h: "2023 fue el mejor año, y 2024 cayó un 29,4 %",
          obs: "La facturación pasó de 88,67 M en 2023 a 62,63 M en 2024. Aun así, 2024 queda por encima de 2020, 2021 y 2022.",
          read: "La caída no se concentra en un sitio: bajan todos los países (entre un 28 % y un 36 %), todos los sectores (entre un 26 % y un 31 %) y todos los vinos (entre un 26 % y un 32 %). El número de ventas registradas también baja, de 55.967 a 39.815 (−28,9 %).",
          use: "Más que buscar un producto o un mercado concreto, miraría por qué hay menos operaciones. Con estos datos no se puede saber la causa." },
        { id: "p", h: "España concentra el 38,2 % de la facturación",
          obs: "España factura 97,64 M, más del doble que Alemania (47,68 M), el segundo mercado. Reino Unido es el último, con el 1,4 %.",
          read: "La empresa depende mucho de un solo mercado.",
          use: "Analizar esa concentración y estudiar si hay margen para crecer en los demás países." },
        { id: "s", h: "Bares y restaurantes suman el 57,2 %",
          obs: "Bares (28,8 %) y restaurantes (28,4 %) están casi empatados. Las tiendas online son el canal con menos facturación (8,9 %).",
          read: "El negocio se apoya sobre todo en la hostelería.",
          use: "Valorar esa dependencia y estudiar otros canales. Que el canal online deba crecer sería una hipótesis que necesita más información." },
        { id: "v", h: "Vender más unidades no significa ganar más",
          obs: "Todos los vinos venden entre 8,0 y 9,0 millones de unidades. Doix Costers es el que más vende, pero tiene el margen más bajo (15,94 %). Capellanes lidera la facturación y el beneficio, y Gran Muralles tiene el mayor margen (46,11 %).",
          read: "Como el volumen es parecido, las diferencias vienen del precio y del coste de cada vino.",
          use: "Analizar juntos unidades, precios y costes para saber qué vinos aportan más rentabilidad." },
      ],
      note: "Los Excel no indican la moneda, así que muestro los importes sin símbolo. M = millones. El margen lo calculo aparte; no es una de las nueve medidas.",
    },

    /* 8 · Mejoras (revisión posterior, no forma parte del trabajo original) */
    improve: [
      { h: "KPI con DIVIDE",
        a: "KPI = [Facturación]/[Facturación Total]*100",
        b: "KPI =\nDIVIDE(\n    [Facturación],\n    [Facturación Total],\n    0\n)",
        d: "DIVIDE evita el error si el denominador es cero. El porcentaje lo daría el formato de la medida en Power BI, sin multiplicar por 100." },
      { h: "Revisar Facturación Total",
        a: "Facturación Total =\nSUMX(ALL(Factura), [Facturación])",
        b: "Facturación Total =\nCALCULATE(\n    [Facturación],\n    REMOVEFILTERS()\n)",
        d: "Al evaluar [Facturación] dentro de SUMX hay transición de contexto, y sospecho que los filtros que llegan de otras tablas (por ejemplo, un país elegido en el segmentador) siguen activos. Si es así, el KPI marcaría 100 % al filtrar. Es lo primero que comprobaría. La alternativa quita todos los filtros, pero tampoco la doy por equivalente sin probarla." },
      { h: "Mismo tipo en las claves",
        d: "Dejaría los códigos como números enteros tanto en Factura como en las tablas maestras, en Power Query, para que las relaciones no dependan de conversiones." },
    ],
    learned: [
      "Leer un informe al revés: partir de una visualización y deducir qué tablas, relaciones y medidas necesita.",
      "Distinguir facturación (con IVA) de ingresos, y beneficio sobre producto de beneficio neto.",
      "Guardar las medidas en su propia tabla y reutilizarlas en vez de repetir fórmulas.",
    ],

    skills: [
      ["Preparación de datos", "Seis consultas en Power Query", "biEtl"],
      ["Modelado dimensional", "Hechos, dimensiones, claves y seis relaciones", "biModelo"],
      ["DAX", "Iteradores, RELATED, ALL y reutilización de medidas", "biDax"],
      ["Inteligencia temporal", "Calendario y comparativa interanual", "biDax"],
      ["Visualización e interactividad", "Seis páginas, segmentadores, navegación y tooltip", "biInforme"],
      ["Análisis de negocio", "Cuatro hallazgos comprobados con los datos", "biHallazgos"],
    ],
  };
})();
