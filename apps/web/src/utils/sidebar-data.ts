import {
  BookOpen,
  Bot,
  HouseIcon,
  PackageCheck,
  Settings2,
  SquareTerminal,
} from 'lucide-react'

import { useAuth } from '@/hooks/use-auth'

import { getCurrentCondominium } from './utils'

export function sidebarData() {
  const { user } = useAuth()
  const currentCondominium = getCurrentCondominium()

  if (!currentCondominium)
    return {
      user: {
        name: user!.name,
        email: user!.email,
        avatar: user?.avatar_url ?? null,
      },
      navMain: [],
    }

  return {
    user: {
      name: user!.name,
      email: user!.email,
      avatar: user?.avatar_url ?? null,
    },
    navMain: [
      {
        title: 'Condominio',
        url: '#',
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: 'Moradores',
            url: `/condominium/${currentCondominium}/residents`,
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
            url: `/condominium/${currentCondominium}/overview`,
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
            url: `/condominium/${currentCondominium}/threads`,
          },
          {
            title: 'Aguardando aprovações',
            url: `/condominium/${currentCondominium}/approvals`,
          },
        ],
      },
      {
        title: 'Encomendas',
        url: `#`,
        icon: PackageCheck,
        items: [
          {
            title: 'Todas encomendas',
            url: `/condominium/${currentCondominium}/deliveries`,
          },
        ],
      },
      {
        title: 'Áreas comum',
        url: `#`,
        icon: HouseIcon,
        items: [
          {
            title: 'Reservas',
            url: `/condominium/${currentCondominium}/leisure-area`,
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
