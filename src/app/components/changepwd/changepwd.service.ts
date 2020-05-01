import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GlobalService } from '../../service/global.service';
import { HandleErrorService } from '../../service/handleError.service';
import { HeaderService } from '../../service/header.service';
import { catchError, retry } from 'rxjs/operators';
import { Passwordcg } from './passwordcg';
import { LocalURL } from '../../config/global-config';

@Injectable({
    providedIn: 'root'
})
export class ChangepwdService {

    constructor(
        private http: HttpClient,
        public globalService: GlobalService,
        public handleErrorService: HandleErrorService,
        public headerService: HeaderService
    ) { }

    readonly pwdURL = LocalURL.serverURL + 'smcuser/settings';

    // Observable<any> 定义返回类型
    public updatepw(pwdForm: Passwordcg): Observable<any> {
        console.log('updatepw() done!');
        console.log('pwdUrl', this.pwdURL);
        console.log('pwdForm', pwdForm);
        return this.http.post<any>(this.pwdURL, pwdForm, this.headerService.httpOptions)
            .pipe(
                retry(1), // retry a failed request up to 1 times
                catchError(this.handleErrorService.handleError)
            );
    }

}
