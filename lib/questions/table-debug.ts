import type { TableDebugQuestion } from "../types";

/** Wrong-cell-in-table debugging. Ids: td-e-01.., td-m-01.., td-h-01.. */
export const tableDebugQuestions: TableDebugQuestion[] = [
  {
    id: "td-e-01",
    type: "table-debug",
    difficulty: "easy",
    language: "javascript",
    code: `let sum = 0;
for (let i = 1; i <= 4; i++) {
  sum += i;
}`,
    table: {
      caption: {
        th: "ค่าของ sum หลังจบแต่ละรอบ",
        en: "Value of sum after each iteration",
      },
      headers: [{ th: "รอบที่", en: "Iteration" }, "i", "sum"],
      rows: [
        ["1", "1", "1"],
        ["2", "2", "3"],
        ["3", "3", "7"],
        ["4", "4", "10"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but exactly one cell holds a wrong value. Select that cell and type the correct value.",
    },
    explanation: {
      th: "รอบที่ 3 เริ่มจาก sum = 3 แล้วบวก i = 3 ได้ 6 ไม่ใช่ 7 (ลำดับที่ถูกคือ 1, 3, 6, 10)",
      en: "Iteration 3 starts with sum = 3 and adds i = 3, giving 6 rather than 7. The correct running totals are 1, 3, 6, 10.",
    },
    answer: { kind: "cell", cellId: "r2c2", correctValue: "6" },
  },
  {
    id: "td-e-02",
    type: "table-debug",
    difficulty: "easy",
    language: "python",
    code: `total = 0
for n in [5, 3, 8]:
    total = total + n`,
    table: {
      caption: {
        th: "ค่าสะสมของ total",
        en: "Running value of total",
      },
      headers: ["n", "total"],
      rows: [
        ["5", "5"],
        ["3", "8"],
        ["8", "11"],
      ],
    },
    prompt: {
      th: "หาช่องที่ค่าผิดในตารางร่องรอยการทำงานนี้ แล้วกรอกค่าที่ถูกต้อง",
      en: "Find the cell with the wrong value in this trace table, then type the correct value.",
    },
    explanation: {
      th: "แถวสุดท้ายเริ่มจาก total = 8 แล้วบวก n = 8 ได้ 16 ค่า 11 มาจากการเอา 3 + 8 ซึ่งลืมค่าสะสมเดิม",
      en: "The last row starts from total = 8 and adds n = 8, so total is 16. The value 11 comes from 3 + 8, ignoring the accumulated total.",
    },
    answer: { kind: "cell", cellId: "r2c1", correctValue: "16" },
  },
  {
    id: "td-e-03",
    type: "table-debug",
    difficulty: "easy",
    language: "javascript",
    code: `let p = 1;
for (let i = 1; i <= 4; i++) {
  p *= i;
}`,
    table: {
      caption: {
        th: "ค่า p หลังคูณในแต่ละรอบ",
        en: "Value of p after each multiplication",
      },
      headers: ["i", "p"],
      rows: [
        ["1", "1"],
        ["2", "2"],
        ["3", "6"],
        ["4", "12"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรเป็นร่องรอยของโค้ด มีค่าผิดอยู่หนึ่งช่อง เลือกและแก้ให้ถูก",
      en: "This table is meant to be the trace of the code. One value is wrong. Select it and give the correct value.",
    },
    explanation: {
      th: "รอบที่ 4 คือ p = 6 * 4 = 24 ค่า 12 เท่ากับ 6 * 2 ซึ่งใช้ตัวคูณผิด",
      en: "Iteration 4 computes p = 6 * 4 = 24. The value 12 equals 6 * 2, using the wrong multiplier.",
    },
    answer: { kind: "cell", cellId: "r3c1", correctValue: "24" },
  },
  {
    id: "td-e-04",
    type: "table-debug",
    difficulty: "easy",
    language: "java",
    code: `int n = 10;
int steps = 0;
while (n > 0) {
    n = n - 3;
    steps = steps + 1;
}`,
    table: {
      caption: {
        th: "สถานะหลังจบแต่ละรอบของ while",
        en: "State after each pass of the while loop",
      },
      headers: [{ th: "รอบที่", en: "Pass" }, "n", "steps"],
      rows: [
        ["1", "7", "1"],
        ["2", "4", "2"],
        ["3", "1", "3"],
        ["4", "0", "4"],
      ],
    },
    prompt: {
      th: "มีหนึ่งช่องในตารางที่ไม่ตรงกับโค้ด เลือกช่องนั้นแล้วกรอกค่าที่ถูกต้อง",
      en: "One cell in the table does not match the code. Select it and type the correct value.",
    },
    explanation: {
      th: "รอบที่ 4 เข้าเงื่อนไขเพราะ n = 1 ยังมากกว่า 0 แล้วลบ 3 ได้ n = -2 ลูปจึงหยุดเพราะค่าติดลบ ไม่ใช่เพราะพอดี 0",
      en: "Pass 4 runs because n = 1 is still greater than 0, and 1 - 3 gives n = -2. The loop stops on a negative value, not exactly 0.",
    },
    answer: { kind: "cell", cellId: "r3c1", correctValue: "-2" },
  },
  {
    id: "td-e-05",
    type: "table-debug",
    difficulty: "easy",
    language: "pseudo",
    code: `SET x TO 3
FOR i FROM 1 TO 4
    SET x TO x * 2
END FOR`,
    table: {
      caption: {
        th: "ค่า x หลังจบแต่ละรอบ",
        en: "Value of x after each round",
      },
      headers: ["i", "x"],
      rows: [
        ["1", "6"],
        ["2", "12"],
        ["3", "24"],
        ["4", "36"],
      ],
    },
    prompt: {
      th: "ตารางควรตรงกับรหัสเทียม มีหนึ่งช่องที่ผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "The table should agree with the pseudo code. One cell is wrong. Select it and give the correct value.",
    },
    explanation: {
      th: "รอบที่ 4 คือ x = 24 * 2 = 48 ค่า 36 มาจากการบวกเพิ่ม 12 แทนการคูณสอง",
      en: "Round 4 computes x = 24 * 2 = 48. The value 36 comes from adding 12 instead of doubling.",
    },
    answer: { kind: "cell", cellId: "r3c1", correctValue: "48" },
  },
  {
    id: "td-e-06",
    type: "table-debug",
    difficulty: "easy",
    language: "python",
    code: `words = ['cat', 'bird', 'ox']
count = 0
for w in words:
    count += len(w)`,
    table: {
      caption: {
        th: "ความยาวของแต่ละคำและผลรวมสะสม",
        en: "Length of each word and the running total",
      },
      headers: ["w", "len(w)", "count"],
      rows: [
        ["cat", "3", "3"],
        ["bird", "4", "4"],
        ["ox", "2", "9"],
      ],
    },
    prompt: {
      th: "มีค่าผิดหนึ่งช่องในตารางนี้ เลือกช่องนั้นแล้วเติมค่าที่ถูกต้อง",
      en: "Exactly one value in this table is wrong. Select that cell and fill in the correct value.",
    },
    explanation: {
      th: "แถว bird ต้องบวกทับค่าเดิม count = 3 + 4 = 7 ค่า 4 คือความยาวของคำเดียวโดยไม่รวมค่าสะสม",
      en: "The bird row adds onto the previous total: count = 3 + 4 = 7. The value 4 is just the word length with the accumulator ignored.",
    },
    answer: { kind: "cell", cellId: "r1c2", correctValue: "7" },
  },
  {
    id: "td-e-07",
    type: "table-debug",
    difficulty: "easy",
    language: "javascript",
    code: `const nums = [4, 9, 2, 7];
let max = nums[0];
for (let i = 1; i < nums.length; i++) {
  if (nums[i] > max) max = nums[i];
}`,
    table: {
      caption: {
        th: "ค่า max หลังตรวจแต่ละสมาชิก",
        en: "Value of max after checking each element",
      },
      headers: ["i", "nums[i]", "max"],
      rows: [
        ["1", "9", "9"],
        ["2", "2", "9"],
        ["3", "7", "7"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match how the code runs, but one cell is wrong. Select it and type the correct value.",
    },
    explanation: {
      th: "แถวสุดท้าย nums[3] = 7 ไม่มากกว่า max = 9 จึงไม่มีการแทนค่า max ยังเป็น 9",
      en: "In the last row nums[3] = 7 is not greater than max = 9, so no assignment happens and max stays 9.",
    },
    answer: { kind: "cell", cellId: "r2c2", correctValue: "9" },
  },
  {
    id: "td-e-08",
    type: "table-debug",
    difficulty: "easy",
    language: "java",
    code: `int sum = 0;
for (int i = 1; i <= 4; i++) {
    if (i % 2 == 0) {
        sum += i;
    }
}`,
    table: {
      caption: {
        th: "ผลของเงื่อนไขและค่า sum ในแต่ละรอบ",
        en: "Condition result and sum for each iteration",
      },
      headers: ["i", "i % 2 == 0", "sum"],
      rows: [
        ["1", "false", "0"],
        ["2", "true", "2"],
        ["3", "false", "5"],
        ["4", "true", "6"],
      ],
    },
    prompt: {
      th: "หาช่องที่ค่าไม่ถูกต้องในตาราง แล้วกรอกค่าที่ควรจะเป็น",
      en: "Find the cell holding an incorrect value, then enter what it should be.",
    },
    explanation: {
      th: "เมื่อ i = 3 เงื่อนไขเป็น false จึงไม่บวกอะไรเลย sum ยังเท่ากับ 2 ค่า 5 คือการบวก 3 เข้าไปทั้งที่เงื่อนไขไม่ผ่าน",
      en: "When i = 3 the condition is false, so nothing is added and sum stays 2. The value 5 wrongly adds 3 even though the condition failed.",
    },
    answer: { kind: "cell", cellId: "r2c2", correctValue: "2" },
  },
  {
    id: "td-e-09",
    type: "table-debug",
    difficulty: "easy",
    language: "pseudo",
    code: `SET stock TO 20
FOR EACH order IN [4, 6, 3]
    SET stock TO stock - order
END FOR`,
    table: {
      caption: {
        th: "สินค้าคงเหลือหลังตัดแต่ละคำสั่งซื้อ",
        en: "Stock left after each order",
      },
      headers: [{ th: "คำสั่งซื้อ", en: "order" }, "stock"],
      rows: [
        ["4", "16"],
        ["6", "14"],
        ["3", "7"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับรหัสเทียม มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should follow the pseudo code. One cell has a wrong value. Select it and type the correct value.",
    },
    explanation: {
      th: "แถวที่สองต้องตัดจากยอดคงเหลือใหม่ 16 - 6 = 10 ค่า 14 มาจากการตัดจากยอดตั้งต้น 20 - 6",
      en: "The second row subtracts from the updated stock: 16 - 6 = 10. The value 14 subtracts from the original 20 instead.",
    },
    answer: { kind: "cell", cellId: "r1c1", correctValue: "10" },
  },
  {
    id: "td-e-10",
    type: "table-debug",
    difficulty: "easy",
    language: "javascript",
    code: `const s = "data";
let count = 0;
for (const ch of s) {
  if (ch === "a") count++;
}`,
    table: {
      caption: {
        th: "การนับตัวอักษร a",
        en: "Counting the letter a",
      },
      headers: ["ch", 'ch === "a"', "count"],
      rows: [
        ["d", "false", "0"],
        ["a", "true", "1"],
        ["t", "false", "2"],
        ["a", "true", "2"],
      ],
    },
    prompt: {
      th: "มีเพียงหนึ่งช่องที่ค่าไม่ถูก เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "Only one cell is incorrect. Select it and type the correct value.",
    },
    explanation: {
      th: "ตัวอักษร t ไม่ใช่ a จึงไม่เพิ่ม count ค่ายังเป็น 1 แล้วจะขึ้นเป็น 2 ที่ตัว a ตัวที่สอง",
      en: "The letter t is not a, so count is not incremented and stays 1. It only reaches 2 at the second a.",
    },
    answer: { kind: "cell", cellId: "r2c2", correctValue: "1" },
  },
  {
    id: "td-e-11",
    type: "table-debug",
    difficulty: "easy",
    language: "pseudo",
    code: `SET prev TO 0
FOR EACH t IN [10, 14, 9]
    SET diff TO t - prev
    SET prev TO t
END FOR`,
    table: {
      caption: {
        th: "ผลต่างจากค่าก่อนหน้า",
        en: "Difference from the previous value",
      },
      headers: ["t", "diff", "prev"],
      rows: [
        ["10", "10", "10"],
        ["14", "4", "14"],
        ["9", "5", "9"],
      ],
    },
    prompt: {
      th: "หาช่องเดียวที่ค่าผิดในตารางนี้ แล้วเติมค่าที่ถูกต้อง",
      en: "Find the single cell with the wrong value in this table and supply the correct one.",
    },
    explanation: {
      th: "แถวสุดท้าย diff = t - prev = 9 - 14 = -5 ค่า 5 คือการสลับที่ตัวตั้งกับตัวลบ",
      en: "In the last row diff = t - prev = 9 - 14 = -5. The value 5 comes from swapping the operands.",
    },
    answer: { kind: "cell", cellId: "r2c1", correctValue: "-5" },
  },
  {
    id: "td-e-12",
    type: "table-debug",
    difficulty: "easy",
    language: "java",
    code: `String out = "";
for (int i = 3; i >= 1; i--) {
    out = out + i;
}`,
    table: {
      caption: {
        th: "สตริง out หลังต่อค่าในแต่ละรอบ",
        en: "The string out after each concatenation",
      },
      headers: ["i", "out"],
      rows: [
        ["3", "3"],
        ["2", "123"],
        ["1", "321"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับโค้ด มีค่าผิดหนึ่งช่อง เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code. One value is wrong. Select the cell and type the correct value.",
    },
    explanation: {
      th: "โค้ดต่อ i ไว้ท้ายสตริงเดิม จาก 3 เป็น 3 แล้วต่อ 2 ได้ 32 ค่า 123 คือการต่อไว้ด้านหน้าและเรียงผิดทาง",
      en: "The code appends i to the end, so 3 becomes 32 after appending 2. The value 123 comes from prepending in the wrong order.",
    },
    answer: { kind: "cell", cellId: "r1c1", correctValue: "32" },
  },
  {
    id: "td-m-01",
    type: "table-debug",
    difficulty: "medium",
    language: "python",
    code: `n = 4726
digit_sum = 0
while n > 0:
    digit_sum += n % 10
    n = n // 10`,
    table: {
      caption: {
        th: "การถอดหลักและผลรวมของเลขโดด",
        en: "Peeling digits and summing them",
      },
      headers: [{ th: "รอบที่", en: "Step" }, "n % 10", "digit_sum", "n // 10"],
      rows: [
        ["1", "6", "6", "472"],
        ["2", "2", "2", "47"],
        ["3", "7", "15", "4"],
        ["4", "4", "19", "0"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but one cell holds a wrong value. Select it and type the correct value.",
    },
    explanation: {
      th: "รอบที่ 2 หลักที่ได้คือ 2 และ digit_sum ต้องสะสมต่อจาก 6 เป็น 6 + 2 = 8 ค่า 2 คือการเขียนแค่เลขโดดของรอบนั้น",
      en: "In step 2 the digit is 2, and digit_sum accumulates from 6 to 6 + 2 = 8. The value 2 only records that step's digit.",
    },
    answer: { kind: "cell", cellId: "r1c2", correctValue: "8" },
  },
  {
    id: "td-m-02",
    type: "table-debug",
    difficulty: "medium",
    language: "javascript",
    code: `let count = 0;
for (let i = 1; i <= 4; i++) {
  for (let j = 1; j <= i; j++) {
    count++;
  }
}`,
    table: {
      caption: {
        th: "จำนวนรอบของลูปในและค่า count",
        en: "Inner loop runs and the value of count",
      },
      headers: ["i", { th: "รอบลูปใน", en: "inner runs" }, "count"],
      rows: [
        ["1", "1", "1"],
        ["2", "2", "3"],
        ["3", "3", "6"],
        ["4", "4", "9"],
      ],
    },
    prompt: {
      th: "หาช่องที่ค่าไม่ตรงกับโค้ด แล้วกรอกค่าที่ถูกต้อง",
      en: "Find the cell that does not agree with the code, then type the correct value.",
    },
    explanation: {
      th: "เมื่อ i = 4 ลูปในทำงาน 4 รอบ count = 6 + 4 = 10 ค่า 9 เหมือนบวกเพิ่มเพียง 3 รอบ",
      en: "When i = 4 the inner loop runs 4 times, so count = 6 + 4 = 10. The value 9 adds only 3 runs.",
    },
    answer: { kind: "cell", cellId: "r3c2", correctValue: "10" },
  },
  {
    id: "td-m-03",
    type: "table-debug",
    difficulty: "medium",
    language: "java",
    code: `int a = 1, b = 1;
for (int i = 1; i <= 4; i++) {
    int c = a + b;
    a = b;
    b = c;
}`,
    table: {
      caption: {
        th: "ค่าของ a และ b หลังจบแต่ละรอบ",
        en: "Values of a and b after each iteration",
      },
      headers: ["i", "c", "a", "b"],
      rows: [
        ["1", "2", "1", "2"],
        ["2", "3", "2", "3"],
        ["3", "5", "3", "5"],
        ["4", "8", "3", "8"],
      ],
    },
    prompt: {
      th: "ตารางร่องรอยนี้มีหนึ่งช่องที่ผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This trace table has exactly one wrong cell. Select it and enter the correct value.",
    },
    explanation: {
      th: "รอบที่ 4 เริ่มจาก a = 3, b = 5 ได้ c = 8 แล้ว a รับค่า b เดิมคือ 5 ค่า 3 คือค่า a ค้างจากรอบก่อน",
      en: "Iteration 4 starts with a = 3 and b = 5, so c = 8 and a takes the old b, which is 5. The value 3 is the stale a from the previous round.",
    },
    answer: { kind: "cell", cellId: "r3c2", correctValue: "5" },
  },
  {
    id: "td-m-04",
    type: "table-debug",
    difficulty: "medium",
    language: "python",
    code: `counts = [0, 0, 0]
for n in [7, 4, 9, 6, 5]:
    counts[n % 3] += 1`,
    table: {
      caption: {
        th: "การนับตามเศษหารสาม",
        en: "Bucketing by remainder mod 3",
      },
      headers: ["n", "n % 3", "counts"],
      rows: [
        ["7", "1", "[0, 1, 0]"],
        ["4", "1", "[1, 1, 0]"],
        ["9", "0", "[1, 2, 0]"],
        ["6", "0", "[2, 2, 0]"],
        ["5", "2", "[2, 2, 1]"],
      ],
    },
    prompt: {
      th: "มีหนึ่งช่องในตารางที่ไม่ตรงกับโค้ด เลือกช่องนั้นแล้วกรอกค่าที่ถูกต้อง",
      en: "One cell in the table does not match the code. Select it and type the correct value.",
    },
    explanation: {
      th: "4 % 3 = 1 จึงต้องเพิ่มช่อง index 1 ทำให้ได้ [0, 2, 0] ค่า [1, 1, 0] คือการเพิ่มผิดช่องไปที่ index 0",
      en: "4 % 3 = 1, so index 1 is incremented, giving [0, 2, 0]. The value [1, 1, 0] increments index 0 by mistake.",
    },
    answer: { kind: "cell", cellId: "r1c2", correctValue: "[0, 2, 0]" },
  },
  {
    id: "td-m-05",
    type: "table-debug",
    difficulty: "medium",
    language: "javascript",
    code: `let amount = 47;
const coins = [25, 10, 5, 1];
for (const c of coins) {
  const used = Math.floor(amount / c);
  amount = amount % c;
}`,
    table: {
      caption: {
        th: "การทอนเงิน 47 ด้วยเหรียญแต่ละชนิด",
        en: "Making change for 47 with each coin",
      },
      headers: [
        { th: "เหรียญ", en: "coin" },
        { th: "จำนวนที่ใช้", en: "used" },
        { th: "เงินที่เหลือ", en: "amount left" },
      ],
      rows: [
        ["25", "1", "22"],
        ["10", "2", "27"],
        ["5", "0", "2"],
        ["1", "2", "0"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but exactly one cell is wrong. Select it and type the correct value.",
    },
    explanation: {
      th: "แถวเหรียญ 10 ใช้ไป 2 เหรียญ และเงินที่เหลือคือ 22 % 10 = 2 ค่า 27 มาจากการนำ 47 ไปลบ 20 โดยไม่ใช้ยอดคงเหลือใหม่",
      en: "For the 10 coin, 2 are used and the leftover is 22 % 10 = 2. The value 27 comes from 47 - 20, ignoring the updated amount.",
    },
    answer: { kind: "cell", cellId: "r1c2", correctValue: "2" },
  },
  {
    id: "td-m-06",
    type: "table-debug",
    difficulty: "medium",
    language: "pseudo",
    code: `SET total TO 0
FOR i FROM 1 TO 4
    FOR j FROM 1 TO 2
        SET total TO total + i * j
    END FOR
END FOR`,
    table: {
      caption: {
        th: "ค่าที่บวกเพิ่มในแต่ละรอบของ i และผลรวมสะสม",
        en: "Amount added per i round and the running total",
      },
      headers: ["i", "i*1 + i*2", "total"],
      rows: [
        ["1", "3", "3"],
        ["2", "6", "9"],
        ["3", "9", "18"],
        ["4", "12", "27"],
      ],
    },
    prompt: {
      th: "หาช่องเดียวที่ค่าผิดในตารางนี้ แล้วกรอกค่าที่ถูกต้อง",
      en: "Locate the single wrong cell in this table and provide the correct value.",
    },
    explanation: {
      th: "รอบ i = 4 บวกเพิ่ม 4 + 8 = 12 ทำให้ total = 18 + 12 = 30 ค่า 27 คือการบวกเพิ่ม 9 ซึ่งเป็นค่าของรอบก่อน",
      en: "The i = 4 round adds 4 + 8 = 12, so total = 18 + 12 = 30. The value 27 adds 9, the previous round's amount.",
    },
    answer: { kind: "cell", cellId: "r3c2", correctValue: "30" },
  },
  {
    id: "td-m-07",
    type: "table-debug",
    difficulty: "medium",
    language: "java",
    code: `int n = 1;
int evens = 0, odds = 0;
while (n <= 5) {
    if (n % 2 == 0) evens++;
    else odds++;
    n = n + 1;
}`,
    table: {
      caption: {
        th: "จำนวนเลขคู่และเลขคี่ที่นับได้",
        en: "Counts of even and odd numbers seen",
      },
      headers: ["n", "evens", "odds"],
      rows: [
        ["1", "0", "1"],
        ["2", "1", "1"],
        ["3", "1", "2"],
        ["4", "2", "3"],
        ["5", "2", "3"],
      ],
    },
    prompt: {
      th: "มีค่าผิดหนึ่งช่องในตารางนี้ เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "One value in this table is wrong. Select the cell and type the correct value.",
    },
    explanation: {
      th: "เมื่อ n = 4 เป็นเลขคู่ evens เพิ่มเป็น 2 แต่ odds ยังเท่าเดิมคือ 2 แล้วจะขึ้นเป็น 3 ตอน n = 5",
      en: "When n = 4 the number is even, so evens becomes 2 while odds stays at 2. It only reaches 3 when n = 5.",
    },
    answer: { kind: "cell", cellId: "r3c2", correctValue: "2" },
  },
  {
    id: "td-m-08",
    type: "table-debug",
    difficulty: "medium",
    language: "python",
    code: `n = 22
bits = ''
while n > 0:
    bits = str(n % 2) + bits
    n = n // 2`,
    table: {
      caption: {
        th: "การแปลง 22 เป็นเลขฐานสอง",
        en: "Converting 22 to binary",
      },
      headers: [{ th: "n ก่อนรอบนี้", en: "n before" }, "n % 2", "bits", "n // 2"],
      rows: [
        ["22", "0", "0", "11"],
        ["11", "1", "01", "5"],
        ["5", "1", "110", "2"],
        ["2", "0", "0110", "1"],
        ["1", "1", "10110", "0"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This trace should follow the code, but one cell is wrong. Select it and type the correct value.",
    },
    explanation: {
      th: "โค้ดวางบิตใหม่ไว้หน้าสตริงเดิม รอบที่สองได้บิต 1 นำหน้า 0 จึงเป็น 10 ค่า 01 คือการต่อบิตไว้ท้ายสตริง",
      en: "The code puts the new bit in front of the existing string, so bit 1 in front of 0 gives 10. The value 01 appends the bit instead.",
    },
    answer: { kind: "cell", cellId: "r1c2", correctValue: "10" },
  },
  {
    id: "td-m-09",
    type: "table-debug",
    difficulty: "medium",
    language: "javascript",
    code: `const a = [5, 2, 9, 4, 1];
let min = a[0], max = a[0];
for (let i = 1; i < a.length; i++) {
  if (a[i] < min) min = a[i];
  if (a[i] > max) max = a[i];
}`,
    table: {
      caption: {
        th: "ค่า min และ max หลังตรวจแต่ละสมาชิก",
        en: "min and max after inspecting each element",
      },
      headers: ["i", "a[i]", "min", "max"],
      rows: [
        ["1", "2", "2", "5"],
        ["2", "9", "2", "9"],
        ["3", "4", "2", "9"],
        ["4", "1", "2", "9"],
      ],
    },
    prompt: {
      th: "มีหนึ่งช่องที่ค่าไม่ถูกต้อง เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "One cell holds an incorrect value. Select it and type the correct value.",
    },
    explanation: {
      th: "แถว i = 4 มี a[4] = 1 ซึ่งน้อยกว่า min = 2 จึงแทนค่า min เป็น 1 ค่า 2 คือค่า min ค้างจากรอบก่อน",
      en: "At i = 4, a[4] = 1 is smaller than min = 2, so min becomes 1. The value 2 is the stale min from the previous row.",
    },
    answer: { kind: "cell", cellId: "r3c2", correctValue: "1" },
  },
  {
    id: "td-m-10",
    type: "table-debug",
    difficulty: "medium",
    language: "java",
    code: `int[] a = {7, 8, 9, 10};
int sum = 0;
for (int i = 0; i < a.length; i++) {
    sum += a[i];
    System.out.println(sum / (i + 1));
}`,
    table: {
      caption: {
        th: "ผลรวมสะสมและค่าที่พิมพ์ออกมา",
        en: "Running sum and the printed value",
      },
      headers: ["i", "sum", "sum / (i + 1)"],
      rows: [
        ["0", "7", "7"],
        ["1", "15", "7"],
        ["2", "24", "8"],
        ["3", "34", "8.5"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับผลลัพธ์ของโค้ด มีหนึ่งช่องที่ผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code output, but one cell is wrong. Select it and type the correct value.",
    },
    explanation: {
      th: "sum และ i + 1 เป็น int การหารจึงเป็นการหารแบบตัดเศษ 34 / 4 = 8 ไม่ใช่ 8.5",
      en: "Both sum and i + 1 are ints, so the division truncates: 34 / 4 = 8, not 8.5.",
    },
    answer: { kind: "cell", cellId: "r3c2", correctValue: "8" },
  },
  {
    id: "td-m-11",
    type: "table-debug",
    difficulty: "medium",
    language: "python",
    code: `a = [4, 2, 7, 1, 3]
swaps = 0
for j in range(4):
    if a[j] > a[j + 1]:
        a[j], a[j + 1] = a[j + 1], a[j]
        swaps += 1`,
    table: {
      caption: {
        th: "หนึ่งรอบของการกวาดเปรียบเทียบคู่ที่อยู่ติดกัน",
        en: "One pass of adjacent comparisons",
      },
      headers: [
        "j",
        { th: "การเปรียบเทียบ", en: "comparison" },
        { th: "สลับหรือไม่", en: "swapped" },
        { th: "ลิสต์หลังรอบนี้", en: "list after" },
        "swaps",
      ],
      rows: [
        ["0", "4 > 2", "yes", "[2, 4, 7, 1, 3]", "1"],
        ["1", "4 > 7", "no", "[2, 4, 7, 1, 3]", "1"],
        ["2", "7 > 1", "yes", "[2, 4, 1, 7, 3]", "2"],
        ["3", "1 > 3", "yes", "[2, 4, 1, 3, 7]", "3"],
      ],
    },
    prompt: {
      th: "มีหนึ่งช่องในตารางที่ไม่ตรงกับโค้ด เลือกช่องนั้นแล้วกรอกค่าที่ถูกต้อง",
      en: "One cell does not agree with the code. Select it and enter the correct value.",
    },
    explanation: {
      th: "ก่อนรอบ j = 3 ลิสต์คือ [2, 4, 1, 7, 3] ดังนั้น a[3] = 7 และ a[4] = 3 การเปรียบเทียบจึงเป็น 7 > 3 ค่า 1 > 3 ใช้ตำแหน่งเก่าก่อนการสลับที่ j = 2",
      en: "Before j = 3 the list is [2, 4, 1, 7, 3], so a[3] = 7 and a[4] = 3 and the comparison is 7 > 3. Writing 1 > 3 uses positions from before the j = 2 swap.",
    },
    answer: { kind: "cell", cellId: "r3c1", correctValue: "7 > 3" },
  },
  {
    id: "td-m-12",
    type: "table-debug",
    difficulty: "medium",
    language: "javascript",
    code: `const out = [];
for (let i = 3; i <= 7; i++) {
  if (i % 3 === 0) out.push("F");
  else if (i % 2 === 0) out.push("E");
  else out.push(String(i));
}`,
    table: {
      caption: {
        th: "ค่าที่ถูก push ในแต่ละรอบ",
        en: "Value pushed on each iteration",
      },
      headers: ["i", "i % 3", "i % 2", { th: "ค่าที่ push", en: "pushed" }],
      rows: [
        ["3", "0", "1", "F"],
        ["4", "1", "0", "E"],
        ["5", "2", "1", "5"],
        ["6", "0", "0", "E"],
        ["7", "1", "1", "7"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but one cell is wrong. Select it and give the correct value.",
    },
    explanation: {
      th: "เมื่อ i = 6 เงื่อนไขแรก 6 % 3 === 0 เป็นจริงก่อน จึง push F และไม่ตรวจ else if ต่อ ค่า E มาจากการตรวจเงื่อนไขหารสองก่อน",
      en: "When i = 6 the first condition 6 % 3 === 0 is true, so F is pushed and the else if is never reached. The value E comes from testing the mod 2 branch first.",
    },
    answer: { kind: "cell", cellId: "r3c3", correctValue: "F" },
  },
  {
    id: "td-h-01",
    type: "table-debug",
    difficulty: "hard",
    language: "javascript",
    code: `const a = [5, 1, 4, 2];
for (let i = 0; i < a.length - 1; i++) {
  for (let j = 0; j < a.length - 1 - i; j++) {
    if (a[j] > a[j + 1]) {
      [a[j], a[j + 1]] = [a[j + 1], a[j]];
    }
  }
}`,
    table: {
      caption: {
        th: "ทุกการเปรียบเทียบของ bubble sort",
        en: "Every comparison performed by the bubble sort",
      },
      headers: [
        "i",
        "j",
        { th: "เปรียบเทียบ", en: "comparison" },
        { th: "สลับ", en: "swap" },
        { th: "อาร์เรย์หลังขั้นนี้", en: "array after" },
      ],
      rows: [
        ["0", "0", "5 > 1", "yes", "[1, 5, 4, 2]"],
        ["0", "1", "5 > 4", "yes", "[1, 4, 5, 2]"],
        ["0", "2", "5 > 2", "yes", "[1, 4, 5, 2]"],
        ["1", "0", "1 > 4", "no", "[1, 4, 2, 5]"],
        ["1", "1", "4 > 2", "yes", "[1, 2, 4, 5]"],
        ["2", "0", "1 > 2", "no", "[1, 2, 4, 5]"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but exactly one cell is wrong. Select it and type the correct value.",
    },
    explanation: {
      th: "ที่ i = 0, j = 2 อาร์เรย์คือ [1, 4, 5, 2] และ 5 > 2 เป็นจริง จึงสลับได้ [1, 4, 2, 5] ช่องนี้เขียนค่าเดิมไว้เหมือนไม่ได้สลับ ทั้งที่คอลัมน์ swap บอกว่า yes",
      en: "At i = 0, j = 2 the array is [1, 4, 5, 2] and 5 > 2 holds, so the swap produces [1, 4, 2, 5]. The cell repeats the pre-swap array even though the swap column says yes.",
    },
    answer: { kind: "cell", cellId: "r2c4", correctValue: "[1, 4, 2, 5]" },
  },
  {
    id: "td-h-02",
    type: "table-debug",
    difficulty: "hard",
    language: "python",
    code: `a = [3, 9, 2, 7, 5, 1]
for i in range(5):
    m = i
    for j in range(i + 1, 6):
        if a[j] < a[m]:
            m = j
    a[i], a[m] = a[m], a[i]`,
    table: {
      caption: {
        th: "แต่ละรอบของ selection sort",
        en: "Each pass of the selection sort",
      },
      headers: [
        "i",
        { th: "ดัชนีค่าน้อยสุด m", en: "min index m" },
        { th: "ค่าที่ตำแหน่ง m", en: "value at m" },
        { th: "อาร์เรย์หลังรอบนี้", en: "array after pass" },
      ],
      rows: [
        ["0", "5", "1", "[1, 9, 2, 7, 5, 3]"],
        ["1", "2", "2", "[1, 2, 9, 7, 5, 3]"],
        ["2", "4", "3", "[1, 2, 3, 7, 5, 9]"],
        ["3", "4", "5", "[1, 2, 3, 5, 7, 9]"],
        ["4", "4", "7", "[1, 2, 3, 5, 7, 9]"],
      ],
    },
    prompt: {
      th: "หาช่องเดียวที่ค่าไม่ตรงกับโค้ด แล้วกรอกค่าที่ถูกต้อง",
      en: "Find the single cell that does not agree with the code and supply the correct value.",
    },
    explanation: {
      th: "ก่อนรอบ i = 2 อาร์เรย์คือ [1, 2, 9, 7, 5, 3] ส่วนที่ยังไม่เรียงคือ 9, 7, 5, 3 ค่าน้อยสุดคือ 3 ซึ่งอยู่ที่ดัชนี 5 จึงได้ m = 5 (สอดคล้องกับคอลัมน์ค่าที่ตำแหน่ง m ที่เป็น 3) ดัชนี 4 เก็บค่า 5 ไม่ใช่ค่าน้อยสุด",
      en: "Before pass i = 2 the array is [1, 2, 9, 7, 5, 3]; the unsorted tail is 9, 7, 5, 3 and its minimum 3 sits at index 5, so m = 5, matching the value column showing 3. Index 4 holds 5, which is not the minimum.",
    },
    answer: { kind: "cell", cellId: "r2c1", correctValue: "5" },
  },
  {
    id: "td-h-03",
    type: "table-debug",
    difficulty: "hard",
    language: "java",
    code: `int[] a = {4, 3, 6, 1, 5, 2};
for (int i = 1; i < a.length; i++) {
    int key = a[i];
    int j = i - 1;
    while (j >= 0 && a[j] > key) {
        a[j + 1] = a[j];
        j--;
    }
    a[j + 1] = key;
}`,
    table: {
      caption: {
        th: "จำนวนการเลื่อนและอาร์เรย์หลังแทรกแต่ละตัว",
        en: "Shift count and array after each insertion",
      },
      headers: [
        "i",
        "key",
        { th: "จำนวนครั้งที่เลื่อน", en: "shifts" },
        { th: "อาร์เรย์หลังรอบนี้", en: "array after" },
      ],
      rows: [
        ["1", "3", "1", "[3, 4, 6, 1, 5, 2]"],
        ["2", "6", "0", "[3, 4, 6, 1, 5, 2]"],
        ["3", "1", "2", "[1, 3, 4, 6, 5, 2]"],
        ["4", "5", "1", "[1, 3, 4, 5, 6, 2]"],
        ["5", "2", "4", "[1, 2, 3, 4, 5, 6]"],
      ],
    },
    prompt: {
      th: "ตารางร่องรอยของ insertion sort นี้มีหนึ่งช่องที่ผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This insertion sort trace has exactly one wrong cell. Select it and type the correct value.",
    },
    explanation: {
      th: "รอบ i = 3 มี key = 1 และอาร์เรย์ก่อนหน้าเป็น [3, 4, 6, 1, 5, 2] ค่า 6, 4 และ 3 ล้วนมากกว่า 1 จึงเลื่อนทั้งสามตัวรวม 3 ครั้ง ก่อนวาง 1 ไว้ตำแหน่งแรก",
      en: "In pass i = 3 the key is 1 and the array is [3, 4, 6, 1, 5, 2]. Values 6, 4 and 3 are all greater than 1, so three shifts happen before 1 lands in position 0.",
    },
    answer: { kind: "cell", cellId: "r2c2", correctValue: "3" },
  },
  {
    id: "td-h-04",
    type: "table-debug",
    difficulty: "hard",
    language: "python",
    code: `grid = [[2, 0, 1],
        [1, 3, 0],
        [0, 1, 4]]
r, c = 0, 0
steps = 0
while steps < 5:
    steps += 1
    if grid[r][c] % 2 == 0:
        c = (c + 1) % 3
    else:
        r = (r + 1) % 3`,
    table: {
      caption: {
        th: "การเดินบนตารางสองมิติ",
        en: "Walking over the 2D grid",
      },
      headers: [
        { th: "ก้าวที่", en: "step" },
        "grid[r][c]",
        { th: "เป็นเลขคู่", en: "even" },
        { th: "r ใหม่", en: "r after" },
        { th: "c ใหม่", en: "c after" },
      ],
      rows: [
        ["1", "2", "yes", "0", "1"],
        ["2", "0", "yes", "0", "2"],
        ["3", "1", "no", "1", "2"],
        ["4", "0", "yes", "1", "3"],
        ["5", "1", "no", "2", "0"],
      ],
    },
    prompt: {
      th: "มีหนึ่งช่องที่ค่าผิดในตารางร่องรอยนี้ เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "One cell in this trace holds a wrong value. Select it and type the correct value.",
    },
    explanation: {
      th: "ก้าวที่ 4 อยู่ที่ r = 1, c = 2 ค่า grid[1][2] = 0 เป็นเลขคู่ จึงคำนวณ c = (2 + 1) % 3 = 0 ค่า 3 ลืมใส่การหารเอาเศษ และดัชนี 3 ยังเกินขอบตารางด้วย",
      en: "Step 4 is at r = 1, c = 2 where grid[1][2] = 0 is even, so c = (2 + 1) % 3 = 0. The value 3 drops the modulo and would also be out of bounds.",
    },
    answer: { kind: "cell", cellId: "r3c4", correctValue: "0" },
  },
  {
    id: "td-h-05",
    type: "table-debug",
    difficulty: "hard",
    language: "python",
    code: `n = 5
steps = 0
while n != 1:
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    steps += 1`,
    table: {
      caption: {
        th: "ลำดับค่าของ n ตามเงื่อนไขคู่หรือคี่",
        en: "Sequence of n driven by the even or odd branch",
      },
      headers: [
        { th: "ก้าวที่", en: "step" },
        { th: "n ก่อนรอบนี้", en: "n before" },
        { th: "เป็นเลขคู่", en: "even" },
        { th: "n หลังรอบนี้", en: "n after" },
      ],
      rows: [
        ["1", "5", "no", "15"],
        ["2", "16", "yes", "8"],
        ["3", "8", "yes", "4"],
        ["4", "4", "yes", "2"],
        ["5", "2", "yes", "1"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but one cell is wrong. Select it and type the correct value.",
    },
    explanation: {
      th: "ก้าวแรก n = 5 เป็นเลขคี่ จึงใช้สูตร 3 * 5 + 1 = 16 ค่า 15 ลืมบวกหนึ่ง และแถวถัดไปก็เริ่มจาก 16 ซึ่งยืนยันว่าค่าที่ถูกคือ 16",
      en: "In the first step n = 5 is odd, so 3 * 5 + 1 = 16. The value 15 forgets the plus one, and the next row starting at 16 confirms the correct result.",
    },
    answer: { kind: "cell", cellId: "r0c3", correctValue: "16" },
  },
  {
    id: "td-h-06",
    type: "table-debug",
    difficulty: "hard",
    language: "javascript",
    code: `const a = [2, -3, 4, -1, 2];
let cur = 0;
let best = a[0];
for (let i = 0; i < a.length; i++) {
  cur = Math.max(a[i], cur + a[i]);
  best = Math.max(best, cur);
}`,
    table: {
      caption: {
        th: "ผลรวมย่อยที่ดีที่สุดแบบต่อเนื่อง",
        en: "Best running subarray sums",
      },
      headers: ["i", "a[i]", "cur", "best"],
      rows: [
        ["0", "2", "2", "2"],
        ["1", "-3", "-1", "2"],
        ["2", "4", "4", "4"],
        ["3", "-1", "-1", "4"],
        ["4", "2", "5", "5"],
      ],
    },
    prompt: {
      th: "หาช่องที่ค่าไม่ถูกต้องในตารางนี้ แล้วกรอกค่าที่ถูกต้อง",
      en: "Find the cell with the incorrect value in this table, then type the correct value.",
    },
    explanation: {
      th: "แถว i = 3 คำนวณ cur = max(-1, 4 + (-1)) = max(-1, 3) = 3 ค่า -1 คือการเลือก a[i] ทั้งที่ผลรวมต่อเนื่องมากกว่า และแถวถัดไปที่ได้ cur = 5 ก็มาจาก 3 + 2",
      en: "Row i = 3 computes cur = max(-1, 4 + (-1)) = max(-1, 3) = 3. The value -1 picks a[i] even though extending is larger, and the next row's cur = 5 comes from 3 + 2.",
    },
    answer: { kind: "cell", cellId: "r3c2", correctValue: "3" },
  },
  {
    id: "td-h-07",
    type: "table-debug",
    difficulty: "hard",
    language: "java",
    code: `boolean[] mark = new boolean[12];
for (int i = 2; i * i < 12; i++) {
    if (!mark[i]) {
        for (int j = i * i; j < 12; j += i) {
            mark[j] = true;
        }
    }
}`,
    table: {
      caption: {
        th: "ทุกครั้งที่มีการทำเครื่องหมายในตะแกรง",
        en: "Every marking performed by the sieve",
      },
      headers: [
        "i",
        "j",
        { th: "จำนวนที่ทำเครื่องหมายแล้ว", en: "marked count" },
        { th: "เซตที่ถูกทำเครื่องหมาย", en: "marked set" },
      ],
      rows: [
        ["2", "4", "1", "{4}"],
        ["2", "6", "2", "{4, 6}"],
        ["2", "8", "3", "{4, 6, 8}"],
        ["2", "10", "4", "{4, 6, 8, 10}"],
        ["3", "6", "5", "{4, 6, 8, 9, 10}"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but exactly one cell holds a wrong value. Select it and type the correct value.",
    },
    explanation: {
      th: "ลูปในเริ่มที่ j = i * i ดังนั้นเมื่อ i = 3 การทำเครื่องหมายครั้งแรกคือ j = 9 (ครั้งต่อไปคือ 12 ซึ่งไม่น้อยกว่า 12 จึงหยุด) คอลัมน์เซตที่มี 9 เพิ่มเข้ามาก็ยืนยันค่านี้",
      en: "The inner loop starts at j = i * i, so for i = 3 the first marking is j = 9 (the next would be 12, which is not below 12). The marked set gaining 9 confirms it.",
    },
    answer: { kind: "cell", cellId: "r4c1", correctValue: "9" },
  },
  {
    id: "td-h-08",
    type: "table-debug",
    difficulty: "hard",
    language: "python",
    code: `s = 'aaabbc'
out = ''
count = 1
for i in range(1, len(s)):
    if s[i] == s[i - 1]:
        count += 1
    else:
        out += s[i - 1] + str(count)
        count = 1
out += s[-1] + str(count)`,
    table: {
      caption: {
        th: "การบีบอัดแบบนับซ้ำ ช่องที่ยังว่างเขียนเป็น -",
        en: "Run length encoding, an empty string is shown as -",
      },
      headers: [
        "i",
        "s[i]",
        { th: "ซ้ำกับตัวก่อนหน้า", en: "same as previous" },
        "count",
        "out",
      ],
      rows: [
        ["1", "a", "yes", "2", "-"],
        ["2", "a", "yes", "3", "-"],
        ["3", "b", "no", "1", "a3"],
        ["4", "b", "yes", "2", "a3b2"],
        ["5", "c", "no", "1", "a3b2"],
      ],
    },
    prompt: {
      th: "มีหนึ่งช่องในตารางที่ไม่ตรงกับโค้ด เลือกช่องนั้นแล้วกรอกค่าที่ถูกต้อง",
      en: "One cell does not match the code. Select it and enter the correct value.",
    },
    explanation: {
      th: "รอบ i = 4 ตัวอักษร b ซ้ำกับตัวก่อนหน้า จึงเข้ากิ่ง if ที่เพิ่มแค่ count เป็น 2 และไม่แตะ out ค่า out จึงยังเป็น a3 ส่วน b2 จะถูกต่อเข้าไปในรอบ i = 5 ที่เจอตัว c",
      en: "At i = 4 the letter b repeats, so only the if branch runs, count becomes 2 and out is untouched, staying a3. The b2 part is appended at i = 5 when c breaks the run.",
    },
    answer: { kind: "cell", cellId: "r3c4", correctValue: "a3" },
  },
  {
    id: "td-h-09",
    type: "table-debug",
    difficulty: "hard",
    language: "javascript",
    code: `const grid = [[1, 3, 1],
              [1, 5, 1],
              [4, 2, 1]];
const dp = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
for (let r = 0; r < 2; r++) {
  for (let c = 0; c < 3; c++) {
    if (r === 0 && c === 0) dp[r][c] = grid[r][c];
    else if (r === 0) dp[r][c] = dp[r][c - 1] + grid[r][c];
    else if (c === 0) dp[r][c] = dp[r - 1][c] + grid[r][c];
    else dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c];
  }
}`,
    table: {
      caption: {
        th: "ผลรวมเส้นทางที่น้อยที่สุดของสองแถวแรก",
        en: "Minimum path sums for the first two rows",
      },
      headers: [
        { th: "ช่อง", en: "cell" },
        { th: "ค่าใน grid", en: "grid" },
        "min(up, left)",
        "dp",
      ],
      rows: [
        ["dp[0][0]", "1", "-", "1"],
        ["dp[0][1]", "3", "1", "4"],
        ["dp[0][2]", "1", "4", "5"],
        ["dp[1][0]", "1", "1", "2"],
        ["dp[1][1]", "5", "2", "7"],
        ["dp[1][2]", "1", "7", "6"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but exactly one cell is wrong. Select it and type the correct value.",
    },
    explanation: {
      th: "ช่อง dp[1][2] ดูค่าด้านบน dp[0][2] = 5 และด้านซ้าย dp[1][1] = 7 ค่าที่น้อยกว่าคือ 5 ค่า 7 คือการหยิบด้านซ้ายมาโดยไม่เทียบ และคอลัมน์ dp ที่เป็น 6 = 5 + 1 ก็ยืนยันว่าต้องใช้ 5",
      en: "For dp[1][2] the up value is dp[0][2] = 5 and the left value is dp[1][1] = 7, so the minimum is 5. The value 7 just takes the left neighbour, and the dp column 6 = 5 + 1 confirms 5 is required.",
    },
    answer: { kind: "cell", cellId: "r5c2", correctValue: "5" },
  },
  {
    id: "td-h-10",
    type: "table-debug",
    difficulty: "hard",
    language: "java",
    code: `String[] tokens = {"6", "2", "/", "4", "+"};
Deque<Integer> st = new ArrayDeque<>();
for (String t : tokens) {
    if (t.equals("/") || t.equals("+")) {
        int b = st.pop();
        int a = st.pop();
        st.push(t.equals("/") ? a / b : a + b);
    } else {
        st.push(Integer.parseInt(t));
    }
}`,
    table: {
      caption: {
        th: "สแตกขณะคำนวณนิพจน์แบบ postfix (ท้ายลิสต์คือยอดสแตก)",
        en: "Stack while evaluating the postfix expression, last item is the top",
      },
      headers: [
        { th: "โทเคน", en: "token" },
        { th: "การทำงาน", en: "action" },
        { th: "สแตกหลังขั้นนี้", en: "stack after" },
      ],
      rows: [
        ["6", "push 6", "[6]"],
        ["2", "push 2", "[6, 2]"],
        ["/", "pop b = 2, pop a = 6, push a / b", "[0]"],
        ["4", "push 4", "[3, 4]"],
        ["+", "pop b = 4, pop a = 3, push a + b", "[7]"],
      ],
    },
    prompt: {
      th: "หาช่องเดียวที่ค่าผิดในตารางนี้ แล้วกรอกค่าที่ถูกต้อง",
      en: "Find the single wrong cell in this table and give the correct value.",
    },
    explanation: {
      th: "โทเคน / ดึง b = 2 ออกก่อน แล้ว a = 6 จึงคำนวณ a / b = 6 / 2 = 3 สแตกเหลือ [3] ค่า [0] มาจากการคำนวณ 2 / 6 แบบหารจำนวนเต็ม และแถวถัดไปที่เป็น [3, 4] ก็ยืนยันว่าค่าในสแตกคือ 3",
      en: "The / token pops b = 2 then a = 6 and pushes a / b = 6 / 2 = 3, leaving [3]. The value [0] comes from the integer division 2 / 6, and the next row [3, 4] confirms the stack held 3.",
    },
    answer: { kind: "cell", cellId: "r2c2", correctValue: "[3]" },
  },
  {
    id: "td-h-11",
    type: "table-debug",
    difficulty: "hard",
    language: "javascript",
    code: `let total = 0;
let skipped = 0;
for (let i = 1; i <= 5; i++) {
  for (let j = 1; j <= 3; j++) {
    if ((i + j) % 3 === 0) {
      skipped++;
      continue;
    }
    total += i * j;
  }
}`,
    table: {
      caption: {
        th: "สรุปผลของลูปในสำหรับแต่ละค่า i",
        en: "Summary of the inner loop for each i",
      },
      headers: [
        "i",
        { th: "j ที่ถูกข้าม", en: "skipped j" },
        { th: "ยอดที่บวกในรอบนี้", en: "added this row" },
        "total",
        "skipped",
      ],
      rows: [
        ["1", "2", "4", "4", "1"],
        ["2", "1", "10", "14", "2"],
        ["3", "3", "18", "23", "3"],
        ["4", "2", "16", "39", "4"],
        ["5", "1", "25", "64", "5"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but one cell holds a wrong value. Select it and type the correct value.",
    },
    explanation: {
      th: "เมื่อ i = 3 คู่ที่ถูกข้ามคือ j = 3 เพราะ (3 + 3) % 3 = 0 ดังนั้นบวกเฉพาะ 3 * 1 = 3 และ 3 * 2 = 6 รวม 9 ค่า 18 คือการนับ 3 * 3 = 9 เข้ามาด้วย และคอลัมน์ total ที่เป็น 23 = 14 + 9 ก็ยืนยันว่ายอดที่บวกคือ 9",
      en: "At i = 3 the skipped pair is j = 3 because (3 + 3) % 3 = 0, so only 3 * 1 = 3 and 3 * 2 = 6 are added, giving 9. The value 18 also counts the skipped 3 * 3 = 9, while total 23 = 14 + 9 confirms 9.",
    },
    answer: { kind: "cell", cellId: "r2c2", correctValue: "9" },
  },
  {
    id: "td-h-12",
    type: "table-debug",
    difficulty: "hard",
    language: "python",
    code: `words = ['tea', 'eat', 'ten', 'ate', 'net', 'tan']
groups = {}
for w in words:
    key = ''.join(sorted(w))
    groups.setdefault(key, []).append(w)`,
    table: {
      caption: {
        th: "การจัดกลุ่มคำที่สลับตัวอักษรกันได้",
        en: "Grouping words that are anagrams of each other",
      },
      headers: [
        "w",
        "key",
        { th: "จำนวนคีย์ใน groups", en: "keys in groups" },
        { th: "สมาชิกของคีย์นี้", en: "group for this key" },
      ],
      rows: [
        ["tea", "aet", "1", "[tea]"],
        ["eat", "aet", "1", "[tea, eat]"],
        ["ten", "ent", "2", "[ten]"],
        ["ate", "ate", "2", "[tea, eat, ate]"],
        ["net", "ent", "2", "[ten, net]"],
        ["tan", "ant", "3", "[tan]"],
      ],
    },
    prompt: {
      th: "มีหนึ่งช่องที่ค่าไม่ตรงกับโค้ด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "One cell does not agree with the code. Select it and type the correct value.",
    },
    explanation: {
      th: "key มาจากการเรียงตัวอักษรของคำ คำว่า ate เรียงแล้วได้ a, e, t คือ aet ตรงกับกลุ่มของ tea และ eat ค่า ate คือการใช้คำเดิมโดยไม่เรียง และคอลัมน์สมาชิกที่กลายเป็น [tea, eat, ate] ก็ยืนยันว่าคีย์คือ aet",
      en: "The key is the word's sorted letters, and ate sorts to a, e, t which is aet, the same group as tea and eat. The value ate uses the unsorted word, while the group column [tea, eat, ate] confirms the key is aet.",
    },
    answer: { kind: "cell", cellId: "r3c1", correctValue: "aet" },
  },
  {
    id: "td-e-13",
    type: "table-debug",
    difficulty: "easy",
    language: "javascript",
    code: `let x = 20;
for (let i = 1; i <= 4; i++) {
  x = x - i;
}`,
    table: {
      caption: {
        th: "ค่า x หลังจบแต่ละรอบ",
        en: "Value of x after each iteration",
      },
      headers: ["i", "x"],
      rows: [
        ["1", "19"],
        ["2", "17"],
        ["3", "15"],
        ["4", "10"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but exactly one cell holds a wrong value. Select it and type the correct value.",
    },
    explanation: {
      th: "รอบที่ 3 ลบด้วย i = 3 ได้ x = 17 - 3 = 14 ค่า 15 คือการลบด้วย 2 ซ้ำอีกครั้ง และแถวสุดท้ายที่เป็น 10 = 14 - 4 ก็ยืนยันว่าค่าที่ถูกคือ 14",
      en: "Iteration 3 subtracts i = 3, so x = 17 - 3 = 14. The value 15 subtracts 2 again, and the last row 10 = 14 - 4 confirms 14 is correct.",
    },
    answer: { kind: "cell", cellId: "r2c1", correctValue: "14" },
  },
  {
    id: "td-e-14",
    type: "table-debug",
    difficulty: "easy",
    language: "python",
    code: `items = [3, 1, 4]
out = []
for x in items:
    out.append(x * 2)`,
    table: {
      caption: {
        th: "ค่าที่ถูกเพิ่มเข้าลิสต์ out",
        en: "Values appended to the list out",
      },
      headers: ["x", "x * 2", "out"],
      rows: [
        ["3", "6", "[6]"],
        ["1", "2", "[6, 2]"],
        ["4", "8", "[6, 2, 4]"],
      ],
    },
    prompt: {
      th: "มีค่าผิดหนึ่งช่องในตารางนี้ เลือกช่องนั้นแล้วเติมค่าที่ถูกต้อง",
      en: "Exactly one value in this table is wrong. Select that cell and fill in the correct value.",
    },
    explanation: {
      th: "แถวสุดท้ายเพิ่มค่า x * 2 = 8 เข้าไป จึงได้ [6, 2, 8] ค่า [6, 2, 4] คือการเพิ่ม x ดิบเข้าไปโดยลืมคูณสอง",
      en: "The last row appends x * 2 = 8, giving [6, 2, 8]. The value [6, 2, 4] appends the raw x and forgets the doubling.",
    },
    answer: { kind: "cell", cellId: "r2c2", correctValue: "[6, 2, 8]" },
  },
  {
    id: "td-e-15",
    type: "table-debug",
    difficulty: "easy",
    language: "java",
    code: `int[] a = {8, 3, 5, 12};
int count = 0;
for (int i = 0; i < a.length; i++) {
    if (a[i] > 4) {
        count++;
    }
}`,
    table: {
      caption: {
        th: "การนับสมาชิกที่มากกว่า 4",
        en: "Counting elements greater than 4",
      },
      headers: ["i", "a[i]", "a[i] > 4", "count"],
      rows: [
        ["0", "8", "true", "1"],
        ["1", "3", "false", "0"],
        ["2", "5", "true", "2"],
        ["3", "12", "true", "3"],
      ],
    },
    prompt: {
      th: "หาช่องที่ค่าไม่ถูกต้องในตาราง แล้วกรอกค่าที่ควรจะเป็น",
      en: "Find the cell holding an incorrect value, then enter what it should be.",
    },
    explanation: {
      th: "เมื่อ a[1] = 3 เงื่อนไขเป็น false จึงไม่เพิ่ม count แต่ค่าเดิมยังคงอยู่คือ 1 ไม่ได้ถูกล้างเป็น 0 และแถวถัดไปที่เป็น 2 ก็ยืนยันว่าฐานคือ 1",
      en: "When a[1] = 3 the condition is false, so count is not incremented but keeps its value 1 rather than resetting to 0. The next row showing 2 confirms the base was 1.",
    },
    answer: { kind: "cell", cellId: "r1c3", correctValue: "1" },
  },
  {
    id: "td-e-16",
    type: "table-debug",
    difficulty: "easy",
    language: "pseudo",
    code: `SET a TO 2
SET b TO 5
FOR i FROM 1 TO 3
    SET a TO a + b
    SET b TO b + 1
END FOR`,
    table: {
      caption: {
        th: "ค่า a และ b หลังจบแต่ละรอบ",
        en: "Values of a and b after each round",
      },
      headers: ["i", "a", "b"],
      rows: [
        ["1", "7", "6"],
        ["2", "12", "7"],
        ["3", "20", "8"],
      ],
    },
    prompt: {
      th: "ตารางควรตรงกับรหัสเทียม มีหนึ่งช่องที่ผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "The table should agree with the pseudo code. One cell is wrong. Select it and give the correct value.",
    },
    explanation: {
      th: "รอบที่ 2 ใช้ b ที่เพิ่มแล้วคือ 6 จึงได้ a = 7 + 6 = 13 ค่า 12 มาจากการใช้ b = 5 ค้างจากตอนเริ่ม และรอบที่ 3 ที่เป็น 20 = 13 + 7 ก็ยืนยันค่านี้",
      en: "Round 2 uses the updated b = 6, so a = 7 + 6 = 13. The value 12 reuses the stale starting b = 5, and round 3 giving 20 = 13 + 7 confirms it.",
    },
    answer: { kind: "cell", cellId: "r1c1", correctValue: "13" },
  },
  {
    id: "td-e-17",
    type: "table-debug",
    difficulty: "easy",
    language: "python",
    code: `s = 'code'
rev = ''
for ch in s:
    rev = ch + rev`,
    table: {
      caption: {
        th: "สตริง rev หลังต่อค่าในแต่ละรอบ",
        en: "The string rev after each concatenation",
      },
      headers: ["ch", "rev"],
      rows: [
        ["c", "c"],
        ["o", "oc"],
        ["d", "doc"],
        ["e", "code"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับโค้ด มีค่าผิดหนึ่งช่อง เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code. One value is wrong. Select the cell and type the correct value.",
    },
    explanation: {
      th: "โค้ดวางตัวอักษรใหม่ไว้หน้าสตริงเดิม รอบสุดท้ายจึงได้ e นำหน้า doc เป็น edoc ค่า code คือการต่อไว้ท้ายสตริง",
      en: "The code puts each new character in front of the existing string, so the last round gives e followed by doc, that is edoc. The value code appends instead.",
    },
    answer: { kind: "cell", cellId: "r3c1", correctValue: "edoc" },
  },
  {
    id: "td-m-13",
    type: "table-debug",
    difficulty: "medium",
    language: "python",
    code: `a, b = 270, 192
while b != 0:
    r = a % b
    a = b
    b = r`,
    table: {
      caption: {
        th: "การหาตัวหารร่วมมากด้วยวิธียุคลิด",
        en: "Finding the greatest common divisor with Euclid's method",
      },
      headers: [
        { th: "รอบที่", en: "step" },
        { th: "a ก่อนรอบนี้", en: "a before" },
        { th: "b ก่อนรอบนี้", en: "b before" },
        "r",
        { th: "a หลังรอบนี้", en: "a after" },
        { th: "b หลังรอบนี้", en: "b after" },
      ],
      rows: [
        ["1", "270", "192", "78", "192", "78"],
        ["2", "192", "78", "36", "78", "36"],
        ["3", "78", "36", "6", "78", "6"],
        ["4", "36", "6", "0", "6", "0"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but one cell holds a wrong value. Select it and type the correct value.",
    },
    explanation: {
      th: "คำสั่ง a = b ทำให้ a รับค่า b ก่อนรอบนี้ รอบที่ 3 จึงได้ a = 36 ค่า 78 คือค่า a เดิมที่ค้างอยู่ และรอบที่ 4 ที่เริ่มด้วย a = 36 ก็ยืนยันค่านี้",
      en: "The statement a = b makes a take the b from before this step, so step 3 gives a = 36. The value 78 is the stale old a, and step 4 starting from a = 36 confirms it.",
    },
    answer: { kind: "cell", cellId: "r2c4", correctValue: "36" },
  },
  {
    id: "td-m-14",
    type: "table-debug",
    difficulty: "medium",
    language: "python",
    code: `balance = 100
month = 0
while balance < 200:
    month += 1
    if month % 2 == 0:
        balance += 20
    else:
        balance += 10`,
    table: {
      caption: {
        th: "ยอดเงินหลังฝากของแต่ละเดือน",
        en: "Balance after each monthly deposit",
      },
      headers: [
        "month",
        "month % 2 == 0",
        { th: "ยอดที่ฝากเดือนนี้", en: "added" },
        "balance",
      ],
      rows: [
        ["1", "no", "10", "110"],
        ["2", "yes", "20", "130"],
        ["3", "no", "10", "140"],
        ["4", "yes", "20", "160"],
        ["5", "no", "20", "170"],
        ["6", "yes", "20", "190"],
        ["7", "no", "10", "200"],
      ],
    },
    prompt: {
      th: "หาช่องที่ค่าไม่ตรงกับโค้ด แล้วกรอกค่าที่ถูกต้อง",
      en: "Find the cell that does not agree with the code, then type the correct value.",
    },
    explanation: {
      th: "เดือนที่ 5 เป็นเลขคี่ จึงเข้ากิ่ง else ที่ฝากเพียง 10 และคอลัมน์ balance ที่เป็น 170 = 160 + 10 ก็ยืนยันว่ายอดที่ฝากคือ 10",
      en: "Month 5 is odd, so the else branch adds only 10, and the balance column showing 170 = 160 + 10 confirms the amount added is 10.",
    },
    answer: { kind: "cell", cellId: "r4c2", correctValue: "10" },
  },
  {
    id: "td-m-15",
    type: "table-debug",
    difficulty: "medium",
    language: "java",
    code: `int rows = 4;
int stars = 0;
for (int i = 1; i <= rows; i++) {
    String line = "";
    for (int j = 1; j <= i; j++) {
        line += "#";
    }
    stars += line.length();
}`,
    table: {
      caption: {
        th: "แต่ละบรรทัดของสามเหลี่ยมและจำนวนสัญลักษณ์สะสม",
        en: "Each triangle line and the running symbol count",
      },
      headers: ["i", "line", "line.length()", "stars"],
      rows: [
        ["1", "#", "1", "1"],
        ["2", "##", "2", "3"],
        ["3", "##", "3", "6"],
        ["4", "####", "4", "10"],
      ],
    },
    prompt: {
      th: "ตารางร่องรอยนี้มีหนึ่งช่องที่ผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This trace table has exactly one wrong cell. Select it and enter the correct value.",
    },
    explanation: {
      th: "รอบ i = 3 ลูปในทำงาน 3 ครั้ง จึงได้บรรทัดยาวสามตัวคือ ### และคอลัมน์ line.length() ที่เป็น 3 ก็ยืนยันว่าบรรทัดนี้ขาดไปหนึ่งตัว",
      en: "In round i = 3 the inner loop runs three times, so the line is three symbols long, ###. The line.length() column showing 3 confirms one symbol is missing.",
    },
    answer: { kind: "cell", cellId: "r2c1", correctValue: "###" },
  },
  {
    id: "td-m-16",
    type: "table-debug",
    difficulty: "medium",
    language: "python",
    code: `text = 'ab bc ab cd bc ab'
freq = {}
for w in text.split():
    if w in freq:
        freq[w] += 1
    else:
        freq[w] = 1`,
    table: {
      caption: {
        th: "การนับความถี่ของแต่ละคำ",
        en: "Counting how often each word appears",
      },
      headers: [
        "w",
        { th: "มีคีย์นี้อยู่แล้ว", en: "already a key" },
        { th: "freq หลังรอบนี้", en: "freq after" },
      ],
      rows: [
        ["ab", "no", "{'ab': 1}"],
        ["bc", "no", "{'ab': 1, 'bc': 1}"],
        ["ab", "yes", "{'ab': 2, 'bc': 1}"],
        ["cd", "no", "{'ab': 2, 'bc': 1, 'cd': 1}"],
        ["bc", "yes", "{'ab': 2, 'bc': 1, 'cd': 1}"],
        ["ab", "yes", "{'ab': 3, 'bc': 2, 'cd': 1}"],
      ],
    },
    prompt: {
      th: "มีหนึ่งช่องในตารางที่ไม่ตรงกับโค้ด เลือกช่องนั้นแล้วกรอกค่าที่ถูกต้อง",
      en: "One cell in the table does not match the code. Select it and type the correct value.",
    },
    explanation: {
      th: "แถวที่ห้าเจอคำ bc ซ้ำ จึงเข้ากิ่ง if และเพิ่มค่าเป็น 2 ได้ {'ab': 2, 'bc': 2, 'cd': 1} ค่าที่เขียนไว้เหมือนไม่ได้เพิ่มอะไรเลย ทั้งที่คอลัมน์ก่อนหน้าบอกว่ามีคีย์นี้อยู่แล้ว",
      en: "The fifth row sees bc again, so the if branch raises its count to 2, giving {'ab': 2, 'bc': 2, 'cd': 1}. The listed value looks as if nothing was incremented even though the previous column says the key already existed.",
    },
    answer: {
      kind: "cell",
      cellId: "r4c2",
      correctValue: "{'ab': 2, 'bc': 2, 'cd': 1}",
    },
  },
  {
    id: "td-m-17",
    type: "table-debug",
    difficulty: "medium",
    language: "pseudo",
    code: `SET cash TO 0
SET bonus TO 0
FOR EACH sale IN [120, 80, 200, 150, 60, 300]
    SET cash TO cash + sale
    IF sale >= 150 THEN
        SET bonus TO bonus + 10
    END IF
END FOR`,
    table: {
      caption: {
        th: "ยอดขายสะสมและโบนัสที่ได้",
        en: "Accumulated sales and the bonus earned",
      },
      headers: [
        { th: "ยอดขาย", en: "sale" },
        "cash",
        "sale >= 150",
        "bonus",
      ],
      rows: [
        ["120", "120", "no", "0"],
        ["80", "200", "no", "0"],
        ["200", "400", "yes", "10"],
        ["150", "550", "no", "20"],
        ["60", "610", "no", "20"],
        ["300", "910", "yes", "30"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับรหัสเทียม มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should follow the pseudo code. One cell has a wrong value. Select it and type the correct value.",
    },
    explanation: {
      th: "เงื่อนไขเป็น sale >= 150 ซึ่งรวมค่าที่เท่ากันพอดี ยอดขาย 150 จึงเข้าเงื่อนไข และคอลัมน์ bonus ที่ขึ้นจาก 10 เป็น 20 ก็ยืนยันว่าแถวนี้ได้โบนัส",
      en: "The test is sale >= 150, which includes the boundary, so a sale of exactly 150 passes. The bonus column rising from 10 to 20 confirms this row earned a bonus.",
    },
    answer: { kind: "cell", cellId: "r3c2", correctValue: "yes" },
  },
  {
    id: "td-h-13",
    type: "table-debug",
    difficulty: "hard",
    language: "java",
    code: `int[] a = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
int target = 38;
int lo = 0, hi = a.length - 1;
while (lo <= hi) {
    int mid = (lo + hi) / 2;
    if (a[mid] == target) break;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}`,
    table: {
      caption: {
        th: "ทุกรอบของการค้นหาแบบทวิภาค",
        en: "Every round of the binary search",
      },
      headers: [
        { th: "รอบที่", en: "step" },
        "lo",
        "hi",
        "mid",
        "a[mid]",
        { th: "เทียบกับ target", en: "compared to target" },
        { th: "lo ใหม่", en: "lo after" },
        { th: "hi ใหม่", en: "hi after" },
      ],
      rows: [
        ["1", "0", "9", "4", "16", "less", "5", "9"],
        ["2", "5", "9", "7", "56", "greater", "5", "7"],
        ["3", "5", "6", "5", "23", "less", "6", "6"],
        ["4", "6", "6", "6", "38", "equal", "6", "6"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but exactly one cell is wrong. Select it and type the correct value.",
    },
    explanation: {
      th: "เมื่อ a[mid] มากกว่า target โค้ดกำหนด hi = mid - 1 รอบที่ 2 จึงได้ hi = 7 - 1 = 6 ค่า 7 คือการใช้ mid ตรง ๆ และรอบที่ 3 ที่เริ่มด้วย hi = 6 ก็ยืนยันค่านี้",
      en: "When a[mid] is greater than the target the code sets hi = mid - 1, so step 2 gives hi = 7 - 1 = 6. The value 7 uses mid unchanged, and step 3 starting from hi = 6 confirms it.",
    },
    answer: { kind: "cell", cellId: "r1c7", correctValue: "6" },
  },
  {
    id: "td-h-14",
    type: "table-debug",
    difficulty: "hard",
    language: "javascript",
    code: `const memo = {};
function fib(n) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  memo[n] = fib(n - 1) + fib(n - 2);
  return memo[n];
}
fib(6);`,
    table: {
      caption: {
        th: "ลำดับการบันทึกค่าลงใน memo",
        en: "Order in which values are written into memo",
      },
      headers: [
        { th: "ลำดับการบันทึก", en: "write order" },
        "n",
        "fib(n - 1)",
        "fib(n - 2)",
        "memo[n]",
        { th: "memo หลังบันทึก", en: "memo after" },
      ],
      rows: [
        ["1", "2", "1", "0", "1", "{2: 1}"],
        ["2", "3", "1", "1", "2", "{2: 1, 3: 2}"],
        ["3", "4", "2", "1", "3", "{2: 1, 3: 2, 4: 3}"],
        ["4", "5", "3", "3", "5", "{2: 1, 3: 2, 4: 3, 5: 5}"],
        ["5", "6", "5", "3", "8", "{2: 1, 3: 2, 4: 3, 5: 5, 6: 8}"],
      ],
    },
    prompt: {
      th: "มีหนึ่งช่องที่ค่าไม่ตรงกับโค้ด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "One cell does not agree with the code. Select it and type the correct value.",
    },
    explanation: {
      th: "การบันทึกลำดับที่ 4 คือ n = 5 ซึ่งใช้ fib(4) = 3 และ fib(3) = 2 ที่อ่านจาก memo ค่า 3 ในคอลัมน์ fib(n - 2) คือการหยิบค่าของ fib(4) มาซ้ำ และ memo[n] ที่เป็น 5 = 3 + 2 ก็ยืนยันว่าค่าที่ถูกคือ 2",
      en: "The fourth write is n = 5, which uses fib(4) = 3 and the memoised fib(3) = 2. The value 3 in the fib(n - 2) column repeats fib(4), while memo[n] = 5 = 3 + 2 confirms the correct value is 2.",
    },
    answer: { kind: "cell", cellId: "r3c3", correctValue: "2" },
  },
  {
    id: "td-h-15",
    type: "table-debug",
    difficulty: "hard",
    language: "javascript",
    code: `const input = "aabbab";
let state = "S0";
let accepted = 0;
for (const ch of input) {
  if (state === "S0") state = ch === "a" ? "S1" : "S0";
  else if (state === "S1") state = ch === "a" ? "S1" : "S2";
  else state = ch === "a" ? "S0" : "S2";
  if (state === "S2") accepted++;
}`,
    table: {
      caption: {
        th: "การเปลี่ยนสถานะของเครื่องสถานะจำกัด",
        en: "State transitions of the finite state machine",
      },
      headers: [
        { th: "ก้าวที่", en: "step" },
        "ch",
        { th: "สถานะก่อน", en: "state before" },
        { th: "สถานะหลัง", en: "state after" },
        "accepted",
      ],
      rows: [
        ["1", "a", "S0", "S1", "0"],
        ["2", "a", "S1", "S1", "0"],
        ["3", "b", "S1", "S2", "1"],
        ["4", "b", "S2", "S2", "2"],
        ["5", "a", "S2", "S2", "2"],
        ["6", "b", "S0", "S0", "2"],
      ],
    },
    prompt: {
      th: "ตารางร่องรอยนี้มีหนึ่งช่องที่ผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This trace table has exactly one wrong cell. Select it and enter the correct value.",
    },
    explanation: {
      th: "ก้าวที่ 5 อยู่ที่สถานะ S2 และอ่านตัว a กิ่ง else จึงพาไปสถานะ S0 ค่า S2 คือสถานะเดิมที่ค้างอยู่ และก้าวที่ 6 ที่เริ่มจาก S0 ก็ยืนยันค่านี้",
      en: "Step 5 is in state S2 and reads an a, so the else branch moves to S0. The value S2 is the stale previous state, and step 6 starting from S0 confirms it.",
    },
    answer: { kind: "cell", cellId: "r4c3", correctValue: "S0" },
  },
  {
    id: "td-h-16",
    type: "table-debug",
    difficulty: "hard",
    language: "python",
    code: `graph = {1: [2, 3], 2: [4], 3: [4, 5], 4: [6], 5: [6], 6: []}
queue = [1]
seen = {1}
order = []
while queue:
    node = queue.pop(0)
    order.append(node)
    for nb in graph[node]:
        if nb not in seen:
            seen.add(nb)
            queue.append(nb)`,
    table: {
      caption: {
        th: "การท่องกราฟแบบกว้างก่อน ช่องที่ไม่มีค่าเขียนเป็น -",
        en: "Breadth first traversal, a cell with nothing to show is written as -",
      },
      headers: [
        { th: "ก้าวที่", en: "step" },
        { th: "โหนดที่ดึงออก", en: "node popped" },
        { th: "โหนดที่ถูกเพิ่มเข้าคิว", en: "nodes enqueued" },
        { th: "คิวหลังก้าวนี้", en: "queue after" },
        { th: "จำนวนสมาชิกใน seen", en: "size of seen" },
      ],
      rows: [
        ["1", "1", "2, 3", "[2, 3]", "3"],
        ["2", "2", "4", "[3, 4]", "4"],
        ["3", "3", "4, 5", "[4, 5]", "5"],
        ["4", "4", "6", "[5, 6]", "6"],
        ["5", "5", "-", "[6]", "6"],
        ["6", "6", "-", "[]", "6"],
      ],
    },
    prompt: {
      th: "หาช่องเดียวที่ค่าผิดในตารางนี้ แล้วกรอกค่าที่ถูกต้อง",
      en: "Find the single wrong cell in this table and give the correct value.",
    },
    explanation: {
      th: "ก้าวที่ 3 ดูเพื่อนบ้านของโหนด 3 คือ 4 และ 5 แต่ 4 ถูกใส่ seen ไปแล้วในก้าวที่ 2 จึงเพิ่มเข้าคิวเฉพาะ 5 และคอลัมน์จำนวนสมาชิกใน seen ที่เพิ่มจาก 4 เป็น 5 ก็ยืนยันว่ามีโหนดใหม่เพียงตัวเดียว",
      en: "Step 3 looks at the neighbours of node 3, namely 4 and 5, but 4 was already added to seen in step 2, so only 5 is enqueued. The size of seen rising from 4 to 5 confirms just one new node.",
    },
    answer: { kind: "cell", cellId: "r2c2", correctValue: "5" },
  },
  {
    id: "td-h-17",
    type: "table-debug",
    difficulty: "hard",
    language: "java",
    code: `int[] a = {1, 4, 7, 9};
int[] b = {2, 3, 8};
int i = 0, j = 0, k = 0;
int[] out = new int[7];
while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) out[k++] = a[i++];
    else out[k++] = b[j++];
}`,
    table: {
      caption: {
        th: "การรวมสองอาร์เรย์ที่เรียงแล้ว จนกว่าฝ่ายใดฝ่ายหนึ่งจะหมด",
        en: "Merging two sorted arrays until one side runs out",
      },
      headers: [
        { th: "ก้าวที่", en: "step" },
        "i",
        "j",
        "a[i]",
        "b[j]",
        { th: "หยิบจากอาร์เรย์", en: "taken from" },
        { th: "out หลังก้าวนี้", en: "out after" },
      ],
      rows: [
        ["1", "0", "0", "1", "2", "a", "[1]"],
        ["2", "1", "0", "4", "2", "b", "[1, 2]"],
        ["3", "2", "1", "4", "3", "b", "[1, 2, 3]"],
        ["4", "1", "2", "4", "8", "a", "[1, 2, 3, 4]"],
        ["5", "2", "2", "7", "8", "a", "[1, 2, 3, 4, 7]"],
        ["6", "3", "2", "9", "8", "b", "[1, 2, 3, 4, 7, 8]"],
      ],
    },
    prompt: {
      th: "ตารางนี้ควรตรงกับการทำงานของโค้ด มีหนึ่งช่องที่ค่าผิด เลือกช่องนั้นและกรอกค่าที่ถูกต้อง",
      en: "This table should match the code, but one cell holds a wrong value. Select it and type the correct value.",
    },
    explanation: {
      th: "ก้าวที่ 2 หยิบค่าจากอาร์เรย์ b ดังนั้นมีเพียง j ที่เดินหน้า ส่วน i ยังเป็น 1 ในก้าวที่ 3 และคอลัมน์ a[i] ที่เป็น 4 ก็ยืนยัน เพราะ a[2] มีค่า 7",
      en: "Step 2 takes a value from b, so only j advances and i is still 1 in step 3. The a[i] column showing 4 confirms this, because a[2] holds 7.",
    },
    answer: { kind: "cell", cellId: "r2c1", correctValue: "1" },
  },
];
