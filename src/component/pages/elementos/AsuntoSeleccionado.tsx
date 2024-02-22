import { Tooltip } from 'react-tooltip';
import { IconoToolTip } from '../buttons/IconoToolTip';
import { useEffect, useRef, useState } from 'react';
import TipoAsunto from '@/model/interfaces/tipo/tipoAsunto';
import { varAsuntoPrueba } from '@/helper/prueba.helper';
import toast from 'react-hot-toast';
import Asunto from '@/model/interfaces/tipo/asunto';

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

    //console.log(imagen)

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
    }

    useEffect(() => {
        setListaTipoAsuntos(varAsuntoPrueba)
    }, []);

    return (
        <div className='flex text-xs'>
            <div
                onClick={() => setMostrarDetalle(true)}
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
                        <div className="relative pt-14 p-4">
                            <button
                                className="flex absolute text-sm top-0 right-0 m-4 bg-red-500 hover:bg-red-700 px-2 py-0.5 rounded-md text-white"
                                onClick={() => setMostrarDetalle(false)}
                            >
                                <i className="bi bi-x mr-1 mt-0.5 my-auto" /> Cerrar
                            </button>
                            <div className='flex flex-col px-4 gap-8'>
                                <div className='flex gap-6 text-base'>
                                    <div className="font-bold flex flex-col justify-between">
                                        <select
                                            id='id_acuerdo'
                                            name='id_acuerdo'
                                            value={idTipoAsunto}
                                            onChange={(e) => setIdTipoAsunto(e.target.value)}
                                            className='w-54 h-10 border rounded-md px-4 border-gray-200 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 min-w-[150px] uppercase'
                                        >
                                            <option value={0} disabled>Seleccione</option>
                                            {
                                                listaTipoAsuntos.map((item, index) => (
                                                    <option key={index} value={item.idTipoAsunto}>{item.tipoAsunto}</option>
                                                ))
                                            }
                                        </select>
                                        <div className='flex gap-2'>
                                            <input
                                                id='agregar_imagen'
                                                name='agregar_imagen'
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
                                            <label htmlFor='agregar_imagen' className="mt-[-3px]">Imagen </label>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-4">
                                        <textarea
                                            id='acuerdo_tomado'
                                            name='acuerdo_tomado'
                                            value={valorAsunto}
                                            onChange={(e) => setValorAsunto(e.target.value)}
                                            className="w-full h-52 py-2 px-4 rounded-lg outline-none border-gray-200 focus:ring-blue-200 focus:ring-0 text-sm "
                                            placeholder="Ejm. acuerdo tomado"
                                        />
                                        <div className="w-full rounded-lg max-h-80 overflow-y-auto justify-end flex">

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

                                <div className='flex gap-4 font-semibold justify-end'>
                                    <button
                                        onClick={() => setMostrarDetalle(false)}
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