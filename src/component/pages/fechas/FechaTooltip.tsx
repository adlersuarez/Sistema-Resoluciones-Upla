import { Tooltip } from 'react-tooltip';

interface FechaProps {
    codigo: number
    fecha: Date
}

export const FechaTooltip: React.FC<FechaProps> = ({ codigo, fecha }) => {

    //Eliminar hora si no tiene

    // Función para formatear la fecha en dd/mm/aaaa
    function formatDateToDDMMYYYY(date: Date | string): string {
        const parsedDate = typeof date === 'string' ? new Date(date) : date;

        const day = parsedDate.getDate();
        const month = parsedDate.getMonth() + 1; // ¡Recuerda que los meses van de 0 a 11!
        const year = parsedDate.getFullYear();

        return `${padNumber(day)}/${padNumber(month)}/${year}`;
    }

    // Función para formatear la fecha en dd de mm del aaaa hh:mm:ss
    function formatDateToCompleteString(date: Date | string): string {
        const parsedDate = typeof date === 'string' ? new Date(date) : date;

        const day = parsedDate.getDate();
        const month = parsedDate.toLocaleString('default', { month: 'long' });
        const year = parsedDate.getFullYear();
        const hours = padNumber(parsedDate.getHours());
        const minutes = padNumber(parsedDate.getMinutes());
        const seconds = padNumber(parsedDate.getSeconds());

        return `${day} de ${month} del ${year} ${hours}:${minutes}:${seconds}`;
    }

    // Función para añadir ceros a la izquierda si es necesario
    function padNumber(num: number): string {
        return num.toString().padStart(2, '0');
    }

    return (
        <div className='lowercase'>
            <span data-tooltip-id={`fecha-doc-${codigo}`}>
                {formatDateToDDMMYYYY(fecha)}
            </span>
            <Tooltip id={`fecha-doc-${codigo}`} content={formatDateToCompleteString(fecha)} opacity={0.8} place="bottom" />
        </div>
    )
}