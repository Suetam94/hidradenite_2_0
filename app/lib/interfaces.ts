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

export interface IGeneralValidated {
  error: boolean
  message?: string | string[]
  user?: ICreateUser
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
  confirmAction?: (param: string) => void
  confirmParam?: string
}

export interface IColorPicker {
  title: string
  contentId: string
  page: string
}

export interface ISupportGroupEvent {
  eventDate: string
  location: string
  eventTime: string
  image: string
}

export interface ISupportGroupEvents {
  events: ISupportGroupEvent[]
}

export interface IUpdateSupportGroupEvent extends Partial<ISupportGroupEvent> {
  id: number
}

export interface ICreateUser {
  email: string
  username: string
  password: string
  name: string
  isAdmin: boolean
  phone: string
}

export interface IGetUser extends Partial<ICreateUser>, IGeneralValidated {
  id?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ICreateUserReturn extends Partial<IGeneralValidated> {
  username?: string
  email?: string
  password?: string
}

export interface ILogUser {
  username: string
  password: string
}

export interface IGetUserParam {
  id?: number
  username?: string
  email?: string
}
