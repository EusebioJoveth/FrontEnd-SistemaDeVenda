import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialVendaComponent } from './historial-venda.component';

describe('HistorialVendaComponent', () => {
  let component: HistorialVendaComponent;
  let fixture: ComponentFixture<HistorialVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialVendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
