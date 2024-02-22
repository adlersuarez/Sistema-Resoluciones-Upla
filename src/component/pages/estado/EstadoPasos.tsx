
//import { Tooltip } from 'react-tooltip';

interface EstadoPasosProps {
    steps: any[]
}

export const EstadoPasos: React.FC<EstadoPasosProps> = ({ steps }) => {

    return (
        <div className='flex text-gray-400 gap-4 my-auto'>
            {steps.map((step, index) => (
                <div key={index}
                    className={`rounded-full h-10 w-10 flex items-center justify-center border-2 text-lg font-semibold
                    ${step ? 'bg-green-400 border-green-400 text-white' : 'border-gray-300'}`}>
                    {step ?
                        <span>
                            <i className="bi bi-check-lg text-xl" />
                        </span>
                        :
                        <span>
                            {index + 1}
                        </span>
                    }
                </div>
            ))}
        </div>
    )
}