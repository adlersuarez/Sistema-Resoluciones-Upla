import { PlacesType, Tooltip, VariantType } from 'react-tooltip';

interface ButtonIconoProps {
    icon?: string
    onClick?: () => void;
    children?: React.ReactNode
    disabled?: boolean
    //Tooltip
    textTooltip?: string
    classname?: string
    variant?: VariantType | undefined
    position?: PlacesType | undefined

    iconPosition?: 'left' | 'right';
}

export const ButtonIconoToolTip: React.FC<ButtonIconoProps> = ({ icon, classname, textTooltip, variant, position, onClick, children, disabled, iconPosition = 'left' }) => {

    return (
        <button
            data-tooltip-id={`boton-icono-toltip-${textTooltip}`}

            disabled={disabled}
            className={`flex rounded-lg ${classname}`}
            onClick={onClick}
        >
            {iconPosition === 'left' && <i className={`my-auto bi ${icon}`} />} 
            {children}
            {iconPosition === 'right' && <i className={`my-auto bi ${icon}`} />}
            <Tooltip id={`boton-icono-toltip-${textTooltip}`} content={textTooltip} opacity={1} variant={variant} place={position} />
        </button>
    )
}