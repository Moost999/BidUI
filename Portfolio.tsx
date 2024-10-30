'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Project = {
  id: number
  title: string
  description: string
  link: string
  repo: string
  image: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with React and Node.js",
    link: "https://ecommerce-example.com",
    repo: "https://github.com/yourusername/ecommerce",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Weather App",
    description: "Real-time weather application using OpenWeatherMap API",
    link: "https://weather-app-example.com",
    repo: "https://github.com/yourusername/weather-app",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["React", "API Integration", "Tailwind CSS"]
  },
  {
    id: 3,
    title: "Task Manager",
    description: "A productivity app for managing daily tasks and projects",
    link: "https://task-manager-example.com",
    repo: "https://github.com/yourusername/task-manager",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Vue.js", "Firebase", "Vuex"]
  }
]

export default function PortfolioLanding() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 p-8">
      <header className="max-w-4xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile picture" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold mb-2">João Programador</h1>
          <p className="text-xl text-gray-600 mb-4">Desenvolvedor Full Stack</p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
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
                  className="cursor-pointer h-full flex flex-col"
                  onClick={() => setActiveProject(project)}
                >
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md mb-4" />
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setActiveProject(null)}
        >
          <Card className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>{activeProject.title}</CardTitle>
              <CardDescription>{activeProject.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={activeProject.image} alt={activeProject.title} className="w-full h-64 object-cover rounded-md mb-4" />
              <p className="text-sm text-gray-600 mb-4">{activeProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {activeProject.tags.map((tag) => (
                  <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild>
                <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver Projeto
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={activeProject.repo} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Ver Código
                </a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
