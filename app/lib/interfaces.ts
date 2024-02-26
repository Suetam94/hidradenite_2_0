export interface IPageContentText {
  page: string
  contentId: string
  textContent?: string
  color?: string
}

export interface IPageContentMedia {
  page: string
  contentId: string
  mediaContent: Buffer
}

export interface IPageContentMediaClient {
  page: string
  contentId: string
  mediaFile: File
}

export type PageContentType = IPageContentText | IPageContentMedia

export type ContentType = 'text' | 'media'

export interface IGeneralError {
  error: boolean
  message: string | string[]
}

export interface IDashboardForm {
  page: string
  contentId: string
  formTitle: string
  defaultColor?: string
}

export interface IDashboardImageForm {
  page: string
  contentId: string
  formTitle: string
}

export interface IConfirmationModal {
  isOpen: boolean
  onSave: (answer: boolean) => Promise<void>
}

export interface IFeedbackModal {
  isOpen: boolean
  onClose: (isOpen: boolean) => void
  title: string
}

export interface IColorPicker {
  title: string
  contentId: string
  page: string
}
