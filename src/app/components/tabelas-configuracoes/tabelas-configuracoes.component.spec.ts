import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelasConfiguracoesComponent } from './tabelas-configuracoes.component';

describe('TabelasConfiguracoesComponent', () => {
  let component: TabelasConfiguracoesComponent;
  let fixture: ComponentFixture<TabelasConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelasConfiguracoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelasConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
