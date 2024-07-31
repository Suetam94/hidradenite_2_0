import React from 'react'

export interface IConfirmationModal {
  isOpen: boolean
  onSave: (answer: boolean) => Promise<void>
}

const ConfirmationModal = ({ isOpen, onSave }: IConfirmationModal): React.JSX.Element | null => {
  if (!isOpen) {
    return null
  }

  const handleAction = (answer: boolean): void => {
    onSave(answer).catch(err => { console.log(err) })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded shadow-md z-10">
        <p className="mb-4">Você confirma as alterações? Essa ação é irreversível</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-600 focus:outline-none"
            onClick={() => { handleAction(true) }}
          >
            Salvar
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none"
            onClick={() => { handleAction(false) }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
