import type { SqlLogicQuestion } from "../types";

/**
 * SQL result reasoning: read a tiny schema plus one query, answer what it returns.
 * Ids: sq-e-01.. (easy), sq-m-01.. (medium), sq-h-01.. (hard).
 * SQL, table names and column names stay English. `prompt` / `explanation` are bilingual.
 */
export const sqlLogicQuestions: SqlLogicQuestion[] = [
  {
    id: "sq-e-01",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "employees",
        columns: ["id", "name", "dept", "salary"],
        rows: [
          ["1", "Ann", "Sales", "5000"],
          ["2", "Ben", "IT", "6000"],
          ["3", "Cara", "Sales", "4500"],
          ["4", "Dan", "IT", "7000"],
          ["5", "Eve", "HR", "4000"],
        ],
      },
    ],
    query: `SELECT name
FROM employees
WHERE salary > 5000
ORDER BY name;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "เงื่อนไข salary > 5000 เป็นการเปรียบเทียบแบบเข้ม จึงเหลือ Ben (6000) และ Dan (7000) ส่วน Ann ที่ได้ 5000 พอดีไม่ผ่าน แล้ว ORDER BY name เรียงเป็น Ben, Dan ตัวเลือกที่ผิดมาจากการอ่าน > เป็น >= หรือเรียงลำดับกลับด้าน",
      en: "salary > 5000 is a strict comparison, so only Ben (6000) and Dan (7000) qualify; Ann at exactly 5000 is excluded. ORDER BY name then gives Ben, Dan. The distractors come from reading > as >= or reversing the sort.",
    },
    answer: {
      kind: "choice",
      choices: [
        "2 rows: (Ben), (Dan)",
        "3 rows: (Ann), (Ben), (Dan)",
        "2 rows: (Dan), (Ben)",
        "1 row: (Dan)",
      ],
      correctIndex: 0,
    },
  },
  {
    id: "sq-e-02",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "students",
        columns: ["id", "name", "grade", "score"],
        rows: [
          ["1", "Ann", "10", "78"],
          ["2", "Ben", "11", "92"],
          ["3", "Cara", "10", "65"],
          ["4", "Dan", "12", "88"],
          ["5", "Eve", "11", "55"],
        ],
      },
    ],
    query: `SELECT COUNT(*)
FROM students
WHERE score >= 78;`,
    prompt: {
      th: "ค่าเดียวที่คำสั่งนี้คืนออกมาคือเท่าใด",
      en: "What single value does this query return?",
    },
    explanation: {
      th: "ตัวกรอง score >= 78 ผ่าน 3 แถวคือ Ann (78), Ben (92) และ Dan (88) เพราะ >= นับค่าที่เท่ากันด้วย จากนั้น COUNT(*) นับจำนวนแถวที่เหลือได้ 3",
      en: "score >= 78 keeps three rows: Ann (78), Ben (92) and Dan (88), since >= includes the equal value. COUNT(*) then counts the surviving rows, giving 3.",
    },
    answer: { kind: "text", accepted: ["3", "(3)"], placeholder: "" },
  },
  {
    id: "sq-e-03",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "products",
        columns: ["id", "name", "category", "price"],
        rows: [
          ["1", "Mouse", "Accessory", "250"],
          ["2", "Keyboard", "Accessory", "900"],
          ["3", "Monitor", "Display", "4500"],
          ["4", "Laptop", "Computer", "32000"],
          ["5", "Cable", "Accessory", "120"],
        ],
      },
    ],
    query: `SELECT name, price
FROM products
ORDER BY price DESC
LIMIT 2;`,
    prompt: {
      th: "ผลลัพธ์ของคำสั่งนี้คืออะไร",
      en: "What is the result of this query?",
    },
    explanation: {
      th: "ไม่มี WHERE ดังนั้นทั้ง 5 แถวถูกเรียงด้วย price จากมากไปน้อย: 32000, 4500, 900, 250, 120 แล้ว LIMIT 2 ตัดเหลือสองแถวแรกคือ Laptop และ Monitor ตัวเลือกลวงคือการเรียงจากน้อยไปมากหรือลืม LIMIT",
      en: "There is no WHERE, so all five rows are sorted by price descending: 32000, 4500, 900, 250, 120. LIMIT 2 keeps the first two, Laptop and Monitor. The distractors sort ascending or forget the LIMIT.",
    },
    answer: {
      kind: "choice",
      choices: [
        "2 rows: (Cable, 120), (Mouse, 250)",
        "2 rows: (Laptop, 32000), (Monitor, 4500)",
        "2 rows: (Monitor, 4500), (Laptop, 32000)",
        "5 rows: (Laptop, 32000), (Monitor, 4500), (Keyboard, 900), (Mouse, 250), (Cable, 120)",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "sq-e-04",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "orders",
        columns: ["id", "customer", "amount", "status"],
        rows: [
          ["1", "Ann", "300", "paid"],
          ["2", "Ben", "150", "pending"],
          ["3", "Cara", "900", "paid"],
          ["4", "Dan", "450", "paid"],
          ["5", "Eve", "200", "cancelled"],
        ],
      },
    ],
    query: `SELECT id
FROM orders
WHERE status = 'paid' AND amount < 500
ORDER BY id;`,
    prompt: {
      th: "คำสั่งนี้คืนแถวใดออกมา",
      en: "Which rows does this query return?",
    },
    explanation: {
      th: "AND ต้องเป็นจริงทั้งสองข้าง แถวที่ status = 'paid' คือ 1, 3, 4 จากนั้นเงื่อนไข amount < 500 ตัดแถว 3 (900) ออก เหลือ id 1 และ 4 ตัวเลือกลวงคือการใช้เงื่อนไขเพียงข้างเดียว",
      en: "AND requires both sides to hold. status = 'paid' keeps ids 1, 3, 4, then amount < 500 drops id 3 (900), leaving ids 1 and 4. The distractors apply only one of the two conditions.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (1), (3), (4)",
        "3 rows: (1), (2), (4)",
        "2 rows: (1), (4)",
        "1 row: (1)",
      ],
      correctIndex: 2,
    },
  },
  {
    id: "sq-e-05",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "employees",
        columns: ["id", "name", "dept", "salary"],
        rows: [
          ["1", "Ann", "Sales", "5000"],
          ["2", "Ben", "IT", "6000"],
          ["3", "Cara", "Sales", "4500"],
          ["4", "Dan", "IT", "7000"],
          ["5", "Eve", "HR", "4000"],
        ],
      },
    ],
    query: `SELECT MAX(salary)
FROM employees
WHERE dept = 'Sales';`,
    prompt: {
      th: "ค่าที่คำสั่งนี้คืนออกมาคือเท่าใด",
      en: "What value does this query return?",
    },
    explanation: {
      th: "WHERE ทำงานก่อน aggregate จึงเหลือเฉพาะแถวของ Sales คือ Ann (5000) และ Cara (4500) แล้ว MAX จึงเลือกค่ามากสุดในกลุ่มนั้นได้ 5000 ไม่ใช่ 7000 ของ Dan ที่อยู่แผนก IT",
      en: "WHERE runs before the aggregate, so only the Sales rows remain: Ann (5000) and Cara (4500). MAX picks the largest of those, 5000, not Dan's 7000 which belongs to IT.",
    },
    answer: { kind: "text", accepted: ["5000", "(5000)", "5,000"] },
  },
  {
    id: "sq-e-06",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "students",
        columns: ["id", "name", "grade", "score"],
        rows: [
          ["1", "Ann", "10", "78"],
          ["2", "Ben", "11", "92"],
          ["3", "Cara", "10", "65"],
          ["4", "Dan", "12", "88"],
          ["5", "Eve", "11", "55"],
        ],
      },
    ],
    query: `SELECT name
FROM students
ORDER BY grade ASC, name DESC;`,
    prompt: {
      th: "ลำดับแถวที่คำสั่งนี้คืนออกมาเป็นอย่างไร",
      en: "In what order does this query return the rows?",
    },
    explanation: {
      th: "คีย์แรก grade เรียงจากน้อยไปมาก ได้กลุ่ม 10, 11, 12 ภายในแต่ละ grade คีย์ที่สอง name เรียงจากมากไปน้อย: grade 10 ได้ Cara, Ann; grade 11 ได้ Eve, Ben; grade 12 ได้ Dan ตัวเลือกลวงใช้ทิศทางเดียวกันทั้งสองคีย์",
      en: "The first key sorts grade ascending into 10, 11, 12. Inside each grade the second key sorts name descending: grade 10 gives Cara, Ann; grade 11 gives Eve, Ben; grade 12 gives Dan. The distractors apply the same direction to both keys.",
    },
    answer: {
      kind: "choice",
      choices: [
        "5 rows: (Ann), (Cara), (Ben), (Eve), (Dan)",
        "5 rows: (Cara), (Ann), (Eve), (Ben), (Dan)",
        "5 rows: (Dan), (Eve), (Ben), (Cara), (Ann)",
        "5 rows: (Ann), (Ben), (Cara), (Dan), (Eve)",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "sq-e-07",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "products",
        columns: ["id", "name", "category", "price"],
        rows: [
          ["1", "Mouse", "Accessory", "250"],
          ["2", "Keyboard", "Accessory", "900"],
          ["3", "Monitor", "Display", "4500"],
          ["4", "Laptop", "Computer", "32000"],
          ["5", "Cable", "Accessory", "120"],
        ],
      },
    ],
    query: `SELECT name
FROM products
WHERE category = 'Accessory'
ORDER BY price ASC;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "ตัวกรองเหลือสามแถวของ Accessory คือ Mouse (250), Keyboard (900) และ Cable (120) แม้ SELECT ไม่ได้ดึง price ออกมา แต่ ORDER BY ยังใช้คอลัมน์นั้นเรียงได้ ผลจึงเป็น Cable, Mouse, Keyboard ตัวเลือกลวงคือการคงลำดับตามตารางหรือเรียงกลับด้าน",
      en: "The filter keeps the three Accessory rows: Mouse (250), Keyboard (900) and Cable (120). Even though price is not selected, ORDER BY can still sort on it, so the result is Cable, Mouse, Keyboard. The distractors keep table order or sort descending.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (Mouse), (Keyboard), (Cable)",
        "3 rows: (Keyboard), (Mouse), (Cable)",
        "4 rows: (Cable), (Mouse), (Keyboard), (Monitor)",
        "3 rows: (Cable), (Mouse), (Keyboard)",
      ],
      correctIndex: 3,
    },
  },
  {
    id: "sq-e-08",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "orders",
        columns: ["id", "customer", "amount", "status"],
        rows: [
          ["1", "Ann", "300", "paid"],
          ["2", "Ben", "150", "pending"],
          ["3", "Cara", "900", "paid"],
          ["4", "Dan", "450", "paid"],
          ["5", "Eve", "200", "cancelled"],
        ],
      },
    ],
    query: `SELECT COUNT(*)
FROM orders
WHERE status <> 'paid';`,
    prompt: {
      th: "คำสั่งนี้คืนตัวเลขอะไร",
      en: "What number does this query return?",
    },
    explanation: {
      th: "<> คือไม่เท่ากับ แถวที่ status ไม่ใช่ 'paid' คือ id 2 (pending) และ id 5 (cancelled) ส่วนอีกสามแถวเป็น paid จึงถูกตัดออก COUNT(*) จึงได้ 2",
      en: "<> means not equal, so the rows kept are id 2 (pending) and id 5 (cancelled); the other three are paid and get filtered out. COUNT(*) therefore returns 2.",
    },
    answer: { kind: "text", accepted: ["2", "(2)"] },
  },
  {
    id: "sq-e-09",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "orders",
        columns: ["id", "customer", "amount", "status"],
        rows: [
          ["1", "Ann", "300", "paid"],
          ["2", "Ben", "150", "pending"],
          ["3", "Cara", "900", "paid"],
          ["4", "Dan", "450", "paid"],
          ["5", "Eve", "200", "cancelled"],
        ],
      },
    ],
    query: `SELECT SUM(amount)
FROM orders
WHERE status = 'paid';`,
    prompt: {
      th: "ผลรวมที่คำสั่งนี้คืนออกมาคือเท่าใด",
      en: "What total does this query return?",
    },
    explanation: {
      th: "ตัวกรองเหลือเฉพาะสามแถวที่จ่ายแล้วคือ 300, 900 และ 450 SUM จึงบวกได้ 1650 ค่ารวมทุกแถวคือ 2000 ซึ่งเป็นคำตอบของคนที่ลืมเงื่อนไข WHERE",
      en: "The filter keeps only the three paid rows: 300, 900 and 450, so SUM gives 1650. Summing every row would give 2000, which is the answer for someone who ignores the WHERE clause.",
    },
    answer: { kind: "text", accepted: ["1650", "(1650)", "1,650"] },
  },
  {
    id: "sq-e-10",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "customers",
        columns: ["id", "name", "city", "points"],
        rows: [
          ["1", "Ann", "Bangkok", "120"],
          ["2", "Ben", "Chiang Mai", "80"],
          ["3", "Cara", "Bangkok", "200"],
          ["4", "Dan", "Phuket", "150"],
        ],
      },
    ],
    query: `SELECT name
FROM customers
ORDER BY points DESC
LIMIT 2 OFFSET 1;`,
    prompt: {
      th: "คำสั่งนี้คืนชื่อใดออกมา",
      en: "Which names does this query return?",
    },
    explanation: {
      th: "เรียง points จากมากไปน้อยได้ Cara (200), Dan (150), Ann (120), Ben (80) จากนั้น OFFSET 1 ข้ามแถวแรกทิ้ง แล้ว LIMIT 2 หยิบสองแถวถัดไปคือ Dan และ Ann ตัวเลือกลวงคือการลืม OFFSET",
      en: "Sorting points descending gives Cara (200), Dan (150), Ann (120), Ben (80). OFFSET 1 skips the first row and LIMIT 2 takes the next two, Dan and Ann. The distractor ignores the OFFSET.",
    },
    answer: {
      kind: "choice",
      choices: [
        "2 rows: (Cara), (Dan)",
        "2 rows: (Dan), (Ann)",
        "2 rows: (Ann), (Ben)",
        "1 row: (Dan)",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "sq-e-11",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "employees",
        columns: ["id", "name", "dept", "salary"],
        rows: [
          ["1", "Ann", "Sales", "5000"],
          ["2", "Ben", "IT", "6000"],
          ["3", "Cara", "Sales", "4500"],
          ["4", "Dan", "IT", "7000"],
          ["5", "Eve", "HR", "4000"],
        ],
      },
    ],
    query: `SELECT name, dept
FROM employees
WHERE dept = 'HR' OR salary >= 7000
ORDER BY name;`,
    prompt: {
      th: "ผลลัพธ์ของคำสั่งนี้คืออะไร",
      en: "What is the result of this query?",
    },
    explanation: {
      th: "OR เป็นจริงเมื่อข้างใดข้างหนึ่งจริง ข้างซ้ายได้ Eve (HR) ข้างขวาได้ Dan (7000) ส่วน Ben ได้ 6000 ยังไม่ถึงเกณฑ์ เรียงตามชื่อจึงได้ Dan ก่อน Eve ตัวเลือกลวงคือการเข้าใจว่าเป็น AND หรือดึง Ben เข้ามาด้วย",
      en: "OR succeeds when either side holds: the left side yields Eve (HR) and the right side yields Dan (7000), while Ben at 6000 misses the threshold. Sorting by name puts Dan before Eve. The distractors read the condition as AND or pull Ben in as well.",
    },
    answer: {
      kind: "choice",
      choices: [
        "1 row: (Eve, HR)",
        "3 rows: (Ben, IT), (Dan, IT), (Eve, HR)",
        "2 rows: (Dan, IT), (Eve, HR)",
        "2 rows: (Eve, HR), (Dan, IT)",
      ],
      correctIndex: 2,
    },
  },
  {
    id: "sq-e-12",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "students",
        columns: ["id", "name", "grade", "score"],
        rows: [
          ["1", "Ann", "10", "78"],
          ["2", "Ben", "11", "92"],
          ["3", "Cara", "10", "65"],
          ["4", "Dan", "12", "88"],
          ["5", "Eve", "11", "55"],
        ],
      },
    ],
    query: `SELECT name, score
FROM students
WHERE score BETWEEN 60 AND 90
ORDER BY score DESC
LIMIT 1;`,
    prompt: {
      th: "คำสั่งนี้คืนแถวใด",
      en: "Which row does this query return?",
    },
    explanation: {
      th: "BETWEEN 60 AND 90 รวมปลายทั้งสองข้าง จึงเหลือ Ann (78), Cara (65) และ Dan (88) ส่วน Ben (92) กับ Eve (55) อยู่นอกช่วง เรียงคะแนนจากมากไปน้อยแล้ว LIMIT 1 ได้ Dan ที่ 88 ตัวเลือกลวงคือหยิบ Ben ที่คะแนนสูงสุดของทั้งตารางหรือลืม LIMIT",
      en: "BETWEEN 60 AND 90 is inclusive, so Ann (78), Cara (65) and Dan (88) remain while Ben (92) and Eve (55) fall outside. Sorting score descending and taking LIMIT 1 gives Dan at 88. The distractors grab the overall top score or forget the LIMIT.",
    },
    answer: {
      kind: "choice",
      choices: [
        "1 row: (Ben, 92)",
        "1 row: (Cara, 65)",
        "3 rows: (Dan, 88), (Ann, 78), (Cara, 65)",
        "1 row: (Dan, 88)",
      ],
      correctIndex: 3,
    },
  },
  {
    id: "sq-m-01",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "employees",
        columns: ["id", "name", "dept_id", "salary"],
        rows: [
          ["1", "Ann", "10", "5000"],
          ["2", "Ben", "20", "6000"],
          ["3", "Cara", "10", "4500"],
          ["4", "Dan", "NULL", "7000"],
        ],
      },
      {
        name: "departments",
        columns: ["id", "name"],
        rows: [
          ["10", "Sales"],
          ["20", "IT"],
          ["30", "HR"],
        ],
      },
    ],
    query: `SELECT e.name, d.name AS dept
FROM employees e
JOIN departments d ON e.dept_id = d.id
ORDER BY e.name;`,
    prompt: {
      th: "การ JOIN นี้คืนผลลัพธ์อะไร",
      en: "What does this join return?",
    },
    explanation: {
      th: "INNER JOIN เก็บเฉพาะคู่ที่จับกันได้ Ann และ Cara ชี้ไปแผนก 10 (Sales) Ben ชี้ไป 20 (IT) ส่วน Dan มี dept_id เป็น NULL ซึ่งเทียบเท่ากับอะไรก็ไม่เป็นจริง จึงหลุดออกไป และแผนก HR ที่ไม่มีพนักงานก็ไม่ปรากฏ ตัวเลือกลวงคือการคิดว่า Dan ยังอยู่แบบ LEFT JOIN",
      en: "An INNER JOIN keeps only matching pairs: Ann and Cara point at department 10 (Sales), Ben at 20 (IT), while Dan has a NULL dept_id which never compares equal and is dropped. HR has no employees so it never appears. The distractors assume Dan survives as in a LEFT JOIN.",
    },
    answer: {
      kind: "choice",
      choices: [
        "4 rows: (Ann, Sales), (Ben, IT), (Cara, Sales), (Dan, NULL)",
        "3 rows: (Ann, Sales), (Ben, IT), (Cara, Sales)",
        "4 rows: (Ann, Sales), (Ben, IT), (Cara, Sales), (Dan, HR)",
        "2 rows: (Ann, Sales), (Cara, Sales)",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "sq-m-02",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "employees",
        columns: ["id", "name", "dept_id", "salary"],
        rows: [
          ["1", "Ann", "10", "5000"],
          ["2", "Ben", "20", "6000"],
          ["3", "Cara", "10", "4500"],
          ["4", "Dan", "NULL", "7000"],
        ],
      },
      {
        name: "departments",
        columns: ["id", "name"],
        rows: [
          ["10", "Sales"],
          ["20", "IT"],
          ["30", "HR"],
        ],
      },
    ],
    query: `SELECT e.name, d.name AS dept
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
ORDER BY e.name;`,
    prompt: {
      th: "คำสั่ง LEFT JOIN นี้คืนผลลัพธ์อะไร",
      en: "What does this LEFT JOIN return?",
    },
    explanation: {
      th: "LEFT JOIN เก็บทุกแถวของตารางซ้ายไว้ครบ 4 แถว แถวที่จับคู่ได้เติมชื่อแผนกตามปกติ แต่ Dan ที่ dept_id เป็น NULL ไม่มีคู่ จึงได้คอลัมน์ฝั่งขวาเป็น NULL แผนก HR ยังไม่ปรากฏเพราะทิศทางของ join มาจากฝั่ง employees ตัวเลือกลวงคือผลของ INNER JOIN และการเดาว่า Dan ไปจับกับ HR",
      en: "A LEFT JOIN keeps all four left rows. Matched rows get their department name, but Dan with a NULL dept_id has no match so the right-hand column comes back NULL. HR still never shows because the join is driven from employees. The distractors are the INNER JOIN result and a guess that Dan pairs with HR.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (Ann, Sales), (Ben, IT), (Cara, Sales)",
        "4 rows: (Ann, Sales), (Ben, IT), (Cara, Sales), (Dan, HR)",
        "5 rows: (Ann, Sales), (Ben, IT), (Cara, Sales), (Dan, NULL), (NULL, HR)",
        "4 rows: (Ann, Sales), (Ben, IT), (Cara, Sales), (Dan, NULL)",
      ],
      correctIndex: 3,
    },
  },
  {
    id: "sq-m-03",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "employees",
        columns: ["id", "name", "dept", "salary"],
        rows: [
          ["1", "Ann", "Sales", "5000"],
          ["2", "Ben", "IT", "6000"],
          ["3", "Cara", "Sales", "4500"],
          ["4", "Dan", "IT", "7000"],
          ["5", "Eve", "Sales", "4000"],
        ],
      },
    ],
    query: `SELECT dept, COUNT(*) AS n
FROM employees
GROUP BY dept
ORDER BY n DESC;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "GROUP BY dept ยุบ 5 แถวเป็น 2 กลุ่ม คือ Sales (Ann, Cara, Eve) และ IT (Ben, Dan) COUNT(*) นับสมาชิกในแต่ละกลุ่มได้ 3 และ 2 แล้ว ORDER BY n DESC เรียงจากกลุ่มใหญ่ไปเล็ก ผลจึงเป็น Sales ก่อน IT ตัวเลือกลวงคือเรียงกลับด้านหรือใช้จำนวนแถวทั้งตาราง",
      en: "GROUP BY dept collapses five rows into two groups: Sales (Ann, Cara, Eve) and IT (Ben, Dan). COUNT(*) counts each group as 3 and 2, then ORDER BY n DESC puts the larger group first, so Sales precedes IT. The distractors reverse the order or use the whole-table row count.",
    },
    answer: {
      kind: "choice",
      choices: [
        "2 rows: (Sales, 3), (IT, 2)",
        "2 rows: (IT, 2), (Sales, 3)",
        "2 rows: (Sales, 5), (IT, 2)",
        "1 row: (Sales, 3)",
      ],
      correctIndex: 0,
    },
  },
  {
    id: "sq-m-04",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "employees",
        columns: ["id", "name", "dept", "salary"],
        rows: [
          ["1", "Ann", "Sales", "5000"],
          ["2", "Ben", "IT", "6000"],
          ["3", "Cara", "Sales", "4500"],
          ["4", "Dan", "IT", "7000"],
          ["5", "Eve", "Sales", "4000"],
        ],
      },
    ],
    query: `SELECT AVG(salary)
FROM employees
WHERE dept = 'IT';`,
    prompt: {
      th: "ค่าเฉลี่ยที่คำสั่งนี้คืนออกมาคือเท่าใด",
      en: "What average does this query return?",
    },
    explanation: {
      th: "WHERE กรองก่อน เหลือแถว IT สองแถวคือ 6000 และ 7000 AVG จึงหารด้วยจำนวนแถวที่เหลือ ไม่ใช่ 5 แถวทั้งตาราง ได้ 13000 / 2 = 6500",
      en: "WHERE filters first, leaving the two IT rows 6000 and 7000. AVG divides by the number of surviving rows, not all five, giving 13000 / 2 = 6500.",
    },
    answer: { kind: "text", accepted: ["6500", "6500.0", "(6500)", "6,500"] },
  },
  {
    id: "sq-m-05",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "employees",
        columns: ["id", "name", "manager_id"],
        rows: [
          ["1", "Ann", "NULL"],
          ["2", "Ben", "1"],
          ["3", "Cara", "1"],
          ["4", "Dan", "NULL"],
          ["5", "Eve", "2"],
        ],
      },
    ],
    query: `SELECT COUNT(*) AS a, COUNT(manager_id) AS b
FROM employees;`,
    prompt: {
      th: "คำสั่งนี้คืนค่า a และ b เป็นเท่าใด",
      en: "What values of a and b does this query return?",
    },
    explanation: {
      th: "COUNT(*) นับทุกแถวโดยไม่สนใจค่าใน คอลัมน์ จึงได้ 5 ส่วน COUNT(manager_id) นับเฉพาะแถวที่คอลัมน์นั้นไม่เป็น NULL คือ Ben, Cara และ Eve จึงได้ 3 กับดักคือการคิดว่า COUNT ทั้งสองแบบให้ผลเท่ากันหรือคิดว่า NULL ถูกนับเป็น 0",
      en: "COUNT(*) counts every row regardless of content, giving 5, while COUNT(manager_id) counts only rows where that column is not NULL, namely Ben, Cara and Eve, giving 3. The trap is assuming both forms of COUNT agree, or that NULL is counted as a zero.",
    },
    answer: {
      kind: "choice",
      choices: ["(5, 5)", "(3, 3)", "(5, 3)", "(5, 2)"],
      correctIndex: 2,
    },
  },
  {
    id: "sq-m-06",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "orders",
        columns: ["id", "customer", "product"],
        rows: [
          ["1", "Ann", "Mouse"],
          ["2", "Ben", "Keyboard"],
          ["3", "Ann", "Monitor"],
          ["4", "Cara", "Mouse"],
          ["5", "Ann", "Mouse"],
        ],
      },
    ],
    query: `SELECT DISTINCT customer
FROM orders
ORDER BY customer;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "DISTINCT ยุบค่าที่ซ้ำกันในคอลัมน์ที่เลือกให้เหลือแถวเดียว Ann ปรากฏ 3 ครั้งจึงเหลือ 1 แถว รวมกับ Ben และ Cara ได้ 3 แถว แล้ว ORDER BY เรียงตามตัวอักษรเป็น Ann, Ben, Cara ตัวเลือกลวงคือการคืนทุกแถวหรือคืนตัวเลขนับแทนรายชื่อ",
      en: "DISTINCT collapses duplicate values of the selected column into one row: Ann appears three times but yields a single row, joining Ben and Cara for three rows total, and ORDER BY sorts them alphabetically as Ann, Ben, Cara. The distractors return every row or return a count instead of the names.",
    },
    answer: {
      kind: "choice",
      choices: [
        "5 rows: (Ann), (Ben), (Ann), (Cara), (Ann)",
        "3 rows: (Ann), (Cara), (Ben)",
        "1 row: (3)",
        "3 rows: (Ann), (Ben), (Cara)",
      ],
      correctIndex: 3,
    },
  },
  {
    id: "sq-m-07",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "students",
        columns: ["id", "name", "score"],
        rows: [
          ["1", "Ann", "78"],
          ["2", "Ben", "NULL"],
          ["3", "Cara", "65"],
          ["4", "Dan", "NULL"],
          ["5", "Eve", "90"],
        ],
      },
    ],
    query: `SELECT COUNT(*)
FROM students
WHERE score < 80;`,
    prompt: {
      th: "คำสั่งนี้คืนตัวเลขอะไร",
      en: "What number does this query return?",
    },
    explanation: {
      th: "การเปรียบเทียบ NULL < 80 ให้ผลเป็น unknown ไม่ใช่จริงหรือเท็จ ดังนั้นแถวของ Ben และ Dan ไม่ผ่านตัวกรอง เหลือ Ann (78) และ Cara (65) COUNT(*) จึงได้ 2 กับดักคือการคิดว่า NULL ถูกมองเป็น 0 ซึ่งจะทำให้ได้ 4",
      en: "Comparing NULL < 80 yields unknown rather than true or false, so Ben and Dan fail the filter and only Ann (78) and Cara (65) remain, making COUNT(*) return 2. The trap is treating NULL as zero, which would give 4.",
    },
    answer: { kind: "text", accepted: ["2", "(2)"] },
  },
  {
    id: "sq-m-08",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "courses",
        columns: ["id", "title", "credits"],
        rows: [
          ["1", "Math", "3"],
          ["2", "Art", "2"],
          ["3", "Physics", "4"],
        ],
      },
      {
        name: "enrollments",
        columns: ["student_name", "course_id"],
        rows: [
          ["Ann", "1"],
          ["Ben", "2"],
          ["Ann", "3"],
          ["Cara", "1"],
        ],
      },
    ],
    query: `SELECT e.student_name, c.title
FROM enrollments e
JOIN courses c ON e.course_id = c.id
WHERE c.credits >= 3
ORDER BY e.student_name, c.title;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "JOIN จับ enrollment แต่ละแถวกับวิชาที่ตรง id ได้ Ann-Math, Ben-Art, Ann-Physics, Cara-Math จากนั้น WHERE บนคอลัมน์ของตารางขวาตัด Ben-Art ออกเพราะ Art มี 2 หน่วยกิต เหลือ 3 แถว แล้วเรียงตามชื่อและชื่อวิชา ได้ Ann-Math, Ann-Physics, Cara-Math ตัวเลือกลวงคือการลืมกรองหน่วยกิตหรือสลับลำดับคีย์ที่สอง",
      en: "The join pairs each enrollment with its course, giving Ann-Math, Ben-Art, Ann-Physics and Cara-Math; the WHERE on the right table then drops Ben-Art because Art carries 2 credits, leaving three rows sorted by name then title as Ann-Math, Ann-Physics, Cara-Math. The distractors skip the credit filter or ignore the second sort key.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (Ann, Math), (Ann, Physics), (Cara, Math)",
        "4 rows: (Ann, Math), (Ann, Physics), (Ben, Art), (Cara, Math)",
        "2 rows: (Ann, Math), (Cara, Math)",
        "3 rows: (Ann, Physics), (Ann, Math), (Cara, Math)",
      ],
      correctIndex: 0,
    },
  },
  {
    id: "sq-m-09",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "orders",
        columns: ["id", "customer", "amount"],
        rows: [
          ["1", "Ann", "300"],
          ["2", "Ben", "150"],
          ["3", "Ann", "200"],
          ["4", "Cara", "400"],
          ["5", "Ben", "50"],
        ],
      },
    ],
    query: `SELECT customer, SUM(amount) AS total
FROM orders
GROUP BY customer
ORDER BY total DESC;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "จัดกลุ่มตามลูกค้าแล้วบวกยอดในกลุ่ม: Ann ได้ 300 + 200 = 500, Ben ได้ 150 + 50 = 200, Cara ได้ 400 จากนั้นเรียงด้วย total จากมากไปน้อย ผลจึงเป็น Ann, Cara, Ben ซึ่งไม่ใช่ลำดับตัวอักษร ตัวเลือกลวงคือเรียงตามชื่อ เรียงกลับด้าน หรือใช้ COUNT แทน SUM",
      en: "Grouping by customer sums each group: Ann 300 + 200 = 500, Ben 150 + 50 = 200, Cara 400. Sorting by total descending gives Ann, Cara, Ben, which is not alphabetical order. The distractors sort by name, sort ascending, or count rows instead of summing.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (Ann, 500), (Ben, 200), (Cara, 400)",
        "3 rows: (Ben, 200), (Cara, 400), (Ann, 500)",
        "3 rows: (Ann, 500), (Cara, 400), (Ben, 200)",
        "3 rows: (Ann, 2), (Ben, 2), (Cara, 1)",
      ],
      correctIndex: 2,
    },
  },
  {
    id: "sq-m-10",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "customers",
        columns: ["id", "name"],
        rows: [
          ["1", "Ann"],
          ["2", "Ben"],
          ["3", "Cara"],
        ],
      },
      {
        name: "orders",
        columns: ["id", "customer_id", "amount"],
        rows: [
          ["1", "1", "300"],
          ["2", "1", "200"],
          ["3", "3", "150"],
        ],
      },
    ],
    query: `SELECT c.name, o.amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
ORDER BY c.name, o.amount;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "Ann มีสองออเดอร์จึงถูกขยายเป็นสองแถว Cara มีหนึ่งแถว และ Ben ไม่มีออเดอร์เลยแต่ LEFT JOIN ยังเก็บไว้พร้อม amount เป็น NULL รวม 4 แถว การเรียงคีย์ที่สองด้วย amount แบบขึ้นทำให้แถวของ Ann เป็น 200 ก่อน 300 ตัวเลือกลวงคือผลของ INNER JOIN ที่ Ben หายไป และการคิดว่าค่าที่ขาดกลายเป็น 0",
      en: "Ann has two orders so she expands to two rows, Cara has one, and Ben has none but the LEFT JOIN keeps him with a NULL amount, four rows in all. Sorting the second key ascending puts Ann's 200 before her 300. The distractors are the INNER JOIN result where Ben disappears, and treating the missing value as 0.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (Ann, 200), (Ann, 300), (Cara, 150)",
        "4 rows: (Ann, 200), (Ann, 300), (Ben, NULL), (Cara, 150)",
        "4 rows: (Ann, 300), (Ann, 200), (Ben, NULL), (Cara, 150)",
        "3 rows: (Ann, 500), (Ben, 0), (Cara, 150)",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "sq-m-11",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "products",
        columns: ["id", "name", "category", "price"],
        rows: [
          ["1", "Mouse", "Accessory", "250"],
          ["2", "Keyboard", "Accessory", "900"],
          ["3", "Monitor", "Display", "4500"],
          ["4", "Panel", "Display", "6200"],
          ["5", "Cable", "Accessory", "120"],
        ],
      },
    ],
    query: `SELECT category, MIN(price) AS lowest
FROM products
GROUP BY category
ORDER BY category;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "มีสองกลุ่มคือ Accessory (250, 900, 120) และ Display (4500, 6200) MIN เลือกค่าน้อยสุดในแต่ละกลุ่มได้ 120 และ 4500 แล้วเรียงตามชื่อหมวดได้ Accessory ก่อน Display ตัวเลือกลวงคือใช้ MAX แทน MIN หรือคืนชื่อสินค้าที่ถูกที่สุดซึ่งไม่ได้อยู่ใน SELECT",
      en: "There are two groups, Accessory (250, 900, 120) and Display (4500, 6200), so MIN picks 120 and 4500 and ORDER BY category lists Accessory before Display. The distractors use MAX instead of MIN or return a product name that is not in the SELECT list.",
    },
    answer: {
      kind: "choice",
      choices: [
        "2 rows: (Accessory, 900), (Display, 6200)",
        "2 rows: (Display, 4500), (Accessory, 120)",
        "1 row: (Cable, 120)",
        "2 rows: (Accessory, 120), (Display, 4500)",
      ],
      correctIndex: 3,
    },
  },
  {
    id: "sq-m-12",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "orders",
        columns: ["id", "customer", "product"],
        rows: [
          ["1", "Ann", "Mouse"],
          ["2", "Ben", "Keyboard"],
          ["3", "Ann", "Monitor"],
          ["4", "Cara", "Mouse"],
          ["5", "Ann", "Mouse"],
        ],
      },
    ],
    query: `SELECT COUNT(DISTINCT customer)
FROM orders;`,
    prompt: {
      th: "ค่าที่คำสั่งนี้คืนออกมาคือเท่าใด",
      en: "What value does this query return?",
    },
    explanation: {
      th: "COUNT(DISTINCT customer) นับจำนวนค่าที่ไม่ซ้ำกัน ได้ Ann, Ben และ Cara รวม 3 ไม่ใช่ 5 ซึ่งเป็นผลของ COUNT(*) ที่นับทุกแถวรวมชื่อซ้ำ",
      en: "COUNT(DISTINCT customer) counts unique values, namely Ann, Ben and Cara, giving 3 rather than the 5 that COUNT(*) would return by counting every row including duplicates.",
    },
    answer: { kind: "text", accepted: ["3", "(3)"] },
  },
  {
    id: "sq-h-01",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "employees",
        columns: ["id", "name", "dept", "salary"],
        rows: [
          ["1", "Ann", "Sales", "5000"],
          ["2", "Ben", "IT", "6000"],
          ["3", "Cara", "Sales", "4500"],
          ["4", "Dan", "IT", "7000"],
          ["5", "Eve", "Sales", "4000"],
          ["6", "Fay", "HR", "3000"],
        ],
      },
    ],
    query: `SELECT dept, COUNT(*) AS n
FROM employees
GROUP BY dept
HAVING COUNT(*) >= 2
ORDER BY dept;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "จัดกลุ่มได้ Sales 3 คน IT 2 คน และ HR 1 คน HAVING ทำงานหลังการรวมกลุ่ม จึงตัดกลุ่ม HR ที่มีสมาชิกไม่ถึง 2 ออก เหลือสองกลุ่มเรียงตามชื่อแผนกเป็น IT ก่อน Sales ตัวเลือกลวงคือลืม HAVING จนได้ HR ติดมา หรือเรียงตามจำนวนแทนชื่อแผนก",
      en: "The groups are Sales with 3, IT with 2 and HR with 1. HAVING runs after aggregation and removes HR for having fewer than 2 members, leaving two groups ordered by department name, so IT comes before Sales. The distractors forget HAVING and keep HR, or sort by the count instead of the name.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (HR, 1), (IT, 2), (Sales, 3)",
        "2 rows: (Sales, 3), (IT, 2)",
        "2 rows: (IT, 2), (Sales, 3)",
        "1 row: (Sales, 3)",
      ],
      correctIndex: 2,
    },
  },
  {
    id: "sq-h-02",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "departments",
        columns: ["id", "name", "city"],
        rows: [
          ["10", "Sales", "Bangkok"],
          ["20", "IT", "Bangkok"],
          ["30", "HR", "Phuket"],
        ],
      },
      {
        name: "employees",
        columns: ["id", "name", "dept_id", "salary"],
        rows: [
          ["1", "Ann", "10", "5000"],
          ["2", "Ben", "20", "6000"],
          ["3", "Cara", "30", "4500"],
          ["4", "Dan", "10", "7000"],
        ],
      },
    ],
    query: `SELECT name
FROM employees
WHERE dept_id IN (SELECT id FROM departments WHERE city = 'Bangkok')
ORDER BY name;`,
    prompt: {
      th: "คำสั่งนี้คืนชื่อใดออกมา",
      en: "Which names does this query return?",
    },
    explanation: {
      th: "ซับคิวรีทำงานก่อนและคืนชุด id ของแผนกในกรุงเทพคือ 10 และ 20 จากนั้น IN เก็บพนักงานที่ dept_id อยู่ในชุดนั้น ได้ Ann (10), Ben (20) และ Dan (10) ส่วน Cara อยู่แผนก 30 ที่ภูเก็ตจึงหลุด เรียงตามชื่อได้ Ann, Ben, Dan ตัวเลือกลวงคือการอ่านเป็น NOT IN หรือลืมเงื่อนไขเมืองไปเลย",
      en: "The subquery runs first and returns the Bangkok department ids 10 and 20, then IN keeps employees whose dept_id is in that set: Ann (10), Ben (20) and Dan (10), while Cara in department 30 in Phuket is dropped. Sorting by name gives Ann, Ben, Dan. The distractors read the test as NOT IN or ignore the city filter.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (Ann), (Ben), (Dan)",
        "1 row: (Cara)",
        "4 rows: (Ann), (Ben), (Cara), (Dan)",
        "2 rows: (Ann), (Dan)",
      ],
      correctIndex: 0,
    },
  },
  {
    id: "sq-h-03",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "employees",
        columns: ["id", "name", "salary"],
        rows: [
          ["1", "Ann", "5000"],
          ["2", "Ben", "6000"],
          ["3", "Cara", "4500"],
          ["4", "Dan", "7000"],
          ["5", "Eve", "4000"],
        ],
      },
    ],
    query: `SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "ซับคิวรีคืนค่าเดี่ยวคือค่าเฉลี่ยเงินเดือน (5000 + 6000 + 4500 + 7000 + 4000) / 5 = 5300 แถวที่มากกว่า 5300 คือ Ben (6000) และ Dan (7000) ส่วน Ann ที่ 5000 ต่ำกว่าค่าเฉลี่ย จากนั้นเรียงเงินเดือนจากมากไปน้อยได้ Dan ก่อน Ben ตัวเลือกลวงคือคิดค่าเฉลี่ยผิดจนดึง Ann เข้ามา หรือเรียงจากน้อยไปมาก",
      en: "The subquery returns a single value, the average salary (5000 + 6000 + 4500 + 7000 + 4000) / 5 = 5300, so only Ben (6000) and Dan (7000) exceed it while Ann at 5000 sits below the average. Sorting salary descending puts Dan before Ben. The distractors mis-estimate the average and include Ann, or sort ascending.",
    },
    answer: {
      kind: "choice",
      choices: [
        "2 rows: (Ben, 6000), (Dan, 7000)",
        "3 rows: (Dan, 7000), (Ben, 6000), (Ann, 5000)",
        "1 row: (Dan, 7000)",
        "2 rows: (Dan, 7000), (Ben, 6000)",
      ],
      correctIndex: 3,
    },
  },
  {
    id: "sq-h-04",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "employees",
        columns: ["id", "name", "dept", "salary"],
        rows: [
          ["1", "Ann", "Sales", "5000"],
          ["2", "Ben", "IT", "6000"],
          ["3", "Cara", "Sales", "4500"],
          ["4", "Dan", "IT", "7000"],
          ["5", "Eve", "Sales", "4000"],
          ["6", "Fay", "HR", "3000"],
        ],
      },
    ],
    query: `SELECT COUNT(*)
FROM (
  SELECT dept
  FROM employees
  GROUP BY dept
  HAVING COUNT(*) >= 2
) AS t;`,
    prompt: {
      th: "คำสั่งนี้คืนตัวเลขอะไร",
      en: "What number does this query return?",
    },
    explanation: {
      th: "ซับคิวรีชั้นในจัดกลุ่มได้ Sales 3, IT 2 และ HR 1 แล้ว HAVING ตัด HR ออก เหลือ 2 แถวคือ Sales และ IT คิวรีชั้นนอกนับแถวของผลลัพธ์นั้น ไม่ใช่นับพนักงาน จึงได้ 2 ไม่ใช่ 5",
      en: "The inner query groups into Sales 3, IT 2 and HR 1, and HAVING drops HR, leaving two rows for Sales and IT. The outer query counts those result rows rather than employees, so the answer is 2, not 5.",
    },
    answer: { kind: "text", accepted: ["2", "(2)"] },
  },
  {
    id: "sq-h-05",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "orders",
        columns: ["id", "customer", "product_id"],
        rows: [
          ["1", "Ann", "100"],
          ["2", "Ben", "200"],
          ["3", "Ann", "200"],
        ],
      },
      {
        name: "products",
        columns: ["id", "name", "price"],
        rows: [
          ["100", "Mouse", "250"],
          ["200", "Monitor", "4500"],
        ],
      },
    ],
    query: `SELECT o.customer, p.name AS product
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE p.price > 1000
ORDER BY o.customer, p.name;`,
    prompt: {
      th: "การ JOIN นี้คืนผลลัพธ์อะไร",
      en: "What does this join return?",
    },
    explanation: {
      th: "แต่ละแถวของ orders ถูกจับกับสินค้าที่ตรงรหัส ได้ Ann-Mouse, Ben-Monitor และ Ann-Monitor จากนั้น WHERE p.price > 1000 ตัด Ann-Mouse ออกเพราะเมาส์ราคา 250 เหลือสองแถว เรียงตามชื่อลูกค้าได้ Ann ก่อน Ben ตัวเลือกลวงคือลืมกรองราคาหรือเรียงตามลำดับของตาราง orders",
      en: "Each orders row is matched to its product by id, giving Ann-Mouse, Ben-Monitor and Ann-Monitor, then WHERE p.price > 1000 removes Ann-Mouse since the mouse costs 250, leaving two rows ordered by customer name with Ann before Ben. The distractors skip the price filter or keep the original orders order.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (Ann, Monitor), (Ann, Mouse), (Ben, Monitor)",
        "2 rows: (Ann, Monitor), (Ben, Monitor)",
        "2 rows: (Ben, Monitor), (Ann, Monitor)",
        "1 row: (Ann, Monitor)",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "sq-h-06",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "customers",
        columns: ["id", "name"],
        rows: [
          ["1", "Ann"],
          ["2", "Ben"],
          ["3", "Cara"],
        ],
      },
      {
        name: "orders",
        columns: ["id", "customer_id", "amount"],
        rows: [
          ["1", "1", "300"],
          ["2", "1", "200"],
          ["3", "3", "150"],
        ],
      },
    ],
    query: `SELECT c.name, COUNT(o.id) AS order_count
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.name
ORDER BY order_count DESC, c.name;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "LEFT JOIN สร้างแถว Ann สองแถว Cara หนึ่งแถว และ Ben หนึ่งแถวที่ฝั่งขวาเป็น NULL เมื่อจัดกลุ่มตามชื่อ COUNT(o.id) จะไม่นับ NULL ทำให้ Ben ได้ 0 ในขณะที่ COUNT(*) จะได้ 1 ซึ่งเป็นกับดักหลัก แล้วเรียงจำนวนจากมากไปน้อยได้ Ann 2, Cara 1, Ben 0",
      en: "The LEFT JOIN produces two rows for Ann, one for Cara and one for Ben whose right side is NULL. Grouping by name, COUNT(o.id) skips that NULL so Ben scores 0, whereas COUNT(*) would say 1, which is the main trap. Ordering the counts descending gives Ann 2, Cara 1, Ben 0.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (Ann, 2), (Cara, 1), (Ben, 1)",
        "2 rows: (Ann, 2), (Cara, 1)",
        "3 rows: (Ann, 2), (Cara, 1), (Ben, 0)",
        "3 rows: (Ann, 2), (Ben, 0), (Cara, 1)",
      ],
      correctIndex: 2,
    },
  },
  {
    id: "sq-h-07",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "orders",
        columns: ["id", "customer", "amount", "discount"],
        rows: [
          ["1", "Ann", "300", "50"],
          ["2", "Ben", "200", "NULL"],
          ["3", "Cara", "400", "100"],
        ],
      },
    ],
    query: `SELECT id, amount - discount AS net
FROM orders
ORDER BY id;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "ไม่มี WHERE จึงคืนทั้งสามแถว แถว 1 ได้ 300 - 50 = 250 และแถว 3 ได้ 400 - 100 = 300 แต่แถว 2 มี discount เป็น NULL และการคำนวณเลขคณิตกับ NULL ให้ผลเป็น NULL เสมอ ไม่ใช่ 200 หรือ 0 และแถวนั้นก็ไม่ได้ถูกตัดออกจากผลลัพธ์",
      en: "There is no WHERE so all three rows come back: row 1 gives 300 - 50 = 250 and row 3 gives 400 - 100 = 300, but row 2 has a NULL discount and arithmetic with NULL always yields NULL, not 200 and not 0, and the row is not dropped either.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (1, 250), (2, 200), (3, 300)",
        "3 rows: (1, 250), (2, NULL), (3, 300)",
        "2 rows: (1, 250), (3, 300)",
        "3 rows: (1, 250), (2, 0), (3, 300)",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "sq-h-08",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "orders",
        columns: ["id", "customer", "amount", "discount"],
        rows: [
          ["1", "Ann", "300", "50"],
          ["2", "Ben", "200", "NULL"],
          ["3", "Cara", "400", "100"],
        ],
      },
    ],
    query: `SELECT AVG(discount)
FROM orders;`,
    prompt: {
      th: "ค่าเฉลี่ยที่คำสั่งนี้คืนออกมาคือเท่าใด",
      en: "What average does this query return?",
    },
    explanation: {
      th: "ฟังก์ชันรวมข้าม NULL ทิ้งไปทั้งตัวหารและตัวตั้ง จึงเฉลี่ยเฉพาะ 50 กับ 100 ได้ 150 / 2 = 75 ถ้าคิดว่า NULL เป็น 0 แล้วหารด้วย 3 จะได้ 50 ซึ่งเป็นคำตอบผิดที่พบบ่อย",
      en: "Aggregates skip NULL in both the sum and the divisor, so only 50 and 100 are averaged: 150 / 2 = 75. Treating NULL as zero and dividing by 3 would give 50, the common wrong answer.",
    },
    answer: { kind: "text", accepted: ["75", "75.0", "(75)"] },
  },
  {
    id: "sq-h-09",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "employees",
        columns: ["id", "name", "manager_id"],
        rows: [
          ["1", "Ann", "NULL"],
          ["2", "Ben", "1"],
          ["3", "Cara", "1"],
          ["4", "Dan", "2"],
        ],
      },
    ],
    query: `SELECT e.name AS staff, m.name AS manager
FROM employees e
JOIN employees m ON e.manager_id = m.id
ORDER BY e.name;`,
    prompt: {
      th: "การ self join นี้คืนผลลัพธ์อะไร",
      en: "What does this self join return?",
    },
    explanation: {
      th: "ตารางเดียวถูกอ้างสองชื่อ e คือลูกน้อง m คือหัวหน้า เงื่อนไข e.manager_id = m.id จับ Ben กับ Cara ไปหา Ann และจับ Dan ไปหา Ben ส่วน Ann ที่ manager_id เป็น NULL ไม่มีคู่และ INNER JOIN จึงตัดออก เรียงตามชื่อลูกน้องได้ Ben, Cara, Dan ตัวเลือกลวงคือการสลับด้าน staff กับ manager หรือคิดว่า Ann ยังอยู่",
      en: "The same table is aliased twice, e for staff and m for manager, so e.manager_id = m.id links Ben and Cara to Ann and Dan to Ben, while Ann with a NULL manager_id has no match and the INNER JOIN removes her. Ordering by staff name gives Ben, Cara, Dan. The distractors swap the staff and manager columns or keep Ann.",
    },
    answer: {
      kind: "choice",
      choices: [
        "4 rows: (Ann, NULL), (Ben, Ann), (Cara, Ann), (Dan, Ben)",
        "3 rows: (Ann, Ben), (Ann, Cara), (Ben, Dan)",
        "2 rows: (Ben, Ann), (Cara, Ann)",
        "3 rows: (Ben, Ann), (Cara, Ann), (Dan, Ben)",
      ],
      correctIndex: 3,
    },
  },
  {
    id: "sq-h-10",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "customers",
        columns: ["id", "name"],
        rows: [
          ["1", "Ann"],
          ["2", "Ben"],
          ["3", "Cara"],
        ],
      },
      {
        name: "orders",
        columns: ["id", "customer_id", "amount"],
        rows: [
          ["1", "1", "300"],
          ["2", "1", "250"],
          ["3", "2", "400"],
          ["4", "3", "100"],
          ["5", "2", "100"],
        ],
      },
    ],
    query: `SELECT c.name, SUM(o.amount) AS total
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.name
HAVING SUM(o.amount) >= 500
ORDER BY total DESC;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "JOIN ได้ 5 แถวแล้วจัดกลุ่มตามชื่อ: Ann 300 + 250 = 550, Ben 400 + 100 = 500, Cara 100 HAVING ทดสอบยอดรวมของกลุ่มหลังรวมแล้ว เงื่อนไข >= 500 จึงเก็บ Ann และ Ben ไว้ทั้งคู่ และตัด Cara ออก เรียงยอดจากมากไปน้อยได้ Ann ก่อน Ben ตัวเลือกลวงคือลืม HAVING หรืออ่าน >= เป็น > ซึ่งจะทำให้ Ben หายไป",
      en: "The join yields five rows which group into Ann 300 + 250 = 550, Ben 400 + 100 = 500 and Cara 100. HAVING tests the group totals after aggregation, so >= 500 keeps both Ann and Ben and removes Cara, and ordering the totals descending puts Ann before Ben. The distractors forget HAVING or read >= as >, which would lose Ben.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (Ann, 550), (Ben, 500), (Cara, 100)",
        "1 row: (Ann, 550)",
        "2 rows: (Ben, 500), (Ann, 550)",
        "2 rows: (Ann, 550), (Ben, 500)",
      ],
      correctIndex: 3,
    },
  },
  {
    id: "sq-h-11",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "orders",
        columns: ["id", "customer_id", "amount"],
        rows: [
          ["1", "1", "300"],
          ["2", "1", "250"],
          ["3", "2", "400"],
          ["4", "3", "100"],
          ["5", "2", "100"],
        ],
      },
    ],
    query: `SELECT MAX(total)
FROM (
  SELECT customer_id, SUM(amount) AS total
  FROM orders
  GROUP BY customer_id
) AS t;`,
    prompt: {
      th: "ค่าที่คำสั่งนี้คืนออกมาคือเท่าใด",
      en: "What value does this query return?",
    },
    explanation: {
      th: "ชั้นในรวมยอดต่อลูกค้าได้ 550 สำหรับ customer 1, 500 สำหรับ customer 2 และ 100 สำหรับ customer 3 ชั้นนอกหาค่ามากสุดของยอดรวมเหล่านั้นได้ 550 ไม่ใช่ 400 ซึ่งเป็นยอดต่อออเดอร์ที่สูงสุด และไม่ใช่ 1150 ซึ่งเป็นยอดรวมทั้งตาราง",
      en: "The inner query totals each customer: 550 for customer 1, 500 for customer 2 and 100 for customer 3. The outer query takes the largest of those totals, 550, not 400 which is the biggest single order, and not 1150 which is the whole-table sum.",
    },
    answer: { kind: "text", accepted: ["550", "(550)"] },
  },
  {
    id: "sq-h-12",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "customers",
        columns: ["id", "name"],
        rows: [
          ["1", "Ann"],
          ["2", "Ben"],
          ["3", "Cara"],
        ],
      },
      {
        name: "orders",
        columns: ["id", "customer_id"],
        rows: [
          ["1", "1"],
          ["2", "NULL"],
          ["3", "3"],
        ],
      },
    ],
    query: `SELECT name
FROM customers
WHERE id NOT IN (SELECT customer_id FROM orders)
ORDER BY name;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "ซับคิวรีคืนชุดค่า 1, NULL และ 3 การทดสอบ id NOT IN (...) ถูกแปลเป็น id <> 1 AND id <> NULL AND id <> 3 ซึ่งข้อกลางให้ผล unknown ตลอด ทำให้ทั้งนิพจน์ไม่เคยเป็นจริง แม้แต่ Ben ที่ id = 2 จึงได้ผลลัพธ์ว่างเปล่า ตัวเลือกลวงคือการคาดว่าได้ Ben ตามที่ตั้งใจไว้ ซึ่งจะเป็นจริงเมื่อเพิ่ม WHERE customer_id IS NOT NULL ในซับคิวรี",
      en: "The subquery returns the set 1, NULL and 3, and id NOT IN (...) expands to id <> 1 AND id <> NULL AND id <> 3 where the middle test is always unknown, so the whole predicate is never true, not even for Ben with id = 2, and the result is empty. The distractor is the intended answer Ben, which you would only get by adding WHERE customer_id IS NOT NULL to the subquery.",
    },
    answer: {
      kind: "choice",
      choices: [
        "0 rows (empty result)",
        "1 row: (Ben)",
        "2 rows: (Ben), (Cara)",
        "3 rows: (Ann), (Ben), (Cara)",
      ],
      correctIndex: 0,
    },
  },
  {
    id: "sq-e-13",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "books",
        columns: ["id", "title", "author", "year", "price"],
        rows: [
          ["1", "Dune", "Herbert", "1965", "320"],
          ["2", "Emma", "Austen", "1815", "210"],
          ["3", "Hamlet", "Shakespeare", "1603", "180"],
          ["4", "Ilium", "Simmons", "2003", "400"],
          ["5", "Ivanhoe", "Scott", "1819", "260"],
        ],
      },
    ],
    query: `SELECT COUNT(*)
FROM books
WHERE year < 1900 AND price > 200;`,
    prompt: {
      th: "คำสั่งนี้คืนตัวเลขอะไร",
      en: "What number does this query return?",
    },
    explanation: {
      th: "เงื่อนไขข้างแรก year < 1900 เหลือ Emma (1815), Hamlet (1603) และ Ivanhoe (1819) จากนั้นข้าง price > 200 ตัด Hamlet ที่ราคา 180 ออก เพราะ AND ต้องจริงทั้งสองข้าง เหลือ 2 แถว COUNT(*) จึงได้ 2",
      en: "The first condition year < 1900 keeps Emma (1815), Hamlet (1603) and Ivanhoe (1819), then price > 200 drops Hamlet at 180 because AND needs both sides to hold, leaving 2 rows, so COUNT(*) returns 2.",
    },
    answer: { kind: "text", accepted: ["2", "(2)"] },
  },
  {
    id: "sq-e-14",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "books",
        columns: ["id", "title", "author", "year", "price"],
        rows: [
          ["1", "Dune", "Herbert", "1965", "320"],
          ["2", "Emma", "Austen", "1815", "210"],
          ["3", "Hamlet", "Shakespeare", "1603", "180"],
          ["4", "Ilium", "Simmons", "2003", "400"],
          ["5", "Ivanhoe", "Scott", "1819", "260"],
        ],
      },
    ],
    query: `SELECT title, price
FROM books
ORDER BY price DESC
LIMIT 3;`,
    prompt: {
      th: "ผลลัพธ์ของคำสั่งนี้คืออะไร",
      en: "What is the result of this query?",
    },
    explanation: {
      th: "ไม่มีตัวกรอง ราคาถูกเรียงจากมากไปน้อยเป็น 400, 320, 260, 210, 180 แล้ว LIMIT 3 เก็บสามแถวแรกคือ Ilium, Dune และ Ivanhoe ตัวเลือกลวงคือเรียงจากน้อยไปมากหรือเรียงตามชื่อเรื่องแทนราคา",
      en: "There is no filter, so prices sort descending as 400, 320, 260, 210, 180 and LIMIT 3 keeps the first three: Ilium, Dune and Ivanhoe. The distractors sort ascending or sort by title instead of price.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (Hamlet, 180), (Emma, 210), (Ivanhoe, 260)",
        "3 rows: (Ilium, 400), (Dune, 320), (Ivanhoe, 260)",
        "3 rows: (Dune, 320), (Emma, 210), (Hamlet, 180)",
        "5 rows: (Ilium, 400), (Dune, 320), (Ivanhoe, 260), (Emma, 210), (Hamlet, 180)",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "sq-e-15",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "sales",
        columns: ["id", "region", "units", "revenue"],
        rows: [
          ["1", "North", "10", "1000"],
          ["2", "South", "5", "700"],
          ["3", "North", "8", "900"],
          ["4", "East", "12", "1500"],
          ["5", "South", "3", "400"],
        ],
      },
    ],
    query: `SELECT SUM(units)
FROM sales
WHERE region <> 'North';`,
    prompt: {
      th: "ผลรวมที่คำสั่งนี้คืนออกมาคือเท่าใด",
      en: "What total does this query return?",
    },
    explanation: {
      th: "<> ตัดสองแถวของ North ออก เหลือ South 5, East 12 และ South 3 SUM(units) จึงบวกได้ 20 ถ้าลืม WHERE จะได้ 38 ซึ่งเป็นผลรวมของทั้งตาราง",
      en: "<> removes the two North rows, leaving South 5, East 12 and South 3, so SUM(units) adds up to 20. Ignoring the WHERE clause would give 38, the whole-table total.",
    },
    answer: { kind: "text", accepted: ["20", "(20)"] },
  },
  {
    id: "sq-e-16",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "sales",
        columns: ["id", "region", "units", "revenue"],
        rows: [
          ["1", "North", "10", "1000"],
          ["2", "South", "5", "700"],
          ["3", "North", "8", "900"],
          ["4", "East", "12", "1500"],
          ["5", "South", "3", "400"],
        ],
      },
    ],
    query: `SELECT region, SUM(revenue) AS total
FROM sales
GROUP BY region
ORDER BY region;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "GROUP BY region ยุบ 5 แถวเป็น 3 กลุ่ม แล้วบวก revenue ในกลุ่ม: East ได้ 1500, North ได้ 1000 + 900 = 1900 และ South ได้ 700 + 400 = 1100 จากนั้น ORDER BY region เรียงตามตัวอักษรเป็น East, North, South ตัวเลือกลวงคือการรวม units แทน revenue หรือเรียงตามยอดรวม",
      en: "GROUP BY region collapses five rows into three groups and sums revenue inside each: East 1500, North 1000 + 900 = 1900 and South 700 + 400 = 1100, then ORDER BY region lists them alphabetically as East, North, South. The distractors sum units instead of revenue or sort by the total.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (North, 1900), (South, 1100), (East, 1500)",
        "3 rows: (East, 12), (North, 18), (South, 8)",
        "3 rows: (East, 1500), (North, 1900), (South, 1100)",
        "3 rows: (North, 1900), (East, 1500), (South, 1100)",
      ],
      correctIndex: 2,
    },
  },
  {
    id: "sq-e-17",
    type: "sql-logic",
    difficulty: "easy",
    schema: [
      {
        name: "movies",
        columns: ["id", "title", "genre", "minutes"],
        rows: [
          ["1", "Alien", "Sci-Fi", "117"],
          ["2", "Brazil", "Drama", "142"],
          ["3", "Coco", "Family", "105"],
          ["4", "Dogma", "Comedy", "128"],
          ["5", "Edge", "Action", "113"],
        ],
      },
    ],
    query: `SELECT title
FROM movies
WHERE minutes < 120
ORDER BY minutes;`,
    prompt: {
      th: "ให้ตอบชื่อเรื่องที่คำสั่งนี้คืนออกมา โดยคั่นด้วยเครื่องหมายจุลภาคตามลำดับที่ได้",
      en: "List the titles this query returns, comma separated, in the order they come back.",
    },
    explanation: {
      th: "ตัวกรอง minutes < 120 เหลือ Alien (117), Coco (105) และ Edge (113) ส่วน Brazil (142) กับ Dogma (128) ยาวเกินไป ORDER BY minutes ไม่ระบุทิศทางจึงเป็นแบบขึ้นเป็นค่าเริ่มต้น ลำดับจึงเป็น Coco, Edge, Alien ไม่ใช่ลำดับตามชื่อเรื่อง",
      en: "The filter minutes < 120 keeps Alien (117), Coco (105) and Edge (113) while Brazil (142) and Dogma (128) are too long. ORDER BY minutes has no direction so it defaults to ascending, giving Coco, Edge, Alien rather than alphabetical order.",
    },
    answer: {
      kind: "text",
      accepted: ["Coco, Edge, Alien", "Coco Edge Alien"],
      placeholder: "xxx, xxx, ..., xxx",
    },
  },
  {
    id: "sq-m-13",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "teams",
        columns: ["id", "name"],
        rows: [
          ["1", "Lions"],
          ["2", "Tigers"],
          ["3", "Bears"],
        ],
      },
      {
        name: "players",
        columns: ["id", "name", "team_id", "goals"],
        rows: [
          ["1", "Ann", "1", "3"],
          ["2", "Ben", "2", "5"],
          ["3", "Cara", "1", "0"],
          ["4", "Dan", "NULL", "7"],
        ],
      },
    ],
    query: `SELECT t.name AS team, p.name AS player
FROM players p
JOIN teams t ON p.team_id = t.id
WHERE p.goals > 0
ORDER BY t.name, p.name;`,
    prompt: {
      th: "การ JOIN นี้คืนผลลัพธ์อะไร",
      en: "What does this join return?",
    },
    explanation: {
      th: "INNER JOIN จับได้เฉพาะ Ann และ Cara กับ Lions และ Ben กับ Tigers ส่วน Dan ที่ team_id เป็น NULL ไม่มีคู่จึงหลุดออกไปแม้ยิงได้ 7 ประตู จากนั้น WHERE goals > 0 ตัด Cara ที่ยิงได้ 0 ออก เหลือสองแถว เรียงตามชื่อทีมได้ Lions ก่อน Tigers ทีม Bears ไม่มีนักเตะจึงไม่ปรากฏ",
      en: "The INNER JOIN only matches Ann and Cara to Lions and Ben to Tigers; Dan has a NULL team_id so he has no match and drops out despite his 7 goals. WHERE goals > 0 then removes Cara on 0, leaving two rows ordered by team name with Lions before Tigers, and Bears never appears because it has no players.",
    },
    answer: {
      kind: "choice",
      choices: [
        "3 rows: (Lions, Ann), (Tigers, Ben), (NULL, Dan)",
        "3 rows: (Lions, Ann), (Lions, Cara), (Tigers, Ben)",
        "2 rows: (Tigers, Ben), (Lions, Ann)",
        "2 rows: (Lions, Ann), (Tigers, Ben)",
      ],
      correctIndex: 3,
    },
  },
  {
    id: "sq-m-14",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "shipments",
        columns: ["id", "courier", "weight"],
        rows: [
          ["1", "DHL", "5"],
          ["2", "UPS", "3"],
          ["3", "DHL", "7"],
          ["4", "FedEx", "2"],
          ["5", "UPS", "9"],
          ["6", "DHL", "1"],
        ],
      },
    ],
    query: `SELECT courier
FROM shipments
GROUP BY courier
HAVING SUM(weight) > 12
ORDER BY courier;`,
    prompt: {
      th: "ให้ตอบค่า courier ที่คำสั่งนี้คืนออกมา",
      en: "Give the courier value this query returns.",
    },
    explanation: {
      th: "น้ำหนักรวมต่อกลุ่มคือ DHL 5 + 7 + 1 = 13, UPS 3 + 9 = 12 และ FedEx 2 HAVING ทดสอบค่าหลังรวมกลุ่มด้วย > 12 แบบเข้ม UPS ที่ได้ 12 พอดีจึงไม่ผ่าน เหลือเพียง DHL",
      en: "The group totals are DHL 5 + 7 + 1 = 13, UPS 3 + 9 = 12 and FedEx 2. HAVING tests the aggregated value with a strict > 12, so UPS at exactly 12 fails and only DHL remains.",
    },
    answer: { kind: "text", accepted: ["DHL", "(DHL)"], placeholder: "xxx" },
  },
  {
    id: "sq-m-15",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "quizzes",
        columns: ["id", "student", "score"],
        rows: [
          ["1", "Ann", "80"],
          ["2", "Ben", "NULL"],
          ["3", "Cara", "60"],
          ["4", "Dan", "NULL"],
          ["5", "Eve", "70"],
        ],
      },
    ],
    query: `SELECT SUM(score) AS s, AVG(score) AS a
FROM quizzes;`,
    prompt: {
      th: "คำสั่งนี้คืนค่า s และ a เป็นเท่าใด",
      en: "What values of s and a does this query return?",
    },
    explanation: {
      th: "ฟังก์ชันรวมมองข้ามแถวที่เป็น NULL จึงคิดเฉพาะ 80, 60 และ 70 ได้ s = 210 และ a = 210 / 3 = 70 ตัวหารของ AVG คือจำนวนค่าที่ไม่เป็น NULL ไม่ใช่ 5 แถวทั้งตาราง ถ้าคิดว่า NULL เป็น 0 แล้วหารด้วย 5 จะได้ 42 ซึ่งเป็นกับดักหลัก",
      en: "Aggregates ignore the NULL rows, so only 80, 60 and 70 count, giving s = 210 and a = 210 / 3 = 70. The divisor for AVG is the number of non-NULL values, not the five table rows; treating NULL as zero and dividing by 5 gives 42, the main trap.",
    },
    answer: {
      kind: "choice",
      choices: ["(210, 70)", "(210, 42)", "(140, 70)", "(NULL, NULL)"],
      correctIndex: 0,
    },
  },
  {
    id: "sq-m-16",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "authors",
        columns: ["id", "name"],
        rows: [
          ["1", "Ann"],
          ["2", "Ben"],
          ["3", "Cara"],
          ["4", "Dan"],
        ],
      },
      {
        name: "posts",
        columns: ["id", "author_id", "title"],
        rows: [
          ["1", "1", "Alpha"],
          ["2", "1", "Beta"],
          ["3", "1", "Gamma"],
          ["4", "3", "Delta"],
        ],
      },
    ],
    query: `SELECT COUNT(*)
FROM authors a
LEFT JOIN posts p ON a.id = p.author_id;`,
    prompt: {
      th: "คำสั่งนี้คืนตัวเลขอะไร",
      en: "What number does this query return?",
    },
    explanation: {
      th: "LEFT JOIN ขยายผู้เขียนแต่ละคนตามจำนวนโพสต์ที่จับคู่ได้ Ann มี 3 โพสต์จึงได้ 3 แถว Cara มี 1 แถว ส่วน Ben และ Dan ไม่มีโพสต์เลยแต่ยังถูกเก็บไว้คนละ 1 แถวโดยคอลัมน์ฝั่งขวาเป็น NULL รวมเป็น 3 + 1 + 1 + 1 = 6 ถ้าเป็น INNER JOIN จะได้เพียง 4",
      en: "A LEFT JOIN expands each author by the number of matching posts: Ann has 3 posts so she yields 3 rows, Cara yields 1, while Ben and Dan have none but are still kept as one row each with NULL right-hand columns, giving 3 + 1 + 1 + 1 = 6. An INNER JOIN would return only 4.",
    },
    answer: { kind: "text", accepted: ["6", "(6)"] },
  },
  {
    id: "sq-m-17",
    type: "sql-logic",
    difficulty: "medium",
    schema: [
      {
        name: "visits",
        columns: ["id", "guest", "city"],
        rows: [
          ["1", "Ann", "Bangkok"],
          ["2", "Ben", "Bangkok"],
          ["3", "Ann", "Bangkok"],
          ["4", "Ann", "Phuket"],
          ["5", "Ben", "Bangkok"],
        ],
      },
    ],
    query: `SELECT DISTINCT guest, city
FROM visits
ORDER BY guest, city;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "DISTINCT ทำงานกับคู่ค่าทั้งสองคอลัมน์รวมกัน ไม่ใช่แยกคอลัมน์ คู่ที่ต่างกันมีเพียง Ann-Bangkok, Ann-Phuket และ Ben-Bangkok จึงเหลือ 3 แถว โดย Ann-Bangkok ที่ซ้ำสองครั้งและ Ben-Bangkok ที่ซ้ำสองครั้งถูกยุบให้เหลือแถวเดียว ตัวเลือกลวงคือการคืนทุกแถวหรือคิดว่า DISTINCT ตัดชื่อซ้ำจนเหลือคนละ 1 แถว",
      en: "DISTINCT applies to the pair of selected columns together, not to each column separately, so the unique pairs are Ann-Bangkok, Ann-Phuket and Ben-Bangkok, three rows in all, with the repeated Ann-Bangkok and Ben-Bangkok pairs collapsed to one row each. The distractors return every row or assume DISTINCT leaves one row per guest.",
    },
    answer: {
      kind: "choice",
      choices: [
        "5 rows: (Ann, Bangkok), (Ben, Bangkok), (Ann, Bangkok), (Ann, Phuket), (Ben, Bangkok)",
        "2 rows: (Ann, Bangkok), (Ben, Bangkok)",
        "3 rows: (Ann, Bangkok), (Ann, Phuket), (Ben, Bangkok)",
        "4 rows: (Ann, Bangkok), (Ann, Phuket), (Ben, Bangkok), (Ben, Phuket)",
      ],
      correctIndex: 2,
    },
  },
  {
    id: "sq-h-13",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "staff",
        columns: ["id", "name", "city"],
        rows: [
          ["1", "Ann", "Bangkok"],
          ["2", "Ben", "Bangkok"],
          ["3", "Cara", "Phuket"],
          ["4", "Dan", "Bangkok"],
        ],
      },
    ],
    query: `SELECT a.name AS first, b.name AS second
FROM staff a
JOIN staff b ON a.city = b.city AND a.id < b.id
ORDER BY a.name, b.name;`,
    prompt: {
      th: "การ self join นี้คืนผลลัพธ์อะไร",
      en: "What does this self join return?",
    },
    explanation: {
      th: "ตารางเดียวถูกจับคู่กับตัวเองด้วยเงื่อนไขเมืองเดียวกัน เงื่อนไข a.id < b.id ทำสองอย่างคือกันไม่ให้แถวจับคู่กับตัวเอง และกันคู่ซ้ำแบบสลับด้าน ในกรุงเทพมีสามคน (id 1, 2, 4) จึงได้คู่ Ann-Ben, Ann-Dan และ Ben-Dan ส่วน Cara อยู่ภูเก็ตคนเดียวจึงไม่มีคู่ ตัวเลือกลวงคือใช้ = แทน < จนได้ 10 แถว หรือใช้ <> จนได้คู่ซ้ำทั้งสองทิศทาง 6 แถว",
      en: "The table is matched against itself on the same city, and a.id < b.id does two jobs: it stops a row pairing with itself and it removes mirrored duplicates. Bangkok holds three people (ids 1, 2 and 4) giving Ann-Ben, Ann-Dan and Ben-Dan, while Cara is alone in Phuket and pairs with nobody. The distractors use = instead of <, producing 10 rows, or <>, producing 6 mirrored rows.",
    },
    answer: {
      kind: "choice",
      choices: [
        "4 rows: (Ann, Ben), (Ann, Dan), (Ben, Dan), (Cara, Cara)",
        "3 rows: (Ann, Ben), (Ann, Dan), (Ben, Dan)",
        "6 rows: (Ann, Ben), (Ann, Dan), (Ben, Ann), (Ben, Dan), (Dan, Ann), (Dan, Ben)",
        "0 rows (empty result)",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "sq-h-14",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "customers",
        columns: ["id", "name"],
        rows: [
          ["1", "Ann"],
          ["2", "Ben"],
          ["3", "Cara"],
          ["4", "Dan"],
        ],
      },
      {
        name: "orders",
        columns: ["id", "customer_id", "amount"],
        rows: [
          ["1", "1", "300"],
          ["2", "1", "250"],
          ["3", "2", "400"],
          ["4", "3", "100"],
          ["5", "3", "200"],
          ["6", "3", "150"],
        ],
      },
    ],
    query: `SELECT COUNT(*)
FROM customers c
WHERE (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) >= 2;`,
    prompt: {
      th: "คำสั่งนี้คืนตัวเลขอะไร",
      en: "What number does this query return?",
    },
    explanation: {
      th: "ซับคิวรีเป็นแบบสัมพันธ์กัน จึงถูกคิดใหม่ทีละลูกค้า ได้ Ann 2 ออเดอร์, Ben 1, Cara 3 และ Dan 0 เงื่อนไข >= 2 ผ่านเฉพาะ Ann และ Cara คิวรีชั้นนอกจึงนับลูกค้าได้ 2 ไม่ใช่ 6 ซึ่งเป็นจำนวนออเดอร์ทั้งหมด",
      en: "The subquery is correlated so it is re-evaluated for each customer: Ann has 2 orders, Ben 1, Cara 3 and Dan 0. Only Ann and Cara satisfy >= 2, so the outer query counts 2 customers, not the 6 total orders.",
    },
    answer: { kind: "text", accepted: ["2", "(2)"] },
  },
  {
    id: "sq-h-15",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "products",
        columns: ["id", "name"],
        rows: [
          ["1", "Mouse"],
          ["2", "Keyboard"],
          ["3", "Monitor"],
        ],
      },
      {
        name: "stock",
        columns: ["id", "product_id", "qty"],
        rows: [
          ["1", "1", "4"],
          ["2", "NULL", "9"],
          ["3", "3", "2"],
        ],
      },
    ],
    query: `SELECT name
FROM products
WHERE id IN (SELECT product_id FROM stock)
ORDER BY name;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "ซับคิวรีคืนชุดค่า 1, NULL และ 3 สำหรับ IN การเจอค่าที่ตรงกันเพียงค่าเดียวก็ทำให้ผลเป็นจริงทันที NULL ที่อยู่ในชุดจึงไม่ทำลายผลลัพธ์ ได้ Mouse (id 1) และ Monitor (id 3) เรียงตามชื่อได้ Monitor ก่อน Mouse เพราะ n มาก่อน u ส่วน Keyboard (id 2) ได้ผลเป็น unknown จึงไม่ถูกคืน จุดที่ต้องระวังคือถ้าเปลี่ยนเป็น NOT IN ผลจะกลายเป็นว่างเปล่าทันที",
      en: "The subquery returns the set 1, NULL and 3. For IN a single matching value already makes the predicate true, so the NULL in the set does no harm: Mouse (id 1) and Monitor (id 3) come back, ordered by name with Monitor first since n sorts before u, while Keyboard (id 2) evaluates to unknown and is skipped. The thing to watch is that switching to NOT IN would make the result empty.",
    },
    answer: {
      kind: "choice",
      choices: [
        "0 rows (empty result)",
        "3 rows: (Keyboard), (Monitor), (Mouse)",
        "2 rows: (Mouse), (Monitor)",
        "2 rows: (Monitor), (Mouse)",
      ],
      correctIndex: 3,
    },
  },
  {
    id: "sq-h-16",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "teams",
        columns: ["id", "name"],
        rows: [
          ["1", "Lions"],
          ["2", "Tigers"],
          ["3", "Bears"],
        ],
      },
      {
        name: "players",
        columns: ["id", "name", "team_id", "goals"],
        rows: [
          ["1", "Ann", "1", "3"],
          ["2", "Ben", "1", "2"],
          ["3", "Cara", "2", "4"],
        ],
      },
    ],
    query: `SELECT COUNT(*)
FROM teams t
LEFT JOIN players p ON t.id = p.team_id AND p.goals >= 3;`,
    prompt: {
      th: "คำสั่งนี้คืนตัวเลขอะไร",
      en: "What number does this query return?",
    },
    explanation: {
      th: "เงื่อนไข goals >= 3 อยู่ใน ON ไม่ใช่ WHERE จึงจำกัดเฉพาะว่าแถวไหนถือว่าจับคู่ได้ แต่ไม่ตัดแถวของตารางซ้าย Lions จับกับ Ann ได้แถวเดียวเพราะ Ben ยิงได้ 2 Tigers จับกับ Cara และ Bears ไม่มีคู่แต่ยังได้แถวที่ฝั่งขวาเป็น NULL รวม 3 แถว ถ้าย้ายเงื่อนไขไปไว้ใน WHERE แถวของ Bears จะถูกตัดและได้ 2",
      en: "The goals >= 3 test sits in the ON clause rather than WHERE, so it only decides which rows count as matches without removing left-hand rows. Lions matches only Ann because Ben scored 2, Tigers matches Cara, and Bears has no match but still yields a row with NULL right-hand columns, three rows in total. Moving that condition into WHERE would drop the Bears row and give 2.",
    },
    answer: { kind: "text", accepted: ["3", "(3)"] },
  },
  {
    id: "sq-h-17",
    type: "sql-logic",
    difficulty: "hard",
    schema: [
      {
        name: "sales",
        columns: ["id", "region", "quarter", "amount"],
        rows: [
          ["1", "North", "Q1", "100"],
          ["2", "North", "Q1", "50"],
          ["3", "North", "Q2", "70"],
          ["4", "South", "Q1", "200"],
          ["5", "South", "Q2", "30"],
          ["6", "South", "Q2", "20"],
        ],
      },
    ],
    query: `SELECT region, quarter, SUM(amount) AS total
FROM sales
GROUP BY region, quarter
ORDER BY region, quarter;`,
    prompt: {
      th: "คำสั่งนี้คืนผลลัพธ์อะไร",
      en: "What does this query return?",
    },
    explanation: {
      th: "GROUP BY สองคีย์สร้างกลุ่มตามคู่ region กับ quarter ไม่ใช่ตาม region เพียงอย่างเดียว จึงได้ North-Q1 = 100 + 50 = 150, North-Q2 = 70, South-Q1 = 200 และ South-Q2 = 30 + 20 = 50 รวม 4 แถว ตัวเลือกลวงคือการจัดกลุ่มตาม region เดียวจนได้ 2 แถว หรือตาม quarter เดียวจนรวมยอดข้ามภูมิภาค",
      en: "Grouping on two keys forms one group per region and quarter pair rather than per region, giving North-Q1 = 100 + 50 = 150, North-Q2 = 70, South-Q1 = 200 and South-Q2 = 30 + 20 = 50, four rows in all. The distractors group by region alone for two rows, or by quarter alone and mix the regions together.",
    },
    answer: {
      kind: "choice",
      choices: [
        "4 rows: (North, Q1, 150), (North, Q2, 70), (South, Q1, 200), (South, Q2, 50)",
        "2 rows: (North, Q1, 220), (South, Q1, 250)",
        "2 rows: (Q1, 350), (Q2, 120)",
        "6 rows: (North, Q1, 100), (North, Q1, 50), (North, Q2, 70), (South, Q1, 200), (South, Q2, 30), (South, Q2, 20)",
      ],
      correctIndex: 0,
    },
  },
];
