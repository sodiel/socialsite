import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { Upload } from "lucide-react";


interface EditPostProps {
  visible?: boolean;
}

const EditPost: React.FC<EditPostProps> = () => {
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Редактировать</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать</DialogTitle>
            <Label htmlFor="header">Заголовок</Label>
            <Input id="header" placeholder="Введите заголовок" type="text"></Input>
            <Button className=""><Upload /> Добавить картинку</Button> {/*тут надо бы кнопку сделать не на всю ширину*/}
            <Label htmlFor="content">Контент</Label>
            <Textarea className="h-10 resize-none" id="content" placeholder="Введите контент"></Textarea>
            <div className="inline-block space-x-2">
              <Button >Опубликовать пост</Button>
              <Button variant="secondary">Отправить в черновики</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { EditPost };
