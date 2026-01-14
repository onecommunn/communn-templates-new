"use client";

import { createContext } from "react";
import { ILoginData } from "../models/user.model";

export interface IAuthContext {
  loading: boolean;
  user: any;
  isAuthenticated: boolean;
  getAccessToken: () => string;
  login?: (a: ILoginData) => void;
  logout?: () => void;
  getCommunity?: () => string;
  autoLogin: (phoneNumber: string, emailId: string, token: any) => void;
  autoCreate: (a: any) => void;
  roleType: boolean;
  communityId: string;
  userData: any;
}
export const AuthContext = createContext<IAuthContext>({
  loading: true,
  user: "",
  isAuthenticated: false,
  getAccessToken: () => "",
  login: (a: ILoginData) => {},
  logout: () => {},
  getCommunity: () => "",
  autoLogin: (phoneNumber: string) => {},
  autoCreate: (a: any) => {},
  roleType: false,
  communityId: "",
  userData: null,
});
