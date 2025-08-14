
export const useReportsHook = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    
    return {
        loading,
        results
    }
}

