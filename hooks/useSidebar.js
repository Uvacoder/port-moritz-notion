import { useContext } from 'react'

import { GlobalNavigationContext } from "../components/Providers";

export default function useSidebar() {
  return useContext(GlobalNavigationContext)
}
