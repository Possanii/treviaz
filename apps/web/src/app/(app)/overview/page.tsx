import { Button } from '@treviaz/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@treviaz/ui/components/ui/card'
import {
  BarChart2,
  Check,
  FileStack,
  FileText,
  Mail,
  MessageCircle,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '@/assets/logo/logo.png'
import TreviazDashboard from '@/assets/treviaz-dashboard.png'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center gap-4 justify-between">
          <Link className="flex items-center justify-center" href="#">
            <Image src={Logo} alt="Treviaz Logo" className="size-14" />
            <span className="text-xl font-bold">Treviaz</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6 items-center">
            <Link
              className="text-sm font-medium hover:text-green-600 hover:underline underline-offset-4"
              href="#recursos"
            >
              Recursos
            </Link>
            <Link
              className="text-sm font-medium hover:text-green-600 hover:underline underline-offset-4"
              href="#oQueDizem"
            >
              O que dizem
            </Link>
            <Link
              className="text-sm font-medium hover:text-green-600 hover:underline underline-offset-4"
              href="#precos"
            >
              Preços
            </Link>
            <Link
              className="text-sm font-medium hover:text-green-600 hover:underline underline-offset-4 "
              href="#faq"
            >
              FAQ
            </Link>
            <Button
              className="border-none bg-green-500 hover:bg-green-600"
              asChild
            >
              <Link
                className="text-sm text-black font-medium"
                href="/auth/sign-in"
              >
                Entrar
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-green-500 to-green-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <Image
                src={TreviazDashboard}
                width={700}
                height={500}
                alt="Dashboard do Treviaz"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                    Gerencie suas Finanças com Facilidade
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    Plataforma completa para faturas, leads, colaboração em
                    equipe e insights financeiros.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    className="bg-white text-green-600 hover:bg-green-300"
                    size="lg"
                    asChild
                  >
                    <Link href="/auth/sign-in">Comece Agora</Link>
                  </Button>
                  <Button
                    className="bg-white text-green-600 hover:bg-green-300"
                    size="lg"
                  >
                    Saiba Mais
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="recursos"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Recursos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-green-600" />}
                title="Gestão de Faturas"
                description="Crie, envie e acompanhe faturas sem esforço."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-green-600" />}
                title="Rastreamento de Leads"
                description="Gerencie e nutra seus leads de forma eficaz."
              />
              <FeatureCard
                icon={<Mail className="h-10 w-10 text-green-600" />}
                title="Convites para Equipe"
                description="Colabore perfeitamente com os membros da sua equipe."
              />
              <FeatureCard
                icon={<MessageCircle className="h-10 w-10 text-green-600" />}
                title="Fórum da Comunidade"
                description="Interaja com outros usuários e compartilhe insights."
              />
              <FeatureCard
                icon={<FileStack className="h-10 w-10 text-green-600" />}
                title="Gestão de Conteúdo"
                description="Crie e gerencie posts para o seu negócio."
              />
              <FeatureCard
                icon={<BarChart2 className="h-10 w-10 text-green-600" />}
                title="Insights Financeiros"
                description="Obtenha análises detalhadas e relatórios sobre suas finanças."
              />
            </div>
          </div>
        </section>
        <section
          id="oQueDizem"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              O que Nossos Clientes Dizem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="O Treviaz revolucionou a forma como gerenciamos nossas finanças. É intuitivo e poderoso!"
                author="Maria Silva, CEO da TechStart"
              />
              <TestimonialCard
                quote="O recurso de gestão de faturas por si só nos economizou inúmeras horas todos os meses."
                author="João Santos, Designer Freelancer"
              />
              <TestimonialCard
                quote="O fórum da comunidade é uma mina de ouro de informações e oportunidades de networking."
                author="Ana Oliveira, Proprietária de Pequena Empresa"
              />
            </div>
          </div>
        </section>
        <section
          id="precos"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Planos de Preços
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                title="Iniciante"
                price="R$149"
                features={[
                  'Gestão básica de faturas',
                  'Até 100 leads',
                  '5 membros da equipe',
                  'Acesso ao fórum da comunidade',
                ]}
              />
              <PricingCard
                title="Profissional"
                price="R$399"
                features={[
                  'Gestão avançada de faturas',
                  'Leads ilimitados',
                  '25 membros da equipe',
                  'Suporte prioritário no fórum',
                  'Insights financeiros',
                ]}
              />
              <PricingCard
                title="Empresarial"
                price="Personalizado"
                features={[
                  'Plataforma completa',
                  'Tudo ilimitado',
                  'Gerente de conta dedicado',
                  'Integrações personalizadas',
                  'Suporte premium 24/7',
                ]}
              />
            </div>
          </div>
        </section>
        <section
          id="faq"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Perguntas Frequentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <FAQItem
                question="Quão seguro são meus dados financeiros?"
                answer="Usamos criptografia e medidas de segurança de nível bancário para garantir que seus dados estejam sempre protegidos."
              />
              <FAQItem
                question="Posso integrar o Treviaz com minhas ferramentas existentes?"
                answer="Sim, oferecemos integrações com softwares de contabilidade e sistemas de CRM populares."
              />
              <FAQItem
                question="Existe um período de teste gratuito disponível?"
                answer="Oferecemos um teste gratuito de 14 dias para todos os nossos planos, sem necessidade de cartão de crédito."
              />
              <FAQItem
                question="Com que frequência novos recursos são adicionados?"
                answer="Lançamos atualizações e novos recursos mensalmente, sempre melhorando nossa plataforma."
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-500 to-green-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Pronto para Transformar as Finanças do Seu Negócio?
                </h2>
                <p className="mx-auto max-w-[600px] text-green-100 md:text-xl">
                  Junte-se a milhares de clientes satisfeitos e assuma o
                  controle do seu futuro financeiro hoje.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  className="bg-white text-green-600 hover:bg-green-300"
                  size="lg"
                >
                  Inicie seu Teste Gratuito
                </Button>
                <Button
                  className="bg-white text-green-600 hover:bg-green-300"
                  size="lg"
                >
                  Fale com Vendas
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 Treviaz. Todos os direitos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Termos de Serviço
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}

function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="text-4xl font-semibold text-green-600">"</div>
        <p className="mt-4 text-gray-600">{quote}</p>
        <p className="mt-4 font-semibold">{author}</p>
      </CardContent>
    </Card>
  )
}

function PricingCard({
  title,
  price,
  features,
}: {
  title: string
  price: string
  features: string[]
}) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-3xl font-bold">
          {price}
          <span className="text-sm font-normal">/mês</span>
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full mt-6">Escolher Plano</Button>
      </CardContent>
    </Card>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{answer}</p>
      </CardContent>
    </Card>
  )
}
