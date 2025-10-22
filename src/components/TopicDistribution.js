import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TOPIC_COLORS } from '../utils/colors';

function TopicDistribution({ documents, hoveredDocument, onDocumentHover }) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!documents.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const xScale = d3.scaleLinear()
      .domain([-0.5, 0.5])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([-0.5, 0.5])
      .range([height - margin.bottom, margin.top]);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5))
      .append('text')
      .attr('x', width / 2)
      .attr('y', 35)
      .attr('fill', '#333')
      .style('text-anchor', 'middle')
      .text('PCA Dimension 1');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(5))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -35)
      .attr('x', -height / 2)
      .attr('fill', '#333')
      .style('text-anchor', 'middle')
      .text('PCA Dimension 2');

    // Add dots
    svg.selectAll('.dot')
      .data(documents)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.pca1))
      .attr('cy', d => yScale(d.pca2))
      .attr('r', d => 5 + d.topic_strength * 15)
      .attr('fill', d => TOPIC_COLORS[d.dominant_topic])
      .attr('opacity', 0.7)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        d3.select(this).attr('opacity', 1);
        onDocumentHover(d);
        
        const tooltip = d3.select(tooltipRef.current);
        tooltip.html(`
          <strong>${d.name}</strong><br/>
          Year: ${d.year}<br/>
          Topic: ${d.dominant_topic}<br/>
          Strength: ${(d.topic_strength * 100).toFixed(1)}%
        `)
        .style('left', (event.layerX + 10) + 'px')
        .style('top', (event.layerY - 10) + 'px')
        .classed('visible', true);
      })
      .on('mouseleave', function() {
        d3.select(this).attr('opacity', 0.7);
        onDocumentHover(null);
        d3.select(tooltipRef.current).classed('visible', false);
      });

  }, [documents, onDocumentHover]);

  return (
    <div className="card">
      <h2>2. Topic Distribution Across Documents</h2>
      <div className="scatter-container">
        <svg ref={svgRef} width="100%" height="100%"></svg>
        <div ref={tooltipRef} className="scatter-tooltip"></div>
      </div>
      <p className="chart-description">
        Each point represents a document, colored by dominant topic. Size indicates topic strength.
      </p>
    </div>
  );
}

export default TopicDistribution;