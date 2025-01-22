import React, { useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
}

const HomePage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Lista Postów</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
