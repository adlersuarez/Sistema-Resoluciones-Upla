import { Tooltip } from 'react-tooltip';
import { IconoToolTip } from '../buttons/IconoToolTip';

interface DocumentoSeleccionadoProps {
    id: number
    tipoDoc: number
    documento: string
    considerando: string
    onclick: (id: number) => void
}

export const DocumentoSeleccionado: React.FC<DocumentoSeleccionadoProps> = ({ id, tipoDoc, documento, considerando, onclick }) => {


    return (
        <div className='flex text-xs'>
            <div
                role='button'
                data-tooltip-id={`considerando-mostrado-${id}-${tipoDoc}`}
                className={`p-1 px-2 text-white font-normal rounded-l-sm ${tipoDoc == 1 && 'bg-cyan-500'} ${tipoDoc == 2 && 'bg-green-400'}`}>
                {documento}
            </div>
            <div className='bg-gray-300 hover:bg-gray-500 hover:text-white w-6 rounded-r-sm'>
                <button
                    onClick={() => onclick(id)}
                    className='flex w-full h-full'>
                    <IconoToolTip
                        icon='bi-x-lg'
                        variant='error'
                        textTooltip='Quitar Documento'
                        position='right'
                    />
                </button>
            </div>
            <Tooltip id={`considerando-mostrado-${id}-${tipoDoc}`} variant='light' opacity={1} className='border-2 border-upla-100' arrowColor='gray'>
                <div className='flex flex-col py-1 max-w-80 gap-1 max-h-80 overflow-hidden'>
                    <span className='font-bold uppercase text-upla-100 text-sm'>{documento}</span>
                    <span className='text-xs'>{considerando}</span>
                    {/*<span className='text-center'>Click para Mostrar</span>*/}
                </div>
            </Tooltip>
        </div>
    )
}