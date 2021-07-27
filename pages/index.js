import Head from "next/head"
import { getPosts } from "../lib/posts"
import Link from "next/link"
import { DefaultSeo } from 'next-seo'

import moment from "moment"

export const getStaticProps = async () => {
  const posts = await getPosts()

  if (!posts) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      posts
    }
  }
}


export default function Home({ posts }) {

  return (
    <>
      <DefaultSeo
        titleTemplate = '%s | Eloi Cole'
        openGraph={{
          type: 'website',
          locale: 'en_EN',
          url: 'https://',
          site_name: 'Eloi Cole',
        }}
        twitter={{
          handle: '@',
          // cardType: 'summary_large_image',
        }}
      />

      <main className="">
        <h1 className="text-2xl my-8 font-bold">Thoughts on the tree of life </h1>
        <p className="">Small description </p>

        <ul>
          {posts.map((post) => 
            <li className="mt-3 text-lg" key={post.slug}>
              <span className='mr-3 font-semibold'>{moment(post.published_at).format("MM/YYYY")}</span>
              
              <Link href='/posts/[slug]' as={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          )}
        </ul>
      </main>

    </>
  )
}
