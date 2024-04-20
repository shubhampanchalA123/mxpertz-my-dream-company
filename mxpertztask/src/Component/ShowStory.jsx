import React, { useState, useEffect } from "react";
import axios from "axios";

const perPage = 6; // Number of items per page

export default function ShowStory() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storyId = localStorage.getItem("storyId");

    axios
      .get(`https://child.onrender.com/api/sciencefiction/${storyId}`)
      .then((response) => {
        setSelectedStory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const totalPages = Math.ceil((selectedStory?.Wordexplore.length || 0) / perPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const visibleItems = selectedStory?.Wordexplore.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <>
      <div className="showStory-body">
        <div className="header">The Lost City of Future Earth</div>

        <div className="storybutton">
          <div className="showStory-nav">
            <button className="firstButton">World Explorer</button>
            <button className="secoundButton">Story Advanture</button>
            <button className="thirdButton">Brain Quest</button>
          </div>

          <div>Drag Picture to The Metching World Light up Currect Pairs,Shake for a Retry</div>

        </div>

        <div className="showstorycontainer">
          <div className="left">
            <img src={`https://ik.imagekit.io/dev24/${selectedStory?.Image}`} alt={selectedStory?.Title} />
            <h2 style={{fontSize:"22px",fontWeight:"bolder"}}>{selectedStory?.Title}</h2>
          </div>

          <div className="right">
            {visibleItems?.length > 0 ? (
              visibleItems.map((item, index) => (
                <div id="summaryTab" className="tab" key={index}>
                  <img src={`https://ik.imagekit.io/dev24/${item.Storyimage}`} alt="" />
                  <div className="content">
                  <h5>{item.Storytitle}</h5>
                  <p>{item.Storyitext}</p>
                  </div>
                </div>
              ))
            ) : (
              <h2>No Contents To Display</h2>
            )}
          </div>
        </div>
        <div id="tabButtons">
          {selectedStory?.Wordexplore.length > perPage && (
            <div className="pagination-buttons">
              <button onClick={handlePrev}>
                {" "}
                <span>Previous</span>
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
              </button>
              <button onClick={handleNext}>
                {" "}
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
          )}
        </div>
      </div>
    </>
  );
}
