export interface ResponseUserLoggedInApi {
  isSuccessful: boolean;
  message: string;
  data: UserLoggedIn;
  error: null;
}

export interface UserLoggedIn {
  userId: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profile: string;
  state: boolean;
  authorities: Authority[];
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}

export interface Authority {
  authority: string;
}
