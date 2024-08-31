import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Trash, SquarePen, PlusCircle, Search } from "lucide-react";
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [clas, setClas] = useState([]);
  const [updateclas, setUpdateclas] = useState(null);
  const [newclas, setNewclas] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const sortBy = "id";
  const [search, setSearch] = useState("");
  
  const token = Cookies.get("token");
  const [idTeacher, setIdTeacher] = useState(0);

  console.log(idTeacher)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/class`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data kelas, status: " + response.status);
        }

        const data = await response.json(); // Parsing response ke JSON
        setClas(data); // Menyimpan data ke state

      } catch (error) {
        console.error("Error fetching classes:", error.message);
      }
    };

    fetchClasses(); // Memanggil fungsi async di dalam useEffect

  }, [token]); // Hanya tergantung pada token

  useEffect(() => {
    setIdTeacher(jwtDecode(Cookies.get("token")).id)
  }, [])

  const handleAddNewclas = async () => {
    const classData = { ...newclas, id_teacher: idTeacher };
    try {
      const response = await fetch(`http://localhost:3000/api/class`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) {
        throw new Error(`Gagal menambah kelas, status: ${response.status}`);
      }

      const addedClass = await response.json();
      setClas([...clas, addedClass]); // Update state class dengan kelas baru yang ditambahkan
      setNewclas({ name: '', kode: '' }); // Reset form setelah sukses menambah kelas

    } catch (error) {
      console.error('Error adding class:', error.message);
    }
  };

  function handleDelete(id) {
    if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
      fetch(`http://localhost:3000/api/class/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.text())
        .then((message) => {
          setClas((prev) => prev.filter((item) => item.id !== id));
          alert(message);
        })
        .catch((error) => {
          console.error("Error:", error.message);
          alert("Terjadi kesalahan saat menghapus data class");
        });
    }
  }

  function saveUpdate() {
    fetch(`http://localhost:3000/api/class/${updateclas.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateclas),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();  // Pastikan server mengembalikan JSON jika kamu akan mem-parsing ini.
      })
      .then(() => {
        setClas((prev) =>
          prev.map((item) =>
            item.id === updateclas.id ? { ...item, ...updateclas } : item
          )
        );
        setUpdateclas(null);
        alert("Data berhasil diperbarui!");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert("Terjadi kesalahan saat memperbarui data class" + error.message);
      });
  }

  const filterData = clas
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setNewclas({ name: "", kode: "" })}>
          <PlusCircle />
        </button>
        <div className="flex items-center gap-1 w-1/5">
          <Search />
          <input
            type="text"
            className="bg-gray-100 w-full p-4 gap-2 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search classes..."
          />
        </div>
        <div>
          <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            Sort by {sortOrder === "asc" ? "Descending" : "Ascending"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterData.map((clas) => (
          <div key={clas.id} className="bg-white shadow-md rounded-lg p-4" onClick={() => navigate(`/class/${clas.id}`)}>
            <h2 className="text-xl font-semibold mb-2">{clas.name}</h2>
            <p className="text-gray-700">Kode: {clas.kode}</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => handleDelete(clas.id)} className="text-red-500 hover:text-red-700">
                <Trash />
              </button>
              <button onClick={() => setUpdateclas(clas)} className="text-blue-500 hover:text-blue-700">
                <SquarePen />
              </button>
            </div>
          </div>
        ))}
      </div>

      {newclas && (
        <div className="mt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddNewclas();
            }}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <h3 className="text-lg font-semibold mb-4">Add New Class</h3>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Class Name</label>
              <input
                type="text"
                id="name"
                value={newclas.name}
                onChange={(e) => setNewclas({ ...newclas, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="kode" className="block text-gray-700">Class Code</label>
              <input
                type="text"
                id="kode"
                value={newclas.kode}
                onChange={(e) => setNewclas({ ...newclas, kode: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Save
              </button>
              <button type="button" onClick={() => setNewclas(null)} className="bg-gray-300 text-black px-4 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {updateclas && (
        <div className="mt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveUpdate();
            }}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <h3 className="text-lg font-semibold mb-4">Update Class</h3>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Class Name</label>
              <input
                type="text"
                id="name"
                value={updateclas.name}
                onChange={(e) =>
                  setUpdateclas({ ...updateclas, name: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="kode" className="block text-gray-700">Class Code</label>
              <input
                type="text"
                id="kode"
                value={updateclas.kode}
                onChange={(e) =>
                  setUpdateclas({ ...updateclas, kode: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Save
              </button>
              <button type="button" onClick={() => setUpdateclas(null)} className="bg-gray-300 text-black px-4 py-2 rounded-lg">
                Cancel
                </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
