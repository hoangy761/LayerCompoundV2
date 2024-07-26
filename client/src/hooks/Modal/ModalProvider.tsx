import React, { createContext, useState, PropsWithChildren } from 'react';

interface ModalContextProps {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return <ModalContext.Provider value={{ showModal, openModal, closeModal }}>{children}</ModalContext.Provider>;
};
