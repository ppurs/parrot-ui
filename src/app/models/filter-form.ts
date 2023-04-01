import { Directive, EventEmitter, Output } from "@angular/core";

@Directive()
export abstract class FilterForm {
    @Output() closeFilterTile = new EventEmitter(); 
    
    onEnterSubmit(): void {
        this.closeFilterTile.emit();
        this.onSubmit();
    }

    abstract onSubmit(): void;
}