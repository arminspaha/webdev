import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';

interface Url {
  id: number;
  name: string;
  url: string;
  description?: string;
  date: Date;
}

@Injectable()
export class ItemListService {
  private length: number;
  private url: Url;
  returnBrokenUrls = new Subject();
  showBrokenUrls = new Subject();

  constructor(protected localStorage: LocalStorage) {}

  getUrls(brokenUrl: boolean) {
    return this.localStorage.getItem('urls').pipe(
      map((response: any) => {
        if (brokenUrl) {
          const tempBrokenUrl: {
            id: number;
            name: string;
            url: string;
            description: string;
            date: Date;
          }[] = [];
          response.forEach(element => {
            if (!this.isValidURL(element.url)) {
              tempBrokenUrl.push(element);
            }
          });
          return tempBrokenUrl;
        } else {
          return response;
        }
      })
    );
  }

  isValidURL(string: string) {
    const res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res == null) {
      return false;
    } else {
      return true;
    }
  }

  updateUrlDate(id: number) {
    return this.localStorage.getItem('urls').pipe(
      map((response: any) => {
        const url = response.find(elem => elem.id === id);
        if (url) {
          url.date = new Date();
          this.localStorage.setItem('urls', response).subscribe(() => {});
          return response;
        }
      })
    );
  }

  removeElement(id: number) {
    return this.localStorage.getItem('urls').pipe(
      map((response: any) => {
        const url = response.find(elem => elem.id === id);
        if (url) {
          response.splice(response.indexOf(url), 1);
          this.localStorage.setItem('urls', response).subscribe(() => {});
          return response;
        }
      })
    );
  }

  submit(form: NgForm) {
    return this.localStorage.getItem('urls').pipe(
      map((response: any) => {
        if (response) {
          this.length = response.length;
        } else {
          this.length = 0;
        }
        this.url = {
          id: this.length,
          name: form.value.name,
          url: form.value.url,
          description: form.value.description,
          date: new Date()
        };
        response.push(this.url);
        this.localStorage.setItem('urls', response).subscribe(() => {});
        return response;
      })
    );
  }
}
