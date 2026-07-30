import type { CodeTraceQuestion } from "../types";

/**
 * Code tracing: read a snippet plus its input, answer what it prints / returns.
 * Ids: ct-e-01.. (easy), ct-m-01.. (medium), ct-h-01.. (hard).
 * Code stays English. `prompt` / `explanation` are bilingual.
 */
export const codeTraceQuestions: CodeTraceQuestion[] = [
  {
    id: "ct-e-01",
    type: "code-trace",
    difficulty: "easy",
    language: "javascript",
    code: `let total = 0;
for (let i = 1; i <= 4; i++) {
  total += i;
}
console.log(total);`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "ลูปบวก 1+2+3+4 เข้าตัวแปร total ได้ 10",
      en: "The loop adds 1+2+3+4 into total, giving 10.",
    },
    answer: { kind: "text", accepted: ["10"], placeholder: "" },
  },
  {
    id: "ct-e-02",
    type: "code-trace",
    difficulty: "easy",
    language: "python",
    input: "word = 'logic'",
    code: `word = 'logic'
result = ''
for ch in word:
    result = ch + result
print(result)`,
    prompt: {
      th: "ผลลัพธ์ที่พิมพ์ออกมาคืออะไร",
      en: "What is printed?",
    },
    explanation: {
      th: "การต่อสตริงแบบ ch + result ทำให้ได้สตริงกลับด้าน จาก logic เป็น cigol",
      en: "Prepending each character reverses the string, so logic becomes cigol.",
    },
    answer: { kind: "choice", choices: ["logic", "cigol", "lgc", "cgl"], correctIndex: 1 },
  },
  {
    id: "ct-e-03",
    type: "code-trace",
    difficulty: "easy",
    language: "java",
    input: "nums = {3, 7, 2, 8}",
    code: `int[] nums = {3, 7, 2, 8};
int max = nums[0];
for (int i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
        max = nums[i];
    }
}
System.out.println(max);`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "max เริ่มที่ 3 แล้วถูกแทนที่เมื่อพบค่าที่ใหญ่กว่า คือ 7 และ 8 ส่วน 2 ไม่ผ่านเงื่อนไข สุดท้ายเหลือ 8",
      en: "max starts at 3 and is replaced whenever a bigger value appears: first 7, then 8. The value 2 fails the check, so 8 remains.",
    },
    answer: { kind: "text", accepted: ["8"], placeholder: "" },
  },
  {
    id: "ct-e-04",
    type: "code-trace",
    difficulty: "easy",
    language: "python",
    input: "text = 'banana'",
    code: `text = 'banana'
count = 0
for ch in text:
    if ch == 'a':
        count += 1
print(count)`,
    prompt: {
      th: "ค่า count ที่พิมพ์ออกมาเป็นเท่าใด",
      en: "What value of count is printed?",
    },
    explanation: {
      th: "คำว่า banana มีตัวอักษร a อยู่สามตำแหน่ง (b-a-n-a-n-a) ลูปจึงนับได้ 3",
      en: "The word banana contains the letter a three times (b-a-n-a-n-a), so the loop counts 3.",
    },
    answer: { kind: "text", accepted: ["3"] },
  },
  {
    id: "ct-e-05",
    type: "code-trace",
    difficulty: "easy",
    language: "javascript",
    code: `const nums = [1, 2, 3, 4, 5];
const out = nums.filter(n => n % 2 === 1).map(n => n * 10);
console.log(out.join(","));`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "filter เก็บเฉพาะเลขคี่ได้ [1, 3, 5] แล้ว map คูณสิบเป็น [10, 30, 50] ก่อนต่อด้วยคอมมา",
      en: "filter keeps the odd numbers [1, 3, 5], then map multiplies each by ten to give [10, 30, 50], joined with commas.",
    },
    answer: {
      kind: "choice",
      choices: ["10,30,50", "20,40", "1,3,5", "10,20,30,40,50"],
      correctIndex: 0,
    },
  },
  {
    id: "ct-e-06",
    type: "code-trace",
    difficulty: "easy",
    language: "java",
    code: `String s = "code";
String t = s + s.length();
System.out.println(t);`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "s.length() ได้ 4 และเมื่อบวกกับสตริง ตัวเลขจะถูกแปลงเป็นข้อความต่อท้าย ได้ code4",
      en: "s.length() is 4, and adding a number to a String converts it to text and appends it, giving code4.",
    },
    answer: { kind: "text", accepted: ["code4"], placeholder: "" },
  },
  {
    id: "ct-e-07",
    type: "code-trace",
    difficulty: "easy",
    language: "python",
    code: `total = 0
for i in range(1, 10, 3):
    total += i
print(total)`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "range(1, 10, 3) ให้ค่า 1, 4, 7 (หยุดก่อนถึง 10) รวมกันได้ 12",
      en: "range(1, 10, 3) yields 1, 4, 7 (it stops before 10), and the sum is 12.",
    },
    answer: { kind: "text", accepted: ["12"] },
  },
  {
    id: "ct-e-08",
    type: "code-trace",
    difficulty: "easy",
    language: "javascript",
    code: `let s = "";
let i = 3;
while (i > 0) {
  s += i;
  i--;
}
console.log(s);`,
    prompt: {
      th: "ผลลัพธ์ที่พิมพ์ออกมาคืออะไร",
      en: "What is printed?",
    },
    explanation: {
      th: "s เป็นสตริง จึงต่อตัวเลขเป็นข้อความไม่ใช่บวกเลข ลำดับที่ต่อคือ 3 แล้ว 2 แล้ว 1 ได้ 321",
      en: "s is a string, so each number is appended as text instead of added. The order is 3, then 2, then 1, giving 321.",
    },
    answer: { kind: "choice", choices: ["123", "6", "321", "3-2-1"], correctIndex: 2 },
  },
  {
    id: "ct-e-09",
    type: "code-trace",
    difficulty: "easy",
    language: "java",
    input: "score = 72",
    code: `int score = 72;
String grade;
if (score >= 80) {
    grade = "A";
} else if (score >= 70) {
    grade = "B";
} else {
    grade = "C";
}
System.out.println(grade);`,
    prompt: {
      th: "โค้ดนี้พิมพ์เกรดอะไร",
      en: "Which grade does this code print?",
    },
    explanation: {
      th: "72 ไม่ถึง 80 จึงข้ามเงื่อนไขแรก แต่มากกว่าหรือเท่ากับ 70 จึงเข้าสาขาที่สองได้ B",
      en: "72 is not at least 80 so the first branch is skipped, but it is at least 70, so the second branch runs and prints B.",
    },
    answer: { kind: "choice", choices: ["A", "B", "C", "F"], correctIndex: 1 },
  },
  {
    id: "ct-e-10",
    type: "code-trace",
    difficulty: "easy",
    language: "python",
    input: "nums = [10, 20, 30, 40, 50]",
    code: `nums = [10, 20, 30, 40, 50]
print(nums[1:4])`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "การ slice แบบ 1:4 เอาสมาชิกตำแหน่ง 1, 2, 3 โดยไม่รวมตำแหน่ง 4 จึงได้ [20, 30, 40]",
      en: "The slice 1:4 takes indexes 1, 2 and 3 and excludes index 4, so the result is [20, 30, 40].",
    },
    answer: {
      kind: "text",
      accepted: ["[20, 30, 40]", "[20,30,40]", "20, 30, 40", "20,30,40"],
      placeholder: "[xx, ..., xx]",
    },
  },
  {
    id: "ct-e-11",
    type: "code-trace",
    difficulty: "easy",
    language: "javascript",
    code: `const parts = "a-b-c".split("-");
console.log(parts.join("+"));`,
    prompt: {
      th: "ผลลัพธ์ที่พิมพ์ออกมาคืออะไร",
      en: "What is printed?",
    },
    explanation: {
      th: "split(\"-\") แยกได้ [\"a\", \"b\", \"c\"] แล้ว join(\"+\") นำมาต่อโดยคั่นด้วยเครื่องหมายบวก ได้ a+b+c",
      en: "split(\"-\") produces [\"a\", \"b\", \"c\"], and join(\"+\") glues them back with plus signs, giving a+b+c.",
    },
    answer: { kind: "choice", choices: ["abc", "a+b+c", "a-b-c", "3"], correctIndex: 1 },
  },
  {
    id: "ct-e-12",
    type: "code-trace",
    difficulty: "easy",
    language: "java",
    code: `int count = 0;
for (int i = 10; i > 0; i -= 3) {
    count++;
}
System.out.println(count);`,
    prompt: {
      th: "ค่า count ที่พิมพ์ออกมาเป็นเท่าใด",
      en: "What value of count is printed?",
    },
    explanation: {
      th: "i ไล่ค่า 10, 7, 4, 1 แล้วกลายเป็น -2 ซึ่งไม่ผ่านเงื่อนไข ลูปจึงทำงาน 4 รอบ",
      en: "i takes the values 10, 7, 4, 1 and then becomes -2, which fails the condition, so the loop body runs 4 times.",
    },
    answer: { kind: "choice", choices: ["3", "5", "10", "4"], correctIndex: 3 },
  },
  {
    id: "ct-m-01",
    type: "code-trace",
    difficulty: "medium",
    language: "javascript",
    code: `let count = 0;
for (let i = 0; i < 4; i++) {
  for (let j = i; j < 4; j++) {
    count++;
  }
}
console.log(count);`,
    prompt: {
      th: "ค่า count ที่พิมพ์ออกมาเป็นเท่าใด",
      en: "What value of count is printed?",
    },
    explanation: {
      th: "ลูปในทำงาน 4, 3, 2 และ 1 รอบตามลำดับ รวมเป็น 10",
      en: "The inner loop runs 4, 3, 2 then 1 times, totalling 10.",
    },
    answer: { kind: "text", accepted: ["10"] },
  },
  {
    id: "ct-m-02",
    type: "code-trace",
    difficulty: "medium",
    language: "java",
    input: "n = 13",
    code: `int n = 13;
StringBuilder sb = new StringBuilder();
while (n > 0) {
    sb.append(n % 2);
    n /= 2;
}
System.out.println(sb.toString());`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "13 ในฐานสองคือ 1101 แต่โค้ดต่อเศษจากบิตต่ำสุดไปสูงสุดโดยไม่กลับด้าน จึงได้ 1011",
      en: "13 in binary is 1101, but the remainders are appended low bit first without reversing, giving 1011.",
    },
    answer: { kind: "choice", choices: ["1101", "1011", "13", "0111"], correctIndex: 1 },
  },
  {
    id: "ct-m-03",
    type: "code-trace",
    difficulty: "medium",
    language: "python",
    input: "matrix = [[1, 2], [3, 4], [5, 6]]",
    code: `matrix = [[1, 2], [3, 4], [5, 6]]
total = 0
for row in matrix:
    for value in row:
        if value % 2 == 0:
            total += value
print(total)`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "ลูปซ้อนไล่ทุกช่องแต่เงื่อนไขรับเฉพาะเลขคู่ คือ 2, 4 และ 6 รวมได้ 12",
      en: "The nested loops visit every cell but the condition only accepts even values: 2, 4 and 6, which sum to 12.",
    },
    answer: { kind: "text", accepted: ["12"] },
  },
  {
    id: "ct-m-04",
    type: "code-trace",
    difficulty: "medium",
    language: "java",
    input: "n = 4729",
    code: `int n = 4729;
int sum = 0;
while (n > 0) {
    sum += n % 10;
    n /= 10;
}
System.out.println(sum);`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "n % 10 ดึงหลักหน่วยออกมาทีละหลัก และ n /= 10 เป็นการหารแบบจำนวนเต็มเพื่อตัดหลักนั้นทิ้ง จึงได้ 9+2+7+4 = 22",
      en: "n % 10 peels off one digit at a time while n /= 10 is integer division that drops it, so the sum is 9+2+7+4 = 22.",
    },
    answer: { kind: "text", accepted: ["22"] },
  },
  {
    id: "ct-m-05",
    type: "code-trace",
    difficulty: "medium",
    language: "javascript",
    input: 'items = ["a", "b", "c", "d"]',
    code: `const items = ["a", "b", "c", "d"];
items.splice(1, 2, "x");
console.log(items.join(","));`,
    prompt: {
      th: "ผลลัพธ์ที่พิมพ์ออกมาคืออะไร",
      en: "What is printed?",
    },
    explanation: {
      th: "splice(1, 2, \"x\") ลบสมาชิก 2 ตัวเริ่มจากตำแหน่ง 1 คือ b และ c แล้วแทรก x ลงไปแทน อาร์เรย์เดิมถูกแก้เป็น [a, x, d]",
      en: "splice(1, 2, \"x\") removes two items starting at index 1 (b and c) and inserts x in their place, mutating the array into [a, x, d].",
    },
    answer: {
      kind: "choice",
      choices: ["a,b,x,d", "a,x,c,d", "a,x,d", "a,x"],
      correctIndex: 2,
    },
  },
  {
    id: "ct-m-06",
    type: "code-trace",
    difficulty: "medium",
    language: "python",
    input: "n = 6",
    code: `n = 6
steps = 0
while n != 1:
    if n % 2 == 0:
        n //= 2
    else:
        n = 3 * n + 1
    steps += 1
print(steps)`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่า steps เท่าใด",
      en: "What value of steps does this code print?",
    },
    explanation: {
      th: "เส้นทางของ n คือ 6, 3, 10, 5, 16, 8, 4, 2, 1 นับการเปลี่ยนค่าได้ 8 ครั้ง",
      en: "The path of n is 6, 3, 10, 5, 16, 8, 4, 2, 1, which is 8 transitions.",
    },
    answer: { kind: "text", accepted: ["8"] },
  },
  {
    id: "ct-m-07",
    type: "code-trace",
    difficulty: "medium",
    language: "java",
    code: `StringBuilder sb = new StringBuilder();
for (int i = 1; i <= 3; i++) {
    for (int j = 0; j < i; j++) {
        sb.append(i);
    }
}
System.out.println(sb.toString());`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "รอบ i = 1 ต่อเลข 1 หนึ่งครั้ง, i = 2 ต่อเลข 2 สองครั้ง, i = 3 ต่อเลข 3 สามครั้ง ได้ 122333",
      en: "For i = 1 it appends one 1, for i = 2 two 2s, for i = 3 three 3s, giving 122333.",
    },
    answer: {
      kind: "choice",
      choices: ["122333", "123", "111222333", "112233"],
      correctIndex: 0,
    },
  },
  {
    id: "ct-m-08",
    type: "code-trace",
    difficulty: "medium",
    language: "javascript",
    input: "n = 9070",
    code: `function digits(n) {
  if (n < 10) return 1;
  return 1 + digits(Math.floor(n / 10));
}
console.log(digits(9070));`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "ฟังก์ชันตัดหลักท้ายออกทีละหลัก ลำดับการเรียกคือ 9070, 907, 90, 9 ซึ่ง 9 น้อยกว่า 10 จึงคืน 1 แล้วบวกย้อนกลับได้ 4",
      en: "Each call drops the last digit: 9070, 907, 90, 9. The last one is below 10 and returns 1, and adding 1 back up the chain gives 4.",
    },
    answer: { kind: "text", accepted: ["4"] },
  },
  {
    id: "ct-m-09",
    type: "code-trace",
    difficulty: "medium",
    language: "python",
    input: "n = 1023",
    code: `n = 1023
rev = 0
while n > 0:
    rev = rev * 10 + n % 10
    n //= 10
print(rev)`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "แต่ละรอบดันหลักเดิมไปทางซ้ายแล้วเติมหลักหน่วยของ n เข้ามา rev จึงไล่เป็น 3, 32, 320, 3201",
      en: "Each pass shifts rev left and appends the last digit of n, so rev becomes 3, 32, 320 and finally 3201.",
    },
    answer: { kind: "text", accepted: ["3201"] },
  },
  {
    id: "ct-m-10",
    type: "code-trace",
    difficulty: "medium",
    language: "java",
    input: "a = {1, 2, 3, 4, 5}",
    code: `int[] a = {1, 2, 3, 4, 5};
for (int i = 0; i < a.length - 1; i++) {
    a[i + 1] += a[i];
}
System.out.println(a[4]);`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "อาร์เรย์ถูกแก้ทีละช่องกลายเป็นผลรวมสะสม คือ 1, 3, 6, 10, 15 ช่องสุดท้ายจึงเป็น 15",
      en: "The array is mutated in place into running sums 1, 3, 6, 10, 15, so the last slot holds 15.",
    },
    answer: { kind: "choice", choices: ["5", "9", "15", "25"], correctIndex: 2 },
  },
  {
    id: "ct-m-11",
    type: "code-trace",
    difficulty: "medium",
    language: "javascript",
    input: 's = "abcdef"',
    code: `const s = "abcdef";
let out = "";
for (let i = 0; i < s.length; i += 2) {
  out += s[i].toUpperCase();
}
console.log(out);`,
    prompt: {
      th: "ผลลัพธ์ที่พิมพ์ออกมาคืออะไร",
      en: "What is printed?",
    },
    explanation: {
      th: "ลูปเดินทีละสองตำแหน่ง จึงได้ตัวอักษรตำแหน่ง 0, 2, 4 คือ a, c, e แล้วแปลงเป็นตัวพิมพ์ใหญ่",
      en: "The loop steps by two, picking indexes 0, 2 and 4 (a, c, e) and upper-casing them.",
    },
    answer: { kind: "choice", choices: ["ABCDEF", "BDF", "ACEG", "ACE"], correctIndex: 3 },
  },
  {
    id: "ct-m-12",
    type: "code-trace",
    difficulty: "medium",
    language: "python",
    code: `def f(n):
    if n == 0:
        return ''
    return f(n - 1) + str(n)

print(f(4))`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "การเรียกซ้ำลงไปถึง f(0) ก่อนแล้วจึงต่อเลขตอนคืนค่า ลำดับที่ต่อคือ 1, 2, 3, 4 ได้ 1234",
      en: "The recursion reaches f(0) first, then appends the numbers on the way back out in the order 1, 2, 3, 4, giving 1234.",
    },
    answer: { kind: "choice", choices: ["4321", "01234", "10", "1234"], correctIndex: 3 },
  },
  {
    id: "ct-h-01",
    type: "code-trace",
    difficulty: "hard",
    language: "javascript",
    code: `function f(n) {
  if (n <= 1) return n;
  return f(n - 1) + f(n - 2);
}
console.log(f(7));`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไร",
      en: "What does this code print?",
    },
    explanation: {
      th: "เป็น Fibonacci เริ่มจาก f(0)=0, f(1)=1 ลำดับคือ 0,1,1,2,3,5,8,13 ดังนั้น f(7)=13",
      en: "It is Fibonacci with f(0)=0 and f(1)=1: 0,1,1,2,3,5,8,13, so f(7)=13.",
    },
    answer: { kind: "text", accepted: ["13"] },
  },
  {
    id: "ct-h-02",
    type: "code-trace",
    difficulty: "hard",
    language: "python",
    code: `def add(item, bucket=[]):
    bucket.append(item)
    return bucket

print(add(1))
print(add(2))`,
    prompt: {
      th: "ผลลัพธ์สองบรรทัดที่พิมพ์ออกมาคืออะไร",
      en: "What are the two printed lines?",
    },
    explanation: {
      th: "ค่า default ที่เป็น list ถูกสร้างครั้งเดียวตอนนิยามฟังก์ชัน และถูกใช้ซ้ำ จึงสะสมค่าเป็น [1] แล้ว [1, 2]",
      en: "A mutable default argument is created once at definition time and reused, so it accumulates: [1] then [1, 2].",
    },
    answer: {
      kind: "choice",
      choices: ["[1] then [2]", "[1] then [1, 2]", "[1, 2] then [1, 2]", "[1] then []"],
      correctIndex: 1,
    },
  },
  {
    id: "ct-h-03",
    type: "code-trace",
    difficulty: "hard",
    language: "javascript",
    code: `const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(function () {
    return i;
  });
}
console.log(fns[0]() + fns[1]() + fns[2]());`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "var มีขอบเขตระดับฟังก์ชัน ทุกฟังก์ชันจึงอ้างถึงตัวแปร i ตัวเดียวกัน ซึ่งหลังลูปจบมีค่า 3 ผลรวมจึงเป็น 3+3+3 = 9",
      en: "var is function scoped, so all three closures share the same i, which is 3 after the loop ends, making the sum 3+3+3 = 9.",
    },
    answer: { kind: "text", accepted: ["9"] },
  },
  {
    id: "ct-h-04",
    type: "code-trace",
    difficulty: "hard",
    language: "javascript",
    code: `function f() {
  console.log(typeof x);
  var x = 5;
}
f();`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "การประกาศด้วย var ถูก hoist ขึ้นไปต้นฟังก์ชันโดยยังไม่มีค่า ตอนเรียก typeof จึงได้ undefined ไม่ใช่ error",
      en: "The var declaration is hoisted to the top of the function without its value, so typeof reports undefined rather than throwing.",
    },
    answer: {
      kind: "choice",
      choices: ["number", "ReferenceError", "undefined", "object"],
      correctIndex: 2,
    },
  },
  {
    id: "ct-h-05",
    type: "code-trace",
    difficulty: "hard",
    language: "python",
    code: `print(0.1 + 0.2 == 0.3)
print(round(0.1 + 0.2, 2) == 0.3)`,
    prompt: {
      th: "ผลลัพธ์สองบรรทัดที่พิมพ์ออกมาคืออะไร",
      en: "What are the two printed lines?",
    },
    explanation: {
      th: "เลขทศนิยมฐานสองเก็บ 0.1 และ 0.2 ได้ไม่ตรงเป๊ะ ผลบวกจึงเป็น 0.30000000000000004 ทำให้บรรทัดแรกเป็น False แต่การปัดเหลือสองตำแหน่งให้ค่าเท่ากับ 0.3 พอดี บรรทัดที่สองจึงเป็น True",
      en: "Binary floating point cannot store 0.1 and 0.2 exactly, so the sum is 0.30000000000000004 and the first line is False. Rounding to two decimals lands exactly on 0.3, so the second line is True.",
    },
    answer: {
      kind: "choice",
      choices: [
        "False then True",
        "True then True",
        "False then False",
        "True then False",
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ct-h-06",
    type: "code-trace",
    difficulty: "hard",
    language: "java",
    code: `String a = "gym";
String b = "gym";
String c = new String("gym");
System.out.println((a == b) + " " + (a == c) + " " + a.equals(c));`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "สตริงลิเทอรัลถูกเก็บใน string pool ตัวเดียวกัน a == b จึงเป็น true แต่ new String สร้างอ็อบเจกต์ใหม่ a == c จึงเป็น false ส่วน equals เทียบเนื้อหาได้ true",
      en: "String literals share one entry in the pool so a == b is true, but new String makes a separate object so a == c is false, while equals compares contents and is true.",
    },
    answer: {
      kind: "choice",
      choices: [
        "true true true",
        "false false true",
        "true false false",
        "true false true",
      ],
      correctIndex: 3,
    },
  },
  {
    id: "ct-h-07",
    type: "code-trace",
    difficulty: "hard",
    language: "java",
    code: `Integer a = 127, b = 127;
Integer c = 128, d = 128;
System.out.println((a == b) + " " + (c == d));`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "Java แคชอ็อบเจกต์ Integer ในช่วง -128 ถึง 127 ค่า 127 จึงเป็นอ็อบเจกต์เดียวกันได้ true ส่วน 128 อยู่นอกช่วงแคช เกิดอ็อบเจกต์แยกกัน การเทียบด้วย == จึงได้ false",
      en: "Java caches Integer objects from -128 to 127, so both 127 references point at the same object and give true, while 128 is outside the cache and creates two objects, so == is false.",
    },
    answer: {
      kind: "choice",
      choices: ["true true", "true false", "false true", "false false"],
      correctIndex: 1,
    },
  },
  {
    id: "ct-h-08",
    type: "code-trace",
    difficulty: "hard",
    language: "javascript",
    input: "nums = [10, 9, 100, 1]",
    code: `const nums = [10, 9, 100, 1];
nums.sort();
console.log(nums.join(","));`,
    prompt: {
      th: "ผลลัพธ์ที่พิมพ์ออกมาคืออะไร",
      en: "What is printed?",
    },
    explanation: {
      th: "sort() ที่ไม่ส่ง comparator จะแปลงสมาชิกเป็นสตริงแล้วเรียงตามลำดับตัวอักษร ทำให้ \"9\" อยู่หลัง \"100\" ผลจึงเป็น 1,10,100,9",
      en: "sort() without a comparator converts items to strings and orders them lexicographically, so \"9\" comes after \"100\", giving 1,10,100,9.",
    },
    answer: {
      kind: "text",
      accepted: ["1,10,100,9", "1, 10, 100, 9"],
      placeholder: "x,x,...,x",
    },
  },
  {
    id: "ct-h-09",
    type: "code-trace",
    difficulty: "hard",
    language: "python",
    code: `fs = [lambda: i for i in range(3)]
print([f() for f in fs])`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "lambda จับตัวแปร i ไว้แบบอ้างอิง ไม่ได้ก็อปค่าตอนสร้าง เมื่อลูปจบ i เท่ากับ 2 ทุกฟังก์ชันจึงคืน 2",
      en: "Each lambda captures the variable i by reference rather than copying its value, and i is 2 once the comprehension finishes, so every call returns 2.",
    },
    answer: {
      kind: "text",
      accepted: ["[2, 2, 2]", "[2,2,2]", "2, 2, 2", "2,2,2"],
      placeholder: "[x, x, ..., x]",
    },
  },
  {
    id: "ct-h-10",
    type: "code-trace",
    difficulty: "hard",
    language: "java",
    input: "fib(5) is called once",
    code: `static int calls = 0;

static int fib(int n) {
    calls++;
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}

// fib(5) runs, then:
System.out.println(calls);`,
    prompt: {
      th: "หลังเรียก fib(5) หนึ่งครั้ง ค่า calls ที่พิมพ์ออกมาเป็นเท่าใด",
      en: "After fib(5) is called once, what value of calls is printed?",
    },
    explanation: {
      th: "จำนวนการเรียกเป็นไปตาม C(n) = 1 + C(n-1) + C(n-2) โดย C(0) = C(1) = 1 ได้ C(2)=3, C(3)=5, C(4)=9 และ C(5)=15 เพราะต้นไม้การเรียกซ้ำคำนวณค่าเดิมซ้ำหลายรอบ",
      en: "The call count follows C(n) = 1 + C(n-1) + C(n-2) with C(0) = C(1) = 1, giving C(2)=3, C(3)=5, C(4)=9 and C(5)=15, because the recursion tree recomputes the same values many times.",
    },
    answer: { kind: "text", accepted: ["15"] },
  },
  {
    id: "ct-h-11",
    type: "code-trace",
    difficulty: "hard",
    language: "python",
    code: `a = [[0] * 2] * 3
a[0][0] = 9
print(a)`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "การคูณลิสต์ด้วย 3 ก็อปแค่การอ้างอิง ทั้งสามแถวจึงเป็นลิสต์ก้อนเดียวกัน แก้แถวแรกก็เห็นผลทุกแถว",
      en: "Multiplying a list by 3 copies only references, so all three rows are the same inner list and editing one row shows up in all of them.",
    },
    answer: {
      kind: "choice",
      choices: [
        "[[9, 0], [0, 0], [0, 0]]",
        "[[9, 9], [9, 9], [9, 9]]",
        "[[9, 0], [9, 0], [9, 0]]",
        "[[9], [0], [0]]",
      ],
      correctIndex: 2,
    },
  },
  {
    id: "ct-h-12",
    type: "code-trace",
    difficulty: "hard",
    language: "java",
    input: "a = {1, 2, 3}, i = 3",
    code: `int[] a = {1, 2, 3};
int i = 3;
if (i < a.length && a[i] > 0) {
    System.out.println("yes");
} else {
    System.out.println("no");
}`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "ตำแหน่งสูงสุดของอาร์เรย์ขนาด 3 คือ 2 เงื่อนไข i < a.length จึงเป็นเท็จ และ && ตัดการประเมินฝั่งขวาทิ้ง ทำให้ไม่เกิด exception แล้วเข้าสาขา else",
      en: "The last valid index of a length 3 array is 2, so i < a.length is false and && short-circuits before touching a[i], avoiding an exception and running the else branch.",
    },
    answer: { kind: "text", accepted: ["no", "No"] },
  },
  {
    id: "ct-e-13",
    type: "code-trace",
    difficulty: "easy",
    language: "javascript",
    input: 'words = ["red", "blue", "green"]',
    code: `const words = ["red", "blue", "green"];
let total = 0;
for (const w of words) {
  total += w.length;
}
console.log(total);`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "ลูปบวกความยาวของแต่ละคำเข้าตัวแปร total คือ 3 + 4 + 5 ได้ 12",
      en: "The loop adds the length of each word into total: 3 + 4 + 5 gives 12.",
    },
    answer: { kind: "text", accepted: ["12"], placeholder: "" },
  },
  {
    id: "ct-e-14",
    type: "code-trace",
    difficulty: "easy",
    language: "python",
    input: "nums = [4, 8, 15, 16]",
    code: `nums = [4, 8, 15, 16]
out = []
for n in nums:
    if n > 8:
        out.append(n // 2)
print(out)`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "มีเพียง 15 และ 16 ที่มากกว่า 8 และ // เป็นการหารแบบปัดลง จึงได้ 7 กับ 8",
      en: "Only 15 and 16 pass the check, and // is floor division, so the list holds 7 and 8.",
    },
    answer: {
      kind: "choice",
      choices: ["[7, 8]", "[2, 4, 7, 8]", "[7.5, 8]", "[8, 8]"],
      correctIndex: 0,
    },
  },
  {
    id: "ct-e-15",
    type: "code-trace",
    difficulty: "easy",
    language: "java",
    input: "n = 5",
    code: `int n = 5;
int result = 1;
for (int i = 2; i <= n; i++) {
    result *= i;
}
System.out.println(result);`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "ลูปคูณสะสม 2 x 3 x 4 x 5 เข้ากับค่าเริ่มต้น 1 ซึ่งเป็นแฟกทอเรียลของ 5 ได้ 120",
      en: "The loop multiplies 2 x 3 x 4 x 5 into the starting value 1, the factorial of 5, giving 120.",
    },
    answer: { kind: "text", accepted: ["120"], placeholder: "" },
  },
  {
    id: "ct-e-16",
    type: "code-trace",
    difficulty: "easy",
    language: "python",
    input: "text = 'code gym'",
    code: `text = 'code gym'
print(text.upper().replace(' ', '_'))`,
    prompt: {
      th: "ผลลัพธ์ที่พิมพ์ออกมาคืออะไร",
      en: "What is printed?",
    },
    explanation: {
      th: "upper() เปลี่ยนทุกตัวอักษรเป็นพิมพ์ใหญ่ก่อน แล้ว replace จึงแทนช่องว่างด้วยขีดล่าง ได้ CODE_GYM",
      en: "upper() converts every letter to upper case first, then replace swaps the space for an underscore, giving CODE_GYM.",
    },
    answer: {
      kind: "choice",
      choices: ["CODE GYM", "CODE_GYM", "code_gym", "CODEGYM"],
      correctIndex: 1,
    },
  },
  {
    id: "ct-e-17",
    type: "code-trace",
    difficulty: "easy",
    language: "javascript",
    input: "x = 7",
    code: `let x = 7;
if (x % 2 === 0) {
  console.log("even");
} else if (x > 5) {
  console.log("big odd");
} else {
  console.log("small odd");
}`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "7 หารด้วย 2 เหลือเศษ 1 จึงไม่เข้าเงื่อนไขแรก แต่ 7 มากกว่า 5 จึงเข้าสาขาที่สองและพิมพ์ big odd",
      en: "7 leaves a remainder of 1 so the first branch fails, but 7 is greater than 5 so the second branch runs and prints big odd.",
    },
    answer: {
      kind: "choice",
      choices: ["even", "small odd", "7", "big odd"],
      correctIndex: 3,
    },
  },
  {
    id: "ct-m-13",
    type: "code-trace",
    difficulty: "medium",
    language: "python",
    input: "grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
    code: `grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
total = 0
for r in range(3):
    for c in range(3):
        if (r + c) % 2 == 0:
            total += grid[r][c]
print(total)`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "เงื่อนไขรับเฉพาะช่องที่ผลบวกของแถวกับหลักเป็นเลขคู่ ซึ่งเรียงเป็นลายหมากรุก คือ 1, 3, 5, 7, 9 รวมได้ 25",
      en: "The condition keeps only the cells where row plus column is even, a checkerboard pattern of 1, 3, 5, 7 and 9, which sums to 25.",
    },
    answer: { kind: "text", accepted: ["25"] },
  },
  {
    id: "ct-m-14",
    type: "code-trace",
    difficulty: "medium",
    language: "java",
    input: "a = {2, 4, 6, 8, 10}",
    code: `int[] a = {2, 4, 6, 8, 10};
for (int i = 0; i < a.length / 2; i++) {
    int tmp = a[i];
    a[i] = a[a.length - 1 - i];
    a[a.length - 1 - i] = tmp;
}
System.out.println(a[0] + "," + a[2] + "," + a[4]);`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "ลูปสลับค่าหัวกับท้ายเพียงครึ่งอาร์เรย์ จึงได้อาร์เรย์กลับด้านเป็น 10, 8, 6, 4, 2 ตำแหน่ง 0, 2 และ 4 คือ 10, 6 และ 2",
      en: "The loop swaps front with back for only half the array, reversing it into 10, 8, 6, 4, 2, so indexes 0, 2 and 4 hold 10, 6 and 2.",
    },
    answer: {
      kind: "choice",
      choices: ["2,6,10", "10,8,2", "10,6,2", "6,6,6"],
      correctIndex: 2,
    },
  },
  {
    id: "ct-m-15",
    type: "code-trace",
    difficulty: "medium",
    language: "javascript",
    code: `let out = "";
for (let i = 1; i <= 7; i++) {
  out += i % 3 === 0 ? "*" : i;
}
console.log(out);`,
    prompt: {
      th: "ผลลัพธ์ที่พิมพ์ออกมาคืออะไร",
      en: "What is printed?",
    },
    explanation: {
      th: "ตัวเลขที่หารด้วย 3 ลงตัวคือ 3 และ 6 จะถูกแทนด้วยดอกจัน ที่เหลือต่อเป็นตัวเลขตามเดิม ได้ 12*45*7",
      en: "The multiples of three, 3 and 6, are replaced by an asterisk while the other numbers are appended as they are, giving 12*45*7.",
    },
    answer: { kind: "text", accepted: ["12*45*7"], placeholder: "x*x*x*...*x" },
  },
  {
    id: "ct-m-16",
    type: "code-trace",
    difficulty: "medium",
    language: "python",
    input: "f(10)",
    code: `def f(n):
    if n <= 1:
        return 1
    if n % 2 == 0:
        return f(n // 2) + 1
    return f(n - 1) + 2

print(f(10))`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "เลขคู่จะหารสองแล้วบวก 1 เลขคี่จะลดลงหนึ่งแล้วบวก 2 ลำดับคือ f(10)=f(5)+1, f(5)=f(4)+2, f(4)=f(2)+1, f(2)=f(1)+1=2 ย้อนกลับได้ 3, 5 และ 6",
      en: "Even values halve and add 1 while odd values step down by one and add 2: f(10)=f(5)+1, f(5)=f(4)+2, f(4)=f(2)+1, f(2)=f(1)+1=2, unwinding to 3, then 5, then 6.",
    },
    answer: { kind: "choice", choices: ["4", "5", "6", "8"], correctIndex: 2 },
  },
  {
    id: "ct-m-17",
    type: "code-trace",
    difficulty: "medium",
    language: "java",
    input: "m = {{1, 2, 3}, {4, 5, 6}}",
    code: `int[][] m = {{1, 2, 3}, {4, 5, 6}};
int total = 0;
for (int c = 0; c < 3; c++) {
    for (int r = 0; r < 2; r++) {
        if (r == 1) {
            total += m[r][c] * 2;
        } else {
            total += m[r][c];
        }
    }
}
System.out.println(total);`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "ลูปนอกไล่ตามหลัก ลูปในไล่ตามแถว แถวที่ 0 นับค่าปกติได้ 1+2+3 = 6 ส่วนแถวที่ 1 คูณสองได้ (4+5+6) x 2 = 30 รวมเป็น 36",
      en: "The outer loop walks columns and the inner loop walks rows. Row 0 contributes 1+2+3 = 6 while row 1 is doubled to (4+5+6) x 2 = 30, totalling 36.",
    },
    answer: { kind: "text", accepted: ["36"] },
  },
  {
    id: "ct-h-13",
    type: "code-trace",
    difficulty: "hard",
    language: "javascript",
    code: `const base = { n: 1 };
const list = [base, base];
list[0].n = 5;
const copy = { ...base };
copy.n = 9;
console.log(list[1].n + "," + base.n + "," + copy.n);`,
    prompt: {
      th: "ผลลัพธ์ที่พิมพ์ออกมาคืออะไร",
      en: "What is printed?",
    },
    explanation: {
      th: "สมาชิกทั้งสองตัวของ list ชี้ไปที่อ็อบเจกต์ base ก้อนเดียวกัน การแก้ผ่าน list[0] จึงเห็นผลที่ list[1] และ base ด้วย แต่ spread สร้างอ็อบเจกต์ใหม่ การแก้ copy จึงไม่กระทบของเดิม",
      en: "Both slots of list point at the same base object, so writing through list[0] is visible from list[1] and base as well. The spread makes a fresh object, so editing copy leaves the original alone.",
    },
    answer: {
      kind: "choice",
      choices: ["1,1,9", "5,5,5", "1,5,9", "5,5,9"],
      correctIndex: 3,
    },
  },
  {
    id: "ct-h-14",
    type: "code-trace",
    difficulty: "hard",
    language: "python",
    input: "fib(6) is called once",
    code: `memo = {}
calls = 0

def fib(n):
    global calls
    calls += 1
    if n in memo:
        return memo[n]
    if n < 2:
        return n
    memo[n] = fib(n - 1) + fib(n - 2)
    return memo[n]

fib(6)
print(calls)`,
    prompt: {
      th: "หลังเรียก fib(6) หนึ่งครั้ง ค่า calls ที่พิมพ์ออกมาเป็นเท่าใด",
      en: "After fib(6) is called once, what value of calls is printed?",
    },
    explanation: {
      th: "memo เก็บผลของ n ตั้งแต่ 2 ขึ้นไป ค่าที่คำนวณจริงมี n = 6, 5, 4, 3, 2 (5 ครั้ง) จากนั้นมีการเรียกซ้ำที่ได้ค่าจาก memo ทันทีอีก 3 ครั้ง (n = 2, 3, 4) และการเรียกที่ตกถึงกรณีฐานซึ่งไม่ถูก memo คือ n = 1, 0, 1 อีก 3 ครั้ง รวมทั้งหมด 11 ครั้ง",
      en: "memo stores results for n of 2 and above. Five calls do real work (n = 6, 5, 4, 3, 2), three later calls hit the memo straight away (n = 2, 3, 4), and three calls fall through to the base case, which is never memoised (n = 1, 0, 1), for 11 calls in total.",
    },
    answer: { kind: "text", accepted: ["11"] },
  },
  {
    id: "ct-h-15",
    type: "code-trace",
    difficulty: "hard",
    language: "java",
    input: "a = {5, 0, 3}, i = 0",
    code: `int i = 0;
int[] a = {5, 0, 3};
boolean ok = a[i++] > 0 || a[i++] > 0;
System.out.println(ok + " " + i);`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "ฝั่งซ้ายอ่าน a[0] ได้ 5 แล้วเพิ่ม i เป็น 1 เมื่อผลเป็นจริง || จะตัดการประเมินฝั่งขวาทั้งก้อน i++ ตัวที่สองจึงไม่ทำงาน ผลลัพธ์คือ true และ i ยังเป็น 1",
      en: "The left side reads a[0], which is 5, and bumps i to 1. Since it is true, || short-circuits and skips the whole right side, so the second i++ never runs and i stays at 1.",
    },
    answer: {
      kind: "choice",
      choices: ["true 1", "true 2", "false 1", "true 3"],
      correctIndex: 0,
    },
  },
  {
    id: "ct-h-16",
    type: "code-trace",
    difficulty: "hard",
    language: "javascript",
    code: `function make() {
  let n = 0;
  return {
    inc() { n += 2; return n; },
    get() { return n; },
  };
}
const a = make();
const b = make();
a.inc();
a.inc();
b.inc();
console.log(a.get() + "," + b.get());`,
    prompt: {
      th: "ผลลัพธ์ที่พิมพ์ออกมาคืออะไร",
      en: "What is printed?",
    },
    explanation: {
      th: "การเรียก make() แต่ละครั้งสร้าง n ตัวใหม่ใน closure ของตัวเอง a ถูกเพิ่มสองครั้งได้ 4 ส่วน b ถูกเพิ่มครั้งเดียวได้ 2 ค่าไม่ปนกัน",
      en: "Each call to make() creates its own n inside a separate closure, so a is incremented twice to 4 while b is incremented once to 2, with no shared state.",
    },
    answer: { kind: "text", accepted: ["4,2", "4, 2"], placeholder: "x,x,x,...,x" },
  },
  {
    id: "ct-h-17",
    type: "code-trace",
    difficulty: "hard",
    language: "python",
    input: "s = 'aabba'",
    code: `s = 'aabba'
state = 0
count = 0
for ch in s:
    if state == 0:
        if ch == 'a':
            state = 1
    elif state == 1:
        if ch == 'b':
            state = 2
        else:
            state = 1
    else:
        if ch == 'a':
            count += 1
            state = 1
        else:
            state = 2
print(count, state)`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "เครื่องสถานะนี้จะนับเมื่อเจอ a ที่ตามหลัง b เท่านั้น ลำดับสถานะของ aabba คือ 1, 1, 2, 2, แล้วกลับมา 1 พร้อมเพิ่ม count หนึ่งครั้ง จึงพิมพ์ 1 1",
      en: "The machine only counts an a that follows a b. For aabba the states go 1, 1, 2, 2 and then back to 1 while count increases once, so it prints 1 1.",
    },
    answer: {
      kind: "choice",
      choices: ["0 1", "2 1", "1 1", "1 2"],
      correctIndex: 2,
    },
  },
];
