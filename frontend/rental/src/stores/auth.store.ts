import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import {
  IDecodedToken,
  IUserLoginForm,
  IUserRegistrationForm,
} from "../models/AuthModel";
import { login, register } from "../services/AuthService";
import jwt_decode from "jwt-decode";

class AuthStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable accessToken: string | null = null;
  @observable rol: string[] | null = null;
  @observable name: string | null = null;
  @observable preferred_username: string | null = null;
  @observable email: string | null = null;

  @observable loading: boolean = false;

  @computed get isAuth() {
    return !!this.accessToken;
  }

  @action
  login = async (loginData: IUserLoginForm) => {
    try {
      this.loading = true;

      const response = await login(loginData);

      runInAction(() => {
        this.accessToken = response.accessToken;
        this.decodeJwtToken();
        this.saveDataToLocalStorage();
      });

      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  register = async (registrationData: IUserRegistrationForm) => {
    try {
      this.loading = true;

      const response = await register(registrationData);

      runInAction(() => {
        this.accessToken = response.accessToken;
        this.decodeJwtToken();
        this.saveDataToLocalStorage();
      });

      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  logout = () => {
    this.clearStore();
    window.localStorage.removeItem("jwt");
  };

  @action
  autoLogin = () => {
    this.clearStore();
    this.accessToken = localStorage.getItem("jwt");

    if (!this.accessToken) {
      return;
    }

    this.decodeJwtToken();
  };

  @action
  decodeJwtToken = () => {
    if (!this.accessToken) {
      return;
    }

    const decodedToken = jwt_decode<IDecodedToken>(this.accessToken);
    this.rol = decodedToken.rol;
    this.name = decodedToken.name;
    this.preferred_username = decodedToken.preferred_username;
    this.email = decodedToken.email;
  };

  @action
  saveDataToLocalStorage = () => {
    if (this.accessToken) {
      window.localStorage.setItem("jwt", this.accessToken);
    }
  };

  @action
  clearStore = () => {
    this.accessToken = null;
    this.rol = null;
    this.name = null;
    this.preferred_username = null;
    this.email = null;
  };
}

export default AuthStore;
