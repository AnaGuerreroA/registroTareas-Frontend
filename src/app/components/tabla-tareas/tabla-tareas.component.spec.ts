import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTareasComponent } from './tabla-tareas.component';

describe('TablaTareasComponent', () => {
  let component: TablaTareasComponent;
  let fixture: ComponentFixture<TablaTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaTareasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
