import Header from "./Header/header";
import "./App.css";
import CategoryList from "./assets/CategoryList/categoryList";
import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";
import FastFoodList from "./FastFoodList/fastFoodList";
import SearchBar from "./SearchBar/searchBar";
import notFound from "./assets/images/404.png";
import useAxios from "./useAxios";

function App() {
  const [url, setUrl] = useState("/FastFood/list");
  const [fastFoodItems, , loading] = useAxios({
    url,
  });
  // const [loading, setLoading] = useState(false);
  // const [fastFoodItems, setFastFoodItems] = useState([]);

  const searchItems = async (term) => {
    setUrl(`/FastFood/search/${term ? "?term=" + term : ""}`);
  };

  const filterItems = (categoryId) => {
    setUrl(`/FastFood/list${categoryId ? "?categoryId=" + categoryId : ""}`);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading theme={"dark"} />;
    }

    if (fastFoodItems.length === 0) {
      return (
        <>
          <div className="alert alert-warning text-center">
            برای کلیدواژه فوق هیچ ایتمی یافت نشد
          </div>
          <img className="mx-auto mt-5 d-block fade-in-horiz" src={notFound} />
        </>
      );
    }

    return <FastFoodList fastFoodItems={fastFoodItems} />;
  };

  return (
    <>
      <div className="wrapper bg-faded-dark">
        <Header></Header>
        <CategoryList filterItems={filterItems}>
          <SearchBar searchItems={searchItems} />
        </CategoryList>
        <div className="container mt-4">{renderContent()}</div>
      </div>
    </>
  );
}

export default App;
