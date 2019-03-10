import { Injectable } from '@angular/core';
import { Game } from './games/shared/game.model';

@Injectable({
  providedIn: 'root'
})
export class MasterMindService {

  public create(): Game {
    const game = {
      id: null,
      startedAt: new Date().getTime(),
      endedAt: null,
      code: '' + Math.floor(Math.random() * (999 - 100 + 1) + 100),
      terminated: false,
      attempts: 0,
      attemptsDetail: [],
      score: 0
    }
    return game;
  }

  public check(code: string, value: string): { success: boolean, rightPosition: number, wrongPosition: number} {

    const result = {
      success: false,
      rightPosition: 0,
      wrongPosition: 0
    };

    // success
    if (code === value) {
      result.success = true;
      result.rightPosition = code.length;
      return result;
    }

    const codeAsArray = code.split('');
    const presenceMap = {};
    codeAsArray.forEach(element => presenceMap[element] = presenceMap[element] ? presenceMap[element] + 1 : 1);
    const toCheckWrongPosition = [];

    // check right position
    value.split('').forEach((element, index) => {
      if (codeAsArray[index] === element) {
        result.rightPosition++;
        presenceMap[element]--;
      } else {
        toCheckWrongPosition.push(element);
      }
    });

    // check wrong position
    toCheckWrongPosition.forEach((element) => {
      if (presenceMap[element]) {
        result.wrongPosition++;
        presenceMap[element]--;
      }
    });

    return result;
  }

  public score(milliseconds: number, attempts: number): number {
    let score = 100 - Math.round(milliseconds / 1000) - attempts;
    if (score < 1) {
      score = 1;
    }
    return score;
  }

}
