import { BookOpen, Bot, Settings2, SquareTerminal } from 'lucide-react'

import { useAuth } from '@/hooks/use-auth'

import { getCurrentCondominium } from './utils'

export function sidebarData() {
  const { user } = useAuth()
  const currentCondominium = getCurrentCondominium()

  return {
    user: {
      name: user?.user_metadata.name,
      email: user?.user_metadata.email,
      avatar: '',
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
            url: `/condominium/${currentCondominium}/threads`,
          },
          {
            title: 'Aguardando aprovações',
            url: `/condominium/${currentCondominium}/approvals`,
          },
          {
            title: 'Configurações',
            url: `/condominium/${currentCondominium}/threads/settings`,
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
