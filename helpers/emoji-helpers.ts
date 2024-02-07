export type Emoji = {
  id: string
  keywords: Keyword
  name: string
  native: string
  shortcodes: string
  unified: string
}

export type Keyword =
  | 'heart'
  | 'eyes'
  | 'love'
  | 'like'
  | 'affection'
  | 'valentines'
  | 'infatuation'
  | 'crush'

export const Reaction = {
  heart: 'heart',
  comment: 'comment',
  share: 'share',
  bookmark: 'bookmark'
} as const
