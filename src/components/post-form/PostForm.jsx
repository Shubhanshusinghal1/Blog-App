import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      console.log("Uploaded file:", file);

      if (file) {
        const fileId = file?.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-700 text-white">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Title, Slug, Content */}
        <div className="w-full md:w-2/3 px-2">
          <Input
            label="Title* :"
            placeholder="Title"
            className="mb-4 bg-gray-800 text-white"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug* :"
            placeholder="Slug"
            className="mb-4 bg-gray-800 text-white"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <RTE
            label="Content* :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            className="bg-gray-800 text-white"
          />
        </div>

        {/* Right Side: Image Upload, Status, Submit */}
        <div className="w-full md:w-1/3 px-2 flex flex-col gap-y-4">
          <Input
            label="Featured Image* :"
            type="file"
            className="bg-gray-800 text-white"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full rounded-lg overflow-hidden border border-gray-700">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="object-cover w-full h-48 rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="bg-gray-800 "
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-red-700 hover:bg-red-800" : "bg-red-700 hover:bg-red-800"}
            className="w-full text-white font-semibold transition duration-200"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
