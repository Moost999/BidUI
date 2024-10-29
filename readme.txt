'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast, Toaster } from "@/components/ui/sonner"
import { MusicIcon, TicketIcon, CoinsIcon } from 'lucide-react'

type Festival = {
  id: number
  name: string
  slogan: string
  options: string[]
  currentBids: { [key: string]: number }
}

const festivals: Festival[] = [
  {
    id: 1,
    name: "Rock in Rio",
    slogan: "Por um mundo melhor",
    options: ["Iron Maiden", "Metallica", "Guns N' Roses", "Red Hot Chili Peppers"],
    currentBids: { "Iron Maiden": 500, "Metallica": 600, "Guns N' Roses": 550, "Red Hot Chili Peppers": 480 }
  },
  {
    id: 2,
    name: "Lollapalooza",
    slogan: "A experiência musical definitiva",
    options: ["Arctic Monkeys", "The Strokes", "Billie Eilish", "Post Malone"],
    currentBids: { "Arctic Monkeys": 450, "The Strokes": 480, "Billie Eilish": 520, "Post Malone": 500 }
  },
  {
    id: 3,
    name: "Coachella",
    slogan: "Música e artes",
    options: ["Beyoncé", "Daft Punk", "Radiohead", "Kendrick Lamar"],
    currentBids: { "Beyoncé": 700, "Daft Punk": 650, "Radiohead": 600, "Kendrick Lamar": 620 }
  }
]

export default function BettingPage() {
  const [userBids, setUserBids] = useState<{ [key: string]: number }>({})
  const [userPoints, setUserPoints] = useState(2000) // Iniciando com 2000 pontos

  const handleBid = (festivalId: number, option: string, bidAmount: number) => {
    const festival = festivals.find(f => f.id === festivalId)
    if (!festival) return

    if (bidAmount <= festival.currentBids[option]) {
      toast.error(`Sua aposta deve ser maior que a aposta atual de ${festival.currentBids[option]} pontos.`)
      return
    }

    if (bidAmount > userPoints) {
      toast.error("Você não tem pontos suficientes para esta aposta.")
      return
    }

    const userBidsForFestival = Object.entries(userBids).filter(([key]) => key.startsWith(`${festivalId}-`))
    if (userBidsForFestival.length >= 4 && !userBids[`${festivalId}-${option}`]) {
      toast.error("Você já atingiu o limite de 4 apostas para este festival.")
      return
    }

    setUserBids(prev => ({
      ...prev,
      [`${festivalId}-${option}`]: bidAmount
    }))

    setUserPoints(prev => prev - bidAmount + (prev[`${festivalId}-${option}`] || 0))

    toast.success(`Aposta de ${bidAmount} pontos realizada para ${option}!`)
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-background to-secondary">
      <h1 className="text-4xl font-bold text-center mb-6 text-primary">Leilão de Ingressos para Shows</h1>
      <p className="text-center mb-8 text-muted-foreground">Faça suas apostas! Limite de 4 ingressos por show.</p>
      
      <div className="flex justify-between items-center mb-8 bg-card p-4 rounded-lg shadow-md">
        <Badge variant="secondary" className="text-lg p-2">
          <CoinsIcon className="mr-2" />
          Seus Pontos: {userPoints}
        </Badge>
        <Button 
          size="lg" 
          onClick={() => toast.success(`Apostas confirmadas! Boa sorte!`)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Confirmar Todas as Apostas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {festivals.map(festival => (
          <Card key={festival.id} className="w-full bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="flex items-center">
                <MusicIcon className="mr-2" />
                {festival.name}
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">{festival.slogan}</CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="space-y-4">
                {festival.options.map(option => (
                  <div key={option} className="bg-secondary p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <Label htmlFor={`bid-${festival.id}-${option}`} className="text-lg font-semibold">{option}</Label>
                      <Badge variant="outline">
                        Aposta Atual: {festival.currentBids[option]}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Input 
                        id={`bid-${festival.id}-${option}`}
                        type="number" 
                        placeholder="Sua aposta"
                        min={festival.currentBids[option] + 1}
                        className="flex-grow"
                      />
                      <Button 
                        onClick={() => {
                          const input = document.getElementById(`bid-${festival.id}-${option}`) as HTMLInputElement
                          handleBid(festival.id, option, parseInt(input.value))
                        }}
                        className="whitespace-nowrap"
                      >
                        <TicketIcon className="mr-2" />
                        Apostar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Badge variant="secondary" className="w-full justify-center py-2">
                {Object.entries(userBids).filter(([key]) => key.startsWith(`${festival.id}-`)).length} / 4 apostas realizadas
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Toaster />
    </div>
  )
}
