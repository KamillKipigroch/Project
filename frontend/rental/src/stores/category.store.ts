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
import i18n from "i18next";

export class CategoryStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable categories: ICategory[] = [];
  @observable loading: boolean = false;
  
  @observable isPopupOpen: boolean = false;
  @observable editMode: boolean = false;
  @observable editedCategory: ICategory | undefined;

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
  openPopup = (id?: number) => {
    if (id) {
      this.editedCategory = this.categories.find(x => x.id === id);
      this.editMode = true;
    }
    this.isPopupOpen = true;
  }

  @action
  closePopup = () => {
    this.editMode = false;
    this.isPopupOpen = false;
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

      toast.success(i18n.t("categoryAddToast"));

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

      toast.success(i18n.t("categoryUpdateToast"));

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
        
        toast.success(i18n.t("categoryDisableToast"));
        
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };
}
