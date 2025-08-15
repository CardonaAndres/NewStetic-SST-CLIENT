import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { useExamTypesHook } from '../hooks/useExamTypesHook';
import { CheckListStates } from "../../app/config/config";
import { NavigationLayout } from "../../app/layouts/NavigationLayout";
import { Header } from "../components/reports/Header";
import { LoadingScreen } from '../../app/components/LoadingScreen';
import { useReportsHook } from '../hooks/useReportsHook';

// Componentes separados
import { EmptyState } from '../components/reports/EmptyState';
import { ResultsHeader } from '../components/reports/ResultsHeader';
import { ExamTable } from '../components/reports/ExamTable';
import { Pagination } from '../components/reports/Pagination';
import { ExamModal } from '../components/reports/ExamModal';

export const ReportsPage = () => {
  const [searchParams] = useSearchParams();
  const { examTypes, getExamTypes, loading: examTypesLoading } = useExamTypesHook();
  const { loading: loadingReports, generateReport, results, meta } = useReportsHook();
  
  // Estados para paginación, ordenamiento y modal
  const [currentPage, setCurrentPage] = useState(() => {
    const sessionPage = sessionStorage.getItem('reportsCurrentPage');
    const urlPage = searchParams.get('page');
    return parseInt(urlPage || sessionPage || '1');
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedExam, setSelectedExam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loading = examTypesLoading || loadingReports;

  useEffect(() => {
    getExamTypes('/?condition=actives');
  }, []);

  // Efecto para ejecutar búsqueda automática si hay filtros en URL
  useEffect(() => {
    const hasUrlFilters = Array.from(searchParams.entries()).some(([key, value]) => 
      ['examTypeID', 'examStatus', 'startDate', 'endDate', 'collaborators', 'limit'].includes(key) && value
    );

    if (hasUrlFilters && examTypes.length > 0) {
      const urlData = {
        examTypeID: searchParams.get('examTypeID') || '',
        examStatus: searchParams.get('examStatus') || '',
        startDate: searchParams.get('startDate') || '',
        endDate: searchParams.get('endDate') || '',
        limit: parseInt(searchParams.get('limit') || '10'),
        page: currentPage
      };

      // Colaboradores desde URL
      const urlCollaborators = searchParams.get('collaborators') || [];
      if (urlCollaborators) {
        try {
          urlData.collaborators = JSON.parse(decodeURIComponent(urlCollaborators));
        } catch (e) {
          urlData.collaborators = [];
        }
      }

      generateReport(urlData);
    }
  }, [searchParams, examTypes.length, currentPage]);

  // Función para abrir modal con detalles del examen
  const openExamModal = (exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  // Función para cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExam(null);
  };

  // Función para cambiar página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (meta?.totalPages || 1)) {
      setCurrentPage(newPage);
      sessionStorage.setItem('reportsCurrentPage', newPage.toString());
      
      // Si hay filtros activos, generar reporte con nueva página
      if (results && results.length > 0) {
        const currentFilters = {
          examTypeID: searchParams.get('examTypeID') || '',
          examStatus: searchParams.get('examStatus') || '',
          startDate: searchParams.get('startDate') || '',
          endDate: searchParams.get('endDate') || '',
          limit: parseInt(searchParams.get('limit') || '10'),
          page: newPage
        };

        const urlCollaborators = searchParams.get('collaborators');
        if (urlCollaborators) {
          try {
            currentFilters.collaborators = JSON.parse(decodeURIComponent(urlCollaborators));
          } catch (e) {
            currentFilters.collaborators = [];
          }
        }

        generateReport(currentFilters);
      }
    }
  };

  // Función para obtener datos ordenados
  const getSortedResults = () => {
    if (!results || !sortConfig.key) return results;

    return [...results].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Manejar fechas
      if (sortConfig.key.includes('fecha')) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Manejar strings
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Estado de carga
  if (loading && !results) return <LoadingScreen />;

  const sortedResults = getSortedResults();

  return (
    <NavigationLayout title="Reportes">
      <div className="space-y-6">
        <Header 
          examStatuses={CheckListStates}
          examTypes={examTypes}
          generateReport={(data) => generateReport({ ...data, page: 1 })}
          loading={loading}
        />
        
        <AnimatePresence mode="wait">
          {!results || results.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              <ResultsHeader meta={meta} />
              
              <ExamTable 
                results={sortedResults}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                onExamClick={openExamModal}
              />

              <Pagination 
                meta={meta}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </AnimatePresence>

        <ExamModal 
          selectedExam={selectedExam}
          isModalOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </NavigationLayout>
  );
};