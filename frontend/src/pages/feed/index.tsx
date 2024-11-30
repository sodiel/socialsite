import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Post } from "@/components/ui/post"
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
  var author: string = "pochta@gmail.com"
  var date: string = "5 декабря"
  return (
        <>
          <div id="header" className="z-10 bg-slate-50 top-0 left-0 flex w-full fixed">
            <img alt="ЦПТ" src="/src/assets/logo.svg" className="w-20 ml-4" />
            <div id="account" className="flex ml-auto mr-4 mt-2">
              <p className="mr-1">{author}</p>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          
        <div id="posts" className="flex-col mx-12 px-12 mt-10">
        <Post author={author} date={date} header="Привет от Гарбуза" content="Вопрос о ереси «жидовствующих» до сих пор остается дискуссионным бла бла бла ой ой ой ой ой ой ой о йо йо йой йой о а перенос будет? переноса строки нет!а нет есть" type="draft" likes={10} comments={12}></Post>
        <Post author={author} date={date} header="Lorem ipsum" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim aeque doleamus animo, cum corpore dolemus, fieri tamen permagna accessio potest, si aliquod aeternum et infinitum impendere malum nobis opinemur. Quod idem licet transferre in voluptatem, ut postea variari voluptas distinguique possit, augeri amplificarique non possit. At etiam Athenis, ut e patre audiebam facete.

Ullus investigandi veri, nisi inveneris, et quaerendi defatigatio turpis est, cum esset accusata et vituperata ab Hortensio. Qui liber cum et mortem contemnit, qua qui est imbutus quietus esse numquam potest. Praeterea bona praeterita grata recordatione renovata delectant. Est autem situm in nobis ut et voluptates.

Ullus investigandi veri, nisi inveneris, et quaerendi defatigatio turpis est, cum esset accusata et vituperata ab Hortensio. Qui liber cum et mortem contemnit, qua qui est imbutus quietus esse numquam potest. Praeterea bona praeterita grata recordatione renovata delectant. Est autem situm in nobis." type="draft" likes={10} comments={12}></Post>
        </div>
        </>
  )
}
