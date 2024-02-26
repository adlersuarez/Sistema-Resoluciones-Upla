import { Tooltip } from 'react-tooltip';
import { IconoToolTip } from '../buttons/IconoToolTip';
import { useEffect, useRef, useState } from 'react';
import TipoAsunto from '@/model/interfaces/tipo/tipoAsunto';
import { varAsuntoPrueba } from '@/helper/prueba.helper';
import toast from 'react-hot-toast';
import Asunto from '@/model/interfaces/tipo/asunto';
import { corregirGramatica, mejorarTexto } from '@/helper/open.ai.helper';
import { ButtonIconoToolTip } from '../buttons/ButtonIconoToolTip';
import { ProcesandoInformacion } from '@/component/ProcesandoInformacion';

interface AsuntoSeleccionadoProps {
    id: number
    idTipoAcuerdo: string | number
    nombreTipo: string
    asunto: string
    imagen: File | Blob | null

    editar: (id: number, nuevoAsunto: Asunto) => void
    eliminar: (id: number) => void
}

export const AsuntoSeleccionado: React.FC<AsuntoSeleccionadoProps> = ({ id, idTipoAcuerdo, nombreTipo, asunto, imagen, editar, eliminar }) => {

    //SELECT
    const [listaTipoAsuntos, setListaTipoAsuntos] = useState<TipoAsunto[]>([])

    //DATOS MOSTRAR
    const [mostrarDetalle, setMostrarDetalle] = useState<boolean>(false)
    const [checkImagenSelect, setCheckImagenSelect] = useState<boolean>(imagen != null ? true : false)
    const inputFileRef = useRef<HTMLInputElement>(null);

    //NUEVOS DATOS
    const [valorAsunto, setValorAsunto] = useState<string>(asunto)
    const [idTipoAsunto, setIdTipoAsunto] = useState<string | number>(idTipoAcuerdo)
    const [imagenFile, setImagenFile] = useState<File | Blob | null>(imagen)
    const [imagenURL, setImagenURL] = useState<string | null>(imagen ? URL.createObjectURL(imagen) : null)

    //console.log(imagen);

    const guardarCambios = () => {
        const tipoAsuntoSeleccionado = listaTipoAsuntos.find(tipo => tipo.idTipoAsunto == idTipoAsunto)?.tipoAsunto || '';

        const nuevoAsunto: Asunto = {
            idAsunto: id,
            idTipoAsunto: idTipoAsunto,
            asunto: valorAsunto,
            tipoAsunto: tipoAsuntoSeleccionado,
            imagen: imagenFile
        }

        editar(id, nuevoAsunto)
        toast.success('Acuerdo actualizado exitosamente')
        setMostrarDetalle(false)
        cancelarLimpiar()
    }

    const handelShowDetalle = () => {
        setMostrarDetalle(true)
    }

    const handleHideDetalle = () => {
        setMostrarDetalle(false)
        setIdTipoAsunto(idTipoAcuerdo)
        setValorAsunto(asunto)
        setImagenFile(imagen)
        setCheckImagenSelect(imagen != null ? true : false)
        setImagenURL(imagen ? URL.createObjectURL(imagen) : null)
        cancelarLimpiar()
    }

    //USANDO OPEN AI para los textos

    const [textoCorregido, setTextoCorregido] = useState<string | null>('')
    const [tituloCorreccion, setTituloCorreccion] = useState<string>('')
    const [estadoCorreccion, setEstadoCorreccion] = useState<boolean>(true)
    const [tipoCorrec, setTipoCorrec] = useState<number>(0)

    const corregirGramarTexto = async () => {
        setTipoCorrec(1)
        setEstadoCorreccion(true)
        const gramaticaCorregida = await corregirGramatica(valorAsunto);
        setTextoCorregido(gramaticaCorregida)
        setTituloCorreccion('Apoyo en Ortografía')
        setEstadoCorreccion(false)
    }

    const mejorarGramarTexto = async () => {
        setTipoCorrec(2)
        setEstadoCorreccion(true)
        const mejorarTextoOpen = await mejorarTexto(valorAsunto);
        setTextoCorregido(mejorarTextoOpen)
        setTituloCorreccion('Apoyo para Mejorar texto')
        setEstadoCorreccion(false)
    }

    const actualizarCorreccion = () => {
        setValorAsunto(textoCorregido ? textoCorregido : '')
        if (tipoCorrec == 1) {
            toast("Asunto corregido ortográficamente", { icon: 'ℹ️' })
        }
        if (tipoCorrec == 2) {
            toast("Asunto mejorado.", { icon: 'ℹ️' })
        }
    }

    const cancelarLimpiar = () => {
        setTipoCorrec(0)
        setEstadoCorreccion(true)
        setTextoCorregido('')
        setTituloCorreccion('')
    }

    //()=>GramticaCorregida(valorAsunto)
    useEffect(() => {
        setListaTipoAsuntos(varAsuntoPrueba)
    }, []);

    return (
        <div className='flex text-xs'>
            <div
                onClick={handelShowDetalle}
                role='button'
                data-tooltip-id={`asunto-mostrado-${id}-${idTipoAsunto}`}
                className={`p-1 px-2 text-white font-normal rounded-l-sm bg-upla-100`}>
                {nombreTipo}
            </div>
            <div className='bg-gray-300 hover:bg-gray-500 hover:text-white w-6 rounded-r-sm'>
                <button
                    onClick={() => eliminar(id)}
                    className='flex w-full h-full'>
                    <IconoToolTip
                        icon='bi-x-lg'
                        variant='error'
                        textTooltip='Quitar Acuerdo'
                        position='right'
                    />
                </button>
            </div>
            <Tooltip id={`asunto-mostrado-${id}-${idTipoAsunto}`} variant='light' opacity={1} className='border-2 border-upla-100' arrowColor='gray'>
                <div className='flex flex-col py-1 max-w-96 gap-1 max-h-80 overflow-hidden'>
                    <span className='font-bold uppercase text-upla-100 text-sm'>{nombreTipo}</span>
                    <span>{asunto}</span>
                    {/*<span className='text-center'>Click para Mostrar</span>*/}
                </div>
            </Tooltip>
            {
                //VISTRA PREVIA PARA EDITAR
                mostrarDetalle &&
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="w-1/2 bg-white rounded-lg">
                        <div className="flex flex-col p-4 gap-4">
                            <div className='flex justify-between gap-8'>
                                <h1 className='my-auto font-bold text-gray-400 text-xl tracking-wider'>ACTUALIZAR ACUERDO</h1>
                                <button
                                    className="flex text-sm bg-red-400 hover:bg-red-700 px-2 py-0.5 rounded-md text-white"
                                    onClick={handleHideDetalle}
                                >
                                    <span className='my-auto px-1'>x</span>
                                </button>
                            </div>

                            <div className='flex flex-col gap-8'>
                                <div className='flex gap-6 text-base'>

                                    <div className="w-full flex flex-col gap-4">
                                        <div className='flex flex-col'>

                                            <div className="flex bg-gray-500 rounded-t p-3 text-xs gap-2">
                                                <div className='flex justify-between w-full'>
                                                    <select
                                                        id='id_acuerdo'
                                                        name='id_acuerdo'
                                                        value={idTipoAsunto}
                                                        onChange={(e) => setIdTipoAsunto(e.target.value)}
                                                        className='border rounded-md px-4 border-gray-200 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 min-w-[40px] uppercase text-base font-bold text-gray-500'
                                                    >
                                                        <option value={0} disabled>Seleccione</option>
                                                        {
                                                            listaTipoAsuntos.map((item, index) => (
                                                                <option key={index} value={item.idTipoAsunto}>{item.tipoAsunto}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <div className='flex gap-3'>
                                                        <button className="focus:outline-none text-white hover:bg-gray-700  border rounded p-2 flex m-auto gap-2"
                                                            onClick={corregirGramarTexto}>
                                                            <i className="bi bi-pencil-square animate-pulse " /> Corregir Gramática
                                                        </button>
                                                        <button className="focus:outline-none text-white hover:bg-gray-700 border rounded p-2 flex m-auto gap-2"
                                                            onClick={mejorarGramarTexto}>
                                                            <i className="bi bi-lightbulb animate-pulse" /> Mejorar Texto
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='border-2 rounded-b-lg border-gray-400 flex'>
                                                <div className={` p-4 flex flex-col gap-2 ${tipoCorrec == 0 ? 'w-full' : 'w-1/2'}`}>
                                                    {
                                                        !estadoCorreccion &&
                                                        <div className='uppercase text-base font-bold text-gray-500'>
                                                            TEXTO ACTUAL
                                                        </div>
                                                    }

                                                    <textarea
                                                        id='acuerdo_tomado'
                                                        name='acuerdo_tomado'
                                                        value={valorAsunto}
                                                        onChange={(e) => setValorAsunto(e.target.value)}
                                                        className="text-sm p-0 resize-none min-h-60 h-full outline-none border-none focus:ring-blue-200 focus:ring-0"
                                                        placeholder="Ejm. APROBAR y poner en ejecución..."
                                                    />
                                                </div>
                                                {
                                                    tipoCorrec != 0 &&
                                                    <div className='bg-gray-50 w-1/2 p-4 flex flex-col gap-2 border-l-2 border-gray-400'>
                                                        {
                                                            !estadoCorreccion ?
                                                                <>
                                                                    <div className='uppercase text-base font-bold text-gray-500 flex justify-between'>
                                                                        {tituloCorreccion}
                                                                        <div className='flex gap-2'>
                                                                            <ButtonIconoToolTip
                                                                                onClick={actualizarCorreccion}
                                                                                classname=' text-white bg-gray-400 hover:bg-gray-600 rounded-sm px-2 py-0.5 text-xs'
                                                                                icon='bi-arrow-left-right'
                                                                                textTooltip='Actualizar texto'
                                                                                variant='info'
                                                                            />
                                                                            <ButtonIconoToolTip
                                                                                onClick={cancelarLimpiar}
                                                                                classname=' text-white bg-gray-400 hover:bg-red-500 rounded-none px-2 py-0.5 text-xs'
                                                                                icon='bi-trash'
                                                                                textTooltip='Cancelar ayuda'
                                                                                variant='error'
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                    <p className='text-sm'>
                                                                        {textoCorregido}
                                                                    </p>
                                                                </>
                                                                :
                                                                <div className='flex m-auto'>
                                                                    <ProcesandoInformacion />
                                                                </div>
                                                        }

                                                    </div>
                                                }

                                            </div>

                                        </div>

                                        <div className="w-full max-h-80 overflow-y-auto justify-between flex gap-8">
                                            <div className="font-bold flex flex-col justify-between h-10">
                                                <div className='flex gap-2'>
                                                    <input
                                                        id='agregar_imagen_refer'
                                                        name='agregar_imagen_refer'
                                                        className="h-5 w-5 text-gray-600 rounded border-gray-300 focus:outline-none focus:ring-0"
                                                        type="checkbox"
                                                        checked={checkImagenSelect}
                                                        onChange={(e) => {
                                                            setCheckImagenSelect(e.target.checked);
                                                            if (checkImagenSelect) {
                                                                setImagenFile(null);
                                                                setImagenURL(null);
                                                            }
                                                        }}
                                                    />
                                                    <label htmlFor='agregar_imagen_refer' className="mt-[-3px]">Imagen </label>
                                                </div>
                                            </div>
                                            <div className={`${!checkImagenSelect && 'hidden'}`}>
                                                <img
                                                    src={imagenURL ? imagenURL : ''}
                                                    alt="Imagen Acuerdo"
                                                    className={`w-full h-full rounded-lg cursor-pointer ${!imagenURL && 'hidden'}`}
                                                    onClick={() => inputFileRef.current?.click()}
                                                />
                                                <input
                                                    id='imagen_acuerdo'
                                                    name='imagen_acuerdo'
                                                    type="file"
                                                    accept=".png, .jpg, .jpeg"
                                                    className={`text-xs border rounded-lg bg-white border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 ${imagenURL && 'hidden'}`}
                                                    ref={inputFileRef}
                                                    onChange={(e) => {
                                                        const file = e.target.files && e.target.files[0];
                                                        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
                                                            setImagenFile(file)
                                                            setImagenURL(URL.createObjectURL(file))
                                                        } else {
                                                            setImagenFile(null)
                                                            setImagenURL(null)
                                                            if (file != undefined) {
                                                                toast.error('Por favor, seleccione un archivo de imagen PNG, JPG o JPEG.')
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className='flex gap-4 font-semibold justify-end'>
                                    <button
                                        onClick={handleHideDetalle}
                                        className='bg-red-400 hover:bg-red-600 px-4 py-2 rounded-lg text-white'>
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={guardarCambios}
                                        className='bg-green-400 hover:bg-green-600 px-4 py-2 rounded-lg text-white'>
                                        Guardar Cambios
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}