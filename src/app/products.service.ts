import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  collectionName: string = 'products'


  constructor(private firestore: Firestore) { }

  getproducts(): Promise<any[]> {
    const colRef = collection(this.firestore, this.collectionName);
    return getDocs(colRef).then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data());
    });
  }

  deleteDocument(documentId: any): Promise<void> {
    const docRef = doc(this.firestore, `products/${documentId}`);
    return deleteDoc(docRef);
  }

  addProduct(product: any, docId: any): Promise<void> {
    const productDoc = doc(this.firestore, `${this.collectionName}/${docId}`)
    return setDoc(productDoc, product);
  }
  editProduct(id:any, product:any):Promise<void>{
    const productDocUpdate = doc(this.firestore, `${this.collectionName}/${id}`)
    return updateDoc(productDocUpdate, product);
  }

}