import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/components/ui/post";
import { CreatePost } from "@/components/ui/create-post";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { InputField } from "@/components/ui/input-field";

export function Feed() {
  const author: string = "pochta@gmail.com";
  const date: string = "5 декабря";

  return (
    <>
      <div
        id="header"
        className="z-10 bg-slate-50 top-0 left-0 flex w-full fixed"
 >
        <img alt="ЦПТ" src="/src/assets/logo.svg" className="w-20 ml-4" />
        <div id="account" className="flex ml-auto mr-4 mt-2">
          <p className="mr-1">{author}</p>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="fixed z-10  w-full bg-slate-100 pt-0">
      <div className="w-full mt-4 flex justify-start">
        <Tabs defaultValue="all_posts" className="">
          <TabsList>
            <TabsTrigger value="all_posts">Все посты</TabsTrigger>
            <TabsTrigger value="my_posts">Мои посты</TabsTrigger>
            <TabsTrigger value="drafts">Черновики</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="w-[100%]">
      <CreatePost></CreatePost>
      </div>
      </div>


      <div id="posts" className="flex-col max-w-[600px] mt-[100px]">
        {[...Array(5)].map(() => (
          <Post
            author={author}
            date={date}
            header="Созвон ЦПТ"
            content="Созвон ЦПТ"
            type="draft"
            likes={10}
            comments={12}
          ></Post>
        ))}

        <Post
          author={author}
          date={date}
          header="Привет от Гарбуза"
          content="Вопрос о ереси «жидовствующих» до сих пор остается дискуссионным бла бла бла ой ой ой ой ой ой ой о йо йо йой йой о а перенос будет? переноса строки нет!а нет есть"
          type="editable"
          likes={10}
          comments={12}
        ></Post>

        <Post
          author={author}
          date={date}
          header="Lorem ipsum"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim aeque doleamus animo, cum corpore dolemus, fieri tamen permagna accessio potest, si aliquod aeternum et infinitum impendere malum nobis opinemur. Quod idem licet transferre in voluptatem, ut postea variari voluptas distinguique possit, augeri amplificarique non possit. At etiam Athenis, ut e patre audiebam facete.
        
Ullus investigandi veri, nisi inveneris, et quaerendi defatigatio turpis est, cum esset accusata et vituperata ab Hortensio. Qui liber cum et mortem contemnit, qua qui est imbutus quietus esse numquam potest. Praeterea bona praeterita grata recordatione renovata delectant. Est autem situm in nobis ut et voluptates.

Ullus investigandi veri, nisi inveneris, et quaerendi defatigatio turpis est, cum esset accusata et vituperata ab Hortensio. Qui liber cum et mortem contemnit, qua qui est imbutus quietus esse numquam potest. Praeterea bona praeterita grata recordatione renovata delectant. Est autem situm in nobis."
          type="common"
          likes={10}
          comments={12}
        ></Post>
      </div>
    </>
  );
}

