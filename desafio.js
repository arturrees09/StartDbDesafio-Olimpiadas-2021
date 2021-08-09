const olympicsMedalTable = [
  {
    id: 1,
    country: "BRASIL",
    gold: 7,
    silver: 6,
    bronze: 6,
    continent: "AMERICA DO SUL",
  },
  {
    id: 2,
    country: "USA",
    gold: 46,
    silver: 37,
    bronze: 17,
    continent: "AMERICA DO NORTE",
  },
  {
    id: 3,
    country: "CHINA",
    gold: 26,
    silver: 18,
    bronze: 26,
    continent: "ASIA",
  },
  {
    id: 4,
    country: "RUSSIA",
    gold: 19,
    silver: 18,
    bronze: 19,
    continent: "EUROPA",
  },
  {
    id: 5,
    country: "REINO UNIDO",
    gold: 27,
    silver: 23,
    bronze: 17,
    continent: "EUROPA",
  },
  {
    id: 6,
    country: "ALEMANHA",
    gold: 17,
    silver: 10,
    bronze: 15,
    continent: "EUROPA",
  },
  {
    id: 7,
    country: "JAPÃO",
    gold: 12,
    silver: 8,
    bronze: 21,
    continent: "ASIA",
  },
  {
    id: 8,
    country: "ARGENTINA",
    gold: 3,
    silver: 1,
    bronze: 0,
    continent: "AMERICA DO SUL",
  },
  {
    id: 9,
    country: "ITALIA",
    gold: 8,
    silver: 12,
    bronze: 8,
    continent: "EUROPA",
  },
  {
    id: 10,
    country: "QUÊNIA",
    gold: 6,
    silver: 6,
    bronze: 1,
    continent: "AFRICA",
  },
];

Array.prototype.customFind = function (predicate) {
  /**
   * O método find() retorna o valor do primeiro elemento do
   * array que satisfizer a função de teste provida.
   * Caso contrario, undefined é retornado.
   */

  // Implemente aqui seu algoritmo
  return typeof this === "object"
    ? this.filter((value) => predicate(value))[0]
    : undefined;
};

Array.prototype.customSome = function (predicate) {
  /**
   * O método some() testa se ao menos um dos elementos no array
   * passa no teste implementado pela função atribuída e retorna um valor true ou false.
   */

  // Implemente aqui seu algoritmo
  return this.map((value) => (predicate(value) ? true : false));
};

Array.prototype.customFilter = function (predicate) {
  /**
   * O método filter() cria um novo array com todos os elementos que
   * passaram no teste implementado pela função fornecida.
   */

  // Implemente aqui seu algoritmo
  // empty array
  const filterArr = [];
  // loop though array
  for (let i = 0; i < this.length; i++) {
    const result = predicate(this[i], i, this);
    // push the current element if result is true
    if (result) filterArr.push(this[i]);
  }

  return filterArr;
};

Array.prototype.customMap = function (callback) {
  /**
   * O método map() invoca a função callback passada por argumento para
   * cada elemento do Array e devolve um novo Array como resultado.
   */
  // Implemente aqui seu algoritmo

  // empty array
  const mapArr = [];

  // loop though array
  for (let i = 0; i < this.length; i++) {
    const result = callback(this[i], i, this);
    mapArr.push(result);
  }
  return mapArr;
};

Array.prototype.customReduce = function (callback, initialValue) {
  /**
   * O reduce()método executa uma função redutora (fornecida por você) em cada
   * membro da matriz, resultando em um único valor de saída.
   */
  // Implemente aqui seu algoritmo
  let accumulator = initialValue === undefined ? 0 : initialValue;
  // loop though array
  for (let i = 0; i < this.length; i++)
    accumulator = callback(accumulator, this[i], i, this);
  return accumulator;
};

// Código modelo utilizando filter, map e reduce
const resultFilterMapReduce = olympicsMedalTable
  .filter((i) => i.continent === "ASIA") // JAPÃO e CHINA
  .map((i) => i.gold) // 26 e 12
  .reduce((total, quantity) => total + quantity); // 38

console.log(
  `Medalhas de Ouro no continente Asiático: ${resultFilterMapReduce}`
);

/**
 * Implemente as funções customizadas - customFilter, customMap e customReduce e
 * verique se o retorno é igual ao do código modelo
 */

const resultByCustomFilterMapReduce = olympicsMedalTable
  .customFilter((i) => i.continent === "ASIA")
  .customMap((i) => i.gold)
  .customReduce((total, quantity) => total + quantity);

console.log(
  `Resultado custom - Medalhas de Ouro no continente Asiático: ${resultByCustomFilterMapReduce}`
);

/**
 * DESAFIOS - CONCLUA AS FUNÇÕES customSome, customFind E UTILIZANDO TODAS AS FUNÇÕES 'CUSTOM'
 * CONCLUA OS DESAFIOS ABAIXO:
 */

// 1 - Crie um algoritmo que encontre o único pais do continente Africano
const continent = olympicsMedalTable.customFind(
  (p) => p.continent === "AFRICA"
);

console.log(`Qual o único país do continente Africano? ${continent.country}`);

// 2 - Crie um algoritmo que retorne o total de medalhas por país
const medalsByCountry = olympicsMedalTable.customMap((total) => {
  const totalMedals = {};

  totalMedals[total.country] = total.gold + total.silver + total.bronze;
  return totalMedals;
});

console.log("Quantidade de Medalhas por País");
console.table(medalsByCountry);

// 3 - Crie um algoritmo para encontrar os países que conquistaram mais que 10 medalhas de ouro
const countriesWith10GoldMedalsAtLeast = olympicsMedalTable
  .customFilter((filter) => filter.gold > 10)
  .customMap((minimum) => {
    const countries = {};
    countries[minimum.country] = minimum.gold;
    return countries;
  });

console.log("Países com Mais que 10 Medalhas de Ouro");
console.table(countriesWith10GoldMedalsAtLeast);

// 4 - Crie um algoritmo para encontrar os países que conquistaram no minímo 30 medalhas (Ouro, Prata e Bronze)
const countriesWithMinimum30Medals = olympicsMedalTable
  .customMap((item) => {
    const paisesMinimo = {};
    paisesMinimo.country = item.country;
    paisesMinimo.total = [item.gold, item.silver, item.bronze].customReduce(
      (total, currentValue) => total + currentValue
    );
    return paisesMinimo;
  })
  .customFilter((pais) => pais.total > 30);

console.log("Países Com 30 Medalhas No Mínimo");
console.table(countriesWithMinimum30Medals);

/**
 * 5 - Crie um algoritmo para verificar se o continente América do Sul
 * conquistou pelo menos 20 medalhas de ouro
 */
const countriesWith20GoldMedals =
  olympicsMedalTable
    .customFilter((data) => data.continent === "AMERICA DO SUL")
    .customReduce((total, quantity) => total + quantity) > 20;

console.log(
  `A América do Sul conquistou pelo menos 20 medalhas? ${
    countriesWith20GoldMedals ? "SIM" : "NÃO"
  }`
);
