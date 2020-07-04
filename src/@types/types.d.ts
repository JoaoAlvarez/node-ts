interface UserSeason{
    id: string
    userName: string
    email: string
    lastLogin: Date
    iat: number
    exp: number
}

declare namespace Express{
  export interface Request{
    user: UserSeason
  }

  export interface Error{
    status : number
  }
}
