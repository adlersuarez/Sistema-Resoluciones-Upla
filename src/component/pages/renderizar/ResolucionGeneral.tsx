import * as Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import Documento from "@/model/interfaces/documento/documento";
import Asunto from "@/model/interfaces/tipo/asunto";


export const generarDocumento = async (documentos: Documento[], asuntos: Asunto[]): Promise<void> => {
    // Cargar la plantilla
    const response = await fetch('/plantilla/plantilla-resolucion.docx');

    const contenidoPlantilla = await response.arrayBuffer();
    const zip = new PizZip(contenidoPlantilla);
    const doc = new Docxtemplater()
    doc.loadZip(zip)


    // Procesar la plantilla con los datos
    const datos = {
        titulo: 'TITULO AQUI',
        fecha: '2024-02-13',
        visto: 'HOLA',
        considerandos: documentos,
        asuntos: asuntos
    }
  
    doc.render(datos)

    // Generar el documento final
    const buffer = doc.getZip().generate({ type: 'blob' })

    // Crear un objeto URL para el blob generado
    const blobURL = URL.createObjectURL(buffer)

    // Crear un enlace de descarga y simular un clic en él para iniciar la descarga del archivo
    const link = document.createElement('a')
    link.href = blobURL
    link.download = 'documentoSalida.docx'
    document.body.appendChild(link)
    link.click()

    // Limpiar el objeto URL creado
    URL.revokeObjectURL(blobURL)
}