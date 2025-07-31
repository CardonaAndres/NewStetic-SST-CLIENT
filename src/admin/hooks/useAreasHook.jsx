import { useState } from "react";
import { AreasAPI } from "../API/areas";
import { toast } from 'react-toastify';

export const useAreasHook = () => {
  const [ loading, setLoading ] = useState(false);
  const [ areas, setAreas ] = useState([]);
  const [ meta, setMeta ] = useState({});

  const getAreasPaginate = async (page = 1, limit = 20) => {
    try {
        setLoading(true);

        const res = await AreasAPI.getAreasPaginate(page, limit);
        if(!res.success) throw new Error(res.message)

        setAreas(res.data.areas);
        setMeta(res.data.meta)
        console.log(res.data)

    } catch(err) {
        toast.error(err.message);
    } finally {
        setLoading(false);
    }
  }

  const getAreas = async () => {
    try {
        setLoading(true);

        const res = await AreasAPI.getAreas()
        if(!res.success) throw new Error(res.message)
        
        setAreas(res.data.areas);
        return res.data.areas;

    } catch(err) {
        toast.error(err.message);
    } finally {
        setLoading(false);
    }
  }

  const createOrUpdate = async (isEdit, areaData, onClose) => {
    try {
        setLoading(true);
        const res = isEdit ? await AreasAPI.update(areaData) : await AreasAPI.create(areaData);
        if(!res.success) throw new Error(res.message);

        onClose();
        toast.success('Todo listo, proceso exitoso', {
            position: "top-left",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });

    } catch (err) {
        onClose();
        toast.error(err.message);
    } finally {
        setLoading(false);
    }
  }

  return {
    loading,
    areas,
    meta,
    getAreasPaginate,
    getAreas,
    createOrUpdate
  }

}