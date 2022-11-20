import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaTareaComponent } from './crea-tarea.component';

describe('CreaTareaComponent', () => {
  let component: CreaTareaComponent;
  let fixture: ComponentFixture<CreaTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreaTareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
