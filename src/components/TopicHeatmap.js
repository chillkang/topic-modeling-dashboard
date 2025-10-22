import React from 'react';
import { TOPIC_COLORS } from '../utils/colors';
import { TOPIC_KEYWORDS } from '../data/topicData';

function TopicHeatmap({ documents, selectedTopics }) {
  const getCellColor = (value) => {
    if (!value) return '#f8f9fa';
    const intensity = Math.min(value, 1);
    const opacity = 0.2 + (intensity * 0.8);
    return `rgba(74, 144, 226, ${opacity})`;
  };

  const getCellTextColor = (value) => {
    return value > 0.5 ? 'white' : '#333';
  };

  return (
    <div className="card">
      <h2>5. Topic-Document Heatmap</h2>
      <div className="table-container">
        <table className="heatmap-table" role="table">
          <thead>
            <tr>
              <th scope="col">Document</th>
              {selectedTopics.slice(0, 6).map(topicId => (
                <th key={topicId} scope="col">
                  <div className="topic-header">
                    <div className="topic-color-indicator" 
                         style={{ backgroundColor: TOPIC_COLORS[topicId] }}
                         aria-hidden="true"></div>
                    <div>Topic {topicId}</div>
                    <div className="topic-keywords-small">
                      {TOPIC_KEYWORDS[topicId]?.split(',').slice(0, 10).join(', ')}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id}>
                <td>{doc.name} ({doc.year})</td>
                {selectedTopics.slice(0, 6).map(topicId => {
                  const value = doc.topics[topicId] || 0;
                  return (
                    <td key={topicId} 
                        className="heatmap-cell"
                        style={{ 
                          backgroundColor: getCellColor(value),
                          color: getCellTextColor(value)
                        }}>
                      {value > 0 ? `${(value * 100).toFixed(0)}%` : '0%'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="chart-description">
        Topic distribution across documents. Darker colors indicate higher topic presence.
      </p>
    </div>
  );
}

export default TopicHeatmap;