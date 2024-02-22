
import { useEffect, useRef } from 'react';
import { Tooltip } from 'react-tooltip';

interface TextoLargoProps {
    codigo: number
    texto: string
}

export const TextoLargoTooltip: React.FC<TextoLargoProps> = ({ codigo, texto }) => {

    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const spanElement = spanRef.current;
        if (spanElement) {
            const lineHeight = parseInt(window.getComputedStyle(spanElement).lineHeight || '0');
            const maxLines = 3;
            const totalHeight = lineHeight * maxLines;
            const ellipsis = ' ...';

            if (spanElement.offsetHeight > totalHeight) {

                const words = texto.split(' ');
                let shortenedText = '';
                let lineCount = 0;

                for (const word of words) {
                    if (lineCount < maxLines) {
                        shortenedText += word + ' ';
                        const spanWithText = shortenedText + ellipsis;
                        spanElement.innerText = spanWithText;
                        if (spanElement.offsetHeight > totalHeight) {
                            let aux = shortenedText.split(" ")
                            aux.splice(-2)
                            shortenedText = aux.join(" ").trim();
                            spanElement.innerText = shortenedText + ellipsis;
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    }, [texto]);

    return (
        <div className='flex overflow-hidden'>
            <span
                data-tooltip-id={`texto-largo-${codigo}`}
                ref={spanRef}
                //className="normal-case block w-full overflow-hidden overflow-ellipsis max-lines-3"
                //style={style}
                className="normal-case block w-full text-justify">
                {texto}
            </span>

            <Tooltip
                id={`texto-largo-${codigo}`}
                opacity={1}
                place="bottom"
            >
                <div className='w-64 normal-case text-left'>
                    {texto}
                </div>
            </Tooltip>
        </div>
    )
}