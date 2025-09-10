export const router = {
    home : '/',
    staff : '/personal',
    surveillance : '/vigilancia',
    ppe : '/epp',
    safety : '/seguridad',
    hygiene : '/higiene',
    staffIdle : '/personal/inactivo',
    medicalStaffHistory : '/historial-medico',
    examHistory : '/historial-examen',
    adminUsers: '/administracion/usuarios',
    administration : '/administracion/software-sst',
    reportsPage : '/administracion/reportes',
    examTypesManager : '/administracion/tipos-examenes',
    incomeExam: '/examen-ingreso',
    egressExam: '/examen-egreso'
}

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
