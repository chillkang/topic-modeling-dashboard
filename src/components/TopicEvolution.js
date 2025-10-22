import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TOPIC_COLORS } from '../utils/colors';

function TopicEvolution({ data, selectedTopics, yearRange }) {
  const svgRef = useRef(null);
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [visibleTopics, setVisibleTopics] = useState(selectedTopics);
  const [legendExpanded, setLegendExpanded] = useState(true);

  // Update visible topics when selected topics change
  useEffect(() => {
    setVisibleTopics(selectedTopics);
  }, [selectedTopics]);

  // Toggle topic visibility
  const toggleTopicVisibility = (topicId) => {
    setVisibleTopics(prev => {
        if (prev.includes(topicId)) {
        return prev.filter(id => id !== topicId);
        } else {
        return [...prev, topicId];
        }
    });
  };

  // Toggle all topics
  const toggleAllTopics = () => {
    if (visibleTopics.length > 0) {
        // If any are visible, hide all
        setVisibleTopics([]);
    } else {
        // If none are visible, show all
        setVisibleTopics(selectedTopics);
    }
  };

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const filteredData = data.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]);

    // Calculate actual max value from visible topics only
    let maxValue = 0;
    visibleTopics.forEach(topicId => {
      filteredData.forEach(d => {
        const value = d[`topic_${topicId}`] || 0;
        if (value > maxValue) maxValue = value;
      });
    });
    maxValue = Math.min(0.55, Math.ceil(maxValue * 100) / 100 + 0.05);

    const xScale = d3.scaleLinear()
      .domain([yearRange[0], yearRange[1]])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([height - margin.bottom, margin.top]);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format('d')))
      .append('text')
      .attr('x', width / 2)
      .attr('y', 35)
      .attr('fill', '#333')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Year');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(8))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -35)
      .attr('x', -height / 2)
      .attr('fill', '#333')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Topic Prevalence');

    // Add grid lines
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},0)`)
      .style('stroke-dasharray', '3,3')
      .style('opacity', 0.3)
      .call(d3.axisLeft(yScale)
        .tickSize(-(width - margin.left - margin.right))
        .tickFormat('')
      );

    // Create line generator
    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Add lines for each visible topic
    visibleTopics.forEach(topicId => {
      const topicData = filteredData.map(d => ({
        year: d.year,
        value: d[`topic_${topicId}`] || 0
      }));

      // Add line with hover effect
      svg.append('path')
        .datum(topicData)
        .attr('fill', 'none')
        .attr('stroke', TOPIC_COLORS[topicId])
        .attr('stroke-width', hoveredTopic === topicId ? 3 : 2)
        .attr('opacity', hoveredTopic === null || hoveredTopic === topicId ? 1 : 0.3)
        .attr('d', line)
        .attr('class', `line-topic-${topicId}`)
        .style('cursor', 'pointer')
        .on('mouseenter', () => setHoveredTopic(topicId))
        .on('mouseleave', () => setHoveredTopic(null));

      // Add dots
      svg.selectAll(`.dot-${topicId}`)
        .data(topicData)
        .enter().append('circle')
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d.value))
        .attr('r', hoveredTopic === topicId ? 5 : 3)
        .attr('fill', TOPIC_COLORS[topicId])
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('opacity', hoveredTopic === null || hoveredTopic === topicId ? 1 : 0.3)
        .style('cursor', 'pointer')
        .on('mouseenter', () => setHoveredTopic(topicId))
        .on('mouseleave', () => setHoveredTopic(null));

      // Add value labels on hover
      if (hoveredTopic === topicId) {
        svg.selectAll(`.label-${topicId}`)
          .data(topicData.filter((d, i) => i % 2 === 0)) // Show every other label to avoid crowding
          .enter().append('text')
          .attr('x', d => xScale(d.year))
          .attr('y', d => yScale(d.value) - 10)
          .attr('text-anchor', 'middle')
          .style('font-size', '10px')
          .style('fill', TOPIC_COLORS[topicId])
          .style('font-weight', '600')
          .text(d => (d.value * 100).toFixed(1) + '%');
      }
    });

  }, [data, visibleTopics, yearRange, hoveredTopic]);

  return (
    <div className="card">
      <h2>3. Topic Evolution Over Time</h2>
      <div className="time-chart-wrapper">
        <div className="time-chart-container">
          <svg ref={svgRef} width="100%" height="100%"></svg>
        </div>
        <div className="chart-legend">
          <div className="legend-header">
            <button 
              className="legend-toggle"
              onClick={() => setLegendExpanded(!legendExpanded)}
            >
              Legend {legendExpanded ? '▼' : '▶'}
            </button>
            {legendExpanded && (
              <button 
                className="legend-toggle-all"
                onClick={toggleAllTopics}
                title={visibleTopics.length === selectedTopics.length ? "Hide all except first" : "Show all"}
              >
                {visibleTopics.length === selectedTopics.length ? '☑' : '☐'}
              </button>
            )}
          </div>
          <div className={`legend-items ${legendExpanded ? 'expanded' : ''}`}>
            {selectedTopics.map(topicId => (
              <div 
                key={topicId}
                className={`legend-item ${!visibleTopics.includes(topicId) ? 'disabled' : ''}`}
                onClick={() => toggleTopicVisibility(topicId)}
                onMouseEnter={() => visibleTopics.includes(topicId) && setHoveredTopic(topicId)}
                onMouseLeave={() => setHoveredTopic(null)}
                style={{ 
                  opacity: !visibleTopics.includes(topicId) ? 0.4 : 
                          (hoveredTopic === null || hoveredTopic === topicId ? 1 : 0.6)
                }}
                title={`Click to ${visibleTopics.includes(topicId) ? 'hide' : 'show'} Topic ${topicId}`}
              >
                <span className="legend-checkbox">
                  {visibleTopics.includes(topicId) ? '☑' : '☐'}
                </span>
                <span 
                  className="legend-color"
                  style={{ 
                    backgroundColor: TOPIC_COLORS[topicId],
                    opacity: visibleTopics.includes(topicId) ? 1 : 0.3
                  }}
                ></span>
                <span className="legend-label">Topic {topicId}</span>
              </div>
            ))}
          </div>
          {legendExpanded && visibleTopics.length === 0 && (
            <p className="legend-warning">Select at least one topic to display</p>
          )}
        </div>
      </div>
      <p className="chart-description">
        Shows how topic prevalence changes over time. Click legend items to show/hide topics. 
        Hover over lines to see values. Currently showing {visibleTopics.length} of {selectedTopics.length} topics.
      </p>
    </div>
  );
}

export default TopicEvolution;