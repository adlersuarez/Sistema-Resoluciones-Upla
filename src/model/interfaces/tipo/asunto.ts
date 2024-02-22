export default interface Asunto {
    idAsunto: number
    idTipoAsunto: string | number
    tipoAsunto: string
    asunto: string
    imagen: File | Blob | null
}
