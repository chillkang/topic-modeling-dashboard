export const TOPIC_KEYWORDS = {
  0: 'new_york, color, paris, form, early, matisse, oil, new, picasso, painter',
  1: 'new_york, paris, color, nature, design, use, oil, form, photograph, man',
  2: 'new_york, color, use, study, painter, form, find, paper, place, sculpture',
  3: 'new_york, paris, use, early, light, space, house, large, matisse, picasso',
  4: 'design, line, building, painter, object, paper, london',
  5: 'new_york, design, new, use, machine, self, time, space, destroy, house',
  6: 'new_york, paris, new, design, matisse, space, find, white, high, bear',
  7: 'new_york, paris, form, oil, nature, life, find, paper, line, light',
  8: 'new_york, paris, form, color, design, new, time, house, lithograph, number',
  9: 'form, new_york, design, new, paris, architecture, space, large, modern, american',
  10: 'new_york, form, color, space, world, place, subject, photograph, project, light',
  11: 'new_york, paris, life, new, matisse, form, design, composition, include, large',
  12: 'new_york, color, new, oil, paris, life, pollock, begin, way, surface',
  13: 'new_york, paris, new, design, form, color, early, time, oil, object',
  14: 'new_york, nature, oil, color, paris, new, painter, picasso, begin, matisse',
};

export const generateTimeSeriesData = () => {
  const decades = ['1930', '1940', '1950', '1960', '1970', '1980', '1990', '2000'];
  const topicData = {
    0: [0.244, 0.167, 0.230, 0.248, 0.247, 0.211, 0.230, 0.209],
    1: [0.337, 0.144, 0.257, 0.136, 0.041, 0.136, 0.064, 0.482],
    2: [0.221, 0.169, 0.092, 0.146, 0.193, 0.121, 0.178, 0.413],
    3: [0.249, 0.190, 0.242, 0.225, 0.116, 0.127, 0.120, 0.067],
    4: [0.028, 0.056, 0.018, 0.255, 0.125, 0.190, 0.173, 0.021],
    5: [0.189, 0.286, 0.340, 0.159, 0.204, 0.248, 0.221, 0.132],
    6: [0.110, 0.197, 0.110, 0.099, 0.153, 0.158, 0.164, 0.178],
    7: [0.055, 0.094, 0.090, 0.117, 0.135, 0.112, 0.114, 0.056],
    8: [0.154, 0.162, 0.151, 0.239, 0.298, 0.258, 0.219, 0.020],
    9: [0.358, 0.277, 0.228, 0.145, 0.237, 0.192, 0.315, 0.605],
    10: [0.065, 0.117, 0.171, 0.115, 0.121, 0.130, 0.141, 0.521],
    11: [0.130, 0.240, 0.202, 0.123, 0.158, 0.262, 0.135, 0.038],
    12: [0.131, 0.153, 0.173, 0.134, 0.087, 0.067, 0.111, 0.069],
    13: [0.275, 0.068, 0.204, 0.168, 0.070, 0.070, 0.040, 0.028],
    14: [0.132, 0.306, 0.131, 0.126, 0.131, 0.080, 0.212, 0.011],
  };
  
  return decades.map(decade => {
    const point = { year: parseInt(decade) };
    Object.keys(topicData).forEach(topic => {
      const decadeIndex = decades.indexOf(decade);
      point[`topic_${topic}`] = topicData[topic][decadeIndex] || 0;
    });
    return point;
  });
};