import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";
import { IAddSubCategory, ISubCategory } from "../models/SubCategoryModel";
import {
  addSubCategory,
  disableVisibilitySubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
} from "../services/SubCategoryService";
import i18n from "i18next";

export class SubCategoryStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable subCategories: ISubCategory[] = [];
  @observable loading: boolean = false;

  @observable isPopupOpen: boolean = false;
  @observable editMode: boolean = false;
  @observable editedSubCategory: ISubCategory | undefined;

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
  openPopup = (id?: number) => {
    if (id) {
      this.editedSubCategory = this.subCategories.find((x) => x.id === id);
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

      toast.success(i18n.t("subCategoryAddToast"));

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

      toast.success(i18n.t("subCategoryUpdateToast"));

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

        toast.success(i18n.t("subCategoryDisabledToast"));

        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };
}
