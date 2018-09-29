System.register("sierpinski", ["d3"], function (exports_1, context_1) {
    "use strict";
    var d3_1, Sierpinski;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (d3_1_1) {
                d3_1 = d3_1_1;
            }
        ],
        execute: function () {
            Sierpinski = /** @class */ (function () {
                function Sierpinski($element) {
                    this.$element = $element;
                    this._deep = 6;
                    this._sin30 = Math.pow(3, 1 / 2) / 2;
                    this._cos30 = .5;
                    this._zoom = 0;
                    this.height = $element.offsetHeight;
                    this.width = $element.offsetWidth;
                    this.side = Math.min(this.height, this.width);
                    this.svg = this.setupSVG();
                }
                Sierpinski.prototype.draw = function () {
                    this.drawTriangle(this.width / 2, this.height * 2 / 3, this.side * 2 / 3);
                };
                Sierpinski.prototype.drawTriangle = function (centerX, centerY, radius, i) {
                    if (i === void 0) { i = 0; }
                    var cal1 = centerX + "," + (centerY - radius);
                    var cal2 = centerX - radius * this._sin30 + "," + (centerY + radius * this._cos30);
                    var cal3 = centerX + radius * this._sin30 + "," + (centerY + radius * this._cos30);
                    this.svg.append('polygon')
                        .attr('zoom', this._zoom)
                        .attr('fill', i < this._deep ? 'white' : 'black')
                        .attr('points', cal1 + " " + cal2 + " " + cal3);
                    if (i < this._deep) {
                        this.drawTriangle(centerX, centerY - radius / 2, radius / 2, i + 1);
                        this.drawTriangle(centerX - radius * this._sin30 / 2, centerY + radius * this._cos30 / 2, radius / 2, i + 1);
                        this.drawTriangle(centerX + radius * this._sin30 / 2, centerY + radius * this._cos30 / 2, radius / 2, i + 1);
                    }
                };
                Sierpinski.prototype.redraw = function () {
                    this.svg.attr('transform', d3_1.default.event.transform.toString());
                };
                Sierpinski.prototype.setupSVG = function () {
                    // Sometimes we have to do, what we have to do... :D
                    var hackedD3 = d3_1.default;
                    var behavior = hackedD3.behavior || { zoom: d3_1.default.zoom };
                    var svg = d3_1.default.select(this.$element)
                        .append('svg:svg')
                        .attr('width', this.width)
                        .attr('height', this.height)
                        .attr('pointer-events', 'all')
                        .append('svg:g')
                        .call(behavior.zoom().on('zoom', this.redraw.bind(this)))
                        .append('svg:g');
                    svg
                        .append('svg:rect')
                        .attr('width', this.width)
                        .attr('height', this.height)
                        .attr('fill', 'white');
                    return svg;
                };
                return Sierpinski;
            }());
            exports_1("default", Sierpinski);
        }
    };
});
System.register("app", ["sierpinski"], function (exports_2, context_2) {
    "use strict";
    var sierpinski_1, App;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (sierpinski_1_1) {
                sierpinski_1 = sierpinski_1_1;
            }
        ],
        execute: function () {
            App = /** @class */ (function () {
                function App() {
                }
                App.prototype.run = function () {
                    this.setupTriangle(document.querySelector('main div'));
                };
                App.prototype.setupTriangle = function ($element) {
                    if (!$element) {
                        return;
                    }
                    var triangle = new sierpinski_1.default($element);
                    triangle.draw();
                };
                return App;
            }());
            exports_2("App", App);
        }
    };
});
//# sourceMappingURL=app.js.map