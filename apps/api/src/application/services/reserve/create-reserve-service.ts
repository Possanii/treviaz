import { prisma } from '@/application/libs/prisma'

export class CreateReserveService {
  async execute(
    requesterId: string,
    leisureAreaId: string,
    startDate: Date,
    endDate: Date
  ) {
    console.log('leisureAreaId')
    const reserve = await prisma.reserve.create({
      data: {
        title: 'Reserva de área de lazer',
        start_date: startDate,
        end_date: endDate,
        status: 'PENDING',
        user: {
          connect: {
            id: requesterId,
          },
        },
        leisureArea: {
          connect: {
            id: leisureAreaId,
          },
        },
      },
    })

    return reserve
  }
}
