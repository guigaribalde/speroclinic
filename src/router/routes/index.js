import {lazy} from 'react';

// ** Document title
const TemplateTitle = '%s - SperoClinic';

// ** Default Route
const DefaultRoute = '/patients/list';

// ** Merge Routes
const Routes = [
  // ** Patients
  {
    path: '/patients/list',
    component: lazy(() => import('../../views/Patients')),
  },
  {
    path: '/patients/profile/:id/:name/:nip',
    component: lazy(() => import('../../views/Patients/Profile')),
  },
  {
    path: '/patients/:type/:id',
    component: lazy(() => import('../../views/Patients/PatientsModal')),
  },
  {
    path: '/patients/:type',
    component: lazy(() => import('../../views/Patients/PatientsModal')),
  },

  // ** Prescriptions
  {
    path: '/prescriptions/list',
    component: lazy(() => import('../../views/Prescriptions')),
  },
  {
    path: '/prescriptions/:type/:id',
    component: lazy(() => import('../../views/Prescriptions/PrescriptionModal')),
  },
  {
    path: '/prescriptions/:type',
    component: lazy(() => import('../../views/Prescriptions/PrescriptionModal')),
  },

  // ** Protocols
  {
    path: '/protocols/list',
    component: lazy(() => import('../../views/Protocols')),
  },
  {
    path: '/protocols/:type/:id',
    component: lazy(() => import('../../views/Protocols/ProtocolModal')),
  },
  {
    path: '/protocols/:type',
    component: lazy(() => import('../../views/Protocols/ProtocolModal')),
  },

  // ** Drugs
  {
    path: '/drugs/list',
    component: lazy(() => import('../../views/Drugs')),
  },
  {
    path: '/drugs/group/:group',
    component: lazy(() => import('../../views/Drugs/Group')),
  },
  {
    path: '/drugs/:type/:category/:id',
    component: lazy(() => import('../../views/Drugs/DrugsModal')),
  },
  {
    path: '/drugs/:type',
    component: lazy(() => import('../../views/Drugs/DrugsModal')),
  },

  // ** Materials
  {
    path: '/material/list',
    component: lazy(() => import('../../views/Materials')),
  },
  {
    path: '/material/category/:category',
    component: lazy(() => import('../../views/Materials/Category')),
  },
  {
    path: '/material/add',
    component: lazy(() => import('../../views/Materials/addMaterial')),
  },

  // ** Bills
  {
    path: '/bills/list',
    component: lazy(() => import('../../views/Bills')),
  },

  // ** Users
  {
    path: '/usuarios',
    component: lazy(() => import('../../views/Users')),
  },

  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/esqueci-a-senha',
    component: lazy(() => import('../../views/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/redefinir-senha/:id',
    component: lazy(() => import('../../views/ResetPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout',
  },
];

export {DefaultRoute, TemplateTitle, Routes};
