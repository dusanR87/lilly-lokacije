import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest, HttpContext,  } from "@angular/common/http";
import {Observable} from "rxjs";
import { TestInterceptor } from "./test.interceptor";
import { BYPASS_LOG } from "./test.interceptor";

@Injectable({
    providedIn: 'root'
})


export class testService {
    private baseUrl1: string = 'https://auth.clickandbasket.com/auth/guestToken'
    private baseUrl2: string = 'https://api.test.clickandbasket.com/user/promotions'

    constructor(public http: HttpClient) {
    }

    getAuthToken(): Observable<any> {
        return this.http.post(`${this.baseUrl1}`,{},{headers : new HttpHeaders({ 'Content-Type': 'application/json' }),context: new HttpContext().set(BYPASS_LOG, true)})
    }

    getPromotions(): Observable<any> {
        return this.http.get(`${this.baseUrl2}`)
    }

    getPromotionsWithAuthorization(token:string): Observable<any> {
        return this.http.get(`${this.baseUrl2}`,{headers : new HttpHeaders({ 'guesttoken':'true',Authorization: `Bearer ${token}`,'Content-Type': 'application/json' }),context: new HttpContext().set(BYPASS_LOG, true)})
    }
}