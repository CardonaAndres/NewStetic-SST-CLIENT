import { useForm } from "react-hook-form";


export const UserForm = ({ initialData = {}, onClose }) => {
 const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm({
    defaultValues: {
      ...initialData
    }
  });

  return (
    <div>UseForm</div>
  )
}

