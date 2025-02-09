import { CYAN, LAPIS, SNOWDROP, TAUPE } from '@src/domain/island/island';
import { BERRIES, CYAN_BERRIES, LAPIS_BERRIES, SNOWDROP_BERRIES, TAUPE_BERRIES } from '../../domain/produce/berry';
import { getBerriesForFilter, getBerriesForIsland } from './berry-utils';

describe('getBerriesForFilter', () => {
  it('shall default to all berries', () => {
    const islands = {
      cyan: false,
      taupe: false,
      snowdrop: false,
      lapis: false,
    };
    expect(getBerriesForFilter(islands)).toEqual(BERRIES);
  });

  it('shall return cyan berries for cyan filter', () => {
    const islands = {
      cyan: true,
      taupe: false,
      snowdrop: false,
      lapis: false,
    };
    expect(getBerriesForFilter(islands)).toEqual(CYAN_BERRIES);
  });

  it('shall return taupe berries for taupe filter', () => {
    const islands = {
      cyan: false,
      taupe: true,
      snowdrop: false,
      lapis: false,
    };
    expect(getBerriesForFilter(islands)).toEqual(TAUPE_BERRIES);
  });

  it('shall return snowdrop berries for snowdrop filter', () => {
    const islands = {
      cyan: false,
      taupe: false,
      snowdrop: true,
      lapis: false,
    };
    expect(getBerriesForFilter(islands)).toEqual(SNOWDROP_BERRIES);
  });

  it('shall return lapis berries for lapis filter', () => {
    const islands = {
      cyan: false,
      taupe: false,
      snowdrop: false,
      lapis: true,
    };
    expect(getBerriesForFilter(islands)).toEqual(LAPIS_BERRIES);
  });

  it('shall return both cyan and taupe berries if both filters are passed', () => {
    const islands = {
      cyan: true,
      taupe: true,
      snowdrop: false,
      lapis: false,
    };
    expect(getBerriesForFilter(islands)).toEqual([...CYAN_BERRIES, ...TAUPE_BERRIES]);
  });
});

describe('getBerriesForIsland', () => {
  it('shall default to all berries', () => {
    expect(getBerriesForIsland()).toEqual(BERRIES);
  });

  it('shall return cyan berries for cyan filter', () => {
    expect(getBerriesForIsland(CYAN)).toEqual(CYAN_BERRIES);
  });

  it('shall return taupe berries for taupe filter', () => {
    expect(getBerriesForIsland(TAUPE)).toEqual(TAUPE_BERRIES);
  });

  it('shall return snowdrop berries for snowdrop filter', () => {
    expect(getBerriesForIsland(SNOWDROP)).toEqual(SNOWDROP_BERRIES);
  });

  it('shall return lapis berries for lapis filter', () => {
    expect(getBerriesForIsland(LAPIS)).toEqual(LAPIS_BERRIES);
  });
});
