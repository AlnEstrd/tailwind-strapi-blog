import PageTitle from '@/components/PageTitle'
import Tag from '@/components/Tag'
import formatDate from '@/lib/utils/formatDate'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

export async function getServerSideProps(context) {
  const slug = context?.params?.slug
  const articleURI = `http://127.0.0.1:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`

  const res = await fetch(articleURI, { method: 'GET' })
  const { data } = await res.json()
  const postRaw = data[0]?.attributes

  const mdxSource = await serialize(postRaw.content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  })

  const post = {
    ...postRaw,
    content: mdxSource,
  }

  return { props: { post } }
}

export default function Article({ post }) {
  const { title, content, tags, publishedAt } = post
  return (
    <>
      <div className="mt-24 text-center">
        <PageTitle>{`${title}`}</PageTitle>
      </div>
      <div className="mt-2 text-center">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          </dd>
        </dl>
      </div>
      <div className="mt-3 text-center">
        {tags.length > 0 && tags.map((tag) => <Tag key={tag.value} text={tag.label} />)}
      </div>
      <div className="mt-3 text-center">
        <MDXRemote {...content} />
      </div>
    </>
  )
}
