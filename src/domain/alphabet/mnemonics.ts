import type { Locale } from "@/shared/types/locale";
import type { Script } from "./letter";

type Localized = Readonly<Record<Locale, string>>;

export interface IMnemonic {
  /** Опорное слово на эту букву: частое и по возможности из словаря ученика. */
  word: string;
  wordTranslit: Readonly<Record<Script, string>>;
  meaning: Localized;
  /** Подсказка по форме буквы; есть только там, где сходство или ловушка действительно заметны. */
  shape?: Localized;
}

function entry(
  word: string,
  latin: string,
  cyrillic: string,
  ru: string,
  en: string,
  shape?: Localized,
): IMnemonic {
  return { word, wordTranslit: { latin, cyrillic }, meaning: { ru, en }, ...(shape && { shape }) };
}

// Транслитерация слов следует той же схеме, что и в letters.ts (ʻ — придыхательные).
export const MNEMONICS: Readonly<Record<string, IMnemonic>> = {
  ա: entry("այո", "ayo", "айо", "да", "yes", {
    ru: "Похожа на округлую «ш». Не путать с ե (е)",
    en: "Looks like a rounded w. Don't confuse with ե (e)",
  }),
  բ: entry("բարև", "barev", "барев", "привет", "hello"),
  գ: entry("գինի", "gini", "гини", "вино", "wine"),
  դ: entry("դուռ", "durr", "дурр", "дверь", "door"),
  ե: entry("Երևան", "Yerevan", "Ереван", "Ереван", "Yerevan", {
    ru: "Не путать с ա (а). В начале слова читается «йэ»",
    en: "Don't confuse with ա (a). At the start of a word it sounds like “ye”",
  }),
  զ: entry("զանգ", "zang", "занг", "звонок", "bell, call"),
  է: entry("էջ", "ēj", "эдж", "страница", "page"),
  ը: entry("ընկեր", "ənker", "ынкер", "друг", "friend"),
  թ: entry("թեյ", "tʻey", "тʻей", "чай", "tea"),
  ժ: entry("ժամ", "zham", "жам", "час", "hour"),
  ի: entry("իմ", "im", "им", "мой", "my"),
  լ: entry("լավ", "lav", "лав", "хорошо", "good", {
    ru: "Заглавная Լ — почти латинская L, и звук тот же",
    en: "Capital Լ looks like Latin L and sounds the same",
  }),
  խ: entry("խնդրեմ", "khndrem", "хндрем", "пожалуйста", "please"),
  ծ: entry("ծով", "tsov", "цов", "море", "sea"),
  կ: entry("կատու", "katu", "кату", "кошка", "cat"),
  հ: entry("հաց", "hatsʻ", "һацʻ", "хлеб", "bread", {
    ru: "Похожа на латинскую h — и звук «h»",
    en: "Looks like Latin h and sounds like h",
  }),
  ձ: entry("ձուկ", "dzuk", "дзук", "рыба", "fish"),
  ղ: entry("ղեկավար", "ghekavar", "гхекавар", "руководитель", "leader"),
  ճ: entry("ճաշ", "chash", "чаш", "обед", "lunch"),
  մ: entry("մայր", "mayr", "майр", "мать", "mother"),
  յ: entry("յոթ", "yotʻ", "йотʻ", "семь", "seven"),
  ն: entry("նուռ", "nurr", "нурр", "гранат", "pomegranate", {
    ru: "Не путать с ս (с): ն — это «н»",
    en: "Don't confuse with ս (s): ն is n",
  }),
  շ: entry("շատ", "shat", "шат", "очень, много", "very, many"),
  ո: entry("ոչ", "vochʻ", "вочʻ", "нет", "no", {
    ru: "Ловушка: похожа на латинскую n, а читается «во» (в середине слова «о»)",
    en: "Trap: looks like Latin n but reads “vo” (“o” inside a word)",
  }),
  չ: entry("չորս", "chʻors", "чʻорс", "четыре", "four"),
  պ: entry("պանիր", "panir", "панир", "сыр", "cheese"),
  ջ: entry("ջուր", "jur", "джур", "вода", "water"),
  ռ: entry("ռուս", "rrus", "ррус", "русский", "Russian"),
  ս: entry("սեր", "ser", "сер", "любовь", "love", {
    ru: "Ловушка: похожа на латинскую u (заглавная Ս — на U), а читается «с»",
    en: "Trap: looks like Latin u (capital Ս like U) but reads s",
  }),
  վ: entry("վատ", "vat", "ват", "плохо", "bad"),
  տ: entry("տուն", "tun", "тун", "дом", "house", {
    ru: "Не путать с ր (р)",
    en: "Don't confuse with ր (r)",
  }),
  ր: entry("րոպե", "rope", "ропе", "минута", "minute", {
    ru: "Не путать с տ (т)",
    en: "Don't confuse with տ (t)",
  }),
  ց: entry("ցտեսություն", "tsʻtesutʻyun", "цʻтесутʻюн", "до свидания", "goodbye"),
  ւ: entry("ուրախ", "urakh", "урах", "радостный", "happy", {
    ru: "Сама по себе почти не встречается: живёт в паре ու, которая читается «у»",
    en: "Rarely used alone: it lives in the pair ու, read as “u”",
  }),
  փ: entry("փող", "pʻogh", "пʻогх", "деньги", "money", {
    ru: "Похожа на греческую φ — «п» с придыханием",
    en: "Looks like Greek φ: an aspirated p",
  }),
  ք: entry("քաղաք", "kʻaghakʻ", "кʻагхакʻ", "город", "city", {
    ru: "Ловушка: похожа на латинскую p, а читается «к» с придыханием",
    en: "Trap: looks like Latin p but reads as an aspirated k",
  }),
  օ: entry("օր", "or", "ор", "день", "day", {
    ru: "Похожа на o — и звук «о»",
    en: "Looks like o and sounds like o",
  }),
  ֆ: entry("ֆուտբոլ", "futbol", "футбол", "футбол", "football", {
    ru: "Похожа на кириллическую ф — и звук «ф»",
    en: "Looks like Cyrillic ф, which is f",
  }),
};

export function mnemonicOf(letterId: string): IMnemonic | undefined {
  return MNEMONICS[letterId];
}
