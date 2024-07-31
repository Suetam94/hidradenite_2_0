export const isFormDataEmpty = (formData: FormData): boolean => {
  const formObject = Object.fromEntries(formData.entries())
  return Object.values(formObject).every(value => value === '')
}

export const sanitizeFormData = (formData: FormData): FormData => {
  const sanitizedForm = new FormData()
  formData.forEach((value, key) => {
    if (value !== '') {
      sanitizedForm.append(key, value)
    }
  })
  return sanitizedForm
}
