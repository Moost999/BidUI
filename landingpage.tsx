import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Shield, Key, Users } from 'lucide-react'

export default function LandingPage() {
  const [email, setEmail] = useState('')

  const features = [
    { icon: <Camera className="h-6 w-6" />, title: 'Reconhecimento Facial Avançado', description: 'Tecnologia de ponta para identificação precisa e segura.' },
    { icon: <Shield className="h-6 w-6" />, title: 'Segurança Reforçada', description: 'Proteção robusta contra fraudes e acessos não autorizados.' },
    { icon: <Key className="h-6 w-6" />, title: 'Acesso Simplificado', description: 'Entre em segundos, sem senhas complicadas.' },
    { icon: <Users className="h-6 w-6" />, title: 'Gerenciamento de Usuários', description: 'Controle total sobre permissões e acessos.' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">FacialAccessPro</h1>
          <div className="space-x-4">
            <Button variant="ghost">Sobre</Button>
            <Button variant="ghost">Contato</Button>
            <Button variant="outline">Login</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Revolucione o Acesso com Reconhecimento Facial
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Segurança avançada e conveniência em um só lugar.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Comece Agora
            </Button>
          </motion.div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">Nossos Recursos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {feature.icon}
                      <span>{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Como Funciona</CardTitle>
              <CardDescription>Veja como é fácil começar a usar o FacialAccessPro</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cadastro" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
                  <TabsTrigger value="configuracao">Configuração</TabsTrigger>
                  <TabsTrigger value="uso">Uso Diário</TabsTrigger>
                </TabsList>
                <TabsContent value="cadastro">
                  <p>1. Crie sua conta com e-mail e senha</p>
                  <p>2. Faça o upload de uma foto clara do seu rosto</p>
                  <p>3. Confirme seu cadastro</p>
                </TabsContent>
                <TabsContent value="configuracao">
                  <p>1. Defina as áreas de acesso permitidas</p>
                  <p>2. Configure as políticas de segurança</p>
                  <p>3. Adicione usuários adicionais, se necessário</p>
                </TabsContent>
                <TabsContent value="uso">
                  <p>1. Aproxime-se do ponto de acesso</p>
                  <p>2. Olhe para a câmera</p>
                  <p>3. Acesso concedido em segundos!</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Pronto para Começar?</CardTitle>
              <CardDescription>Inscreva-se para uma demonstração gratuita</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email" 
                      placeholder="seu@email.com" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Saiba Mais</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Solicitar Demo</Button>
            </CardFooter>
          </Card>
        </section>
      </main>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 FacialAccessPro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
