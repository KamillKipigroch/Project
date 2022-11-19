import { action, makeObservable, observable, runInAction } from "mobx";
import { IAddCategory, ICategory } from "../models/CategoryModel";
import { addCategory, getCategories, updateCategory } from "../services/CategoryService";

export class CategoryStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable categories: ICategory[] = [];
  @observable loading: boolean = false;

  @action
  getCategories = async () => {
    try {
      this.loading = true;
      const response = await getCategories()
      runInAction(() => {
        this.categories = response;
        this.loading = false;
      })
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  addCategory = async (categoryData: IAddCategory) => {
    try {
      this.loading = true;
      const response = await addCategory(categoryData);
      runInAction(() => {
        this.categories = [...this.categories, response];
        this.loading = false;
      })
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  updateCategory = async (categoryData: ICategory) => {
    try {
      this.loading = true;
      const response = await updateCategory(categoryData);
      runInAction(() => {
        const foundIndex = this.categories.findIndex(x => x.id === response.id);
        this.categories[foundIndex] = response;
        this.loading = false;
      })
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }
}