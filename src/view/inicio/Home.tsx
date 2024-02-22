// import Card from "../../component/pages/cards/CardDash"

import { images } from "@/helper/index.helper";

// import CardLink from "@/component/pages/cards/Card"

// import { Vida, Matricula, Libro } from '../../component/Iconos';
// import { RootState } from "@/store/configureStore.store";
// import { useSelector } from "react-redux";
// import { TipUser } from "@/model/enum/types.model.enum";

const HomeEstudiante = () => {
    //const tipoUsuario = useSelector((state: RootState) => state.autenticacion.tipoUsuario)
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();

    return (

        <div className="flex flex-col justify-between">
            <div className="flex flex-wrap flex-col gap-4">
                <div className='flex flex-col text-center gap-4 text-gray-400 p-4'>
                    <h1 className='font-bold text-5xl'>
                        SISTEMA DE RESOLUCIONES
                    </h1>
                    <h2 className='text-4xl'>
                        UPLA - {añoActual}
                    </h2>
                </div>
                <div className='font-bold text-4xl text-upla-100 '>
                    RECTORADO
                </div>
                <hr className='my-4' />

                <div className='flex bg-white p-4 justify-center items-center'>
                    <img src={images.logo} alt="" className='w-96' />
                </div>


                {/*<div className="w-full sm:w-1/2 p-4">
                    <Card
                        imagen={<Matricula />}
                        titulo={'Matrícula'}
                        subTitulo={'Realiza tu matrícula.'}
                        color={'green'}
                        to={'/inicio/matricula-interna'}
                        info={''}
                    />

                </div>
                <div className="w-full sm:w-1/2 p-4">
                    <Card
                        imagen={<Vida />}
                        titulo={'Vida académica'}
                        subTitulo={'Revisa tu experiencia en Idiomas Upla.'}
                        color={'yellow'}
                        to={'/inicio/vida-academica'}
                        info={''}
                    />
                </div>*/}

                {/* <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                        <Card
                                            imagen={<Libro />}
                                            titulo={''}
                                            color={'blue'}
                                            to={'https://upla.edu.pe/nw/2023/NewFolder/CRONOGRAMA%20IDIOMAS.pdf?_t=1702403729'}
                                            info={''}
                                        />
                                    </div> */}

            </div>

            {/* 
            <div className="flex justify-center mt-16 p-1">
                <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                    <CardLink
                        imagen={<Libro />}
                        titulo={'Manual de matrícula'}
                        color={'blue'}
                        to={'https://upla.edu.pe/nw/2023/NewFolder/CRONOGRAMA%20IDIOMAS.pdf?_t=1702403729'}
                    info={''}
                    />
                </div>
            </div>
            */}

        </div>
    );
};

export default HomeEstudiante;