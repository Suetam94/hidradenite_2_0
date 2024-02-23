export interface IPageContentText {
  page: string
  contentId: string
  textContent: string
}

export type ContentType = 'text' | 'media'

export interface IGeneralError {
  error: boolean
  message: string | string[]
}

export interface IDashboardForm {
  page: string
  contentId: string
}

export interface IConfirmationModal {
  isOpen: boolean
  onSave: (answer: boolean) => Promise<void>
}
