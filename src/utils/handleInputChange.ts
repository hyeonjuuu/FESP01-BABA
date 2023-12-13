import { useState, ChangeEvent } from 'react'

type FormData = {
  [key: string]: string
}

const useFormInput = (initialData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialData)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  return {
    formData,
    handleInputChange
  }
}

export default useFormInput
