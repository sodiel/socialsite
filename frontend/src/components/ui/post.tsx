import React, { useState } from 'react';
import { MessageCircle, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EditPost } from "@/components/ui/edit-post";
import {
  Card,
  CardContent,
  CardFooter,
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
  imageUrl?: string | null;
}

const renderButtons = (type: "draft" | "editable" | "common") => {
  switch (type) {
    case "draft":
      return (
        <>
          <Button>Опубликовать пост</Button>
          <EditPost />
        </>
      );
    case "editable":
      return <EditPost />;
    default:
      return null;
  }
};

const Post: React.FC<InputPostProps> = ({ header, content, type, likes, comments, author, date, imageUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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

        {/* Блок с изображением */}
        <CardContent className="relative">
          {!imageLoaded && imageUrl && <Skeleton className="w-full mt-2 h-[400px] rounded-xl" />}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Изображение поста"
              className={`w-full mt-2 h-[400px] rounded-xl object-cover ${imageLoaded ? 'block' : 'hidden'}`}
              onLoad={() => setImageLoaded(true)}
            />
          )}
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
