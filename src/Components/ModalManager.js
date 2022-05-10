import { createContext, cloneElement, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { nanoid } from "nanoid";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [components, setComponent] = useState([]);

  return (
    <ModalContext.Provider value={{ components, setComponent }}>
      {children}
      <ModalPortal />
    </ModalContext.Provider>
  );
};

export const useModalManager = () => {
  const { components, setComponent } = useContext(ModalContext);

  const addModal = (Component, id = nanoid()) => {
    setComponent((previousComponents) => {
      //   find is id exists
      const index = previousComponents.findIndex(({ id: _id }) => _id === id);
      if (index !== -1) return previousComponents;
      return [...previousComponents, { id, Component }];
    });
    return id;
  };

  const removeModal = (id) => {
    setComponent((previousPopups) => {
      const index = previousPopups.findIndex((popup) => popup.id === id);
      if (index === -1) return previousPopups;
      return [
        ...previousPopups.slice(0, index),
        ...previousPopups.slice(index + 1),
      ];
    });
  };

  return { components, addModal, removeModal };
};

const ModalPortal = () => {
  const { components, addModal, removeModal } = useModalManager();

  window.ModalManagement = { addModal, removeModal };

  return createPortal(
    components.map(({ id, Component }) =>
      cloneElement(Component, { key: id, id })
    ),
    document.getElementById("portal")
  );
};

export const PromiseWrapper = (Component, customID) => (props) => {
  const { addModal, removeModal } = window.ModalManagement;

  return new Promise((resolve, reject) => {
    const id = addModal(
      <Component
        {...props}
        submitHandler={(props) => {
          resolve(props);
          removeModal(id);
        }}
        closeHandler={(props) => {
          reject(props);
          removeModal(id);
        }}
      />,
      customID
    );
  });
};
