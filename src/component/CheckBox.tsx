interface CheckBoxProps {
    selected: number | string
    valor: number | string
    label: string
    change: (e: string | number) => void
}

const CheckBox: React.FC<CheckBoxProps> = ({ valor, selected, label, change }) => {

    return (
        <div className="flex items-center"
            onClick={() => (valor === selected ? change(0) : change(valor))}
        >
            <div className="mr-2 cursor-pointer">
                <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${valor === selected && 'bg-blue-500'}`}></div>
                </div>
            </div>
            <div className="cursor-pointer">{label}</div>
        </div>
    )
}

export default CheckBox