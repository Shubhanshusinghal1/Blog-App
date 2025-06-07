import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8 bg-gray-900 min-h-screen text-white">
      {/* Line to separate from header */}
      <div className="border-b border-gray-700 mb-6"></div>

      <Container>
        {/* Caution Box */}
      

        {/* ALL BLOGS heading */}
        <div className="w-24 mx-auto mb-2 border-b-4 border-red-700 rounded"></div>
        <h1 className="text-center text-3xl font-bold mb-4 tracking-wide">
          ALL BLOGS
        </h1>
        <div className="w-24 mx-auto mb-8 border-b-4 border-red-700 rounded"></div>

        {posts.length === 0 ? (
          <div className="flex flex-wrap justify-center">
            <div className="p-2 w-full max-w-lg text-center">
              <h2 className="text-xl font-semibold cursor-pointer hover:text-red-600 transition-colors duration-200">
                Login to read posts
              </h2>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap -m-2">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
