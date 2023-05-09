/* eslint-disable react/display-name */
import NewsletterForm from '@/components/NewsletterForm'
import { FeaturedArticles } from '@/components/articles/featuredArticles'
import { BannerCTA } from '@/components/banners/bannerCTA'
import { FeaturedText } from '@/components/text/featuredText'
export const ComponentMap = (element) => {
  const map = {
    'banners.banner-cta': BannerCTA,
    'text.featured-text': FeaturedText,
    'articles.featured-articles': FeaturedArticles,
    'sections.subscribe': (props) => {
      return (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm {...props} />
        </div>
      )
    },
  }

  const componentName = element.__component

  if (map[componentName]) {
    const El = map[componentName]
    return () => <El {...element} />
  }
  return () => <div></div>
}
