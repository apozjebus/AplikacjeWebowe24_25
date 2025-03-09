import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Geo {
    lat: string;
    lng: string;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export default function PostDetail() {
    const { postId } = useParams<{ postId: string }>();

    const {
        isPending: isPostPending,
        error: postError,
        data: postData,
    } = useQuery<Post>({
        queryKey: ['post', postId],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) =>
                res.json(),
            ),
    });

    const {
        isPending: isUserPending,
        error: userError,
        data: userData,
    } = useQuery<User>({
        queryKey: ['user', postData?.userId],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/users/${postData?.userId}`).then(
                (res) => res.json(),
            ),
        enabled: !!postData,
    });

    if (isPostPending) return 'Loading post...';
    if (postError) return 'An error occurred while fetching the post: ' + postError.message;

    if (isUserPending) return 'Loading user...';
    if (userError) return 'An error occurred while fetching the user: ' + userError.message;

    return (
        <div>
            <h1>{postData?.title}</h1>
            <p>{postData?.body}</p>

            <h2>Author Details</h2>
            <p>Name: {userData?.name}</p>
            <p>Username: {userData?.username}</p>
            <p>Email: {userData?.email}</p>
            <p>Phone: {userData?.phone}</p>
            <p>Website: {userData?.website}</p>

            <h3>Address</h3>
            <p>Street: {userData?.address.street}</p>
            <p>Suite: {userData?.address.suite}</p>
            <p>City: {userData?.address.city}</p>
            <p>Zipcode: {userData?.address.zipcode}</p>
            <p>Geo: {userData?.address.geo.lat}, {userData?.address.geo.lng}</p>

            <h3>Company</h3>
            <p>Name: {userData?.company.name}</p>
            <p>Catchphrase: {userData?.company.catchPhrase}</p>
            <p>BS: {userData?.company.bs}</p>

            <Link to="/">Back to Posts</Link>
        </div>
    );
}