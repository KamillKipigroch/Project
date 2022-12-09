import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";
import { IAddCategory, ICategory } from "../models/CategoryModel";
import {
  addCategory,
  disableVisibilityCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../services/CategoryService";

export class CategoryStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable categories: ICategory[] = [];
  @observable loading: boolean = false;

  @computed get allCategories() {
    return this.categories;
  }

  @computed get visibleCategories() {
    return this.categories.filter((x) => x.visible === true);
  }

  @computed get notVisibleCategories() {
    return this.categories.filter((x) => x.visible === false);
  }

  @action
  fetchCategories = async () => {
    try {
      this.loading = true;
      const response = await getCategories();
      runInAction(() => {
        this.categories = response;
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  getCategoryById = async (categoryId: number) => {
    try {
      this.loading = true;
      const response = await getCategoryById(categoryId);
      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  addCategory = async (categoryData: IAddCategory) => {
    try {
      this.loading = true;

      const response = await addCategory(categoryData);
      this.categories = [...this.categories, response];

      toast.success("Successfully added new category!");

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  updateCategory = async (categoryData: ICategory) => {
    try {
      this.loading = true;

      const response = await updateCategory(categoryData);
      const foundIndex = this.categories.findIndex((x) => x.id === response.id);
      this.categories[foundIndex] = response;

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  disableVisibility = async (categoryId: number) => {
    try {
      this.loading = true;
      await disableVisibilityCategory(categoryId);
      runInAction(async () => {
        await this.fetchCategories();
        
        toast.success("Successfully disabled visibility of a category!");
        
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };
}
