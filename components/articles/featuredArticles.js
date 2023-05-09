import formatDate from '@/lib/utils/formatDate'
import Link from '../Link'
import Tag from '../Tag'

export const FeaturedArticles = ({ header, description, articles }) => {
  const MAX_DISPLAY = 4
  const articleData = articles?.data

  return (
    <>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {header}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!articleData.length && 'No posts found.'}
        {articleData.slice(0, MAX_DISPLAY).map((article) => {
          const { slug, createdAt, title, summary, tags } = article?.attributes
          return (
            <li key={slug} className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={createdAt}>{formatDate(createdAt)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            href={`/articles/${slug}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag.value} text={tag.label} />
                          ))}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <Link
                        href={`/articles/${slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Read "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
      <div className="flex justify-center text-base font-medium leading-6">
        <Link
          href="/articles"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          aria-label="all posts"
        >
          All Posts &rarr;
        </Link>
      </div>
    </>
  )
}
