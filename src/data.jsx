import { useState } from "react";
import "./Data.css";

// 6 categories x 10 products = 60 products
const data = {
  Mobiles: ["iPhone 15", "Galaxy S24", "OnePlus 12", "Redmi Note 13", "Realme 12 Pro", "Pixel 8", "Vivo V30", "Oppo Reno 11", "Nothing Phone 2", "Poco X6"],
  Fashion: ["Sneakers", "Formal Shirt", "Denim Jacket", "Polo T-Shirt", "Saree", "Lehenga", "Sunglasses", "Wrist Watch", "Leather Belt", "Backpack"],
  Grocery: ["Basmati Rice", "Wheat Flour", "Toor Dal", "Sugar", "Tea Powder", "Cooking Oil", "Salt", "Red Chilli Powder", "Ghee", "Honey"],
  Furniture: ["Sofa Set", "Study Table", "Office Chair", "Bookshelf", "Dining Table", "Wardrobe", "Bed Frame", "Shoe Rack", "TV Stand", "Bean Bag"],
  Fitness: ["Treadmill", "Resistance Band", "Protein Shaker", "Push Up Bar", "Kettlebell", "Ab Roller", "Gym Gloves", "Foam Roller", "Jump Rope", "Exercise Cycle"],
  Stationery: ["Notebook", "Gel Pen", "Highlighter", "Stapler", "Sketch Pens", "Geometry Box", "Sticky Notes", "File Folder", "Marker", "Calculator"],
};

const categories = Object.keys(data);

const products = [];
let id = 1;
for (const category of categories) {
  data[category].forEach((name, i) => {
    const price = 99 + (((id + 1) * 137 + i * 53) % 4900);
    products.push({ id, name, category, price });
    id++;
  });
}

function Table() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(0);
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const q = search.trim().toLowerCase();
  const list = products.filter((p) => {
    const categoryOk = active === 0 || p.category === categories[active - 1];
    const searchOk =
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return categoryOk && searchOk;
  });

  list.sort((a, b) => {
    let result;
    if (sortKey === "price") {
      result = a.price - b.price;
    } else {
      result = a.name.localeCompare(b.name);
    }
    return sortDir === "asc" ? result : -result;
  });

  function handleSearch(e) {
    setSearch(e.target.value);
    setActive(0);
  }

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function arrow(key) {
    if (key !== sortKey) return "↕";
    return sortDir === "asc" ? "↑" : "↓";
  }

  return (
    <div className="pl-page">
      <div className="pl-panel">
        <header className="pl-header">
          <div>
            <h1 className="pl-title">Product<span>Hub</span></h1>
            <p className="pl-sub">Search, sort aur filter karke products dekho</p>
          </div>
          <div className="pl-count">{list.length} items</div>
        </header>

        <div className="pl-search-box">
          <span className="pl-search-icon">🔍</span>
          <input
            className="pl-search"
            type="text"
            placeholder="Name ya category se search karo"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className={active === 0 ? "pl-table-wrap pl-scroll" : "pl-table-wrap"}>
          <table className="pl-table">
            <thead>
              <tr>
                <th className="pl-no">#</th>
                <th className="pl-sortable" onClick={() => handleSort("name")}>
                  Name {arrow("name")}
                </th>
                <th>Category</th>
                <th className="pl-sortable pl-right" onClick={() => handleSort("price")}>
                  Price {arrow("price")}
                </th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan="4" className="pl-empty">The Products is not available</td>
                </tr>
              ) : (
                list.map((p, index) => (
                  <tr key={p.id}>
                    <td className="pl-no">{index + 1}</td>
                    <td className="pl-name">{p.name}</td>
                    <td>
                      <span className={"pl-tag tag-" + p.category.toLowerCase()}>
                        {p.category}
                      </span>
                    </td>
                    <td className="pl-price pl-right">
                      ₹{p.price.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* buttons: ‹ All 1 2 3 4 5 6 › */}
        <footer className="pl-foot">
          <div className="pl-pager">
            <button disabled={active === 0} onClick={() => setActive(active - 1)}>
              ‹
            </button>

            <button
              className={active === 0 ? "on" : ""}
              onClick={() => setActive(0)}
            >
              All
            </button>

            {categories.map((name, i) => (
              <button
                key={name}
                title={name}
                className={active === i + 1 ? "on" : ""}
                onClick={() => setActive(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button disabled={active === 6} onClick={() => setActive(active + 1)}>
              ›
            </button>
          </div>

          <p className="pl-info">
            {active === 0
              ? "Showing all " + list.length + " products"
              : categories[active - 1] + " · " + list.length + " products"}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Table;