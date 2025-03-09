import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Post.sass";

interface Post {
  id: number;
  tytul: string;
  tresc: string;
  data: string;
  autor: string;
  kategoriaId: string;
  zdjecie: string;
}

interface Comment {
  id: number;
  tresc: string;
  data: string;
  autor: string;
  wpisId: number;
}

function Post() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`http://localhost:3000/wpis/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);

        const commentsResponse = await fetch(
          `http://localhost:3000/komentarze/${postId}`,
        );
        if (!commentsResponse.ok) {
          throw new Error("Failed to fetch comments");
        }
        const comments = await commentsResponse.json();
        setComments(comments);

        setError(null);
      } catch (error) {
        setError("Error fetching post");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      tresc: formData.get("tresc") as string,
      autor: formData.get("autor") as string,
      wpisId: postId,
    };

    try {
      const response = await fetch("http://localhost:3000/komentarz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const newComment = await response.json();
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div id="post">
      <div id="post-content">
        {isLoading ? (
          <p>Loading post...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <h2>{post?.tytul}</h2>
            <img src={post?.zdjecie} alt={post?.tytul} />
            <p>{post?.tresc}</p>
            <p>Author: {post?.autor}</p>
          </div>
        )}
      </div>
      <div id="comments">
        <h3>Comments</h3>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="wpisId" value={postId} />
          <input type="text" name="tresc" placeholder="Your comment" required />
          <input type="text" name="autor" placeholder="Your name" required />
          <button type="submit">Add Comment</button>
        </form>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.tresc}</p>
                <p>Author: {comment.autor}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default Post;
