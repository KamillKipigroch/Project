import React from "react";

class RootStore {
  constructor() {}
}

const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);
