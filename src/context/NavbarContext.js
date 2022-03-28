import React, { useState, createContext } from "react";

const NavbarContext = createContext(false);

const NavbarProvider = ({ children }) => {

     const [modalIsOpen, setIsOpen] = useState(false);

     const toggleFunction = () => setIsOpen(!modalIsOpen)

     return (
          <NavbarContext.Provider value={{ modalIsOpen, toggleFunction }}>
               {children}
          </NavbarContext.Provider>
     );
};

export { NavbarContext, NavbarProvider };