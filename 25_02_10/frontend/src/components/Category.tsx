import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Category.sass";

interface Post {
  id: number;
  tytul: string;
  tresc: string;
  autor: string;
  kategoriaId: string;
  zdjecie: string;
}

function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const categoryResponse = await fetch(
          `http://localhost:3000/kategorie/${categoryId}`,
        );
        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch category");
        }
        const categoryData = await categoryResponse.json();
        setCategoryName(categoryData.nazwa);

        const postsResponse = await fetch(
          `http://localhost:3000/wpisy/${categoryId}`,
        );
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch posts");
        }
        const postsData = await postsResponse.json();
        setPosts(postsData);
        setError(null);
      } catch (error) {
        setError("Error fetching posts");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <div id="category-post">
      <h2>{categoryName}</h2>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`}>
              <li key={post.id}>
                <h3>{post.tytul}</h3>
                <img src={post.zdjecie} alt={post.tytul} />
                <p>Autor: {post.autor}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Category;
