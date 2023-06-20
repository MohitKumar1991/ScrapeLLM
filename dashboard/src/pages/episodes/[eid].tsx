import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Menu } from "../../components/podcast/menu"
import { useRouter } from "next/router"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { cn, readableTime } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import polygonAlphaPodcast from '../../../public/podcasts/polygon_alpha_podcast/details.json'
import { useEffect, useState } from "react"

//convert Name to initials -  Justin Havens to JH
const nameToInitials = (name: string) => {
  const names = name.split(" ")
  let initials = ""
  names.forEach((name) => {
    initials += name.charAt(0)
  })
  return initials
}


export interface EpisodeDetails {
  summaries: Summary[],
  transcripts: Transcript[]
}

export interface Transcript {
    speaker: string,
    podcast: string,
    start: number,
    end: number
}

export interface Summary {
  title: string,
  summary: string
}

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
  const router = useRouter()
  let episodeId = router.query.eid || 'NaN';
  //check if is array
  if (Array.isArray(episodeId)) {
    episodeId = episodeId[0]
  }

  //check if episode Id is a valid number
  if (isNaN(parseInt(episodeId))) {
    return <div>Invalid episode id</div>
  }

  const episodeDetails = polygonAlphaPodcast['episodes'][parseInt(episodeId)];
  console.log("episodeDetails",episodeDetails)
  if (!episodeDetails) {
    return <div>Episode not found</div>
  }
  const fileName = episodeDetails.file.split(".")[0] + "_summary.json"
  
  const [ episodeSummary, setEpisodeSummary ]  = useState<EpisodeDetails>();
  //get the filename from the podcast details and make http request to /podcasts/{filename} to load the details
  useEffect(() => {
    fetch(`/podcasts/polygon_alpha_podcast/${fileName}`)
      .then((response) => response.json())
      .then((data) => {
        setEpisodeSummary(data)
      }).catch(err => {
        console.log(err)
      })
  },[episodeId])
  
  return (
    <>
      <div className="hidden md:block" data-section="music">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-8">
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="podcast" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="podcast" className="relative">
                          Podcast Summary
                        </TabsTrigger>
                        <TabsTrigger value="transcript">
                          Transcript
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent
                      value="podcast"
                      className="border-none p-0 outline-none" >
                      <div className="flex items-center justify-between">
                      <Image
                            src={episodeDetails.image}
                            alt={episodeDetails.title}
                            width={150}
                            height={150}
                            className={'square'}
                      />
                        <div className="space-y-1 text-left ml-4">
                          <h2 className="text-2xl font-normal">
                            {episodeDetails.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {episodeDetails.date} | Episode No <span className="font-bold">{episodeDetails.number}</span>
                          </p>
                        </div>
                      </div>     
                      <div className="mt-12 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Description
                        </h2>
                        <p className="text-sm text-muted-foreground whitespace-break-spaces">
                          {episodeDetails.description}
                        </p>
                      </div>
                      <Separator className="my-8" />
                      <h2 className="text-2xl font-semibold tracking-tight">
                          Summary
                        </h2>
                      {  episodeSummary && episodeSummary['summaries'].map((sm:Summary) => (<Card className={cn("w-[800px] my-4")}>
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
                    </TabsContent>
                    <TabsContent
                      value="transcript"
                      className="h-full flex-col border-none p-0 space-y-2"
                    >
                    { episodeSummary && episodeSummary['transcripts'].map((t:Transcript) => (<div className=" flex items-center space-x-4 rounded-md border p-4">
                        {
                          parseInt(t['speaker'])%2 == 0? <UtteranceInfo start={t['start']} end={t['end']} name={nameToInitials(episodeDetails["speakers"][t['speaker']] || episodeDetails["speakers"]['0'])} /> :  null
                        }
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-muted-foreground">
                            {t['podcast']}
                          </p>
                        </div>
                        {
                          parseInt(t['speaker'])%2 == 1? <UtteranceInfo start={t['start']} end={t['end']} name={nameToInitials(episodeDetails["speakers"][t['speaker']] || episodeDetails["speakers"]['0'])} />  :  null}
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