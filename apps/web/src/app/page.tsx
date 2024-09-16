import { Button } from '@treviaz/ui/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-start">
      {'Hello world!'}
      <Button variant={'destructive'}>Click me!</Button>
    </div>
  )
}
