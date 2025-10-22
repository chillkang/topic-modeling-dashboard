import React, { useMemo, useState } from 'react';
import { TOPIC_COLORS } from '../utils/colors';

function DocumentExplorer({ documents }) {
  const [hoveredDoc, setHoveredDoc] = useState(null);
  
  const sortedDocs = useMemo(() => {
    return [...documents].sort((a, b) => b.topic_strength - a.topic_strength).slice(0, 10);
  }, [documents]);

  return (
    <div className="card">
      <h2>4. Document Explorer</h2>
      <div className="table-container">
        <table className="document-table" role="table">
          <thead>
            <tr>
              <th scope="col">Document</th>
              <th scope="col">Year</th>
              <th scope="col">Main Topic</th>
              <th scope="col">Relevance</th>
            </tr>
          </thead>
          <tbody>
            {sortedDocs.map(doc => (
              <tr key={doc.id}>
                <td>{doc.name}</td>
                <td>{doc.year}</td>
                <td>
                  <div className="topic-badge" 
                       style={{ backgroundColor: TOPIC_COLORS[doc.dominant_topic] + '20' }}>
                    <span className="topic-dot" 
                          style={{ backgroundColor: TOPIC_COLORS[doc.dominant_topic] }}></span>
                    Topic {doc.dominant_topic}
                  </div>
                </td>
                <td>
                  <div className="relevance-container"
                       onMouseEnter={() => setHoveredDoc(doc.id)}
                       onMouseLeave={() => setHoveredDoc(null)}>
                    <div className="relevance-bar" 
                         role="progressbar" 
                         aria-valuenow={Math.round(doc.topic_strength * 100)} 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                      <div className="relevance-fill" 
                           style={{ width: `${doc.topic_strength * 100}%` }}>
                      </div>
                    </div>
                    <span className={`relevance-value ${hoveredDoc === doc.id ? 'visible' : ''}`}>
                      {(doc.topic_strength * 100).toFixed(1)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="chart-description">
        Top documents relevant to selected topics. Hover over relevance bars to see exact values.
      </p>
    </div>
  );
}

export default DocumentExplorer;