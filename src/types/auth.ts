import { CommonRespense } from './common';

export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

export type ResponseSignupDto = CommonRespense<{
  id: number;
  name: string;
  email: string;
  bio: null | string;
  avatar: null | string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type RequestSigninDto = {
  email: string;
  password: string;
};
export type ResponseSigninDto = CommonRespense<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

export type ResponseMyInfoDto = CommonRespense<{
  id: number;
  name: string;
  email: string;
  bio: null | string;
  avatar: null | string;
  createdAt: Date;
  updatedAt: Date;
}>;
