import {Box, DollarSign, FileText, List, Paperclip, PlusCircle, Tag, Users} from 'react-feather';

export default [
  {
    id: 'patients',
    title: 'Pacientes',
    icon: <Users size={20} />,
    children: [
      {
        id: 'patients-list',
        title: 'Listar',
        icon: <List size={20} />,
        navLink: '/patients/list',
      },
      {
        id: 'patients-add',
        title: 'Adicionar',
        icon: <PlusCircle size={20} />,
        navLink: '/patients/add',
      },
    ],
  },
  {
    id: 'prescriptions',
    title: 'Prescrições',
    icon: <Paperclip size={20} />,
    children: [
      {
        id: 'prescriptions-list',
        title: 'Listar',
        icon: <List size={20} />,
        navLink: '/prescriptions/list',
      },
      {
        id: 'prescriptions-add',
        title: 'Adicionar',
        icon: <PlusCircle size={20} />,
        navLink: '/prescriptions/add',
      },
    ],
  },

  {
    id: 'protocols',
    title: 'Protocolos',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'protocols-list',
        title: 'Listar',
        icon: <List size={20} />,
        navLink: '/protocols/list',
      },
      {
        id: 'protocols-add',
        title: 'Adicionar',
        icon: <PlusCircle size={20} />,
        navLink: '/protocols/add',
      },
    ],
  },
  {
    id: 'drugs',
    title: 'Medicamentos',
    icon: <Tag size={20} />,
    navLink: '/drugs/list',
  },
  {
    id: 'material',
    title: 'Materiais',
    icon: <Box size={20} />,
    navLink: '/material/list',
  },

  {
    id: 'bills',
    title: 'Faturamento',
    icon: <DollarSign size={20} />,
    navLink: '/bills/list',
  },
];
