import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ui';
  view: boolean;
  view1: boolean;
  contentArray:any =[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getList();
  }

  name;
  email;
  contact;
  Date1;
Id;
n

  add() {
    this.view = true;
    this.reset();

  }
  reset() {
    this.name = '',
      this.Date1 = '',
      this.email = '',
      this.contact = ''
  }



  addlist() {
    const data = {
      Name: this.name,
      Dob: this.Date1,
      Email: this.email,
      Contact: this.contact
    }
    console.log(data);
    this.http.post('http://localhost:5000/add', data)
      .subscribe((res: Request) => {
        this.getList();
        $('#exampleModal').modal('hide');
        this.reset();
      }, error => {
        console.log(error);
      });
  }




  edit(item) {
    console.log(item.Dob);
    this.view = false;
    this.name = item.Name;
    this.Date1=item.Dob.toString().slice(0,10);
      console.log( this.Date1);
    this.email=item.Email;
    this.contact=item.Contact;
    this.Id=item.Id
  }

  editlist() {
    const update={
      Name : this.name,
      Date1 : this.Date1,
      Contact : this.contact,
      Email : this.email,
      Id :this.Id
    }
    this.http.post('http://localhost:5000/edit', update)
      .subscribe((res: Request) => {
        this.getList();
        $('#exampleModal').modal('hide');
        this.reset();
      }, error => {
        console.log(error);
      });

  }

  delData(id){
    this.n = id;
  }

  getList() {
    this.http.get('http://localhost:5000')
      .subscribe((res: Response) => {
        console.log(res);
        this.contentArray = res;
        console.log(this.contentArray);
      }, error => {
        console.log(error);
      });
  }


  delete(){

    this.http.post('http://localhost:5000/delete', this.n)
    .subscribe((res: Response) => {
      $('#exampleModal1').modal('hide');
      this.getList();
      
      // this.contentArray = res;
      console.log(this.contentArray);
    }, error => {
      console.log(error);
    });

  }
}
