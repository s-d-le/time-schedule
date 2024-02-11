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
  date?: string
  start: string
  end?: string
}

export type EventDay = {
  day: Days
  title?: string
  available?: boolean
  timeSlots: TimeSlots[]
}
