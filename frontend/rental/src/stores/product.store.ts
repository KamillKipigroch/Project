import { SelectChangeEvent } from "@mui/material";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";
import { IAddOrder, IOrder } from "../models/OrderModel";
import { IAddProductImage } from "../models/ProductImageModel";
import { IAddProduct, IProduct } from "../models/ProductModel";
import { getOrders } from "../services/OrderService";
import { addProductImage, deleteProductImage } from "../services/ProductImageService";
import {
  addProduct,
  disableVisibilityProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/ProductService";
import { authStore } from "./auth.store";
import { RootStore } from "./root.store";
import i18n from "i18next";

export class ProductStore {
  rootStore: RootStore;

  constructor(context: RootStore) {
    this.rootStore = context;
    makeObservable(this);
  }

  @observable products: IProduct[] = [];
  @observable loading: boolean = false;

  @observable isDetailsPopupOpen: boolean = false;
  @observable detailedProduct: IProduct | undefined;

  @observable isDetailsAreYouSurePopup: boolean = false;

  @observable isPhotoPopupOpen: boolean = false;

  @observable isPhotoDetailsPopupOpen: boolean = false;

  @observable isPopupOpen: boolean = false;
  @observable editMode: boolean = false;

  @observable orders: IOrder[] = [];

  @computed get allProducts() {
    return this.products;
  }

  @computed get visibleProducts() {
    return this.products.filter((x) => x.visible === true);
  }

  @computed get notVisibleProducts() {
    return this.products.filter((x) => x.visible === false);
  }

  @computed get countVisibleProducts() {
    return this.visibleProducts2.length;
  }

  @action
  fetchProducts = async () => {
    try {
      this.loading = true;
      const response = await getProducts();
      const res2 = await getOrders();

      runInAction(() => {
        this.products = response;
        this.orders = res2;

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

      await this.fetchProducts();

      toast.success(i18n.t("productAddToast"));

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

      await this.fetchProducts();

      toast.success(i18n.t("productUpdateToast"));

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

        toast.success(i18n.t("productDisableToast"));

        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  // FILTERS
  @observable searchFilter: string = "";
  @observable qualityFilter: string[] = [];
  @observable conditionFilter: string[] = [];
  @observable categoryFilter: string[] = [];
  @observable showOnlyVisible: boolean = false;

  @observable priceMin: number = 0;
  @observable priceValue: number[] = [this.priceMin, this.priceMin];

  @computed get maxPriceValue() {
    return Math.max(...this.visibleProducts.map((product) => product.price), 0);
  }

  @computed get visibleProducts2() {
    let products = this.products;

    // Change product visibility if is ordered
    const orderIds = this.orders.filter(x => !x.isFinished).map(x => x.productID);
    products.forEach(product => {
      if(orderIds.includes(product.id)) {
        product.visible = false
      }
    });

    // Visible filters
    if(this.showOnlyVisible){
      products = products.filter((x) => x.visible);
    }

    // Search bar
    products = products.filter((x) =>
      x.code.toLowerCase().includes(this.searchFilter)
    );

    // Quality filters
    if (this.qualityFilter.length) {
      products = products.filter((x) =>
        this.qualityFilter.includes(x.quality.code)
      );
    }

    // Condition filters
    if (this.conditionFilter.length) {
      products = products.filter((x) =>
        this.conditionFilter.includes(x.condition.code)
      );
    }

    // Price filter
    if (
      this.priceValue[0] !== this.priceMin ||
      this.priceValue[1] !== this.priceMin
    ) {
      products = products.filter(
        (x) => x.price >= this.priceValue[0] && x.price <= this.priceValue[1]
      );
    }

    // Category filter
    if (this.categoryFilter.length) {
      products = products.filter((x) =>
        this.categoryFilter.includes(x.subcategory.category.code)
      );
    }

     return products;
  }

  @action
  setSearchFilter = (value: string) => {
    this.searchFilter = value;
  };

  @action
  handleQualityFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      this.qualityFilter.push(e.target.value);
    } else {
      this.qualityFilter = this.qualityFilter.filter(
        (x) => x !== e.target.value
      );
    }
  };

  @action
  handleConditionFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      this.conditionFilter.push(e.target.value);
    } else {
      this.conditionFilter = this.conditionFilter.filter(
        (x) => x !== e.target.value
      );
    }
  };

  @action
  handlePriceRangeFilterChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    this.priceValue = newValue as number[];
  };

  @action
  handleCategoryFilterChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    this.categoryFilter = typeof value === "string" ? value.split(",") : value;
  };

  // DETAILS POPUP
  @action
  openDetailsPopup = (id: number) => {
    this.detailedProduct = this.products.find((x) => x.id === id);
    this.detailedProduct?.opinions.sort(
      (a, b) =>
        new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
    );
    this.isDetailsPopupOpen = true;
  };

  @action
  closeDetailsPopup = () => {
    this.isDetailsPopupOpen = false;
  };

  @action
  openDetailsAreYouSurePopup = () => {
    this.isDetailsAreYouSurePopup = true;
  };

  @action
  closeDetailsAreYouSurePopup = () => {
    this.isDetailsAreYouSurePopup = false;
  };

  @action
  createUserOrder = async () => {
    try {
      if (this.detailedProduct) {
        const order: IAddOrder = {
          productID: this.detailedProduct.id,
          userID: authStore.user_id!,
        };

        await this.rootStore.orderStore.addOrder(order);
        this.closeDetailsAreYouSurePopup();
        this.closeDetailsPopup();
        await this.fetchProducts();
      }
    } catch (error) {
      throw error;
    }
  };

  @action
  openPhotoPopup = (id: number) => {
    this.detailedProduct = this.allProducts.find((x) => x.id === id);
    this.isPhotoPopupOpen = true;
  };

  @action
  addPhotoToProduct = async (photo: IAddProductImage) => {
    if (this.detailedProduct) {
      photo.productId = this.detailedProduct.id;
      await addProductImage(photo);
      await this.fetchProducts();
      toast.success(i18n.t("productAddPhoto"));
    }
  };

  @action
  closePhotoPopup = () => {
    this.isPhotoPopupOpen = false;
  };

  @action
  openPhotoDetailsPopup = (id: number) => {
    this.detailedProduct = this.allProducts.find((x) => x.id === id);
    this.isPhotoDetailsPopupOpen = true;
  };

  @action
  closePhotoDetailsPopup = () => {
    this.isPhotoDetailsPopupOpen = false;
  };

  @action
  openPopup = (id?: number) => {
    console.log(this.detailedProduct)
    if (id) {
      this.detailedProduct = this.allProducts.find((x) => x.id === id);
      this.editMode = true;
    }
    this.isPopupOpen = true;
  }

  @action
  closePopup = () => {
    this.detailedProduct = undefined;
    console.log(this.detailedProduct)
    this.editMode = false;
    this.detailedProduct = undefined;
    this.isPopupOpen = false;
  }

  @action
  deletePhotoFromProduct = async (id: number) => {
    if (this.detailedProduct) {
      await deleteProductImage(id);
      await this.fetchProducts();
      this.detailedProduct = this.allProducts.find((x) => x.id === this.detailedProduct?.id);
      toast.success(i18n.t("productDeletePhoto"));
    }
  }

  @action
  changeOnlyAvailableVisible = async () => {
    this.showOnlyVisible = !this.showOnlyVisible;
  }
}
