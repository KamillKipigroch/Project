import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";
import {
  IAddOpinion,
  IAddOpinionImage,
  IOpinion,
  IUpdateOpinion,
} from "../models/OpinionModel";
import { IOrder } from "../models/OrderModel";
import { IProduct } from "../models/ProductModel";
import { addOpinionImage } from "../services/OpinionImageService";
import {
  addOpinion,
  disableVisibilityOpinion,
  getOpinions,
  updateOpinion,
} from "../services/OpinionService";
import { getProductById } from "../services/ProductService";
import { authStore } from "./auth.store";

export class OpinionStore {
  constructor(context: any) {
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
  openPopup = async (selectedOrder: IOrder, id?: number) => {
    this.order = selectedOrder;
    this.product = await getProductById(this.order.productID);
    
    if (id) {
      this.editMode = true;
    }

    this.isPopupOpen = true;
  };

  @action
  closePopup = () => {
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
        let file = opinionData.images.item(i)
        if (file) {
          await addOpinionImage(response.id, file);
        }
      }

      if (response) {
        await this.fetchOpinions();
      }

      toast.success("Successfully added opinion");

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  updateOpinion = async (opinionData: IUpdateOpinion) => {
    try {
      this.loading = true;

      const response = await updateOpinion(opinionData);
      const foundIndex = this.opinions.findIndex((x) => x.id === response.id);
      this.opinions[foundIndex] = response;

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  disableVisibility = async (opinionId: number) => {
    try {
      this.loading = true;
      await disableVisibilityOpinion(opinionId);
      runInAction(async () => {
        await this.fetchOpinions();
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };
}
