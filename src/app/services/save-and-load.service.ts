import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { dayValues, quotaTopic } from '../components/week-table/week-table.model';
import { IpcService } from './ipc.service';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY6Zk0KJIYPYDqQTiMFZl5BEBot6PcwF0",
  authDomain: "test-fb5ea.firebaseapp.com",
  projectId: "test-fb5ea",
  storageBucket: "test-fb5ea.appspot.com",
  messagingSenderId: "1091158319615",
  appId: "1:1091158319615:web:c5fc651b1acd7e18c3c7ca",
  measurementId: "G-3TTD2PDLZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class SaveAndLoadService {

  readonly BACKEND_API_URL = 'https://dull-erin-quail-toga.cyclic.app'
  readonly BACKEND_API_FILE_NAME = 'myFile.txt'
  public loadFromExternal$ = new Subject<quotaTopic[]>();
  public dataSaved$ = new Subject<quotaTopic[]>();


  loadFromExternal() {
    
    // this.loadFromExternal$.next([{ name: 'test', daysValues: [1, 1, 0, 0, 0, 0, 1], icon: 'spa', quota: 3 }]);

    this.ipcService.loadEvent.subscribe((topics) => {
      this.loadFromExternal$.next(<quotaTopic[]>topics);});

    this.ipcService.send('load', {});
  }

  constructor(private cookieService: CookieService, private ipcService: IpcService, private http: HttpClient) {
    try {
      console.log("Document written successfully!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }

  async getQuotasFromApi() {
    try {
      // Make the HTTP GET request
      // const result = await this.http.get<quotaTopic[]>(this.BACKEND_API_URL + "/" + this.BACKEND_API_FILE_NAME).toPromise();
      
      // Reference a document in the "users" collection, document ID is "user123"
      const userRef = doc(db, "users", "user123");
      console.log('userRef', userRef);
      // Set the document data (write it to Firestore)

      const quotas : quotaTopic[] = [];

      quotas.push({ name: 'Cooked Meals', daysValues: this.zeroValWeek(), icon: 'no_food', quota: 8, },
        { name: 'Vegetarian Meals', daysValues: this.zeroValWeek(), icon: 'spa', quota: 3 },
        { name: 'Exercise', daysValues: this.zeroValWeek(), icon: 'fitness_center', quota: 4 },
        { name: 'Social', daysValues: this.zeroValWeek(), icon: 'people', quota: 4 },
        { name: 'Help', daysValues: this.zeroValWeek(), icon: 'support', quota: 1 },
        { name: 'Self-Development', daysValues: this.zeroValWeek(), icon: 'handyman', quota: 1.5 },
        { name: 'New Thing', daysValues: this.zeroValWeek(), icon: 'new_releases', quota: 1.5 },
        { name: 'House Maintainance', daysValues: this.zeroValWeek(), icon: 'home', quota: 3 },
        { name: 'Hobby Session', daysValues: this.zeroValWeek(), icon: 'brush', quota: 5 },
        { name: 'Meditate', daysValues: this.zeroValWeek(), icon: 'airline_seat_recline_extra', quota: 5 }
      )

      await setDoc(userRef, {
        data: quotas
      });

      // Fetch the document
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined if no document exists
        console.log("No such document!");
      }

      return docSnap.data();
    } catch (error) {
      // Handle the error here
      console.error('Error fetching data:', error);
      throw error; // You can choose to rethrow the error or handle it as needed
    }
  }

  async setQuotasFromApi(quotas: quotaTopic[]) {
    try {

      
      // Make the HTTP SET request
      console.log("Saving with...", quotas);
      await this.http.put(this.BACKEND_API_URL + "/" + this.BACKEND_API_FILE_NAME, quotas, {responseType: "text"}).toPromise();
      
    } catch (error) {
      // Handle the error here
      console.error('Error setting data:', error);
      throw error; // You can choose to rethrow the error or handle it as needed
    }
  }
  
  loadDataCookies(): quotaTopic[] {

    if (this.cookieService.get('dataNames')) {
      try {
        const dataNames : string[]= JSON.parse(this.cookieService.get('dataNames'));
        const arrayOfLoaded:quotaTopic[] = [];
        
        dataNames.forEach((element) => {
          if (this.cookieService.get('data-' + element)){
            const item = JSON.parse(this.cookieService.get('data-' + element))
            arrayOfLoaded.push(item);
          }
        })
        return arrayOfLoaded;
      } catch (e) {
       return this.loadDefaultQuotas();
      }

    } else {
      return this.loadDefaultQuotas();
    }

  }

  zeroVal(): dayValues{
    return {completed: 0, planned: 0};
  }

  zeroValWeek(): dayValues[] {
    return [this.zeroVal(),this.zeroVal(),this.zeroVal(),this.zeroVal(),this.zeroVal(),this.zeroVal(),this.zeroVal()];
  }
  
  loadDefaultQuotas() : quotaTopic[] {
    const quotas : quotaTopic[] = [];

    quotas.push({ name: 'Cooked Meals', daysValues: this.zeroValWeek(), icon: 'no_food', quota: 8, },
      { name: 'Vegetarian Meals', daysValues: this.zeroValWeek(), icon: 'spa', quota: 3 },
      { name: 'Exercise', daysValues: this.zeroValWeek(), icon: 'fitness_center', quota: 4 },
      { name: 'Social', daysValues: this.zeroValWeek(), icon: 'people', quota: 4 },
      { name: 'Help', daysValues: this.zeroValWeek(), icon: 'support', quota: 1 },
      { name: 'Self-Development', daysValues: this.zeroValWeek(), icon: 'handyman', quota: 1.5 },
      { name: 'New Thing', daysValues: this.zeroValWeek(), icon: 'new_releases', quota: 1.5 },
      { name: 'House Maintainance', daysValues: this.zeroValWeek(), icon: 'home', quota: 3 },
      { name: 'Hobby Session', daysValues: this.zeroValWeek(), icon: 'brush', quota: 5 },
      { name: 'Meditate', daysValues: this.zeroValWeek(), icon: 'airline_seat_recline_extra', quota: 5 }
    )
    return quotas;
  }

  
  async saveData(quotaData : quotaTopic[]) {
    // save To Backend Api
    await this.setQuotasFromApi(quotaData);

    // save to cookies
    var date = new Date();
    // add a long expiry - year
    date.setDate(date.getDate() + 365);
    const dataNames = quotaData.map((element) => {return element.name});

    quotaData.forEach(element => {
      this.cookieService.set('data-' + element.name, JSON.stringify(element), date, undefined, undefined, false, "Lax");
    });

    this.cookieService.set('dataNames', JSON.stringify(dataNames), date, undefined, undefined, false, "Lax");
    
    // save using Electron files
    this.ipcService.send('save', JSON.stringify(quotaData));

    this.dataSaved$.next(quotaData);
  }

}
