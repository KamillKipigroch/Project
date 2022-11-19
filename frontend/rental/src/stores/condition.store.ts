import { action, makeObservable, observable, runInAction } from "mobx";
import { IAddCondition, ICondition } from "../models/ConditionModel";
import { addCondition, getConditions, updateCondition } from "../services/ConditionService";

export class ConditionStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable conditions: ICondition[] = [];
  @observable loading: boolean = false;

  @action
  getConditions = async () => {
    try {
      this.loading = true;
      const response = await getConditions();
      runInAction(() => {
        this.conditions = response;
        this.loading = false;
      });
      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  addCondition = async (conditionData: IAddCondition) => {
    try {
      this.loading = true;
      const response = await addCondition(conditionData);
      runInAction(() => {
        this.conditions = [...this.conditions, response];
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  updateCondition = async (conditionData: ICondition) => {
    try {
      this.loading = true;
      const response = await updateCondition(conditionData);
      runInAction(() => {
        const foundIndex = this.conditions.findIndex(x => x.id === response.id);
        this.conditions[foundIndex] = response;
        this.loading = false;
      })
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }
}
