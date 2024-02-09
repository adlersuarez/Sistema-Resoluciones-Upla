
import Sede from "./sede/sede"
import ReportesInfo from "./trabajador/reportesInfo"

//Agregar más para listas
export default interface Listas {
    resultado: Sede[] | ReportesInfo[]
}