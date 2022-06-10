import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

import { Add } from "src/app/models/add";
import { AdsService } from "src/app/services/ads.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  exists = false;
  submitted = false;
  add: Add;

  linkReg =
    "(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)";
  fileName;
  places = [1, 2, 3, 4];
  default = 1;
  formData: Add;
  file: File;

  form = this.fb.group({
    title: ["", Validators.required],
    text: ["", Validators.required],
    url: ["", [Validators.required, Validators.pattern(this.linkReg)]],
    // imageUrl: [null, [Validators.required, Validators.pattern(this.linkReg)]],
    order: ["", Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private adsService: AdsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.adsService.currentForm.subscribe(form => {
      this.formData = form;
      if (this.formData) {
        this.form.controls["title"].setValue(this.formData.title);
        this.form.controls["text"].setValue(this.formData.text);
        this.form.controls["url"].setValue(this.formData.url);
        // this.form.controls["imageUrl"].setValue(this.formData.imageUrl);
        this.form.controls["order"].setValue(this.formData.order + 1);
        this.fileName = this.formData.imageUrl
          ? this.formData.imageUrl.replace(/^.*[\\\/]/, "")
          : this.formData.imageUrl;
      }
    });
  }

  get nameControl() {
    return this.form.get("title") as FormControl;
  }

  get textControl() {
    return this.form.get("text") as FormControl;
  }

  get linkControl() {
    return this.form.get("url") as FormControl;
  }

  get imageControl() {
    return this.form.get("imageUrl") as FormControl;
  }

  get placeControl() {
    return this.form.get("order") as FormControl;
  }

  openFileBrowser(event) {
    event.preventDefault();
    const inp: HTMLElement = document.getElementById(
      "imageBrowser"
    ) as HTMLElement;
    const input = <HTMLInputElement>document.getElementById("imageBrowser");
    input.addEventListener("change", () => {
      const title = input.value.split(/\\|\//).pop();
      const truncated =
        title.length > 20 ? title.substr(title.length - 20) : title;

      this.fileName = truncated;
    });
    inp.click();
  }

  imageChange(event) {
    this.file = event.target.files[0];
  }

  createAdd(form: FormGroup) {
    this.submitted = true;
    const { value, valid } = form;

    const add = {
      title: form.value.title,
      order: form.value.order - 1,
      text: form.value.text,
      url: form.value.url
    };

    if (valid) {
      if (this.formData !== null) {
        const addUpdate: Add = {
          ...add,
          imageUrl: this.formData.imageUrl,
          _id: this.formData._id
        };
        if (this.file) {
          addUpdate.file = this.file;
        }

        this.adsService.updateAdd(addUpdate, addUpdate._id).subscribe(
          data => {
            this.reset();
            this.adsService.changeForm(null);
          },
          error => {
            console.log(error);
            if (error.status === 401) {
              this.authService.logoutAndRedirect();
            }
          }
        );
      }
      if (this.formData === null) {
        this.adsService.newAdd(add, this.file).subscribe(
          data => {
            this.reset();
          },
          error => {
            console.log(error);
            if (error.status === 401) {
              this.authService.logoutAndRedirect();
            }
          }
        );
      }
    }
  }

  private reset() {
    this.form.reset();
    this.adsService.changeAdd(true);
    this.submitted = false;
    this.file = null;
    this.fileName = null;
  }
}
