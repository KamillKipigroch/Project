import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";
import { IAddProductType, IProductType } from "../models/ProductTypeModel";
import {
  addProductType,
  disableVisibilityProductType,
  getProductTypeById,
  getProductTypes,
  updateProductType,
} from "../services/ProductTypeService";

export class ProductTypeStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable productTypes: IProductType[] = [];
  @observable loading: boolean = false;

  @observable isPopupOpen: boolean = false;
  @observable editMode: boolean = false;
  @observable editedProductType: IProductType | undefined;

  @computed get allProductTypes() {
    return this.productTypes;
  }

  @computed get visibleProductTypes() {
    return this.productTypes.filter((x) => x.visible === true);
  }

  @computed get notVisibleProductTypes() {
    return this.productTypes.filter((x) => x.visible === false);
  }

  @action
  openPopup = (id?: number) => {
    if (id) {
      this.editedProductType = this.productTypes.find((x) => x.id === id);
      this.editMode = true;
    }
    this.isPopupOpen = true;
  };

  @action
  closePopup = () => {
    this.editMode = false;
    this.isPopupOpen = false;
  };

  @action
  fetchProductTypes = async () => {
    try {
      this.loading = true;
      const response = await getProductTypes();
      runInAction(() => {
        this.productTypes = response;
        this.loading = false;
      });
      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  getProductTypeById = async (productTypeId: number) => {
    try {
      this.loading = true;
      const response = await getProductTypeById(productTypeId);
      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  addProductType = async (productTypeData: IAddProductType) => {
    try {
      this.loading = true;

      const response = await addProductType(productTypeData);
      this.productTypes = [...this.productTypes, response];

      toast.success("Successfully added new product type!")

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  updateProductType = async (productTypeData: IProductType) => {
    try {
      this.loading = true;

      const response = await updateProductType(productTypeData);
      const foundIndex = this.productTypes.findIndex(
        (x) => x.id === response.id
      );
      this.productTypes[foundIndex] = response;

      toast.success("Successfully updated product type!")

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  disableVisibility = async (productTypeId: number) => {
    try {
      this.loading = true;
      await disableVisibilityProductType(productTypeId);
      runInAction(async () => {
        await this.fetchProductTypes();

        toast.success("Successfully disabled visibility of a product type!");

        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };
}
