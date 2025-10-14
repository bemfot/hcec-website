import { Hymn } from "@/app/components/hymns/types";

export const dummyHymns: Hymn[] = [
  {
    _id: '1',
    language: 'english',
    title: 'Amazing Grace',
    number: 1,
    tune: 'New Britain',
    author: 'John Newton',
    bibleVerse: 'Ephesians 2:8',
    tags: ['grace', 'salvation'],
    verses: [
      { number: 1, text: 'Amazing grace! How sweet the sound that saved a wretch like me! I once was lost, but now am found; was blind, but now I see.', stanza: 1 },
      { number: 2, text: '\'Twas grace that taught my heart to fear, and grace my fears relieved; how precious did that grace appear the hour I first believed.', stanza: 2 },
      { number: 3, text: 'Through many dangers, toils, and snares, I have already come; \'tis grace hath brought me safe thus far, and grace will lead me home.', stanza: 3 },
    ]
  },
  {
    _id: '2',
    language: 'english',
    title: 'How Great Thou Art',
    number: 2,
    tune: 'O Store Gud',
    author: 'Stuart K. Hine',
    bibleVerse: 'Psalm 8:3-4',
    tags: ['praise', 'worship'],
    verses: [
      { number: 1, text: 'O Lord my God, when I in awesome wonder consider all the worlds Thy hands have made, I see the stars, I hear the rolling thunder, Thy power throughout the universe displayed.', stanza: 1 },
      { number: 2, text: 'Then sings my soul, my Savior God, to Thee; how great Thou art, how great Thou art! Then sings my soul, my Savior God, to Thee; how great Thou art, how great Thou art!', stanza: 2 },
    ]
  },
  {
    _id: '3',
    language: 'yoruba',
    title: 'Oluwa Ni O',
    number: 3,
    author: 'Traditional',
    tags: ['praise', 'thanksgiving'],
    verses: [
      { number: 1, text: 'Oluwa ni o, Oluwa ni o, Oluwa ni o to da mi. Mo dupe lowo Re, mo dupe lowo Re, Oluwa ni o to da mi.', stanza: 1 },
      { number: 2, text: 'Jesu Kristi ni, Jesu Kristi ni, Jesu Kristi ni to gba mi. Mo dupe lowo Re, mo dupe lowo Re, Jesu Kristi ni to gba mi.', stanza: 2 },
    ]
  },
  {
    _id: '4',
    language: 'english',
    title: 'Blessed Assurance',
    number: 4,
    tune: 'Assurance',
    author: 'Fanny Crosby',
    bibleVerse: 'Hebrews 10:22',
    tags: ['assurance', 'joy'],
    verses: [
      { number: 1, text: 'Blessed assurance, Jesus is mine! O what a foretaste of glory divine! Heir of salvation, purchase of God, born of His Spirit, washed in His blood.', stanza: 1 },
      { number: 2, text: 'This is my story, this is my song, praising my Savior all the day long; this is my story, this is my song, praising my Savior all the day long.', stanza: 2 },
    ]
  },
  {
    _id: '5',
    language: 'yoruba',
    title: 'Baba Wa Ti O Wa Lorun',
    number: 5,
    author: 'Traditional',
    bibleVerse: 'Matthew 6:9',
    tags: ['prayer'],
    verses: [
      { number: 1, text: 'Baba wa ti o wa lorun, ki a so oruko Re di mimo, ki ijoba Re de, ki a se ife Re ni aiye bi a ti n se lorun.', stanza: 1 },
    ]
  },
];