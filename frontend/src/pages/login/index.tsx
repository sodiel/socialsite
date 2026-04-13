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

import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const LoginSchema = z.object({
  email: z.string().email("Введите корректный адрес электронной почты."),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов."),
});

export function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (!response.ok) {
        throw new Error("Ошибка при входе. Проверьте введённые данные.");
      }
      const result = await response.json();
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('email', result.user.email);
      localStorage.setItem('role', result.user.role);
      localStorage.setItem('id', result.user.id);
      toast({
        title: "Вход прошел успешно",
        description: "Вы успешно вошли в аккаунт",
      });
      navigate("/feed");
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
        <CardTitle className="">Войти</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-left grid w-full items-center gap-4">
            <Input
              id="email"
              label="Почта"
              placeholder="Введите почту"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
            <Input
              id="password"
              label="Пароль"
              placeholder="Введите пароль"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Войти
          </Button>
        </form>
      </CardContent>
      <CardFooter className="block text-left">
        <CardDescription className="mt-4">
          Нет аккаунта?{" "}
          <a className="text-blue-500 hover:underline" href="/registration">
            Создать аккаунт
          </a>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
