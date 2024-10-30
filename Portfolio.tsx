'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Project = {
  id: number
  title: string
  description: string
  link: string
  repo: string
  image: string
  tags: string[]
  color: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with React and Node.js. Implemented features like user authentication, product catalog, shopping cart, and payment integration.",
    link: "https://ecommerce-example.com",
    repo: "https://github.com/yourusername/ecommerce",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    title: "Weather Dashboard",
    description: "Real-time weather application using OpenWeatherMap API. Features include location-based forecasts, interactive maps, and severe weather alerts.",
    link: "https://weather-app-example.com",
    repo: "https://github.com/yourusername/weather-app",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["React", "API Integration", "Tailwind CSS", "Geolocation"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Task Manager Pro",
    description: "A productivity app for managing daily tasks and projects. Includes features like task categorization, due dates, recurring tasks, and team collaboration.",
    link: "https://task-manager-example.com",
    repo: "https://github.com/yourusername/task-manager",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Vue.js", "Firebase", "Vuex", "PWA"],
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    title: "Fitness Tracker",
    description: "A comprehensive fitness tracking application. Features include workout logging, progress visualization, nutrition tracking, and integration with popular fitness devices.",
    link: "https://fitness-tracker-example.com",
    repo: "https://github.com/yourusername/fitness-tracker",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["React Native", "GraphQL", "AWS Amplify", "HealthKit"],
    color: "from-orange-500 to-amber-500"
  },
  {
    id: 5,
    title: "AI Chat Assistant",
    description: "An intelligent chatbot powered by natural language processing. Capable of answering queries, scheduling appointments, and providing personalized recommendations.",
    link: "https://ai-chat-example.com",
    repo: "https://github.com/yourusername/ai-chat",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Python", "TensorFlow", "Flask", "NLP"],
    color: "from-purple-500 to-indigo-500"
  }
]

export default function EnhancedPortfolioLanding() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null)
      } else if (e.key === 'ArrowLeft') {
        navigateProjects(-1)
      } else if (e.key === 'ArrowRight') {
        navigateProjects(1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navigateProjects = (direction: number) => {
    setCurrentProjectIndex((prevIndex) => {
      const newIndex = (prevIndex + direction + projects.length) % projects.length
      setActiveProject(projects[newIndex])
      return newIndex
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <header className="max-w-4xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white">
            <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Your profile picture" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold mb-2">João Programador</h1>
          <p className="text-xl text-gray-300 mb-4">Desenvolvedor Full Stack & Entusiasta de UI/UX</p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 text-white" asChild>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 text-white" asChild>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 text-white" asChild>
              <a href="mailto:your.email@example.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Meus Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className={`cursor-pointer h-full flex flex-col overflow-hidden bg-gradient-to-br ${project.color}`}
                  onClick={() => {
                    setActiveProject(project)
                    setCurrentProjectIndex(projects.findIndex(p => p.id === project.id))
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <CardDescription className="text-white/80">{project.description.substring(0, 100)}...</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md mb-4" />
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-white/20 text-white">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className={`bg-gradient-to-br ${activeProject.color} text-white`}>
                <CardHeader>
                  <CardTitle className="text-2xl">{activeProject.title}</CardTitle>
                  <CardDescription className="text-white/80">{activeProject.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={activeProject.image} alt={activeProject.title} className="w-full h-64 object-cover rounded-md mb-4" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeProject.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/20 text-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                    <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver Projeto
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                    <a href={activeProject.repo} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Ver Código
                    </a>
                  </Button>
                </CardFooter>
              </Card>
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/10 hover:bg-white/20 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateProjects(-1)
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Projeto anterior</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/10 hover:bg-white/20 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateProjects(1)
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Próximo projeto</span>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
