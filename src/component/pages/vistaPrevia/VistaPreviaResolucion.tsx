import { corregirTexto } from "@/helper/herramienta.helper"
import { varPruebaDescrOficina, varPruebaDescrPersonal } from "@/helper/prueba.helper"
import Documento from "@/model/interfaces/documento/documento"
import PersonaSelect from "@/model/interfaces/persona/seleccionado"
import Asunto from "@/model/interfaces/tipo/asunto"
import { ButtonIconoToolTip } from "../buttons/ButtonIconoToolTip"
import { useState } from "react"
import { OrdenarEncargos } from "../ordenar/OrdenarEncarrgos"
import { OrdenarDocumentos } from "../ordenar/OrdenarDocumentos"
import { OrdenarAsuntos } from "../ordenar/OrdenarAsuntos"

interface VistaPreviaProps {
    //PASO 1
    fecha: string
    numero: string | number
    tipoResolucion: string | number

    //PASO 2
    listaDocSelect: Documento[]
    //PASO 3
    listaAcuerdoSelect: Asunto[]
    //Paso 4
    listaPersonSelect: PersonaSelect[]

    //Visualizacion
    show: boolean
    close: () => void

    //ORDER PERSON
    onReorderDoc: (newList: Documento[]) => void
    onReorderAsunt: (newList: Asunto[]) => void
    onReorderPer: (newList: PersonaSelect[]) => void
}

export const VistaPreviaResolucion: React.FC<VistaPreviaProps> = ({ fecha, numero, tipoResolucion, listaDocSelect, listaAcuerdoSelect, listaPersonSelect, show, close, onReorderDoc, onReorderAsunt, onReorderPer }) => {

    const [showOrderDoc, setShowOrderDoc] = useState<boolean>(false)
    const openOrderDoc = () => {
        setShowOrderDoc(true)
    }
    const closeOrderDoc = () => {
        setShowOrderDoc(false)
    }
    const [showOrderAsunt, setShowOrderAsunt] = useState<boolean>(false)
    const openOrderAsunt = () => {
        setShowOrderAsunt(true)
    }
    const closeOrderAsunt = () => {
        setShowOrderAsunt(false)
    }
    const [showOrderPer, setShowOrderPer] = useState<boolean>(false)
    const openOrderPer = () => {
        setShowOrderPer(true)
    }
    const closeOrderPer = () => {
        setShowOrderPer(false)
    }

    const obtenerNombreTipoResolucion = (tipoResolucion: number | string): string => {
        switch (tipoResolucion) {
            case '1':
                return "Asamblea Universitaria"
            case '2':
                return "Rectorado"
            case '3':
                return "Consejo Universitario"
            default:
                return ""
        }
    }

    const generarCodigoResolucion = (numero: string | number, fecha: string, tipoResolucion: number | string): string => {
        // Convertir el número a cadena de texto y formatearlo con ceros a la izquierda si es necesario
        const numeroFormateado = String(numero).padStart(4, '0');

        // Obtener el año de la fecha
        const año = new Date(fecha).getFullYear().toString();

        // Obtener el acrónimo del tipo de resolución
        let acronimo = '';
        if (tipoResolucion == 1) {
            acronimo = 'AU';
        } else if (tipoResolucion == 2) {
            acronimo = 'R';
        } else if (tipoResolucion == 3) {
            acronimo = 'CU';
        }

        // Concatenar las partes del código
        const codigo = numeroFormateado + '-' + año + '-' + acronimo
        return codigo;
    }

    const formatoFechaResolucion = (fecha: string): string => {
        const fechaObjeto = new Date(fecha)
        const año = fechaObjeto.getUTCFullYear()
        const mes = fechaObjeto.getUTCMonth() + 1 // Los meses van de 0 a 11, por lo que sumamos 1
        const dia = fechaObjeto.getUTCDate() //getUTC Format

        // Asegurarnos de que el mes y el día tengan dos dígitos
        const mesFormateado = mes < 10 ? '0' + mes : mes
        const diaFormateado = dia < 10 ? '0' + dia : dia

        return `${año}.${mesFormateado}.${diaFormateado}`
    }

    const generarTextoDocumento = (documentos: Documento[], fecha: string, tipoResolucion: string | number): string => {
        const oficios = documentos.filter(doc => doc.tipoDoc === 1);
        const proveidos = documentos.filter(doc => doc.tipoDoc === 2);
        const fechaFormateada = formatoFechaResolucion(fecha || '');

        const textoOficios = oficios.length > 1 ? 'Los Oficios' : 'El Oficio';
        const textoProveidos = proveidos.length > 1 ? 'los Proveídos' : 'el Proveído';

        const textoOficiosLista = oficios.map(doc => doc.documento).join(', ');
        const textoProveidosLista = proveidos.map(doc => doc.documento).join(', ');

        const textoFinal = `${textoOficios} ${textoOficiosLista}, y ${textoProveidos} ${textoProveidosLista} y el acuerdo de ${obtenerNombreTipoResolucion(tipoResolucion)} en Sesión extraordinaria de fecha ${fechaFormateada}, respectivamente.`;
        return textoFinal;
    }

    const generarTextoEncargo = (seleccionados: PersonaSelect[]): string => {
        const encargosPorTipo: { [key: string]: { descripcion: string, titulos: string[] } } = {}; // Objeto para almacenar los encargos por tipo
        const encargos: string[] = [];

        seleccionados.forEach(seleccion => {
            let descripcion: string = '';
            let titulo: string = '';

            if (seleccion.tipo === 1) {
                const oficina = varPruebaDescrOficina.find(of => of.tipoEnte === seleccion.tipoGrupo);
                if (oficina) {
                    if (!encargosPorTipo[oficina.descrEnte]) {
                        encargosPorTipo[oficina.descrEnte] = { descripcion: '', titulos: [] }; // Inicializa el objeto si no existe
                    }
                    if (encargosPorTipo[oficina.descrEnte].titulos.length === 0) {
                        descripcion = `${oficina.artPer} ${oficina.descrEnte.charAt(0).toUpperCase() + oficina.descrEnte.slice(1)}`;
                    } else {
                        descripcion = `${oficina.artPluralPer} ${oficina.descrPluralEnte.charAt(0).toUpperCase() + oficina.descrPluralEnte.slice(1)}`;
                    }
                    encargosPorTipo[oficina.descrEnte].descripcion = descripcion;
                    titulo = seleccion.titulo.split(' ').slice(1).join(' '); // Quita la primera palabra del título
                    encargosPorTipo[oficina.descrEnte].titulos.push(titulo);
                }
            } else if (seleccion.tipo === 2) {
                const personal = varPruebaDescrPersonal.find(per => per.tipoPer === seleccion.tipoGrupo);
                if (personal) {
                    if (!encargosPorTipo[personal.descrPer]) {
                        encargosPorTipo[personal.descrPer] = { descripcion: '', titulos: [] }; // Inicializa el objeto si no existe
                    }
                    if (encargosPorTipo[personal.descrPer].titulos.length === 0) {
                        descripcion = `${personal.artPer} ${personal.descrPer.charAt(0).toUpperCase() + personal.descrPer.slice(1)}`;
                    } else {
                        descripcion = `${personal.artPluralPer} ${personal.descrPluralPer.charAt(0).toUpperCase() + personal.descrPluralPer.slice(1)}`;
                    }
                    encargosPorTipo[personal.descrPer].descripcion = descripcion;
                    titulo = seleccion.titulo.split(' ').slice(1).join(' '); // Quita la primera palabra del título
                    encargosPorTipo[personal.descrPer].titulos.push(titulo);
                }
            }
        });

        // Generar el mensaje para cada tipo
        for (const tipo in encargosPorTipo) {
            if (encargosPorTipo.hasOwnProperty(tipo)) {
                const encargoTipo = encargosPorTipo[tipo];
                if (encargoTipo.titulos.length > 1) {
                    // Si hay más de un encargo del mismo tipo, utilizar artículo en plural y separar con comas
                    encargos.push(`${encargoTipo.descripcion} ${encargoTipo.titulos.join(', ')}`);
                } else {
                    // Si solo hay un encargo del tipo, utilizar artículo en singular
                    encargos.push(`${encargoTipo.descripcion} ${encargoTipo.titulos[0]}`);
                }
            }
        }

        encargos.push("y demás Instancias Académicas y Administrativas, el cumplimiento de la presente Resolución.");

        return corregirTexto(encargos.join(', '));
    };


    if (!show) {
        return null; // Si show es false, no renderiza nada
    }

    //console.log(listaDocSelect)

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            {showOrderDoc && <OrdenarDocumentos listaDocumentoSeleccion={listaDocSelect} onReorder={onReorderDoc} close={closeOrderDoc} />}
            {showOrderAsunt && <OrdenarAsuntos listaAsuntoSeleccion={listaAcuerdoSelect} onReorder={onReorderAsunt} close={closeOrderAsunt} />}
            {showOrderPer && <OrdenarEncargos listaPersonaSeleccion={listaPersonSelect} onReorder={onReorderPer} close={closeOrderPer} />}

            <div className="w-5/12 bg-white rounded-lg">
                <div className="relative p-4">
                    <div className='flex flex-col gap-4 w-full'>
                        <div className='flex gap-6 text-base w-full bg-gray-50'>
                            <div className="flex flex-col justify-between w-full">
                                {/* EMPIEZA LA MODIFICACIÓN */}
                                <div className='max-h-[800px] w-full border-black border-[1px] p-2 overflow-x-hidden max-[800px]:overflow-y-auto flex flex-col gap-4'>
                                    {/* TÍTULO */}
                                    <div className='pt-2 flex flex-col'>
                                        <span className="uppercase font-semibold text-xl text-center">
                                            {
                                                (numero && fecha && tipoResolucion) ?
                                                    <span>
                                                        RESOLUCIÓN DE {obtenerNombreTipoResolucion(tipoResolucion)} N° {generarCodigoResolucion(numero, fecha, tipoResolucion)}
                                                    </span>
                                                    :
                                                    <span className="bg-red-400 text-white text-sm px-8 py-1 rounded font-normal normal-case">
                                                        <i className="animate-ping inline-flex h-2 w-2 rounded-full bg-white opacity-75 mr-4" />
                                                        Por favor completa todos los <strong>DATOS GENERALES</strong> para obtener el título
                                                    </span>
                                            }

                                        </span>
                                        <div className='my-2 text-right text-sm'>
                                            <span>Huancayo, {formatoFechaResolucion(fecha)}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col px-2 bg-green-100 gap-2">
                                        <div className="text-sm">
                                            <strong> VISTOS:</strong>
                                        </div>
                                        {
                                            listaDocSelect.length != 0 ?
                                                <div className='text-xs'>
                                                    <p>
                                                        {generarTextoDocumento(listaDocSelect, fecha, tipoResolucion)}
                                                    </p>
                                                </div>
                                                :
                                                <span className="bg-red-400 text-white text-sm px-2 py-1 rounded font-normal normal-case text-center">
                                                    <i className="animate-ping inline-flex h-2 w-2 rounded-full bg-white opacity-75 mr-4" />
                                                    Seleccione los <strong>DOCUMENTOS</strong> necesarios que serán agregados a los <strong>VISTOS</strong>
                                                </span>
                                        }
                                    </div>

                                    <div className="flex flex-col px-2 bg-orange-100">
                                        <div className="text-sm">
                                            <strong> CONSIDERANDO:</strong>
                                        </div>
                                        {
                                            listaDocSelect.length != 0 ?
                                                <div className="grid grid-cols-12 text-xs">
                                                    <div className='col-span-1 flex pr-3 p-1'>
                                                        <ButtonIconoToolTip
                                                            onClick={openOrderDoc}
                                                            classname="bg-white hover:bg-gray-400 tracking-widest text-gray-400 hover:text-white font-semibold flex justify-center items-center w-full h-full overflow-hidden rounded border-dashed border-2 border-gray-400 hover:border-none"
                                                            icon={'bi-list-ol'}
                                                            textTooltip={'Ordenar los Documentos'}
                                                            variant="warning"
                                                        />
                                                    </div>
                                                    <div className="col-span-11 flex flex-col gap-2">
                                                        {
                                                            listaDocSelect.map((item, index) => {
                                                                return (
                                                                    <div className='text-left' key={index}>
                                                                        {item.considerandoDoc}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                <span className="bg-red-400 text-white text-sm px-2 py-1 rounded font-normal normal-case text-center">
                                                    <i className="animate-ping inline-flex h-2 w-2 rounded-full bg-white opacity-75 mr-4" />
                                                    Seleccione los <strong>DOCUMENTOS</strong> necesarios que requieren un <strong>CONSIDERANDO</strong>
                                                </span>
                                        }

                                    </div>

                                    <div className="flex flex-col px-2 bg-blue-100 gap-2">
                                        <div className="text-sm">
                                            <strong> SE RESUELVE:</strong>
                                        </div>

                                        {
                                            listaAcuerdoSelect.length != 0 &&
                                            <div className="grid grid-cols-12 text-xs">
                                                <div className='col-span-1 flex pr-3 p-1'>
                                                    <ButtonIconoToolTip
                                                        onClick={openOrderAsunt}
                                                        classname="bg-white hover:bg-gray-400 tracking-widest text-gray-400 hover:text-white font-semibold flex justify-center items-center w-full h-full overflow-hidden rounded border-dashed border-2 border-gray-400 hover:border-none"
                                                        icon={'bi-list-ol'}
                                                        textTooltip={'Ordenar los Acuerdos'}
                                                        variant="warning"
                                                    />
                                                </div>

                                                <div className="col-span-11 flex flex-col gap-2">
                                                    {
                                                        listaAcuerdoSelect.map((item, index) => {

                                                            return (
                                                                <div className='grid grid-cols-12' key={index}>

                                                                    <div className='col-span-1'>
                                                                        <strong>Art. {index + 1}°</strong>
                                                                    </div>
                                                                    <div className='col-span-11 flex flex-col gap-2'>
                                                                        <div className="justify-left">
                                                                            <strong className="uppercase">{item.tipoAsunto}</strong>  {item.asunto}
                                                                        </div>

                                                                        {
                                                                            item.imagen &&
                                                                            <div className='border border-gray-400'>
                                                                                <img src={`${URL.createObjectURL(item.imagen)}`} style={{/* width: '100%', height: asunto.altura + "px" */ }} />
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        })

                                                    }
                                                </div>

                                            </div>
                                        }

                                        {
                                            listaPersonSelect.length != 0 ?
                                                <div className='grid grid-cols-12 text-xs' >
                                                    <div className='col-span-1 flex flex-row'>
                                                        <div className='col-span-1 flex pr-3 p-1 w-full'>
                                                            <ButtonIconoToolTip
                                                                onClick={openOrderPer}
                                                                classname="bg-white hover:bg-gray-400 tracking-widest text-gray-400 hover:text-white font-semibold flex justify-center items-center w-full h-full overflow-hidden rounded border-dashed border-2 border-gray-400 hover:border-none"
                                                                icon={'bi-list-ol'}
                                                                textTooltip={'Ordenar los Encargos'}
                                                                variant="info"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-span-1'>
                                                        <strong>Art. {listaAcuerdoSelect.length + 1}°</strong>
                                                    </div>
                                                    <div className='col-span-10 flex flex-col gap-2'>
                                                        <div className="justify-left">
                                                            <strong className="uppercase">ENCARGAR</strong>  {generarTextoEncargo(listaPersonSelect)}
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <span className="bg-red-400 text-white text-sm px-2 py-1 rounded font-normal normal-case text-center">
                                                    <i className="animate-ping inline-flex h-2 w-2 rounded-full bg-white opacity-75 mr-4" />
                                                    Seleccione al <strong>PERSONAL</strong> al que se le encargará el <strong>CUMPLIMIENTO</strong> de la presente Resolución
                                                </span>
                                        }

                                        <div className='grid grid-cols-12 text-xs' >
                                            <div className='col-span-1 flex flex-row'>
                                            </div>
                                            <div className='col-span-1'>
                                                <strong>Art. {listaAcuerdoSelect.length + 2}°</strong>
                                            </div>
                                            <div className='col-span-10 flex flex-col gap-2'>
                                                <div className="justify-left">
                                                    <strong className="uppercase">TRANSCRIBIR</strong> la presente Resolución a las Oficinas correspondientes para su conocimiento y fines pertinentes.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='flex gap-4 font-semibold justify-end'>
                            {/*<button
                                onClick={() => close()}
                                className='bg-red-400 hover:bg-red-600 px-4 py-2 rounded-lg text-white'>
                                Cancelar
                            </button>*/}
                            <button
                                onClick={() => close()}
                                className='bg-green-400 hover:bg-green-600 px-4 py-2 rounded-lg text-white'>
                                Hecho
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}