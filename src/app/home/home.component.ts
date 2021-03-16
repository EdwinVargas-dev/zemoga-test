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
    { 'name': 'Kanye West', 'keyForm': 'voteKanye', 'key': 'kanye', 'image': '../../assets/images/kanye-west.png', 'category': 'Entertainment', 'numVotes': 0, 'goodPerc': 50, 'badPerc': 50, 'validVote': false },
    { 'name': 'Mark Zuckerberg', 'keyForm': 'voteMark', 'key': 'mark', 'image': '../../assets/images/mark-zuckerberg.png', 'category': 'Business', 'numVotes': 0, 'goodPerc': 50, 'badPerc': 50, 'validVote': false },
    { 'name': 'Cristina Fernández de Kirchner', 'keyForm': 'voteCristina', 'key': 'cristina', 'image': '../../assets/images/cristina.png', 'category': 'Politics', 'numVotes': 0, 'goodPerc': 50, 'badPerc': 50, 'validVote': false },
    { 'name': 'Malala Yousafzai', 'keyForm': 'voteMalala', 'key': 'malala', 'image': '../../assets/images/malala.png', 'category': 'Entertainment', 'numVotes': 0, 'goodPerc': 50, 'badPerc': 50, 'validVote': false }
  ]
  percentValue = { 'good': 50, 'bad': 50 }

  form = new FormGroup({
    voteKanye: new FormControl(0),
    voteMark: new FormControl(0),
    voteCristina: new FormControl(0),
    voteMalala: new FormControl(0),
  });

  currentUserData: any
  votesData: any

  constructor(private db: AngularFirestore, private router: Router, private formsModule: FormsModule, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    var emailCurrent = localStorage.getItem('email')
    if (emailCurrent != null) {
      this.db.collection('users').doc(atob(emailCurrent)).get().subscribe(dataUser => {
        this.currentUserData = dataUser.data()
        this.db.collection('votes').doc('votes').get().subscribe(numVotes => {
          this.votesData = numVotes.data()
          for (const key in this.votesData) {
            if (Object.prototype.hasOwnProperty.call(this.votesData, key)) {
              const voteValue = this.votesData[key];
              for (let index = 0; index < this.votes.length; index++) {
                const element = this.votes[index];
                if (element.key === key) {
                  this.votes[index].numVotes = voteValue
                  this.votes[index].goodPerc += voteValue;
                  this.votes[index].badPerc -= voteValue;
                }
              }
            }
          }
        })
      })
    }
  }

  addVote(item: any, vote: any) {
    for (let index = 0; index < this.votes.length; index++) {
      const element = this.votes[index];
      if (item.key === element.key) {
        this.votes[index].numVotes += vote;
        this.votes[index].validVote = true;
        this.votes[index].goodPerc += vote;
        this.votes[index].badPerc -= vote;
        this.votesData[element.key] += vote
      }
    }
    this.db.collection('votes').doc('votes').set(this.votesData)
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate([''])
      this.currentUserData = null
      this.votesData = null
    })
  }

}
