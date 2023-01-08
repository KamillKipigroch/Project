import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";
import { IAddQuality, IQuality } from "../models/QualityModel";
import {
  addQuality,
  disableVisibilityQuality,
  getQualities,
  getQualityById,
  updateQuality,
} from "../services/QualityService";
import i18n from "i18next";

export class QualityStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable qualities: IQuality[] = [];
  @observable loading: boolean = false;

  @observable isPopupOpen: boolean = false;
  @observable editMode: boolean = false;
  @observable editedQuality: IQuality | undefined;

  @computed get allQualities() {
    return this.qualities;
  }

  @computed get visibleQualities() {
    return this.qualities.filter((x) => x.visible === true);
  }

  @computed get notVisibleQualities() {
    return this.qualities.filter((x) => x.visible === false);
  }

  @action
  openPopup = (id?: number) => {
    if (id) {
      this.editedQuality = this.qualities.find((x) => x.id === id);
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
  fetchQualities = async () => {
    try {
      this.loading = true;
      const response = await getQualities();
      runInAction(() => {
        this.qualities = response;
        this.loading = false;
      });
      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  getQualityById = async (qualityId: number) => {
    try {
      this.loading = true;
      const response = await getQualityById(qualityId);
      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  addQuality = async (qualityData: IAddQuality) => {
    try {
      this.loading = true;

      const response = await addQuality(qualityData);
      this.qualities = [...this.qualities, response];

      toast.success(i18n.t("qualityAddToast"));

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  updateQuality = async (qualityData: IQuality) => {
    try {
      this.loading = true;

      const response = await updateQuality(qualityData);
      const foundIndex = this.qualities.findIndex((x) => x.id === response.id);
      this.qualities[foundIndex] = response;

      toast.success(i18n.t("qualityUpdateToast"));

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  disableVisibility = async (qualityId: number) => {
    try {
      this.loading = true;
      await disableVisibilityQuality(qualityId);
      runInAction(async () => {
        await this.fetchQualities();

        toast.success(i18n.t("qualityDisableToast"));

        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };
}
