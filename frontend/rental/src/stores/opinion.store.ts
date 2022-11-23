import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { IAddOpinion, IOpinion, IUpdateOpinion } from "../models/OpinionModel";
import {
  addOpinion,
  disableVisibilityOpinion,
  getOpinions,
  updateOpinion,
} from "../services/OpinionService";

export class OpinionStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable opinions: IOpinion[] = [];
  @observable loading: boolean = false;

  @computed get allOpinions() {
    return this.opinions;
  }

  // There is no visible field - it will be uncommented in the future
  // @computed get visibleOpinions() {
  //   return this.opinions.filter((x) => x.visible === true);
  // }

  // @computed get notVisibleOpinions() {
  //   return this.opinions.filter((x) => x.visible === false);
  // }

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
  addOpinion = async (opinionData: IAddOpinion) => {
    try {
      this.loading = true;

      const response = await addOpinion(opinionData);

      if (response) {
        await this.fetchOpinions();
      }

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
