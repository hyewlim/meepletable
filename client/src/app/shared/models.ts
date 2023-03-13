export interface User {
  username: string
  password: string
  email: string
}

export interface Boardgame {
  id: number
  name: string
  yearPublished: number
  playingTime: number
  image: string
  thumbnail: string
  description: string
  comments: string

}
