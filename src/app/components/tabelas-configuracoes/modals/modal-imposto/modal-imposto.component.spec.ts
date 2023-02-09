import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImpostoComponent } from './modal-imposto.component';

describe('ModalImpostoComponent', () => {
  let component: ModalImpostoComponent;
  let fixture: ComponentFixture<ModalImpostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImpostoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalImpostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
