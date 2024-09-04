// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { useParams } from "react-router-dom";
// import "../pages/class.css";

// export default function Class() {
//   const [posts, setPosts] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [newPost, setNewPost] = useState({ deskripsi: "" });
//   const [newTask, setNewTask] = useState({ title: "", deskripsi: "", deadline: "" });
//   const [updatePost, setUpdatePost] = useState(null);
//   const [updateTask, setUpdateTask] = useState(null);
//   const [showTasks, setShowTasks] = useState(false);
//   const [loadingPosts, setLoadingPosts] = useState(false);
//   const [loadingTasks, setLoadingTasks] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupType, setPopupType] = useState(""); // "addPost", "updatePost", "addTask", "updateTask"
//   const token = Cookies.get("token") ? Cookies.get("token") : null;
//   const { id } = useParams();

//   const convertToDate = (isoString) => {
//   const date = new Date(isoString);
//   return date.toISOString().split('T')[0];
// };


//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoadingPosts(true);
//       try {
//         const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) throw new Error("Gagal mengambil data post");
//         const data = await response.json();
//         setPosts(data);
//       } catch (error) {
//         console.error("Error fetching posts:", error.message);
//       } finally {
//         setLoadingPosts(false);
//       }
//     };

//     const fetchTasks = async () => {
//       setLoadingTasks(true);
//       try {
//         const response = await fetch(`http://localhost:3000/api/task/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) throw new Error("Gagal mengambil data task");
//         const data = await response.json();
//         const formattedTasks = data.map(task => ({
//           ...task,
//           deadline: convertToDate(task.deadline),
//         }));
//         setTasks(formattedTasks);
//       } catch (error) {
//         console.error("Error fetching tasks:", error.message);
//       } finally {
//         setLoadingTasks(false);
//       }
//     };

//     fetchPosts();
//     fetchTasks();
//   }, [id, token]);

//   const handleAddNewPost = async () => {
//     const postData = { ...newPost, id_class: id };
//     try {
//       const response = await fetch(`http://localhost:3000/api/post`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(postData),
//       });
//       if (!response.ok) throw new Error("Gagal menambah post");
//       const addedPost = await response.json();
//       setPosts([...posts, addedPost]);
//       setNewPost({ deskripsi: "" });
//       setShowPopup(false);
//     } catch (error) {
//       console.error("Error adding post:", error.message);
//     }
//   };

//   const handleAddNewTask = async () => {
//     const taskData = { 
//       ...newTask, 
//       id_class: id, 
//       deadline: newTask.deadline 
//     };
//     try {
//       const response = await fetch(`http://localhost:3000/api/task`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(taskData),
//       });
//       if (!response.ok) throw new Error("Gagal menambah task");
//       const addedTask = await response.json();
//       setTasks([...tasks, addedTask]);
//       setNewTask({ title: "", deskripsi: "", deadline: "" });
//       setShowPopup(false);
//     } catch (error) {
//       console.error("Error adding task:", error.message);
//     }
//   };

//   const handleDeletePost = async (postId) => {
//     if (window.confirm("Apakah anda yakin ingin menghapus post ini?")) {
//       try {
//         const response = await fetch(`http://localhost:3000/api/post/${postId}`, {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) throw new Error("Gagal menghapus post");
//         setPosts(posts.filter((post) => post.id !== postId));
//         alert("Post berhasil dihapus");
//       } catch (error) {
//         console.error("Error deleting post:", error.message);
//         alert("Terjadi kesalahan saat menghapus post");
//       }
//     }
//   };

//   const handleDeleteTask = async (taskId) => {
//     if (window.confirm("Apakah anda yakin ingin menghapus task ini?")) {
//       try {
//         const response = await fetch(`http://localhost:3000/api/task/${taskId}`, {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) throw new Error("Gagal menghapus task");
//         setTasks(tasks.filter((task) => task.id !== taskId));
//         alert("Task berhasil dihapus");
//       } catch (error) {
//         console.error("Error deleting task:", error.message);
//         alert("Terjadi kesalahan saat menghapus task");
//       }
//     }
//   };

//   const saveUpdatePost = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/post/${updatePost.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatePost),
//       });
//       if (!response.ok) throw new Error("Gagal memperbarui post");
//       const updatedPost = await response.json();
//       setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
//       setUpdatePost(null);
//       alert("Post berhasil diperbarui");
//       setShowPopup(false);
//     } catch (error) {
//       console.error("Error updating post:", error.message);
//       alert("Terjadi kesalahan saat memperbarui post");
//     }
//   };

//   const saveUpdateTask = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/task/${updateTask.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updateTask),
//       });
  
//       const contentType = response.headers.get("content-type");
//       let responseData;
//       if (contentType && contentType.includes("application/json")) {
//         responseData = await response.json();
//       } else {
//         responseData = await response.text();
//       }
  
//       if (!response.ok) throw new Error(responseData || "Gagal memperbarui task");
      
//       if (typeof responseData === "string") {
//         alert(responseData);
//       } else {
//         setTasks(tasks.map((task) => (task.id === responseData.id ? responseData : task)));
//         setUpdateTask(null);
//         alert("Task berhasil diperbarui");
//         setShowPopup(false);
//       }
//     } catch (error) {
//       console.error("Error updating task:", error.message);
//       alert("Terjadi kesalahan saat memperbarui task");
//     }
//   };

//   const openPopup = (type) => {
//     setPopupType(type);
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//     setPopupType("");
//   };

//   return (
//     <div className="dn dan">
//       <div className="header">
//         <button onClick={() => setShowTasks(!showTasks)} className="toggle-button">
//           {showTasks ? "Show Posts" : "Show Tasks"}
//         </button>
//         <button onClick={() => openPopup(showTasks ? "addTask" : "addPost")} className="add-button">
//           Add New
//         </button>
//       </div>

//       {showTasks ? (
//         <>
//           <h2>Tasks</h2>
//           {loadingTasks ? (
//             <p>Loading tasks...</p>
//           ) : (
//             <div className="grid">
//               {tasks.map((task) => (
//                 <div key={task.id} className="card">
//                   <h4>{task.title}</h4>
//                   <p>{task.deskripsi}</p>
//                   <p>Deadline: {task.deadline}</p>
//                   <div className="action-buttons">
//                     <button onClick={() => handleDeleteTask(task.id)} className="delete-button">Delete</button>
//                     <button onClick={() => { setUpdateTask(task); openPopup("updateTask"); }} className="edit-button">Edit</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       ) : (
//         <>
//           <h2>Posts</h2>
//           {loadingPosts ? (
//             <p>Loading posts...</p>
//           ) : (
//             <div className="grid">
//               {posts.map((post) => (
//                 <div key={post.id} className="card">
//                   <p>{post.deskripsi}</p>
//                   <div className="action-buttons">
//                     <button onClick={() => handleDeletePost(post.id)} className="delete-button">Delete</button>
//                     <button onClick={() => { setUpdatePost(post); openPopup("updatePost"); }} className="edit-button">Edit</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {showPopup && (
//         <div className="popup">
//           <div className="popup-content">
//             <button onClick={closePopup} className="close-button closes">X</button>
//             {popupType === "addPost" && (
//               <>
//                 <h3>Add New Post</h3>
//                 <textarea className="text" value={newPost.deskripsi} onChange={(e) => setNewPost({ deskripsi: e.target.value })} />
//                 <button onClick={handleAddNewPost}>Save</button>
//               </>
//             )}
//             {popupType === "updatePost" && updatePost && (
//               <>
//                 <h3>Edit Post</h3>
//                 <textarea
//                   value={updatePost.deskripsi}
//                   onChange={(e) => setUpdatePost({ ...updatePost, deskripsi: e.target.value })}
//                 />
//                 <button onClick={saveUpdatePost}>Update</button>
//               </>
//             )}
//             {popupType === "addTask" && (
//               <>
//                 <h3>Add New Task</h3>
//                 <input
//                   type="text"
//                   value={newTask.title}
//                   onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//                   placeholder="Title"
//                 />
//                 <textarea
//                   value={newTask.deskripsi}
//                   onChange={(e) => setNewTask({ ...newTask, deskripsi: e.target.value })}
//                   placeholder="Description"
//                 />
//                 <input
//                   type="date"
//                   value={newTask.deadline}
//                   onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
//                 />
//                 <button onClick={handleAddNewTask}>Save</button>
//               </>
//             )}
//             {popupType === "updateTask" && updateTask && (
//               <>
//                 <h3>Edit Task</h3>
//                 <input
//                   type="text"
//                   value={updateTask.title}
//                   onChange={(e) => setUpdateTask({ ...updateTask, title: e.target.value })}
//                   placeholder="Title"
//                 />
//                 <textarea className="text"
//                   value={updateTask.deskripsi}
//                   onChange={(e) => setUpdateTask({ ...updateTask, deskripsi: e.target.value })}
//                   placeholder="Description"
//                 />
//                 <input
//                   type="date"
//                   value={updateTask.deadline}
//                   onChange={(e) => setUpdateTask({ ...updateTask, deadline: e.target.value })}
//                 />
//                 <button onClick={saveUpdateTask}>Update</button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
