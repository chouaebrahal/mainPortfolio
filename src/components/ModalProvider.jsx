import { useContext,createContext,useState } from "react";

const ModalContext =  createContext(null)


const ModalProvider = ({children}) => {
  const [isModalOpen,setIsModalOpen] = useState()
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const openProjectModal = (id) => {
    setSelectedProjectId(id);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null);
  };
  return (
    <ModalContext.Provider value={{isModalOpen,selectedProjectId,openProjectModal,closeProjectModal}} >
      {children}
    </ModalContext.Provider>
  )
}
export const useModal = () => useContext(ModalContext);
export default ModalProvider