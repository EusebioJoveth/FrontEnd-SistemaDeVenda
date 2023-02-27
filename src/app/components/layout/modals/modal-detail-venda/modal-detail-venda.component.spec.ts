import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailVendaComponent } from './modal-detail-venda.component';

describe('ModalDetailVendaComponent', () => {
  let component: ModalDetailVendaComponent;
  let fixture: ComponentFixture<ModalDetailVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailVendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetailVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
