import { TitlePages } from '@/component/pages/titulos/TituloPagina';
import { RootState } from '../../../store/configureStore.store';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { LoaderSvg } from '@/component/Svg.component';
import { useNavigate } from 'react-router-dom';
import { varPruebaResolucion } from '@/helper/prueba.helper';
import { Resolucion } from '@/model/interfaces/resolucion/resolucion';
import { EncargosIcon } from '@/component/pages/listado/EncargosIcon';
import { formatDateResolucion } from '@/helper/herramienta.helper';

const Resoluciones = () => {

    const dispatch = useDispatch()
    // const sweet = useSweerAlert();
    const navigate = useNavigate()

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const [loadResoluciones, setLoadResoluciones] = useState<boolean>(true)
    const [listaResoluciones, setListaResoluciones] = useState<Resolucion[]>([])

    const [activeButton, setActiveButton] = useState<number>(1)

    const [filterText, setFilterText] = useState<string>('')

    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber);
    };

    const ResolucionesListar = async () => {
        setLoadResoluciones(true)
        // Añadir un delay de 2 segundos directamente en la función
        // await new Promise(resolve => setTimeout(resolve, 2000));

        setListaResoluciones(varPruebaResolucion)
        setLoadResoluciones(false)
    }

    useEffect(() => {
        ResolucionesListar()
    }, [])


    return (
        <div className='flex flex-col gap-8'>
            <div className='w-full flex justify-between'>
                <TitlePages
                    texto={'RESOLUCIONES'}
                    icono={'bi-file-text-fill'}
                />
                <div className='flex justify-between gap-4'>
                    <button onClick={() => navigate('registrar')} className='flex gap-2 bg-green-400 hover:bg-green-500 text-white px-4 p-2 rounded'>
                        <i className="m-auto bi bi-plus-circle" />
                        <span className='m-auto'>Nueva Resolución</span>
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                    <div className='bg-yellow-200 flex'>
                        <button className={`${activeButton === 1 ? 'bg-orange-400 border-orange-400 text-white' : 'bg-white border-white border-b-gray-300'} my-auto flex px-4 p-2 gap-3 border-2 `}
                            onClick={() => handleButtonClick(1)}
                        >
                            <span className='m-auto animate-ping w-2 h-2 rounded-full bg-white' />
                            Generado
                        </button>
                        <button className={`${activeButton === 2 ? 'bg-green-400 border-green-400 text-white' : 'bg-white border-white border-b-gray-300'} my-auto flex px-4 p-2 gap-3 border-2`}
                            onClick={() => handleButtonClick(2)}
                        >
                            <span className='m-auto animate-ping w-2 h-2 rounded-full bg-white' />
                            Firmados
                        </button>
                    </div>
                    <div className='flex gap-2'>
                        <div className="relative rounded-lg flex items-center w-80">
                            <input
                                type="text"
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="py-2 px-4 pr-12 rounded-lg outline-none border-gray-200 focus:ring-blue-300 focus:ring-0 w-full text-black cursor-text"
                                placeholder="Número de Resolución"
                                style={{ caretColor: 'black !important' }}
                            />
                            <button
                                className="absolute inset-y-0 right-0 flex items-center px-4 bg-gray-200 hover:bg-gray-300 text-[10px] rounded-r-lg my-0.5 mr-0.5"
                            >
                                <i className="bi bi-search" />
                            </button>
                        </div>
                        <div className='flex'>
                            <button className='flex bg-blue-500 hover:bg-blue-700 text-white my-auto gap-2 px-3 p-2 rounded-lg'>
                                <i className="bi bi-funnel" />
                                Filtro
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <table className="text-gray-700 uppercase bg-upla-100 border table-auto w-full" id="miTabla">
                        <thead className="align-bottom">
                            <tr className="font-bold text-center uppercase text-xs text-white">
                                <th className="px-6 py-2 align-middle">Resolución</th>
                                <th className="px-6 py-2 align-middle">Tipo</th>
                                <th className="px-6 py-2 align-middle">Fecha</th>
                                <th className="px-6 py-2 align-middle">Vista Previa</th>
                                <th className="px-6 py-2 align-middle">Usuarios</th>
                                <th className="px-6 py-2 align-middle">Documento</th>
                                <th className="px-6 py-2 align-middle">Cargar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loadResoluciones ?
                                    (
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={7} className="text-sm p-2 border-b border-solid">
                                                <div className="flex items-center justify-center">
                                                    <div className="flex gap-2">
                                                        <LoaderSvg />
                                                        <span>Cargando datos...</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    :
                                    (
                                        listaResoluciones.length == 0 ?
                                            (
                                                <tr className="text-center bg-white border-b">
                                                    <td colSpan={7} className="text-sm p-2  border-b border-solid">
                                                        No hay datos para mostrar.
                                                    </td>
                                                </tr>
                                            )
                                            :
                                            (
                                                listaResoluciones.map((item, index) => {

                                                    return (
                                                        <tr key={index} className={`${index % 2 == 0 ? 'bg-white' : 'bg-blue-100'} border-b`}>
                                                            <td className="text-xs p-2 px-4 text-left align-middle border-b border-solid">
                                                                {item.resolucionNombre}
                                                            </td>
                                                            <td className="text-xs p-2 px-4 text-center align-middle border-b border-solid font-semibold">
                                                                {item.tipoResolucion}
                                                            </td>
                                                            <td className="text-xs p-2 text-center align-middle border-b border-solid normal-case font-semibold">
                                                                {formatDateResolucion(item.resolucionFecha)}
                                                            </td>
                                                            <td className="text-xs p-2 text-center align-middle border-b border-solid">
                                                                <button className='bg-green-400 hover:bg-green-600 hover:scale-105 px-2 py-1 text-base rounded-md text-white'
                                                                    onClick={() => { }}>
                                                                    <i className="bi bi-eye" />
                                                                </button>
                                                            </td>
                                                            <td className="text-xs p-2 text-center align-middle border-b border-solid">
                                                                <EncargosIcon
                                                                    idLista={item.resolucionId}
                                                                />
                                                            </td>
                                                            <td className="text-xs p-2 px-0 text-center align-middle border-b border-solid">
                                                                <button className='bg-blue-500 hover:bg-blue-800 hover:scale-105 px-2 py-1 text-base rounded-md text-white'
                                                                    onClick={() => { }}>
                                                                    <i className="bi bi-file-earmark-word mr-1" /> <span className='text-xs'>Descargar</span>
                                                                </button>
                                                            </td>
                                                            <td className="text-xs p-2 px-0 text-center align-middle border-b border-solid">
                                                                <button className='bg-red-500 hover:bg-red-800 hover:scale-105 px-2 py-1 text-base rounded-md text-white'
                                                                    onClick={() => { }}>
                                                                    <i className="bi bi-file-earmark-arrow-up-fill mr-1" /> <span className='text-xs'>Documento firmado</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )

                                    )
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Resoluciones