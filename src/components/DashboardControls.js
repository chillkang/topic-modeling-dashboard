import React, { useCallback } from 'react';
import { TOPIC_COLORS } from '../utils/colors';
import { TOPIC_NAMES } from '../data/topicNames';

function DashboardControls({ selectedTopics, yearRange, onTopicToggle, onYearRangeChange }) {
  const handleYearChange = useCallback((index, value) => {
    const newRange = [...yearRange];
    newRange[index] = parseInt(value);
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[1] = newRange[0];
    }
    if (index === 1 && newRange[1] < newRange[0]) {
      newRange[0] = newRange[1];
    }
    onYearRangeChange(newRange);
  }, [yearRange, onYearRangeChange]);

  return (
    <div className="dashboard-controls">
      <h2>Dashboard Controls</h2>
      
      <div className="controls-section">
        <h3>Select Topics:</h3>
        <div className="topic-pills" role="group" aria-label="Topic selection">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="topic-pill-wrapper">
              <button
                className={`topic-pill ${selectedTopics.includes(i) ? 'active' : ''}`}
                style={{
                  backgroundColor: selectedTopics.includes(i) ? TOPIC_COLORS[i] : 'white',
                  borderColor: TOPIC_COLORS[i]
                }}
                onClick={() => onTopicToggle(i)}
                aria-pressed={selectedTopics.includes(i)}
                aria-label={`Topic ${i}: ${TOPIC_NAMES[i]}`}
              >
                Topic {i}
              </button>
              <span className="topic-tooltip">{TOPIC_NAMES[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="controls-section">
        <h3>Year Range: {yearRange[0]}-{yearRange[1]}</h3>
        <div className="year-range-container">
          <div className="year-slider">
            <div className="slider-track"></div>
            <div 
              className="slider-fill"
              style={{
                left: `${((yearRange[0] - 1929) / (2007 - 1929)) * 100}%`,
                width: `${((yearRange[1] - yearRange[0]) / (2007 - 1929)) * 100}%`
              }}
            ></div>
            <input
              type="range"
              min="1929"
              max="2007"
              value={yearRange[0]}
              onChange={(e) => handleYearChange(0, e.target.value)}
              className="range-input"
              aria-label="Start year"
            />
            <input
              type="range"
              min="1929"
              max="2007"
              value={yearRange[1]}
              onChange={(e) => handleYearChange(1, e.target.value)}
              className="range-input"
              aria-label="End year"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardControls;