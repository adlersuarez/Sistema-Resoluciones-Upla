import { varPruebaResolucion } from "@/helper/prueba.helper";
import PersonaSelect from "@/model/interfaces/persona/seleccionado";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

interface EncargosIconProps {
    idLista: number
}

export const EncargosIcon: React.FC<EncargosIconProps> = ({ idLista }) => {

    /*
    export default interface PersonaSelect {
        idSeleccionado: number
        tipo: string | number
        codigo: string
        detalle: string
        titulo: string
        tipoGrupo: number
    }
        varPruebaResolucion
    */
    const [listado, setListado] = useState<PersonaSelect[]>([])

    const initListado = () => {
        const encontrado = varPruebaResolucion.find((item) => item.resolucionId == idLista)
        setListado(encontrado?.encargos ?? [])
    }

    useEffect(() => {
        initListado()
    }, [idLista])

    return (
        <span
            data-tooltip-id={`icono-lista-toltip-${idLista}`}
            className="text-upla-100 text-lg font-bold cursor-default" >
            {
                listado.length > 0 ?
                    <span>{listado.length} <i className="ml-2 bi bi-people-fill" /></span>
                    :
                    <span className="normal-case text-xs bg-red-200 font-medium rounded-md p-1 px-2 text-red-600">Ninguno registrado</span>
            }
            {
                listado.length > 0 &&
                <Tooltip id={`icono-lista-toltip-${idLista}`} variant='light' opacity={1} className='border-2 border-gray-400' arrowColor='gray'>
                    <div className="flex flex-col py-2 max-w-lg gap-2 max-h-80 overflow-y-auto bg-white">
                        <span className="font-bold uppercase text-upla-100 text-base tracking-wide bg-gray-100">
                            Lista de Encargos
                        </span>
                        <ul className="text-left normal-case font-normal">
                            {listado.map((item, index) => (
                                <li
                                    key={index}
                                    className="text-gray-700 text-sm leading-6 hover:text-upla-500 transition duration-200"
                                >
                                    <i className="bi bi-dot" /> {item.titulo}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Tooltip>
            }
        </span>
    );
}