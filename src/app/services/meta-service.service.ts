import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Meta } from '../models/Metas/meta';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {
  constructor(private firestore: Firestore) { }
  getMetas(): Observable<Meta[]> {
    const metasRef = collection(this.firestore, 'metas');
    return collectionData(metasRef, { idField: 'id' }) as Observable<Meta[]>;
  }

  addMeta(metaText: string) {
    const metasRef = collection(this.firestore, 'metas');
    return addDoc(metasRef, { meta: metaText });
  }

  deleteMeta(metaId: string) {
    const metaDocRef = doc(this.firestore, `metas/${metaId}`);
    return deleteDoc(metaDocRef);
  }
}
