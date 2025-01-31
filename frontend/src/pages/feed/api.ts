export const fetchPosts = async (filter: "all" | "my-posts" | "my-drafts"): Promise<any> => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Токен не найден. Авторизуйтесь заново.");
  }

  let url = "http://localhost:3000/post";
  if (filter === "my-posts") {
    url = "http://localhost:3000/post/my-posts";
  } else if (filter === "my-drafts") {
    url = "http://localhost:3000/post/my-drafts";
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      throw new Error("Сессия истекла. Войдите заново.");
    }
    throw new Error(`Ошибка: ${response.statusText}`);
  }
  
  return response.json();
};

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:3000/post/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Ошибка при загрузке изображения');
  }

  const data = await response.json();
  return data.imageUrl; 
}

