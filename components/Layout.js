import Sidebar from './Sidebar'

const Main = ({ children }) => {
  return (  
    <div className="
      flex flex-col w-full max-h-screen overflow-y-auto bg-white dark:bg-black
      dark:text-neutral-400
      transition-all
    ">
      {children}
    </div>
  )
}

const Layout = ({ children }) => {
  return (
    <div className="relative flex w-full h-full min-h-screen">
      <Sidebar />
      <Main>{children}</Main>
    </div>
  )
}

export default Layout;