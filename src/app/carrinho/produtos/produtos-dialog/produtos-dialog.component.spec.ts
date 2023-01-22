import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosDialogComponent } from './produtos-dialog.component';

describe('ProdutosDialogComponent', () => {
  let component: ProdutosDialogComponent;
  let fixture: ComponentFixture<ProdutosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
