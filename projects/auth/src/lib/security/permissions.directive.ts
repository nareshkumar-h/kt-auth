import { Directive, OnInit, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { PermissionsService } from './permissions.service';

@Directive({
  selector: '[ngxPermissionsOnly]'
})
export class NgxPermissionsDirective implements OnInit{

  @Input() ngxPermissionsOnly: string | string[];
  
  constructor(private elementRef: ElementRef, private viewContainer: ViewContainerRef, private permissionService:PermissionsService) { 
    //console.log("constructor:" , this.ngxPermissionsOnly)
  }
  ngOnInit(): void {
    //console.log("Init" , this.ngxPermissionsOnly);
    this.validate();
    //console.log("TypeOf: " , this.ngxPermissionsOnly + ",result=" + typeof this.ngxPermissionsOnly);
  }

  private validate(){
    if(typeof this.ngxPermissionsOnly =='string'){
      this.ngxPermissionsOnly = [this.ngxPermissionsOnly];
    }
    if( !this.permissionService.hasPermission(this.ngxPermissionsOnly)){
      //this.elementRef.nativeElement.style.display = 'none';
      this.elementRef.nativeElement.remove();
    }
  }
}