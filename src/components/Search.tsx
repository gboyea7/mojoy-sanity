import { useState, useEffect } from "react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { products } from "../lib/sanityClient";
import { ProductProps } from "../../type";
import Link from "next/link";

interface Props {
  // No need to pass products as prop
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductProps[]>([]);

  useEffect(() => {
    if (searchQuery) {
      // Fetch products from Sanity that match the search query
      const searchProducts = async () => {
        try {
          const productData = await products();
          const filteredResults = productData.filter((product: ProductProps) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filteredResults.slice(0, 10));
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      searchProducts();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleLinkClick = () => {
    // Reset search query when a link is clicked
    setSearchQuery("");
  };

  return (
    <div className="relative w-full hidden lg:inline-flex lg:min-w-[600px] h-10 text-base text-primary border-[1px] border-gray-200 items-center justify-between px-5 mx-20 rounded-md">
      <input
        type="text"
        placeholder="Search your products here..."
        className="flex w-full bg-transparent placeholder:to-gray-400 outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery ? (
        <IoClose
          onClick={() => setSearchQuery("")}
          className="w-5 h-5 hover:cursor-pointer hover:text-yellow-400"
        />
      ) : (
        <IoSearchOutline className="w-5 h-5 hover:cursor-pointer hover:text-yellow-400" />
      )}

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="absolute top-10 bg-white w-full border border-gray-200 rounded-md shadow-md">
          <ul>
            {searchResults.map((product) => (
              <div
                key={product._id || ""}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <Link href={`/product/${product?.slug?.current}`} passHref>
                  <div onClick={handleLinkClick}>{product.title}</div>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
