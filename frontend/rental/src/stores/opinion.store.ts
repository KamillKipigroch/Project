import { action, makeObservable, observable, runInAction } from "mobx";
import { IOpinion, IUpdateOpinion } from "../models/OpinionModel";
import { getOpinions, updateOpinion } from "../services/OpinionService";

export class OpinionStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable opinions: IOpinion[] = [];
  @observable loading: boolean = false;

  @action
  getOpinions = async () => {
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
  updateOpinion = async (opinionData: IUpdateOpinion) => {
    try {
      this.loading = true;
      const response = await updateOpinion(opinionData);
      runInAction(() => {
        const foundIndex = this.opinions.findIndex(x => x.id === response.id);
        this.opinions[foundIndex] = response;
        this.loading = false;
      })
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }
}