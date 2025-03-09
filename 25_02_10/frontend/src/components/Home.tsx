import "../styles/Home.sass";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  tytul: string;
  tresc: string;
  data: string;
  autor: string;
  kategoriaId: string;
  zdjecie: string;
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/wpisy");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (error) {
        setError("Error fetching posts");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div id="home">
      <h2>Home</h2>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : posts.length > 0 ? (
        <div className="posts-container">
          {posts.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`}>
              <div id="card">
                <h3>{post.tytul}</h3>
                <p>{post.tresc.substring(0, 100)}...</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default Home;
