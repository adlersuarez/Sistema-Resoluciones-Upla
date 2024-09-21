import { TitlePages } from '@/component/pages/titulos/TituloPagina';
//import { RootState } from '../../../store/configureStore.store';
//import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import CheckBox from '@/component/CheckBox';
import { LoaderSvg } from '@/component/Svg.component';
import { FechaTooltip } from '@/component/pages/fechas/FechaTooltip';
import { TextoLargoTooltip } from '@/component/pages/texto/TextoLargoTooltip';
import { IconoToolTip } from '@/component/pages/buttons/IconoToolTip';
import { ButtonIconoToolTip } from '@/component/pages/buttons/ButtonIconoToolTip';
import { EstadoPasos } from '@/component/pages/estado/EstadoPasos';
import { isNumeric } from '@/helper/herramienta.helper';
import toast from 'react-hot-toast';
import Documento from '@/model/interfaces/documento/documento';
import { DocumentoSeleccionado } from '@/component/pages/elementos/DocumentoSeleccionado';
import Asunto from '@/model/interfaces/tipo/asunto';
import Oficina from '@/model/interfaces/persona/oficina';
import Personal from '@/model/interfaces/persona/personal';
import Estudiante from '@/model/interfaces/persona/estudiante';
import TipoAsunto from '@/model/interfaces/tipo/tipoAsunto';
import { AsuntoSeleccionado } from '@/component/pages/elementos/AsuntoSeleccionado';
import { varAsuntoPrueba, varPruebaEnte, varPruebaEst, varPruebaOficio, varPruebaPer, varPruebaProveido } from '@/helper/prueba.helper';
import PersonaSelect from '@/model/interfaces/persona/seleccionado';
import { PersonaSeleccionado } from '@/component/pages/elementos/PersonaSeleccionado';
import useSweerAlert from "@/component/hooks/useSweetAlert"
import { useNavigate } from 'react-router-dom';
import { VistaPreviaResolucion } from '@/component/pages/vistaPrevia/VistaPreviaResolucion';
import { OrdenarEncargos } from '@/component/pages/ordenar/OrdenarEncarrgos';
import { OrdenarDocumentos } from '@/component/pages/ordenar/OrdenarDocumentos';
import { OrdenarAsuntos } from '@/component/pages/ordenar/OrdenarAsuntos';
import { generarDocumento } from '@/component/pages/renderizar/ResolucionGeneral';


const RegistrarResolucion = () => {

    //const dispatch = useDispatch();

    //const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const sweet = useSweerAlert()
    const navigate = useNavigate()

    //Estados Pasos - Si son validos los 4 - y la vista previa se puede REGISTRAR
    const [estadoPaso1, setEstadoPaso1] = useState<boolean>(false)
    const [estadoPaso2, setEstadoPaso2] = useState<boolean>(false)
    const [estadoPaso3, setEstadoPaso3] = useState<boolean>(false)
    const [estadoPaso4, setEstadoPaso4] = useState<boolean>(false)

    //Select Tipo de Resolucion CU=1, R=2, AU=3, número de resolución entre 1 - 99999 , fecha default HOY
    const [idTipoResolucion, setIdTipoResolucion] = useState<string | number>(0)
    const [numeroResolucion, setNumeroResolucion] = useState<string | number>('')
    const [fechaResolucion, setFechaResolucion] = useState<string>(new Date().toISOString().split('T')[0])

    //Seleccionar Tipo de Documento Oficio - Proveido (No cargará hasta seleccionar alguno)
    const [selecTipoDoc, setSelecTipoDoc] = useState<number | string>(0)
    const [textFiltroDoc, setTextFiltroDoc] = useState<string>('')
    const [listaDocFiltro, setListaDocFiltro] = useState<Documento[]>([])
    const [loadCargarDoc, setLoadCargarDoc] = useState<boolean>(true) //Carga de datos Doc
    const [placeholderDoc, setPlaceholderDoc] = useState<string>('Nro de Documento')
    const [solicitudFiltroDoc, setSolicitudFiltroDoc] = useState<string>('Ingrese un número de Documento')


    //Seleccionar Tipo de Destino Oficina - Personal - Estudiante (No cargará hasta seleccionar alguno)
    const [selecTipoPer, setSelecTipoPer] = useState<number | string>(0)
    const [textFiltroPer, setTextFiltroPer] = useState<string>('')
    const [listaPersonaFiltro, setListaPersonaFiltro] = useState<(Oficina | Personal | Estudiante)[]>([])
    const [loadCargarPer, setLoadCargarPer] = useState<boolean>(true) //Carga de datos Per
    const [placeholderPer, setPlaceholderPer] = useState<string>('Código')
    const [solicitudFiltroPer, setSolicitudFiltroPer] = useState<string>('Ingrese el código')


    //Lista Asuntos Select
    const [listaTipoAsuntos, setListaTipoAsuntos] = useState<TipoAsunto[]>([])
    const [selectAsunto, setSelectAsunto] = useState<number | string>(0)
    const [valorTextAsunto, setValorTextAsunto] = useState<string>('')
    const [imagenFile, setImagenFile] = useState<File | Blob | null>(null)
    const [checkImagenSelect, setCheckImagenSelect] = useState<boolean>(false)
    const [imagenURL, setImagenURL] = useState<string | null>(null)
    const [mostrarAmpliacion, setMostrarAmpliacion] = useState<boolean>(false) // Ampliacion de imagen

    const selectAsuntoRef = useRef<HTMLSelectElement>(null);
    const textAsuntoaRef = useRef<HTMLTextAreaElement>(null);

    //Lista de Documentos- Acuerdos - Destinos seleccionados para ser mostrados
    const [listaDocumentoSeleccion, setListaDocumentoSeleccion] = useState<Documento[]>([])
    const [listaAsuntoSeleccion, setListaAsuntoSeleccion] = useState<Asunto[]>([])
    const [listaPersonaSeleccion, setListaPersonaSeleccion] = useState<PersonaSelect[]>([])

    //Vista Previa
    const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState<boolean>(false)


    //Input y validez del Numero de resolución
    const handleNumeroResolucion = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setNumeroResolucion(inputValue.trim())
        if (inputValue.trim() == '') {
            return
        }
        if (!isNumeric(inputValue) && inputValue != '') {
            toast.error("El número de Resolución debe contener únicamente caracteres numéricos.")
            setNumeroResolucion(inputValue.slice(0, -1))
        }
    }

    const loadDocumentos = async () => {
        //LÓGICA PARA CARGAR DATOS DE PERSONAL
        if (selecTipoDoc == 1) {
            setListaDocFiltro(varPruebaOficio)
        }
        if (selecTipoDoc == 2) {
            setListaDocFiltro(varPruebaProveido)
        }

        setLoadCargarDoc(false)

    }

    const loadPersonas = async () => {
        //LÓGICA PARA CARGAR DATOS DE PERSONAL
        if (selecTipoPer == 1) {
            setListaPersonaFiltro(varPruebaEnte)
            setPlaceholderPer('Nombre de Oficina')
        }
        if (selecTipoPer == 2) {
            setListaPersonaFiltro(varPruebaPer)
            setPlaceholderPer('Nombre o Cargo')
        }
        if (selecTipoPer == 3) {
            setListaPersonaFiltro(varPruebaEst)
            setPlaceholderPer('Nombre o Código')
        }

        setLoadCargarPer(false)
    }

    const loadAsuntos = async () => {
        //LOGICA PARA TRAER LOS ASUNTOS
        setListaTipoAsuntos(varAsuntoPrueba)
    }

    //Cargar Datos Llegada - Lista Asuntos
    useEffect(() => {
        loadAsuntos()
    }, [])

    //Validación de Estados para el Paso 1
    useEffect(() => {
        // Verifica si todas las condiciones se cumplen y actualiza el estado
        if (idTipoResolucion !== 0 && numeroResolucion !== '' && fechaResolucion !== '') {
            setEstadoPaso1(true);
        }
    }, [idTipoResolucion, numeroResolucion, fechaResolucion]);

    //Validación de Estados para el Paso 2, Paso 3, Paso 4
    useEffect(() => {
        // Verifica si todas las condiciones se cumplen y actualiza el estado
        if (listaDocumentoSeleccion.length !== 0) {
            setEstadoPaso2(true);
        }
        if (listaAsuntoSeleccion.length !== 0) {
            setEstadoPaso3(true);
        }
        if (listaPersonaSeleccion.length !== 0) {
            setEstadoPaso4(true);
        }

        if (listaDocumentoSeleccion.length == 0) {
            setEstadoPaso2(false);
        }
        if (listaAsuntoSeleccion.length == 0) {
            setEstadoPaso3(false);
        }
        if (listaPersonaSeleccion.length == 0) {
            setEstadoPaso4(false);
        }
    }, [listaDocumentoSeleccion, listaAsuntoSeleccion, listaPersonaSeleccion]);

    //CARGA DE PLACEHOLDER Y SOLICITUD BUSQUEDA DE DOCUMENTOS
    useEffect(() => {
        if (selecTipoDoc == 0 && textFiltroDoc == '') {
            setSolicitudFiltroDoc('Seleccione un origen e ingrese un nro de documento')
            return
        }
        if (selecTipoDoc == 0 && textFiltroDoc != '') {
            setSolicitudFiltroDoc('Seleccione un origen')
            return
        }
        if (selecTipoDoc != 0 && textFiltroDoc != '') {
            setSolicitudFiltroDoc('Presione buscar')
            return
        }
        if (selecTipoDoc == 1) {
            setPlaceholderDoc('Nro de Oficio')
            setSolicitudFiltroDoc('Ingrese un número de Oficio')
            return
        }
        if (selecTipoDoc == 2) {
            setPlaceholderDoc('Nro de Proveído')
            setSolicitudFiltroDoc('Ingrese un número de Proveído')
            return
        }

    }, [selecTipoDoc, textFiltroDoc]);

    //CARGA DE PLACEHOLDER Y SOLICITUD BUSQUEDA DE PERSONAL
    useEffect(() => {
        if (selecTipoPer == 0 && textFiltroPer == '') {
            setSolicitudFiltroPer('Seleccione el tipo de remitente e ingrese un código o nombre')
            return
        }
        if (selecTipoPer == 0 && textFiltroPer != '') {
            setSolicitudFiltroPer('Seleccione el tipo de remitente')
            return
        }
        if (selecTipoPer != 0 && textFiltroPer != '') {
            setSolicitudFiltroPer('Presione buscar')
            return
        }
        if (selecTipoPer == 1) {
            setPlaceholderPer('Nombre de Oficina')
            setSolicitudFiltroPer('Ingrese el nombre de la Oficina')
            return
        }
        if (selecTipoPer == 2) {
            setPlaceholderPer('Código, Nombre o Cargo')
            setSolicitudFiltroPer('Ingrese el código, nombre o cargo del personal')
            return
        }
        if (selecTipoPer == 3) {
            setPlaceholderPer('Código o Nombre')
            setSolicitudFiltroPer('Ingrese el código o nombre del estudiante')
            return
        }

    }, [selecTipoPer, textFiltroPer]);

    //FUNCIONES DE DOCUMENTOS
    const agregadDocumentoLista = (item: Documento) => {
        const existe = listaDocumentoSeleccion.some((elemento) => elemento.documentoId === item.documentoId);
        if (!existe) {
            setListaDocumentoSeleccion([...listaDocumentoSeleccion, item]);
            toast.success("Documento agregado exitosamente")
        } else {
            toast.error("El documento ya existe en la lista")
        }
    }
    const eliminarDocumentoLista = (id: number) => {
        const nuevaLista = listaDocumentoSeleccion.filter((elemento) => elemento.documentoId !== id)
        setListaDocumentoSeleccion(nuevaLista)
        toast("El documento ha sido removido", { icon: 'ℹ️' })
    }

    const limpiarDocForm = () => {
        setLoadCargarDoc(true)
        //setTextFiltroDoc('')
        setListaDocFiltro([])
    }

    //FUNCIONES DE ASUNTOS
    const agregarAsuntoLista = () => {
        if (selectAsunto == 0) {
            toast.error("Tiene que seleccionar un asunto")
            selectAsuntoRef.current?.focus()
            return
        }
        if (valorTextAsunto.trim() == '') {
            toast.error("Tiene que agregar el acuerdo")
            textAsuntoaRef.current?.focus()
            return
        }

        // Consultar el máximo idAsunto existente
        const maxIdAsunto = listaAsuntoSeleccion.length > 0 ? Math.max(...listaAsuntoSeleccion.map(asunto => asunto.asuntoId)) : 0;
        // Incrementar el máximo idAsunto en 1 para obtener un nuevo valor autoincrementable
        const nuevoIdAsunto = maxIdAsunto + 1;
        // Buscar el tipoAsunto correspondiente al selectAsunto
        const tipoAsuntoSeleccionado = listaTipoAsuntos.find(tipo => tipo.idTipoAsunto == selectAsunto)?.tipoAsunto || '';

        setListaAsuntoSeleccion([...listaAsuntoSeleccion, {
            asuntoId: nuevoIdAsunto,
            tipoAsuntoId: selectAsunto,
            tipoAsunto: tipoAsuntoSeleccionado,
            asuntoDescripcion: valorTextAsunto,
            asuntoUrlImagen: '',
            asuntoImagen: imagenFile
        }])

        toast.success("Asunto agregado exitosamente")
        limpiarAsuntos()
    }
    const editarAsuntoLista = (id: number, nuevoAsunto: Asunto) => {
        const nuevaLista = listaAsuntoSeleccion.map((elemento) => {
            if (elemento.asuntoId === id) {
                return nuevoAsunto;
            }
            return elemento;
        });
        setListaAsuntoSeleccion(nuevaLista);
    }
    const eliminarAsuntoLista = (id: number) => {
        const nuevaLista = listaAsuntoSeleccion.filter((elemento) => elemento.asuntoId !== id)
        setListaAsuntoSeleccion(nuevaLista)
        toast("El asunto ha sido removido", { icon: 'ℹ️' })
    }

    const limpiarAsuntos = () => {
        setSelectAsunto(0)
        setValorTextAsunto("")
        setImagenFile(null)
        setImagenURL(null)
        setCheckImagenSelect(false)
    }

    //FUNCIONES DE PERSONAL
    const agregarPersonaLista = (item: Oficina | Personal | Estudiante) => {
        const existe = listaPersonaSeleccion.some((elemento) => elemento.codigo === item.codigo);

        // Consultar el máximo idAsunto existente
        const maxIdPerSel = listaPersonaSeleccion.length > 0 ? Math.max(...listaPersonaSeleccion.map(per => per.idSeleccionado)) : 0;
        // Incrementar el máximo idAsunto en 1 para obtener un nuevo valor autoincrementable
        const nuevoIdPerSel = maxIdPerSel + 1;

        const tipo = selecTipoPer
        let detalle = ''
        let titulo = ''
        let tipoGrupo = 0

        if (selecTipoPer == 1) {
            detalle = (item as Oficina).cargo.toUpperCase() + ':  ' + (item as Oficina).personal
            titulo = (item as Oficina).ente
            tipoGrupo = (item as Oficina).tipoEnte
        }
        if (selecTipoPer == 2) {
            detalle = (item as Personal).nombre
            titulo = (item as Personal).cargoPer
            tipoGrupo = (item as Personal).tipoPer
        }
        if (selecTipoPer == 3) {
            detalle = (item as Estudiante).nombre
            titulo = 'Estudiante'
        }

        const nuevoItem = {
            idSeleccionado: nuevoIdPerSel,
            tipo: tipo,
            tipoGrupo: tipoGrupo,
            codigo: item.codigo,
            detalle: detalle,
            titulo: titulo
        }

        if (!existe) {
            setListaPersonaSeleccion([...listaPersonaSeleccion, nuevoItem]);
            toast.success("Personal agregado exitosamente")
        } else {
            toast.error("El personal ya existe en la lista")
        }
    }
    const eliminarPersonaLista = (id: number) => {
        const nuevaLista = listaPersonaSeleccion.filter((elemento) => elemento.idSeleccionado !== id)
        setListaPersonaSeleccion(nuevaLista);
        toast("El personal ha sido removido", { icon: 'ℹ️' })
    }

    const limpiarPerForm = () => {
        setLoadCargarPer(true)
        setTextFiltroPer('')
        setListaPersonaFiltro([])
    }

    const EstadosRegistro = [estadoPaso1, estadoPaso2, estadoPaso3, estadoPaso4]

    //console.log(listaAsuntoSeleccion)
    const registroResolucion = () => {
        sweet.openDialog("Confirmación de Registro", "¿Está seguro que desea continuar con el registro de la Resolución?", async (value) => {

            if (value) {

                sweet.openInformation("Procesando información", "Por favor, espere mientras se procesa la información...")

                //const response = await 

                sweet.openSuccess("Registro completo", "La Resolución se ha registrado exitosamente", () => {
                    navigate('../../resoluciones')
                });

            }
        })
    }

    //// PRUEBA DE ARRASTRE Y ORDENAMIENTO
    const [mostrarListaDoc, setMostrarListaDoc] = useState(false)
    const [mostrarListaAsunt, setMostrarListaAsunt] = useState(false)
    const [mostrarListaPer, setMostrarListaPer] = useState(false)

    //Documento
    const handleReorderDoc = (newList: Documento[]) => {
        setListaDocumentoSeleccion(newList)
    }
    const handleOpenOrderDoc = () => {
        setMostrarListaDoc(true)
    }
    const handleCloseOrderDoc = () => {
        setMostrarListaDoc(false)
    }

    //Asunto
    const handleReorderAsunt = (newList: Asunto[]) => {
        setListaAsuntoSeleccion(newList)
    }
    const handleOpenOrderAsunt = () => {
        setMostrarListaAsunt(true)
    }
    const handleCloseOrderAsunt = () => {
        setMostrarListaAsunt(false)
    }

    //Personal
    const handleReorderPer = (newList: PersonaSelect[]) => {
        setListaPersonaSeleccion(newList)
    }
    const handleOpenOrderPer = () => {
        setMostrarListaPer(true)
    }
    const handleCloseOrderPer = () => {
        setMostrarListaPer(false)
    }

    return (
        <div className='flex flex-col gap-4'>
            <VistaPreviaResolucion
                numero={numeroResolucion}
                fecha={fechaResolucion}
                tipoResolucion={idTipoResolucion}

                listaDocSelect={listaDocumentoSeleccion}
                listaAcuerdoSelect={listaAsuntoSeleccion}
                listaPersonSelect={listaPersonaSeleccion}

                show={mostrarVistaPrevia}
                close={() => setMostrarVistaPrevia(false)}

                //Orden
                onReorderDoc={handleReorderDoc}
                onReorderAsunt={handleReorderAsunt}
                onReorderPer={handleReorderPer}
            />
            <div className='w-full flex justify-between'>
                <TitlePages
                    texto={'Registrar Nueva Resolución'}
                    icono={'bi-file-text-fill'}
                />
                <div className='flex justify-between gap-4'>
                    <button
                        onClick={() => setMostrarVistaPrevia(true)}
                        className='flex gap-2 bg-orange-400 hover:bg-orange-500 text-white px-4 p-2 rounded'>
                        <i className="m-auto bi  bi-zoom-in" />
                        <span className='m-auto'>Vista Previa</span>
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='w-full grid grid-cols-2 gap-4'>
                    <div className='bg-gray-100 p-6 rounded-xl flex flex-col gap-10 justify-between'>
                        <div className='flex flex-col gap-10'>
                            {/* PASO 1 */}
                            <div className='flex flex-col gap-4'>
                                <div className='font-semibold pb-1 text-gray-400 text-xl border-b-2 border-gray-300'>
                                    <span className='flex gap-2'>
                                        <i className="my-auto bi bi-1-square-fill text-lg" />
                                        DATOS GENERALES
                                        {estadoPaso1 && <i className="bi bi-check-circle-fill text-green-400" />}
                                    </span>
                                </div>
                                <div className='flex flex-wrap justify-between gap-2'>
                                    <div className='flex gap-4'>
                                        <label htmlFor='id_tipoResolucion' className="my-auto">Tipo</label>
                                        <select
                                            id='id_tipoResolucion'
                                            name='id_tipoResolucion'
                                            value={idTipoResolucion}
                                            className='w-54 h-10 border rounded-md px-4 border-gray-200 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 min-w-[150px]'
                                            onChange={(e) => setIdTipoResolucion(e.target.value)}
                                        >
                                            <option value={0} disabled>Seleccione</option>
                                            <option value={1}>
                                                Asamblea Universitaria
                                            </option>
                                            <option value={2}>
                                                Rectorado
                                            </option>
                                            <option value={3}>
                                                Consejo Universitario
                                            </option>
                                        </select>
                                    </div>
                                    <div className='flex gap-4'>
                                        <label htmlFor='numero_resolucion' className="my-auto">Nro</label>
                                        <input
                                            type="text"
                                            id='numero_resolucion'
                                            name='numero_resolucion'
                                            className="py-2 px-4 rounded-lg outline-none border-gray-200 focus:ring-blue-200 focus:ring-0 w-20 text-left"
                                            placeholder="-----"
                                            maxLength={5}
                                            value={numeroResolucion}
                                            onChange={handleNumeroResolucion}
                                            inputMode="numeric"
                                        />
                                    </div>
                                    <div className='flex gap-4'>
                                        <label htmlFor='fecha_resolucion' className="my-auto">Fecha</label>
                                        <input
                                            id='fecha_resolucion'
                                            name='fecha_resolucion'
                                            type="date"
                                            value={fechaResolucion}
                                            className="w-54 h-10 border rounded-md px-4 border-gray-200 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 min-w-[150px]"
                                            //defaultValue={new Date().toISOString().split('T')[0]}
                                            onChange={(e) => setFechaResolucion(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* PASO 2 */}
                            <div className='flex flex-col gap-4'>
                                <div className='font-semibold pb-1 text-gray-400 text-xl border-b-2 border-gray-300'>
                                    <span className='flex gap-2'>
                                        <i className="my-auto bi bi-2-square-fill text-lg" />
                                        DOCUMENTOS REFERENCIADOS
                                        {estadoPaso2 && <i className="bi bi-check-circle-fill text-green-400" />}
                                    </span>
                                </div>
                                <div className='flex flex-wrap justify-between gap-2'>
                                    <div className='flex gap-4'>
                                        <span className="my-auto">Origen: </span>
                                        <div className='my-auto flex gap-4'>
                                            <CheckBox
                                                valor={1}
                                                selected={selecTipoDoc}
                                                label='Oficio'
                                                change={(valor) => {
                                                    setSelecTipoDoc(valor)
                                                    limpiarDocForm()
                                                }}
                                            />
                                            <CheckBox
                                                valor={2}
                                                selected={selecTipoDoc}
                                                label='Proveído'
                                                change={(valor) => {
                                                    setSelecTipoDoc(valor)
                                                    limpiarDocForm()
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="relative rounded-lg flex items-center w-80">
                                        <input
                                            type="text"
                                            value={textFiltroDoc}
                                            onChange={(e) => setTextFiltroDoc(e.target.value)}
                                            id='filtro_documento'
                                            name='filtro_documento'
                                            className="py-2 px-4 pr-12 rounded-lg outline-none border-gray-200 focus:ring-blue-300 focus:ring-0 w-full text-black cursor-text"
                                            placeholder={placeholderDoc}
                                        />
                                        <button
                                            onClick={() => loadDocumentos()}
                                            className="absolute inset-y-0 right-0 flex items-center px-4 bg-gray-200 hover:bg-gray-300 text-[10px] rounded-r-lg my-0.5 mr-0.5"
                                        >
                                            <i className="bi bi-search" />
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <table className="text-gray-700 uppercase bg-upla-100 border table-auto w-full" id="miTabla">
                                        <thead className="align-bottom">
                                            {
                                                listaDocFiltro.length != 0 &&
                                                <tr className="font-bold text-center uppercase text-xs text-white">
                                                    <th className="px-6 py-2 align-middle">Documento</th>
                                                    <th className="px-6 py-2 align-middle">Fecha</th>
                                                    <th className="px-6 py-2 align-middle">Vista</th>
                                                    <th className="px-6 py-2 align-middle">Considerando</th>
                                                    <th className="px-6 py-2 align-middle">/</th>
                                                </tr>
                                            }
                                        </thead>
                                        <tbody>
                                            {
                                                loadCargarDoc ?
                                                    (
                                                        <tr className={`text-center bg-white ${listaDocFiltro.length != 0 ? 'border-b' : 'border-2 border-upla-100 text-upla-100 font-semibold'} `}>
                                                            <td colSpan={5} className="text-sm p-2">
                                                                <div className="flex items-center justify-center">
                                                                    {
                                                                        (selecTipoDoc && textFiltroDoc && false) ?
                                                                            <div className="flex gap-2">
                                                                                <LoaderSvg />
                                                                                <span>Cargando datos...</span>
                                                                            </div>
                                                                            :
                                                                            <div className="flex gap-2">
                                                                                <span>{solicitudFiltroDoc}</span>
                                                                            </div>
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                    :
                                                    (
                                                        listaDocFiltro.length == 0 ?
                                                            (
                                                                <tr className="text-center bg-white border-2 border-upla-100 text-upla-100 font-semibold">
                                                                    <td colSpan={5} className="text-sm p-2">
                                                                        No hay datos para mostrar con los filtros seleccionados
                                                                    </td>
                                                                </tr>
                                                            )
                                                            :
                                                            (
                                                                listaDocFiltro.map((item, index) => {

                                                                    return (
                                                                        <tr key={index} className={`${index % 2 == 0 ? 'bg-white' : 'bg-blue-50'} border-b`}>
                                                                            <td className="text-xs p-2 text-center align-middle border-b border-solid">
                                                                                {item.documento}
                                                                            </td>
                                                                            <td className="text-xs p-2 text-center align-middle border-b border-solid">
                                                                                <FechaTooltip
                                                                                    codigo={item.documentoId}
                                                                                    fecha={item.documentoFecha}
                                                                                />
                                                                            </td>
                                                                            <td className="text-xs p-2 text-center align-middle border-b border-solid">
                                                                                {/*AGREGAR LINK DEL DOCUMENTO*/}
                                                                                <span className='text-lg text-red-400 hover:text-red-700' role='button'>
                                                                                    <i className="bi bi-file-earmark-pdf-fill" />
                                                                                </span>
                                                                            </td>
                                                                            <td className="text-xs p-2 text-justify align-middle border-b border-solid">
                                                                                <TextoLargoTooltip
                                                                                    codigo={item.documentoId}
                                                                                    texto={item.considerandoDoc}
                                                                                />
                                                                            </td>
                                                                            <td className="text-xs p-2 text-center align-middle border-b border-solid">
                                                                                <button
                                                                                    onClick={() => agregadDocumentoLista(item)}
                                                                                    className=''
                                                                                >
                                                                                    <IconoToolTip
                                                                                        icon='bi-plus-square-fill'
                                                                                        classname='text-green-400 text-lg'
                                                                                        variant='success'
                                                                                        textTooltip='Añadir Documento'
                                                                                        position='right'
                                                                                    />
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            )

                                                    )
                                            }

                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>

                        {
                            listaDocumentoSeleccion.length != 0 &&
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-semibold text-gray-500 flex justify-between'>
                                    Documentos seleccionadas
                                    {listaDocumentoSeleccion.length > 1 &&
                                        <button
                                            className='bg-gray-400 text-xs px-2 rounded py-0.5 hover:bg-gray-500 text-white'
                                            onClick={handleOpenOrderDoc}>
                                            Ordenar Lista
                                        </button>
                                    }
                                    {
                                        mostrarListaDoc &&
                                        <OrdenarDocumentos listaDocumentoSeleccion={listaDocumentoSeleccion} onReorder={handleReorderDoc} close={handleCloseOrderDoc} />
                                    }
                                </span>
                                <div className='p-2 flex flex-wrap gap-2 bg-white'>
                                    {
                                        listaDocumentoSeleccion.map((item, index) => {
                                            return (
                                                <DocumentoSeleccionado
                                                    id={item.documentoId}
                                                    key={index}
                                                    tipoDoc={item.tipoDocumentoId}
                                                    documento={item.documento}
                                                    considerando={item.considerandoDoc}
                                                    onclick={eliminarDocumentoLista}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }

                    </div>

                    <div className='bg-gray-100 p-6 rounded-xl flex flex-col gap-10 justify-between'>
                        <div className='flex flex-col gap-10'>
                            {/* PASO 3 */}
                            <div className='flex flex-col gap-4'>
                                <div className='font-semibold pb-1 text-gray-400 text-xl border-b-2 border-gray-300'>
                                    <span className='flex gap-2'>
                                        <i className="my-auto bi bi-3-square-fill text-lg" />
                                        ACUERDOS TOMADOS
                                        {estadoPaso3 && <i className="bi bi-check-circle-fill text-green-400" />}
                                    </span>
                                </div>
                                <div className='flex flex-wrap justify-between'>
                                    <div className='flex gap-4'>
                                        <label htmlFor='id_acuerdo' className="my-auto">Tipo</label>
                                        <select
                                            id='id_acuerdo'
                                            name='id_acuerdo'
                                            value={selectAsunto}
                                            ref={selectAsuntoRef}
                                            onChange={(e) => setSelectAsunto(e.target.value)}
                                            className='w-54 h-10 border rounded-md px-4 border-gray-200 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 min-w-[150px]'
                                        >
                                            <option value={0} disabled>Seleccione</option>
                                            {
                                                listaTipoAsuntos.map((item, index) => (
                                                    <option key={index} value={item.idTipoAsunto}>{item.tipoAsunto}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className='flex'>
                                        <ButtonIconoToolTip
                                            icon='bi-plus-circle'
                                            textTooltip='Agregar acuerdo seleccioando'
                                            classname='bg-green-400 hover:bg-green-700 my-auto text-white text-sm gap-2 p-2'
                                            iconPosition='right'
                                            variant='success'
                                            onClick={() => agregarAsuntoLista()}
                                        >
                                            <span className='my-auto'>Agregar</span>
                                        </ButtonIconoToolTip>
                                    </div>

                                </div>
                                <div className='flex w-full gap-4'>
                                    <textarea
                                        id='acuerdo_tomado'
                                        name='acuerdo_tomado'
                                        value={valorTextAsunto}
                                        ref={textAsuntoaRef}
                                        onChange={(e) => setValorTextAsunto(e.target.value)}
                                        className="w-full py-2 px-4 rounded-lg outline-none border-gray-200 focus:ring-blue-200 focus:ring-0 text-sm h-20"
                                        placeholder="Ejm. APROBAR y poner en ejecución..."
                                    />

                                    {
                                        imagenURL && (
                                            <div className="relative">
                                                <div className="relative w-32 h-auto border border-gray-300 rounded-lg bg-white">
                                                    <img
                                                        src={imagenURL}
                                                        alt="Imagen seleccionada"
                                                        className="max-w-full h-auto cursor-pointer"
                                                        onClick={() => setMostrarAmpliacion(true)}
                                                    />
                                                    <button
                                                        className="absolute inset-0 p-2 text-white hover:text-white bg-black opacity-10 hover:opacity-40"
                                                        onClick={() => setMostrarAmpliacion(true)}
                                                    >
                                                        <i className="bi bi-arrows-angle-expand text-4xl"></i>
                                                    </button>
                                                </div>
                                                {
                                                    mostrarAmpliacion &&
                                                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                                                        <div className="max-h-[800px] overflow-y-auto max-w-3xl bg-white rounded-lg">
                                                            <div className="relative pt-14 p-4 ">
                                                                <button
                                                                    className="flex absolute top-0 right-0 m-4 bg-red-500 hover:bg-red-700 px-2 py-0.5 rounded-md text-white"
                                                                    onClick={() => setMostrarAmpliacion(false)}
                                                                >
                                                                    <i className="bi bi-x mr-1 my-auto" /> Cerrar
                                                                </button>
                                                                <img
                                                                    src={imagenURL}
                                                                    alt="Ampliación de imagen"
                                                                    className="max-w-full  rounded-lg"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }

                                </div>
                                <div className='flex gap-3 justify-between'>
                                    <div className='flex gap-2'>
                                        <input
                                            id='agregar_imagen'
                                            name='agregar_imagen'
                                            className="h-5 w-5 text-gray-600 rounded border-gray-300 focus:outline-none focus:ring-0"
                                            type="checkbox"
                                            checked={checkImagenSelect}
                                            onChange={(e) => {
                                                setCheckImagenSelect(e.target.checked);
                                                if (checkImagenSelect) {
                                                    setImagenFile(null);
                                                    setImagenURL(null);
                                                }
                                            }}
                                        />
                                        <label htmlFor='agregar_imagen' className="mt-[-3px]">Imagen </label>
                                    </div>

                                    {
                                        checkImagenSelect &&
                                        <div className="flex flex-col ">
                                            <input
                                                id='imagen_acuerdo'
                                                name='imagen_acuerdo'
                                                type="file"
                                                accept=".png, .jpg, .jpeg"
                                                className="text-xs border rounded-lg bg-white border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                                                onChange={(e) => {
                                                    const file = e.target.files && e.target.files[0];
                                                    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
                                                        setImagenFile(file)
                                                        setImagenURL(URL.createObjectURL(file))
                                                    } else {
                                                        setImagenFile(null)
                                                        setImagenURL(null)
                                                        if (file != undefined) {
                                                            toast.error('Por favor, seleccione un archivo de imagen PNG, JPG o JPEG.')
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    }

                                </div>
                                {
                                    listaAsuntoSeleccion.length != 0 &&
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm font-semibold text-gray-500'>
                                        </span>
                                        <span className='text-sm font-semibold text-gray-500 flex justify-between'>
                                            Acuerdos
                                            {listaAsuntoSeleccion.length > 1 &&
                                                <button
                                                    className='bg-gray-400 text-xs px-2 rounded py-0.5 hover:bg-gray-500 text-white'
                                                    onClick={handleOpenOrderAsunt}>
                                                    Ordenar Lista
                                                </button>
                                            }
                                            {
                                                mostrarListaAsunt &&
                                                <OrdenarAsuntos listaAsuntoSeleccion={listaAsuntoSeleccion} onReorder={handleReorderAsunt} close={handleCloseOrderAsunt} />
                                            }
                                        </span>
                                        <div className='p-2 flex flex-wrap gap-2 bg-white'>
                                            {
                                                listaAsuntoSeleccion.map((item, index) => {
                                                    return (
                                                        <AsuntoSeleccionado
                                                            id={item.asuntoId}
                                                            key={index}
                                                            idTipoAcuerdo={item.tipoAsuntoId}
                                                            nombreTipo={item.tipoAsunto}
                                                            asunto={item.asuntoDescripcion}
                                                            imagen={item.asuntoImagen}

                                                            editar={editarAsuntoLista}
                                                            eliminar={eliminarAsuntoLista}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                }

                            </div>
                            {/* PASO 4 */}
                            <div className='flex flex-col gap-4'>
                                <div className='font-semibold pb-1 text-gray-400 text-xl border-b-2 border-gray-300'>
                                    <span className='flex gap-2'>
                                        <i className="my-auto bi bi-4-square-fill text-lg" />
                                        ENCARGATURA {/*(corregir nombre*)*/}
                                        {estadoPaso4 && <i className="bi bi-check-circle-fill text-green-400" />}
                                    </span>
                                </div>
                                <div className='flex flex-wrap justify-between gap-2'>
                                    <div className='flex gap-4'>
                                        <div className='my-auto flex gap-4'>
                                            <CheckBox
                                                valor={1}
                                                selected={selecTipoPer}
                                                label='Oficina'
                                                change={(valor) => {
                                                    setSelecTipoPer(valor)
                                                    limpiarPerForm()
                                                }}
                                            />
                                            <CheckBox
                                                valor={2}
                                                selected={selecTipoPer}
                                                label='Personal'
                                                change={(valor) => {
                                                    setSelecTipoPer(valor)
                                                    limpiarPerForm()
                                                }}
                                            />
                                            <CheckBox
                                                valor={3}
                                                selected={selecTipoPer}
                                                label='Estudiante'
                                                change={(valor) => {
                                                    setSelecTipoPer(valor)
                                                    limpiarPerForm()
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="relative rounded-lg flex items-center w-80">
                                        <input
                                            type="text"
                                            id='filtro_persona'
                                            name='filtro_persona'
                                            value={textFiltroPer}
                                            onChange={(e) => setTextFiltroPer(e.target.value)}
                                            className="py-2 px-4 pr-12 rounded-lg outline-none border-gray-200 focus:ring-blue-300 focus:ring-0 w-full text-black cursor-text"
                                            placeholder={placeholderPer}
                                        />
                                        <button
                                            onClick={() => loadPersonas()}
                                            className="absolute inset-y-0 right-0 flex items-center px-4 bg-gray-200 hover:bg-gray-300 text-[10px] rounded-r-lg my-0.5 mr-0.5"
                                        >
                                            <i className="bi bi-search" />
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <table className="text-gray-700 uppercase bg-upla-100 border table-auto w-full" id="miTabla">
                                        <thead className="align-bottom">
                                            {
                                                (selecTipoPer == 1 && listaPersonaFiltro.length != 0) &&
                                                <tr className="font-bold text-center uppercase text-xs text-white">
                                                    <th className="px-6 py-2 align-middle">Oficina</th>
                                                    <th className="px-6 py-2 align-middle">Cargo</th>
                                                    <th className="px-6 py-2 align-middle">Representante</th>
                                                    <th className="px-6 py-2 align-middle">Detalle</th>
                                                    <th className="px-6 py-2 align-middle">/</th>
                                                </tr>
                                            }
                                            {
                                                (selecTipoPer == 2 && listaPersonaFiltro.length != 0) &&
                                                <tr className="font-bold text-center uppercase text-xs text-white">
                                                    <th className="px-6 py-2 align-middle">Código</th>
                                                    <th className="px-6 py-2 align-middle">Cargo</th>
                                                    <th className="px-6 py-2 align-middle">Nombre</th>
                                                    <th className="px-6 py-2 align-middle">Detalle</th>
                                                    <th className="px-6 py-2 align-middle">/</th>
                                                </tr>
                                            }
                                            {
                                                (selecTipoPer == 3 && listaPersonaFiltro.length != 0) &&
                                                <tr className="font-bold text-center uppercase text-xs text-white">
                                                    <th className="px-6 py-2 align-middle">Código</th>
                                                    <th className="px-6 py-2 align-middle">Nombre</th>
                                                    <th className="px-6 py-2 align-middle">Facultad</th>
                                                    <th className="px-6 py-2 align-middle">Carrera</th>
                                                    <th className="px-6 py-2 align-middle">/</th>
                                                </tr>
                                            }

                                        </thead>
                                        <tbody>
                                            {
                                                loadCargarPer ?
                                                    (
                                                        <tr className={`text-center bg-white ${listaPersonaFiltro.length != 0 ? 'border-b' : 'border-2 border-upla-100 text-upla-100 font-semibold'}`}>
                                                            <td colSpan={5} className="text-sm p-2">
                                                                <div className="flex items-center justify-center">
                                                                    {
                                                                        (selecTipoPer && textFiltroPer && false) ?
                                                                            <div className="flex gap-2">
                                                                                <LoaderSvg />
                                                                                <span>Cargando datos...</span>
                                                                            </div>
                                                                            :
                                                                            <div className="flex gap-2">
                                                                                <span>{solicitudFiltroPer}</span>
                                                                            </div>
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                    :
                                                    (
                                                        listaPersonaFiltro.length == 0 ?
                                                            (
                                                                <tr className="text-center bg-white border-2 border-upla-100 text-upla-100 font-semibold">
                                                                    <td colSpan={5} className="text-sm p-2">
                                                                        No hay datos para mostrar.
                                                                    </td>
                                                                </tr>
                                                            )
                                                            :
                                                            (
                                                                listaPersonaFiltro.map((item, index) => {

                                                                    // console.log(item)
                                                                    return (
                                                                        <tr key={index} className={`${index % 2 == 0 ? 'bg-white' : 'bg-blue-50'} border-b normal-case`}>
                                                                            <td className="text-xs p-2 text-center align-middle border-b border-solid">
                                                                                {selecTipoPer == 1 && 'ente' in item && item.ente}
                                                                                {selecTipoPer == 2 && 'codigo' in item && item.codigo}
                                                                                {selecTipoPer == 3 && 'codigo' in item && item.codigo}
                                                                            </td>
                                                                            <td className="text-xs p-2 text-center align-middle border-b border-solid">
                                                                                {selecTipoPer == 1 && 'cargo' in item && item.cargo}
                                                                                {selecTipoPer == 2 && 'cargoPer' in item && item.cargoPer}
                                                                                {selecTipoPer == 3 && 'nombre' in item && item.nombre}
                                                                            </td>
                                                                            <td className="text-xs p-2 text-center align-middle border-b border-solid">
                                                                                {selecTipoPer == 1 && 'personal' in item && item.personal}
                                                                                {selecTipoPer == 2 && 'nombre' in item && item.nombre}
                                                                                {selecTipoPer == 3 && 'facultad' in item && item.facultad}
                                                                            </td>
                                                                            <td className={`text-xs p-2 align-middle border-b border-solid ${selecTipoPer == 3 ? 'text-center' : 'text-left'}`}>
                                                                                {selecTipoPer == 1 && 'detalleEnte' in item && item.detalleEnte}
                                                                                {selecTipoPer == 2 && 'detallePer' in item && item.detallePer}
                                                                                {selecTipoPer == 3 && 'carrera' in item && item.carrera}
                                                                            </td>
                                                                            <td className="text-xs p-2 text-center align-middle border-b border-solid">
                                                                                <button
                                                                                    onClick={() => agregarPersonaLista(item)}
                                                                                    className=''
                                                                                >
                                                                                    <IconoToolTip
                                                                                        icon='bi-plus-square-fill'
                                                                                        classname='text-green-400 text-lg'
                                                                                        variant='success'
                                                                                        textTooltip='Añadir Autoridad'
                                                                                        position='right'
                                                                                    />
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            )

                                                    )
                                            }

                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>

                        {
                            listaPersonaSeleccion.length != 0 &&
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm font-semibold text-gray-500 flex justify-between'>
                                    Autoridades seleccionadas
                                    {listaPersonaSeleccion.length > 1 &&
                                        <button
                                            className='bg-gray-400 text-xs px-2 rounded py-0.5 hover:bg-gray-500 text-white'
                                            onClick={handleOpenOrderPer}>
                                            Ordenar Lista
                                        </button>
                                    }
                                    {
                                        mostrarListaPer &&
                                        <OrdenarEncargos listaPersonaSeleccion={listaPersonaSeleccion} onReorder={handleReorderPer} close={handleCloseOrderPer} />
                                    }
                                </span>
                                <div className='p-2 flex flex-wrap gap-2 bg-white'>
                                    {
                                        listaPersonaSeleccion.map((item, index) => {
                                            return (
                                                <PersonaSeleccionado
                                                    idSeleccionado={item.idSeleccionado}
                                                    key={index}
                                                    tipo={item.tipo}
                                                    codigo={item.codigo}
                                                    detalle={item.detalle}
                                                    titulo={item.titulo}

                                                    onclick={eliminarPersonaLista}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className='flex justify-center mt-8 gap-8'>
                    <div className='flex'>
                        <EstadoPasos
                            steps={EstadosRegistro}
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={registroResolucion}
                            className="px-8 py-2 font-semibold text-white bg-gray-400 rounded hover:bg-gray-600">
                            Registrar
                        </button>
                        <button
                            className='hidden bg-red-400 hover:bg-red-600 text-white p-2 px-4 rounded'
                            onClick={() => generarDocumento(listaDocumentoSeleccion, listaAsuntoSeleccion)}
                        >
                            Descargar word
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RegistrarResolucion