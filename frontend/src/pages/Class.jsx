import { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode'; // Perbaikan pada import jwtDecode
import Cookies from "js-cookie";

export default function Class() {
  const [posts, setPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState(null);
  const [newPost, setNewPost] = useState({ deskripsi: "" });
  const token = Cookies.get("token");
  const [idClass, setIdClass] = useState(0);
//   const { id_class } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${idClass}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(
            "Gagal mengambil data post, status: " + response.status
          );
        }

        const data = await response.json(); // Parsing response ke JSON
        setPosts(data); // Menyimpan data ke state
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts(); // Memanggil fungsi async di dalam useEffect
  }, [idClass, token]); // Hanya tergantung pada token

  useEffect(() => {
    setIdClass(jwtDecode(Cookies.get("token")).id);
  }, []);

  const handleAddNewPost = async () => {
    const postData = { ...newPost, id_class: idClass };
    try {
      const response = await fetch(`http://localhost:3000/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Gagal menambah post, status: ${response.status}`);
      }

      const addedPost = await response.json();
      setPosts([...posts, addedPost]); // Update state posts dengan post baru yang ditambahkan
      setNewPost({ deskripsi: "" }); // Reset form setelah sukses menambah post
    } catch (error) {
      console.error("Error adding post:", error.message);
    }
  };

  function handleDelete(id) {
    if (confirm("Apakah anda yakin ingin menghapus post ini?")) {
      fetch(`http://localhost:3000/api/post/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.text())
        .then((message) => {
          setPosts((prev) => prev.filter((item) => item.id !== id));
          alert(message);
        })
        .catch((error) => {
          console.error("Error:", error.message);
          alert("Terjadi kesalahan saat menghapus post");
        });
    }
  }

  function saveUpdate() {
    fetch(`http://localhost:3000/api/post/${updatePost.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatePost),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json(); // Pastikan server mengembalikan JSON jika kamu akan mem-parsing ini.
      })
      .then(() => {
        setPosts((prev) =>
          prev.map((item) =>
            item.id === updatePost.id ? { ...item, ...updatePost } : item
          )
        );
        setUpdatePost(null);
        alert("Post berhasil diperbarui!");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert("Terjadi kesalahan saat memperbarui post: " + error.message);
      });
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-700">{post.deskripsi}</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setUpdatePost(post)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {newPost && (
        <div className="mt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddNewPost();
            }}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <h3 className="text-lg font-semibold mb-4">Add New Post</h3>
            <div className="mb-4">
              <label htmlFor="deskripsi" className="block text-gray-700">
                Post Description
              </label>
              <textarea
                id="deskripsi"
                value={newPost.deskripsi}
                onChange={(e) =>
                  setNewPost({ ...newPost, deskripsi: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setNewPost(null)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {updatePost && (
        <div className="mt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveUpdate();
            }}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <h3 className="text-lg font-semibold mb-4">Update Post</h3>
            <div className="mb-4">
              <label htmlFor="deskripsi" className="block text-gray-700">
                Post Description
              </label>
              <textarea
                id="deskripsi"
                value={updatePost.deskripsi}
                onChange={(e) =>
                  setUpdatePost({ ...updatePost, deskripsi: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setUpdatePost(null)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
