/* *
 * Created by render on 2019/10/30
 * */
export interface elInfo {
  font: string;
  fontSize: number;
}

interface getFont {
  (el: HTMLElement): fontInfo
}

interface sliceText {
  (text: string, length: number): string
}

interface calculateText {
  (input: string, maxWidth: number, targetEl: HTMLElement): string
}
