import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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


export function Feed() {
  return (
        <html className="bg-slate-200">
        <div id="header" className="flex items-center w-full m-w-0">
            <img alt="ЦПТ" src="https://www.logo.wine/a/logo/Nvidia/Nvidia-Horizontal-Black-Logo.wine.svg" className="w-40"></img>
            <p>pochta@gmail.com</p>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        </div>
        </html>
  )
}
