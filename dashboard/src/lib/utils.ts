import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
//convert time like 43.938763 into readable time like 43s
//100.12 -> 1m40s
//3700 -> 1hr1m40s
export function readableTime(time: number) {
  let seconds = Math.round(time % 60)
  let minutes = Math.floor(time / 60)
  let hours = Math.floor(minutes / 60)
  minutes = minutes % 60
  if (hours) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else if (minutes) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
}


