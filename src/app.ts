import Sierpinski from './sierpinski';

export class App {
  public run() {
    this.setupTriangle(document.querySelector('main div'));
  }

  private setupTriangle($element: HTMLElement | null): void {
    if (!$element) {
      return;
    }

    const triangle = new Sierpinski($element);

    triangle.draw();
  }
}
