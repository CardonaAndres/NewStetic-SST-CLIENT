export const router = {
    home : '/',
    staff : '/personal',
    surveillance : '/vigilancia',
    ppe : '/epp',
    safety : '/seguridad',
    hygiene : '/higiene',
    staffIdle : '/personal/inactivo',
    medicalStaffHistory : '/historial-medico',
    administration : '/administracion/software-sst',
    examTypesManager : '/administracion/tipos-examenes',
    examFrecuency : '/administracion/frecuencias-examen',
    areasManager : '/administracion/areas'
}

export const CheckListStates = [
  'Pendiente', 
  'Procesando', 
  'Reprogramado', 
  'Cancelado', 
  'Completado', 
  'Observado', 
  'Aprobado', 
  'Rechazado',
  'En revisión',
  'Expirado',
  'Programado',
  'No requerido',
  'Duplicado',
  'En espera'
];