import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, async } from 'rxjs';
import { Product } from '../../../core/Models/Products';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  imagePreview: { [key: string]: string } = {
    img1: '',
    image_thumbnail: '',
    img2: ''
  };
  imageFiles: { [key: string]: File } = {};

  categories: { value: string, viewValue: string }[] = [
    { value: 'electronics', viewValue: 'Electronics' },
    { value: 'jewelry', viewValue: 'Jewelry' },
    { value: 'mensclothing', viewValue: "Men's Clothing" },
    { value: 'womensclothing', viewValue: "Women's Clothing" }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProductComponent>,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      brand: ['', Validators.required],
      size: ['', Validators.required],
      description: ['', Validators.required],
      colors: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      likes: [0],
      date_added: [new Date()],
      quantity: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any, imageType: string) {
    const file = event.target.files[0];
    if (file) {
      this.imageFiles[imageType] = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview[imageType] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async uploadImages(): Promise<{[key: string]: string}> {
    const uploadPromises: Promise<string>[] = [];
    const imageUrls: {[key: string]: string} = {};

    for (const [key, file] of Object.entries(this.imageFiles)) {
      const path = `products/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(path);
      const task = this.storage.upload(path, file);

      const promise = new Promise<string>((resolve) => {
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url: string) => {
              imageUrls[key] = url;
              resolve(url);
            });          })
        ).subscribe();
      });

      uploadPromises.push(promise);
    }

    await Promise.all(uploadPromises);
    console.log('Image URLs:', imageUrls);
    return imageUrls;
  }

  async onSubmit() {
    if (this.productForm.valid) {
      try {
        const imageUrls = await this.uploadImages();
        
        const productData: Product = {
          ...this.productForm.value,
          colors: this.productForm.value.colors.split(',').map((color: string) => color.trim()),
          images: {
            img1: imageUrls['img1'] || '',
            image_thumbnail: imageUrls['image_thumbnail'] || '',
            img2: imageUrls['img2'] || ''
          }
        };
        console.log('Product Data:', productData);

        this.dialogRef.close(productData);
        this.snackBar.open('Product created successfully', 'Close', {
          duration: 3000
        });
      } catch (error) {
        this.snackBar.open('Error creating product', 'Close', {
          duration: 3000
        });
      }
    }
  }
}

