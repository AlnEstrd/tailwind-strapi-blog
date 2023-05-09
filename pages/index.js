import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { ComponentMap } from '@/lib/componentMap'

export async function getServerSideProps() {
  const homeURI = `${process.env.STRAPI_API_URL}Home?filters[locale][$eq]=en&populate[content][populate][articles][populate]=*`

  const res = await fetch(homeURI, { method: 'GET' })

  const { data } = await res.json()
  const { content } = data?.attributes

  return { props: { content } }
}

export default function Home({ content }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {content.map((element) => {
          const El = ComponentMap(element)
          return (
            <div key={element.name}>
              <El />
            </div>
          )
        })}
      </div>
    </>
  )
}
