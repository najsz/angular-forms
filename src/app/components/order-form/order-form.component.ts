import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionary } from 'src/app/models/dictionary.model';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFormComponent implements OnInit {
  @Input() categories!: Dictionary[];
  @Input() initialValue!: Partial<Order>;
  @Output() formChange = new EventEmitter<FormGroup>();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      product: this.formBuilder.group({
        name: ['', Validators.required],
        categoryId: [0, Validators.required],
        price: [0, Validators.required]
      }),
      user: this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required],
      })
    });

    this.form.valueChanges.subscribe(result => {
      this.formChange.emit(this.form);
    });

    this.form.patchValue({
      product: {
        name: this.initialValue.name || null,
        categoryId: this.initialValue.categoryId || null,
        price: this.initialValue.price || null
      },
      user: {
        firstname: this.initialValue.firstname || null,
        lastname: this.initialValue.lastname || null,
        email: this.initialValue.email || null
      }
    });
  }
}
