import Head from 'next/head'
import Image from 'next/image'
import { BoxContainer } from '@/components/domains/index'
// 型定義
import type { VFC } from 'react'
import { GetStaticProps } from 'next'

type Value = {
  id: string
  a: string
  b: string
  c: string
}

type Values = Value[]

type PropsType = {
  values: Values
}

const Home: VFC<PropsType> = ({ values }) => {
  return (
    <div className='flex flex-col justify-center items-center py-2 min-h-screen'>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col flex-1 justify-center items-center px-20 w-full text-center'>
        <div className='mb-10 md:mb-16'>
          <h2 className='text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6'>英略単語一覧</h2>

          <p className='max-w-screen-md text-gray-500 md:text-lg text-center mx-auto'>
            ボタンをクリックするだけで簡単にコピーすることができます。
          </p>
        </div>

        <p className='mt-3 text-2xl'>
          Get started by editing {` `}
          <code className='p-3 font-mono text-lg bg-gray-100 rounded-md'>pages/index.tsx</code>
        </p>

        <div className='flex flex-wrap justify-around items-center mt-6 max-w-4xl sm:w-full'>
          {values.map((v) => {
            return <BoxContainer key={v.id} href={v.id} title={v.a} description={v.b} />
          })}
        </div>
      </main>

      <footer className='flex justify-center items-center mt-5 w-full h-24 border-t'>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const topRes = await fetch(process.env.API_URL)
  const topJson = await topRes.json()
  const topArticle: Array<string> = topJson?.values

  return {
    props: {
      values: topArticle.map((item) => {
        return {
          id: item[0],
          a: item[1],
          b: item[2],
          c: item[3],
        }
      }),
    },
  }
}
