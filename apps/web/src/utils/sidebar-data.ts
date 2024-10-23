import { useSuspenseQuery } from '@tanstack/react-query'
import { cookiesStorage } from '@treviaz/cookies'
import { getCookie } from 'cookies-next'
import { BookOpen, Bot, Settings2, SquareTerminal } from 'lucide-react'

import { useQueryGetRelationshipsWithCondominiums } from '@/hooks/react-query/queries/get-user-relationships-with-condominiums'
import { useAuth } from '@/hooks/use-auth'

export function sidebarData() {
  const { user } = useAuth()
  const currentCondominium = getCookie(cookiesStorage.CURRENT_CONDOMINIUM)

  const {
    data: { relantionships },
  } = useSuspenseQuery(useQueryGetRelationshipsWithCondominiums())

  return {
    user: {
      name: user?.user_metadata.name,
      email: user?.user_metadata.email,
      avatar: '/avatars/shadcn.jpg',
    },
    condominium: relantionships.map((relantionship) => {
      return {
        id: relantionship.condominium.id,
        name: relantionship.condominium.name,
        slug: relantionship.condominium.slug,
        role: relantionship.role,
        joined_at: relantionship.joined_at,
      }
    }),

    navMain: [
      {
        title: 'Condominio',
        url: '#',
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: 'Moradores',
            url: `/condominium/${currentCondominium}/livers`,
          },
          {
            title: 'Convites',
            url: `/condominium/${currentCondominium}/invites`,
          },
        ],
      },
      {
        title: 'Financeiro',
        url: '#',
        icon: Bot,
        items: [
          {
            title: 'Dashboard',
            url: `/condominium/${currentCondominium}/finance`,
          },
          {
            title: 'Pagamentos',
            url: `/condominium/${currentCondominium}/payments`,
          },
        ],
      },
      {
        title: 'Fórum',
        url: '#',
        icon: BookOpen,
        items: [
          {
            title: 'Tópicos',
            url: `/condominium/${currentCondominium}/topics`,
          },
          {
            title: 'Aguardando aprovações',
            url: `/condominium/${currentCondominium}/approvals`,
          },
          {
            title: 'Configurações',
            url: `/condominium/${currentCondominium}/topics/settings`,
          },
        ],
      },
      {
        title: 'Gerenciamento',
        url: '#',
        icon: Settings2,
        items: [
          {
            title: 'Configurações',
            url: `/condominium/${currentCondominium}/settings`,
          },
        ],
      },
    ],
    // projects: [
    //   {
    //     name: 'Design Engineering',
    //     url: '#',
    //     icon: Frame,
    //   },
    //   {
    //     name: 'Sales & Marketing',
    //     url: '#',
    //     icon: PieChart,
    //   },
    //   {
    //     name: 'Travel',
    //     url: '#',
    //     icon: Map,
    //   },
    // ],
  }
}
