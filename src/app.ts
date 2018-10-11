//our root app component
import {Component, NgModule, OnInit} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {HttpModule, Http, Headers, RequestOptions, Response} from '@angular/http'

import 'rxjs/Rx';

@Component({
  selector: 'my-app',
  template: `
    <div>
      Response: 
      <pre>
      {{response | json}}
      </pre>
    </div>
  `,
})
export class App implements OnInit{
  response: any[];
  constructor(public http: Http) {
  }
  
  ngOnInit() {
      this.postRquest().then(results => this.response = results);
  }
  
  postRquest(body) {
    let headers = new Headers ({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers }); 
    if (body == null)
    {   

        let urlSearchParams = new URLSearchParams(); 
        urlSearchParams.append('title', 'hi'); 
        urlSearchParams.append('search', 'person'); 
        urlSearchParams.append('userId', 1); 
        let body = urlSearchParams.toString();
    }   
   

    return this.http.post('https://jsonplaceholder.typicode.com/posts', body, options)
        .toPromise()
        .then((response) => return response.json())
        .catch(error => {
          console.log( error );
        });
  }
  
}

@NgModule({
  imports: [ BrowserModule, HttpModule ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {}