export type AuthContextValue = {
  userId: number;
  userToken: string;
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

export interface Staff extends Id {
  name: string;
  treatmentNames: string[];
  image: Image;
}
