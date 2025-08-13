import { CheckListStates } from "../../app/config/config";
import { NavigationLayout } from "../../app/layouts/NavigationLayout";
import { Header } from "../components/reports/Header";

const contractTypes = [
  { value: 'temporal', label: 'Temporal' },
  { value: 'new-stetic', label: 'New Stetic' }
];

const examTypes = [
  { value: 'ingreso', label: 'Examen de Ingreso' },
  { value: 'periodico', label: 'Examen Periódico' },
  { value: 'egreso', label: 'Examen de Egreso' },
  { value: 'reintegro', label: 'Examen de Reintegro' },
  { value: 'otros', label: 'Otros Exámenes' }
];

export const ReportsPage = () => {
  return (
    <NavigationLayout title="Reportes">
      <Header 
        contractTypes={contractTypes}
        examStatuses={CheckListStates}
        examTypes={examTypes}
      />
        
    </NavigationLayout>
  )
}


