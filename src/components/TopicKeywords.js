import React from 'react';
import { TOPIC_COLORS } from '../utils/colors';
import { TOPIC_KEYWORDS } from '../data/topicData';

function TopicKeywords({ selectedTopics }) {
  return (
    <div className="card">
      <h2>1. Topic Keywords</h2>
      <div className="keywords-grid">
        {selectedTopics.map(topicId => (
          <div key={topicId} className="topic-keywords">
            <div 
              className="topic-indicator"
              style={{ backgroundColor: TOPIC_COLORS[topicId] }}
              aria-hidden="true"
            ></div>
            <span className="topic-label">Topic {topicId}</span>
            <span className="keywords-text">
              {TOPIC_KEYWORDS[topicId]?.split(',').slice(0, 10).join(', ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopicKeywords;