import * as React from "react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { InputField }  from "@/components/ui/input-field"

export function Login() {
  return (
    <Card className="w-[450px] text-left">
      <CardHeader>
        <CardTitle className="">Войти</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="text-left grid w-full items-center gap-4">
            <InputField id="email" label="Почта" placeholder="Введите почту" type="email"/>
            <InputField id="password" label="Пароль" placeholder="Введите пароль" type="password" />
          </div>
        </form>
      </CardContent>
      <CardFooter className="block text-left">
        <Button className="w-full">Войти</Button>
        <CardDescription className="mt-4">
          <p>Нет аккаунта? <a className="" href="/registration">Создать аккаунт</a></p>
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
