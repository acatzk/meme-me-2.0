import { MediaFiles } from './uploadthing'

export interface IPost {
  id: string
  title: string
  mediaFiles: MediaFiles[]
  createdAt: string
  updatedAt: string
  isHideLikeAndCount: boolean
  isTurnOffComment: boolean
  user: {
    id: number
    displayName: string
    email: string
    username: string
    imageUrl: string
  }
  postHashtags: {
    [x: string]: any
    hashtag: {
      tag: string
    }
  }
}

export interface IPostPage {
  nextCursor: number
  posts: IPost[]
}

export interface IUser {
  id: number
  externalId: string
  email: string
  displayName: string
  username: string
  imageUrl: string
  role: string
  _count: {
    followers: number
    following: number
    posts: number
  }
}
