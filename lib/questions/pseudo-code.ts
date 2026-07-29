import type { PseudoCodeQuestion } from "../types";

/**
 * Pseudo code reading: language neutral snippets, answer the output or the intent.
 * Ids: pc-e-01.. (easy), pc-m-01.. (medium), pc-h-01.. (hard).
 * Pseudo code stays English. `prompt` / `explanation` / prose choices are bilingual.
 * List positions in every snippet start at 1.
 */
export const pseudoCodeQuestions: PseudoCodeQuestion[] = [
  {
    id: "pc-e-01",
    type: "pseudo-code",
    difficulty: "easy",
    code: `BEGIN
  SET total TO 0
  FOR i FROM 1 TO 5
    SET total TO total + i
  END FOR
  PRINT total
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "ลูปเดินค่า i ตั้งแต่ 1 ถึง 5 และบวกเข้า total ทุกรอบ ค่าที่สะสมคือ 1, 3, 6, 10, 15 สุดท้ายพิมพ์ 15",
      en: "The loop walks i from 1 to 5 and adds each value into total. The running values are 1, 3, 6, 10, 15, so it prints 15.",
    },
    answer: { kind: "text", accepted: ["15"], placeholder: "15" },
  },
  {
    id: "pc-e-02",
    type: "pseudo-code",
    difficulty: "easy",
    input: "numbers = [4, 9, 2, 7]",
    code: `BEGIN
  SET best TO numbers[1]
  FOR i FROM 2 TO length(numbers)
    IF numbers[i] > best THEN
      SET best TO numbers[i]
    END IF
  END FOR
  PRINT best
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "best เริ่มที่สมาชิกตัวแรกคือ 4 แล้วถูกแทนที่ทุกครั้งที่พบค่าที่มากกว่า จึงกลายเป็น 9 และค้างอยู่ที่ 9 เพราะ 2 กับ 7 ไม่มากกว่า นี่คือรูปแบบมาตรฐานของการหาค่ามากที่สุด",
      en: "best starts at the first item, 4, and is replaced whenever a bigger value appears, so it becomes 9 and stays there because 2 and 7 are smaller. This is the standard find-the-maximum pattern.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "หาค่าที่น้อยที่สุดในลิสต์", en: "Find the smallest value in the list" },
        { th: "หาค่าที่มากที่สุดในลิสต์", en: "Find the largest value in the list" },
        { th: "นับจำนวนสมาชิกในลิสต์", en: "Count how many items the list has" },
        { th: "หาผลรวมของสมาชิกทุกตัว", en: "Add up every item in the list" },
      ],
      correctIndex: 1,
    },
  },
  {
    id: "pc-e-03",
    type: "pseudo-code",
    difficulty: "easy",
    input: 'word = "ALGORITHM"',
    code: `BEGIN
  SET count TO 0
  FOR i FROM 1 TO length(word)
    IF word[i] IN ["A", "E", "I", "O", "U"] THEN
      SET count TO count + 1
    END IF
  END FOR
  PRINT count
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "ลูปไล่ตัวอักษรทีละตัวและเพิ่ม count เมื่อตัวอักษรนั้นอยู่ในชุด A, E, I, O, U คำว่า ALGORITHM มีสระ A, O, I จึงพิมพ์ 3 หน้าที่ของโค้ดคือการนับสระ",
      en: "The loop visits each letter and increments count when the letter is one of A, E, I, O, U. ALGORITHM contains A, O and I, so it prints 3. The job of the code is counting vowels.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "นับจำนวนตัวอักษรทั้งหมดในคำ", en: "Count all the letters in the word" },
        { th: "นับจำนวนพยัญชนะในคำ", en: "Count the consonants in the word" },
        { th: "นับจำนวนสระ (A, E, I, O, U) ในคำ", en: "Count the vowels (A, E, I, O, U) in the word" },
        { th: "ตรวจว่าคำนี้ขึ้นต้นด้วยสระหรือไม่", en: "Check whether the word starts with a vowel" },
      ],
      correctIndex: 2,
    },
  },
  {
    id: "pc-e-04",
    type: "pseudo-code",
    difficulty: "easy",
    code: `BEGIN
  SET n TO 5
  WHILE n > 0
    PRINT n
    SET n TO n - 2
  END WHILE
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมาตามลำดับ",
      en: "Which values does this pseudo code print, in order?",
    },
    explanation: {
      th: "n เริ่มที่ 5 พิมพ์แล้วลดลงทีละ 2 ได้ 5, 3, 1 หลังจากนั้น n เป็น -1 ซึ่งไม่ผ่านเงื่อนไข n > 0 ลูปจึงหยุด",
      en: "n starts at 5 and drops by 2 after each print, giving 5, 3, 1. Then n is -1, which fails the n > 0 test, so the loop stops.",
    },
    answer: {
      kind: "text",
      accepted: ["5 3 1", "5,3,1", "5, 3, 1", "531"],
      placeholder: "5 3 1",
    },
  },
  {
    id: "pc-e-05",
    type: "pseudo-code",
    difficulty: "easy",
    input: "scores = [80, 90, 70, 60]",
    code: `BEGIN
  SET total TO 0
  FOR i FROM 1 TO length(scores)
    SET total TO total + scores[i]
  END FOR
  PRINT total / length(scores)
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "ลูปรวมคะแนนทุกตัวได้ 300 แล้วบรรทัด PRINT หารด้วยจำนวนสมาชิกคือ 4 ผลลัพธ์ 75 ซึ่งก็คือค่าเฉลี่ย",
      en: "The loop sums every score to 300, then the PRINT line divides by the number of items, 4, giving 75, which is the average.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "หาผลรวมของคะแนนทั้งหมด", en: "Compute the total of all the scores" },
        { th: "หาคะแนนที่สูงที่สุด", en: "Find the highest score" },
        { th: "นับจำนวนคะแนนที่มีอยู่", en: "Count how many scores there are" },
        { th: "หาค่าเฉลี่ยของคะแนน", en: "Compute the average of the scores" },
      ],
      correctIndex: 3,
    },
  },
  {
    id: "pc-e-06",
    type: "pseudo-code",
    difficulty: "easy",
    input: 'word = "GYM"',
    code: `BEGIN
  SET out TO ""
  FOR i FROM 1 TO length(word)
    SET out TO word[i] + out
  END FOR
  PRINT out
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์อะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "แต่ละรอบเอาตัวอักษรใหม่ไปต่อ ข้างหน้า ของข้อความเดิม out จึงไล่เป็น G, YG, MYG ผลคือคำกลับด้าน",
      en: "Each pass puts the new letter in front of the existing text, so out becomes G, then YG, then MYG. The result is the word reversed.",
    },
    answer: { kind: "text", accepted: ["MYG"], placeholder: "MYG" },
  },
  {
    id: "pc-e-07",
    type: "pseudo-code",
    difficulty: "easy",
    code: `BEGIN
  SET result TO 1
  FOR i FROM 1 TO 5
    SET result TO result * i
  END FOR
  PRINT result
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "result เริ่มที่ 1 แล้วคูณด้วย 1, 2, 3, 4, 5 ตามลำดับ ได้ 1, 2, 6, 24, 120 นี่คือ 5 แฟกทอเรียล",
      en: "result starts at 1 and is multiplied by 1, 2, 3, 4, 5 in turn, giving 1, 2, 6, 24, 120. This is 5 factorial.",
    },
    answer: { kind: "choice", choices: ["25", "15", "720", "120"], correctIndex: 3 },
  },
  {
    id: "pc-e-08",
    type: "pseudo-code",
    difficulty: "easy",
    input: "values = [4, 15, 10, 23, 8, 11, 30]",
    code: `BEGIN
  SET count TO 0
  FOR i FROM 1 TO length(values)
    IF values[i] > 10 THEN
      SET count TO count + 1
    END IF
  END FOR
  PRINT count
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "count เพิ่มขึ้นหนึ่งทุกครั้งที่เจอค่ามากกว่า 10 โดยไม่สนใจตัวค่าเอง ในลิสต์นี้ผ่านเงื่อนไข 4 ตัวคือ 15, 23, 11 และ 30 จึงพิมพ์ 4 หน้าที่ของโค้ดคือการนับ ไม่ใช่การรวมค่า",
      en: "count grows by one each time a value above 10 appears, and the value itself is never added. Here 15, 23, 11 and 30 pass, so it prints 4. The code counts items rather than summing them.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "หาค่าที่มากที่สุดในลิสต์", en: "Find the largest value in the list" },
        { th: "หาผลรวมของค่าที่มากกว่า 10", en: "Add up the values greater than 10" },
        { th: "หาตำแหน่งของค่าแรกที่มากกว่า 10", en: "Find the position of the first value greater than 10" },
        { th: "นับจำนวนสมาชิกที่มีค่ามากกว่า 10", en: "Count how many items are greater than 10" },
      ],
      correctIndex: 3,
    },
  },
  {
    id: "pc-e-09",
    type: "pseudo-code",
    difficulty: "easy",
    input: "items = [3, 8, 5, 8], target = 8",
    code: `BEGIN
  SET found TO FALSE
  FOR i FROM 1 TO length(items)
    IF items[i] = target THEN
      SET found TO TRUE
    END IF
  END FOR
  PRINT found
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "ตัวแปร found เป็นแค่ธงจริงหรือเท็จ ไม่ได้เก็บตำแหน่งและไม่ได้นับจำนวน เมื่อเจอ target ครั้งแรกก็ตั้งเป็น TRUE และเจอซ้ำก็ยังเป็น TRUE เหมือนเดิม จึงเป็นการค้นหาแบบเชิงเส้นเพื่อตอบว่ามีหรือไม่มี",
      en: "found is only a true/false flag: it stores no position and counts nothing. The first match sets it to TRUE and later matches leave it TRUE, so this is a linear search that answers whether the value exists.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "ตรวจว่าค่า target อยู่ในลิสต์หรือไม่", en: "Check whether target appears in the list" },
        { th: "นับว่า target ปรากฏกี่ครั้ง", en: "Count how many times target appears" },
        { th: "บอกตำแหน่งของ target ในลิสต์", en: "Report the position of target in the list" },
        { th: "ลบ target ออกจากลิสต์", en: "Remove target from the list" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "pc-e-10",
    type: "pseudo-code",
    difficulty: "easy",
    code: `BEGIN
  SET n TO 1
  WHILE n <= 8
    PRINT n
    SET n TO n * 2
  END WHILE
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมาตามลำดับ",
      en: "Which values does this pseudo code print, in order?",
    },
    explanation: {
      th: "n ถูกคูณสองทุกรอบ จึงพิมพ์ 1, 2, 4, 8 รอบถัดไป n เป็น 16 ซึ่งมากกว่า 8 ลูปจึงจบ",
      en: "n doubles every pass, so it prints 1, 2, 4, 8. Next n is 16, which is greater than 8, so the loop ends.",
    },
    answer: {
      kind: "text",
      accepted: ["1 2 4 8", "1,2,4,8", "1, 2, 4, 8", "1248"],
      placeholder: "1 2 4 8",
    },
  },
  {
    id: "pc-e-11",
    type: "pseudo-code",
    difficulty: "easy",
    code: `BEGIN
  SET a TO 3
  SET b TO 7
  SET temp TO a
  SET a TO b
  SET b TO temp
  PRINT a, b
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "temp เก็บค่าเดิมของ a ไว้ก่อนที่ a จะถูกเขียนทับด้วย b แล้วค่อยย้ายค่าจาก temp ไปใส่ b ผลคือพิมพ์ 7 3 นี่คือการสลับค่าโดยใช้ตัวแปรพัก",
      en: "temp keeps the old value of a before a is overwritten by b, then that saved value moves into b. It prints 7 3, the classic swap using a temporary variable.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "ทำให้ a และ b มีค่าเท่ากัน", en: "Make a and b hold the same value" },
        { th: "หาค่าที่มากกว่าระหว่าง a กับ b", en: "Find the larger of a and b" },
        { th: "สลับค่าของ a กับ b", en: "Swap the values of a and b" },
        { th: "หาผลรวมของ a กับ b", en: "Add a and b together" },
      ],
      correctIndex: 2,
    },
  },
  {
    id: "pc-e-12",
    type: "pseudo-code",
    difficulty: "easy",
    code: `BEGIN
  SET total TO 0
  FOR i FROM 1 TO 10
    IF i MOD 2 = 0 THEN
      SET total TO total + i
    END IF
  END FOR
  PRINT total
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "เงื่อนไข i MOD 2 = 0 รับเฉพาะเลขคู่ จึงบวกเฉพาะ 2, 4, 6, 8, 10 รวมได้ 30 ส่วนเลขคี่ถูกข้ามไปทั้งหมด",
      en: "The test i MOD 2 = 0 only accepts even numbers, so it adds 2, 4, 6, 8, 10 for a total of 30 while every odd number is skipped.",
    },
    answer: { kind: "choice", choices: ["30", "55", "25", "20"], correctIndex: 0 },
  },
  {
    id: "pc-m-01",
    type: "pseudo-code",
    difficulty: "medium",
    input: "n = 472",
    code: `BEGIN
  SET total TO 0
  WHILE n > 0
    SET total TO total + (n MOD 10)
    SET n TO n DIV 10
  END WHILE
  PRINT total
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา (DIV คือการหารแบบเอาเฉพาะจำนวนเต็ม)",
      en: "What does this pseudo code print? (DIV is integer division.)",
    },
    explanation: {
      th: "n MOD 10 ดึงหลักขวาสุดออกมา และ n DIV 10 ตัดหลักนั้นทิ้ง ลำดับจึงเป็น 472 ให้ 2, 47 ให้ 7, 4 ให้ 4 รวมได้ 13 แล้ว n กลายเป็น 0 ลูปจบ",
      en: "n MOD 10 peels off the rightmost digit and n DIV 10 drops it, so 472 gives 2, 47 gives 7 and 4 gives 4. The total is 13 and n becomes 0, ending the loop.",
    },
    answer: { kind: "text", accepted: ["13"], placeholder: "13" },
  },
  {
    id: "pc-m-02",
    type: "pseudo-code",
    difficulty: "medium",
    input: "items = [5, 8, 3, 9, 3], target = 3",
    code: `BEGIN
  SET position TO -1
  FOR i FROM 1 TO length(items)
    IF items[i] = target AND position = -1 THEN
      SET position TO i
    END IF
  END FOR
  PRINT position
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา (ตำแหน่งแรกของลิสต์คือ 1)",
      en: "What does this pseudo code print? (The first position of the list is 1.)",
    },
    explanation: {
      th: "เงื่อนไขเพิ่มเติม position = -1 ทำให้บันทึกได้แค่ครั้งแรกที่เจอ target ค่า 3 ตัวแรกอยู่ตำแหน่ง 3 ส่วนค่า 3 ที่ตำแหน่ง 5 ถูกมองข้ามเพราะ position ไม่ใช่ -1 อีกแล้ว",
      en: "The extra test position = -1 means only the first match is recorded. The first 3 sits at position 3, and the later 3 at position 5 is ignored because position is no longer -1.",
    },
    answer: { kind: "choice", choices: ["1", "3", "5", "-1"], correctIndex: 1 },
  },
  {
    id: "pc-m-03",
    type: "pseudo-code",
    difficulty: "medium",
    code: `BEGIN
  SET count TO 0
  FOR i FROM 1 TO 3
    FOR j FROM 1 TO i
      SET count TO count + 1
    END FOR
  END FOR
  PRINT count
END`,
    prompt: {
      th: "ค่า count ที่พิมพ์ออกมาเป็นเท่าใด",
      en: "What value of count is printed?",
    },
    explanation: {
      th: "ขอบเขตของลูปในขึ้นกับ i รอบ i = 1 ทำงาน 1 ครั้ง, i = 2 ทำงาน 2 ครั้ง, i = 3 ทำงาน 3 ครั้ง รวม 1 + 2 + 3 = 6",
      en: "The inner loop bound depends on i: one pass when i = 1, two when i = 2 and three when i = 3, so 1 + 2 + 3 = 6.",
    },
    answer: { kind: "text", accepted: ["6"], placeholder: "6" },
  },
  {
    id: "pc-m-04",
    type: "pseudo-code",
    difficulty: "medium",
    input: "a = 48, b = 18",
    code: `BEGIN
  WHILE b <> 0
    SET temp TO b
    SET b TO a MOD b
    SET a TO temp
  END WHILE
  PRINT a
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "แต่ละรอบแทนที่คู่ (a, b) ด้วย (b, a MOD b) ได้ลำดับ (48, 18), (18, 12), (12, 6), (6, 0) เมื่อ b เป็น 0 ก็พิมพ์ a คือ 6 ซึ่งเป็น ห.ร.ม. ของ 48 กับ 18 นี่คืออัลกอริทึมยุคลิด",
      en: "Each pass replaces the pair (a, b) with (b, a MOD b): (48, 18), (18, 12), (12, 6), (6, 0). When b hits 0 it prints a, which is 6, the greatest common divisor of 48 and 18. This is Euclid's algorithm.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "หาผลคูณของ a กับ b", en: "Compute the product of a and b" },
        { th: "หาเศษของ a หารด้วย b เพียงครั้งเดียว", en: "Compute the remainder of a divided by b just once" },
        { th: "หาตัวคูณร่วมน้อยของ a กับ b", en: "Find the least common multiple of a and b" },
        { th: "หาตัวหารร่วมมากของ a กับ b", en: "Find the greatest common divisor of a and b" },
      ],
      correctIndex: 3,
    },
  },
  {
    id: "pc-m-05",
    type: "pseudo-code",
    difficulty: "medium",
    input: "list = [4, 2, 7, 1, 5]",
    code: `BEGIN
  FOR j FROM 1 TO length(list) - 1
    IF list[j] > list[j + 1] THEN
      SET temp TO list[j]
      SET list[j] TO list[j + 1]
      SET list[j + 1] TO temp
    END IF
  END FOR
  PRINT list
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "ลูปเทียบเพื่อนบ้านทีละคู่แค่รอบเดียว ลิสต์เปลี่ยนเป็น [2, 4, 7, 1, 5] แล้ว [2, 4, 1, 7, 5] และ [2, 4, 1, 5, 7] ค่ามากที่สุดคือ 7 ถูกดันไปอยู่ท้ายสุด แต่ส่วนที่เหลือยังไม่เรียง จึงเป็นบับเบิลซอร์ตเพียงหนึ่งรอบ",
      en: "The loop compares neighbours once from left to right. The list becomes [2, 4, 7, 1, 5], then [2, 4, 1, 7, 5], then [2, 4, 1, 5, 7]. The largest value, 7, is pushed to the end while the rest is still unsorted, so it is a single bubble sort pass.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "เรียงลิสต์จากน้อยไปมากให้เสร็จสมบูรณ์", en: "Fully sort the list from smallest to largest" },
        { th: "ทำบับเบิลซอร์ตหนึ่งรอบ ดันค่ามากที่สุดไปอยู่ตำแหน่งสุดท้าย", en: "Do one bubble sort pass, pushing the largest value to the last position" },
        { th: "กลับด้านลิสต์", en: "Reverse the list" },
        { th: "ย้ายค่าน้อยที่สุดไปไว้ตำแหน่งแรก", en: "Move the smallest value to the first position" },
      ],
      correctIndex: 1,
    },
  },
  {
    id: "pc-m-06",
    type: "pseudo-code",
    difficulty: "medium",
    input: 'word = "LEVEL"',
    code: `BEGIN
  SET left TO 1
  SET right TO length(word)
  SET same TO TRUE
  WHILE left < right
    IF word[left] <> word[right] THEN
      SET same TO FALSE
    END IF
    SET left TO left + 1
    SET right TO right - 1
  END WHILE
  IF same THEN
    PRINT "YES"
  ELSE
    PRINT "NO"
  END IF
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "ตัวชี้สองตัวเดินเข้าหากันและเทียบตัวอักษรเป็นคู่ (1, 5) แล้ว (2, 4) เมื่อ left กับ right ชนกันที่ 3 ลูปก็จบ ตัวกลางไม่ต้องเทียบ ทุกคู่ของ LEVEL ตรงกันจึงพิมพ์ YES นี่คือการตรวจพาลินโดรม",
      en: "Two pointers walk toward each other comparing letters in pairs (1, 5) then (2, 4). The loop ends when left meets right at 3, so the middle letter needs no partner. Every pair of LEVEL matches, so it prints YES. This is a palindrome check.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "ตรวจว่าคำนี้อ่านกลับหลังแล้วเหมือนเดิมหรือไม่ (พาลินโดรม)", en: "Check whether the word reads the same backwards (a palindrome)" },
        { th: "กลับด้านคำแล้วพิมพ์ออกมา", en: "Reverse the word and print it" },
        { th: "นับจำนวนตัวอักษรที่ซ้ำกันในคำ", en: "Count how many repeated letters the word has" },
        { th: "ตรวจเฉพาะว่าตัวอักษรตัวแรกกับตัวสุดท้ายเหมือนกันหรือไม่", en: "Check only whether the first and last letters match" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "pc-m-07",
    type: "pseudo-code",
    difficulty: "medium",
    input: "values = [1, 1, 2, 3, 3, 3]",
    code: `BEGIN
  SET count TO 0
  FOR i FROM 1 TO length(values) - 1
    IF values[i] = values[i + 1] THEN
      SET count TO count + 1
    END IF
  END FOR
  PRINT count
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "ลูปหยุดที่ตำแหน่งก่อนสุดท้ายเพราะต้องอ้าง values[i + 1] คู่ที่ตรวจคือ (1,1), (1,2), (2,3), (3,3), (3,3) มีคู่ที่ค่าเท่ากัน 3 คู่ จึงพิมพ์ 3 ไม่ใช่การนับค่าที่ไม่ซ้ำ",
      en: "The loop stops one position early because it reads values[i + 1]. The pairs checked are (1,1), (1,2), (2,3), (3,3), (3,3), and three of them are equal, so it prints 3. It is not counting distinct values.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "นับจำนวนค่าที่ไม่ซ้ำกันในลิสต์", en: "Count how many distinct values the list has" },
        { th: "ตรวจว่าลิสต์เรียงจากน้อยไปมากหรือไม่", en: "Check whether the list is sorted in ascending order" },
        { th: "นับจำนวนคู่ที่อยู่ติดกันและมีค่าเท่ากัน", en: "Count how many neighbouring pairs hold the same value" },
        { th: "นับจำนวนครั้งที่ค่าเปลี่ยนจากตัวก่อนหน้า", en: "Count how many times the value changes from the previous item" },
      ],
      correctIndex: 2,
    },
  },
  {
    id: "pc-m-08",
    type: "pseudo-code",
    difficulty: "medium",
    code: `BEGIN
  SET total TO 0
  FOR i FROM 1 TO 3
    FOR j FROM 1 TO 3
      IF i = j THEN
        SET total TO total + i * j
      END IF
    END FOR
  END FOR
  PRINT total
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "ลูปซ้อนไล่ทั้ง 9 คู่ แต่เงื่อนไข i = j ผ่านแค่ 3 คู่คือ (1,1), (2,2), (3,3) จึงบวก 1 + 4 + 9 = 14",
      en: "The nested loops visit all nine pairs, but only (1,1), (2,2) and (3,3) satisfy i = j, so it adds 1 + 4 + 9 = 14.",
    },
    answer: { kind: "choice", choices: ["14", "36", "6", "9"], correctIndex: 0 },
  },
  {
    id: "pc-m-09",
    type: "pseudo-code",
    difficulty: "medium",
    input: "list = [7, 3, 9, 3, 1]",
    code: `BEGIN
  SET pick TO 1
  FOR i FROM 2 TO length(list)
    IF list[i] < list[pick] THEN
      SET pick TO i
    END IF
  END FOR
  PRINT pick
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "pick เก็บ ตำแหน่ง ไม่ใช่ค่า และย้ายเมื่อพบค่าที่น้อยกว่าค่าที่ตำแหน่ง pick เดิม ลำดับคือ pick = 1 แล้ว 2 (เพราะ 3 < 7) แล้ว 5 (เพราะ 1 < 3) จึงพิมพ์ 5 ซึ่งเป็นตำแหน่งของค่าน้อยที่สุด",
      en: "pick holds a position, not a value, and moves whenever a smaller value than list[pick] shows up: 1, then 2 because 3 < 7, then 5 because 1 < 3. It prints 5, the position of the smallest value.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "คืนค่าที่น้อยที่สุดในลิสต์", en: "Return the smallest value in the list" },
        { th: "คืนตำแหน่งของค่าที่มากที่สุด", en: "Return the position of the largest value" },
        { th: "คืนตำแหน่งของค่าที่น้อยที่สุด", en: "Return the position of the smallest value" },
        { th: "เรียงลิสต์จากน้อยไปมาก", en: "Sort the list in ascending order" },
      ],
      correctIndex: 2,
    },
  },
  {
    id: "pc-m-10",
    type: "pseudo-code",
    difficulty: "medium",
    input: "n = 9",
    code: `BEGIN
  SET isPrime TO TRUE
  SET d TO 2
  WHILE d < n
    IF n MOD d = 0 THEN
      SET isPrime TO FALSE
    END IF
    SET d TO d + 1
  END WHILE
  IF isPrime THEN
    PRINT "PRIME"
  ELSE
    PRINT "NOT PRIME"
  END IF
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์อะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "d ไล่จาก 2 ถึง 8 พอถึง d = 3 จะได้ 9 MOD 3 = 0 ธง isPrime จึงถูกตั้งเป็น FALSE และไม่มีอะไรตั้งกลับ ผลลัพธ์คือ NOT PRIME",
      en: "d runs from 2 to 8, and at d = 3 the test 9 MOD 3 = 0 succeeds, so the flag isPrime is set to FALSE and nothing ever sets it back. The output is NOT PRIME.",
    },
    answer: {
      kind: "text",
      accepted: ["NOT PRIME", "not prime", "Not prime", "NOTPRIME", "not-prime"],
      placeholder: "NOT PRIME",
    },
  },
  {
    id: "pc-m-11",
    type: "pseudo-code",
    difficulty: "medium",
    input: "list = [1, 2, 3, 4, 5]",
    code: `BEGIN
  SET out TO ""
  FOR i FROM length(list) DOWN TO 1
    SET out TO out + list[i]
  END FOR
  PRINT out
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์อะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "ลูปเดินย้อนจากตำแหน่ง 5 ลงมาถึง 1 และต่อค่าเข้าท้ายข้อความ out จึงได้ 5, 54, 543, 5432, 54321",
      en: "The loop walks backwards from position 5 down to 1 and appends each value to the end of out, giving 5, 54, 543, 5432, 54321.",
    },
    answer: { kind: "text", accepted: ["54321"], placeholder: "54321" },
  },
  {
    id: "pc-m-12",
    type: "pseudo-code",
    difficulty: "medium",
    input: "a = 17, b = 5",
    code: `BEGIN
  SET count TO 0
  WHILE a >= b
    SET a TO a - b
    SET count TO count + 1
  END WHILE
  PRINT count, a
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "ลูปลบ b ออกจาก a ไปเรื่อย ๆ จนกว่า a จะน้อยกว่า b ได้ a เป็น 12, 7, 2 และ count เป็น 3 จึงพิมพ์ 3 กับ 2 นั่นคือผลหารจำนวนเต็มและเศษของ 17 หารด้วย 5",
      en: "The loop keeps subtracting b from a until a is smaller than b: a becomes 12, 7, 2 while count reaches 3, so it prints 3 and 2, the integer quotient and remainder of 17 divided by 5.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "หาผลคูณของ a กับ b", en: "Multiply a by b" },
        { th: "นับจำนวนหลักของ a", en: "Count the digits of a" },
        { th: "ตรวจว่า a หารด้วย b ลงตัวหรือไม่", en: "Check whether a is divisible by b" },
        { th: "หาผลหารจำนวนเต็มและเศษของ a หารด้วย b", en: "Compute the integer quotient and the remainder of a divided by b" },
      ],
      correctIndex: 3,
    },
  },
  {
    id: "pc-h-01",
    type: "pseudo-code",
    difficulty: "hard",
    input: "temps = [-4, -9, -2, -7]",
    code: `BEGIN
  SET max TO 0
  FOR i FROM 1 TO length(temps)
    IF temps[i] > max THEN
      SET max TO temps[i]
    END IF
  END FOR
  PRINT max
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "max ถูกตั้งต้นเป็น 0 ไม่ใช่สมาชิกตัวแรก เมื่อข้อมูลเป็นลบทั้งหมด จึงไม่มีตัวไหนมากกว่า 0 เงื่อนไขไม่เคยเป็นจริง max จึงยังเป็น 0 ทั้งที่ค่ามากที่สุดจริง ๆ คือ -2 นี่คือกับดักของค่าเริ่มต้นที่เลือกผิด",
      en: "max is seeded with 0 instead of the first item, and with all-negative data nothing is greater than 0, so the condition never fires and max stays 0 even though the real maximum is -2. That is the bad-initial-value trap.",
    },
    answer: { kind: "choice", choices: ["-2", "-9", "0", "-4"], correctIndex: 2 },
  },
  {
    id: "pc-h-02",
    type: "pseudo-code",
    difficulty: "hard",
    input: "list = [1, 2, 3, 4, 5]",
    code: `BEGIN
  SET left TO 1
  SET right TO length(list)
  WHILE left < right
    SET temp TO list[left]
    SET list[left] TO list[right]
    SET list[right] TO temp
    SET left TO left + 1
    SET right TO right - 1
  END WHILE
  PRINT list
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "ตัวชี้สองตัวเดินเข้าหากันและสลับคู่ (1, 5) แล้ว (2, 4) พอ left = right = 3 ลูปหยุด ตัวกลางอยู่ที่เดิม ลิสต์กลายเป็น [5, 4, 3, 2, 1] โดยไม่สร้างลิสต์ใหม่ จำนวนการสลับเป็นแค่ครึ่งหนึ่งของความยาว ถ้าสลับต่อจนครบทุกตำแหน่งจะกลับมาเหมือนเดิม",
      en: "Two pointers move toward each other swapping the pairs (1, 5) then (2, 4), and the loop stops when left = right = 3, leaving the middle item alone. The list becomes [5, 4, 3, 2, 1] with no new list allocated. Only half the length is swapped; going further would undo the work.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "เรียงลิสต์จากมากไปน้อย", en: "Sort the list from largest to smallest" },
        { th: "กลับด้านลิสต์ในตัวมันเองโดยไม่สร้างลิสต์ใหม่", en: "Reverse the list in place without creating a new list" },
        { th: "สลับเฉพาะสมาชิกตัวแรกกับตัวสุดท้าย", en: "Swap only the first and last items" },
        { th: "เลื่อนสมาชิกทุกตัวไปทางซ้ายหนึ่งตำแหน่ง", en: "Shift every item one position to the left" },
      ],
      correctIndex: 1,
    },
  },
  {
    id: "pc-h-03",
    type: "pseudo-code",
    difficulty: "hard",
    input: "list = [3, 1, 4, 1, 5]",
    code: `BEGIN
  SET total TO 0
  SET i TO 1
  WHILE i < length(list)
    SET total TO total + list[i]
    SET i TO i + 1
  END WHILE
  PRINT total
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "เงื่อนไขเป็น i < length(list) ไม่ใช่ i <= length(list) ลูปจึงทำงานเฉพาะตำแหน่ง 1 ถึง 4 บวกได้ 3 + 1 + 4 + 1 = 9 และสมาชิกตัวสุดท้ายคือ 5 ถูกทิ้งไป นี่คืออาการ off-by-one",
      en: "The test is i < length(list) rather than i <= length(list), so only positions 1 to 4 are added: 3 + 1 + 4 + 1 = 9, and the last item, 5, is left out. A classic off-by-one.",
    },
    answer: { kind: "text", accepted: ["9"], placeholder: "9" },
  },
  {
    id: "pc-h-04",
    type: "pseudo-code",
    difficulty: "hard",
    input: "list = [2, 5, 8, 12, 16, 23] (already sorted), target = 16",
    code: `BEGIN
  SET low TO 1
  SET high TO length(list)
  SET answer TO -1
  WHILE low <= high
    SET mid TO (low + high) DIV 2
    IF list[mid] = target THEN
      SET answer TO mid
      SET low TO high + 1
    ELSE IF list[mid] < target THEN
      SET low TO mid + 1
    ELSE
      SET high TO mid - 1
    END IF
  END WHILE
  PRINT answer
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "รอบแรก low = 1, high = 6 ได้ mid = 3 ค่า 8 น้อยกว่า 16 จึงตัดครึ่งซ้ายทิ้งด้วย low = 4 รอบสองได้ mid = 5 ซึ่งคือ 16 พอดี จึงบันทึก answer = 5 แล้วตั้ง low = high + 1 เพื่อออกจากลูป ใช้เพียง 2 รอบเพราะช่วงค้นหาถูกหารครึ่งทุกครั้ง ไม่ได้ไล่ดูทุกตัว",
      en: "First pass: low = 1, high = 6 gives mid = 3, and 8 is below 16 so the left half is dropped with low = 4. Second pass gives mid = 5, which is exactly 16, so answer = 5 and low = high + 1 breaks the loop. Only two passes are needed because the range halves each time instead of being scanned item by item.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "ค้นหาตำแหน่งของ target ในลิสต์ที่เรียงแล้ว โดยหารช่วงค้นหาลงครึ่งหนึ่งทุกรอบ", en: "Find the position of target in a sorted list by halving the search range each pass" },
        { th: "ไล่ตรวจสมาชิกทุกตัวจากซ้ายไปขวาเพื่อหา target", en: "Scan every item from left to right looking for target" },
        { th: "หาค่าที่อยู่กลางลิสต์", en: "Find the value in the middle of the list" },
        { th: "เรียงลิสต์ก่อนแล้วจึงค้นหา", en: "Sort the list first and then search it" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "pc-h-05",
    type: "pseudo-code",
    difficulty: "hard",
    code: `BEGIN
  SET foundI TO 0
  SET foundJ TO 0
  FOR i FROM 1 TO 3
    IF foundI = 0 THEN
      FOR j FROM 1 TO 3
        IF i * j = 4 AND foundI = 0 THEN
          SET foundI TO i
          SET foundJ TO j
        END IF
      END FOR
    END IF
  END FOR
  PRINT foundI, foundJ
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา (ตอบเป็นคู่ตัวเลข)",
      en: "What does this pseudo code print? (Answer as a pair of numbers.)",
    },
    explanation: {
      th: "รอบ i = 1 ได้ผลคูณ 1, 2, 3 ไม่มีตัวใดเท่ากับ 4 รอบ i = 2 ที่ j = 2 ได้ 4 จึงบันทึก foundI = 2 และ foundJ = 2 หลังจากนั้นเงื่อนไข foundI = 0 ทำหน้าที่เป็นเบรกจำลอง ทั้ง j = 3 และรอบ i = 3 จึงถูกข้าม แม้ว่า i = 4 จะให้ 4 เช่นกันก็ไม่ถูกพิจารณา",
      en: "For i = 1 the products are 1, 2, 3 and none is 4. For i = 2 at j = 2 the product is 4, so foundI = 2 and foundJ = 2 are recorded. After that the foundI = 0 test acts as a simulated break, so j = 3 and the whole i = 3 round are skipped.",
    },
    answer: {
      kind: "text",
      accepted: ["2 2", "2,2", "2, 2", "22"],
      placeholder: "2 2",
    },
  },
  {
    id: "pc-h-06",
    type: "pseudo-code",
    difficulty: "hard",
    input: "list = [3, 1, 2]",
    code: `BEGIN
  SET swaps TO 0
  FOR i FROM 1 TO length(list) - 1
    FOR j FROM 1 TO length(list) - i
      IF list[j] > list[j + 1] THEN
        SET temp TO list[j]
        SET list[j] TO list[j + 1]
        SET list[j + 1] TO temp
        SET swaps TO swaps + 1
      END IF
    END FOR
  END FOR
  PRINT swaps
END`,
    prompt: {
      th: "ค่า swaps ที่พิมพ์ออกมาเป็นเท่าใด",
      en: "What value of swaps is printed?",
    },
    explanation: {
      th: "รอบ i = 1 ลูปในวิ่ง j = 1 ถึง 2 ที่ j = 1 มี 3 > 1 สลับได้ [1, 3, 2] นับ 1 ครั้ง ที่ j = 2 มี 3 > 2 สลับได้ [1, 2, 3] นับเป็น 2 ครั้ง รอบ i = 2 ลูปในวิ่งแค่ j = 1 และ 1 > 2 เป็นเท็จ จึงไม่สลับเพิ่ม ผลลัพธ์คือ 2",
      en: "When i = 1 the inner loop covers j = 1 and 2: at j = 1, 3 > 1 swaps to [1, 3, 2] (one swap), and at j = 2, 3 > 2 swaps to [1, 2, 3] (two swaps). When i = 2 the inner loop only reaches j = 1, where 1 > 2 is false, so nothing more happens and it prints 2.",
    },
    answer: { kind: "choice", choices: ["3", "1", "0", "2"], correctIndex: 3 },
  },
  {
    id: "pc-h-07",
    type: "pseudo-code",
    difficulty: "hard",
    input: "n = 0",
    code: `BEGIN
  SET digits TO 0
  WHILE n > 0
    SET digits TO digits + 1
    SET n TO n DIV 10
  END WHILE
  PRINT digits
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา (DIV คือการหารแบบเอาเฉพาะจำนวนเต็ม)",
      en: "What does this pseudo code print? (DIV is integer division.)",
    },
    explanation: {
      th: "เงื่อนไข n > 0 ถูกตรวจก่อนเข้าลูป และ n เป็น 0 ตั้งแต่ต้น ตัวลูปจึงไม่ทำงานเลยแม้แต่ครั้งเดียว ค่าที่พิมพ์คือค่าเริ่มต้น 0 ทั้งที่เลข 0 ควรนับว่ามีหนึ่งหลัก เป็นกรณีขอบที่โค้ดนี้ตอบผิด",
      en: "The n > 0 test runs before the body and n is already 0, so the loop body never executes once and the initial value 0 is printed, even though the number 0 should count as one digit. This is the edge case the code gets wrong.",
    },
    answer: { kind: "choice", choices: ["1", "0", "2", "-1"], correctIndex: 1 },
  },
  {
    id: "pc-h-08",
    type: "pseudo-code",
    difficulty: "hard",
    input: "a = 6, b = 4",
    code: `BEGIN
  SET result TO 0
  SET i TO 0
  WHILE i < b
    SET result TO result + a
    SET i TO i + 1
  END WHILE
  PRINT result
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "ลูปทำงาน b รอบคือ 4 รอบ และบวก a เข้าไปรอบละ 6 ได้ 6, 12, 18, 24 ผลลัพธ์คือ a คูณ b โดยใช้การบวกซ้ำ ไม่ใช่การบวกเลข 1 ถึง b และไม่ใช่การยกกำลังเพราะถ้ายกกำลังต้องเป็นการคูณสะสม",
      en: "The loop runs b times, four passes, adding a each time: 6, 12, 18, 24. The result is a times b built from repeated addition, not the sum of 1 to b and not a power, which would need repeated multiplication.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "หาผลรวมของเลข 1 ถึง b", en: "Add up the numbers from 1 to b" },
        { th: "หาผลบวกของ a กับ b", en: "Add a and b together" },
        { th: "หา a ยกกำลัง b", en: "Raise a to the power of b" },
        { th: "หาผลคูณ a คูณ b ด้วยการบวกซ้ำ", en: "Multiply a by b using repeated addition" },
      ],
      correctIndex: 3,
    },
  },
  {
    id: "pc-h-09",
    type: "pseudo-code",
    difficulty: "hard",
    input: "list = [4, 7, 2, 7, 9]",
    code: `BEGIN
  SET flag TO FALSE
  FOR i FROM 1 TO length(list) - 1
    FOR j FROM i + 1 TO length(list)
      IF list[i] = list[j] THEN
        SET flag TO TRUE
      END IF
    END FOR
  END FOR
  PRINT flag
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "ลูปในเริ่มที่ i + 1 ทำให้เทียบทุกคู่เพียงครั้งเดียวและไม่มีสมาชิกไหนถูกเทียบกับตัวเอง ในลิสต์นี้คู่ (2, 4) คือ 7 กับ 7 ทำให้ flag เป็น TRUE ผลลัพธ์เป็นแค่จริงหรือเท็จ ไม่ได้นับจำนวนและไม่ได้ลบอะไรออก",
      en: "The inner loop starts at i + 1, so every pair is compared once and no item is compared with itself. Here positions 2 and 4 both hold 7, which sets flag to TRUE. The output is just true or false: nothing is counted and nothing is removed.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "นับจำนวนค่าที่ไม่ซ้ำกันในลิสต์", en: "Count how many distinct items the list has" },
        { th: "ตรวจว่าลิสต์เรียงลำดับแล้วหรือไม่", en: "Check whether the list is already sorted" },
        { th: "ตรวจว่าในลิสต์มีค่าซ้ำกันหรือไม่", en: "Check whether the list contains any duplicate value" },
        { th: "ลบค่าที่ซ้ำออกจากลิสต์", en: "Remove duplicate values from the list" },
      ],
      correctIndex: 2,
    },
  },
  {
    id: "pc-h-10",
    type: "pseudo-code",
    difficulty: "hard",
    input: "list = [2, 8, 5, 5, 3]",
    code: `BEGIN
  SET count TO 0
  FOR i FROM 1 TO length(list) - 1
    FOR j FROM i + 1 TO length(list)
      IF list[i] + list[j] = 10 THEN
        SET count TO count + 1
      END IF
    END FOR
  END FOR
  PRINT count
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "เพราะ j เริ่มที่ i + 1 แต่ละคู่จึงถูกตรวจครั้งเดียวและไม่มีการจับคู่กับตัวเอง คู่ที่บวกได้ 10 คือ (2, 8) และ 5 กับ 5 ที่ตำแหน่ง 3 กับ 4 จึงพิมพ์ 2 โค้ดนับจำนวนคู่ ไม่ได้หยุดตั้งแต่เจอคู่แรก",
      en: "Because j starts at i + 1 each pair is examined once and no item pairs with itself. The pairs summing to 10 are (2, 8) and the two 5s at positions 3 and 4, so it prints 2. The code counts pairs instead of stopping at the first one.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "นับจำนวนคู่ของสมาชิกที่บวกกันได้ 10 โดยนับแต่ละคู่ครั้งเดียว", en: "Count the pairs of items whose sum is 10, counting each pair once" },
        { th: "ตรวจว่ามีคู่ที่บวกกันได้ 10 อยู่หรือไม่", en: "Check whether any pair sums to 10" },
        { th: "หาผลรวมของสมาชิกทุกตัวในลิสต์", en: "Add up every item in the list" },
        { th: "นับจำนวนสมาชิกที่มีค่าเท่ากับ 10", en: "Count how many items are equal to 10" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "pc-h-11",
    type: "pseudo-code",
    difficulty: "hard",
    input: "list = [1, 2, 3, 4]",
    code: `BEGIN
  SET first TO list[1]
  FOR i FROM 1 TO length(list) - 1
    SET list[i] TO list[i + 1]
  END FOR
  SET list[length(list)] TO first
  PRINT list
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "บรรทัดแรกเก็บค่า 1 ไว้ก่อนที่จะถูกทับ ลูปคัดลอกค่าจากตำแหน่งถัดไปมาไว้ตำแหน่งปัจจุบัน ลิสต์จึงกลายเป็น [2, 3, 4, 4] แล้วช่องสุดท้ายถูกเขียนด้วยค่าที่เก็บไว้ ได้ [2, 3, 4, 1] ลูปต้องหยุดที่ตำแหน่งก่อนสุดท้าย ไม่งั้นจะอ้างเกินขอบลิสต์",
      en: "The first line saves the value 1 before it gets overwritten. The loop copies each next value one slot left, leaving [2, 3, 4, 4], and then the last slot receives the saved value, giving [2, 3, 4, 1]. The loop must stop one position early or it would read past the end of the list.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "กลับด้านลิสต์", en: "Reverse the list" },
        { th: "เลื่อนสมาชิกไปทางขวาหนึ่งตำแหน่ง แล้วเอาตัวสุดท้ายมาไว้หน้าสุด", en: "Shift items one position right and move the last item to the front" },
        { th: "สลับสมาชิกตัวแรกกับตัวสุดท้าย", en: "Swap the first and last items" },
        { th: "หมุนลิสต์ไปทางซ้ายหนึ่งตำแหน่ง โดยเอาตัวแรกไปต่อท้าย", en: "Rotate the list one position left, moving the first item to the end" },
      ],
      correctIndex: 3,
    },
  },
  {
    id: "pc-h-12",
    type: "pseudo-code",
    difficulty: "hard",
    input: "list = [1, 2, 4]",
    code: `BEGIN
  SET total TO 0
  FOR i FROM 1 TO length(list)
    SET total TO total + list[i]
  END FOR
  PRINT total DIV length(list)
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา (DIV คือการหารแบบเอาเฉพาะจำนวนเต็ม ปัดเศษทิ้ง)",
      en: "What does this pseudo code print? (DIV is integer division, which throws the remainder away.)",
    },
    explanation: {
      th: "ผลรวมคือ 1 + 2 + 4 = 7 และมีสมาชิก 3 ตัว ค่าเฉลี่ยจริงคือ 2.33 แต่ DIV ตัดเศษทิ้ง 7 DIV 3 จึงได้ 2 นี่คือเหตุผลที่การหาค่าเฉลี่ยด้วยการหารจำนวนเต็มให้ผลเพี้ยน",
      en: "The sum is 1 + 2 + 4 = 7 over three items, so the true average is 2.33, but DIV discards the remainder and 7 DIV 3 is 2. This is why computing an average with integer division goes wrong.",
    },
    answer: { kind: "text", accepted: ["2"], placeholder: "2" },
  },
  {
    id: "pc-e-13",
    type: "pseudo-code",
    difficulty: "easy",
    code: `BEGIN
  SET total TO 0
  SET n TO 20
  WHILE n > 0
    SET total TO total + 1
    SET n TO n - 6
  END WHILE
  PRINT total
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "total นับจำนวนรอบที่ลูปทำงาน ค่า n ไล่เป็น 20, 14, 8, 2 ซึ่งผ่านเงื่อนไข n > 0 ทั้งสี่ครั้ง รอบถัดไป n เป็น -4 ลูปจึงหยุด ผลลัพธ์คือ 4",
      en: "total counts how many times the loop body runs. n takes the values 20, 14, 8, 2, which all pass the n > 0 test, and the next value is -4, so the loop stops and it prints 4.",
    },
    answer: { kind: "text", accepted: ["4"], placeholder: "4" },
  },
  {
    id: "pc-e-14",
    type: "pseudo-code",
    difficulty: "easy",
    code: `BEGIN
  SET total TO 0
  FOR i FROM 1 TO 4
    SET total TO total + i * i
  END FOR
  PRINT total
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "แต่ละรอบบวกกำลังสองของ i เข้าไปใน total ได้ 1, 4, 9 และ 16 รวมกันเป็น 30 ไม่ใช่ผลรวมของ 1 ถึง 4 ที่เท่ากับ 10",
      en: "Each pass adds the square of i into total, giving 1, 4, 9 and 16, which sum to 30. That is not the same as adding 1 to 4, which would be 10.",
    },
    answer: { kind: "choice", choices: ["10", "16", "30", "100"], correctIndex: 2 },
  },
  {
    id: "pc-e-15",
    type: "pseudo-code",
    difficulty: "easy",
    input: 'letters = ["C", "A", "T"]',
    code: `BEGIN
  SET out TO ""
  FOR i FROM length(letters) DOWN TO 1
    SET out TO out + letters[i]
  END FOR
  PRINT out
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์อะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "ลูปเดินย้อนจากตำแหน่ง 3 ลงมาถึง 1 แล้วต่อตัวอักษรไว้ท้ายข้อความ out จึงไล่เป็น T, TA, TAC",
      en: "The loop walks backwards from position 3 down to 1 and appends each letter to the end of out, so out becomes T, then TA, then TAC.",
    },
    answer: { kind: "text", accepted: ["TAC"], placeholder: "TAC" },
  },
  {
    id: "pc-e-16",
    type: "pseudo-code",
    difficulty: "easy",
    input: "list = [5, 2, 9, 4, 6]",
    code: `BEGIN
  SET total TO 0
  FOR i FROM 1 TO length(list)
    IF i MOD 2 = 1 THEN
      SET total TO total + list[i]
    END IF
  END FOR
  PRINT total
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "เงื่อนไขตรวจ i ซึ่งเป็นตำแหน่ง ไม่ใช่ list[i] ซึ่งเป็นค่า จึงบวกเฉพาะสมาชิกที่ตำแหน่ง 1, 3 และ 5 คือ 5 + 9 + 6 = 20",
      en: "The test looks at i, the position, not at list[i], the value, so only the items at positions 1, 3 and 5 are added: 5 + 9 + 6 = 20.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "หาผลรวมของสมาชิกทุกตัว", en: "Add up every item in the list" },
        { th: "หาผลรวมของสมาชิกที่อยู่ตำแหน่งเลขคี่ (1, 3, 5)", en: "Add up the items sitting at odd positions (1, 3, 5)" },
        { th: "หาผลรวมของสมาชิกที่มีค่าเป็นเลขคี่", en: "Add up the items whose value is odd" },
        { th: "นับจำนวนสมาชิกที่อยู่ตำแหน่งเลขคี่", en: "Count how many items sit at odd positions" },
      ],
      correctIndex: 1,
    },
  },
  {
    id: "pc-e-17",
    type: "pseudo-code",
    difficulty: "easy",
    input: "prices = [120, 80, 200, 60]",
    code: `BEGIN
  SET total TO 0
  FOR i FROM 1 TO length(prices)
    IF prices[i] >= 100 THEN
      SET total TO total + prices[i]
    END IF
  END FOR
  PRINT total
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "เฉพาะราคาที่ไม่น้อยกว่า 100 ถูกบวกเข้า total คือ 120 และ 200 รวมได้ 320 ส่วน 80 กับ 60 ถูกข้าม",
      en: "Only the prices that are at least 100 are added into total, namely 120 and 200, giving 320, while 80 and 60 are skipped.",
    },
    answer: { kind: "text", accepted: ["320"], placeholder: "320" },
  },
  {
    id: "pc-m-13",
    type: "pseudo-code",
    difficulty: "medium",
    code: `BEGIN
  SET count TO 0
  FOR i FROM 1 TO 4
    FOR j FROM i TO 4
      IF (i + j) MOD 2 = 0 THEN
        SET count TO count + 1
      END IF
    END FOR
  END FOR
  PRINT count
END`,
    prompt: {
      th: "ค่า count ที่พิมพ์ออกมาเป็นเท่าใด",
      en: "What value of count is printed?",
    },
    explanation: {
      th: "ลูปในเริ่มที่ j = i ไม่ใช่ 1 จึงมีคู่ทั้งหมด 4 + 3 + 2 + 1 = 10 คู่ คู่ที่ผลบวกเป็นเลขคู่คือ (1,1), (1,3), (2,2), (2,4), (3,3), (4,4) รวม 6 คู่",
      en: "The inner loop starts at j = i rather than 1, so there are 4 + 3 + 2 + 1 = 10 pairs in total. The pairs with an even sum are (1,1), (1,3), (2,2), (2,4), (3,3) and (4,4), which is 6.",
    },
    answer: { kind: "text", accepted: ["6"], placeholder: "6" },
  },
  {
    id: "pc-m-14",
    type: "pseudo-code",
    difficulty: "medium",
    input: "n = 3057",
    code: `BEGIN
  SET out TO 0
  WHILE n > 0
    SET out TO out * 10 + (n MOD 10)
    SET n TO n DIV 10
  END WHILE
  PRINT out
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา (DIV คือการหารแบบเอาเฉพาะจำนวนเต็ม)",
      en: "What does this pseudo code print? (DIV is integer division.)",
    },
    explanation: {
      th: "แต่ละรอบดึงหลักขวาสุดด้วย MOD 10 แล้วเลื่อน out ไปทางซ้ายด้วยการคูณ 10 ค่า out จึงไล่เป็น 7, 75, 750, 7503 นี่คือการกลับหลักของตัวเลข และเลข 0 ที่อยู่กลางไม่หายไป",
      en: "Each pass peels off the rightmost digit with MOD 10 and shifts out left by multiplying by 10, so out becomes 7, 75, 750, 7503. This reverses the digits, and the 0 in the middle is not lost.",
    },
    answer: { kind: "choice", choices: ["7503", "3057", "7530", "753"], correctIndex: 0 },
  },
  {
    id: "pc-m-15",
    type: "pseudo-code",
    difficulty: "medium",
    input: "list = [4, 3, 2, 1]",
    code: `BEGIN
  SET moves TO 0
  FOR i FROM 2 TO length(list)
    SET j TO i
    WHILE j > 1 AND list[j] < list[j - 1]
      SET temp TO list[j]
      SET list[j] TO list[j - 1]
      SET list[j - 1] TO temp
      SET j TO j - 1
      SET moves TO moves + 1
    END WHILE
  END FOR
  PRINT moves
END`,
    prompt: {
      th: "ค่า moves ที่พิมพ์ออกมาเป็นเท่าใด",
      en: "What value of moves is printed?",
    },
    explanation: {
      th: "นี่คือการเรียงแบบแทรก แต่ละตัวถูกเลื่อนถอยหลังจนกว่าจะเจอตัวที่เล็กกว่า รอบ i = 2 สลับ 1 ครั้งได้ [3, 4, 2, 1] รอบ i = 3 สลับ 2 ครั้งได้ [2, 3, 4, 1] รอบ i = 4 สลับ 3 ครั้งได้ [1, 2, 3, 4] รวม 1 + 2 + 3 = 6",
      en: "This is insertion sort: each item slides backwards until it meets something smaller. i = 2 costs one swap, giving [3, 4, 2, 1]; i = 3 costs two, giving [2, 3, 4, 1]; i = 4 costs three, giving [1, 2, 3, 4]. In total 1 + 2 + 3 = 6.",
    },
    answer: { kind: "text", accepted: ["6"], placeholder: "6" },
  },
  {
    id: "pc-m-16",
    type: "pseudo-code",
    difficulty: "medium",
    input: "list = [6, 12, 7, 20, 9]",
    code: `BEGIN
  SET stop TO FALSE
  SET seen TO 0
  SET i TO 1
  WHILE i <= length(list) AND stop = FALSE
    IF list[i] MOD 2 = 1 THEN
      SET stop TO TRUE
    ELSE
      SET seen TO seen + 1
      SET i TO i + 1
    END IF
  END WHILE
  PRINT seen
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "ธง stop ทำหน้าที่ออกจากลูปทันทีที่เจอเลขคี่ตัวแรก ลูปจึงนับ 6 และ 12 ได้ seen = 2 แล้วหยุดที่ 7 ค่า 20 ที่เป็นเลขคู่จึงไม่ถูกนับ แม้จะอยู่ในลิสต์",
      en: "The stop flag leaves the loop as soon as the first odd number appears, so the loop counts 6 and 12 for seen = 2 and halts at 7. The later even value 20 is never counted even though it is in the list.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "นับจำนวนเลขคู่ทั้งหมดในลิสต์", en: "Count all the even numbers in the list" },
        { th: "นับจำนวนเลขคี่ทั้งหมดในลิสต์", en: "Count all the odd numbers in the list" },
        { th: "บอกตำแหน่งของเลขคี่ตัวแรก", en: "Report the position of the first odd number" },
        { th: "นับจำนวนเลขคู่ที่อยู่ติดกันตั้งแต่ต้นลิสต์ ก่อนจะพบเลขคี่ตัวแรก", en: "Count the run of even numbers at the start of the list, before the first odd number" },
      ],
      correctIndex: 3,
    },
  },
  {
    id: "pc-m-17",
    type: "pseudo-code",
    difficulty: "medium",
    input: "total = 215",
    code: `BEGIN
  SET h TO total DIV 60
  SET m TO total MOD 60
  IF m >= 30 THEN
    SET h TO h + 1
  END IF
  PRINT h
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา (DIV คือการหารแบบเอาเฉพาะจำนวนเต็ม)",
      en: "What does this pseudo code print? (DIV is integer division.)",
    },
    explanation: {
      th: "215 DIV 60 ได้ 3 และ 215 MOD 60 ได้ 35 เพราะเศษ 35 ไม่น้อยกว่า 30 จึงปัดชั่วโมงขึ้นเป็น 4 โค้ดนี้แปลงนาทีเป็นชั่วโมงแบบปัดครึ่งขึ้น",
      en: "215 DIV 60 is 3 and 215 MOD 60 is 35. Since the remainder 35 is at least 30, the hour is rounded up to 4. The code converts minutes into hours, rounding a half hour up.",
    },
    answer: { kind: "text", accepted: ["4"], placeholder: "4" },
  },
  {
    id: "pc-h-13",
    type: "pseudo-code",
    difficulty: "hard",
    input: "list = [1, 4, 6, 9, 13, 18, 21, 25, 30] (already sorted), target = 6",
    code: `BEGIN
  SET low TO 1
  SET high TO length(list)
  SET steps TO 0
  WHILE low <= high
    SET mid TO (low + high) DIV 2
    SET steps TO steps + 1
    IF list[mid] = target THEN
      SET low TO high + 1
    ELSE IF list[mid] < target THEN
      SET low TO mid + 1
    ELSE
      SET high TO mid - 1
    END IF
  END WHILE
  PRINT steps
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา (DIV คือการหารแบบเอาเฉพาะจำนวนเต็ม)",
      en: "What does this pseudo code print? (DIV is integer division.)",
    },
    explanation: {
      th: "รอบ 1 low = 1, high = 9 ได้ mid = 5 ค่า 13 มากกว่า 6 จึงตั้ง high = 4 รอบ 2 ได้ mid = 2 ค่า 4 น้อยกว่า 6 จึงตั้ง low = 3 รอบ 3 ได้ mid = (3 + 4) DIV 2 = 3 ซึ่งคือ 6 พอดี บรรทัด low = high + 1 ทำหน้าที่ออกจากลูป จึงนับได้ 3 รอบ",
      en: "Pass 1: low = 1, high = 9 gives mid = 5, and 13 is above 6 so high becomes 4. Pass 2: mid = 2, and 4 is below 6 so low becomes 3. Pass 3: mid = (3 + 4) DIV 2 = 3, which holds exactly 6, and low = high + 1 leaves the loop. That is 3 passes.",
    },
    answer: { kind: "choice", choices: ["2", "3", "4", "9"], correctIndex: 1 },
  },
  {
    id: "pc-h-14",
    type: "pseudo-code",
    difficulty: "hard",
    input: "tokens = [5, 3, 0, 8, 0, 0, 6], stack is empty at the start, 0 means take the top item off",
    code: `BEGIN
  SET top TO 0
  SET sum TO 0
  FOR i FROM 1 TO length(tokens)
    IF tokens[i] > 0 THEN
      SET top TO top + 1
      SET stack[top] TO tokens[i]
    ELSE IF top > 0 THEN
      SET sum TO sum + stack[top]
      SET top TO top - 1
    END IF
  END FOR
  PRINT sum, top
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา (ตอบเป็นคู่ตัวเลข sum แล้ว top)",
      en: "What does this pseudo code print? (Answer as the pair sum then top.)",
    },
    explanation: {
      th: "ตัวแปร top คือยอดของสแตกและค่าที่ถูกหยิบออกจะเป็นตัวที่ใส่ล่าสุดเสมอ ลำดับคือใส่ 5 และ 3 หยิบ 3 ได้ sum = 3 ใส่ 8 หยิบ 8 ได้ sum = 11 หยิบ 5 ได้ sum = 16 แล้วใส่ 6 ปิดท้าย เหลือของในสแตก 1 ตัว จึงพิมพ์ 16 กับ 1",
      en: "top marks the top of the stack, so the item taken off is always the most recent one pushed. The run is: push 5 and 3, pop 3 for sum = 3, push 8, pop 8 for sum = 11, pop 5 for sum = 16, then push 6, which leaves one item on the stack. It prints 16 and 1.",
    },
    answer: {
      kind: "text",
      accepted: ["16 1", "16,1", "16, 1", "161"],
      placeholder: "16 1",
    },
  },
  {
    id: "pc-h-15",
    type: "pseudo-code",
    difficulty: "hard",
    input: "list = [2, 2, 5, 5, 5, 1, 1]",
    code: `BEGIN
  SET best TO 1
  SET run TO 1
  FOR i FROM 2 TO length(list)
    IF list[i] = list[i - 1] THEN
      SET run TO run + 1
      IF run > best THEN
        SET best TO run
      END IF
    ELSE
      SET run TO 1
    END IF
  END FOR
  PRINT best
END`,
    prompt: {
      th: "อัลกอริทึมนี้ทำอะไร",
      en: "What is this algorithm doing?",
    },
    explanation: {
      th: "run นับความยาวของช่วงที่ค่าเท่ากันติดกันอยู่ตอนนี้ และถูกรีเซ็ตเป็น 1 ทุกครั้งที่ค่าเปลี่ยน ส่วน best เก็บค่าที่มากที่สุดที่ run เคยไปถึง ในลิสต์นี้ช่วงยาวสุดคือ 5 สามตัวติดกัน จึงพิมพ์ 3 ไม่ใช่จำนวนช่วงและไม่ใช่จำนวนค่าซ้ำทั้งหมด",
      en: "run tracks the length of the current block of equal neighbours and resets to 1 whenever the value changes, while best keeps the largest value run ever reached. Here the longest block is the three 5s, so it prints 3. It is neither the number of blocks nor the total number of repeats.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "นับจำนวนช่วงของค่าที่ซ้ำกันติดกันทั้งหมด", en: "Count how many blocks of repeated neighbours there are" },
        { th: "นับจำนวนสมาชิกที่ซ้ำกับตัวก่อนหน้า", en: "Count how many items match the item before them" },
        { th: "หาความยาวของช่วงที่ค่าเท่ากันติดกันที่ยาวที่สุด", en: "Find the length of the longest block of equal neighbouring values" },
        { th: "หาค่าที่ปรากฏบ่อยที่สุดในลิสต์", en: "Find the value that appears most often in the list" },
      ],
      correctIndex: 2,
    },
  },
  {
    id: "pc-h-16",
    type: "pseudo-code",
    difficulty: "hard",
    code: `BEGIN
  PROCEDURE fib(n)
    IF n <= 2 THEN
      RETURN 1
    END IF
    RETURN fib(n - 1) + fib(n - 2)
  END PROCEDURE
  PRINT fib(7)
END`,
    prompt: {
      th: "รหัสเทียมนี้พิมพ์ค่าอะไรออกมา",
      en: "What does this pseudo code print?",
    },
    explanation: {
      th: "กรณีฐานคือ fib(1) และ fib(2) ซึ่งคืนค่า 1 ทั้งคู่ จากนั้นค่าที่เหลือคือผลบวกของสองตัวก่อนหน้า ไล่ได้ fib(3) = 2, fib(4) = 3, fib(5) = 5, fib(6) = 8 และ fib(7) = 13",
      en: "The base cases are fib(1) and fib(2), which both return 1, and every other value is the sum of the two before it: fib(3) = 2, fib(4) = 3, fib(5) = 5, fib(6) = 8 and fib(7) = 13.",
    },
    answer: { kind: "text", accepted: ["13"], placeholder: "13" },
  },
  {
    id: "pc-h-17",
    type: "pseudo-code",
    difficulty: "hard",
    code: `BEGIN
  SET count TO 0
  FOR n FROM 2 TO 20
    SET d TO 2
    SET prime TO TRUE
    WHILE d * d <= n
      IF n MOD d = 0 THEN
        SET prime TO FALSE
      END IF
      SET d TO d + 1
    END WHILE
    IF prime THEN
      SET count TO count + 1
    END IF
  END FOR
  PRINT count
END`,
    prompt: {
      th: "ค่า count ที่พิมพ์ออกมาเป็นเท่าใด",
      en: "What value of count is printed?",
    },
    explanation: {
      th: "ลูปนอกเริ่มที่ 2 จึงไม่นับ 1 และลูปในหยุดเมื่อ d * d มากกว่า n ซึ่งเพียงพอสำหรับการตรวจจำนวนเฉพาะ สำหรับ n = 2 และ 3 ลูปในไม่ทำงานเลยและทั้งคู่ถูกนับ จำนวนเฉพาะตั้งแต่ 2 ถึง 20 คือ 2, 3, 5, 7, 11, 13, 17, 19 รวม 8 ตัว",
      en: "The outer loop starts at 2, so 1 is never counted, and the inner loop stops once d * d passes n, which is enough for a primality test. For n = 2 and 3 the inner loop never runs and both are counted. The primes from 2 to 20 are 2, 3, 5, 7, 11, 13, 17, 19, which is 8.",
    },
    answer: { kind: "choice", choices: ["7", "9", "10", "8"], correctIndex: 3 },
  },
];
