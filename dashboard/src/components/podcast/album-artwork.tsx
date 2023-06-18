import Image from "next/image"
import { ListMusic, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Link from 'next/link';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
/*
Type for 
 "title": "Swapping Through Time | TimeSwap | Ricsson Ngo, Harshita Singh, Ameeth Devadas | Polygon Alpha Pod",
            "number": "25",
            "date": "APR 6, 2023",
            "description": "Decentralized and oracle-less fixed time preference protocol. Lend and borrow without the use of oracles",
            "url": "https://polygonalpha.substack.com/p/swapping-through-time-timeswap-ricsson",
            "speakers": {
                "0": "Justin Havens",
                "1": "Ricsson Ngo",
                "2": "Harshita Singh",
                "3": "Ameeth Devadas"
            },
            "image": "https://substackcdn.com/image/fetch/w_320,h_213,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fba97d23e-9b49-474a-b8c6-4f3e6465fada_640x640.png",
            "file": "april.mp3"
*/
export interface Album {
  image: string
  title: string
  description: string
  date: string
  number: string
  url: string
}


interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album
  aspectRatio?: "portrait" | "square"
  width?: number
  url: string
  height?: number
}

export function AlbumArtwork({
  album,
  url,
  aspectRatio = "square",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <Link href={url}>
            <div className="overflow-hidden rounded-md">
              <Image
                src={album.image}
                alt={album.title}
                width={width}
                height={height}
                className={cn(
                  "h-auto w-auto object-cover transition-all hover:scale-105",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
              />
            </div>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {/* {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <ListMusic className="mr-2 h-4 w-4" /> {playlist}
                </ContextMenuItem>
              ))} */}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.title}</h3>
        <p className="text-xs text-muted-foreground">{album.date}</p>
      </div>
    </div>
  )
}