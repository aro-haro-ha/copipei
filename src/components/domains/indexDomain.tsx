import React from 'react'
import type { VFC } from 'react'

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
    <a href={`${href}`} className={`${styles}`}>
      <h3 className='text-2xl font-bold'>{title}</h3>
      <p className='mt-4 text-xl'>{description}</p>
    </a>
  )
}

export default BoxContainer
