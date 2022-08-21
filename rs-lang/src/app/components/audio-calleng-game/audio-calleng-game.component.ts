import { Component, Input, OnInit } from '@angular/core';
import { BASE_URL, WordData } from 'src/app/models/requests.model';

@Component({
  selector: 'app-audio-calleng-game',
  templateUrl: './audio-calleng-game.component.html',
  styleUrls: ['./audio-calleng-game.component.scss']
})
export class AudioCallengGameComponent implements OnInit {
  @Input()
  getDataGame!: WordData[];

  randomDataGame!: WordData[];

  dataChooseButtons!: WordData[];

  randomOrderButtons!: WordData[];

  wordCount = 0;

  /* !!! */
  countWordsInGame = 1;
  randomWodsforGame!: WordData[];
  buttonsGame!: WordData[];
  tempFiveButton!: WordData[];


  result: boolean = false;

  match!: boolean;

  shown: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    /*     document.querySelector('.red')?.classList.remove('red');
        document.querySelector('.green')?.classList.remove('green');
        this.result = false;
        this.getRandomData();
        this.getRandomOrderButtons();
        console.log(this.shown); */
    document.querySelector('.red')?.classList.remove('red');
    document.querySelector('.green')?.classList.remove('green');
    this.result = false;
    this.getDataForWords();
    this.getButtonsRandom();
    console.log(this.countWordsInGame);
  }

  /*   getRandomData() {
      let randomArray = this.getRandomeArray();
      if (this.shown.includes(this.getDataGame[randomArray[0]].word)) {
        console.log('repeat');
      }
      this.randomDataGame = [];
      for (let i = 0; i < randomArray.length; i++) {
        this.randomDataGame.push(this.getDataGame[randomArray[i]]);
      }
      this.temporaryDataButton();
    } */


  getRandomeArray() {
    function shuffle(array: Array<number>) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const ARRAY_PAGE_INDEX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 19, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const data = shuffle(ARRAY_PAGE_INDEX);
    return data;
  }

  /*   temporaryDataButton() {
      let arr = [];
      arr.push(this.randomDataGame[this.wordCount]);
      this.wordCount++;
      console.log('count', this.wordCount);
      let data = this.randomDataGame;
      data = data.splice(10, 5);
      arr.concat(data);
      this.dataChooseButtons = data;
      this.shown.push(data[0].word);
    } */

  /*   getRandomOrderButtons() {
      function shufflett(array: Array<WordData>) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
      const data = this.dataChooseButtons;
      let arr: Array<WordData> = [];
      data.forEach(el => arr.push(el));
      let dataaar = shufflett(arr);
      this.randomOrderButtons = dataaar;
    } */

  onChoose(a: string, b: string, event: any) {
    if (a === b) {
      this.match = true;
      console.log('true');
      event.currentTarget.classList.add('green');
      this.result = true;
    } else {
      this.match = true;
      console.log('false');
      event.currentTarget.classList.add('red');
      this.result = true;
    }
  }

  getSound() {
    let audio = new Audio(`${BASE_URL}/${this.randomWodsforGame[0].audio}`);
    audio.play();
  }

  /* temp */

  getDataForWords() {
    let data = this.getDataGame;
    let randomeArray = this.getRandomeArray();
    let newData: WordData[] = [];
    for (let i = 0; i < randomeArray.length; i++) {
      newData.push(data[randomeArray[i]]);
    }
    this.randomWodsforGame = newData;
    this.buttonsGame = [...newData];
    console.log('слова', this.randomWodsforGame);
    console.log('кнопки', this.buttonsGame);

  }

  getButtonsRandom() {
    function shufflett(array: Array<WordData>) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    let arr: Array<WordData> = [];
    console.log('first words', this.randomWodsforGame);
    arr.push(this.randomWodsforGame[0]);
    console.log('this word', this.randomWodsforGame[0]);
    let rr = this.buttonsGame.slice(11, 15);

    rr.forEach(el => {
      if(el === this.randomWodsforGame[0]) {
        let qq = this.buttonsGame[15]
        arr.push(qq)
        console.log('repeat');
        
      } else {
        arr.push(el)
      }
    });
    let nerArr = shufflett(arr);
    this.tempFiveButton = nerArr;
    /*     console.log('5 buttons', this.tempFiveButton);
        console.log('rest words', this.randomWodsforGame); */

  }

  check() {
    if (this.countWordsInGame > 19) {
      alert('end game');
      return;
    }
    document.querySelector('.red')?.classList.remove('red');
    document.querySelector('.green')?.classList.remove('green');
    this.result = false;
    this.randomWodsforGame.shift();
    this.getButtonsRandom();
    this.countWordsInGame++;
    console.log(this.countWordsInGame);

  }

}
