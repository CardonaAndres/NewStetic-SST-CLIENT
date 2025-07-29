import { useState } from "react"

export const useExamTypesHook = () => {
    const [loading, setLoading] = useState();


    return {
        loading
    }
}