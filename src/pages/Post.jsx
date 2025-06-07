import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-gray-900 min-h-screen">
            <Container>
                <div className="w-full max-w-5xl mx-auto bg-gray-800 text-white rounded-2xl shadow-lg p-6 relative border border-gray-700">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-auto rounded-xl mb-6 object-cover border border-gray-700"
                    />

                    {isAuthor && (
                        <div className="absolute top-4 right-4 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600 hover:bg-green-700 text-white">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-red-600 hover:bg-red-700 text-white"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}

                    <h1 className="text-3xl font-bold mb-4 text-center">
                        {post.title}
                    </h1>

                    <hr className="mb-6 border-gray-600" />

                    <div className="prose prose-invert max-w-none text-gray-200">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
