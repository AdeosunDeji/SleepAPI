import { FANCY_APPLE } from '@src/domain/produce/ingredient';
import { DREAM_EATER_BUTTER_CURRY } from '@src/domain/recipe/curry';
import { LOVELY_KISS_SMOOTHIE } from '@src/domain/recipe/dessert';
import { NINJA_SALAD } from '@src/domain/recipe/salad';
import { PokemonCombinationForMealDAO } from '../../database/dao/pokemon-combination-for-meal-dao';
import { PokemonCombinationForMeal30DAO } from '../../database/dao/pokemon-combination-for-meal30-dao';
import { DaoFixture } from '../../utils/test-utils/dao-fixture';
import { MockService } from '../../utils/test-utils/mock-service';
import {
  getMealDataAndRankingFor,
  getMealFocusedRanking,
  getMealGeneralistRanking,
  getMealNamesForFilter,
} from './meal-ranking';

DaoFixture.init();

describe('getMealNames', () => {
  it('shall get all default meal names if no filters passed', () => {
    const params = {
      advanced: false,
      unlocked: false,
      lategame: false,
      curry: false,
      salad: false,
      dessert: false,
    };
    expect(getMealNamesForFilter(params)).toMatchSnapshot();
  });

  it('shall skip starter meal names if advanced filter passed', () => {
    const params = {
      advanced: true,
      unlocked: false,
      lategame: false,
      curry: false,
      salad: false,
      dessert: false,
    };
    expect(getMealNamesForFilter(params)).toMatchSnapshot();
  });

  it('shall skip starter meals and unlockable ingredient meal names if unlockable filter passed', () => {
    const params = {
      advanced: false,
      unlocked: true,
      lategame: false,
      curry: false,
      salad: false,
      dessert: false,
    };
    expect(getMealNamesForFilter(params)).toMatchSnapshot();
  });

  it('shall ignore advanced bool if unlocked is true', () => {
    const params = {
      advanced: false,
      unlocked: true,
      lategame: false,
      curry: false,
      salad: false,
      dessert: false,
    };

    const falseResult = getMealNamesForFilter(params);

    params.advanced = true;
    const trueResult = getMealNamesForFilter(params);

    expect(falseResult).toEqual(trueResult);
  });
});

describe('getMealGeneralistRanking', () => {
  MockService.record({ PokemonCombinationForMealDAO }).getFlexibleRankingForMeals = async () => [
    {
      pokemon: 'some-pokemon',
      averagePercentage: 0,
      ingredientList: [],
    },
  ];
  MockService.record({ PokemonCombinationForMeal30DAO }).getFlexibleRankingForMeals = async () => [
    {
      pokemon: 'some-pokemon',
      averagePercentage: 0,
      ingredientList: [],
    },
  ];

  it('shall sort all pokemon - no filters', async () => {
    const params = {
      limit30: false,
      advanced: false,
      unlocked: false,
      lategame: false,
      curry: false,
      salad: false,
      dessert: false,
      cyan: false,
      taupe: false,
      snowdrop: false,
      lapis: false,
    };
    const ranking = await getMealGeneralistRanking(params);
    expect(ranking).toMatchInlineSnapshot(`
      [
        {
          "averagePercentage": 0,
          "ingredientList": [],
          "pokemon": "some-pokemon",
        },
      ]
    `);
    expect(MockService.recorded).toMatchSnapshot();
  });

  it('shall sort all pokemon - limit30=true', async () => {
    const params = {
      limit30: true,
      advanced: false,
      unlocked: false,
      lategame: false,
      curry: false,
      salad: false,
      dessert: false,
      cyan: false,
      taupe: false,
      snowdrop: false,
      lapis: false,
    };
    const ranking = await getMealGeneralistRanking(params);
    expect(ranking).toMatchInlineSnapshot(`
      [
        {
          "averagePercentage": 0,
          "ingredientList": [],
          "pokemon": "some-pokemon",
        },
      ]
    `);
    expect(MockService.recorded).toMatchSnapshot();
  });

  it('shall sort all pokemon - lategame=true', async () => {
    const params = {
      limit30: false,
      advanced: false,
      unlocked: false,
      lategame: true,
      curry: false,
      salad: false,
      dessert: false,
      cyan: false,
      taupe: false,
      snowdrop: false,
      lapis: false,
    };
    await getMealGeneralistRanking(params);
    expect(MockService.recorded).toMatchSnapshot();
  });

  it('shall sort all pokemon - unlocked=true', async () => {
    const params = {
      limit30: false,
      advanced: false,
      unlocked: true,
      lategame: false,
      curry: false,
      salad: false,
      dessert: false,
      cyan: false,
      taupe: false,
      snowdrop: false,
      lapis: false,
    };
    await getMealGeneralistRanking(params);
    expect(MockService.recorded).toMatchSnapshot();
  });

  it('shall sort all pokemon - limit30=true and advanced=true', async () => {
    const params = {
      limit30: true,
      advanced: true,
      unlocked: false,
      lategame: false,
      curry: false,
      salad: false,
      dessert: false,
      cyan: false,
      taupe: false,
      snowdrop: false,
      lapis: false,
    };
    await getMealGeneralistRanking(params);
    expect(MockService.recorded).toMatchSnapshot();
  });

  it('shall sort all pokemon - limit30=true and unlocked=true', async () => {
    const params = {
      limit30: true,
      advanced: false,
      unlocked: true,
      lategame: false,
      curry: false,
      salad: false,
      dessert: false,
      cyan: false,
      taupe: false,
      snowdrop: false,
      lapis: false,
    };
    await getMealGeneralistRanking(params);
    expect(MockService.recorded).toMatchSnapshot();
  });
});

describe('getMealFocusedRanking', () => {
  // Mocking the DAO methods
  const comb = {
    total: 10,
    meals: 'some-meal',
    ingredientList: [{ amount: 1, ingredient: FANCY_APPLE }],
  };

  MockService.record({ PokemonCombinationForMealDAO }).getFocusedRankingForMeals = async () => [
    { ...comb, pokemon: 'some-pokemon' },
  ];
  MockService.record({ PokemonCombinationForMeal30DAO }).getFocusedRankingForMeals = async () => [
    { ...comb, pokemon: 'some-pokemon30' },
  ];

  it('shall sort all pokemon - no filters, default nrOfMeals', async () => {
    const params = {
      limit30: false,
      advanced: false,
      unlocked: false,
      lategame: false,
      curry: false,
      salad: false,
      dessert: false,
      cyan: false,
      taupe: false,
      snowdrop: false,
      lapis: false,
    };
    await getMealFocusedRanking(params);
    expect(MockService.recorded).toMatchSnapshot();
  });

  it('shall sort all pokemon for limit30', async () => {
    const params = {
      limit30: false,
      advanced: false,
      unlocked: false,
      lategame: false,
      curry: false,
      salad: false,
      dessert: false,
      cyan: false,
      taupe: false,
      snowdrop: false,
      lapis: false,
    };
    await getMealFocusedRanking(params);
    expect(MockService.recorded).toMatchSnapshot();
  });

  it('shall sort all pokemon with explicit nrOfMeals', async () => {
    const params = {
      limit30: false,
      advanced: false,
      unlocked: false,
      lategame: false,
      curry: false,
      salad: false,
      dessert: false,
      cyan: false,
      taupe: false,
      snowdrop: false,
      lapis: false,
      nrOfMeals: 5,
    };
    await getMealFocusedRanking(params);
    expect(MockService.recorded).toMatchSnapshot();
  });
});

describe('getMealDataAndRankingFor', () => {
  MockService.record({ PokemonCombinationForMealDAO }).getPokemonCombinationsForMeal = async () => ({
    meal: 'some-meal',
    bonus: 0,
    value: 0,
    recipe: [],
    combinations: [],
  });
  MockService.record({ PokemonCombinationForMeal30DAO }).getPokemonCombinationsForMeal = async () => ({
    meal: '30-some-meal',
    bonus: 0,
    value: 0,
    recipe: [],
    combinations: [],
  });

  it('shall find and return ranking data for given meal', async () => {
    const params = {
      name: LOVELY_KISS_SMOOTHIE.name,
      limit30: false,
    };
    await getMealDataAndRankingFor(params);
    expect(MockService.recorded).toMatchSnapshot();
  });

  it('shall find and return ranking data for given meal with excluded level 60 ingredients', async () => {
    const params = {
      name: LOVELY_KISS_SMOOTHIE.name,
      limit30: true,
    };
    await getMealDataAndRankingFor(params);
    expect(MockService.recorded).toMatchSnapshot();
  });

  it('shall find and return ranking data for curry meal with excluded level 60 ingredients', async () => {
    const params = {
      name: DREAM_EATER_BUTTER_CURRY.name,
      limit30: true,
    };
    await getMealDataAndRankingFor(params);
    expect(MockService.recorded).toMatchSnapshot();
  });

  it('shall find and return ranking data for salad meal with excluded level 60 ingredients', async () => {
    const params = {
      name: NINJA_SALAD.name,
      limit30: true,
    };
    await getMealDataAndRankingFor(params);
    expect(MockService.recorded).toMatchSnapshot();
  });
});
