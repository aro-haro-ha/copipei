import React from 'react'
import type { VFC } from 'react'
import { copyTextToClipboard } from '@/services/index'

type PropsType = {
  href: string
  styles?: string
  title: string
  description?: string
}

const BoxContainer: VFC<PropsType> = ({
  href,
  styles = 'p-6 mt-6 w-96 hover:text-blue-600 focus:text-blue-600 rounded-xl border',
  title,
  description,
}) => {
  return (
    <div className='flex items-stretch'>
      <button
        alt={description}
        className='m-3 bg-trnsparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white active:bg-yellow-400 py-2 px-4 border border-yellow-500 hover:border-transparent rounded '
        onClick={() => copyTextToClipboard(title)}
      >
        {title}
      </button>
    </div>
  )
}

export default BoxContainer
