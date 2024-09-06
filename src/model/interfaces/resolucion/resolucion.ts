import Documento from "../documento/documento"
import PersonaSelect from "../persona/seleccionado"
import Asunto from "../tipo/asunto"

export interface Resolucion {
    resolucionId: number
    resolucionNumero: number
    resolucionNombre: string
    resolucionUrl: string
    resolucionFecha: string

    tipoResolucionId: number
    tipoResolucion: string

    tipoSesionId: number
    tipoSesion: string

    considerando: Considerando
    documentos: Documento[]
    asuntos: Asunto[]
    encargos: PersonaSelect[]
}

export interface Considerando {
    considerandoId: number
    considerandoDescripcion: string
}