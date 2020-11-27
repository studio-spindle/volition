import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BacklogComponent} from './backlog.component';
import {BacklogService} from '../../backlog.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

describe('BacklogComponent', () => {
  let component: BacklogComponent;
  let fixture: ComponentFixture<BacklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogComponent],
      providers: [BacklogService, HttpClient, HttpHandler, FormBuilder],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
