export enum Days {
  Mon = 'Monday',
  Tue = 'Tuesday',
  Wed = 'Wednesday',
  Thu = 'Thursday',
  Fri = 'Friday',
  Sat = 'Saturday',
  Sun = 'Sunday'
}

export type TimeSlots = {
  timeSlotEntry?: string
  startTime: string
  endTime?: string
}

export type EventDay = {
  day: Days
  available: boolean
  timeSlots: TimeSlots[] | undefined
}
