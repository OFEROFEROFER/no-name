import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PersistentService {

    
   readonly persistent = signal<PersistentModel>({search:{input:'',page:1}});
  
  constructor() {
    console.log('new')
   }

  getValue(): PersistentModel{
    return this.persistent()
  }

  setValue(searchData:OriginalType){  
    this.persistent.set({search:searchData})
  }
}


export interface PersistentModel{
  search:OriginalType
}

export type OriginalType = Partial<{
  input: any;
  genre: any;
  page: any;
}>;