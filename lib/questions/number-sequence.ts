import type { NumberSequenceQuestion } from "../types";

/**
 * Number sequence patterns: find the missing term(s) in the sequence.
 * Ids: ns-e-01.. (easy), ns-m-01.. (medium), ns-h-01.. (hard).
 * `sequence` uses null for the blanks. `prompt` / `explanation` are bilingual.
 */
export const numberSequenceQuestions: NumberSequenceQuestion[] = [
  {
    id: "ns-e-01",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [2, 5, 8, 11, null, 17],
    prompt: {
      th: "เลขที่หายไปในช่องว่างคือเลขอะไร",
      en: "Which number is missing from the blank?",
    },
    explanation: {
      th: "เป็นลำดับเลขคณิตบวก 3 ทุกครั้ง 2, 5, 8, 11 แล้ว 11 + 3 = 14 และ 14 + 3 = 17 ตรงกับตัวสุดท้าย",
      en: "Arithmetic sequence adding 3 each step: 2, 5, 8, 11, then 11 + 3 = 14, and 14 + 3 = 17 matches the last term.",
    },
    answer: { kind: "text", accepted: ["14"], placeholder: "14" },
  },
  {
    id: "ns-e-02",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [40, 36, 32, null, 24, 20],
    prompt: {
      th: "เลขที่หายไปในช่องว่างคือเลขอะไร",
      en: "Which number is missing from the blank?",
    },
    explanation: {
      th: "ลดลง 4 ทุกครั้ง 40, 36, 32 แล้ว 32 - 4 = 28 ต่อด้วย 28 - 4 = 24",
      en: "Each step subtracts 4: 40, 36, 32, then 32 - 4 = 28, followed by 28 - 4 = 24.",
    },
    answer: { kind: "text", accepted: ["28"] },
  },
  {
    id: "ns-e-03",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [3, 6, 12, 24, null, 96],
    prompt: {
      th: "เลขที่หายไปในช่องว่างคือเลขอะไร",
      en: "Which number is missing from the blank?",
    },
    explanation: {
      th: "เป็นลำดับเรขาคณิตคูณ 2 ทุกครั้ง 24 x 2 = 48 และ 48 x 2 = 96",
      en: "Geometric sequence multiplying by 2: 24 x 2 = 48, and 48 x 2 = 96.",
    },
    answer: { kind: "choice", choices: ["36", "48", "60", "72"], correctIndex: 1 },
  },
  {
    id: "ns-e-04",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [1, 3, 9, 27, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "คูณ 3 ทุกครั้ง 1, 3, 9, 27 ดังนั้น 27 x 3 = 81",
      en: "Each term is multiplied by 3: 1, 3, 9, 27, so 27 x 3 = 81.",
    },
    answer: { kind: "text", accepted: ["81"] },
  },
  {
    id: "ns-e-05",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [4, 9, 14, 19, null, null, null],
    prompt: {
      th: "เลขสามตัวถัดไปคือเลขอะไร (ตอบคั่นด้วยจุลภาค)",
      en: "What are the next three numbers? (separate with commas)",
    },
    explanation: {
      th: "บวก 5 ทุกครั้ง 19 + 5 = 24, 24 + 5 = 29, 29 + 5 = 34",
      en: "Add 5 each step: 19 + 5 = 24, 24 + 5 = 29, 29 + 5 = 34.",
    },
    answer: {
      kind: "text",
      accepted: ["24, 29, 34", "24,29,34", "24 29 34"],
      placeholder: "24, 29, 34",
    },
  },
  {
    id: "ns-e-06",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [5, 10, 20, 40, 80, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "แต่ละตัวเป็นสองเท่าของตัวก่อนหน้า 80 x 2 = 160",
      en: "Each term doubles the previous one: 80 x 2 = 160.",
    },
    answer: { kind: "choice", choices: ["120", "140", "160", "180"], correctIndex: 2 },
  },
  {
    id: "ns-e-07",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [6, 13, 20, 27, 34, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "ผลต่างคงที่เท่ากับ 7 ทุกช่วง ดังนั้น 34 + 7 = 41",
      en: "The common difference is 7, so 34 + 7 = 41.",
    },
    answer: { kind: "text", accepted: ["41"] },
  },
  {
    id: "ns-e-08",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [30, 27, 24, 21, null, 15],
    prompt: {
      th: "เลขที่หายไปในช่องว่างคือเลขอะไร",
      en: "Which number is missing from the blank?",
    },
    explanation: {
      th: "ลดลง 3 ทุกครั้ง 21 - 3 = 18 และ 18 - 3 = 15",
      en: "Each step subtracts 3: 21 - 3 = 18, and 18 - 3 = 15.",
    },
    answer: { kind: "choice", choices: ["15", "16", "17", "18"], correctIndex: 3 },
  },
  {
    id: "ns-e-09",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [12, 14, 16, 18, null, null],
    prompt: {
      th: "เลขสองตัวถัดไปคือเลขอะไร (ตอบคั่นด้วยจุลภาค)",
      en: "What are the next two numbers? (separate with commas)",
    },
    explanation: {
      th: "เป็นเลขคู่เรียงกัน บวก 2 ทุกครั้ง 18 + 2 = 20 และ 20 + 2 = 22",
      en: "Consecutive even numbers adding 2: 18 + 2 = 20, and 20 + 2 = 22.",
    },
    answer: {
      kind: "text",
      accepted: ["20, 22", "20,22", "20 22"],
      placeholder: "20, 22",
    },
  },
  {
    id: "ns-e-10",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [2, 4, 8, 16, null, 64],
    prompt: {
      th: "เลขที่หายไปในช่องว่างคือเลขอะไร",
      en: "Which number is missing from the blank?",
    },
    explanation: {
      th: "เป็นเลขยกกำลังสอง 2, 4, 8, 16 คูณ 2 ต่อไปได้ 32 และ 32 x 2 = 64",
      en: "Powers of two: 2, 4, 8, 16, then 16 x 2 = 32, and 32 x 2 = 64.",
    },
    answer: { kind: "text", accepted: ["32"] },
  },
  {
    id: "ns-e-11",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [5, 14, 23, 32, null, 50],
    prompt: {
      th: "เลขที่หายไปในช่องว่างคือเลขอะไร",
      en: "Which number is missing from the blank?",
    },
    explanation: {
      th: "บวก 9 ทุกครั้ง 32 + 9 = 41 และ 41 + 9 = 50",
      en: "Add 9 each step: 32 + 9 = 41, and 41 + 9 = 50.",
    },
    answer: { kind: "choice", choices: ["41", "43", "45", "47"], correctIndex: 0 },
  },
  {
    id: "ns-e-12",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [96, 48, 24, 12, null, 3],
    prompt: {
      th: "เลขที่หายไปในช่องว่างคือเลขอะไร",
      en: "Which number is missing from the blank?",
    },
    explanation: {
      th: "หารด้วย 2 ทุกครั้ง 12 / 2 = 6 และ 6 / 2 = 3",
      en: "Each term is halved: 12 / 2 = 6, and 6 / 2 = 3.",
    },
    answer: { kind: "text", accepted: ["6"] },
  },
  {
    id: "ns-m-01",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [1, 3, 6, 8, 11, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "ผลต่างสลับกันเป็น +2, +3, +2, +3 คือ 1, 3, 6, 8, 11 ขั้นถัดไปเป็น +2 ได้ 11 + 2 = 13",
      en: "The steps alternate +2, +3, +2, +3: 1, 3, 6, 8, 11, and the next step is +2, so 11 + 2 = 13.",
    },
    answer: { kind: "text", accepted: ["13"] },
  },
  {
    id: "ns-m-02",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [2, 3, 5, 8, 13, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "แบบฟีโบนักชี คือแต่ละตัวเท่ากับผลบวกของสองตัวก่อนหน้า 2 + 3 = 5, 3 + 5 = 8, 5 + 8 = 13 ดังนั้น 8 + 13 = 21",
      en: "Fibonacci-style: each term is the sum of the two before it. 2 + 3 = 5, 3 + 5 = 8, 5 + 8 = 13, so 8 + 13 = 21.",
    },
    answer: { kind: "text", accepted: ["21"] },
  },
  {
    id: "ns-m-03",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [1, 4, 9, 16, null, 36],
    prompt: {
      th: "เลขที่หายไปในช่องว่างคือเลขอะไร",
      en: "Which number is missing from the blank?",
    },
    explanation: {
      th: "เป็นกำลังสองของจำนวนนับ 1, 4, 9, 16 คือ 1 ยกกำลังสองถึง 4 ยกกำลังสอง ช่องว่างคือ 5 x 5 = 25 และตัวถัดไป 6 x 6 = 36",
      en: "Perfect squares: 1, 4, 9, 16 are 1 to 4 squared, so the blank is 5 x 5 = 25 and the last term is 6 x 6 = 36.",
    },
    answer: { kind: "choice", choices: ["20", "24", "25", "30"], correctIndex: 2 },
  },
  {
    id: "ns-m-04",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [1, 3, 7, 15, 31, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "แต่ละตัวคือตัวก่อนหน้าคูณ 2 บวก 1 หรือมองเป็นสองยกกำลัง n ลบ 1 ก็ได้ 31 x 2 + 1 = 63 ซึ่งเท่ากับ 64 - 1",
      en: "Each term is previous x 2 + 1, which is also 2 to the power n minus 1: 31 x 2 + 1 = 63, the same as 64 - 1.",
    },
    answer: { kind: "text", accepted: ["63"] },
  },
  {
    id: "ns-m-05",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [2, 4, 7, 14, 17, 34, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "สลับกันคูณ 2 แล้วบวก 3 คือ 2 x 2 = 4, 4 + 3 = 7, 7 x 2 = 14, 14 + 3 = 17, 17 x 2 = 34 ดังนั้นรอบนี้ต้องบวก 3 ได้ 34 + 3 = 37",
      en: "The rule alternates x 2 then + 3: 2 x 2 = 4, 4 + 3 = 7, 7 x 2 = 14, 14 + 3 = 17, 17 x 2 = 34, so the next step adds 3: 34 + 3 = 37.",
    },
    answer: { kind: "text", accepted: ["37"] },
  },
  {
    id: "ns-m-06",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [1, 8, 27, 64, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "เป็นกำลังสามของจำนวนนับ 1, 8, 27, 64 คือ 1, 2, 3, 4 ยกกำลังสาม ตัวถัดไปคือ 5 x 5 x 5 = 125",
      en: "Perfect cubes: 1, 8, 27, 64 are 1, 2, 3, 4 cubed, so the next is 5 x 5 x 5 = 125.",
    },
    answer: { kind: "choice", choices: ["100", "125", "144", "216"], correctIndex: 1 },
  },
  {
    id: "ns-m-07",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [4, 5, 9, 14, 23, null, null],
    prompt: {
      th: "เลขสองตัวถัดไปคือเลขอะไร (ตอบคั่นด้วยจุลภาค)",
      en: "What are the next two numbers? (separate with commas)",
    },
    explanation: {
      th: "แต่ละตัวคือผลบวกของสองตัวก่อนหน้า 4 + 5 = 9, 5 + 9 = 14, 9 + 14 = 23 ต่อไป 14 + 23 = 37 และ 23 + 37 = 60",
      en: "Each term is the sum of the two before it: 4 + 5 = 9, 5 + 9 = 14, 9 + 14 = 23, then 14 + 23 = 37 and 23 + 37 = 60.",
    },
    answer: {
      kind: "text",
      accepted: ["37, 60", "37,60", "37 60"],
      placeholder: "37, 60",
    },
  },
  {
    id: "ns-m-08",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [10, 15, 13, 18, 16, 21, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "สลับกันบวก 5 แล้วลบ 2 คือ 10 + 5 = 15, 15 - 2 = 13, 13 + 5 = 18, 18 - 2 = 16, 16 + 5 = 21 ดังนั้นรอบนี้ลบ 2 ได้ 21 - 2 = 19",
      en: "The rule alternates + 5 then - 2: 10 + 5 = 15, 15 - 2 = 13, 13 + 5 = 18, 18 - 2 = 16, 16 + 5 = 21, so the next step subtracts 2: 21 - 2 = 19.",
    },
    answer: { kind: "choice", choices: ["19", "20", "23", "26"], correctIndex: 0 },
  },
  {
    id: "ns-m-09",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [2, 5, 14, 41, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "แต่ละตัวคือตัวก่อนหน้าคูณ 3 แล้วลบ 1 คือ 2 x 3 - 1 = 5, 5 x 3 - 1 = 14, 14 x 3 - 1 = 41 ดังนั้น 41 x 3 - 1 = 122",
      en: "Each term is previous x 3 - 1: 2 x 3 - 1 = 5, 5 x 3 - 1 = 14, 14 x 3 - 1 = 41, so 41 x 3 - 1 = 122.",
    },
    answer: { kind: "text", accepted: ["122"] },
  },
  {
    id: "ns-m-10",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [2, 5, 10, 17, 26, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "แต่ละตัวคือกำลังสองของลำดับที่บวก 1 คือ 1+1, 4+1, 9+1, 16+1, 25+1 ตัวถัดไปคือ 36 + 1 = 37",
      en: "Each term is a square plus 1: 1+1, 4+1, 9+1, 16+1, 25+1, so the next is 36 + 1 = 37.",
    },
    answer: { kind: "text", accepted: ["37"] },
  },
  {
    id: "ns-m-11",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [1, 3, 6, 10, 15, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "ผลต่างเพิ่มขึ้นทีละ 1 คือ +2, +3, +4, +5 จึงเป็นผลบวกสะสมของจำนวนนับ ตัวถัดไปบวก 6 ได้ 15 + 6 = 21",
      en: "The differences grow by 1 each time: +2, +3, +4, +5, so these are running sums of the counting numbers. The next step adds 6: 15 + 6 = 21.",
    },
    answer: { kind: "choice", choices: ["18", "19", "20", "21"], correctIndex: 3 },
  },
  {
    id: "ns-m-12",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [3, 6, 12, 24, null, null, null],
    prompt: {
      th: "เลขสามตัวถัดไปคือเลขอะไร (ตอบคั่นด้วยจุลภาค)",
      en: "What are the next three numbers? (separate with commas)",
    },
    explanation: {
      th: "คูณ 2 ทุกครั้ง 24 x 2 = 48, 48 x 2 = 96, 96 x 2 = 192",
      en: "Each term doubles: 24 x 2 = 48, 48 x 2 = 96, 96 x 2 = 192.",
    },
    answer: {
      kind: "text",
      accepted: ["48, 96, 192", "48,96,192", "48 96 192"],
      placeholder: "48, 96, 192",
    },
  },
  {
    id: "ns-h-01",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [2, 3, 5, 7, 11, 13, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "เป็นจำนวนเฉพาะเรียงตามลำดับ 2, 3, 5, 7, 11, 13 จำนวนเฉพาะถัดไปคือ 17 เพราะ 14, 15, 16 หารลงตัวด้วยตัวอื่น",
      en: "These are the primes in order: 2, 3, 5, 7, 11, 13. The next prime is 17, since 14, 15 and 16 all have smaller divisors.",
    },
    answer: { kind: "text", accepted: ["17"] },
  },
  {
    id: "ns-h-02",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [5, 100, 10, 90, 15, 80, null, null],
    prompt: {
      th: "เลขสองตัวถัดไปคือเลขอะไร (ตอบคั่นด้วยจุลภาค)",
      en: "What are the next two numbers? (separate with commas)",
    },
    explanation: {
      th: "เป็นสองลำดับสลับกัน ตำแหน่งคี่คือ 5, 10, 15 เพิ่มทีละ 5 จึงได้ 20 และตำแหน่งคู่คือ 100, 90, 80 ลดทีละ 10 จึงได้ 70",
      en: "Two interleaved sequences: the odd positions 5, 10, 15 rise by 5 giving 20, and the even positions 100, 90, 80 fall by 10 giving 70.",
    },
    answer: {
      kind: "text",
      accepted: ["20, 70", "20,70", "20 70"],
      placeholder: "20, 70",
    },
  },
  {
    id: "ns-h-03",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [1, 2, 6, 24, 120, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "เป็นแฟกทอเรียล คือคูณด้วยลำดับที่เพิ่มขึ้น 1 x 2 = 2, 2 x 3 = 6, 6 x 4 = 24, 24 x 5 = 120 ดังนั้น 120 x 6 = 720",
      en: "Factorials, each term multiplied by the next counter: 1 x 2 = 2, 2 x 3 = 6, 6 x 4 = 24, 24 x 5 = 120, so 120 x 6 = 720.",
    },
    answer: { kind: "choice", choices: ["600", "720", "840", "5040"], correctIndex: 1 },
  },
  {
    id: "ns-h-04",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [1, 5, 12, 22, 35, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "ผลต่างคือ 4, 7, 10, 13 ซึ่งเพิ่มขึ้นทีละ 3 (ผลต่างของผลต่างคงที่) ผลต่างถัดไปคือ 16 ได้ 35 + 16 = 51",
      en: "The differences are 4, 7, 10, 13 and they grow by a constant 3 (a constant second difference). The next difference is 16, so 35 + 16 = 51.",
    },
    answer: { kind: "text", accepted: ["51"] },
  },
  {
    id: "ns-h-05",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [4, 5, 7, 11, 19, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "กฎคือคูณ 2 แล้วลบ 3 คือ 4 x 2 - 3 = 5, 5 x 2 - 3 = 7, 7 x 2 - 3 = 11, 11 x 2 - 3 = 19 ดังนั้น 19 x 2 - 3 = 35",
      en: "The rule is previous x 2 - 3: 4 x 2 - 3 = 5, 5 x 2 - 3 = 7, 7 x 2 - 3 = 11, 11 x 2 - 3 = 19, so 19 x 2 - 3 = 35.",
    },
    answer: { kind: "text", accepted: ["35"] },
  },
  {
    id: "ns-h-06",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [1, 10, 3, 20, 9, 30, null, null],
    prompt: {
      th: "เลขสองตัวถัดไปคือเลขอะไร (ตอบคั่นด้วยจุลภาค)",
      en: "What are the next two numbers? (separate with commas)",
    },
    explanation: {
      th: "สองลำดับสลับกัน ตำแหน่งคี่คือ 1, 3, 9 คูณ 3 จึงได้ 27 และตำแหน่งคู่คือ 10, 20, 30 บวก 10 จึงได้ 40",
      en: "Two interleaved sequences: the odd positions 1, 3, 9 multiply by 3 giving 27, and the even positions 10, 20, 30 add 10 giving 40.",
    },
    answer: {
      kind: "text",
      accepted: ["27, 40", "27,40", "27 40"],
      placeholder: "27, 40",
    },
  },
  {
    id: "ns-h-07",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [12, 15, 21, 24, 30, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "แต่ละตัวคือตัวก่อนหน้าบวกผลบวกของเลขโดด 12 + 3 = 15, 15 + 6 = 21, 21 + 3 = 24, 24 + 6 = 30 ดังนั้น 30 + 3 = 33",
      en: "Each term adds the digit sum of the previous term: 12 + 3 = 15, 15 + 6 = 21, 21 + 3 = 24, 24 + 6 = 30, so 30 + 3 = 33.",
    },
    answer: { kind: "choice", choices: ["33", "34", "36", "39"], correctIndex: 0 },
  },
  {
    id: "ns-h-08",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [4, 9, 25, 49, 121, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "เป็นกำลังสองของจำนวนเฉพาะ 2, 3, 5, 7, 11 จำนวนเฉพาะถัดไปคือ 13 ได้ 13 x 13 = 169",
      en: "These are squares of the primes 2, 3, 5, 7, 11. The next prime is 13, so 13 x 13 = 169.",
    },
    answer: { kind: "text", accepted: ["169"] },
  },
  {
    id: "ns-h-09",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [3, 6, 18, 72, 360, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "ตัวคูณเพิ่มขึ้นทีละหนึ่งแบบแฟกทอเรียล 3 x 2 = 6, 6 x 3 = 18, 18 x 4 = 72, 72 x 5 = 360 ดังนั้น 360 x 6 = 2160",
      en: "The multiplier grows by one each step, factorial style: 3 x 2 = 6, 6 x 3 = 18, 18 x 4 = 72, 72 x 5 = 360, so 360 x 6 = 2160.",
    },
    answer: { kind: "choice", choices: ["1080", "1800", "2160", "2520"], correctIndex: 2 },
  },
  {
    id: "ns-h-10",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [1, 2, 5, 12, 27, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "สูตรตามลำดับที่ n คือ สองยกกำลัง n ลบ n ได้ 2-1=1, 4-2=2, 8-3=5, 16-4=12, 32-5=27 ตัวถัดไปคือ 64 - 6 = 58",
      en: "The term at index n is 2 to the power n minus n: 2-1=1, 4-2=2, 8-3=5, 16-4=12, 32-5=27, so the next is 64 - 6 = 58.",
    },
    answer: { kind: "text", accepted: ["58"] },
  },
  {
    id: "ns-h-11",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [3, 4, 8, 17, 33, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "ผลต่างคือ 1, 4, 9, 16 ซึ่งเป็นกำลังสองของ 1, 2, 3, 4 ผลต่างถัดไปคือ 25 ได้ 33 + 25 = 58",
      en: "The differences are 1, 4, 9, 16, the squares of 1, 2, 3, 4. The next difference is 25, so 33 + 25 = 58.",
    },
    answer: { kind: "choice", choices: ["49", "52", "55", "58"], correctIndex: 3 },
  },
  {
    id: "ns-h-12",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [2, 3, 5, 9, 17, null, null, null],
    prompt: {
      th: "เลขสามตัวถัดไปคือเลขอะไร (ตอบคั่นด้วยจุลภาค)",
      en: "What are the next three numbers? (separate with commas)",
    },
    explanation: {
      th: "กฎคือคูณ 2 แล้วลบ 1 คือ 2 x 2 - 1 = 3, 3 x 2 - 1 = 5, 5 x 2 - 1 = 9, 9 x 2 - 1 = 17 ต่อไปได้ 33, 65 และ 129",
      en: "The rule is previous x 2 - 1: 2 x 2 - 1 = 3, 3 x 2 - 1 = 5, 5 x 2 - 1 = 9, 9 x 2 - 1 = 17, then 33, 65 and 129.",
    },
    answer: {
      kind: "text",
      accepted: ["33, 65, 129", "33,65,129", "33 65 129"],
      placeholder: "33, 65, 129",
    },
  },
  {
    id: "ns-e-13",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [8, 16, 24, 32, 40, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "เป็นสูตรคูณของ 8 คือบวก 8 ทุกครั้ง 8, 16, 24, 32, 40 ดังนั้น 40 + 8 = 48",
      en: "Multiples of 8, so each step adds 8: 8, 16, 24, 32, 40, therefore 40 + 8 = 48.",
    },
    answer: { kind: "text", accepted: ["48"], placeholder: "48" },
  },
  {
    id: "ns-e-14",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [100, 91, 82, 73, null, 55],
    prompt: {
      th: "เลขที่หายไปในช่องว่างคือเลขอะไร",
      en: "Which number is missing from the blank?",
    },
    explanation: {
      th: "ลดลง 9 ทุกครั้ง 100, 91, 82, 73 แล้ว 73 - 9 = 64 และ 64 - 9 = 55 ตรงกับตัวสุดท้าย",
      en: "Each step subtracts 9: 100, 91, 82, 73, then 73 - 9 = 64, and 64 - 9 = 55 matches the last term.",
    },
    answer: { kind: "choice", choices: ["62", "63", "64", "66"], correctIndex: 2 },
  },
  {
    id: "ns-e-15",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [10, 20, 18, 28, 26, 36, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "สลับกันบวก 10 แล้วลบ 2 คือ 10 + 10 = 20, 20 - 2 = 18, 18 + 10 = 28, 28 - 2 = 26, 26 + 10 = 36 ดังนั้นรอบนี้ต้องลบ 2 ได้ 36 - 2 = 34",
      en: "The steps alternate + 10 then - 2: 10 + 10 = 20, 20 - 2 = 18, 18 + 10 = 28, 28 - 2 = 26, 26 + 10 = 36, so the next step subtracts 2: 36 - 2 = 34.",
    },
    answer: { kind: "choice", choices: ["32", "34", "38", "46"], correctIndex: 1 },
  },
  {
    id: "ns-e-16",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [1, 4, 9, 16, 25, null, 49],
    prompt: {
      th: "เลขที่หายไปในช่องว่างคือเลขอะไร",
      en: "Which number is missing from the blank?",
    },
    explanation: {
      th: "เป็นกำลังสองของจำนวนนับ 1, 4, 9, 16, 25 คือ 1 ถึง 5 ยกกำลังสอง ช่องว่างคือ 6 x 6 = 36 และตัวสุดท้าย 7 x 7 = 49",
      en: "Perfect squares: 1, 4, 9, 16, 25 are 1 to 5 squared, so the blank is 6 x 6 = 36 and the last term is 7 x 7 = 49.",
    },
    answer: { kind: "text", accepted: ["36"] },
  },
  {
    id: "ns-e-17",
    type: "number-sequence",
    difficulty: "easy",
    sequence: [3, 7, 11, 15, 19, null, null],
    prompt: {
      th: "เลขสองตัวถัดไปคือเลขอะไร (ตอบคั่นด้วยจุลภาค)",
      en: "What are the next two numbers? (separate with commas)",
    },
    explanation: {
      th: "ผลต่างคงที่เท่ากับ 4 ทุกช่วง 19 + 4 = 23 และ 23 + 4 = 27",
      en: "The common difference is 4: 19 + 4 = 23, and 23 + 4 = 27.",
    },
    answer: {
      kind: "text",
      accepted: ["23, 27", "23,27", "23 27"],
      placeholder: "23, 27",
    },
  },
  {
    id: "ns-m-13",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [2, 4, 8, 14, 22, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "ผลต่างคือ 2, 4, 6, 8 ซึ่งเพิ่มขึ้นทีละ 2 (ไม่ใช่การคูณ 2 เพราะ 8 ไป 14 ไม่ใช่การคูณ) ผลต่างถัดไปคือ 10 ได้ 22 + 10 = 32",
      en: "The differences are 2, 4, 6, 8 and grow by 2 each time (it is not doubling, since 8 to 14 is not a doubling). The next difference is 10, so 22 + 10 = 32.",
    },
    answer: { kind: "text", accepted: ["32"] },
  },
  {
    id: "ns-m-14",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [1, 100, 2, 95, 4, 90, 8, null],
    prompt: {
      th: "เลขที่หายไปในช่องว่างคือเลขอะไร",
      en: "Which number is missing from the blank?",
    },
    explanation: {
      th: "เป็นสองลำดับสลับกัน ตำแหน่งคี่คือ 1, 2, 4, 8 คูณ 2 ทุกครั้ง และตำแหน่งคู่คือ 100, 95, 90 ลดทีละ 5 ช่องว่างอยู่ตำแหน่งคู่ จึงได้ 90 - 5 = 85",
      en: "Two interleaved sequences: the odd positions 1, 2, 4, 8 double each time, and the even positions 100, 95, 90 fall by 5. The blank sits in an even position, so it is 90 - 5 = 85.",
    },
    answer: { kind: "choice", choices: ["16", "80", "84", "85"], correctIndex: 3 },
  },
  {
    id: "ns-m-15",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [1, 5, 17, 53, 161, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "แต่ละตัวคือตัวก่อนหน้าคูณ 3 แล้วบวก 2 คือ 1 x 3 + 2 = 5, 5 x 3 + 2 = 17, 17 x 3 + 2 = 53, 53 x 3 + 2 = 161 ดังนั้น 161 x 3 + 2 = 485",
      en: "Each term is previous x 3 + 2: 1 x 3 + 2 = 5, 5 x 3 + 2 = 17, 17 x 3 + 2 = 53, 53 x 3 + 2 = 161, so 161 x 3 + 2 = 485.",
    },
    answer: { kind: "text", accepted: ["485"] },
  },
  {
    id: "ns-m-16",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [5, 15, 12, 36, 33, 99, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "สลับกันคูณ 3 แล้วลบ 3 คือ 5 x 3 = 15, 15 - 3 = 12, 12 x 3 = 36, 36 - 3 = 33, 33 x 3 = 99 ดังนั้นรอบนี้ต้องลบ 3 ได้ 99 - 3 = 96",
      en: "The rule alternates x 3 then - 3: 5 x 3 = 15, 15 - 3 = 12, 12 x 3 = 36, 36 - 3 = 33, 33 x 3 = 99, so the next step subtracts 3: 99 - 3 = 96.",
    },
    answer: { kind: "choice", choices: ["96", "102", "132", "297"], correctIndex: 0 },
  },
  {
    id: "ns-m-17",
    type: "number-sequence",
    difficulty: "medium",
    sequence: [11, 13, 17, 19, 23, 29, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "เป็นจำนวนเฉพาะเรียงตามลำดับตั้งแต่ 11 คือ 11, 13, 17, 19, 23, 29 จำนวนเฉพาะถัดไปคือ 31 เพราะ 30 หารด้วย 2 ลงตัว",
      en: "These are the primes in order starting at 11: 11, 13, 17, 19, 23, 29. The next prime is 31, since 30 is divisible by 2.",
    },
    answer: { kind: "choice", choices: ["27", "31", "33", "35"], correctIndex: 1 },
  },
  {
    id: "ns-h-13",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [2, 5, 12, 29, 70, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "แต่ละตัวคือสองเท่าของตัวก่อนหน้าบวกตัวก่อนหน้าอีกหนึ่งตัว คือ 2 x 5 + 2 = 12, 2 x 12 + 5 = 29, 2 x 29 + 12 = 70 ดังนั้น 2 x 70 + 29 = 169",
      en: "Each term is twice the previous term plus the one before that: 2 x 5 + 2 = 12, 2 x 12 + 5 = 29, 2 x 29 + 12 = 70, so 2 x 70 + 29 = 169.",
    },
    answer: { kind: "text", accepted: ["169"] },
  },
  {
    id: "ns-h-14",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [12, 21, 23, 32, 34, 43, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "สลับกันสองขั้น ขั้นแรกสลับตำแหน่งเลขโดด ขั้นที่สองบวก 2 คือ 12 กลับเป็น 21, 21 + 2 = 23, 23 กลับเป็น 32, 32 + 2 = 34, 34 กลับเป็น 43 ดังนั้นรอบนี้ต้องบวก 2 ได้ 43 + 2 = 45",
      en: "Two steps alternate: first reverse the digits, then add 2. 12 reversed is 21, 21 + 2 = 23, 23 reversed is 32, 32 + 2 = 34, 34 reversed is 43, so the next step adds 2: 43 + 2 = 45.",
    },
    answer: { kind: "choice", choices: ["34", "44", "45", "52"], correctIndex: 2 },
  },
  {
    id: "ns-h-15",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [12, 14, 18, 26, 38, 62, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "แต่ละตัวคือตัวก่อนหน้าบวกผลคูณของเลขโดดในตัวก่อนหน้า คือ 12 + (1 x 2) = 14, 14 + (1 x 4) = 18, 18 + (1 x 8) = 26, 26 + (2 x 6) = 38, 38 + (3 x 8) = 62 ดังนั้น 62 + (6 x 2) = 74",
      en: "Each term adds the product of the digits of the previous term: 12 + (1 x 2) = 14, 14 + (1 x 4) = 18, 18 + (1 x 8) = 26, 26 + (2 x 6) = 38, 38 + (3 x 8) = 62, so 62 + (6 x 2) = 74.",
    },
    answer: { kind: "text", accepted: ["74"] },
  },
  {
    id: "ns-h-16",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [1, 4, 27, 256, 3125, null],
    prompt: {
      th: "เลขถัดไปของลำดับนี้คือเลขอะไร",
      en: "What is the next number in the sequence?",
    },
    explanation: {
      th: "ตัวที่ n คือ n ยกกำลัง n คือ 1 ยกกำลัง 1 = 1, 2 ยกกำลัง 2 = 4, 3 ยกกำลัง 3 = 27, 4 ยกกำลัง 4 = 256, 5 ยกกำลัง 5 = 3125 ดังนั้นตัวที่ 6 คือ 6 ยกกำลัง 6 = 46656",
      en: "The term at position n is n to the power n: 1^1 = 1, 2^2 = 4, 3^3 = 27, 4^4 = 256, 5^5 = 3125, so the sixth term is 6^6 = 46656.",
    },
    answer: {
      kind: "choice",
      choices: ["7776", "15625", "32768", "46656"],
      correctIndex: 3,
    },
  },
  {
    id: "ns-h-17",
    type: "number-sequence",
    difficulty: "hard",
    sequence: [1, 1, 2, 3, 5, null, 13, 21, null],
    prompt: {
      th: "เลขที่หายไปในช่องว่างทั้งสองคือเลขอะไร (ตอบตามลำดับ คั่นด้วยจุลภาค)",
      en: "Which numbers fill the two blanks? (answer in order, separated by a comma)",
    },
    explanation: {
      th: "เป็นลำดับฟีโบนักชี แต่ละตัวเท่ากับผลบวกของสองตัวก่อนหน้า ช่องว่างแรกคือ 3 + 5 = 8 (และ 5 + 8 = 13 ตรงกับตัวถัดไป) ช่องว่างสุดท้ายคือ 13 + 21 = 34",
      en: "This is the Fibonacci sequence, where each term is the sum of the two before it. The first blank is 3 + 5 = 8 (and 5 + 8 = 13 matches the next term), and the last blank is 13 + 21 = 34.",
    },
    answer: {
      kind: "text",
      accepted: ["8, 34", "8,34", "8 34"],
      placeholder: "8, 34",
    },
  },
];
