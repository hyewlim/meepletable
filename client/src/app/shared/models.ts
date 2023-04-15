export interface User {
  username: string
  password: string
  email: string
  userId: string
}

export interface Boardgame {
  id: number
  name: string
  yearPublished: number
  playingTime: number
  image: string
  thumbnail: string
  comment: string
}

export interface Address {
  name: string
  position: {
    lat: number
    lng: number
  }

}

export interface GameSession {
  id: string
  title: string
  host: string
  address: Address
  date: Date
  playerCount: number
  comment: string
  icon: string;

}

export interface JWTResponse {

  token: string
  userId: string

}


