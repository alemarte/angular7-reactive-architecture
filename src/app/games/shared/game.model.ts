
export class Game {

  public id: string;
  public startedAt;
  public code: string;

  public attempts: number;
  public attemptsDetail: {
      value: string;
      correctWrongPosition: number;
      correctRightPosition: number;
    }[];

  public endedAt;
  public terminated: boolean;

  public score: number;

}
