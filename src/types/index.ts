import dayjs from "dayjs";

export type AuthContextValue = {
  userId: number | null;
  userToken: string | null;
  setLoginData: ({ userId, userToken }: LoginData) => void;
  clearLoginData: () => void;
};

export type LoginData = {
  userId: number;
  userToken: string;
};

export interface Id {
  id: number;
}

export interface NewUser {
  email: string;
  name?: string;
  address?: string;
  phone?: string;
  token?: string;
}

export interface User extends Id {
  email: string;
  name?: string;
  address?: string;
  phone?: string;
  token: string;
}

export interface Image {
  fileName: string;
  authorName: string;
  authorLink: string;
  platformName: string;
  platformLink: string;
}

export interface TreatmentType extends Id {
  name: string;
  durationInMinutes: number;
  image: Image;
  description: string;
}

export interface StaffType extends Id {
  name: string;
  treatmentNames: string[];
  image: Image;
}

export interface MonthYear {
  year: string;
  month: string;
  startDate: dayjs.Dayjs;
  firstDayOfWeek: number;
  lastDate: number;
}

export interface AppointmentType extends Id {
  dateTime: string;
  treatmentName: string;
  userId?: number;
}

export type AppointmentDateMap = Record<number, AppointmentType[]>;
