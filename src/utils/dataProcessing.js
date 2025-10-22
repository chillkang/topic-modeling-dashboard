export function calculatePCA(documents) {
  // Simplified PCA calculation
  // In a real application, you would use a proper PCA library
  return documents.map(doc => ({
    ...doc,
    pca1: (Math.random() - 0.5) * 0.8,
    pca2: (Math.random() - 0.5) * 0.8
  }));
}

export function filterDocumentsByTopicsAndYear(documents, selectedTopics, yearRange) {
  return documents.filter(doc => 
    doc.year >= yearRange[0] && 
    doc.year <= yearRange[1] &&
    selectedTopics.includes(doc.dominant_topic)
  );
}

export function aggregateTopicsByDecade(documents) {
  const decades = {};
  
  documents.forEach(doc => {
    const decade = Math.floor(doc.year / 10) * 10;
    if (!decades[decade]) {
      decades[decade] = { year: decade };
      for (let i = 0; i < 15; i++) {
        decades[decade][`topic_${i}`] = 0;
      }
    }
    
    Object.keys(doc.topics).forEach(topicId => {
      decades[decade][`topic_${topicId}`] += doc.topics[topicId];
    });
  });
  
  // Normalize values
  Object.values(decades).forEach(decade => {
    const total = Object.keys(decade)
      .filter(key => key.startsWith('topic_'))
      .reduce((sum, key) => sum + decade[key], 0);
    
    if (total > 0) {
      Object.keys(decade)
        .filter(key => key.startsWith('topic_'))
        .forEach(key => {
          decade[key] = decade[key] / total;
        });
    }
  });
  
  return Object.values(decades).sort((a, b) => a.year - b.year);
}