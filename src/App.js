import React, { useState, useMemo } from 'react';
import './App.css';
import DashboardControls from './components/DashboardControls';
import TopicKeywords from './components/TopicKeywords';
import TopicDistribution from './components/TopicDistribution';
import TopicEvolution from './components/TopicEvolution';
import DocumentExplorer from './components/DocumentExplorer';
import TopicHeatmap from './components/TopicHeatmap';
// import CSVFileReader from './components/CSVFileReader';
import { SAMPLE_DOCUMENTS } from './data/sampleDocuments';
import { generateTimeSeriesData } from './data/topicData';

function App() {
  const [selectedTopics, setSelectedTopics] = useState([0, 3, 4, 7, 9, 13]);
  const [yearRange, setYearRange] = useState([1950, 2000]);
  const [documents] = useState(SAMPLE_DOCUMENTS);
  const [timeSeriesData] = useState(generateTimeSeriesData());
  const [hoveredDocument, setHoveredDocument] = useState(null);

  const toggleTopic = (topicId) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicId)) {
        return prev.filter(t => t !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => 
      doc.year >= yearRange[0] && 
      doc.year <= yearRange[1] &&
      selectedTopics.includes(doc.dominant_topic)
    );
  }, [documents, yearRange, selectedTopics]);

  return (
    <div className="dashboard" role="main">
      <header className="dashboard-header">
        <h1>Topic Modeling Analysis Dashboard</h1>
        <p>Interactive visualization of the exhibition catalog topics of MOMA from 1929 to 2007</p>
      </header>

      <DashboardControls 
        selectedTopics={selectedTopics}
        yearRange={yearRange}
        onTopicToggle={toggleTopic}
        onYearRangeChange={setYearRange}
      />

      {/* <CSVFileReader onDataLoad={setDocuments} /> */}

      <div className="dashboard-grid">
        <TopicKeywords selectedTopics={selectedTopics} />
        
        <TopicDistribution 
          documents={filteredDocuments}
          hoveredDocument={hoveredDocument}
          onDocumentHover={setHoveredDocument}
        />
        
        <TopicEvolution 
          data={timeSeriesData}
          selectedTopics={selectedTopics}
          yearRange={yearRange}
        />
        
        <DocumentExplorer documents={filteredDocuments} />
        
        <TopicHeatmap 
          documents={filteredDocuments.slice(0, 5)}
          selectedTopics={selectedTopics}
        />
      </div>
    </div>
  );
}

export default App;