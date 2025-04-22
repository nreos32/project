// This is a sample seed file for the "Mewtwo Pack". Expand as needed for all cards.
// Place this file in your server/ directory and run it with `node seedMewtwoPack.js` after connecting to MongoDB.

const mongoose = require("mongoose");
const Pack = require("./models/Pack");

const mewtwoPack = {
  name: "Mewtwo Pack",
  // Manual id assignment required: add a unique numeric `id` property to each card below
  cards: [
    // Grass Type Pokemon
    {
      name: "Bulbasaur",
      id: 1,
      type: "Grass",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000010_00_FUSHIGIDANE_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Ivysaur",
      id: 2,
      type: "Grass",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000020_00_FUSHIGISOU_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Venusaur",
      id: 3,
      type: "Grass",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000030_00_FUSHIGIBANA_R_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    {
      name: "Venusaur ex",
      id: 4,
      type: "Grass",
      rare: "Double Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000040_00_FUSHIGIBANAex_RR_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00333, 5: 0.01332 },
    },
    {
      name: "Weedle",
      id: 5,
      type: "Grass",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000080_00_BEEDLE_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Kakuna",
      id: 6,
      type: "Grass",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000090_00_COCOON_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Beedrill",
      id: 7,
      type: "Grass",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000100_00_SPEAR_R_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    {
      name: "Venonat",
      id: 8,
      type: "Grass",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000160_00_KONGPANG_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Venomoth",
      id: 9,
      type: "Grass",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000170_00_MORPHON_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Scyther",
      id: 10,
      type: "Grass",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000250_00_STRIKE_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Pinsir",
      id: 11,
      type: "Grass",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000260_00_KAILIOS_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Cottonee",
      id: 12,
      type: "Grass",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000270_00_MONMEN_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Whimsicott",
      id: 13,
      type: "Grass",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000280_00_ELFUUN_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Petilil",
      id: 14,
      type: "Grass",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000290_00_CHURINE_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Lilligant",
      id: 15,
      type: "Grass",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000300_00_DREDEAR_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    // Fire Type Pokemon
    {
      name: "Ponyta",
      id: 16,
      type: "Fire",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000420_00_PONYTA_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Rapidash",
      id: 17,
      type: "Fire",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000430_00_GALLOP_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Heatmor",
      id: 18,
      type: "Fire",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000480_00_KUITARAN_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Salandit",
      id: 19,
      type: "Fire",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000490_00_YATOUMORI_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Salazzle",
      id: 20,
      type: "Fire",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000500_00_ENNEWT_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Sizzlipede",
      id: 21,
      type: "Fire",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000510_00_YAKUDE_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Centiskorch",
      id: 22,
      type: "Fire",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000520_00_MARUYAKUDE_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    // Water Type Pokemon
    {
      name: "Psyduck",
      id: 23,
      type: "Water",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000570_00_KODUCK_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Golduck",
      id: 24,
      type: "Water",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000580_00_GOLDUCK_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Tentacool",
      id: 25,
      type: "Water",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000620_00_MENOKURAGE_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Tentacruel",
      id: 26,
      type: "Water",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000630_00_DOKUKURAGE_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Shellder",
      id: 27,
      type: "Water",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000660_00_SHELLDER_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Cloyster",
      id: 28,
      type: "Water",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000670_00_PARSHEN_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Krabby",
      id: 29,
      type: "Water",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000680_00_CRAB_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Kingler",
      id: 30,
      type: "Water",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000690_00_KINGLER_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Vaporeon",
      id: 31,
      type: "Water",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000800_00_SHOWERS_R_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    {
      name: "Articuno",
      id: 32,
      type: "Water",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000830_00_FREEZER_R_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    {
      name: "Articuno ex",
      id: 33,
      type: "Water",
      rare: "Double Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000840_00_FREEZERex_RR_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00333, 5: 0.01332 },
    },
    {
      name: "Snom",
      id: 34,
      type: "Water",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000920_00_YUKIHAMI_C_M_M_en_US.png", // Corrected path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Frosmoth",
      id: 35,
      type: "Water",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000930_00_MOTHNOW_U_M_M_en_US.png", // Corrected path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },

    // Electric Type Pokemon
    {
      name: "Blitzle",
      id: 36,
      type: "Electric",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001050_00_SHIMAMA_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Zebstrika",
      id: 37,
      type: "Electric",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001060_00_ZEBRAIKA_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Tynamo",
      id: 38,
      type: "Electric",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001070_00_SHIBISHIRASU_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Eelektrik",
      id: 39,
      type: "Electric",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001080_00_SHIBIBEEL_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Eelektross",
      id: 40,
      type: "Electric",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001090_00_SHIBIRUDON_R_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    {
      name: "Helioptile",
      id: 41,
      type: "Electric",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001100_00_ERIKITERU_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Heliolisk",
      id: 42,
      type: "Electric",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001110_00_ELEZARD_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Pincurchin",
      id: 43,
      type: "Electric",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001120_00_BACHINUNI_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },

    // Psychic Type Pokemon
    {
      name: "Slowpoke",
      id: 44,
      type: "Psychic",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001180_00_YADON_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Slowbro",
      id: 45,
      type: "Psychic",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001190_00_YADORAN_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Gastly",
      id: 46,
      type: "Psychic",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001200_00_GHOS_C_M_M_en_US.png", // Corrected path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Haunter",
      id: 47,
      type: "Psychic",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001210_00_GHOST_U_M_M_en_US.png", // Corrected path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Gengar",
      id: 48,
      type: "Psychic",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001220_00_GANGAR_R_M_M_en_US.png", // Corrected path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    {
      name: "Gengar ex",
      id: 49,
      type: "Psychic",
      rare: "Double Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001230_00_GANGARex_RR_M_M_en_US.png", // Corrected path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00333, 5: 0.01332 },
    },
    {
      name: "Mr. Mime",
      id: 50,
      type: "Psychic",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001260_00_BARRIERD_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Jynx",
      id: 51,
      type: "Psychic",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001270_00_ROUGELA_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Mewtwo",
      id: 52,
      type: "Psychic",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001280_00_MEWTWO_R_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    {
      name: "Mewtwo ex",
      id: 53,
      type: "Psychic",
      rare: "Double Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001290_00_MEWTWOex_RR_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00333, 5: 0.01332 },
    },
    {
      name: "Ralts",
      id: 54,
      type: "Psychic",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001300_00_RALTS_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Kirlia",
      id: 55,
      type: "Psychic",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001310_00_KIRLIA_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Gardevoir",
      id: 56,
      type: "Psychic",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001320_00_SIRNIGHT_R_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    {
      name: "Bruxish",
      id: 57,
      type: "Water",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_000910_00_HAGIGISHIRI_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Woobat",
      id: 58,
      type: "Psychic",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001330_00_KOROMORI_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Swoobat",
      id: 59,
      type: "Psychic",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001340_00_KOKOROMORI_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Golett",
      id: 60,
      type: "Psychic",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001350_00_GOBIT_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Golurk",
      id: 61,
      type: "Psychic",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001360_00_GOLOOG_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Ekans",
      id: 62,
      type: "Dark",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001640_00_ARBO_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Arbok",
      id: 63,
      type: "Dark",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001650_00_ARBOK_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Zubat",
      id: 64,
      type: "Dark",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001720_00_ZUBAT_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Golbat", // Added Uncommon Golbat
      id: 65,
      type: "Dark",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001730_00_GOLBAT_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    // Note: Golbat AR is present under Special Variants.
    {
      name: "Grimer",
      id: 66,
      type: "Dark",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001740_00_BETBETER_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Muk",
      id: 67,
      type: "Dark",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001750_00_BETBETON_R_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 }, // Assuming Muk is Rare based on filename
    },
    {
      name: "Koffing",
      id: 68,
      type: "Dark",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001760_00_DOGARS_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Weezing", // Added Rare Weezing
      id: 69,
      type: "Dark",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001770_00_MATADOGAS_R_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    // Note: Weezing AR is present under Special Variants.

    // Fighting Type Pokemon
    {
      name: "Sandshrew",
      id: 70,
      type: "Fighting",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001370_00_SAND_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Sandslash",
      id: 71,
      type: "Fighting",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001380_00_SANDPAN_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Cubone", // Added Cubone (Common)
      id: 72,
      type: "Fighting",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001510_00_KARAKARA_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Marowak", // Added Uncommon Marowak
      id: 73,
      type: "Fighting",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001520_00_GARAGARA_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Marowak ex", // Non-Secret Rare version
      id: 74,
      type: "Fighting",
      rare: "Double Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001530_00_GARAGARAex_RR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00333, 5: 0.01332 }, // Assuming RR rarity like other non-SR ex
    },
    // Note: Cubone AR is present under Special Variants.
    {
      name: "Hitmonlee",
      id: 75,
      type: "Fighting",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001540_00_SAWAMULAR_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 }, // Assuming Common based on filename
    },
    {
      name: "Rhyhorn",
      id: 76,
      type: "Fighting",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001560_00_SIHORN_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Rhydon",
      id: 77,
      type: "Fighting",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001570_00_SIDON_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Clobbopus",
      id: 78,
      type: "Fighting",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001620_00_TATAKKO_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Grapploct",
      id: 79,
      type: "Fighting",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001630_00_OTOSUPUS_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },

    // Dark/Metal Type Pokemon (Grouping Steel as Metal)
    {
      name: "Pawniard",
      id: 80,
      type: "Metal",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001790_00_KOMATANA_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Bisharp",
      id: 81,
      type: "Metal",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001800_00_KIRIKIZAN_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },

    // Normal Type Pokemon
    {
      name: "Pidgey",
      id: 82,
      type: "Normal",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001860_00_POPPO_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Pidgeotto",
      id: 83,
      type: "Normal",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001870_00_PIGEON_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Pidgeot",
      id: 84,
      type: "Normal",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001880_00_PIGEOT_R_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    {
      name: "Rattata",
      id: 85,
      type: "Normal",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001890_00_KORATTA_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Raticate",
      id: 86,
      type: "Normal",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001900_00_RATTA_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Farfetch'd",
      id: 87,
      type: "Normal",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001980_00_KAMONEGI_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Doduo",
      id: 88,
      type: "Normal",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001990_00_DODO_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Dodrio",
      id: 89,
      type: "Normal",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_002000_00_DODORIO_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Lickitung",
      id: 90,
      type: "Normal",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_002010_00_BERORINGA_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Ditto",
      id: 91,
      type: "Normal",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_002050_00_METAMON_R_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    {
      name: "Eevee",
      id: 92,
      type: "Normal",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_002060_01_EIEVUI_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Porygon",
      id: 93,
      type: "Normal",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_002070_00_PORYGON_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Minccino",
      id: 94,
      type: "Normal",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_002100_00_CHILLARMY_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Cinccino",
      id: 95,
      type: "Normal",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_002110_00_CHILLACCINO_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Wooloo",
      id: 96,
      type: "Normal",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_002120_00_WOOLUU_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Dubwool",
      id: 97,
      type: "Normal",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_002130_00_BAIWOOLUU_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    // Dragon Type Pokemon
    {
      name: "Dratini",
      id: 98,
      type: "Dragon",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001830_00_MINIRYU_C_M_M_en_US.png",
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Dragonair",
      id: 99,
      type: "Dragon",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001840_00_HAKURYU_U_M_M_en_US.png",
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Dragonite",
      id: 100,
      type: "Dragon",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_001850_00_KAIRYU_R_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    {
      name: "Aerodactyl",
      id: 101,
      type: "Normal",
      rare: "Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_10_002080_00_PTERA_R_M_M_en_US.png", // Corrected path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00357, 5: 0.01428 },
    },
    // Special Variants
    {
      name: "Bulbasaur AR", // Added Bulbasaur AR
      id: 102,
      type: "Grass",
      rare: "Illustration Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_000010_00_FUSHIGIDANE_AR_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00321, 5: 0.01286 }, // Assuming AR rarity
    },
    {
      name: "Golbat AR", // Renamed for clarity
      id: 103,
      type: "Psychic",
      rare: "Illustration Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_001730_00_GOLBAT_AR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00321, 5: 0.01286 },
    },
    {
      name: "Weezing AR", // Renamed for clarity
      id: 104,
      type: "Psychic",
      rare: "Illustration Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_001770_00_MATADOGAS_AR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00321, 5: 0.01286 },
    },
    {
      name: "Dragonite AR", // Renamed for clarity
      id: 105,
      type: "Dragon",
      rare: "Illustration Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_001850_00_KAIRYU_AR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00321, 5: 0.01286 },
    },
    {
      name: "Pidgeot AR", // Renamed for clarity
      id: 106,
      type: "Normal",
      rare: "Illustration Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_001880_00_PIGEOT_AR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00321, 5: 0.01286 },
    },
    {
      name: "Ditto AR", // Renamed for clarity
      id: 107,
      type: "Normal",
      rare: "Illustration Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_002050_00_METAMON_AR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00321, 5: 0.01286 },
    },
    {
      name: "Porygon AR", // Renamed for clarity
      id: 108,
      type: "Normal",
      rare: "Illustration Rare",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_002070_00_PORYGON_AR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00321, 5: 0.01286 },
    },
    // Secret Rare ex Cards
    {
      name: "Venusaur ex",
      id: 109,
      type: "Grass",
      rare: "Special Art",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_000040_00_FUSHIGIBANAex_SR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00055, 5: 0.00222 },
    },
    {
      name: "Articuno ex",
      id: 110,
      type: "Water",
      rare: "Special Art",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_000840_00_FREEZERex_SR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00055, 5: 0.00222 },
    },
    {
      name: "Gengar ex",
      id: 111,
      type: "Psychic",
      rare: "Special Art",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_001230_00_GANGARex_SR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00055, 5: 0.00222 },
    },
    {
      name: "Mewtwo ex",
      id: 112,
      type: "Psychic",
      rare: "Special Art",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_001290_00_MEWTWOex_SR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00055, 5: 0.00222 },
    },
    {
      name: "Marowak ex SR", // Renamed for clarity
      id: 113,
      type: "Fighting",
      rare: "Special Art",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_001530_00_GARAGARAex_SR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00055, 5: 0.00222 },
    },
    {
      name: "Articuno ex SAR", // Added Articuno ex SAR
      id: 114,
      type: "Water",
      rare: "Special Art",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_000840_01_FREEZERex_SAR_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.0004, 5: 0.0016 }, // Estimated SAR rarity
    },
    {
      name: "Gengar ex SAR", // Added Gengar ex SAR
      id: 115,
      type: "Psychic",
      rare: "Special Art",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_001230_01_GANGARex_SAR_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.0004, 5: 0.0016 }, // Estimated SAR rarity
    },
    {
      name: "Mewtwo ex IM", // Added Mewtwo ex IM
      id: 116,
      type: "Psychic",
      rare: "Crown",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cPK_20_001290_01_MEWTWOex_IM_M_M_en_US.png",
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.0004, 5: 0.0016 }, // Estimated IM rarity (similar to SAR)
    },
    // Trainer Cards
    {
      name: "Old Amber",
      id: 117,
      type: "Trainer",
      rare: "Common",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cTR_10_000100_00_HIMITSUNOKOHAKU_C_M_M_en_US.png", // Updated path
      rarities: { 1: 0.02, 2: 0.02, 3: 0.02, 4: 0, 5: 0 },
    },
    {
      name: "Koga",
      id: 118,
      type: "Supporter",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cTR_10_000140_00_KYOU_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    {
      name: "Giovanni",
      id: 119,
      type: "Supporter",
      rare: "Uncommon",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cTR_10_000150_00_SAKAKI_U_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0.02571, 3: 0.02571, 4: 0.01714, 5: 0 },
    },
    // Secret Rare Trainer Cards
    {
      name: "Koga",
      id: 120,
      type: "Supporter",
      rare: "Special Art",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cTR_20_000140_00_KYOU_SR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00055, 5: 0.00222 },
    },
    {
      name: "Giovanni",
      id: 121,
      type: "Supporter",
      rare: "Special Art",
      assetPath:
        "client/src/Assets/Cards/Mewtwo/cTR_20_000150_00_SAKAKI_SR_M_M_en_US.png", // Updated path
      rarities: { 1: 0, 2: 0, 3: 0, 4: 0.00055, 5: 0.00222 },
    },
  ],
};

async function seed() {
  try {
    require("dotenv").config({ path: "../.env" });
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Pack.deleteOne({ name: mewtwoPack.name });
    await Pack.create(mewtwoPack);
    console.log("Mewtwo Pack seeded successfully!");
  } catch (error) {
    console.error("Error seeding Mewtwo Pack:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
