import siteMetadata from '@/data/siteMetadata'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

function Layout({ children }) {
  const layoutURI = `http://127.0.0.1:1337/api/Layout?filters[locale][$eq]=en&populate[logo]=*&populate[topMenu][populate]=*`
  const [menuItems, setMenuItems] = useState([])
  const [logo, setLogo] = useState(undefined)
  useEffect(() => {
    fetch(layoutURI, { method: 'GET' })
      .then((response) => response.json())
      .then((res) => {
        const { topMenu, logo } = res?.data?.attributes
        const { items } = topMenu?.data?.attributes
        setMenuItems(items)
        setLogo(logo?.data?.attributes?.url)
        console.log(logo?.data?.attributes)
      })
  }, [])
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">{logo && <Image src={logo} layout="fill" />}</div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {menuItems.map((link) => (
                <Link
                  key={link.label}
                  href={link.link}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav navLinks={menuItems} />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default Layout
