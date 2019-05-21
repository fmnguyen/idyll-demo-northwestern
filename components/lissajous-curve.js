// Make sure that these are ES5 style require rather than es6 import
const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 600;
const time = 500;
const speed = 2;

class LissajousCurve extends D3Component {

    initialize(node, props) {
        const {
            a,
            b,
            step
        } = props;

        const svg = this.svg = d3.select(node).append('svg');

        const range = d3.range(0, 3 * Math.PI, step);

        svg.attr('viewBox', `0 0 ${size} ${size}`)
            .style('width', '100%')
            .style('height', 'auto');

        svg.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('stroke-opacity', 0.8)
            .attr('d', (d) => {
                return 'M' + range.map((p) => {
                    return [
                        0.4 * size * Math.sin(a * p) + size / 2,
                        0.4 * size * Math.sin(b * p) + size / 2
                    ];
                }).join("L");
            });

        beginTimer(svg, a, b, range);

        function beginTimer(node, a, b, datum) {
            d3.timer((t) => {
                node.selectAll('path').attr('d', (d) => {
                    return 'M' + datum.map((p) => {
                        return [
                            0.4 * size * Math.sin(a * p + Math.cos(t / 1600)) + size / 2, // x as a function of time
                            0.4 * size * Math.sin(b * p) + size / 2 // y as a function of time
                        ];
                    }).join("L");
                });
            });
        }

        this.beginTimer = beginTimer;
    }


    update(props, oldProps) {
        const {
            a,
            b,
            step
        } = props;
        const range = d3.range(0, 3 * Math.PI, step);

        // Need svg to reference the already created svg in initialize
        this.beginTimer(this.svg, a, b, range);
    }

}

module.exports = LissajousCurve;