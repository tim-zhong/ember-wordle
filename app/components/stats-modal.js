import Component from '@glimmer/component';
import { GAME_STATUS, ROWS } from '../consts';
import { takeRightWhile, groupBy } from 'lodash';

/**
 * Modal to show the lifetime stats and a share button
 *
 * @arg {function} onClose -- Callback to invoke when the user attemptes to close the modal
 * @arg {Game[]} games -- Models of all the previous games
 * @arg {function} goToNextGame -- Callback to invoke when the user clicks on "Next Game"
 * @arg {string} currentGameStatus -- Status of the current game (e.g. 'WON')
 * @arg {string[][]} currentGameEvaluations -- Evaluation result of the current game
 */
export default class StatsModalComponent extends Component {
  get hasWon() {
    return this.args.currentGameStatus === GAME_STATUS.WIN;
  }

  get numPlayed() {
    return this.args.games.filter(({ status }) => status).length;
  }

  get stats() {
    const { games } = this.args;
    const { numPlayed } = this;

    const numWon = games.filter(
      ({ status }) => status === GAME_STATUS.WIN
    ).length;
    const currentStreak = takeRightWhile(
      games,
      ({ status }) => status === GAME_STATUS.WIN
    ).length;

    const maxStreak = [...games.reverse(), { status: GAME_STATUS.FAIL }].reduce(
      ({ maxStreak, curStreak }, curGame) => {
        if (curGame.status === GAME_STATUS.WIN) {
          return {
            maxStreak,
            curStreak: curStreak + 1,
          };
        }

        return curStreak > maxStreak
          ? {
              maxStreak: curStreak,
              curStreak: 0,
            }
          : {
              maxStreak,
              curStreak: 0,
            };
      },
      { maxStreak: 0, curStreak: 0 }
    ).maxStreak;

    return [
      {
        label: 'Played',
        value: numPlayed,
      },
      {
        label: 'Win %',
        value: Math.round((numWon / (numPlayed || 1)) * 100),
      },
      {
        label: 'Current Streak',
        value: currentStreak,
      },
      {
        label: 'Max Streak',
        value: maxStreak,
      },
    ];
  }

  get guessDistribution() {
    const wonGames = this.args.games.filter(
      (game) => game.status === GAME_STATUS.WIN
    );
    const freqByGuessCount = groupBy(wonGames, ({ inputs }) => inputs.length);

    return Array(ROWS)
      .fill()
      .map((_, index) => {
        const guessCount = index + 1;
        const frequency = (freqByGuessCount[index + 1] ?? []).length;
        const percentage = Math.round(
          (frequency * 100) / (wonGames.length || 1)
        );
        return {
          guessCount,
          frequency,
          percentage,
        };
      });
  }
}
