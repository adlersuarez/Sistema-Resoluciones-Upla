import { Navigate, createBrowserRouter } from 'react-router-dom';
import Inicio from './view/inicio/Inicio';

import Acceso from './view/acceso/Acceso';
import NotFound from './view/pages/404/NotFound';
import Home from "./view/inicio/Home"
import Resoluciones from './view/secretaria/resoluciones/Index';
import RegistrarResolucion from './view/secretaria/resoluciones/Registro';
// 


const router = createBrowserRouter([
  
  {
    path: '/*',
    element: <Inicio />,
    children: [
      /*{
        path: '/',
        element: <Navigate to="home" replace />
      },*/
      {
        path: 'inicio',
        element: <Home />
      },
      {
        path: 'resoluciones',
        element: <Resoluciones />
      },
      {
        path: 'resoluciones/registrar',
        element: <RegistrarResolucion />
      },
      {
        path: 'formatos',
        //element: 
      },
      {
        path: 'plantillas',
        //element: 
      },
      {
        path: 'documentos',
        //element: 
      },
      {
        path: 'reportes/general',
        //element: 
      },
      {
        path: 'reportes/filtros',
        //element: 
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  },
  {
    path: 'acceso',
    element: <Acceso />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '',
    element: <Navigate to="acceso" replace />
  },
  /*{
    path: '/inicio',
    element: <Navigate to="home" replace />
  },
  {
    path: '/inicio/*',
    element: <Inicio />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  },
  {
    path: 'acceso',
    element: <Acceso />
  },
  {
    path: '*',
    element: <NotFound />
  },
  /*{
    path: '/',
    element: <Navigate to="acceso" replace />,
  },*/
])

export default router;