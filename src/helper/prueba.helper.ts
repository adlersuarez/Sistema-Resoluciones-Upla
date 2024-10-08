import Documento from "@/model/interfaces/documento/documento";
import DescrOficina from "@/model/interfaces/persona/descrOficina";
import DescrPersonal from "@/model/interfaces/persona/descrPersonal";
import Estudiante from "@/model/interfaces/persona/estudiante";
import Oficina from "@/model/interfaces/persona/oficina";
import Personal from "@/model/interfaces/persona/personal";
import { Resolucion } from "@/model/interfaces/resolucion/resolucion";
import TipoAsunto from "@/model/interfaces/tipo/tipoAsunto";

export const varAsuntoPrueba: TipoAsunto[] = [
    { idTipoAsunto: 1, tipoAsunto: 'Aprobar' },
    { idTipoAsunto: 2, tipoAsunto: 'Disponer' },
    { idTipoAsunto: 3, tipoAsunto: 'Dar por Conocido' },
    { idTipoAsunto: 4, tipoAsunto: 'Desestimar' },
    { idTipoAsunto: 5, tipoAsunto: 'Modificar' },
    { idTipoAsunto: 6, tipoAsunto: 'Precisar' },
    { idTipoAsunto: 7, tipoAsunto: 'Autorizar' },
    { idTipoAsunto: 8, tipoAsunto: 'Rectificar' }
]
// PASO 1  DOCUMENTOS
export const varPruebaOficio: Documento[] = [
    {
        documentoId: 1,
        documento: '005-2022-APLA',
        documentoUrl: '',
        tipoDocumentoId: 1,
        documentoFecha: new Date('2022-03-28'),
        considerandoDoc: 'El Oficio Nº 005-2022-APLA de fecha 28.03.2022 mediante la cual la Asociación Promotora Los Andes, peticiona al Rector convocar a los Representantes de la APLA ante la Asamblea Universitaria, a fin de participar en las reuniones programadas por la Universidad, en mérito al Artículo 17° del Estatuto de la Universidad Peruana Los Andes',
    },
    {
        documentoId: 2,
        documento: '305-OPDITT-UPLA-2021',
        documentoUrl: '',
        tipoDocumentoId: 1,
        documentoFecha: new Date('2021-12-29'),
        considerandoDoc: 'El Jefe Oficina de Proyectos Desarrollo Investigación y Transferencia Tecnológica mediante Oficio N" 305-OPDITT-UPLA-2021 de fecha 29.12.2021, comunica al señor Vicerrector de Investigación, que ha revisado el Proyecto de Investigación titulado: "MORTALIDAD POR TOXICIDAD PULMONAR POR OXIGENO EN PACIENTES EN VENTILACIÓN MECÁNICA INVASIVA EN LA ALTITUD. ESTUDIO DE COHORTE", presentado por el Docente Ejecutor: M.C. Juan Amilcar Tinoco Solórzano (Investigador Principal), Docente Contratado, adscrito al Departamento de Ciencias Biomédicas de la Facultad de Medicina Humana, el mismo que cumple con los requisitos exigidos por el Reglamento de Investigación de la Universidad Peruana Los Andes, siendo su opinión favorable',
    },
    {
        documentoId: 3,
        documento: '0002-VRINV.UPLA-2022',
        documentoUrl: '',
        tipoDocumentoId: 1,
        documentoFecha: new Date('2022-01-03'),
        considerandoDoc: 'El señor Vicerrector de Investigación mediante Oficio N° 0002-VRINV.UPLA-2022 de fecha 03.01.2022, remite al señor Rector el expediente con opinión favorable para la emisión de la Resoludón correspondiente',
    },
    {
        documentoId: 4,
        documento: '3911-2021-SUNEDU-02-13',
        documentoUrl: '',
        tipoDocumentoId: 1,
        documentoFecha: new Date('2021-12-15'),
        considerandoDoc: 'La Dirección de Supervisión de la Superintendencia Nacional de Educación Superior Universitaria mediante Oficio N° 3911-2021-SUNEDU-02-13 de fecha 15.12.2021, remite al señor Rector de la Universidad Peruana Los Andes, adjuntado el Informe de Resultados N° 0507-2021-SUNEDU02-13, en la cual informa los resultados de la supervisión a la Universidad Peruana Los Andes, respecto al cumplimiento de las obligaciones previstas en el artículo 6, numeral 7.1 del artículo 7, numeral 8.1 del artículo 8, el artículo 9 y el literal a) del artículo 13 del Reglamento del Proceso de Cese de Actividades de Universidades y Escuelas de Posgrado, aprobado mediante Resolución del Consejo Directivo N° 111-2018-SUNEDU/CD, en el marco del cese voluntario de programas y/o establecimientos, para su tratamiento en lo pertinente',
    },
    {
        documentoId: 5,
        documento: '3914-2021-SUNEDU-02-13',
        documentoUrl: '',
        tipoDocumentoId: 1,
        documentoFecha: new Date('2021-12-15'),
        considerandoDoc: 'La Dirección de Supervisión de la Superintendencia Nacional de Educación Superior Universitaria mediante Oficio N° 3914-2021-SUNEDU-02-13 de fecha 15.12.2021, remite al señor Rector de la Universidad Peruana Los Andes, adjuntado ei informe de Resultados N° 0509-2021-SUNEDU02-13 en ia cual informa los resultados de la supenvisión a la Universidad Peruana Los Andes, respecto al cumplimiento de las obligaciones previstas en el artículo 6, y numerales 7.1 y 7.2 del artículo 7 del Reglamento del Proceso de Cese de Actividades de Universidades y Escuelas de Posgrado durante el año 2020, aprobado mediante Resolución del Consejo Directivo N° 111-2018-SUNEDU/CD, en el marco del cese voluntario de programas y/o establecimientos, para su tratamiento en lo pertinente',
    },
]

export const varPruebaProveido: Documento[] = [
    {
        documentoId: 6,
        documento: '1939-2022-R-UPLA',
        documentoUrl: '',
        tipoDocumentoId: 2,
        documentoFecha: new Date('2022-03-29'),
        considerandoDoc: 'El Proveído N° 1939-2022-R-UPLA de fecha 29.03.2022 mediante la cual el Rector toma conocimiento del documento y lo remite a Secretaria General para ser puesto a consideración de la Asamblea Universitaria',
    },
    {
        documentoId: 7,
        documento: '3-2022-R-UPLA',
        documentoUrl: '',
        tipoDocumentoId: 2,
        documentoFecha: new Date('2022-01-03'),
        considerandoDoc: 'El señor Rector toma conocimiento del expediente y mediante Proveído N° 3-2022-R-UPLA de fecha 03.01.2022, lo remite a Secretaria General para emisión de la Resolución',
    },
    {
        documentoId: 8,
        documento: '1 y 2-2022-R-UPLA',
        documentoUrl: '',
        tipoDocumentoId: 2,
        documentoFecha: new Date('2022-01-03'),
        considerandoDoc: 'El señor Rector toma conocimiento de los expedientes y mediante Proveídos Nros. 1 y 2-2022-R-UPLA de fecha 03.01.2022 respectivamente, lo remite a Secretaria General para ser puesto a consideración del Consejo Universitario',
    },
]

// PASO 3 ENCARGATURA
export const varPruebaEnte: Oficina[] = [
    {
        idEnte: 1,
        ente: 'Oficina de Proyectos, Desarrollo de Investigación y Transferencia Tecnológica',
        codigo: '12345678',
        cargo: 'Jefe',
        personal: 'Dr. Hilario Romero Girón',
        detalleEnte: 'Encargado de supervisar y coordinar proyectos de investigación y transferencia tecnológica en la universidad.',
        tipoEnte: 1,
    },
    {
        idEnte: 2,
        ente: 'Oficina de Planificación',
        codigo: '23456789',
        cargo: 'Jefe',
        personal: 'Dr. Victoriano Zacarias Rodríguez',
        detalleEnte: 'Responsable de planificar y coordinar actividades de desarrollo institucional y planificación estratégica.',
        tipoEnte: 1,
    },
    {
        idEnte: 3,
        ente: 'Oficina de Recursos Humanos',
        codigo: '34567890',
        cargo: 'Jefe',
        personal: 'Dr. Pierre Chipana Loayza',
        detalleEnte: 'Encargado de la gestión del personal, contratación, capacitación y desarrollo del talento humano en la universidad.',
        tipoEnte: 1,
    },
    {
        idEnte: 4,
        ente: 'Oficina de Asesoría Jurídica',
        codigo: '45678901',
        cargo: 'Jefe',
        personal: 'Mtro. Mark David Villar Aranda',
        detalleEnte: 'Responsable de proporcionar asesoramiento jurídico y representación legal a la universidad en asuntos legales y regulatorios.',
        tipoEnte: 1,
    },
    {
        idEnte: 5,
        ente: 'Asociación Promotora Los Andes',
        codigo: '56789012',
        cargo: 'Representante',
        personal: 'Sr. Jesús Alania Gavilan',
        detalleEnte: 'Representante oficial de la Asociación Promotora Los Andes en la universidad, encargado de promover sus intereses y actividades.',
        tipoEnte: 2,
    },
    {
        idEnte: 6,
        ente: 'Comité Electoral Universitario',
        codigo: '67890123',
        cargo: 'Presidente',
        personal: 'Dra. Amelia Celinda Chumpen Elera',
        detalleEnte: 'Encargada de presidir el Comité Electoral Universitario, responsable de supervisar y garantizar la integridad de los procesos electorales en la universidad.',
        tipoEnte: 3,
    }
]
export const varPruebaPer: Personal[] = [
    {
        idPer: 1,
        codigo: '76543218',
        cargoPer: 'Rector',
        nombre: 'Dr. Fredi Gutiérrez Martínez',
        detallePer: 'Máxima autoridad administrativa de la universidad.',
        tipoPer: 1,
    },
    {
        idPer: 2,
        codigo: '94568123',
        cargoPer: 'Director General de Administración',
        nombre: 'Dr. Jesús Sandoval Trigos',
        detallePer: 'Encargado de la gestión administrativa y operativa de la universidad.',
        tipoPer: 3,
    },
    {
        idPer: 3,
        codigo: '42561781',
        cargoPer: 'Vicerrector de Investigación',
        nombre: 'Ph.D. Mohamed Mehdi Hadi Mohamed',
        detallePer: 'Responsable de liderar las actividades de investigación académica y científica.',
        tipoPer: 2,
    },
    {
        idPer: 4,
        codigo: '62134851',
        cargoPer: 'Decano de la Facultad de Medicina Humana',
        nombre: 'Mg. Segundo Ronald Samamé Talledo',
        detallePer: 'Encargado de la gestión académica y administrativa de la Facultad de Medicina Humana.',
        tipoPer: 4,
    }
]
export const varPruebaEst: Estudiante[] = [
    {
        idEst: 1,
        codigo: 'Q00499A',
        nombre: 'Anabel Mauricio Curo',
        facultad: 'Medicina Humana',
        carrera: 'Medicina Humana',
    },
    {
        idEst: 2,
        codigo: "R00783B",
        nombre: "Pedro Alvarez Rodriguez",
        facultad: "Ingeniería",
        carrera: "Ingeniería Civil"
    },
    {
        idEst: 3,
        codigo: "T00246C",
        nombre: "Laura Sánchez Pérez",
        facultad: "Ciencias de la Salud",
        carrera: "Enfermería"
    },
    {
        idEst: 4,
        codigo: "W00610D",
        nombre: "Juan Martínez López",
        facultad: "Ingeniería",
        carrera: "Ingeniería Eléctrica"
    },
    {
        idEst: 5,
        codigo: "K00378E",
        nombre: "María Fernández Gómez",
        facultad: "Ciencias Administrativas y Contables",
        carrera: "Administración y Sistemas"
    },
    {
        idEst: 6,
        codigo: "F00192F",
        nombre: "Luisa Ramírez García",
        facultad: "Ingeniería",
        carrera: "Ingeniería de Sistemas y Computación"
    },
    {
        idEst: 7,
        codigo: "D00937G",
        nombre: "José Pérez Pérez",
        facultad: "Derecho y Ciencias Políticas",
        carrera: "Derecho"
    }
]

//Descripcion de Oficinas y Personas
export const varPruebaDescrOficina: DescrOficina[] = [
    {
        tipoEnte: 1,
        artPer: 'a la',
        descrEnte: 'oficina',
        artPluralPer: 'a las',
        descrPluralEnte: 'oficinas',
    },
    {
        tipoEnte: 2,
        artPer: 'a la',
        descrEnte: 'asociación',
        artPluralPer: 'a las',
        descrPluralEnte: 'asociaciones',
    },
    {
        tipoEnte: 3,
        artPer: 'al',
        descrEnte: 'comité',
        artPluralPer: 'a los',
        descrPluralEnte: 'comités',
    },
]

export const varPruebaDescrPersonal: DescrPersonal[] = [
    {
        tipoPer: 1,
        artPer: 'al',
        descrPer: 'rector',
        artPluralPer: 'a los',
        descrPluralPer: 'rectores'
    },
    {
        tipoPer: 2,
        artPer: 'al',
        descrPer: 'vicerrector',
        artPluralPer: 'a los',
        descrPluralPer: 'vicerrectores'
    },
    {
        tipoPer: 3,
        artPer: 'al',
        descrPer: 'director',
        artPluralPer: 'a los',
        descrPluralPer: 'directores'
    },
    {
        tipoPer: 4,
        artPer: 'al',
        descrPer: 'decano',
        artPluralPer: 'a los',
        descrPluralPer: 'decanos'
    },
]


export const varPruebaResolucion: Resolucion[] = [
    {
        resolucionId: 1,
        resolucionNumero: 1001,
        resolucionNombre: "Aprobación de Proyecto",
        resolucionUrl: "http://example.com/doc1.pdf",
        resolucionFecha: '2024-10-02',
        tipoResolucionId: 1,
        tipoResolucion: "Ordinaria",
        tipoSesionId: 1,
        tipoSesion: "Plenaria",
        considerando: {
            considerandoId: 1,
            considerandoDescripcion: "Se considera la necesidad de aprobar el proyecto en cuestión."
        },
        documentos: [
            {
                documentoId: 1,
                documento: "Acta de aprobación",
                tipoDocumentoId: 1,
                documentoUrl: "http://example.com/doc1.pdf",
                documentoFecha: new Date(),
                considerandoDoc: "Aprobación por mayoría."
            }
        ],
        asuntos: [
            {
                asuntoId: 1,
                tipoAsuntoId: 1,
                tipoAsunto: "Presupuestario",
                asuntoDescripcion: "Revisión de presupuestos.",
                asuntoUrlImagen: "",
                asuntoImagen: null
            }
        ],
        encargos: [
            {
                idSeleccionado: 1,
                tipo: "Director",
                codigo: "DIR001",
                detalle: "Encargado de la dirección del proyecto.",
                titulo: "Director del proyecto",
                tipoGrupo: 1
            },
            {
                idSeleccionado: 4,
                tipo: "Director de RRHH",
                codigo: "RRHH004",
                detalle: "Encargado de los contratos.",
                titulo: "Director de Recursos Humanos",
                tipoGrupo: 4
            },
            {
                idSeleccionado: 2,
                tipo: "Secretario",
                codigo: "SEC002",
                detalle: "Responsable de las modificaciones.",
                titulo: "Secretario General",
                tipoGrupo: 2
            }
        ]
    },
    {
        resolucionId: 2,
        resolucionNumero: 1002,
        resolucionNombre: "Modificación de Reglamento",
        resolucionUrl: "http://example.com/doc1.pdf",
        resolucionFecha: '2024-10-02',
        tipoResolucionId: 2,
        tipoResolucion: "Extraordinaria",
        tipoSesionId: 2,
        tipoSesion: "Sesión Especial",
        considerando: {
            considerandoId: 2,
            considerandoDescripcion: "Se requiere modificar el reglamento para adaptarlo a nuevas normativas."
        },
        documentos: [
            {
                documentoId: 2,
                documento: "Reglamento modificado",
                tipoDocumentoId: 2,
                documentoUrl: "http://example.com/doc2.pdf",
                documentoFecha: new Date(),
                considerandoDoc: "Aprobación de las modificaciones."
            }
        ],
        asuntos: [
            {
                asuntoId: 2,
                tipoAsuntoId: "2",
                tipoAsunto: "Normativo",
                asuntoDescripcion: "Discusión sobre cambios en normativas internas.",
                asuntoUrlImagen: "http://example.com/image2.jpg",
                asuntoImagen: null
            }
        ],
        encargos: [
            {
                idSeleccionado: 2,
                tipo: "Secretario",
                codigo: "SEC002",
                detalle: "Responsable de las modificaciones.",
                titulo: "Secretario General",
                tipoGrupo: 2
            }
        ]
    },
    {
        resolucionId: 3,
        resolucionNumero: 1003,
        resolucionNombre: "Asignación de Recursos",
        resolucionUrl: "http://example.com/doc1.pdf",
        resolucionFecha: '2024-10-02',
        tipoResolucionId: 3,
        tipoResolucion: "Urgente",
        tipoSesionId: 3,
        tipoSesion: "Sesión Urgente",
        considerando: {
            considerandoId: 3,
            considerandoDescripcion: "Es urgente asignar recursos a áreas críticas."
        },
        documentos: [
            {
                documentoId: 3,
                documento: "Plan de asignación",
                tipoDocumentoId: 3,
                documentoUrl: "http://example.com/doc3.pdf",
                documentoFecha: new Date(),
                considerandoDoc: "Justificación de la asignación."
            }
        ],
        asuntos: [
            {
                asuntoId: 3,
                tipoAsuntoId: "3",
                tipoAsunto: "Financiero",
                asuntoDescripcion: "Distribución de recursos.",
                asuntoUrlImagen: "http://example.com/image3.jpg",
                asuntoImagen: null
            }
        ],
        encargos: [
            {
                idSeleccionado: 3,
                tipo: "Administrador",
                codigo: "ADM003",
                detalle: "Responsable de la ejecución del plan.",
                titulo: "Administrador de Recursos",
                tipoGrupo: 3
            }
        ]
    },
    {
        resolucionId: 4,
        resolucionNumero: 1004,
        resolucionNombre: "Renovación de Contrato",
        resolucionUrl: "http://example.com/doc1.pdf",
        resolucionFecha: '2024-10-02',
        tipoResolucionId: 4,
        tipoResolucion: "Ordinaria",
        tipoSesionId: 1,
        tipoSesion: "Plenaria",
        considerando: {
            considerandoId: 4,
            considerandoDescripcion: "Se aprueba la renovación de contratos clave."
        },
        documentos: [
            {
                documentoId: 4,
                documento: "Contrato renovado",
                tipoDocumentoId: 4,
                documentoUrl: "http://example.com/doc4.pdf",
                documentoFecha: new Date(),
                considerandoDoc: "Contrato aprobado por mayoría."
            }
        ],
        asuntos: [
            {
                asuntoId: 4,
                tipoAsuntoId: "4",
                tipoAsunto: "Laboral",
                asuntoDescripcion: "Revisión de contratos laborales.",
                asuntoUrlImagen: "http://example.com/image4.jpg",
                asuntoImagen: null
            }
        ],
        encargos: []
    },
    {
        resolucionId: 5,
        resolucionNumero: 1005,
        resolucionNombre: "Suspensión de Actividades",
        resolucionUrl: "http://example.com/doc1.pdf",
        resolucionFecha: '2024-10-02',
        tipoResolucionId: 5,
        tipoResolucion: "Extraordinaria",
        tipoSesionId: 2,
        tipoSesion: "Sesión de Emergencia",
        considerando: {
            considerandoId: 5,
            considerandoDescripcion: "Se suspende temporalmente las actividades debido a condiciones externas."
        },
        documentos: [
            {
                documentoId: 5,
                documento: "Comunicación de suspensión",
                tipoDocumentoId: 5,
                documentoUrl: "http://example.com/doc5.pdf",
                documentoFecha: new Date(),
                considerandoDoc: "Suspensión temporal por motivos de fuerza mayor."
            }
        ],
        asuntos: [
            {
                asuntoId: 5,
                tipoAsuntoId: "5",
                tipoAsunto: "Operativo",
                asuntoDescripcion: "Plan de suspensión de actividades.",
                asuntoUrlImagen: "http://example.com/image5.jpg",
                asuntoImagen: null
            }
        ],
        encargos: [
            {
                idSeleccionado: 5,
                tipo: "Coordinador",
                codigo: "COOR005",
                detalle: "Coordinador de la suspensión de actividades.",
                titulo: "Coordinador General",
                tipoGrupo: 5
            }
        ]
    }
]  