import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Label } from 'src/app/models/label';
import { Option } from 'src/app/models/option';
import { LabelProperties } from 'src/app/models/label-properties';
import { LabelsFilter } from 'src/app/models/labels-filter';
import { AddLabelResponse } from 'src/app/models/requests/label/add-label.response';
import { RequestResponse } from 'src/app/models/requests/request-response';
import { MainService } from '../main/main.service';

const HEADERS = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private readonly LABEL_API = '/api/labels';

  hierarchyOptions!: Option[];

  constructor( private http: HttpClient,
               private mainService: MainService ) { }


  addLabel( label: Label ): Observable<RequestResponse> {
    return this.http.post<AddLabelResponse>( 
      this.LABEL_API + '/add/' + this.mainService.currentLanguages.languageTo.id,
      {
        labelName: label.labelName,
        colorCode: label.colorCode.replace('#', ''),
        parentLabelId: label.directParentLabelId
      },
      {headers: HEADERS} 
      ).pipe(
        map( data => {
          return {
            result: data.result,
            errors: data.errors 
          };
        }),
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  deleteLabel( label: LabelProperties, option: number ): Observable<RequestResponse> {
    const requestParams = new HttpParams().append( "option", option );

    return this.http.get<RequestResponse>( 
      this.LABEL_API + '/delete/' + label.labelId, 
      {
         params: requestParams, 
         headers: HEADERS 
      })
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  editLabel( label: Label ): Observable<RequestResponse> {
    return this.http.post<RequestResponse>( 
      this.LABEL_API + '/edit/' + label.labelId,
      {
        labelName: label.labelName,
        colorCode: label.colorCode,
        parentLabelId: label.directParentLabelId
      },
      {headers: HEADERS}
      ).pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  getLabelHierarchyOptions(): Observable<Option[]> {
    return this.http.get<{options: Option[]}>(
      this.LABEL_API + '/filters/place-in-hierarchy',
      { headers: HEADERS }
    ).pipe(
      map( data => {
        this.hierarchyOptions = data.options;

        return data.options 
      }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }
  
  getLabelsList( filter?: LabelsFilter, limit?:number, offset?: number ): Observable<Label[]> {
    return this.http.post<{results: Label[]}>(
      this.LABEL_API + '/list',
      {
        limit,            //default value 50
        offset,           // default value 0
        filters: {
          languageFromId: this.mainService.currentLanguages.languageFrom.id,
          languageToId: this.mainService.currentLanguages.languageTo.id,
          labelNamePrefix: filter?.labelNamePrefix,
          parentNamePrefix: filter?.parentNamePrefix,
          placeInHierarchy: filter?.placeInHierarchy
        }
      },
      { headers: HEADERS } )
      .pipe(
        map( data => data.results ),
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }
}
