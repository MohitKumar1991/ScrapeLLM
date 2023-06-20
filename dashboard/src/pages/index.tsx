import { Metadata } from "next"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { AlbumArtwork } from "../components/podcast/album-artwork"
import { Menu } from "../components/podcast/menu"
import Image from "next/image"
import polygonAlphaPodcast from '../../public/podcasts/polygon_alpha_podcast/details.json'
import { Skeleton } from "@/components/ui/skeleton"

export interface Album {
  image: string
  title: string
  description: string
  date: string
  number: string
  url: string
}

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
}


export default function MusicPage() {
  return (
    <>
    <div className="md:hidden lg:hidden">
      Please see on Desktop - Not optimised for mobile right now
    </div>
      <div className="hidden md:block bg-slate-100" data-section="music">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:pt-16 lg:px-12">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Crypto made digestible by AI</h1>
              <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Get AI generated summaries of top crypto content every day in your inbox</p>
              <div className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-0 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700" role="alert">
                <span className="p-2 px-5 text-sm font-medium">Supported by Community</span>
                <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                  Learn more
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </a>
              </div>
            </div>
            <div className="grid lg:grid-cols-5">
              <div className="col-span-6 lg:col-span-6 lg:border-l">
                <div className="px-4 py-6 lg:px-8">
                  <div defaultValue="music" className="space-y-6 max-w-full">
                    <div
                      className="border-none p-0 outline-none">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-3xl font-semibold tracking-tight">
                            Polygon Alpha Podcast
                          </h2>
                          <p className="text-sm text-muted-foreground">
                          Polygon Community insights from today’s leaders in decentralized finance and crypto
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {polygonAlphaPodcast.episodes.map((episode, idx) => (
                            <AlbumArtwork
                                key={episode.number}
                                album={episode}
                                url={"/episodes/"+idx}
                                className="w-[150px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                  <div defaultValue="music" className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="my-16">
                        <h2 className="text-3xl font-semibold tracking-tight">
                          Bankless Podcast
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Coming soon....
                          </p>
                          <div className="flex items-center mt-8">
                              <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[250px]" />
                              <Skeleton className="h-4 w-[200px]" />
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

