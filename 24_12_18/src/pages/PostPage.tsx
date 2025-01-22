import React, { useState } from 'react';

const PostDetailPage: React.FC = () => {
    const [postId, setPostId] = useState('');
    const [post, setPost] = useState<any>(null);
    const [error, setError] = useState('');

    const fetchPostDetails = async () => {
        if (!postId) {
            setError('Proszę podać ID posta.');
            return;
        }

        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const data = await response.json();

        if (data.id) {
            setPost(data);
            setError('');
        } else {
            setError('Nie znaleziono posta o podanym ID.');
        }
    };

    return (
        <div>
            <h1>Szczegóły Posta</h1>
            <input
                type="number"
                placeholder="Wpisz ID posta"
                value={postId}
                onChange={(e) => setPostId(e.target.value)}
            />
            <button onClick={fetchPostDetails}>Pobierz Post</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {post && (
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            )}
        </div>
    );
};

export default PostDetailPage;
