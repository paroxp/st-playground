import d3, { BaseType, Selection } from 'd3';

export default class Sierpinski {
  private height: number;
  private side: number;
  private width: number;

  private _deep = 6;
  private _sin30 = Math.pow(3, 1 / 2) / 2;
  private _cos30 = .5;

  private _zoom = 0;

  private svg: Selection<BaseType, {}, null, undefined>;

  constructor(private $element: HTMLElement) {
    this.height = $element.offsetHeight;
    this.width = $element.offsetWidth;
    this.side = Math.min(this.height, this.width);

    this.svg = this.setupSVG();
  }

  public draw(): void {
    this.drawTriangle(this.width / 2, this.height * 2 / 3, this.side * 2 / 3);
  }

  private drawTriangle(centerX: number, centerY: number, radius: number, i: number = 0): void {
    const cal1 = `${centerX},${centerY - radius}`;
    const cal2 = `${centerX - radius * this._sin30},${centerY + radius * this._cos30}`;
    const cal3 = `${centerX + radius * this._sin30},${centerY + radius * this._cos30}`;

    this.svg.append('polygon')
      .attr('zoom', this._zoom)
      .attr('fill', i < this._deep ? 'white' : 'black')
      .attr('points', `${cal1} ${cal2} ${cal3}`);

    if (i < this._deep) {
      this.drawTriangle(centerX, centerY - radius / 2, radius / 2, i + 1);
      this.drawTriangle(centerX - radius * this._sin30 / 2,	centerY + radius * this._cos30 / 2, radius / 2, i + 1);
      this.drawTriangle(centerX + radius * this._sin30 / 2,	centerY + radius * this._cos30 / 2, radius / 2, i + 1);
    }
  }

  private redraw(): void {
    this.svg.attr('transform', d3.event.transform.toString());
  }

  private setupSVG(): Selection<BaseType, {}, null, undefined> {
    // Sometimes we have to do, what we have to do... :D
    const hackedD3 = d3 as any;
    const behavior = hackedD3.behavior || {zoom: d3.zoom};

    const svg = d3.select(this.$element)
      .append('svg:svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('pointer-events', 'all')

      .append('svg:g')
      .call(behavior.zoom().on('zoom', this.redraw.bind(this)) as any)

      .append('svg:g');

    svg
      .append('svg:rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', 'white');

    return svg;
  }
}
