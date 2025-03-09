import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Example() {
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
                res.json(),
            ),
    });

    const [postId, setPostId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/post/${postId}`);
    };

    if (isPending) return 'Loading...';
    if (error) return 'An error has occurred: ' + error.message;

    return (
        <div>
            <h1>Posts</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                    placeholder="Enter Post ID"
                />
                <button type="submit">Go to Post</button>
            </form>
            {data.map((post: any) => (
                <div key={post.id}>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                </div>
            ))}
        </div>
    );
}