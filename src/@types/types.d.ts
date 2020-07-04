interface UserSeason{
    id: string,
    userName: string
    email: string
    lastLogin: Date
}

declare namespace Express{
  export interface Request{
    user: UserSeason

  }
}
