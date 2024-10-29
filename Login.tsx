import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail, Lock, User } from 'lucide-react';

const LoginForm = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-4">
      {/* Elementos de fundo decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-[40%] right-[10%] w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-300"></div>
        <div className="absolute bottom-[10%] left-[30%] w-36 h-36 bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>
      </div>

      <Card className="w-full max-w-md relative bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-2xl opacity-50"></div>
        
        <CardHeader className="space-y-1 relative">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform -translate-y-10">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-br from-violet-700 to-fuchsia-700 bg-clip-text text-transparent">
            Bem-vindo
          </CardTitle>
          <CardDescription className="text-center text-gray-600 font-medium">
            Entre com sua conta para continuar
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 relative">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com"
                className="pl-10 h-11 border-gray-200 hover:border-violet-400 focus:border-violet-500 focus:ring-violet-500 transition-colors rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                className="pl-10 h-11 border-gray-200 hover:border-violet-400 focus:border-violet-500 focus:ring-violet-500 transition-colors rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
              <Label htmlFor="remember" className="text-sm text-gray-600">Lembrar de mim</Label>
            </div>
            <Button variant="link" className="px-0 font-semibold text-violet-600 hover:text-violet-700">
              Esqueceu a senha?
            </Button>
          </div>

          <Button className="w-full h-11 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
            Entrar
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-500 font-semibold">Ou continue com</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 rounded-xl hover:bg-gray-50 border-gray-200 hover:border-violet-400 transition-colors duration-200">
              <Github className="mr-2 h-5 w-5" />
              Github
            </Button>
            <Button variant="outline" className="h-11 rounded-xl hover:bg-gray-50 border-gray-200 hover:border-violet-400 transition-colors duration-200">
              <Mail className="mr-2 h-5 w-5" />
              Google
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-center pb-8 relative">
          <div className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Button variant="link" className="px-0 font-semibold text-violet-600 hover:text-violet-700">
              Registre-se
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
