import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

 collectionName: string = 'customers'
 
   
   constructor(private firestore: Firestore) { }
 
   getcustomers(): Promise<any[]> {
     const colRef = collection(this.firestore, this.collectionName);
     return getDocs(colRef).then((querySnapshot) => {
       return querySnapshot.docs.map((doc) => doc.data());
     });
   }
 
   deleteDocument(documentId: any): Promise<void> {
     const docRef = doc(this.firestore, `customers/${documentId}`);
     return deleteDoc(docRef);
   }
 
   addcustomer(customer: any , docId : any ): Promise<void> {
     const customersDoc = doc(this.firestore, `${this.collectionName}/${docId}`)
     return setDoc(customersDoc, customer);
   }

   editProduct(id:any, customer:any):Promise<void>{
       const customerDocUpdate = doc(this.firestore, `${this.collectionName}/${id}`)
       return updateDoc(customerDocUpdate, customer);
     }

}
