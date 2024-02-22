import { Tooltip } from 'react-tooltip';
import { IconoToolTip } from '../buttons/IconoToolTip';

interface PersonaSeleccionadoProps {
    idSeleccionado: number
    tipo: string | number
    codigo: string
    detalle: string
    titulo: string

    onclick: (id: number) => void
}

export const PersonaSeleccionado: React.FC<PersonaSeleccionadoProps> = ({ idSeleccionado, tipo, codigo, detalle, titulo, onclick }) => {

    let tituloToShow = titulo;

    // Verificar si detalle tiene más de una palabra
    const palabras = titulo.split(' ');
    if (palabras.length > 1) {
        tituloToShow = palabras[0] + '...';
    }

    return (
        <div
            className='flex text-xs'>
            <div
                role='button'
                data-tooltip-id={`personal-mostrado-${idSeleccionado}-${codigo}`}
                className={`p-1 px-2 text-white font-normal rounded-l-sm ${tipo == 1 && 'bg-upla-100'} ${tipo == 2 && 'bg-orange-400'} ${tipo == 3 && 'bg-upla-50'}`}>
                {tituloToShow}
            </div>
            <div className='bg-gray-300 hover:bg-gray-500 hover:text-white w-6 rounded-r-sm'>
                <button
                    onClick={() => onclick(idSeleccionado)}
                    className='flex w-full h-full'>
                    <IconoToolTip
                        icon='bi-x-lg'
                        variant='error'
                        textTooltip='Quitar Personal'
                        position='right'
                    />
                </button>
            </div>
            <Tooltip id={`personal-mostrado-${idSeleccionado}-${codigo}`} variant='light' opacity={1} className='border-2 border-upla-100' arrowColor='gray'>
                <div className='flex flex-col py-1 max-w-80 gap-1 max-h-80 overflow-hidden'>
                    <span className='font-bold uppercase text-upla-100 text-xs'>{titulo}</span>
                    <span className='text-xs'>{detalle}</span>
                    {/*<span className='text-center'>Click para Mostrar</span>*/}
                </div>
            </Tooltip>
        </div>
    )
}