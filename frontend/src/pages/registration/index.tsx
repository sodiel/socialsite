import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export function Registration() {
  return (
    <Card className="w-[450px] text-left">
      <CardHeader>
        <CardTitle className="">Создать аккаунт</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="text-left grid w-full items-center gap-4">
            <InputField
              id="email"
              label="Почта"
              placeholder="Введите почту"
              type="email"
            />
            <InputField
              id="password"
              label="Пароль"
              placeholder="Введите пароль"
              type="password"
            />
            <InputField
              id="password"
              label="Повторите пароль"
              placeholder="Повторите пароль"
              type="password"
            />

            <Tabs defaultValue="reader">
              <Label className="flex mb-2">Выберите роль</Label>
              <TabsList>
                <TabsTrigger value="reader">Читатель</TabsTrigger>
                <TabsTrigger value="autor">Автор</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </form>
      </CardContent>
      <CardFooter className="block text-left">
        <Button className="w-full">Создать аккаунт</Button>
        <CardDescription className="mt-4">
          <p>
            Уже есть аккаунт?{" "}
            <a className="" href="/login">
              Войти
            </a>
          </p>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
