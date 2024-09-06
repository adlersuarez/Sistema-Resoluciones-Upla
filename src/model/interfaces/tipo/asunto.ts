export default interface Asunto {
    asuntoId: number
    tipoAsuntoId: string | number
    tipoAsunto: string
    asuntoDescripcion: string

    asuntoUrlImagen: string
    asuntoImagen: File | Blob | null
}