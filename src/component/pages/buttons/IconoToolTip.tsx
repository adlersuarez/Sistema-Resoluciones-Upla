import { PlacesType, Tooltip, VariantType } from 'react-tooltip';

interface IconoToolTipProps {
    icon: string
    textTooltip: string
    classname?: string
    variant?: VariantType | undefined
    position?: PlacesType | undefined
}

export const IconoToolTip: React.FC<IconoToolTipProps> = ({ icon, classname, textTooltip, variant, position }) => {

    return (
        <div className='m-auto'>
            <span
                data-tooltip-id={`icono-toltip-${textTooltip}`}

                className={`${classname}`}>
                <i className={`bi ${icon}`} />
            </span>

            <Tooltip id={`icono-toltip-${textTooltip}`} content={textTooltip} opacity={1} variant={variant} place={position} />

        </div>
    )
}