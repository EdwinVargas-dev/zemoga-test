import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  votes: any = [
    { 'name': 'Kanye West', 'keyForm':'voteKanye','key':'kanye', 'image': '../../assets/images/kanye-west.png', 'category': 'Entertainment', 'numVotes': 0, 'goodPerc': 50, 'badPerc': 50, 'validVote': false },
    { 'name': 'Mark Zuckerberg', 'keyForm':'voteMark','key':'mark','image': '../../assets/images/mark-zuckerberg.png', 'category': 'Business', 'numVotes': 0, 'goodPerc': 50, 'badPerc': 50, 'validVote': false },
    { 'name': 'Cristina Fernández de Kirchner', 'keyForm':'voteCristina','key':'cristina','image': '../../assets/images/cristina.png', 'category': 'Politics', 'numVotes': 0, 'goodPerc': 50, 'badPerc': 50, 'validVote': false },
    { 'name': 'Malala Yousafzai', 'keyForm':'voteMalala','key':'malala', 'image': '../../assets/images/malala.png', 'category': 'Entertainment', 'numVotes': 0, 'goodPerc': 50, 'badPerc': 50, 'validVote': false }
  ]
  percentValue = { 'good': 50, 'bad': 50 }

  form = new FormGroup({
    voteKanye: new FormControl(0),
    voteMark: new FormControl(0),
    voteCristina: new FormControl(0),
    voteMalala: new FormControl(0),
  });

  currentUserData:any
  votesData:any

  constructor(private db: AngularFirestore, private router:Router, private formsModule: FormsModule, private auth:AngularFireAuth) {}

  ngOnInit(): void {
    console.log('inicializo el componente')
    var emailCurrent = localStorage.getItem('email')
    console.log(emailCurrent)
    if(emailCurrent != null){
      this.db.collection('users').doc(atob(emailCurrent)).get().subscribe(dataUser => {
        this.currentUserData = dataUser.data()
        this.db.collection('votes').doc('votes').get().subscribe(dataVotes => {
          this.votesData = dataVotes.data()
        })
      })
    }
  }

  addVote(item: any, vote: any) {
    for (let index = 0; index < this.votes.length; index++) {
      const element = this.votes[index];
      if(item.key === element.key){
        this.votes[index].numVotes += vote;
        this.votes[index].validVote = true;
        var result = this.calculatePercentage(this.votes[index].numVotes, vote)
        this.votes[index].goodPerc = result.good;
        this.votes[index].badPerc = result.bad;
      }
    }
  }

  calculatePercentage(sumVotes: number, currentVote: number) {
    this.percentValue.good += currentVote; this.percentValue.bad -= currentVote
    return this.percentValue
  }

  logout(){
    this.auth.signOut().then(()=>{
      this.router.navigate([''])
      this.currentUserData=null
      this.votesData=null
    })
  }

}
