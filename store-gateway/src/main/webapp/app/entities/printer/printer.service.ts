import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Printer } from './printer.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Printer>;

@Injectable()
export class PrinterService {

    private resourceUrl =  SERVER_API_URL + 'cashdesk/api/printers';

    constructor(private http: HttpClient) { }

    create(printer: Printer): Observable<EntityResponseType> {
        const copy = this.convert(printer);
        return this.http.post<Printer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(printer: Printer): Observable<EntityResponseType> {
        const copy = this.convert(printer);
        return this.http.put<Printer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Printer>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Printer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Printer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Printer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Printer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Printer[]>): HttpResponse<Printer[]> {
        const jsonResponse: Printer[] = res.body;
        const body: Printer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Printer.
     */
    private convertItemFromServer(printer: Printer): Printer {
        const copy: Printer = Object.assign({}, printer);
        return copy;
    }

    /**
     * Convert a Printer to a JSON which can be sent to the server.
     */
    private convert(printer: Printer): Printer {
        const copy: Printer = Object.assign({}, printer);
        return copy;
    }
}
