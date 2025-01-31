"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const RegistrationSchema = z
  .object({
    email: z.string().email("Введите корректный адрес электронной почты."),
    password: z.string().min(8, "Пароль должен быть не менее 8 символов."),
    confirmPassword: z
      .string()
      .min(8, "Пароль должен быть не менее 8 символов."),
    role: z.enum(["READER", "AUTHOR"], {
      errorMap: () => ({ message: "Выберите роль." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
  });

export function Registration() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "READER",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegistrationSchema>) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при регистрации. Проверьте введённые данные.");
      }

      const result = await response.json();
      toast({
        title: "Регистрация прошла успешно",
        description: "Теперь вы можете войти в систему",
      });

      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description:
          error.message || "Что-то пошло не так. Попробуйте ещё раз.",
      });
    }
  };

  return (
    <Card className="w-[450px] text-left">
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Почта</Label>
            <Input
              id="email"
              type="email"
              placeholder="Введите почту"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Повторите пароль</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Повторите пароль"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Выберите роль</Label>
            <Tabs
              defaultValue="READER"
              onValueChange={(value) => setValue("role", value)}
            >
              <TabsList>
                <TabsTrigger value="READER">Читатель</TabsTrigger>
                <TabsTrigger value="AUTHOR">Автор</TabsTrigger>
              </TabsList>
            </Tabs>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Создать аккаунт
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Уже есть аккаунт?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Войти
          </a>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
