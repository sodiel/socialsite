import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePostProps {
  visible?: boolean;
}

const CreatePost: React.FC<CreatePostProps> = () => {
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/post/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка при загрузке изображения");
      }

      const data = await response.json();
      return data.imageUrl; // Сервер должен вернуть { imageUrl: "ссылка" }
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить изображение.",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSubmit = async (isDraft: boolean) => {
    if (!header || !content) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const token = localStorage.getItem("accessToken");
  
      // Создаем пост
      const response = await fetch("http://localhost:3000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: header,
          idempotencyKey: crypto.randomUUID(),
          content: content,
          status: isDraft ? "DRAFT" : "PUBLISHED",
        }),
      });
  
      if (!response.ok) {
        throw new Error("Не удалось сохранить пост");
      }
  
      const postData = await response.json();
      const postId = postData.id;
  
      // Добавляем картинку в пост
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("postId", postId);
  
        const response = await fetch("http://localhost:3000/post/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Не удалось загрузить изображение");
        }
  
        const data = await response.json();
        const imageUrl = data.imageUrl;
      }
  
      toast({
        title: isDraft ? "Черновик сохранён" : "Пост опубликован",
        description: isDraft
          ? "Пост успешно добавлен в черновики."
          : "Ваш пост успешно опубликован.",
      });
  
      setHeader("");
      setContent("");
      setImage(null);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при сохранении поста.",
      });
    }
  };
  

  return (
    <div>
      <Dialog>
        <Button variant="default" className="w-full" asChild>
          <DialogTrigger>Опубликовать пост</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создать пост</DialogTitle>
            <Label htmlFor="header">Заголовок</Label>
            <Input
              id="header"
              placeholder="Введите заголовок"
              type="text"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            />
            <Button className="mt-2 relative">
              <Upload /> Добавить картинку
              <label className="absolute inset-0 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && setImage(e.target.files[0])
                  }
                />
              </label>
            </Button>

            {image && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Предпросмотр"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <Label htmlFor="content">Контент</Label>
            <Textarea
              className="h-10 resize-none"
              id="content"
              placeholder="Введите контент"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="inline-block space-x-2 mt-4">
              <Button onClick={() => handleSubmit(false)} disabled={loading}>
                {loading ? "Публикация..." : "Опубликовать пост"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSubmit(true)}
                disabled={loading}
              >
                {loading ? "Сохранение..." : "Отправить в черновики"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { CreatePost };
