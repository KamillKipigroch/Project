import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { IAddQuality, IQuality } from "../models/QualityModel";
import {
  addQuality,
  disableVisibilityQuality,
  getQualities,
  getQualityById,
  updateQuality,
} from "../services/QualityService";

export class QualityStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable qualities: IQuality[] = [];
  @observable loading: boolean = false;

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
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };
}
