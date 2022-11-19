import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { IAddProduct, IProduct } from "../models/ProductModel";
import {
  addProduct,
  disableVisibilityProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/ProductService";

export class ProductStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable products: IProduct[] = [];
  @observable loading: boolean = false;

  @computed get allProducts() {
    return this.products;
  }

  @computed get visibleProducts() {
    return this.products.filter((x) => x.visible === true);
  }

  @computed get notVisibleProducts() {
    return this.products.filter((x) => x.visible === false);
  }

  @action
  fetchProducts = async () => {
    try {
      this.loading = true;
      const response = await getProducts();
      runInAction(() => {
        this.products = response;
        this.loading = false;
      });
      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  getProductById = async (productId: number) => {
    try {
      this.loading = true;
      const response = await getProductById(productId);
      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  addProduct = async (productData: IAddProduct) => {
    try {
      this.loading = true;

      const response = await addProduct(productData);
      this.products = [...this.products, response];

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  updateProduct = async (productData: IProduct) => {
    try {
      this.loading = true;

      const response = await updateProduct(productData);
      const foundIndex = this.products.findIndex((x) => x.id === response.id);
      this.products[foundIndex] = response;

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  disableVisibility = async (productId: number) => {
    try {
      this.loading = true;
      await disableVisibilityProduct(productId);
      runInAction(async () => {
        await this.fetchProducts();
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };
}
