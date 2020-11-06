import React from 'react'
const UserContext=React.createContext();
const UserProvider=UserContext.Provider;
const Userconsumer=UserContext.Consumer;
export {UserContext, UserProvider,Userconsumer }