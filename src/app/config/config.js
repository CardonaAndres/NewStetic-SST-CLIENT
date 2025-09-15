export const router = {
  home: '/',

  staff: '/personal',
  staffIdle: '/personal/inactivo',
  medicalStaffHistory: '/historial-medico',

  surveillance: '/vigilancia',
  ppe: '/epp',
  safety: '/seguridad',
  hygiene: '/higiene',

  incomeExam: '/examen-ingreso',
  egressExam: '/examen-egreso',
  examHistory: '/historial-examen',

  administration: '/administracion/software-sst',
  adminUsers: '/administracion/usuarios',
  reportsPage: '/administracion/reportes',
  examTypesManager: '/administracion/tipos-examenes',
  rolesAndPermissions: '/administracion/roles-y-permisos',
};


const CheckListAllStates = [
  'Pendiente', 
  'Procesando', 
  'Reprogramado', 
  'Cancelado', 
  'Completado', 
  'Rechazado',
  'Programado',
  'Eliminado'
]

const excludedStates = ['Eliminado'];

export const CheckListStates = CheckListAllStates.filter(s => !excludedStates.includes(s));
