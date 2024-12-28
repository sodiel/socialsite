import React from "react";

import { MessageCircle } from "lucide-react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface InputPostProps {
  author: string;
  header: string;
  content: string;
  type: "draft" | "editable" | "common";
  likes: number;
  comments: number;
  date: string;
}

const renderButtons = (type: "draft" | "editable" | "common") => {
  switch (type) {
    case "draft":
      return (
        <>
          <Button className="mr-2">Опубликовать пост</Button>
          <Button variant="secondary">Редактировать</Button>
        </>
      );
    case "editable":
      return (
        <>
          <Button variant="secondary">Редактировать</Button>
        </>
      );
    default:
      return null;
  }
};

const Post = ({
  header,
  content,
  type,
  likes,
  comments,
  author,
  date,
}: InputPostProps) => {
  return (
    <div className="flex flex-col my-10">
      <Card>
        <CardTitle className="text-left ml-6 mb-1 text-3xl">
          <div className="flex text-sm mt-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p>{author}</p>
              <p className="text-slate-500">{date}</p>
            </div>
          </div>

          {header}
        </CardTitle>
        <CardContent>
          <Skeleton className="w-full mt-2 h-[400px] rounded-xl" />
        </CardContent>
        <CardContent className="text-left">{content}</CardContent>
        <CardFooter>{renderButtons(type)}</CardFooter>
        <CardFooter className="">
          <Button variant="secondary">
            <Heart />
            {likes}
          </Button>
          <Button variant="secondary" className="ml-2">
            <MessageCircle />
            {comments}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export { Post };
