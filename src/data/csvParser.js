export function processCSVData(data) {
  return data.map((row, index) => {
    // Find dominant topic
    let dominantTopic = 0;
    let maxValue = 0;
    const topics = {};
    
    // Process topic columns
    for (let i = 0; i < 15; i++) {
      const topicKey = `Topic ${i}`;
      const value = parseFloat(row[topicKey]) || 0;
      topics[i] = value;
      
      if (value > maxValue) {
        maxValue = value;
        dominantTopic = i;
      }
    }
    
    // Parse document name
    const documentName = row.document
      ? row.document.replace(/_clean\.txt$/, '').replace(/_/g, ' ')
      : `Document ${index}`;
    
    return {
      id: index,
      name: documentName,
      year: parseInt(row.year) || 2000,
      dominant_topic: row.dominant_topic ? parseInt(row.dominant_topic) : dominantTopic,
      topic_strength: maxValue,
      pca1: (Math.random() - 0.5) * 0.8,  // You can replace with actual PCA values
      pca2: (Math.random() - 0.5) * 0.8,  // You can replace with actual PCA values
      topics: topics
    };
  });
}

export function parseCSVString(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    data.push(row);
  }
  
  return processCSVData(data);
}