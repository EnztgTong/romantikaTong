import { Component} from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public nav: NavController) { }

  ngOnInit() {
    this.readMessage()
  }

  messagelist = []
  readMessage(){
    firebase.database().ref('Branch/'+firebase.auth().currentUser.uid+'/BranchLog/').on('value',data=>{
      let arr  = []
      this.messagelist = []
      arr = data.val()
      for (let key in arr) {
        let obj = arr[key]
        this.messagelist.push(obj)
      }
      this.messagelist.sort((a, b) => (new Date(a.ETA).getTime() < (new Date(b.ETA).getTime()) ? 1 : -1));
    })
    console.log(this.messagelist)
  }
}
