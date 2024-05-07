import { CommomQuestion } from '@prisma/client'

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
  supportGroup?: ISupportGroupEvent
  updatedSupportGroup?: Partial<ISupportGroupEvent>
  article?: IArticle
  commonQuestion?: Partial<ICommonQuestion>
}

export interface ICommonQuestion {
  id?: number
  question: string
  answer: string
}

export interface IArticle {
  id?: number
  title: string
  link: string
  resume: string
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
  id?: number
  eventDate: string
  location: string
  eventTime: string
  imageFile?: File
  imageBuffer?: Buffer
  imageString?: string
  isSvg?: boolean
  isUpdating?: boolean
}

export interface INormalizedSupportGroupEvent {
  id: number
  eventDate: string
  location: string
  eventTime: string
  image: string
  isSvg?: boolean
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
