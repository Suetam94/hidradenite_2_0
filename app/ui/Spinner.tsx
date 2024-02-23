import React from 'react'

const Spinner = (): React.JSX.Element => (
  <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.003 8.003 0 014.01 4.065L2.585 5.478A9.96 9.96 0 002 12c0 5.522 4.477 10 10 10v-4c-4.418 0-8-3.582-8-8z"></path>
  </svg>
)

export default Spinner
