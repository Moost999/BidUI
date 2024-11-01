'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Linkedin, Mail, ExternalLink, Code, Briefcase, User, FileText, ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const projects = [
    { id: 1, title: 'E-commerce Platform', description: 'A full-stack e-commerce solution with React and Node.js', image: '/placeholder.svg?height=300&width=400', tags: ['React', 'Node.js', 'MongoDB'], link: '#' },
    { id: 2, title: 'AI Chatbot', description: 'An intelligent chatbot powered by machine learning', image: '/placeholder.svg?height=300&width=400', tags: ['Python', 'TensorFlow', 'NLP'], link: '#' },
    { id: 3, title: 'Mobile Fitness App', description: 'A cross-platform mobile app for fitness tracking', image: '/placeholder.svg?height=300&width=400', tags: ['React Native', 'Firebase', 'Redux'], link: '#' },
    { id: 4, title: 'Blockchain Wallet', description: 'A secure digital wallet for cryptocurrency transactions', image: '/placeholder.svg?height=300&width=400', tags: ['Solidity', 'Web3.js', 'Ethereum'], link: '#' },
  ]

  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'TypeScript', level: 70 },
    { name: 'GraphQL', level: 65 },
    { name: 'Docker', level: 60 },
    { name: 'AWS', level: 55 },
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme === 'dark' ? 'from-gray-900 to-gray-800 text-white' : 'from-gray-100 to-white text-gray-900'} transition-colors duration-300`}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 transform-none"
        style={{ scaleX }}
      />
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            João Silva
          </motion.h1>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => window.open('https://github.com', '_blank')}><Github className="mr-2 h-4 w-4" /> GitHub</Button>
            <Button variant="ghost" onClick={() => window.open('https://linkedin.com', '_blank')}><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</Button>
            <Button variant="ghost" onClick={() => window.location.href = 'mailto:joao@example.com'}><Mail className="mr-2 h-4 w-4" /> Contact</Button>
            <Button variant="outline" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '🌞' : '🌙'}
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 h-screen flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-6xl font-bold mb-4">Full-Stack Developer</h2>
            <p className="text-2xl text-gray-500 dark:text-gray-300 mb-8">Crafting elegant solutions to complex problems</p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 text-lg">
              View My Work
            </Button>
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8">My Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h4 className="text-lg font-semibold mb-2">{skill.name}</h4>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white dark:bg-gray-800 hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden transform hover:scale-105"
                      onClick={() => setActiveProject(project)}>
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <CardContent className="p-4">
                    <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8">About Me</h3>
          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="experience"><Briefcase className="mr-2 h-4 w-4" /> Experience</TabsTrigger>
              <TabsTrigger value="education"><User className="mr-2 h-4 w-4" /> Education</TabsTrigger>
              <TabsTrigger value="skills"><Code className="mr-2 h-4 w-4" /> Skills</TabsTrigger>
              <TabsTrigger value="interests"><FileText className="mr-2 h-4 w-4" /> Interests</TabsTrigger>
            </TabsList>
            <TabsContent value="experience" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    <li>
                      <h4 className="text-lg font-semibold">Senior Developer at TechCorp</h4>
                      <p className="text-gray-600 dark:text-gray-400">2018 - Present</p>
                      <p>Led development of multiple high-impact projects and mentored junior developers.</p>
                    </li>
                    <li>
                      <h4 className="text-lg font-semibold">Full-Stack Developer at StartupX</h4>
                      <p className="text-gray-600 dark:text-gray-400">2015 - 2018</p>
                      <p>Developed and maintained various web applications using modern technologies.</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="education" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    <li>
                      <h4 className="text-lg font-semibold">MSc in Computer Science</h4>
                      <p className="text-gray-600 dark:text-gray-400">University of Technology, 2015</p>
                    </li>
                    <li>
                      <h4 className="text-lg font-semibold">BSc in Software Engineering</h4>
                      <p className="text-gray-600 dark:text-gray-400">State University, 2013</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="skills" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Front-end: React, Vue.js, Angular</li>
                    <li>Back-end: Node.js, Python, Java</li>
                    <li>Databases: MongoDB, PostgreSQL, Redis</li>
                    <li>DevOps: Docker, Kubernetes, AWS</li>
                    <li>Mobile: React Native, Flutter</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="interests" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Artificial Intelligence and Machine Learning</li>
                    <li>Blockchain and Cryptocurrency</li>
                    <li>Internet of Things (IoT)</li>
                    <li>Open Source Contribution</li>
                    <li>Tech Blogging and Mentoring</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">{activeProject.title}</h3>
              <img src={activeProject.image} alt={activeProject.title} className="w-full h-64 object-cover rounded-lg mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-4">{activeProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {activeProject.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <Button className="w-full" onClick={() => window.open(activeProject.link, '_blank')}>
                <ExternalLink className="mr-2 h-4 w-4" /> View Project
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 João Silva. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
