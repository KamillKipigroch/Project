import React from "react";
import { CategoryStore } from "./category.store";
import { ConditionStore } from "./condition.store";
import { OpinionStore } from "./opinion.store";
import { OrderStore } from "./order.store";
import { OrderStatusStore } from "./orderStatus.store";
import { ProductStore } from "./product.store";
import { ProductTypeStore } from "./productType.store";
import { QualityStore } from "./quality.store";
import { SubCategoryStore } from "./subCategory.store";
import { UserStore } from "./user.store";

export class RootStore {
  conditionStore: ConditionStore;
  categoryStore: CategoryStore;
  opinionStore: OpinionStore;
  orderStatusStore: OrderStatusStore;
  productTypeStore: ProductTypeStore;
  qualityStore: QualityStore;
  subCategoryStore: SubCategoryStore;
  productStore: ProductStore;
  orderStore: OrderStore;
  userStore: UserStore;

  constructor() {
    this.conditionStore = new ConditionStore(this);
    this.categoryStore = new CategoryStore(this);
    this.opinionStore = new OpinionStore(this);
    this.orderStatusStore = new OrderStatusStore(this);
    this.productTypeStore = new ProductTypeStore(this);
    this.qualityStore = new QualityStore(this);
    this.subCategoryStore = new SubCategoryStore(this);
    this.productStore = new ProductStore(this);
    this.orderStore = new OrderStore(this);
    this.userStore = new UserStore(this);
  }
}

const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);
