import { useState, useEffect, createContext } from "react";
import axios from "axios";

const NoticiasContext = createContext();

const NoticiasProvider = ({ children }) => {
  const [categoria, setCategoria] = useState("general");
  const [noticias, setNoticias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalNoticias, setTotalNoTicias] = useState(0);

  useEffect(() => {
    const consultarApi = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=mx&page=${pagina}&category=${categoria}&apikey=${
        import.meta.env.VITE_API_KEY
      }`;
      const { data } = await axios(url);

      setNoticias(data.articles);
      setTotalNoTicias(data.totalResults);
    };
    consultarApi();
  }, [pagina]);

  useEffect(() => {
    const consultarApi = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apikey=${
        import.meta.env.VITE_API_KEY
      }`;
      const { data } = await axios(url);

      setNoticias(data.articles);
      setTotalNoTicias(data.totalResults);
      setPagina(1);
    };
    consultarApi();
  }, [categoria]);

  const handleChangeCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleChangePagina = (e, valor) => {
    setPagina(valor);
  };

  return (
    <NoticiasContext.Provider
      value={{
        categoria,
        handleChangeCategoria,
        noticias,
        totalNoticias,
        handleChangePagina,
        pagina,
      }}
    >
      {children}
    </NoticiasContext.Provider>
  );
};

export { NoticiasProvider };

export default NoticiasContext;
