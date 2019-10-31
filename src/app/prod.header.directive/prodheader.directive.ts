import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appProdheader]'
})
export class ProdheaderDirective {

  constructor(private element: ElementRef) {

    element.nativeElement.style.textDecoration="underline";
    element.nativeElement.style.cursor="pointer";
    element.nativeElement.style.color="blue";
   }

}
