export interface User {
  username: string
  password: string
  email: string
  userId: number
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
  latitude: number
  longitude: number
}

export interface GameSession {

  host: string
  address: Address
  date: Date
  playerCount: number
  comment: string
}
