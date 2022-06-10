export interface TokensObj {
    tokens: Tokens;
    user:   User;
}

export interface User {
    birthDate: string;
    firstName: string;
    lastName: string;
    profileId: string;
}
export interface Tokens {
    access: AccessToken;
    refresh: RefreshToken;
}

export interface AccessToken {
    token: string;
    expDate: string;
}
export interface RefreshToken {
    token: string;
    expDate: string;
}
  