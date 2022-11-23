import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { IAddSubCategory, ISubCategory } from "../models/SubCategoryModel";
import {
  addSubCategory,
  disableVisibilitySubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
} from "../services/SubCategoryService";

export class SubCategoryStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable subCategories: ISubCategory[] = [];
  @observable loading: boolean = false;

  @computed get allSubCategories() {
    return this.subCategories;
  }

  @computed get visibleSubCategories() {
    return this.subCategories.filter((x) => x.visible === true);
  }

  @computed get notVisibleSubCategories() {
    return this.subCategories.filter((x) => x.visible === false);
  }

  @action
  fetchSubCategories = async () => {
    try {
      this.loading = true;
      const response = await getSubCategories();
      runInAction(() => {
        this.subCategories = response;
        this.loading = false;
      });
      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  getSubCategoryById = async (subCategoryId: number) => {
    try {
      this.loading = true;
      const response = await getSubCategoryById(subCategoryId);
      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  addSubCategory = async (subCategoryData: IAddSubCategory) => {
    try {
      this.loading = true;

      const response = await addSubCategory(subCategoryData);
      this.subCategories = [...this.subCategories, response];

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  updateSubCategory = async (subCategoryData: ISubCategory) => {
    try {
      this.loading = true;

      const response = await updateSubCategory(subCategoryData);
      const foundIndex = this.subCategories.findIndex(
        (x) => x.id === response.id
      );
      this.subCategories[foundIndex] = response;

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  disableVisibility = async (subCategoryId: number) => {
    try {
      this.loading = true;
      await disableVisibilitySubCategory(subCategoryId);
      runInAction(async () => {
        await this.fetchSubCategories();
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };
}
