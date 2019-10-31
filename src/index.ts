/* *
 * Created by render on 2019/10/30
 * */
import {elInfo} from "../types";

const canvas: HTMLCanvasElement = document.createElement('canvas');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

function px2number(px: string): number {
  return +(px.replace('px', ''))
}

function getElInfo(el: HTMLElement): elInfo {
  const style: CSSStyleDeclaration = window.getComputedStyle(el, null);
  const font: string = style.font;
  const fontSize: number = px2number(style.fontSize);

  return {
    font,
    fontSize,
  }
}

function sliceText(text: string, length: number): string {
  return '...' + text.slice(-length);
}

function isNode(obj: any): boolean {
  return window &&
    obj &&
    ('nodeType' in obj) &&
    (obj.nodeType === 1 || obj.nodeType === 9);
}

export function calculateText(input: string, maxWidth: number, el: HTMLElement): string {
  if (typeof input !== 'string' || typeof maxWidth !== 'number' || !isNode(el)) {
    throw new TypeError('Arguments type error');
  }

  const {font, fontSize} = getElInfo(el);

  ctx.font = font;
  if (ctx.measureText(input).width <= maxWidth) return input;

  let guess: number = Math.ceil(maxWidth / fontSize) - 2;
  let text: string = sliceText(input, guess);

  while (ctx.measureText(text).width < maxWidth) {
    guess++;
    text = sliceText(input, guess);
  }

  while (ctx.measureText(text).width > maxWidth) {
    guess--;
    text = sliceText(input, guess);
  }

  return text
}
