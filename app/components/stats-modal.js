import Component from '@glimmer/component';
import { GAME_STATUS, ROWS } from '../consts';
import { takeRightWhile, groupBy } from 'lodash';

export default class StatsModalComponent extends Component {
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
