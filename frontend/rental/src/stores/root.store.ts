import React from "react";
import { CategoryStore } from "./category.store";
import { ConditionStore } from "./condition.store";
import { OpinionStore } from "./opinion.store";
import { OrderStatusStore } from "./orderStatus.store";

class RootStore {
  conditionStore: ConditionStore;
  categoryStore: CategoryStore;
  opinionStore: OpinionStore;
  orderStatusStore: OrderStatusStore; 

  constructor() {
    this.conditionStore = new ConditionStore(this);
    this.categoryStore = new CategoryStore(this);
    this.opinionStore = new OpinionStore(this);
    this.orderStatusStore = new OrderStatusStore(this);
  }
}

const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);
