import Asunto from '@/model/interfaces/tipo/asunto';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ListaAsuntoSeleccionProps {
    listaAsuntoSeleccion: Asunto[]
    onReorder: (newList: Asunto[]) => void
    close: () => void
}

export const OrdenarAsuntos: React.FC<ListaAsuntoSeleccionProps> = ({ listaAsuntoSeleccion, onReorder, close }) => {
    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return
        }

        const items = Array.from(listaAsuntoSeleccion)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        onReorder(items)
    }

    console.log(listaAsuntoSeleccion)

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className=" bg-white rounded-lg">
                <div className="flex flex-col p-4 gap-4">
                    <div className='flex justify-between gap-8'>
                    <h1 className='my-auto font-bold text-gray-400 text-xl tracking-wider'>ORDENAR ACUERDOS</h1>
                        <button
                            className="flex text-sm bg-green-500 hover:bg-green-700 px-2 py-0.5 rounded-md text-white"
                            onClick={() => close()}
                        >
                            <i className="bi bi-check mr-1 mt-1 my-auto" />
                            <span className='my-auto'>Hecho</span>
                        </button>
                    </div>
                    <div className='flex'>
                        <span className='flex gap-2 bg-blue-50 px-2 py-1 rounded text-xs text-upla-100'>
                            <i className="bi bi-info-circle-fill animate-pulse" />
                            Arrastrar para mover
                        </span>
                    </div>

                    <div className='flex flex-col gap-4 w-full bg-gray-100 rounded'>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div
                                        className='p-0.5 w-[700px] max-h-[750px] overflow-y-auto'
                                        ref={provided.innerRef} {...provided.droppableProps}>
                                        {listaAsuntoSeleccion.map((item, index) => (
                                            <Draggable key={item.asuntoId} draggableId={item.asuntoId.toString()} index={index}>
                                                {(provided, snapshot) => (
                                                    <div className={`flex p-1 px-2 
                                                    ${snapshot.isDragging && 'border-upla-100 rounded border-2 text-upla-100 '} 
                                                    ${(index % 2 == 0 && !snapshot.isDragging) ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-500'} `}

                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div className='w-1/12 font-bold'>{index + 1}. </div>
                                                        <div className='w-11/12 font-normal flex flex-col gap-1'>
                                                            <div>
                                                                <strong className='uppercase font-semibold'>{item.tipoAsunto}</strong> {item.asuntoDescripcion}
                                                            </div>
                                                            {
                                                                item.asuntoImagen &&
                                                                <div className='border border-gray-400'>
                                                                    <img src={`${URL.createObjectURL(item.asuntoImagen)}`} style={{/* width: '100%', height: asunto.altura + "px" */ }} />
                                                                </div>
                                                            }

                                                        </div>

                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </div>

    )
}