import { useNavigate } from "react-router-dom"
import { Tooltip } from 'react-tooltip';

interface TitleProps {
    texto: string
    icono?: string
}

export const TitlePages: React.FC<TitleProps> = ({ texto, icono }) => {

    const navigate = useNavigate()

    return (
        <div className='flex text-gray-400 gap-4'>
            <span onClick={() => navigate(-1)}
                data-tooltip-id="retroceder"
                role="button"
                className="text-upla-100 my-auto text-2xl">
                <i className="bi bi-arrow-left-circle-fill " />
            </span>

            <Tooltip id="retroceder" content="Atrás" opacity={0.8} variant="warning" place="top"/>

            <span className='flex text-3xl font-bold gap-3'>
                {texto.toUpperCase()}
                {icono && <i className={`bi ${icono}`} />}
            </span>
        </div>
    )
}