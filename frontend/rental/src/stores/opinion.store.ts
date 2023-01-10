import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";
import { IAddOpinion, IOpinion } from "../models/OpinionModel";
import { IOrder } from "../models/OrderModel";
import { IProduct } from "../models/ProductModel";
import { addOpinionImage, deleteOpinionImage } from "../services/OpinionImageService";
import {
  addOpinion,
  disableVisibilityOpinion,
  getOpinions,
  updateOpinion,
} from "../services/OpinionService";
import { getProductById } from "../services/ProductService";
import { authStore } from "./auth.store";
import i18n from "i18next";
import { RootStore } from "./root.store";

export class OpinionStore {
  rootStore: RootStore;
  
  constructor(context: RootStore) {
    this.rootStore = context;
    makeObservable(this);
  }

  @observable opinions: IOpinion[] = [];
  @observable loading: boolean = false;

  @observable isPopupOpen: boolean = false;
  @observable editMode: boolean = false;
  @observable editedOpinion: IOpinion | undefined;
  @observable order: IOrder | undefined;
  @observable product: IProduct | undefined;

  @computed get allOpinions() {
    return this.opinions;
  }

  @computed get visibleOpinions() {
    return this.opinions.filter((x) => x.visible === true);
  }

  @computed get notVisibleOpinions() {
    return this.opinions.filter((x) => x.visible === false);
  }

  @action
  openPopup = async (selectedOrder: IOrder, edited?: boolean) => {
    this.order = selectedOrder;
    this.product = await getProductById(this.order.productID);

    if (edited) {
      this.editedOpinion = this.getUserOpinions(authStore.email!).find(x => x.product.id === selectedOrder.productID);
      this.editMode = true;
    }

    this.isPopupOpen = true;
  };

  @action
  closePopup = () => {
    this.editMode = false;
    this.editedOpinion = undefined;
    this.isPopupOpen = false;
  };

  @action
  fetchOpinions = async () => {
    try {
      this.loading = true;
      const response = await getOpinions();
      runInAction(() => {
        this.opinions = response;
        this.loading = false;
      });
      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  addOpinionByUser = async (opinionData: IAddOpinion) => {
    try {
      this.loading = true;

      if (authStore.email && this.product) {
        opinionData.emailUser = authStore.email;
        opinionData.productID = this.product.id;
      }

      const response = await addOpinion(opinionData);

      for (let i = 0; i < opinionData.images.length; i++) {
        let file = opinionData.images.item(i);
        if (file) {
          await addOpinionImage(response.id, file);
        }
      }

      if (response) {
        await this.fetchOpinions();
        await this.rootStore.orderStore.getUserOrders();
      }

      toast.success(i18n.t("opinionAddToast"));

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  updateOpinion = async (opinionData: IAddOpinion) => {
    try {
      this.loading = true;

      if (authStore.email && this.product) {
        opinionData.emailUser = authStore.email;
        opinionData.productID = this.product.id;
      }

      if (this.editedOpinion) {
        opinionData.id = this.editedOpinion?.id;
      }

      const response = await updateOpinion(opinionData);

      for (let i = 0; i < opinionData.images.length; i++) {
        let file = opinionData.images.item(i);
        if (file) {
          await addOpinionImage(response.id, file);
        }
      }

      if (response) {
        await this.fetchOpinions();
        await this.rootStore.orderStore.fetchOrders();
      }

      toast.success(i18n.t("updateOpinionToast"));

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  disableVisibility = async (selectedOrder: IOrder) => {
    try {
      this.loading = true;
      const opinion = this.getUserOpinions(authStore.email!).find(x => x.product.id === selectedOrder.productID);
      
      if (opinion) {
        await disableVisibilityOpinion(opinion.id);
      }

      runInAction(async () => {
        await this.fetchOpinions();
        await this.rootStore.orderStore.getUserOrders();
        toast.success(i18n.t("deleteOpinionToast"))
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  getUserOpinions = (email: string) => {
    return this.opinions.filter((x) => x.user.email === email);
  };

  @action
  checkIfOpinionCanBeAdded = (productId: number) => {
    const userOpinions = this.getUserOpinions(authStore.email!);

    return userOpinions.find((x) => x.product.id === productId)
      ? false
      : true;
  };

  @action
  deletePhotoFromOpinion = async (id: number) => {
    if (this.editedOpinion) {
      await deleteOpinionImage(id);
      await this.fetchOpinions();
      this.editedOpinion = this.opinions.find((x) => x.id === this.editedOpinion?.id);
      toast.success(i18n.t("deletedPhotoToast"));
    }
  }
}
