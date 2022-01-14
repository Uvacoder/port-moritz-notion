import { createContext, useState } from "react"

import { SEO } from './SEO';

const globalNavigationContext = {
  isOpen: false,
  setIsOpen: (val) => {},
}

export const GlobalNavigationContext = createContext(
  globalNavigationContext
)

export function Providers({ children, pageProps }) {
  const [state, setState] = useState({
    isOpen: false,
    setIsOpen,
  })

  function setIsOpen(isOpen) {
    return setState({ ...state, isOpen })
  }

  return (
    <>
      <SEO />
      <GlobalNavigationContext.Provider value={state}>
        {children}
      </GlobalNavigationContext.Provider>
    </>
  )
}