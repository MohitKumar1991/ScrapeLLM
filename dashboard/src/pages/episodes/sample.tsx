import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Menu } from "../../components/podcast/menu"
import { useRouter } from "next/router"
import podcastSummary from "../../../public/podcast_summary.json"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import YoutubeEmbed from "@/components/podcast/video"
import { cn, readableTime } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import ReactTextFormat from 'react-text-format';
import polygonAlphaPodcast from '../../../public/podcasts/polygon_alpha_podcast/details.json'

export interface Album {
  name: string
  artist: string
  cover: string
}

export interface PodCast {
  title: string
  number: string
  date: string
  description: string
  url: string
}

export interface UtteranceInfoProps {
  start: number
  end: number
  name: string
}


const UtteranceInfo = ({ start, end, name }: UtteranceInfoProps) => {
  return <div className="flex items-center space-y-2 flex-col"> 

        <Avatar>                        
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        {/* <Clock width={10}></Clock> */}
        <p className="text-sm text-muted-foreground text-center">
            {readableTime(start)} - {readableTime(end)}
        </p>
        
        </div>
}

const LinkText = (
  decoratedHref: string,
  decoratedText: string,
  linkTarget: string
) => {
  return (
    <a
      href={decoratedHref}

      target={"_blank"}
      rel='noopener'
      className='underline'
    >
      {decoratedText}
    </a>
  )
}
 

export default function EpisodePage() {
  console.log("EPISODE PAGE");
  const router = useRouter()
  const episodeId = router.query.eid

  const episodeDetails = podcastSummary['episode'];
  return (
    <>
      <div className="hidden md:block" data-section="music">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="podcast" className="relative">
                          Podcast
                        </TabsTrigger>
                        <TabsTrigger value="summary">
                          Summary
                        </TabsTrigger>
                        <TabsTrigger value="transcript">Transcript</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent
                      value="summary"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                    { podcastSummary['summaries'].map((sm) => (<Card className={cn("w-[800px] my-4")}>
                        <CardHeader>
                          <CardTitle>{sm['title']}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                          <div className=" flex items-center space-x-4 rounded-md border p-4">
                            <div className="flex-1 space-y-2">
                              <p className="text-md text-muted-foreground">
                                {sm['summary']}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>))
                    }
                      <Separator className="my-4" />
                    </TabsContent>
                    <TabsContent
                      value="podcast"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1 text-center">
                          <h2 className="text-2xl font-normal">
                            {episodeDetails.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {episodeDetails.date} | Episode No <span className="font-bold">{episodeDetails.number}</span>
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      
                      <div className="space-x-4 pb-4">
                        <YoutubeEmbed embedId="NHOFkcun06s" />
                      </div>
                      
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Description
                        </h2>
                        <p className="text-sm text-muted-foreground whitespace-break-spaces">
                          <ReactTextFormat linkDecorator={LinkText}>{episodeDetails.description}</ReactTextFormat>
                        </p>
                      </div>
                      <Separator className="my-4" />
                    </TabsContent>
                    <TabsContent
                      value="transcript"
                      className="h-full flex-col border-none p-0 space-y-2"
                    >
                    {podcastSummary['transcripts'].map(t => (<div className=" flex items-center space-x-4 rounded-md border p-4">
                        {
                          t['speaker'] == '0'? <UtteranceInfo start={t['start']} end={t['end']} name={"MM"} /> :  null
                        }
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-muted-foreground">
                            {t['podcast']}
                          </p>
                        </div>
                        {
                          t['speaker'] == '1'? <UtteranceInfo start={t['start']} end={t['end']} name={"CN"} />  :  null}
                      </div> ))}
                      <Separator className="my-4" />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}