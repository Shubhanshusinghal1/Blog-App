import React from 'react';
import { Container, PostForm } from '../components';

function AddPost() {
  return (
    <div className="w-full py-8 bg-gray-900 min-h-screen text-white">
      {/* Divider from header */}
      <div className="border-b border-gray-700 mb-6"></div>

      <Container>
        
        {/* Line above heading */}
        <div className="w-24 mx-auto mb-2 border-b-4 border-red-700 rounded"></div>


        {/* Centered heading */}
        <h1 className="text-center text-3xl font-bold mb-3 tracking-wide">
          ADD NEW POST
        </h1>

        {/* Line below heading */}
        <div className="w-24 mx-auto mb-2 border-b-4 border-red-700 rounded"></div>



        {/* Post form */}
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
