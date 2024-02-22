export type MenuItem = {
    id: string,
    titulo: string,
    url?: string,
    icono: string,
    moduPadre: boolean,
    modPosicion: number,
    subMenu: boolean,
    subMenuItems?: MenuItem[]
    tipoUser: string
}

export const menusAdmin: MenuItem[] = [
    {
        id: "1",
        titulo: "Inicio",
        url: "/inicio",
        icono: "bi-house-fill",
        moduPadre: true,
        modPosicion: 1,
        subMenu: false,
        subMenuItems: [],
        tipoUser: "admin"
    },
    {
        id: "2",
        titulo: "Resoluciones",
        url: "/resoluciones",
        icono: "bi-filetype-docx",
        moduPadre: true,
        modPosicion: 2,
        subMenu: false,
        subMenuItems: [],
        tipoUser: "admin"
    },
    {
        id: "3",
        titulo: "Formatos",
        url: "/formatos",
        icono: "bi-file-post",
        moduPadre: true,
        modPosicion: 3,
        subMenu: false,
        subMenuItems: [],
        tipoUser: "admin"
    },
    {
        id: "4",
        titulo: "Plantillas",
        url: "/plantillas",
        icono: "bi-file-earmark-plus",
        moduPadre: true,
        modPosicion: 4,
        subMenu: false,
        subMenuItems: [],
        tipoUser: "admin"
    },
    {
        id: "5",
        titulo: "Documentos",
        url: "/documentos",
        icono: "bi-clipboard",
        moduPadre: true,
        modPosicion: 5,
        subMenu: false,
        subMenuItems: [],
        tipoUser: "admin"
    },
    {
        id: "6",
        titulo: "Reportes",
        icono: "bi-clipboard-data",
        moduPadre: true,
        modPosicion: 6,
        subMenu: true,
        tipoUser: "admin",
        subMenuItems: [
            {
                id: "1",
                titulo: "General",
                url: "/reportes/general",
                icono: "bi-archive",
                moduPadre: false,
                modPosicion: 1,
                subMenu: false,
                tipoUser: "admin",
            },
            {
                id: "2",
                titulo: "Filtros",
                url: "/reportes/filtros",
                icono: "bi-funnel",
                moduPadre: false,
                modPosicion: 2,
                subMenu: false,
                tipoUser: "admin",
            },
        ]
    },
    
]
