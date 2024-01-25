import React from 'react'
import dynamic from 'next/dynamic'

import { Tag, delimiters, dummyTags } from '~/helpers/tag-helpers'

const ReactTags = dynamic(async () => (await import('react-tag-input')).WithContext, {
  ssr: false
})

export type TagInputProps = {
  state: {
    tags: Tag[]
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>
  }
}

export const TagInput = (props: TagInputProps): JSX.Element => {
  const {
    state: { tags, setTags }
  } = props

  const handleDeleteTag = (i: number): void => {
    setTags(tags.filter((_, index) => index !== i))
  }

  const handleAdditionTag = (tag: Tag): void => {
    setTags([...tags, tag])
  }

  const handleDragTag = (tag: Tag, currPos: number, newPos: number): void => {
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    // re-render
    setTags(newTags)
  }

  return (
    <ReactTags
      tags={tags}
      suggestions={dummyTags?.map((hashtag) => ({
        id: hashtag.id.toString(),
        text: hashtag.text
      }))}
      delimiters={delimiters}
      handleDelete={handleDeleteTag}
      handleAddition={handleAdditionTag}
      handleDrag={handleDragTag}
      inputFieldPosition="bottom"
      autocomplete
      placeholder="Add tags"
      renderSuggestion={({ text }, query) => <span>{`#${text}`}</span>}
    />
  )
}
