import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router'; // 路由传参用到
import { Passwordcg } from './passwordcg';
import { ChangepwdService } from './changepwd.service';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss']
})
export class ChangepwdComponent implements OnInit {

  passwordcg = new Passwordcg();

  constructor(
    private http: HttpClient,
    private router: Router,
    private changepwdService: ChangepwdService
    ) {}

    submitNewPW() {
      this.changepwdService.updatepw(this.passwordcg).subscribe(
        res => {
          if (res.data.msg === 200) {
            alert(res.data.msg);
            this.goTologinpage(res.data.msg);
          } else {
            alert(res.data.msg);
          }
        }, // success path
        error => alert(error) // error path
      );
  }

  goTologinpage(retrunMsg: string) {
    alert(retrunMsg);
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.passwordcg.username = localStorage.getItem('currUserName');
  }

}
