// import { useState } from "react";
import { NextPage } from "next";
import { useState } from "react";
import CommnadsListComponent from "../components/CommandsList";
import NavbarProvider from "../components/NavbarProvider";
import { useGetCategoriesQuery } from "../generated/graphql";

interface CommandsPageProps {}

const CommandsPage: NextPage<CommandsPageProps> = () => {
  const categories = useGetCategoriesQuery()[0];
  const [selectedCategory, setSelectedCategory] = useState<string>();

  return (
    <NavbarProvider>
      <div className="text-center">
        <h1 className="text-5xl">Commands</h1>
        <br />
        {selectedCategory ? (
          <>
            <CommnadsListComponent category={selectedCategory} />
            {/* Create a button that resets the selected category */}

            <button
              className="bg-gray-800 py-2 px-4 rounded"
              type="button"
              onClick={() => setSelectedCategory(undefined)}
            >
              All
            </button>
          </>
        ) : (
          <div>
            <h2 className="text-2xl">Categories</h2>
            <div className="flex flex-wrap justify-center">
              {categories.data?.getCategories.map((category, i) => (
                <div
                  key={i}
                  className="w-1/3 p-2 cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="bg-gray-800 rounded-lg shadow-md p-2">
                    <h3 className="text-xl">{category}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </NavbarProvider>
  );
};

export default CommandsPage;
