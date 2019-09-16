/* *
 * Created by render on 2019/9/16
 * */
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

function getStyle(el) {
  const style = window.getComputedStyle(el, null);
  return {
    font: style.getPropertyValue('font'),
    fontSize: +(style.getPropertyValue('font-size').replace('px', '')),
  }
}

function getText(input, maxWidth, targetEl) {
  const {font, fontSize} = getStyle(targetEl);
  ctx.font = font;
  if (ctx.measureText(input).width <= maxWidth) return input;

  function sliceText(length) {
    return `...${input.slice(-length)}`;
  }

  let guessLength = Math.ceil(maxWidth / fontSize) - 2;
  let showText = sliceText(guessLength);
  while (ctx.measureText(showText).width < maxWidth) {
    guessLength ++;
    showText = sliceText(guessLength);
  }
  while (ctx.measureText(showText).width > maxWidth) {
    guessLength --;
    showText = sliceText(guessLength);
  }
  return showText;
}
