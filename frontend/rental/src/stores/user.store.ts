import { action, makeObservable, observable, runInAction } from "mobx";
import { IUser, IUserLock } from "../models/UserModel";
import { getUsers, lockUser, unlockUser } from "../services/UserService";
import i18n from "i18next";
import { toast } from "react-toastify";

export class UserStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable users: IUser[] = [];
  @observable loading: boolean = false;

  @action
  fetchUsers = async () => {
    try {
      this.loading = true;
      const response = await getUsers();
      runInAction(() => {
        this.users = response;
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  lockUser = async (userData: IUserLock) => {
    try {
      this.loading = true;

      await lockUser(userData);
      await this.fetchUsers();

      toast.success(i18n.t("userLockToast"));

      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  unlockUser = async (userData: IUserLock) => {
    try {
      this.loading = true;

      await unlockUser(userData);
      await this.fetchUsers();

      toast.success(i18n.t("userUnlockToast"));

      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };
}