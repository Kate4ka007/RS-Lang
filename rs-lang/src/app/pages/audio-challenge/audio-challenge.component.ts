import { Component, OnInit } from '@angular/core';
import { WordsService } from 'src/app/services/requests/words.service';
import { WordData } from 'src/app/models/requests.model';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-audio-challenge',
  templateUrl: './audio-challenge.component.html',
  styleUrls: ['./audio-challenge.component.scss']
})
export class AudioChallengeComponent implements OnInit {
  dataPage: WordData[] = [];

  loader = true;
  group = 0;
  page = 0;
  isStart = false
  constructor(private wordsService: WordsService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 1850);
    let dataw = this.wordsService.getData(this.group, this.page)
    dataw.subscribe(data => {
    console.log(data);
    localStorage.setItem('data-page-game', JSON.stringify(data));
    this.dataPage = data;
    });
  }

  changeGroup(event: any) {
    let gg = +(event.currentTarget.value);
    this.group = gg;
    event.currentTarget.style.background = 'green'
    localStorage.setItem('page-group', event.currentTarget.value)
    console.log(this.group);
    this.changeData()
    //this.isStart = !this.isStart;
  }


  changeData() {
    let newData = this.wordsService.getData(this.group, this.page)
    newData.subscribe(data => {
    console.log(data);
    localStorage.setItem('data-page-game', JSON.stringify(data));
    this.dataPage = data;
    console.log(this.dataPage);
    });
  }


}
