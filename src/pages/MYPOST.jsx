import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData?.$id) {
      appwriteService.getPosts().then((response) => {
        if (response?.documents) {
          const userPosts = response.documents.filter(
            (post) => post.userId === userData.$id
          );
          setPosts(userPosts);
        }
      });
    }
  }, [userData]);

  return (
    <div className="w-full py-8 bg-gray-900 min-h-screen text-white">
      {/* Divider line from header */}
      <div className="border-b border-gray-700 mb-6"></div>

      <Container>
        {/* Heading */}
        <div className="w-24 mx-auto mb-2 border-b-4 border-red-700 rounded"></div>
        <h1 className="text-center text-3xl font-bold mb-4 tracking-wide">
          MY BLOGS
        </h1>
        <div className="w-24 mx-auto mb-8 border-b-4 border-red-700 rounded"></div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center text-red-300 text-lg">
            You haven't created any posts yet.
          </div>
        ) : (
          <div className="flex flex-wrap -m-2">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="relative p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                {/* Inactive badge */}
                {post.status === "inactive" && (
                  <span className="absolute top-2 right-2 bg-yellow-600 text-xs px-2 py-1 rounded-full">
                    Inactive
                  </span>
                )}
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
