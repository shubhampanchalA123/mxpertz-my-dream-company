import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StoreStory() {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("https://child.onrender.com/api/sciencefiction");
        setStories(response.data);
        setFilteredStories(response.data);
      } catch (error) {
        console.error("Error fetching story data:", error);
      }
    };

    fetchStories();
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      "In Progress": "#ffc328",
      "New": "#2a8bff",
      "Completed": "#28ff65",
    };
    return statusColors[status] || "grey";
  };

  const filterStories = (status) => {
    if (["New", "In Progress", "Completed"].includes(status)) {
      setFilteredStories(stories.filter((story) => story.Status === status));
    } else {
      setFilteredStories(stories);
    }
  };

  const handleNext = () => {
    if (startIndex + 8 < filteredStories.length) {
      setStartIndex(startIndex + 8);
    }
  };

  const handlePrevious = () => {
    if (startIndex - 8 >= 0) {
      setStartIndex(startIndex - 8);
    }
  };

  const showStory = (id) => {
    localStorage.setItem("storyId", id);
    navigation("/ShowStory");
  };

  const clearFilter = () => {
    setFilteredStories(stories);
    setStartIndex(0);
  };

  return (
    <div className="body">
      <header className="header">Science Fiction Stories</header>

     <div className="main-nav">
          <button className="nav-button nav-button-1" onClick={() => filterStories("New")}>
            New
          </button>
          <button className="nav-button nav-button-2" onClick={() => filterStories("In Progress")}>
            In Progress
          </button>
          <button className="nav-button nav-button-3" onClick={() => filterStories("Completed")}>
            Completed
          </button>
          <button className="nav-button nav-button-4" onClick={() => setFilteredStories(stories)}>
            Clear All
          </button>
       
      </div>

      <div className="card-container">
        {filteredStories.slice(startIndex, startIndex + 8).map((item) => (
          <div className="card" key={item._id}>
            <img
              src={`https://ik.imagekit.io/dev24/${item.Image}`}
              alt={item.Title}
              style={{ width: "100%", height: "250px", borderRadius: "6px" }}
            />
            <h3>{item.Title}</h3>
            <button
              className="status-button"
              style={{ color: getStatusColor(item.Status) }}
              onClick={() => showStory(item._id)}
            >
              {item.Status}
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-button" onClick={handlePrevious} disabled={startIndex === 0}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2a8bff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Previous</span>
        </button>
        <button className="pagination-button" onClick={handleNext} disabled={startIndex + 8 >= filteredStories.length}>
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2a8bff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
