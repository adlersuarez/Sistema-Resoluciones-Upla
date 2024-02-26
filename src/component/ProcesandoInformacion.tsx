import { useEffect, useState } from "react";

export const ProcesandoInformacion = () => {
    const [dots, setDots] = useState(1);

    useEffect(() => {
        // Incrementa los puntos cada segundo
        const intervalId = setInterval(() => {
            setDots(prevDots => (prevDots < 3 ? prevDots + 1 : 1));
        }, 400);

        // Limpia el temporizador cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, []);

    const getDots = () => ' '.repeat(dots).replace(/./g, '.');


    return (
        <div className="flex flex-col gap-4  rounded-lg pb-4 pt-6 px-6 ">
            <div className="m-auto">
                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            </div>
            <div className="flex my-auto text-sm text-gray-600 animate-pulse">
                Procesando información
                <span className="w-4">
                    {getDots()}
                </span>
            </div>
        </div>
    )
}