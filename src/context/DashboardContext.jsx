'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const DashboardContext = createContext()

export function DashboardContextProvider({ children }) {
  const [viewProject, setViewProject] = useState(false);

  const value ={
    viewProject, setViewProject
  }

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );

}

  export function useDashboardContext() {
    return useContext(DashboardContext);
  }



