import NodeUI from './nodeUI';
import type StageUI from './stageUI';

class GridNodeUI extends NodeUI {
  /**
   * Reference to grid's svg rectangles that represent the grid.
   */
  private rectCells: SVGBRect[][] | null;

  constructor(stage: StageUI, name?: string) {
    super(stage, name);
    this.addSVGGrid();
    this.rectCells = null;
    this.redraw();
  }

  private addSVGGrid(): void {
    const xOffset = 0; // px
    const yOffset = 25; // px
    const height = 30; // px
    const width = 30; // px
    const spacing = 2; // px
    const rows = 3; // count
    const cols = 3; // count

    const rects: SVGBRect[][] = new Array(rows);

    for (let row = 0; row < rows; row++) {
      rects[row] = new Array(cols);

      for (let col = 0; col < cols; col++) {
        const a = this.container.addRect({
          x: xOffset + col * width + spacing * col,
          y: yOffset + row * height + spacing * row,
          height,
          width,
        });
        rects[row][col] = a;
        a.setAttributes({ style: { fill: 'green' } });
      }
    }

    this.rectCells = rects;
  }

  redraw(): void {
    this.container.wipe();
    this.frame = this.container.addRect({
      x: 0, y: 0, width: 200, height: 150, class: 'body',
    });
    const titleBar = this.container.addRect({
      x: 0, y: 0, width: 200, height: 25, class: 'titleBar',
    });
    this.stage.svgb.draggable(titleBar, this.container);
    this.container.addText({ x: 5, y: 20, class: 'titleBarText' }, this.name);
    this.addSVGGrid();
  }

  public inputsReady(x: number, y: number): void {
    console.log(`x is ${x}; y is ${y}`);
    if (x < 0 || x > 3) throw new Error('X is not 0, 1 or 2!');
    if (y < 0 || y > 3) throw new Error('y is not 0, 1 or 2!');
    if (!this.rectCells) return;

    // Reset colors
    for (const row of this.rectCells) {
      for (const col of row) {
        col.setAttributes({ style: { fill: 'green' } });
      }
    }

    this.rectCells[y][x].setAttributes({ style: { fill: 'red' } });
  }
}

export default GridNodeUI;
