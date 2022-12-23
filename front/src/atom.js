import { atom } from "recoil";

export const pageState = atom({
  key: "pageState",
  default: false,
});

export const loginState = atom({
  key: "loginState",
  default: false,
});
