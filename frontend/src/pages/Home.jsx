import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Trash, SquarePen, PlusCircle, Search } from "lucide-react";

export default function Home() {
  const [clas, setClas] = useState([]);
  const [updateclas, setUpdateclas] = useState(null);
  const [newclas, setNewclas] = useState(null);
  const token = Cookies.get("token");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("id");
  const [search, setSearch] = useState("");

  console.log(token);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/class`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Gagal mengambil data class, status : " + response.status
          );
        }
        return response.json();
      })
      .then((data) => setClas(data))
      .catch((error) => {
        console.error("Error:", error.message);
        alert("Terjadi kesalahan saat mengambil data class");
      });
  }, [token]);

  // function handleDelete(data) {
  //   if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
  //     fetch(`${import.meta.env.VITE_API_BASE_URL}/api/delete-class/${data.id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.text())
  //       .then((message) => {
  //         setClas((prev) => prev.filter((item) => item.id !== data.id));
  //         alert(message);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error.message);
  //         alert("Terjadi kesalahan saat menghapus data class");
  //       });
  //   }
  // }
  function handleDelete(id) {
    if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/delete-class/${id}`, {
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
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/class/${updateclas.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateclas),
    })
      .then((response) => response.json())
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
        alert("Terjadi kesalahan saat memperbarui data class");
      });
  }

  // function handleAddNewclas() {
  //   fetch(`${import.meta.env.VITE_API_BASE_URL}/api/add-class`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(newclas),
  //   })
  //     .then((response) => response.json())
  //     .then((addedClass) => {
  //       setClas((prev) => [...prev, addedClass]);
  //       setNewclas(null);
  //       alert("Kelas baru berhasil ditambahkan!");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error.message);
  //       alert(`Terjadi kesalahan saat menambahkan kelas baru : ${error.message}`);
  //     });
  // }

  function handleAddNewclas() {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/add-class`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newclas),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menambahkan kelas baru");
        }
        return response.text();
      })
      .then((text) => {
        try {
          const addedClass = text ? JSON.parse(text) : null;
          if (addedClass) {
            setClas((prev) => [...prev, addedClass]);
          }
          setNewclas(null);
          alert("Kelas baru berhasil ditambahkan!");
        } catch (error) {
          console.error("Kesalahan saat parsing JSON:", error.message);
          alert("Terjadi kesalahan saat menambahkan kelas baru");
        }
      })
      .catch((error) => {
        console.error("Kesalahan:", error.message);
        alert("Terjadi kesalahan saat menambahkan kelas baru");
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
    <>
      <div>
        <button onClick={() => setNewclas({ name: "", kode: "" })}>
          <PlusCircle />
        </button>
      </div>
      <div>
        <button onClick={() => handleDelete(clas)}>
          <Trash />
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setUpdateclas(clas);
            console.log(clas);
          }}
        >
          <SquarePen />
        </button>
      </div>

      <div className="flex items-center gap-1 w-1/5">
        <Search />
        <input
          type="text"
          className="bg-gray-100 w-full p-4 gap-2 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <label>
        <h1>Urutkan</h1>
        <select
          name="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="id">Normal</option>
          <option value="name">Name</option>
          <option value="kode">Kode</option>
        </select>
      </label>
      <label>
        <h1>Urutkan</h1>
        <select
          name="order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <div>
        {filterData.map((clas) => (
          <div key={clas.id}>
            <h1>{clas.name}</h1>
            <p>{clas.kode}</p>
          </div>
        ))}
      </div>
      {updateclas && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveUpdate();
            }}
          >
            <label htmlFor="name">New Class</label>
            <input
              type="text"
              id="name"
              value={updateclas.name}
              onChange={(e) =>
                setUpdateclas({ ...updateclas, name: e.target.value })
              }
            />
            <label htmlFor="kode">Kode Class</label>
            <input
              type="text"
              id="kode"
              value={updateclas.kode}
              onChange={(e) =>
                setUpdateclas({ ...updateclas, kode: e.target.value })
              }
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setUpdateclas(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {newclas && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddNewclas();
            }}
          >
            <label htmlFor="name">New Class</label>
            <input
              type="text"
              id="name"
              value={newclas.name}
              onChange={(e) => setNewclas({ ...newclas, name: e.target.value })}
            />
            <label htmlFor="kode">Kode Class</label>
            <input
              type="text"
              id="kode"
              value={newclas.kode}
              onChange={(e) => setNewclas({ ...newclas, kode: e.target.value })}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setNewclas(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}
