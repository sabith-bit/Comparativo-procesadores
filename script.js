
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       AJUSTE VISUAL DE CHART.JS PARA EL ESTILO ACADÉMICO
    ===================================================== */

    if (typeof Chart !== "undefined") {
        Chart.defaults.color = "#4c4432";
        Chart.defaults.font.family =
            "'Source Serif 4', Georgia, serif";
        Chart.defaults.borderColor = "rgba(42,36,25,0.14)";
    }


    /* =====================================================
       DATOS DE LOS PROCESADORES
    ===================================================== */

    const processors = [
        {
            id: "intel-i7-6700k",
            tagline: "Procesador de referencia de la sexta generación Intel Core para representar el punto de partida tecnológico del periodo 2016–2026.",
            brand: "Intel",
            model: "Core i7-6700K",
            family: "Core",
            architecture: "Skylake",
            frequency: 4.2,
            cores: 4,
            threads: 8,
            tdp: 91,
            tops: 0,
            price: 0,
            priceNote: "Referencia histórica; producto descontinuado. No se usa precio actual para evitar mezclar valores de años diferentes.",
            market: "Desktop",
            year: 2016,
            ai: "Sin NPU dedicada",
            img: "images/intel-i7-6700k.svg"
        },

        {
            id: "intel-core",
            tagline: "Procesador de escritorio insignia de Intel, pensado para gaming y productividad de alto rendimiento.",
            brand: "Intel",
            model: "Core Ultra 9 285K",
            family: "Core",
            architecture: "Arrow Lake",
            frequency: 5.7,
            cores: 24,
            threads: 24,
            tdp: 125,
            tops: 13,
            price: 2980000,
            priceNote: "Precio de venta al público en Colombia (pago de contado), TigerTech, agosto de 2026.",
            market: "Desktop",
            year: 2024,
            ai: "Intel AI Boost",
            img: "images/intel-core.jpg"
        },

        {
            id: "intel-xeon",
            tagline: "Procesador profesional de Intel para estaciones de trabajo y cargas de multihilo exigentes.",
            brand: "Intel",
            model: "Xeon w7-2495X",
            family: "Xeon",
            architecture: "Sapphire Rapids",
            frequency: 4.8,
            cores: 24,
            threads: 48,
            tdp: 225,
            tops: 0,
            price: 9260000,
            priceNote: "Precio de referencia convertido a COP (USD 2.891, SHI) según TRM del 31 de agosto de 2026.",
            market: "Workstation",
            year: 2023,
            ai: "Intel DL Boost",
            img: "images/intel-xeon.jpg"
        },

        {
            id: "amd-ryzen",
            tagline: "Procesador de escritorio de alto rendimiento de AMD, ideal para gaming y creación de contenido.",
            brand: "AMD",
            model: "Ryzen 9 9950X",
            family: "Ryzen",
            architecture: "Zen 5",
            frequency: 5.7,
            cores: 16,
            threads: 32,
            tdp: 170,
            tops: 0,
            price: 2557000,
            priceNote: "Precio de venta al público en Colombia, Cometware, agosto de 2026.",
            market: "Desktop",
            year: 2024,
            ai: "CPU / GPU",
            img: "images/amd-ryzen.jpg"
        },

        {
            id: "amd-threadripper",
            tagline: "Procesador extremo de AMD para estaciones de trabajo con cargas masivamente paralelas.",
            brand: "AMD",
            model: "Threadripper 7980X",
            family: "Threadripper",
            architecture: "Zen 4",
            frequency: 5.1,
            cores: 64,
            threads: 128,
            tdp: 350,
            tops: 0,
            price: 16010000,
            priceNote: "Precio de lanzamiento oficial de AMD (USD 4.999) convertido a COP según TRM del 31 de agosto de 2026.",
            market: "Workstation",
            year: 2023,
            ai: "CPU / GPU",
            img: "images/amd-threadripper.jpg"
        },

        {
            id: "apple-m4",
            tagline: "Chip ARM eficiente de Apple, diseñado para portátiles delgados con gran autonomía.",
            brand: "Apple",
            model: "Apple M4",
            family: "M",
            architecture: "Apple Silicon",
            frequency: 4.4,
            cores: 10,
            threads: 10,
            tdp: 22,
            tops: 38,
            price: 5199000,
            priceNote: "Precio del MacBook Air 13\" M4 (16GB/512GB) en Colombia, Mac Center, agosto de 2026. Apple no vende el chip por separado.",
            market: "Portátil",
            year: 2024,
            ai: "Neural Engine",
            img: "images/apple-m4.jpg"
        },

        {
            id: "apple-m4-max",
            tagline: "Versión de alto rendimiento del M4, pensada para estaciones de trabajo profesionales de Apple.",
            brand: "Apple",
            model: "Apple M4 Max",
            family: "M",
            architecture: "Apple Silicon",
            frequency: 4.5,
            cores: 16,
            threads: 16,
            tdp: 0,
            tops: 38,
            price: 17824000,
            priceNote: "Precio del MacBook Pro 16\" M4 Max (36GB/1TB) en Colombia, Mac Center, agosto de 2026. Apple no vende el chip por separado.",
            market: "Workstation",
            year: 2024,
            ai: "Neural Engine",
            img: "images/apple-m4-max.jpg"
        },

        {
            id: "snapdragon-x",
            tagline: "Procesador ARM de Qualcomm para portátiles, enfocado en eficiencia energética e IA.",
            brand: "Qualcomm",
            model: "Snapdragon X Elite",
            family: "Snapdragon",
            architecture: "Oryon",
            frequency: 3.8,
            cores: 12,
            threads: 12,
            tdp: 0,
            tops: 45,
            price: 6499900,
            priceNote: "Precio de lanzamiento del ASUS Vivobook S 15, primer Copilot+ PC con este chip en Colombia (ASUS Colombia / El Tiempo).",
            market: "Portátil",
            year: 2024,
            ai: "Hexagon NPU",
            img: "images/snapdragon-x.jpg"
        }
    ];


    /* =====================================================
       ELEMENTOS DEL HTML
    ===================================================== */

    const tableBody = document.getElementById(
        "processorTableBody"
    );

    const filterBrand = document.getElementById(
        "filterBrand"
    );

    const filterFamily = document.getElementById(
        "filterFamily"
    );

    const filterMarket = document.getElementById(
        "filterMarket"
    );

    const resetFilters = document.getElementById(
        "resetFilters"
    );


    /* =====================================================
       SELECTORES DE PROCESADORES
    ===================================================== */

    const processorSelects = [
        document.getElementById("processor1"),
        document.getElementById("processor2"),
        document.getElementById("processor3"),
        document.getElementById("processor4")
    ].filter(function (select) {
        return select !== null;
    });


    /* =====================================================
       COLORES
    ===================================================== */

    const brandColors = {
        Intel: "#1d5c8a",
        AMD: "#8a2432",
        Apple: "#3a352c",
        Qualcomm: "#3f6b3f"
    };


    /* =====================================================
       FORMATO DEL PRECIO
    ===================================================== */

    function formatPrice(price) {

        if (!price || price === 0) {
            return "N/D";
        }

        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }).format(price);
    }



function renderTable(data) {

    if (!tableBody) {
        console.error(
            "ERROR: No existe processorTableBody en index.html"
        );
        return;
    }

    tableBody.innerHTML = "";

    if (data.length === 0) {

        const emptyRow = document.createElement("tr");

        const emptyCell = document.createElement("td");

        emptyCell.colSpan = 13;

        emptyCell.textContent =
            "No se encontraron procesadores.";

        emptyCell.style.textAlign = "center";

        emptyCell.style.padding = "30px";

        emptyRow.appendChild(emptyCell);

        tableBody.appendChild(emptyRow);

        return;
    }


    data.forEach(function (cpu) {

        const row =
            document.createElement("tr");


        /* Imagen */

        const imgCell =
            document.createElement("td");

        const imgEl =
            document.createElement("img");

        imgEl.src = cpu.img;
        imgEl.alt = cpu.model;
        imgEl.className = "cpu-thumb";

        imgEl.onerror = function () {
            imgEl.onerror = null;
            imgEl.src =
                "https://via.placeholder.com/60x60/1a1a2e/ffffff?text=CPU";
        };

        imgCell.appendChild(imgEl);


        /* Año */

        const yearCell =
            document.createElement("td");

        yearCell.textContent =
            cpu.year;


        /* Marca */

        const brandCell =
            document.createElement("td");

        const brandStrong =
            document.createElement("strong");

        brandStrong.textContent =
            cpu.brand;

        brandCell.appendChild(
            brandStrong
        );


        /* Modelo */

        const modelCell =
            document.createElement("td");

        const modelStrong =
            document.createElement("strong");

        modelStrong.textContent =
            cpu.model;

        modelCell.appendChild(
            modelStrong
        );


        /* Familia */

        const familyCell =
            document.createElement("td");

        familyCell.textContent =
            cpu.family;


        /* Arquitectura */

        const architectureCell =
            document.createElement("td");

        architectureCell.textContent =
            cpu.architecture;


        /* Frecuencia */

        const frequencyCell =
            document.createElement("td");

        frequencyCell.textContent =
            cpu.frequency + " GHz";


        /* Núcleos */

        const coresCell =
            document.createElement("td");

        coresCell.textContent =
            cpu.cores;


        /* Hilos */

        const threadsCell =
            document.createElement("td");

        threadsCell.textContent =
            cpu.threads;


        /* TDP */

        const tdpCell =
            document.createElement("td");

        if (cpu.tdp > 0) {

            tdpCell.textContent =
                cpu.tdp + " W";

        } else {

            tdpCell.textContent =
                "N/D";
        }


        /* IA / TOPS */

        const aiCell =
            document.createElement("td");

        if (cpu.tops > 0) {

            aiCell.textContent =
                cpu.ai +
                " · " +
                cpu.tops +
                " TOPS";

        } else {

            aiCell.textContent =
                cpu.ai;
        }


        /* TOPS IA */

        const topsCell =
            document.createElement("td");

        topsCell.textContent =
            cpu.tops > 0 ? cpu.tops + " TOPS" : "N/D";


        /* Mercado */

        const marketCell =
            document.createElement("td");

        marketCell.textContent =
            cpu.market;


        /* Precio */

        const priceCell =
            document.createElement("td");

        priceCell.textContent =
            formatPrice(cpu.price);

        priceCell.className = "price-cell";

        if (cpu.priceNote) {
            priceCell.title = cpu.priceNote;
        }


        /* Agregar todas las celdas */

        row.appendChild(imgCell);

        row.appendChild(yearCell);

        row.appendChild(brandCell);

        row.appendChild(modelCell);

        row.appendChild(familyCell);

        row.appendChild(architectureCell);

        row.appendChild(frequencyCell);

        row.appendChild(coresCell);

        row.appendChild(threadsCell);

        row.appendChild(tdpCell);

        row.appendChild(aiCell);

        row.appendChild(topsCell);

        row.appendChild(marketCell);

        row.appendChild(priceCell);


        /* Agregar fila a la tabla */

        tableBody.appendChild(row);

    });
}


/* =====================================================
   LLENAR SELECTORES
===================================================== */

function populateSelectors() {

    var brandBySelectIndex = [
        "Intel",
        "AMD",
        "Qualcomm",
        "Apple"
    ];

    processorSelects.forEach(function (select, index) {

        select.innerHTML =
            '<option value="">Seleccionar procesador</option>';

        var targetBrand = brandBySelectIndex[index];

        processors
            .filter(function (cpu) {
                return cpu.brand === targetBrand;
            })
            .forEach(function (cpu) {

                var option = document.createElement("option");

                option.value = cpu.id;

                option.textContent =
                    cpu.brand + " - " + cpu.model;

                select.appendChild(option);

            });

    });

}

    /* =====================================================
       FILTROS
    ===================================================== */

    function applyFilters() {

        const brand =
            filterBrand ? filterBrand.value : "all";

        const family =
            filterFamily ? filterFamily.value : "all";

        const market =
            filterMarket ? filterMarket.value : "all";


        const filtered =
            processors.filter(function (cpu) {

                const brandMatch =
                    brand === "all" ||
                    cpu.brand === brand;

                const familyMatch =
                    family === "all" ||
                    cpu.family === family;

                const marketMatch =
                    market === "all" ||
                    cpu.market === market;

                return (
                    brandMatch &&
                    familyMatch &&
                    marketMatch
                );
            });


        renderTable(filtered);
    }


    if (filterBrand) {
        filterBrand.addEventListener(
            "change",
            applyFilters
        );
    }


    if (filterFamily) {
        filterFamily.addEventListener(
            "change",
            applyFilters
        );
    }


    if (filterMarket) {
        filterMarket.addEventListener(
            "change",
            applyFilters
        );
    }


    /* =====================================================
       TARJETAS DE FABRICANTE INTERACTIVAS
       Clic en una tarjeta filtra el comparador por esa marca
    ===================================================== */

    const manufacturerCards = document.querySelectorAll(
        ".manufacturer-card[data-brand]"
    );

    manufacturerCards.forEach(function (card) {

        function goToBrandInComparator() {

            const brand = card.getAttribute("data-brand");

            if (filterBrand) {
                filterBrand.value = brand;
                applyFilters();
            }

            const comparador = document.getElementById(
                "comparador"
            );

            if (comparador) {
                comparador.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }

        card.addEventListener("click", function (event) {

            const clickedVideoLink = event.target.closest(
                ".manufacturer-video-link"
            );

            if (clickedVideoLink) {
                return;
            }

            goToBrandInComparator();
        });

        card.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goToBrandInComparator();
            }
        });
    });


    /* =====================================================
       RESTABLECER FILTROS
    ===================================================== */

    if (resetFilters) {

        resetFilters.addEventListener(
            "click",
            function () {

                if (filterBrand) {
                    filterBrand.value = "all";
                }

                if (filterFamily) {
                    filterFamily.value = "all";
                }

                if (filterMarket) {
                    filterMarket.value = "all";
                }

                renderTable(processors);
            }
        );
    }


    /* =====================================================
       CHART.JS
    ===================================================== */

    let radarChart = null;
    let barChart = null;
    let aiChart = null;


    /* =====================================================
       OBTENER PROCESADORES SELECCIONADOS
    ===================================================== */

    function getSelectedProcessors() {

        return processorSelects
            .map(function (select) {

                return processors.find(
                    function (cpu) {
                        return cpu.id === select.value;
                    }
                );
            })
            .filter(function (cpu) {
                return cpu !== undefined;
            });
    }


    /* =====================================================
       DESCRIPCIÓN TÉCNICA AUTOMÁTICA
    ===================================================== */

    function buildDescription(cpu) {

        var aiText = cpu.tops > 0
            ? cpu.ai + " con " + cpu.tops + " TOPS de aceleración de IA"
            : "sin aceleración de IA dedicada (" + cpu.ai + ")";

        var tdpText = cpu.tdp > 0
            ? "un consumo (TDP) de " + cpu.tdp + " W"
            : "un consumo no especificado por el fabricante";

        return "Pertenece a la familia " + cpu.family +
            ", construido sobre la arquitectura " + cpu.architecture +
            ". Cuenta con " + cpu.cores + " núcleos y " + cpu.threads +
            " hilos, alcanza hasta " + cpu.frequency +
            " GHz y maneja " + tdpText + ". Incluye " + aiText +
            ". Está orientado al mercado de " + cpu.market.toLowerCase() +
            " y fue lanzado en " + cpu.year + ".";
    }


    /* =====================================================
       TARJETAS DE DETALLE (IMAGEN GRANDE + TEXTO)
    ===================================================== */

    const processorDetails = document.getElementById(
        "processorDetails"
    );

    function renderProcessorDetails() {

        if (!processorDetails) {
            return;
        }

        processorDetails.innerHTML = "";

        processorSelects.forEach(function (select, index) {

            const cpu = processors.find(function (p) {
                return p.id === select.value;
            });

            const card = document.createElement("div");
            card.className = "processor-detail-card";

            if (!cpu) {

                card.classList.add("empty");

                const placeholder = document.createElement("p");
                placeholder.className = "processor-detail-empty";
                placeholder.textContent =
                    "Selecciona el procesador " + (index + 1) +
                    " para ver su ficha.";

                card.appendChild(placeholder);
                processorDetails.appendChild(card);
                return;
            }

            const img = document.createElement("img");
            img.src = cpu.img;
            img.alt = cpu.model;
            img.className = "processor-detail-img";

            img.onerror = function () {
                img.onerror = null;
                img.src =
                    "https://via.placeholder.com/300x300/1a1a2e/ffffff?text=CPU";
            };

            const title = document.createElement("h4");
            title.className = "processor-detail-title";
            title.textContent = cpu.brand + " " + cpu.model;

            const tagline = document.createElement("p");
            tagline.className = "processor-detail-tagline";
            tagline.textContent = cpu.tagline;

            const description = document.createElement("p");
            description.className = "processor-detail-description";
            description.textContent = buildDescription(cpu);

            const price = document.createElement("p");
            price.className = "processor-detail-price";
            price.textContent = "Precio de referencia: " + formatPrice(cpu.price);

            const source = document.createElement("p");
            source.className = "processor-detail-source";
            source.textContent = cpu.priceNote || "";

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(tagline);
            card.appendChild(description);
            card.appendChild(price);
            card.appendChild(source);

            processorDetails.appendChild(card);
        });
    }


    /* =====================================================
       GRÁFICO RADAR
    ===================================================== */

    function updateRadarChart() {

        const canvas =
            document.getElementById("radarChart");

        if (!canvas) {
            return;
        }

        if (typeof Chart === "undefined") {

            console.warn(
                "Chart.js no está cargado."
            );

            return;
        }


        if (radarChart) {
            radarChart.destroy();
        }


        const selected =
            getSelectedProcessors();


        const datasets =
            selected.map(function (cpu) {

                let efficiency = null;

                if (cpu.tdp > 0) {
                    efficiency =
                        100 -
                        (cpu.tdp / 350) * 100;

                    if (efficiency < 10) {
                        efficiency = 10;
                    }
                }


                return {

                    label: cpu.model,

                    data: [

                        Math.min(
                            100,
                            (cpu.frequency / 6) * 100
                        ),

                        Math.min(
                            100,
                            (cpu.cores / 64) * 100
                        ),

                        efficiency,

                        Math.min(
                            100,
                            (cpu.tops / 45) * 100
                        ),

                        Math.min(
                            100,
                            (cpu.threads / 128) * 100
                        )
                    ],

                    borderColor:
                        brandColors[cpu.brand],

                    backgroundColor:
                        brandColors[cpu.brand] + "20",

                    borderWidth: 2,

                    pointBackgroundColor:
                        brandColors[cpu.brand],

                    pointRadius: 4
                };
            });


        radarChart =
            new Chart(canvas, {

                type: "radar",

                data: {

                    labels: [
                        "Frecuencia",
                        "Núcleos",
                        "Eficiencia (TDP)",
                        "IA / TOPS",
                        "Hilos"
                    ],

                    datasets: datasets
                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    scales: {

                        r: {

                            min: 0,

                            max: 100,

                            ticks: {
                                display: false
                            },

                            grid: {
                                color:
                                    "rgba(42,36,25,0.16)"
                            },

                            angleLines: {
                                color:
                                    "rgba(42,36,25,0.16)"
                            }
                        }
                    },

                    plugins: {

                        legend: {
                            position: "bottom"
                        }
                    }
                }
            });
    }


    /* =====================================================
       GRÁFICO FRECUENCIA VS TDP
    ===================================================== */

    function updateBarChart() {

    var canvas =
        document.getElementById("barChart");

    if (!canvas) {
        return;
    }

    if (typeof Chart === "undefined") {
        return;
    }

    if (barChart) {
        barChart.destroy();
    }

    var selected =
        getSelectedProcessors();

    barChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: selected.map(function (cpu) {
                return cpu.model;
            }),

            datasets: [

                {
                    label: "Frecuencia (GHz)",

                    data: selected.map(function (cpu) {
                        return cpu.frequency;
                    }),

                    backgroundColor: "#38bdf8",

                    borderColor: "#38bdf8",

                    borderWidth: 1,

                    yAxisID: "frequency"
                },

                {
                    label: "TDP (W)",

                    data: selected.map(function (cpu) {
                        return cpu.tdp > 0 ? cpu.tdp : null;
                    }),

                    backgroundColor: "#ef4444",

                    borderColor: "#ef4444",

                    borderWidth: 1,

                    yAxisID: "tdp"
                },

                {
                    label: "TOPS de IA",

                    data: selected.map(function (cpu) {
                        return cpu.tops > 0 ? cpu.tops : null;
                    }),

                    backgroundColor: "#8b5cf6",

                    borderColor: "#8b5cf6",

                    borderWidth: 1,

                    yAxisID: "tops"
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                frequency: {

                    type: "linear",

                    position: "left",

                    beginAtZero: true,

                    title: {

                        display: true,

                        text: "Frecuencia (GHz)"

                    },

                    grid: {

                        color:
                            "rgba(42,36,25,0.14)"

                    }

                },

                tdp: {

                    type: "linear",

                    position: "right",

                    beginAtZero: true,

                    title: {

                        display: true,

                        text: "TDP (W)"

                    },

                    grid: {

                        drawOnChartArea: false

                    }

                },

                tops: {

                    type: "linear",

                    position: "right",

                    beginAtZero: true,

                    title: {
                        display: true,
                        text: "TOPS IA"
                    },

                    grid: {
                        drawOnChartArea: false
                    }
                }

            },

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });
}

    /* =====================================================
       GRÁFICO DE INTELIGENCIA ARTIFICIAL
    ===================================================== */

    function updateAIChart() {

        const canvas =
            document.getElementById("aiChart");

        if (!canvas) {
            return;
        }

        if (typeof Chart === "undefined") {
            return;
        }


        if (aiChart) {
            aiChart.destroy();
        }


        const selected =
            getSelectedProcessors();


        aiChart =
            new Chart(canvas, {

                type: "bar",

                data: {

                    labels:
                        selected.map(function (cpu) {
                            return cpu.model;
                        }),

                    datasets: [

                        {

                            label:
                                "TOPS de IA",

                            data:
                                selected.map(function (cpu) {
                                    return cpu.tops;
                                }),

                            backgroundColor:
                                selected.map(function (cpu) {
                                    return brandColors[cpu.brand];
                                }),

                            borderWidth: 1,

                            borderRadius: 8
                        }
                    ]
                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    scales: {

                        y: {

                            beginAtZero: true,

                            title: {

                                display: true,

                                text: "TOPS"
                            },

                            grid: {
                                color:
                                    "rgba(42,36,25,0.14)"
                            }
                        }
                    },

                    plugins: {

                        legend: {
                            display: false
                        },

                        tooltip: {

                            callbacks: {

                                label:
                                    function (context) {

                                        return (
                                            context.raw +
                                            " TOPS"
                                        );
                                    }
                            }
                        }
                    }
                }
            });
    }


    /* =====================================================
       ACTUALIZAR TODOS LOS GRÁFICOS
    ===================================================== */

    function updateCharts() {

        updateRadarChart();

        updateBarChart();

        updateAIChart();

        renderProcessorDetails();
    }


    /* =====================================================
       EVENTOS DE LOS SELECTORES
    ===================================================== */

    processorSelects.forEach(
        function (select) {

            select.addEventListener(
                "change",
                updateCharts
            );
        }
    );


    /* =====================================================
       EXPORTAR TABLA A CSV
    ===================================================== */

    const exportCsv = document.getElementById("exportCsv");

    if (exportCsv) {
        exportCsv.addEventListener("click", function () {
            const headers = [
                "Año", "Fabricante", "Procesador", "Familia",
                "Arquitectura", "Frecuencia (GHz)", "Núcleos",
                "Hilos", "TDP (W)", "IA / TOPS", "Mercado", "Precio (COP)"
            ];

            const rows = processors.map(function (cpu) {
                return [
                    cpu.year, cpu.brand, cpu.model, cpu.family,
                    cpu.architecture, cpu.frequency, cpu.cores, cpu.threads,
                    cpu.tdp > 0 ? cpu.tdp : "N/D",
                    cpu.tops > 0 ? cpu.ai + " - " + cpu.tops + " TOPS" : cpu.ai,
                    cpu.market, cpu.price > 0 ? cpu.price : "N/D"
                ];
            });

            const csv = [headers].concat(rows).map(function (row) {
                return row.map(function (value) {
                    return '"' + String(value).replace(/"/g, '""') + '"';
                }).join(";");
            }).join("\n");

            const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "comparativo_procesadores_2016_2026.csv";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        });
    }


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const navbar =
        document.querySelector(".navbar nav");


    if (menuBtn && navbar) {

        menuBtn.addEventListener(
            "click",
            function () {

                navbar.classList.toggle(
                    "active"
                );
            }
        );


        navbar
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navbar.classList.remove(
                            "active"
                        );
                    }
                );
            });
    }


    /* =====================================================
       INICIAR DASHBOARD
    ===================================================== */

    renderTable(processors);

    populateSelectors();


    /* Procesadores seleccionados inicialmente */

    const defaultProcessors = [
        "intel-core",
        "amd-ryzen",
        "snapdragon-x",
        "apple-m4-max"
    ];


    processorSelects.forEach(
        function (select, index) {

            if (defaultProcessors[index]) {

                select.value =
                    defaultProcessors[index];
            }
        }
    );


    updateCharts();


    console.log("CPU LAB iniciado correctamente.");

})
