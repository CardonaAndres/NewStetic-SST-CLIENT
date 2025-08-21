import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationLayout } from '../../app/layouts/NavigationLayout';
import { Header } from '../components/incomeOrEgressExams/Header';
import { useIncomeEgressHook } from '../hooks/useIncomeEgressHook';
import { LoadingScreen } from '../../app/components/LoadingScreen';
import { EmptyState } from '../components/incomeOrEgressExams/EmptyState';
import { ExamCard } from '../components/incomeOrEgressExams/ExamCard';
import { Calendar, AlertCircle, CheckCircle, Clock, RefreshCw, X as XIcon } from 'lucide-react';
import { router } from '../../app/config/config';

export const EgressExams = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { loading, exams, getExams } = useIncomeEgressHook();
  const [expandedCards, setExpandedCards] = useState(new Set());
  const examType = location.pathname === router.incomeExam ? 'income' : 'egress';

  const toggleCardExpansion = (examId) => {
    const newExpanded = new Set(expandedCards);
    newExpanded.has(examId) ? newExpanded.delete(examId) : newExpanded.add(examId);
    setExpandedCards(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completado':
        return 'from-green-500 to-emerald-600';
      case 'pendiente':
        return 'from-yellow-500 to-orange-600';
      case 'procesando':
        return 'from-blue-500 to-blue-600';
      case 'programado':
        return 'from-purple-500 to-purple-600';
      case 'reprogramado':
        return 'from-indigo-500 to-indigo-600';
      case 'cancelado':
        return 'from-gray-500 to-gray-600';
      case 'rechazado':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completado':
        return CheckCircle;
      case 'pendiente':
        return Clock;
      case 'procesando':
        return RefreshCw;
      case 'programado':
        return Calendar;
      case 'reprogramado':
        return RefreshCw;
      case 'cancelado':
        return XIcon;
      case 'rechazado':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    return dateString.split('T')[0];
  };

  useEffect(() => {
    getExams(searchParams.get("cc"), examType);
  }, []);

  if(loading) return <LoadingScreen />

  return (
    <NavigationLayout title='Exámenes de Egreso'>
      <Header total={exams.length || 0} />
      <motion.div 
        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {exams.length === 0 ? (
          <EmptyState exams={exams} />
        ) : (
          /* Exams List */
          <div className="divide-y divide-gray-100/50">
            <AnimatePresence>
              {exams.map((exam, index) => {
                const StatusIcon = getStatusIcon(exam.estado_item);
                const examId = `${exam.cc_empleado}-${index}`;
                const isExpanded = expandedCards.has(examId);
                
                return (
                  <ExamCard 
                    key={index} 
                    exam={exam} 
                    StatusIcon={StatusIcon} 
                    getStatusColor={getStatusColor}
                    formatDate={formatDate}
                    isExpanded={isExpanded}
                    examId={examId}
                    toggleCardExpansion={toggleCardExpansion}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </NavigationLayout>
  )
}