import "../styles/Categories.sass";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  nazwa: string;
}

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/kategorie");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
        setError(null);
      } catch (error) {
        setError("Error fetching categories");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div id="categories">
      <h2>Categories</h2>
      {isLoading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className="category-item"
            >
              <li>
                <h3>{category.nazwa}</h3>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Categories;
