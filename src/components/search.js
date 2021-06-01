import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import logo from '../images/Logo.svg'
const Search = () => {
  const [searchString, setSearchString] = useState("");
  const [isFocusd, setIsFocused] = useState(false);
  const [searchTerms, setSearchTerms] = useState([]);
  const [trendingSearchTerms, setTrendingSearchTerms] = useState([]);
  const dispatch = useDispatch();
  const API_KEY = "etulOKF24ao5wf0tUdlnHjFHdN40BCFM";

  const handleInput = (e) => {
    setSearchString(e.target.value);
    dispatch({ type: "UPDATE_STRING", payload: e.target.value });

    if (e.target.value) {
      axios
        .get(
          `https://api.giphy.com/v1/tags/related/${e.target.value}?api_key=${API_KEY}`
        )
        .then((res) => {
          let newTerms = [];
          res.data.data.forEach((obj) => {
            newTerms.push(obj.name);
          });
          setSearchTerms(newTerms);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchString(searchString);
    setIsFocused(false);
  };

  const fetchTrendingSearchTerms = () => {
    axios
      .get(`https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`)
      .then((res) => {
        let terms = res.data.data.slice(0, 10);
        setTrendingSearchTerms(terms);
      });
  };

  const searchTermList = useRef(null);
  const form = useRef("null");

  useEffect(() => {
    fetchTrendingSearchTerms();
    window.addEventListener("scroll", () => {
      setIsFocused(false);
      form.current[0].blur();
    });
    setIsFocused(false);
  }, []);
  useEffect(() => {
    if (searchTerms.length === 0) {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  }, [searchTerms]);

  return (
    <section className="search" id="search">
     <div className = "logo">
        <img src={logo} alt="" />
        <h3>GIFPlanet</h3>
     </div>
      <form onSubmit={(e) => handleSubmit(e)} ref={form}>
        <div className="input-field">
          <input
            type="text"
            placeholder="search "
            value={searchString}
            onChange={(e) => handleInput(e)}
            onFocus={() => setIsFocused(true)}
          />
          <button>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
        <ul
          className="searchTags"
          style={{ display: isFocusd ? "block" : "none" }}
          ref={searchTermList}
        >
          {searchTerms.length > 0
            ? searchTerms.map((term, index) => {
                return (
                  <li
                    onClick={(e) => {
                      setSearchString(term);
                      dispatch({ type: "UPDATE_STRING", payload: term });
                      setIsFocused(false);
                    }}
                    key={index}
                  >
                    {term}
                  </li>
                );
              })
            : trendingSearchTerms.map((term, index) => {
                return (
                  <li
                    onClick={(e) => {
                      setSearchString(term);
                      dispatch({ type: "UPDATE_STRING", payload: term });
                      setIsFocused(false);
                    }}
                    key={index}
                  >
                    {term}
                  </li>
                );
              })}
        </ul>
      </form>
    </section>
  );
};

export default Search;
