import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
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
      {/* Line separating from header */}
      <div className="border-b border-gray-700 mb-6"></div>

      <Container>
        
        {/* Line above ALL BLOGS */}
        <div className="w-24 mx-auto mb-2 border-b-4 border-red-700 rounded"></div>

        {/* ALL BLOGS heading */}
        <h1 className="text-center text-3xl font-bold mb-3 tracking-wide">
          ALL BLOGS
        </h1>

        {/* Line below ALL BLOGS */}
        <div className="w-24 mx-auto mb-8 border-b-4 border-red-700 rounded"></div>

        <div className="flex flex-wrap -m-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="p-4 w-full text-center text-gray-400">No posts available.</div>
          )}
        </div>
        
      </Container>
    </div>
  );
}

export default AllPosts;
