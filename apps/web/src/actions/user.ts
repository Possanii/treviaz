import { getAllUsersRelantioshipsWithCondominiums } from '@/http/user/get-user-relantionships-with-condominiums'

export async function getAllUsersRelantioshipsWithCondominiumsAction() {
  const { relantionships } = await getAllUsersRelantioshipsWithCondominiums()

  return { relantionships }
}
