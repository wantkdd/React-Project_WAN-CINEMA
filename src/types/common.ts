export type CommonRespense<T> = {
  status: number;
  statusCode: number;
  message: string;
  data: T;
};
