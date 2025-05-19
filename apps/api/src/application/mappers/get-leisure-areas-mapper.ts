import { IReserve } from '@treviaz/entities/schemas/IReserve'

export function getReservesMapper(reserves: IReserve[]) {
  return reserves.map((reserve) => ({
    id: reserve.id,
    title: reserve.title,
    start: reserve.start_date,
    end: reserve.end_date,
  }))
}
