import { useEffect } from 'react';
import { useExamTypesHook } from '../hooks/useExamTypesHook';
import { CheckListStates } from "../../app/config/config";
import { NavigationLayout } from "../../app/layouts/NavigationLayout";
import { Header } from "../components/reports/Header";
import { LoadingScreen } from '../../app/components/LoadingScreen';

export const ReportsPage = () => {
  const { examTypes, getExamTypes, loading: examTypesLoading } = useExamTypesHook();
  const loading = examTypesLoading

  useEffect(() => {
    getExamTypes('/?condition=actives');
  }, []);

  if(loading) return <LoadingScreen />

  return (
    <NavigationLayout title="Reportes">
      <Header 
        examStatuses={CheckListStates}
        examTypes={examTypes}
      />
        
    </NavigationLayout>
  )
}


