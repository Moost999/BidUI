'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MusicIcon, TrophyIcon, TicketIcon, StarIcon, CrownIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Bid = {
  userId: string
  amount: number
}

type Show = {
  id: number
  name: string
  artist: string
  bids: Bid[]
}

type Festival = {
  id: number
  name: string
  shows: Show[]
}

// Simulated data - in a real application, this would come from a database or API
const festivalData: Festival[] = [
  {
    id: 1,
    name: "Rock in Rio",
    shows: [
      { id: 101, name: "Noite do Metal", artist: "Iron Maiden", bids: [
        { userId: "user1", amount: 550 },
        { userId: "user2", amount: 600 },
        { userId: "user3", amount: 575 },
        { userId: "user4", amount: 525 },
      ]},
      { id: 102, name: "Legends of Rock", artist: "Guns N' Roses", bids: [
        { userId: "user2", amount: 700 },
        { userId: "user5", amount: 650 },
        { userId: "user6", amount: 675 },
        { userId: "user7", amount: 625 },
      ]},
    ]
  },
  {
    id: 2,
    name: "Lollapalooza",
    shows: [
      { id: 201, name: "Indie Night", artist: "Arctic Monkeys", bids: [
        { userId: "user3", amount: 480 },
        { userId: "user8", amount: 500 },
        { userId: "user9", amount: 490 },
        { userId: "user10", amount: 510 },
      ]},
      { id: 202, name: "Pop Extravaganza", artist: "Billie Eilish", bids: [
        { userId: "user1", amount: 550 },
        { userId: "user4", amount: 580 },
        { userId: "user7", amount: 600 },
        { userId: "user11", amount: 570 },
      ]},
    ]
  },
]

export default function BidResults() {
  const [results, setResults] = useState<Festival[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get results
    setTimeout(() => {
      setResults(festivalData)
      setIsLoading(false)
    }, 1500)
  }, [])

  const determineWinners = (bids: Bid[]): Bid[] => {
    return bids.sort((a, b) => b.amount - a.amount).slice(0, 4)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-background to-secondary">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-background to-secondary min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold text-center mb-6 text-primary"
      >
        Resultados das Apostas
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mb-8 text-muted-foreground text-xl"
      >
        Confira os vencedores de cada show!
      </motion.p>

      <Tabs defaultValue={results[0]?.id.toString()} className="w-full">
        <TabsList className="w-full justify-start mb-4 bg-card overflow-x-auto flex-nowrap">
          {results.map((festival) => (
            <TabsTrigger key={festival.id} value={festival.id.toString()} className="px-4 py-2">
              <MusicIcon className="mr-2" />
              {festival.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {results.map((festival) => (
          <TabsContent key={festival.id} value={festival.id.toString()}>
            <Card className="mb-8 bg-card shadow-lg overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="flex items-center text-3xl">
                  <MusicIcon className="mr-2" />
                  {festival.name}
                </CardTitle>
                <CardDescription className="text-primary-foreground/80 text-lg">
                  Resultados dos shows
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  {festival.shows.map((show) => (
                    <motion.div 
                      key={show.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 border-b last:border-b-0"
                    >
                      <h3 className="text-2xl font-semibold mb-4 flex items-center">
                        <TicketIcon className="mr-2 text-primary" />
                        {show.name} - {show.artist}
                      </h3>
                      <div className="bg-secondary p-6 rounded-lg shadow-inner">
                        <h4 className="text-xl font-medium mb-4 flex items-center">
                          <TrophyIcon className="mr-2 text-yellow-500" />
                          Vencedores:
                        </h4>
                        <ul className="space-y-3">
                          <AnimatePresence>
                            {determineWinners(show.bids).map((bid, index) => (
                              <motion.li 
                                key={bid.userId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex justify-between items-center bg-background p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                              >
                                <span className="flex items-center">
                                  {index === 0 && <CrownIcon className="mr-2 text-yellow-500" />}
                                  {index === 1 && <StarIcon className="mr-2 text-gray-400" />}
                                  {index === 2 && <StarIcon className="mr-2 text-amber-600" />}
                                  Usuário: {bid.userId}
                                </span>
                                <Badge variant={index === 0 ? "default" : "secondary"} className="text-lg px-3 py-1">
                                  {bid.amount} pontos
                                </Badge>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter className="bg-muted p-4">
                <Button className="w-full" variant="outline">
                  Ver detalhes completos do festival
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
