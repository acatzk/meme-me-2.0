'use client'

import Image from 'next/image'
import React, { ReactNode } from 'react'
import { ArrowLeft, Settings } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { trpc } from '~/trpc/client'
import { Button } from '~/components/ui/button'
import { Tab } from '~/app/(main)/_components/tab'
import { profileTabs } from '~/constant/profile-tabs'

export type ProfileLayoutProps = {
  children: ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps): JSX.Element {
  const router = useRouter()
  const pathname = usePathname()
  // const username = pathname.replace(/[/@]/g, '')
  const currentUser = trpc.user.currentUser.useQuery()

  const handleGoBackRoute = (): void => {
    router.back()
  }

  return (
    <div className="flex-1">
      <header className="flex items-center space-x-2 border-b border-stroke-3 px-4 py-2 text-core-secondary">
        <button
          type="button"
          onClick={handleGoBackRoute}
          className="rounded-full px-1 py-1.5 outline-primary"
        >
          <ArrowLeft className="stroke-4 h-5 w-5" />
        </button>
        <h1 className="text-sm font-bold uppercase">{currentUser?.data?.displayName}</h1>
      </header>
      <article className="">
        <section className="mx-auto w-full max-w-3xl px-4 py-6 text-core-secondary md:px-8">
          <div className="flex flex-col items-start gap-x-6 gap-y-4 md:flex-row md:gap-x-12">
            <Image
              src={
                currentUser?.data?.imageUrl ??
                'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
              }
              width={144}
              height={144}
              className="rounded-full border-[3px] border-white shadow outline-4"
              alt="User Profile"
            />
            <div className="flex flex-col space-y-3 text-sm">
              <div className="flex items-center space-x-6">
                <h2 className="line-clamp-1 text-base font-semibold">
                  {currentUser?.data?.username}
                </h2>
                <Button
                  type="button"
                  variant="secondary-outline"
                  className="px-2 py-1 text-sm font-bold text-core-secondary"
                >
                  Edit Profile
                </Button>
                <button type="button">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <a href="#" className="inline-flex items-center space-x-1 hover:underline">
                  <h4 className="font-bold">0</h4>
                  <span>posts</span>
                </a>
                <a href="#" className="inline-flex items-center space-x-1 hover:underline">
                  <h4 className="font-bold">0</h4>
                  <span>followers</span>
                </a>
                <a href="#" className="inline-flex items-center space-x-1 hover:underline">
                  <h4 className="font-bold">0</h4>
                  <span>following</span>
                </a>
              </div>
              <div className="flex flex-col space-y-0.5">
                <h1 className="font-bold uppercase">{currentUser?.data?.displayName}</h1>
                {/* <p className="text-core-secondary-300">I think therefore I am</p>
                <a href="#" className="font-semibold text-primary hover:underline">
                  joshuagalit.ga
                </a> */}
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="mx-auto w-full max-w-3xl">
          <nav>
            <ul className="flex items-center justify-evenly gap-x-4 sm:ml-[184px] sm:justify-normal md:ml-56 md:gap-x-8">
              {profileTabs.map(({ title, href, Icon }, index) => {
                const newHref = `/@${currentUser?.data?.username}${href}`
                const isActive = pathname === newHref

                return (
                  <Tab
                    key={index}
                    {...{
                      title,
                      href: newHref,
                      isActive,
                      TabIcon: Icon
                    }}
                  />
                )
              })}
            </ul>
          </nav>
          {children}
        </section>
      </article>
    </div>
  )
}
