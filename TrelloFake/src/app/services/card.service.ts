import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "@models/user.model";
import {checkToken} from "@interceptors/token.interceptor";
import {Board} from "@models/board.model";
import {Card, UpdateCardDto} from "@models/Card.model";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  update(id: Card['id'], changes: UpdateCardDto){
    return this.http.put<Card>(`${this.apiUrl}/api/v1/cards/${id}`, changes, {
      context: checkToken()
    })
  }
}
