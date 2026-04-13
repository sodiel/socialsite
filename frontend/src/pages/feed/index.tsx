import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/components/ui/post";
import { CreatePost } from "@/components/ui/create-post";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Sidebar from "@/components/ui/app-sidebar";
import { fetchPosts } from "./api";

export function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "my-posts" | "my-drafts">(
    "all"
  );

  const isAuthor: boolean = localStorage.getItem("role") === "AUTHOR";
  const author: string = localStorage.getItem("email") || "Гость";

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts(activeTab);
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [activeTab]); // Перезагружаем посты при изменении вкладки

  return (
    <div className="flex h-screen">
      {/* Боковая панель */}
      <div className="hidden sm:block fixed left-0 z-20 h-full md:w-64 lg:w-80 xl:w-96">
        <Sidebar />
      </div>

      {/* Основной контент */}
      <div className="flex flex-col w-full ml-[16rem] md:ml-64 lg:ml-80 xl:ml-96">
        {/* Верхняя панель */}
        <div
          id="header"
          className="z-50 bg-slate-50 top-0 left-0 flex w-full h-[5%] fixed"
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

        {/* Контент */}
        <div className="mt-6 p-4">
          {/* Вкладки (только для авторов) */}
          {isAuthor && (
            <div className="w-full mb-4 flex justify-start">
              <Tabs
                defaultValue="all_posts"
                className=""
                onValueChange={(value) => {
                  if (value === "all_posts") setActiveTab("all");
                  if (value === "my_posts") setActiveTab("my-posts");
                  if (value === "drafts") setActiveTab("my-drafts");
                }}
              >
                <TabsList>
                  <TabsTrigger value="all_posts">Все посты</TabsTrigger>
                  <TabsTrigger value="my_posts">Мои посты</TabsTrigger>
                  <TabsTrigger value="drafts">Черновики</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}

          {/* Форма создания поста */}
          {isAuthor && <CreatePost />}

          {/* Список постов */}
          <div id="posts" className="flex-col max-w-[40em] min-w-[30em]">
            {loading && <p>Загрузка...</p>}
            {error && (
              <p className="text-red-400">
                Ошибка: {error}{" "}
                <a className="underline text-red-500" href="/login">
                  Вход
                </a>
              </p>
            )}

            {!loading &&
              !error &&
              posts.map((post) => (
                <Post
                  key={post.id}
                  author={post.author?.email}
                  date={new Date(post.createdAt).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  header={post.title}
                  content={post.content}
                  type={post.status === "DRAFT" ? "draft" : "common"}
                  likes={post.like}
                  comments={post.comments?.length || 0}
                  imageUrl={
                    post.image?.imageUrl
                      ? `http://localhost:3000${post.image.imageUrl}`
                      : undefined
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
