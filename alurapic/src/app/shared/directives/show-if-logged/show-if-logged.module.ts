import { NgModule } from '@angular/core';
import { ShowIfLoogedDirective } from './show-if-logged.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ShowIfLoogedDirective],
    exports: [ShowIfLoogedDirective],
    imports: [CommonModule]
})
export class ShowIfLoggedModule{

}