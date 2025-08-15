import { useState } from "react";
import { toast } from 'react-toastify';
import { ReportsAPI } from '../API/reports'

export const useReportsHook = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState({});

    const generateReport = async (filtersInfo, page = 1, limit = 20) => {
        try {
            setLoading(true);
            let complementUrl = '';
            const filteredCollaborators = filtersInfo.collaborators.filter(c => c.trim() !== '');
            const formData = {
                ...filtersInfo,
                collaborators: filteredCollaborators
            };

            if(formData.collaborators && formData.collaborators.length > 0){

                formData.collaborators.forEach((collaborator) => {
                    if(collaborator.trim() !== '') 
                        complementUrl += `&collaborators=${collaborator.trim()}`;
                });

            }

            if(formData.examTypeID) complementUrl += `&examTypeID=${formData.examTypeID}`;

            if(formData.examStatus) complementUrl += `&examStatus=${formData.examStatus}`;

            if(formData.startDate) complementUrl += `&startDate=${formData.startDate}`;

            if(formData.endDate) complementUrl += `&endDate=${formData.endDate}`;

            const res = await ReportsAPI.generateReport(page, limit, complementUrl);

            if(!res.success) throw new Error(res.message || 'Error al generar el reporte');

            setMeta(res.data.meta);
            setResults(res.data.results);

        } catch (err) {
            console.error(err);
            toast.error(err.message);
        } finally {
            setLoading(false)
        }
    }
    
    return {
        loading,
        results,
        generateReport,
        meta
    }
}

