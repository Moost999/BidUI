"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, MapPin, Ticket, Plus, Trash2 } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Show {
  id: string
  name: string
  artist: string
  date: string
  time: string
  venue: string
  image: string
}

interface BetLine {
  id: number
  points: string
}

const show: Show = {
  id: '1',
  name: 'Summer Vibes Festival',
  artist: 'Various Artists',
  date: '2023-07-15',
  time: '18:00',
  venue: 'Sunshine Arena',
  image: '/placeholder.svg?height=400&width=600'
}

export default function Bid() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [betLines, setBetLines] = useState<BetLine[]>([{ id: 1, points: '' }])

  const addBetLine = () => {
    if (betLines.length < 4) {
      setBetLines([...betLines, { id: Date.now(), points: '' }])
    } else {
      toast.warning('Máximo de 4 ingressos permitido!', { position: 'top-center' })
    }
  }

  const removeBetLine = (id: number) => {
    setBetLines(betLines.filter(line => line.id !== id))
  }

  const updateBetPoints = (id: number, points: string) => {
    setBetLines(betLines.map(line => line.id === id ? { ...line, points } : line))
  }

  const handleBetSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (betLines.some(line => line.points === '')) {
      toast.error('Por favor, preencha todos os campos de pontos.', { position: 'top-center' })
      return
    }
    console.log('Submitted bets:', betLines)
    toast.success('Aposta realizada com sucesso!', { position: 'top-center' })
    setIsDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8 flex items-center justify-center">
      <Card className="w-full max-w-md overflow-hidden bg-white/90 backdrop-blur-md shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader className="relative p-0">
            <img src={show.image} alt={show.name} className="w-full h-56 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <CardTitle className="text-white text-3xl font-bold mb-2">{show.name}</CardTitle>
              <CardDescription className="text-gray-200 text-lg">{show.artist}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="mr-2 h-5 w-5 text-purple-500" />
              {new Date(show.date).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="mr-2 h-5 w-5 text-purple-500" />
              {show.time}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="mr-2 h-5 w-5 text-purple-500" />
              {show.venue}
            </div>
          </CardContent>
          <CardFooter>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <Ticket className="mr-2 h-5 w-5" />
                  Apostar em Ingressos
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white rounded-xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-800">Faça sua Aposta</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Escolha a quantidade de ingressos e os pontos para cada aposta.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBetSubmit} className="space-y-6">
                  <AnimatePresence>
                    {betLines.map((line, index) => (
                      <motion.div
                        key={line.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gray-50 p-4 rounded-lg shadow-inner"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor={`bet-${line.id}`} className="text-lg font-semibold text-gray-700">
                            Ingresso {index + 1}
                          </Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBetLine(line.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                            <span className="sr-only">Remover ingresso</span>
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            id={`bet-${line.id}`}
                            type="number"
                            placeholder="Pontos"
                            value={line.points}
                            onChange={(e) => updateBetPoints(line.id, e.target.value)}
                            className="flex-grow text-lg"
                          />
                          <span className="text-gray-600 font-medium">pts</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <Button
                    type="button"
                    onClick={addBetLine}
                    className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                    disabled={betLines.length >= 4}
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Adicionar Ingresso
                  </Button>
                  <DialogFooter>
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                      Confirmar Aposta
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </motion.div>
      </Card>
      <ToastContainer />
    </div>
  )
}
