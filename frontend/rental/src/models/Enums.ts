export enum UserRole {
  User = "User",
  Admin = "Admin",
}

export enum OrderStatus {
  Submitted = "Submitted",
  InRealization = "In realization",
  Completed = "Completed",
}

export enum Sizes {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "XXXL",
}

export const getEnumKeys = <T extends Object>(
  enumToDeconstruct: T
): Array<keyof typeof enumToDeconstruct> => {
  return Object.keys(enumToDeconstruct) as Array<
    keyof typeof enumToDeconstruct
  >;
};
