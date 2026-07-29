import type { BrainTeaserQuestion } from "../types";

/** Programmer brain teasers. Ids: bt-e-01.., bt-m-01.., bt-h-01.. */
export const brainTeaserQuestions: BrainTeaserQuestion[] = [
  {
    id: "bt-e-01",
    type: "brain-teaser",
    difficulty: "easy",
    prompt: {
      th: "ให้ n เป็นจำนวนเต็มบวก นิพจน์ n & (n - 1) มีค่าเป็น 0 ก็เมื่อ n เป็นจำนวนแบบใด",
      en: "Let n be a positive integer. The expression n & (n - 1) equals 0 exactly when n is what kind of number?",
    },
    explanation: {
      th: "กำลังของสองมีบิต 1 เพียงบิตเดียว การลบ 1 จะเปลี่ยนบิตนั้นเป็น 0 และเปลี่ยนบิตที่ต่ำกว่าทั้งหมดเป็น 1 ทำให้ไม่มีบิตใดตรงกันเลย ผล AND จึงเป็น 0 แต่ถ้า n มีบิต 1 มากกว่าหนึ่งบิต บิตสูงสุดจะไม่ถูกแตะต้องและยังคงอยู่ในผล AND",
      en: "A power of two has exactly one bit set. Subtracting 1 clears that bit and sets every lower bit, so no bit position is shared and the AND is 0. If n has two or more bits set, the highest bit is untouched by the subtraction and survives the AND.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "จำนวนคี่ทุกจำนวน", en: "every odd number" },
        { th: "จำนวนคู่ทุกจำนวน", en: "every even number" },
        { th: "กำลังของสอง (1, 2, 4, 8, ...)", en: "a power of two (1, 2, 4, 8, ...)" },
        { th: "จำนวนเฉพาะทุกจำนวน", en: "every prime number" },
      ],
      correctIndex: 2,
    },
  },
  {
    id: "bt-e-02",
    type: "brain-teaser",
    difficulty: "easy",
    prompt: {
      th: "รั้วตรงยาว 100 เมตร ปักเสาทุก ๆ 10 เมตร และปักที่ปลายทั้งสองข้างด้วย ต้องใช้เสาทั้งหมดกี่ต้น",
      en: "A straight fence is 100 metres long with a post every 10 metres, including one at each end. How many posts are needed?",
    },
    explanation: {
      th: "ช่วงว่างระหว่างเสามี 100 / 10 = 10 ช่วง แต่จำนวนเสาคือจำนวนขอบของช่วง ซึ่งมากกว่าจำนวนช่วงอยู่หนึ่งเสมอ จึงได้ 11 ต้น นี่คือปัญหา fencepost แบบเดียวกับการนับรอบลูปที่ใช้เงื่อนไข <= ",
      en: "There are 100 / 10 = 10 gaps, but posts are the gap boundaries, and boundaries always outnumber gaps by one, giving 11. This is the fencepost problem, the same off-by-one that appears when a loop uses <=.",
    },
    answer: { kind: "text", accepted: ["11", "11 posts", "11 ต้น"], placeholder: "11" },
  },
  {
    id: "bt-e-03",
    type: "brain-teaser",
    difficulty: "easy",
    language: "javascript",
    code: `let count = 0;
for (let i = 5; i <= 12; i++) {
  count++;
}
console.log(count);`,
    prompt: {
      th: "ลูปนี้ทำงานกี่รอบ (ค่า count ที่พิมพ์ออกมา)",
      en: "How many times does this loop run (the printed value of count)?",
    },
    explanation: {
      th: "ช่วงนี้เป็นแบบรวมปลายทั้งสองข้าง (5 ถึง 12) จำนวนรอบคือ 12 - 5 + 1 = 8 ถ้าเงื่อนไขเป็น i < 12 จะได้ 7 รอบ การจำว่า 'ปลายรวม บวกหนึ่ง ปลายไม่รวม ลบตรง ๆ' ช่วยกันพลาดแบบ off-by-one",
      en: "The range is inclusive on both ends (5 through 12), so the count is 12 - 5 + 1 = 8. With i < 12 it would be 7. Remember: inclusive bounds need the +1, exclusive bounds do not.",
    },
    answer: { kind: "text", accepted: ["8"], placeholder: "8" },
  },
  {
    id: "bt-e-04",
    type: "brain-teaser",
    difficulty: "easy",
    language: "javascript",
    code: `let a = 5;
let b = 9;
a ^= b;
b ^= a;
a ^= b;
console.log(a);`,
    prompt: {
      th: "โค้ดนี้คือการสลับค่าด้วย XOR ค่าของ a ที่พิมพ์ออกมาคือเท่าใด",
      en: "This is the XOR swap trick. What value of a is printed?",
    },
    explanation: {
      th: "หลังบรรทัดแรก a เก็บค่า 5^9 บรรทัดที่สอง b = 9^(5^9) = 5 เพราะ 9^9 ตัดกันเหลือ 5 บรรทัดที่สาม a = (5^9)^5 = 9 หลักการคือ XOR เป็นตัวดำเนินการที่ย้อนกลับตัวเองได้ (x^y^y = x) จึงเก็บข้อมูลของทั้งสองค่าไว้ในตัวแปรเดียวได้ชั่วคราว",
      en: "After line one a holds 5^9. Line two gives b = 9^(5^9) = 5 because 9^9 cancels. Line three gives a = (5^9)^5 = 9. XOR is its own inverse (x^y^y = x), so one variable can temporarily carry the information of both.",
    },
    answer: { kind: "text", accepted: ["9"], placeholder: "9" },
  },
  {
    id: "bt-e-05",
    type: "brain-teaser",
    difficulty: "easy",
    prompt: {
      th: "จำนวน 255 ในฐานสิบ เขียนในฐานสิบหกได้เป็นเท่าใด (ตอบเฉพาะตัวเลข ไม่ต้องใส่ 0x)",
      en: "What is decimal 255 written in hexadecimal? (digits only, no 0x prefix)",
    },
    explanation: {
      th: "255 = 11111111 ในฐานสอง ซึ่งคือแปดบิตที่เป็น 1 ทั้งหมด เลขฐานสิบหกหนึ่งหลักแทนสี่บิตพอดี จึงจับกลุ่ม 1111 1111 ได้ F และ F เป็น FF การจับกลุ่มสี่บิตนี้เป็นเหตุผลที่ฐานสิบหกใช้อ่านค่าบิตได้สะดวก",
      en: "255 is 11111111 in binary, eight set bits. One hex digit covers exactly four bits, so grouping 1111 1111 gives F and F, that is FF. This four-bit grouping is why hex is convenient for reading bit patterns.",
    },
    answer: { kind: "text", accepted: ["FF", "ff", "0xFF", "0xff"], placeholder: "FF" },
  },
  {
    id: "bt-e-06",
    type: "brain-teaser",
    difficulty: "easy",
    language: "javascript",
    code: `console.log(-7 % 3);`,
    prompt: {
      th: "ใน JavaScript นิพจน์ -7 % 3 ให้ผลลัพธ์เท่าใด",
      en: "In JavaScript, what does -7 % 3 evaluate to?",
    },
    explanation: {
      th: "ใน JavaScript ตัวดำเนินการ % คือเศษที่เหลือจากการหารแบบตัดเศษเข้าหาศูนย์ คือ -7 / 3 ได้ผลหาร -2 และเศษ -7 - (-2 * 3) = -1 เครื่องหมายของผลลัพธ์จึงตามตัวตั้ง ไม่ตามตัวหาร (ภาษาอย่าง Python ใช้การหารปัดลงจึงได้ 2 แทน)",
      en: "JavaScript % is a remainder from truncated division: -7 / 3 truncates to -2, so the remainder is -7 - (-2 * 3) = -1. The sign follows the dividend, not the divisor. Python uses floored division and would give 2 instead.",
    },
    answer: { kind: "choice", choices: ["-1", "1", "2", "-2"], correctIndex: 0 },
  },
  {
    id: "bt-e-07",
    type: "brain-teaser",
    difficulty: "easy",
    language: "javascript",
    code: `function maxOf(arr) {
  let m = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > m) m = arr[i];
  }
  return m;
}
console.log(maxOf([]));`,
    prompt: {
      th: "เมื่อเรียก maxOf ด้วยอาร์เรย์ว่าง โค้ดนี้ทำอะไร",
      en: "What does this code do when maxOf is called with an empty array?",
    },
    explanation: {
      th: "การอ่าน index ที่ไม่มีอยู่ใน JavaScript ไม่ทำให้เกิด error แต่คืนค่า undefined ดังนั้น m เป็น undefined และลูปไม่ทำงานเลยเพราะ arr.length เป็น 0 ฟังก์ชันจึงคืน undefined นี่คือเหตุผลที่ฟังก์ชันรวมค่า (aggregate) ต้องกำหนดพฤติกรรมของอินพุตว่างไว้ชัดเจน เช่นโยน error หรือคืน -Infinity",
      en: "Reading a missing index in JavaScript does not throw, it yields undefined, so m is undefined and the loop never runs because arr.length is 0. The function returns undefined. This is why aggregate functions must define empty-input behaviour explicitly, for example throwing or returning -Infinity.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "โยน error ทันทีที่อ่าน arr[0]", en: "throws an error when reading arr[0]" },
        { th: "คืนค่า undefined", en: "returns undefined" },
        { th: "คืนค่า 0", en: "returns 0" },
        { th: "คืนค่า -Infinity", en: "returns -Infinity" },
      ],
      correctIndex: 1,
    },
  },
  {
    id: "bt-e-08",
    type: "brain-teaser",
    difficulty: "easy",
    prompt: {
      th: "โปรแกรม FizzBuzz วนตัวเลข 1 ถึง 100 แบบรวมปลายทั้งสองข้าง และพิมพ์คำว่า FizzBuzz เมื่อตัวเลขหารด้วยทั้ง 3 และ 5 ลงตัว จะมีบรรทัดที่พิมพ์คำว่า FizzBuzz กี่บรรทัด",
      en: "A FizzBuzz program loops over 1 to 100 inclusive and prints FizzBuzz when the number is divisible by both 3 and 5. How many lines print FizzBuzz?",
    },
    explanation: {
      th: "หารด้วย 3 และ 5 ลงตัวพร้อมกัน หมายถึงหารด้วย ค.ร.น. คือ 15 ลงตัว จำนวนตัวคูณของ 15 ในช่วง 1..100 คือ floor(100 / 15) = 6 ได้แก่ 15, 30, 45, 60, 75, 90 (105 เกินช่วงไปแล้ว)",
      en: "Divisible by both 3 and 5 means divisible by their least common multiple, 15. The number of multiples of 15 in 1..100 is floor(100 / 15) = 6: 15, 30, 45, 60, 75 and 90. The next one, 105, is out of range.",
    },
    answer: { kind: "text", accepted: ["6"], placeholder: "6" },
  },
  {
    id: "bt-e-09",
    type: "brain-teaser",
    difficulty: "easy",
    prompt: {
      th: "ลิ้นชักมีถุงเท้าสีดำและสีขาวปนกันจำนวนมาก (มีทั้งสองสีอย่างน้อย 10 ชิ้น) หยิบในที่มืดครั้งละหนึ่งชิ้นโดยไม่เห็นสี ต้องหยิบน้อยที่สุดกี่ชิ้นเพื่อรับประกันว่าได้สีเดียวกันครบหนึ่งคู่",
      en: "A drawer holds many black and white socks mixed together (at least 10 of each colour). Picking one sock at a time in the dark, what is the minimum number of picks that guarantees a matching pair?",
    },
    explanation: {
      th: "ใช้หลักรังนกพิราบ มีช่อง (สี) แค่ 2 ช่อง เมื่อหยิบมา 3 ชิ้น ต้องมีช่องใดช่องหนึ่งได้ของอย่างน้อย 2 ชิ้น จึงได้คู่แน่นอน ส่วน 2 ชิ้นยังไม่รับประกัน เพราะกรณีร้ายสุดคือได้คนละสี",
      en: "Pigeonhole principle: there are only two holes (colours), so with three socks some colour must appear at least twice, guaranteeing a pair. Two socks are not enough because the worst case gives one of each colour.",
    },
    answer: { kind: "text", accepted: ["3", "3 socks", "3 ชิ้น"], placeholder: "3" },
  },
  {
    id: "bt-e-10",
    type: "brain-teaser",
    difficulty: "easy",
    prompt: {
      th: "ตัวแปรจำนวนเต็มไม่มีเครื่องหมาย (unsigned) ขนาด 8 บิต เก็บค่าที่ต่างกันได้ทั้งหมดกี่ค่า",
      en: "How many distinct values can an unsigned 8-bit integer hold?",
    },
    explanation: {
      th: "แต่ละบิตเลือกได้ 2 แบบ และบิตเป็นอิสระต่อกัน จำนวนรูปแบบทั้งหมดคือ 2^8 = 256 ค่า (ช่วง 0 ถึง 255) จุดที่คนมักสับสนคือค่ามากสุดเป็น 255 ไม่ใช่ 256 เพราะเริ่มนับจาก 0",
      en: "Each bit has 2 choices and the bits are independent, so there are 2^8 = 256 patterns, covering 0 through 255. The common slip is confusing the maximum value 255 with the count 256, since counting starts at 0.",
    },
    answer: { kind: "text", accepted: ["256", "2^8"], placeholder: "256" },
  },
  {
    id: "bt-e-11",
    type: "brain-teaser",
    difficulty: "easy",
    prompt: {
      th: "ใน JavaScript นิพจน์ 1 / 0 และ 0 / 0 ให้ผลลัพธ์อะไรตามลำดับ",
      en: "In JavaScript, what do the expressions 1 / 0 and 0 / 0 evaluate to, in that order?",
    },
    explanation: {
      th: "ตัวเลขใน JavaScript เป็น IEEE 754 ซึ่งนิยามค่าพิเศษไว้ การหารจำนวนไม่เป็นศูนย์ด้วยศูนย์ให้ Infinity (ทิศทางตามเครื่องหมาย) แต่ 0 / 0 ไม่มีคำตอบที่สมเหตุสมผลเพียงค่าเดียว จึงให้ NaN ต่างจากภาษาที่ใช้จำนวนเต็ม เช่น Java ที่ 1 / 0 แบบ int จะโยน ArithmeticException",
      en: "JavaScript numbers follow IEEE 754, which defines special values. Dividing a non-zero number by zero gives Infinity with the appropriate sign, while 0 / 0 has no single sensible value and gives NaN. Integer languages differ: Java integer 1 / 0 throws ArithmeticException.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "ทั้งสองโยน error เพราะหารด้วยศูนย์", en: "both throw a divide-by-zero error" },
        { th: "ทั้งสองได้ NaN", en: "both give NaN" },
        { th: "1 / 0 ได้ NaN และ 0 / 0 ได้ Infinity", en: "1 / 0 gives NaN and 0 / 0 gives Infinity" },
        { th: "1 / 0 ได้ Infinity และ 0 / 0 ได้ NaN", en: "1 / 0 gives Infinity and 0 / 0 gives NaN" },
      ],
      correctIndex: 3,
    },
  },
  {
    id: "bt-e-12",
    type: "brain-teaser",
    difficulty: "easy",
    language: "javascript",
    code: `// arr has exactly 10 elements
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]);
}`,
    prompt: {
      th: "ถ้า arr มีสมาชิก 10 ตัว ค่า index ที่มากที่สุดที่โค้ดนี้พยายามอ่านคือเท่าใด",
      en: "If arr has exactly 10 elements, what is the largest index this code tries to read?",
    },
    explanation: {
      th: "index ที่ถูกต้องคือ 0 ถึง 9 แต่เงื่อนไข i <= arr.length ยอมให้ i เดินไปถึง 10 ด้วย จึงอ่าน arr[10] ซึ่งเกินขอบเขต การนับแบบเริ่มที่ 0 ต้องใช้เงื่อนไข i < arr.length เพื่อให้จำนวนรอบเท่ากับความยาวพอดี",
      en: "Valid indices are 0 through 9, but the condition i <= arr.length lets i reach 10, so arr[10] is read, one past the end. With zero-based indexing the condition must be i < arr.length so the iteration count matches the length exactly.",
    },
    answer: { kind: "text", accepted: ["10"], placeholder: "10" },
  },
  {
    id: "bt-m-01",
    type: "brain-teaser",
    difficulty: "medium",
    prompt: {
      th: "หน้าห้องมีสวิตช์สามตัว ตัวหนึ่งควบคุมหลอดไส้ในห้องที่ปิดสนิทและมองไม่เห็นจากด้านนอก คุณกดสวิตช์ได้ตามใจและรอได้นานเท่าไรก็ได้ แต่เข้าไปในห้องเพื่อดูหลอดได้เพียงครั้งเดียว ต้องอาศัยข้อมูลใดเพิ่มจึงจะระบุสวิตช์ที่ถูกต้องได้แน่นอนทุกกรณี",
      en: "Outside a sealed room are three switches; one controls an incandescent bulb inside, which cannot be seen from outside. You may flip switches freely and wait as long as you like, but you may enter the room only once. What extra information is required to always identify the correct switch?",
    },
    explanation: {
      th: "การมองว่าหลอดสว่างหรือไม่สว่างให้ข้อมูลเพียง 2 สถานะ แต่ผู้ต้องสงสัยมี 3 ตัว จึงแยกไม่ครบ หลอดไส้ให้สถานะที่สามคือ 'ดับแต่ยังอุ่น' วิธีคือเปิดสวิตช์ A ทิ้งไว้สักพัก ปิด A แล้วเปิด B ทันทีและเข้าไปดู หลอดสว่างคือ B หลอดดับแต่อุ่นคือ A หลอดดับและเย็นคือ C ครบ 3 สถานะพอดี",
      en: "Seeing the bulb lit or unlit gives only 2 states while there are 3 candidates, so it cannot separate them. An incandescent bulb supplies a third state: off but still warm. Turn on A for a while, switch A off and B on, then enter. Lit means B, warm means A, cold and off means C, matching 3 states to 3 candidates.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "จำนวนครั้งที่กดสวิตช์แต่ละตัว", en: "how many times each switch was flipped" },
        { th: "เสียงคลิกของสวิตช์ขณะกด", en: "the clicking sound of the switches" },
        { th: "ความร้อนของหลอดไฟเมื่อเข้าไปสัมผัส", en: "the heat of the bulb when you touch it" },
        { th: "ไม่ต้องใช้อะไรเพิ่ม ดูแค่สว่างหรือไม่สว่างก็เพียงพอ", en: "nothing extra, lit or unlit is already enough" },
      ],
      correctIndex: 2,
    },
  },
  {
    id: "bt-m-02",
    type: "brain-teaser",
    difficulty: "medium",
    prompt: {
      th: "ลิฟต์วิ่งด้วยความเร็วคงที่และไม่หยุดพักที่ชั้นใด จากชั้น 1 ถึงชั้น 4 ใช้เวลา 12 วินาที จากชั้น 1 ถึงชั้น 7 ใช้เวลากี่วินาที",
      en: "An elevator moves at constant speed and makes no intermediate stops. Going from floor 1 to floor 4 takes 12 seconds. How many seconds does it take from floor 1 to floor 7?",
    },
    explanation: {
      th: "เวลาขึ้นอยู่กับจำนวนช่วงระหว่างชั้น ไม่ใช่หมายเลขชั้น จากชั้น 1 ถึง 4 มี 3 ช่วง จึงใช้ 12 / 3 = 4 วินาทีต่อช่วง จากชั้น 1 ถึง 7 มี 6 ช่วง ได้ 6 * 4 = 24 วินาที ถ้าเผลอคิดแบบสัดส่วนตรงจากหมายเลขชั้นจะได้ 21 ซึ่งเป็นกับดัก fencepost",
      en: "Travel time depends on the number of gaps between floors, not the floor numbers. Floor 1 to 4 spans 3 gaps, so 12 / 3 = 4 seconds per gap. Floor 1 to 7 spans 6 gaps, giving 6 * 4 = 24 seconds. Scaling the floor numbers directly gives the fencepost trap answer of 21.",
    },
    answer: { kind: "text", accepted: ["24", "24s", "24 sec", "24 วินาที"], placeholder: "24" },
  },
  {
    id: "bt-m-03",
    type: "brain-teaser",
    difficulty: "medium",
    prompt: {
      th: "ในช่วงจำนวนเต็ม 17 ถึง 143 แบบรวมปลายทั้งสองข้าง มีจำนวนที่หารด้วย 7 ลงตัวกี่จำนวน",
      en: "How many integers in the inclusive range 17 to 143 are divisible by 7?",
    },
    explanation: {
      th: "นับด้วยการลบช่วง floor(143 / 7) = 20 คือจำนวนตัวคูณของ 7 ตั้งแต่ 1 ถึง 143 และ floor(16 / 7) = 2 คือตัวคูณที่อยู่ก่อนช่วง (ใช้ 16 เพราะขอบล่าง 17 ต้องถูกนับรวม) ผลต่างคือ 20 - 2 = 18 ตรวจได้ว่าเป็น 7*3 = 21 ถึง 7*20 = 140 นับได้ 20 - 3 + 1 = 18",
      en: "Count by subtraction: floor(143 / 7) = 20 multiples of 7 up to 143, minus floor(16 / 7) = 2 multiples below the range (16 because the lower bound 17 must be included), giving 20 - 2 = 18. Check directly: 7*3 = 21 up to 7*20 = 140, that is 20 - 3 + 1 = 18 values.",
    },
    answer: { kind: "text", accepted: ["18"], placeholder: "18" },
  },
  {
    id: "bt-m-04",
    type: "brain-teaser",
    difficulty: "medium",
    prompt: {
      th: "จากชุดเลข 1, 2, 3, 4, 5 มีเลขหนึ่งตัวหายไป เหลือเป็น 1, 2, 4, 5 ถ้านำสมาชิกที่เหลือทั้งสี่ตัวมา XOR กัน แล้ว XOR ต่อด้วยเลข 1, 2, 3, 4, 5 ทุกตัว ผลลัพธ์สุดท้ายเป็นเท่าใด",
      en: "One number is missing from the set 1, 2, 3, 4, 5, leaving 1, 2, 4, 5. If you XOR the four remaining values together and then XOR that with every number from 1 to 5, what is the final result?",
    },
    explanation: {
      th: "XOR มีสมบัติ x^x = 0 และสลับที่ได้ ดังนั้นทุกเลขที่ปรากฏสองครั้ง (คือเลขที่อยู่ทั้งในชุดที่เหลือและในชุดเต็ม) จะหักกันหมด เหลือเฉพาะเลขที่ปรากฏครั้งเดียว คือเลขที่หายไป จึงได้ 3 นี่คือเหตุผลที่ใช้ XOR หาสมาชิกที่หายไปได้โดยไม่ต้องใช้หน่วยความจำเพิ่ม",
      en: "XOR satisfies x^x = 0 and is commutative, so every value appearing twice (present in both the remaining set and the full set) cancels out, leaving only the value that appears once: the missing number, 3. This is why XOR finds a missing element with no extra memory.",
    },
    answer: { kind: "text", accepted: ["3"], placeholder: "3" },
  },
  {
    id: "bt-m-05",
    type: "brain-teaser",
    difficulty: "medium",
    language: "java",
    code: `int low = 1500000000;
int high = 2000000000;
int mid = (low + high) / 2;
System.out.println(mid);`,
    prompt: {
      th: "โค้ด Java นี้ใช้ int ขนาด 32 บิต บรรทัดที่คำนวณ mid มีบั๊กเชิงตรรกะอะไร (ไม่ใช่ error ตอนคอมไพล์)",
      en: "This Java code uses 32-bit int. What is the logical bug in the line computing mid (not a compile error)?",
    },
    explanation: {
      th: "int เก็บค่าได้สูงสุด 2147483647 แต่ low + high = 3500000000 ซึ่งเกินไป Java ไม่โยน exception เมื่อ int ล้น แต่จะตัดค่าเป็นแบบ two's complement ทำให้ผลบวกกลายเป็นค่าลบ mid จึงเป็นลบและใช้เป็น index ไม่ได้ วิธีแก้คือเขียน low + (high - low) / 2 ซึ่งไม่มีผลบวกที่โตเกินช่วง",
      en: "An int holds at most 2147483647, but low + high = 3500000000 exceeds that. Java does not throw on int overflow, it wraps in two's complement, so the sum becomes negative and mid is negative, unusable as an index. The fix is low + (high - low) / 2, which never forms an out-of-range sum.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "ไม่มีบั๊ก mid ได้ค่ากลางที่ถูกต้องอยู่แล้ว", en: "no bug, mid gets the correct midpoint" },
        { th: "การหารจำนวนเต็มปัดลง ทำให้ mid น้อยกว่าค่ากลางหนึ่งเสมอ", en: "integer division rounds down, so mid is always one below the true midpoint" },
        { th: "เกิด ArithmeticException เพราะผลบวกเกินช่วงของ int", en: "an ArithmeticException is thrown because the sum exceeds int range" },
        { th: "low + high ล้นช่วงของ int กลายเป็นค่าลบ ทำให้ mid เป็นค่าลบ", en: "low + high overflows int and wraps negative, so mid becomes negative" },
      ],
      correctIndex: 3,
    },
  },
  {
    id: "bt-m-06",
    type: "brain-teaser",
    difficulty: "medium",
    language: "javascript",
    code: `let i = 0;
while (i !== 10) {
  i += 3;
}`,
    prompt: {
      th: "ลูปนี้ไม่มีวันจบ เพราะเหตุใด",
      en: "This loop never terminates. Why?",
    },
    explanation: {
      th: "ค่าคงตัวประจำลูป (invariant) คือ i หารด้วย 3 ลงตัวเสมอ เพราะเริ่มที่ 0 และเพิ่มทีละ 3 ค่าที่ i รับได้จึงเป็น 0, 3, 6, 9, 12, ... แต่ 10 ไม่หารด้วย 3 ลงตัว เงื่อนไข i !== 10 จึงเป็นจริงตลอดไป บทเรียนคือควรใช้เงื่อนไขแบบอสมการ เช่น i < 10 เมื่อ step ไม่ได้หารค่าเป้าหมายลงตัว",
      en: "The loop invariant is that i stays a multiple of 3, since it starts at 0 and grows by 3: 0, 3, 6, 9, 12 and so on. Ten is not a multiple of 3, so i !== 10 is true forever. The lesson is to use an inequality such as i < 10 whenever the step does not divide the target exactly.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "เพราะ i ไม่ถูกเปลี่ยนค่าภายในลูป", en: "because i is never modified inside the loop" },
        { th: "เพราะ i รับได้เฉพาะตัวคูณของ 3 จึงข้ามค่า 10 ไป (จาก 9 เป็น 12)", en: "because i only takes multiples of 3, jumping over 10 (from 9 to 12)" },
        { th: "เพราะ !== เทียบชนิดข้อมูลด้วย จึงเป็นจริงเสมอ", en: "because !== also compares types and is therefore always true" },
        { th: "เพราะ i ล้นค่าตัวเลขจนกลับมาเป็นค่าลบ", en: "because i overflows and wraps to a negative value" },
      ],
      correctIndex: 1,
    },
  },
  {
    id: "bt-m-07",
    type: "brain-teaser",
    difficulty: "medium",
    prompt: {
      th: "ใน JavaScript ต้องการดัชนีแบบวนรอบให้ได้ผลอยู่ในช่วง 0 ถึง n-1 เสมอ แม้ a จะเป็นจำนวนลบ (n เป็นจำนวนเต็มบวก) นิพจน์ใดถูกต้องสำหรับทุกค่า a ที่เป็นจำนวนเต็ม",
      en: "In JavaScript you want a wrap-around index that always lands in 0 to n-1, even when a is negative (n is a positive integer). Which expression is correct for every integer a?",
    },
    explanation: {
      th: "a % n ใน JavaScript อาจได้ค่าลบเมื่อ a เป็นลบ แต่ขนาดของมันน้อยกว่า n เสมอ การบวก n หนึ่งครั้งจึงดันให้เป็นค่าไม่ติดลบแน่นอน แล้ว % n อีกครั้งเพื่อลดกรณีที่ค่าเดิมไม่ติดลบอยู่แล้วให้กลับเข้าช่วง ส่วน (a + n) % n ใช้ไม่ได้ทั่วไป เพราะถ้า a <= -n ผลยังติดลบ",
      en: "In JavaScript a % n can be negative when a is negative, but its magnitude is always less than n, so adding n once guarantees a non-negative value; the second % n brings already-non-negative cases back into range. (a + n) % n fails in general because for a <= -n the result is still negative.",
    },
    answer: {
      kind: "choice",
      choices: ["a % n", "-(a % n)", "((a % n) + n) % n", "(a + n) % n"],
      correctIndex: 2,
    },
  },
  {
    id: "bt-m-08",
    type: "brain-teaser",
    difficulty: "medium",
    prompt: {
      th: "มีขวดยา 10 ขวด ติดฉลากหมายเลข 1 ถึง 10 และมียาในแต่ละขวดมากพอ ยาปกติหนักเม็ดละ 1.0 กรัม แต่มีขวดเสียอยู่หนึ่งขวดที่ยาหนักเม็ดละ 1.1 กรัม ใช้เครื่องชั่งดิจิทัลที่อ่านน้ำหนักได้ละเอียด ต้องชั่งน้อยที่สุดกี่ครั้งเพื่อระบุขวดเสียได้แน่นอน",
      en: "There are 10 pill bottles labelled 1 to 10, each with plenty of pills. Normal pills weigh 1.0 g each, but one bad bottle has pills of 1.1 g. Using a digital scale that reads exact weights, what is the minimum number of weighings needed to identify the bad bottle for certain?",
    },
    explanation: {
      th: "ชั่งครั้งเดียวพอ โดยหยิบยาจากขวดหมายเลข k มา k เม็ด รวม 1+2+...+10 = 55 เม็ด ถ้าทุกเม็ดปกติจะหนัก 55.0 กรัม น้ำหนักส่วนเกินจะเท่ากับ 0.1 คูณจำนวนเม็ดจากขวดเสีย นั่นคือ 0.1k พอดี เช่นเกิน 0.7 กรัมแปลว่าขวดที่ 7 เสีย เพราะแต่ละขวดให้ส่วนเกินที่ต่างกันไม่ซ้ำ การชั่งครั้งเดียวจึงเข้ารหัสหมายเลขขวดไว้ในน้ำหนักได้",
      en: "One weighing suffices: take k pills from bottle k, for 1+2+...+10 = 55 pills weighing 55.0 g if all were normal. The excess is 0.1 times the number of pills from the bad bottle, exactly 0.1k, so an excess of 0.7 g means bottle 7. Each bottle produces a distinct excess, so a single weighing encodes the bottle number in the weight.",
    },
    answer: { kind: "text", accepted: ["1", "1 time", "1 ครั้ง", "one"], placeholder: "1" },
  },
  {
    id: "bt-m-09",
    type: "brain-teaser",
    difficulty: "medium",
    prompt: {
      th: "FizzBuzz มาตรฐานวนเลข 1 ถึง 100 แบบรวมปลาย พิมพ์ Fizz เมื่อหารด้วย 3 ลงตัว พิมพ์ Buzz เมื่อหารด้วย 5 ลงตัว พิมพ์ FizzBuzz เมื่อหารลงตัวทั้งคู่ นอกนั้นพิมพ์ตัวเลขเอง มีกี่บรรทัดที่พิมพ์เป็นตัวเลข",
      en: "Standard FizzBuzz loops over 1 to 100 inclusive: Fizz for multiples of 3, Buzz for multiples of 5, FizzBuzz for multiples of both, otherwise the number itself. How many lines print a number?",
    },
    explanation: {
      th: "ใช้หลักการรวม-ตัดออก ตัวคูณของ 3 มี floor(100/3) = 33 ตัวคูณของ 5 มี floor(100/5) = 20 แต่ตัวคูณของ 15 ถูกนับซ้ำสองรอบ มี floor(100/15) = 6 จึงมีเลขที่ถูกแทนด้วยคำ 33 + 20 - 6 = 47 ตัว เหลือพิมพ์เป็นตัวเลข 100 - 47 = 53 บรรทัด",
      en: "Use inclusion-exclusion: floor(100/3) = 33 multiples of 3 and floor(100/5) = 20 multiples of 5, but the floor(100/15) = 6 multiples of 15 are counted twice. So 33 + 20 - 6 = 47 lines print words, leaving 100 - 47 = 53 numeric lines.",
    },
    answer: { kind: "text", accepted: ["53"], placeholder: "53" },
  },
  {
    id: "bt-m-10",
    type: "brain-teaser",
    difficulty: "medium",
    language: "java",
    code: `static boolean isSorted(int[] a) {
    for (int i = 0; i < a.length; i++) {
        if (a[i] > a[i + 1]) return false;
    }
    return true;
}`,
    prompt: {
      th: "เรียก isSorted ด้วยอาร์เรย์ที่มีสมาชิกเพียงตัวเดียว เช่น {7} ผลที่เกิดขึ้นใน Java คืออะไร",
      en: "What happens in Java when isSorted is called with a single-element array such as {7}?",
    },
    explanation: {
      th: "ลูปที่เทียบสมาชิกเป็นคู่ต้องหยุดที่ i < a.length - 1 เพราะรอบสุดท้ายต้องมี a[i+1] ให้อ่าน เมื่อ a มีตัวเดียว a.length เป็น 1 ลูปยังทำงานที่ i = 0 แล้วอ่าน a[1] ซึ่งไม่มีอยู่ Java ตรวจขอบเขตอาร์เรย์จริงจึงโยน ArrayIndexOutOfBoundsException (ต่างจาก JavaScript ที่ได้ undefined แล้วเงียบ ๆ ผ่านไป)",
      en: "A loop comparing adjacent pairs must stop at i < a.length - 1 because the last iteration needs a[i+1] to exist. With one element a.length is 1, so i = 0 still runs and reads a[1], which does not exist. Java checks array bounds and throws ArrayIndexOutOfBoundsException, unlike JavaScript where the read silently yields undefined.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "เกิด ArrayIndexOutOfBoundsException เพราะอ่าน a[1]", en: "an ArrayIndexOutOfBoundsException, because a[1] is read" },
        { th: "คืนค่า true เพราะลูปไม่ทำงานเลย", en: "returns true because the loop body never runs" },
        { th: "คืนค่า false เพราะเทียบ 7 กับ 0", en: "returns false because 7 is compared with 0" },
        { th: "คอมไพล์ไม่ผ่านเพราะ index เกินขอบเขต", en: "it fails to compile because the index is out of bounds" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "bt-m-11",
    type: "brain-teaser",
    difficulty: "medium",
    prompt: {
      th: "ในห้องมีคน 23 คน สมมติวันเกิดสุ่มกระจายสม่ำเสมอใน 365 วันและเป็นอิสระต่อกัน ความน่าจะเป็นที่จะมีคนอย่างน้อยหนึ่งคู่ที่วันเกิดตรงกัน ใกล้เคียงค่าใดที่สุด",
      en: "A room holds 23 people with birthdays assumed independent and uniform over 365 days. The probability that at least one pair shares a birthday is closest to which value?",
    },
    explanation: {
      th: "สัญชาตญาณผิดเพราะเราเผลอเทียบ 23 กับ 365 แต่เหตุการณ์ที่นับคือคู่ ไม่ใช่คน จำนวนคู่คือ C(23,2) = 253 คู่ แต่ละคู่มีโอกาสตรงกัน 1/365 คำนวณจริงด้วยส่วนเติมเต็ม 1 - (365/365)(364/365)...(343/365) ได้ราว 0.507 คือประมาณ 50%",
      en: "Intuition fails because we compare 23 against 365, but the events counted are pairs, not people: C(23,2) = 253 pairs, each matching with chance 1/365. Computing the complement 1 - (365/365)(364/365)...(343/365) gives about 0.507, roughly 50%.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "ประมาณ 6%", en: "about 6%" },
        { th: "ประมาณ 50%", en: "about 50%" },
        { th: "ประมาณ 23%", en: "about 23%" },
        { th: "มากกว่า 99%", en: "more than 99%" },
      ],
      correctIndex: 1,
    },
  },
  {
    id: "bt-m-12",
    type: "brain-teaser",
    difficulty: "medium",
    prompt: {
      th: "ระบบแบ่งหน้าแสดงรายการละ 10 รายการต่อหน้า มีข้อมูลทั้งหมด 95 รายการ ต้องมีหน้าทั้งหมดกี่หน้าจึงแสดงข้อมูลได้ครบ",
      en: "A pagination system shows 10 items per page and there are 95 items in total. How many pages are needed to show every item?",
    },
    explanation: {
      th: "การหารจำนวนเต็ม 95 / 10 ได้ 9 ซึ่งทิ้งเศษ 5 รายการสุดท้ายไป จำนวนหน้าต้องใช้การปัดขึ้น ceil(95 / 10) = 10 หน้า โดยหน้าสุดท้ายมีแค่ 5 รายการ สูตรที่ใช้ได้กับจำนวนเต็มคือ (95 + 10 - 1) / 10 ซึ่งเทียบเท่าการปัดขึ้น",
      en: "Integer division 95 / 10 gives 9 and drops the leftover 5 items. Page count needs ceiling: ceil(95 / 10) = 10 pages, with the last page holding only 5 items. The integer-safe form is (95 + 10 - 1) / 10, which is equivalent to rounding up.",
    },
    answer: { kind: "text", accepted: ["10", "10 pages", "10 หน้า"], placeholder: "10" },
  },
  {
    id: "bt-h-01",
    type: "brain-teaser",
    difficulty: "hard",
    prompt: {
      th: "เกมมีประตูสามบาน หลังประตูหนึ่งบานมีรางวัล อีกสองบานว่าง คุณเลือกหนึ่งบาน พิธีกรผู้รู้ว่ารางวัลอยู่บานใด จะเปิดประตูว่างหนึ่งบานที่ไม่ใช่บานที่คุณเลือกเสมอ แล้วให้คุณเปลี่ยนใจได้ ถ้าคุณเปลี่ยนไปเลือกบานที่เหลือ ความน่าจะเป็นที่จะได้รางวัลเป็นเท่าใด",
      en: "Three doors hide one prize and two empties. You pick a door; the host, who knows where the prize is, always opens an empty door that you did not pick, then offers a switch. If you switch to the remaining door, what is your probability of winning?",
    },
    explanation: {
      th: "แบ่งกรณีจากการเลือกครั้งแรก ซึ่งถูกด้วยความน่าจะเป็น 1/3 และผิดด้วยความน่าจะเป็น 2/3 ถ้าเลือกครั้งแรกผิด (2/3) ประตูว่างอีกบานถูกพิธีกรเปิดทิ้งไปแล้ว บานที่เหลือจึงต้องเป็นรางวัล การเปลี่ยนใจจึงชนะทุกครั้งในกรณีนี้ ส่วนกรณีเลือกถูกตั้งแต่แรก (1/3) การเปลี่ยนใจจะแพ้ สรุปว่าเปลี่ยนใจชนะด้วยความน่าจะเป็น 2/3 กุญแจสำคัญคือพิธีกรรู้คำตอบ การเปิดประตูจึงไม่ใช่การสุ่ม",
      en: "Split on the first pick: correct with probability 1/3, wrong with probability 2/3. When the first pick is wrong (2/3), the other empty door is the one the host removed, so the remaining door must hold the prize and switching always wins. When the first pick is right (1/3), switching loses. Hence switching wins with probability 2/3. The key is that the host knows the answer, so the reveal is not random.",
    },
    answer: { kind: "choice", choices: ["1/2", "2/3", "1/3", "3/4"], correctIndex: 1 },
  },
  {
    id: "bt-h-02",
    type: "brain-teaser",
    difficulty: "hard",
    prompt: {
      th: "ตึกมี 100 ชั้น มีไข่เหมือนกัน 2 ฟอง ไข่จะแตกเมื่อทิ้งจากชั้นที่สูงกว่าชั้นวิกฤต F และไม่แตกเมื่อทิ้งจากชั้น F หรือต่ำกว่า ไข่ที่ยังไม่แตกใช้ซ้ำได้ ต้องการหาค่า F ให้แน่นอน ในกรณีแย่ที่สุดต้องทิ้งไข่น้อยที่สุดกี่ครั้ง",
      en: "A building has 100 floors and you have 2 identical eggs. An egg breaks if dropped from any floor above the critical floor F and survives at F or below; unbroken eggs can be reused. To determine F for certain, what is the minimum number of drops in the worst case?",
    },
    explanation: {
      th: "ให้คำตอบคือ n ครั้ง ไข่ฟองแรกควรทิ้งที่ชั้น n แล้วถ้าไม่แตกก็ขึ้นไปอีก n-1 ชั้น จากนั้น n-2 ชั้น ไปเรื่อย ๆ เพราะทุกครั้งที่ทิ้งไปแล้วหนึ่งครั้ง งบที่เหลือสำหรับไข่ฟองที่สองจะลดลงหนึ่ง การไล่แบบนี้ครอบคลุมได้ n + (n-1) + ... + 1 = n(n+1)/2 ชั้น ต้องการให้ >= 100 จึงได้ n = 14 เพราะ 13*14/2 = 91 ไม่พอ แต่ 14*15/2 = 105 พอ",
      en: "If the answer is n drops, the first egg should start at floor n, then step up n-1 floors, then n-2, and so on, because each drop already used shrinks the budget left for the second egg by one. That schedule covers n + (n-1) + ... + 1 = n(n+1)/2 floors, and we need it to reach 100: 13*14/2 = 91 is not enough while 14*15/2 = 105 is, so n = 14.",
    },
    answer: { kind: "text", accepted: ["14", "14 drops", "14 ครั้ง"], placeholder: "14" },
  },
  {
    id: "bt-h-03",
    type: "brain-teaser",
    difficulty: "hard",
    prompt: {
      th: "คนสี่คนต้องข้ามสะพานในเวลากลางคืน แต่ละคนใช้เวลาข้าม 1, 2, 5 และ 10 นาที มีไฟฉายดวงเดียวและต้องถือไฟฉายทุกครั้งที่ข้าม สะพานรับได้ครั้งละไม่เกินสองคน และเมื่อข้ามคู่กันต้องใช้เวลาของคนที่ช้ากว่า เวลารวมน้อยที่สุดที่ทุกคนข้ามครบคือกี่นาที",
      en: "Four people must cross a bridge at night, needing 1, 2, 5 and 10 minutes. There is one torch which must be carried on every crossing, at most two people cross at a time, and a pair moves at the slower person's pace. What is the minimum total time for everyone to cross?",
    },
    explanation: {
      th: "แนวคิดคือจับคนช้าสองคน (5 และ 10) ข้ามไปพร้อมกัน เพื่อให้เวลา 10 นาทีกลืนเวลา 5 นาทีไปในตัว แผนคือ 1+2 ข้ามไป (2 นาที) ให้ 1 ถือไฟกลับ (1) แล้ว 5+10 ข้ามไป (10) ให้ 2 ถือไฟกลับ (2) สุดท้าย 1+2 ข้ามไป (2) รวม 2+1+10+2+2 = 17 นาที ถ้าใช้วิธีให้คนเร็วสุดพาไปทีละคนจะได้ 1+10+1+5+1+2 = 20 นาที ซึ่งแย่กว่า เพราะเวลาของคนช้าถูกจ่ายแยกกันสองรอบ",
      en: "The idea is to pair the two slow people (5 and 10) so the 10 absorbs the 5. Plan: 1+2 cross (2), 1 returns (1), 5+10 cross (10), 2 returns (2), 1+2 cross (2), total 2+1+10+2+2 = 17. Shuttling with the fastest person gives 1+10+1+5+1+2 = 20, worse, because the two slow times are paid on separate trips.",
    },
    answer: { kind: "text", accepted: ["17", "17 minutes", "17 นาที"], placeholder: "17" },
  },
  {
    id: "bt-h-04",
    type: "brain-teaser",
    difficulty: "hard",
    prompt: {
      th: "นักโทษ 100 คนยืนเรียงแถวเดียว แต่ละคนถูกสวมหมวกสีดำหรือขาว มองเห็นเฉพาะหมวกของคนที่อยู่ข้างหน้าทั้งหมด แต่ไม่เห็นของตัวเอง เริ่มถามจากคนที่อยู่ท้ายแถวไปหาหน้าแถว แต่ละคนต้องทายสีหมวกของตัวเองด้วยคำว่าดำหรือขาวเท่านั้น และทุกคนได้ยินคำทายก่อนหน้าทั้งหมด ถ้าตกลงกลยุทธ์กันไว้ล่วงหน้าได้ จะรับประกันว่ารอด (ทายถูก) ได้อย่างน้อยกี่คน",
      en: "One hundred prisoners stand in a line, each wearing a black or white hat, able to see all hats in front but not their own. They are questioned from the back of the line forward, each saying only black or white, and everyone hears all earlier answers. With a strategy agreed in advance, how many prisoners can be guaranteed to answer correctly?",
    },
    explanation: {
      th: "ใช้พาริตี (parity) เป็นค่าคงตัวที่ส่งต่อกันได้ คนท้ายแถวนับหมวกดำที่เห็นทั้ง 99 ใบ แล้วทายว่า ดำ ถ้าจำนวนเป็นคู่ และ ขาว ถ้าเป็นคี่ เขาอาจผิดได้จึงไม่รับประกัน แต่จากนั้นทุกคนรู้พาริตีเริ่มต้น และเมื่อฟังคำทายของคนที่อยู่หลังตัวเองทั้งหมดก็อัปเดตพาริตีที่เหลือได้ ทำให้อนุมานสีหมวกตัวเองได้แน่นอนทีละคน จึงรับประกัน 99 คน (คนท้ายแถวมีโอกาสรอดครึ่งหนึ่ง แต่ไม่นับเป็นการรับประกัน)",
      en: "Parity is the invariant that gets passed along. The last prisoner counts the 99 black hats he sees and says black if that count is even, white if odd. He may be wrong, so he is not guaranteed. Everyone else now knows the initial parity and, by tracking all answers behind them, can update the remaining parity and deduce their own hat with certainty. That guarantees 99, with the last prisoner surviving only by chance.",
    },
    answer: { kind: "text", accepted: ["99", "99 คน", "99 prisoners"], placeholder: "99" },
  },
  {
    id: "bt-h-05",
    type: "brain-teaser",
    difficulty: "hard",
    prompt: {
      th: "มีเหรียญ 12 เหรียญ หน้าตาเหมือนกันหมด มีหนึ่งเหรียญปลอมที่น้ำหนักต่างจากเหรียญจริง แต่ไม่รู้ว่าหนักกว่าหรือเบากว่า ใช้ตราชั่งสองแขนที่บอกได้แค่ว่าข้างไหนหนักกว่าหรือเท่ากัน ในกรณีแย่ที่สุดต้องชั่งน้อยที่สุดกี่ครั้งจึงระบุเหรียญปลอมได้แน่นอน",
      en: "Twelve identical-looking coins include one counterfeit of different weight, but you do not know whether it is heavier or lighter. Using a balance scale that only reports which side is heavier or that both are equal, what is the minimum number of weighings that identifies the counterfeit in the worst case?",
    },
    explanation: {
      th: "การชั่งแต่ละครั้งให้ผลได้ 3 แบบ (ซ้ายหนัก ขวาหนัก เท่ากัน) ดังนั้นการชั่ง k ครั้งแยกกรณีได้ไม่เกิน 3^k กรณี ที่นี่กรณีที่ต้องแยกคือ 12 เหรียญ คูณกับความเป็นไปได้ว่าหนักหรือเบา ได้ 24 กรณี ซึ่ง 3^2 = 9 ไม่พอ แต่ 3^3 = 27 พอ และมีแผนจริงที่ทำได้ใน 3 ครั้ง เช่นเริ่มชั่ง 4 ต่อ 4 แล้วแบ่งกรณีต่อ จึงตอบ 3",
      en: "Each weighing has 3 outcomes (left heavy, right heavy, balanced), so k weighings distinguish at most 3^k cases. Here the cases are 12 coins times heavy-or-light, that is 24, and 3^2 = 9 is too few while 3^3 = 27 suffices. A concrete 3-weighing plan exists, starting with 4 against 4, so the answer is 3.",
    },
    answer: { kind: "text", accepted: ["3", "3 weighings", "3 ครั้ง"], placeholder: "3" },
  },
  {
    id: "bt-h-06",
    type: "brain-teaser",
    difficulty: "hard",
    prompt: {
      th: "หลอดไฟ 100 ดวงเรียงหมายเลข 1 ถึง 100 ตอนเริ่มดับทั้งหมด มีคน 100 คน คนที่ k จะสลับสถานะ (เปิดเป็นปิด ปิดเป็นเปิด) ของหลอดทุกดวงที่หมายเลขเป็นตัวคูณของ k โดยทำครบทุกคนตั้งแต่ k = 1 ถึง 100 สุดท้ายมีหลอดติดอยู่กี่ดวง",
      en: "One hundred bulbs numbered 1 to 100 all start off. Person k toggles every bulb whose number is a multiple of k, and this happens for every k from 1 to 100. How many bulbs are lit at the end?",
    },
    explanation: {
      th: "หลอดหมายเลข n ถูกสลับหนึ่งครั้งต่อหนึ่งตัวหารของ n ดังนั้นสถานะสุดท้ายขึ้นกับพาริตีของจำนวนตัวหาร ตัวหารมักจับคู่กันเป็น d กับ n/d ทำให้จำนวนตัวหารเป็นคู่ ยกเว้นเมื่อ d = n/d คือ n เป็นกำลังสองสมบูรณ์ ซึ่งจะมีตัวหารเป็นจำนวนคี่ หลอดที่ติดจึงเป็นหมายเลขกำลังสองสมบูรณ์ 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 รวม 10 ดวง",
      en: "Bulb n is toggled once per divisor of n, so its final state depends on the parity of its divisor count. Divisors normally pair up as d with n/d, giving an even count, except when d = n/d, that is when n is a perfect square, which yields an odd count. The lit bulbs are the perfect squares 1, 4, 9, 16, 25, 36, 49, 64, 81 and 100: 10 bulbs.",
    },
    answer: { kind: "text", accepted: ["10", "10 bulbs", "10 ดวง"], placeholder: "10" },
  },
  {
    id: "bt-h-07",
    type: "brain-teaser",
    difficulty: "hard",
    language: "javascript",
    code: `function swap(arr, i, j) {
  arr[i] ^= arr[j];
  arr[j] ^= arr[i];
  arr[i] ^= arr[j];
}
const arr = [4, 9];
swap(arr, 0, 0);
console.log(arr.join(","));`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "การสลับด้วย XOR อาศัยว่าตัวแปรสองตัวเป็นที่เก็บข้อมูลแยกกัน จึงยังคงข้อมูลของทั้งคู่ไว้ได้ในรูป a^b แต่เมื่อ i เท่ากับ j ทั้งสองอ้างช่องเดียวกัน บรรทัดแรกกลายเป็น arr[0] ^= arr[0] ซึ่งได้ 0 และข้อมูลเดิมหายไปทันที บรรทัดถัดไปทำงานกับ 0 ต่อจนได้ 0 ผลจึงเป็น 0,9 นี่คือบั๊กเชิงตรรกะที่ไม่มี syntax error และมักโผล่ในโค้ดเรียงลำดับที่บางครั้งเรียก swap ด้วย index เดียวกัน",
      en: "XOR swap relies on two distinct storage locations, which lets a^b hold the information of both. When i equals j they alias the same slot, so the first line becomes arr[0] ^= arr[0], which is 0, destroying the original value immediately; the remaining lines just keep 0. The output is 0,9. This is a logical bug with no syntax error, and it shows up in sorting code that occasionally calls swap with equal indices.",
    },
    answer: { kind: "choice", choices: ["4,9", "9,4", "0,9", "0,0"], correctIndex: 2 },
  },
  {
    id: "bt-h-08",
    type: "brain-teaser",
    difficulty: "hard",
    language: "javascript",
    code: `let x = 0;
while (x !== 1) {
  x += 0.1;
}`,
    prompt: {
      th: "ลูปนี้ไม่มีวันจบใน JavaScript เพราะเหตุใด",
      en: "Why does this loop never terminate in JavaScript?",
    },
    explanation: {
      th: "0.1 ไม่สามารถแทนค่าได้พอดีในเลขทศนิยมฐานสองแบบ IEEE 754 การบวกซ้ำจึงสะสมความคลาดเคลื่อน หลังบวกสิบครั้ง x เป็น 0.9999999999999999 ไม่ใช่ 1 และครั้งถัดไปกลายเป็นราว 1.0999999999999999 คือกระโดดข้าม 1 ไปแล้ว เงื่อนไข x !== 1 จึงเป็นจริงตลอด วิธีที่ปลอดภัยคือใช้ตัวนับจำนวนเต็มแล้วคูณ 0.1 หรือใช้เงื่อนไขแบบ x < 1 หรือเทียบด้วย epsilon",
      en: "0.1 has no exact IEEE 754 binary representation, so repeated addition accumulates error: after ten additions x is 0.9999999999999999, not 1, and the next step jumps to about 1.0999999999999999, skipping past 1 entirely. The condition x !== 1 therefore stays true forever. Safer options are an integer counter multiplied by 0.1, a x < 1 condition, or an epsilon comparison.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "0.1 แทนค่าแบบไบนารีไม่ลงตัว ค่าสะสมจึงไม่เท่ากับ 1 พอดีและกระโดดข้าม 1 ไป", en: "0.1 is not exactly representable in binary, so the running sum never equals 1 and jumps past it" },
        { th: "x เป็นจำนวนเต็มจึงถูกปัดเป็น 0 ทุกครั้งที่บวก", en: "x is an integer so every addition is rounded back to 0" },
        { th: "ตัวดำเนินการ !== ใช้เทียบตัวเลขไม่ได้ ต้องใช้ != เท่านั้น", en: "the !== operator cannot compare numbers, only != works" },
        { th: "x += 0.1 ไม่เปลี่ยนค่าของ x เพราะเป็นนิพจน์ที่ไม่มีผลข้างเคียง", en: "x += 0.1 does not change x because it has no side effect" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "bt-h-09",
    type: "brain-teaser",
    difficulty: "hard",
    language: "java",
    code: `System.out.println(Math.abs(Integer.MIN_VALUE));`,
    prompt: {
      th: "โค้ด Java นี้พิมพ์ค่าอะไรออกมา",
      en: "What does this Java code print?",
    },
    explanation: {
      th: "ช่วงของ int แบบ two's complement คือ -2147483648 ถึง 2147483647 ซึ่งไม่สมมาตร มีค่าลบมากกว่าค่าบวกอยู่หนึ่งค่า ดังนั้นค่าตรงข้ามของ MIN_VALUE คือ 2147483648 ซึ่งเก็บใน int ไม่ได้ Math.abs จึงล้นกลับมาเป็นค่าเดิม -2147483648 โดยไม่โยน exception เป็นเหตุผลที่โค้ดซึ่งสมมติว่า abs ให้ค่าไม่ติดลบเสมออาจพลาดกับอินพุตขอบนี้",
      en: "The two's complement int range -2147483648 to 2147483647 is asymmetric, with one more negative value than positive. Negating MIN_VALUE would need 2147483648, which does not fit, so Math.abs overflows back to -2147483648 without throwing. That is why code assuming abs is always non-negative can break on this boundary input.",
    },
    answer: {
      kind: "choice",
      choices: ["2147483647", "2147483648", "0", "-2147483648"],
      correctIndex: 3,
    },
  },
  {
    id: "bt-h-10",
    type: "brain-teaser",
    difficulty: "hard",
    prompt: {
      th: "สตริงความยาว 6 ที่ประกอบด้วยอักขระ 0 และ 1 เท่านั้น และห้ามมีเลข 1 อยู่ติดกันสองตัว มีทั้งหมดกี่แบบ",
      en: "How many strings of length 6 over the characters 0 and 1 contain no two adjacent 1s?",
    },
    explanation: {
      th: "ให้ f(n) เป็นจำนวนสตริงที่ใช้ได้ความยาว n แยกตามอักขระตัวแรก ถ้าเริ่มด้วย 0 ส่วนที่เหลือเป็นสตริงที่ใช้ได้ความยาว n-1 ถ้าเริ่มด้วย 1 ตัวถัดไปต้องเป็น 0 บังคับ แล้วที่เหลือเป็นความยาว n-2 จึงได้ f(n) = f(n-1) + f(n-2) ซึ่งเป็นความสัมพันธ์แบบฟีโบนักชี ฐานคือ f(1) = 2 และ f(2) = 3 ไล่ต่อได้ 5, 8, 13, 21 ดังนั้น f(6) = 21",
      en: "Let f(n) count valid strings of length n and split on the first character: starting with 0 leaves a valid string of length n-1, while starting with 1 forces the next character to be 0 and leaves length n-2. So f(n) = f(n-1) + f(n-2), a Fibonacci recurrence, with f(1) = 2 and f(2) = 3, continuing 5, 8, 13, 21. Hence f(6) = 21.",
    },
    answer: { kind: "text", accepted: ["21"], placeholder: "21" },
  },
  {
    id: "bt-h-11",
    type: "brain-teaser",
    difficulty: "hard",
    prompt: {
      th: "มีขวดน้ำ 1000 ขวด มีเพียงขวดเดียวที่มีพิษ ใช้หนูทดลองซึ่งแต่ละตัวดื่มส่วนผสมจากขวดใดก็ได้กี่ขวดก็ได้ แต่ดื่มได้เพียงรอบเดียวและผลออกมาพร้อมกันทุกตัว หนูที่ดื่มพิษจะตาย ต้องใช้หนูน้อยที่สุดกี่ตัวจึงระบุขวดที่มีพิษได้แน่นอนทุกกรณี",
      en: "There are 1000 bottles and exactly one is poisoned. Test animals each drink a mixture from any subset of bottles, but only one round is possible and all results appear together; any animal that drinks poison dies. What is the minimum number of animals needed to identify the poisoned bottle with certainty?",
    },
    explanation: {
      th: "หนูแต่ละตัวให้ข้อมูลหนึ่งบิต (ตายหรือไม่ตาย) หนู k ตัวจึงแยกกรณีได้ไม่เกิน 2^k กรณี ต้องการ 2^k >= 1000 ซึ่ง 2^9 = 512 ไม่พอ แต่ 2^10 = 1024 พอ วิธีทำจริงคือให้หมายเลขขวดเป็นเลขฐานสอง 10 บิต แล้วให้หนูตัวที่ i ดื่มทุกขวดที่บิตที่ i เป็น 1 รูปแบบการตายของหนูทั้งสิบตัวอ่านออกมาเป็นเลขฐานสองของหมายเลขขวดที่มีพิษได้ตรง ๆ",
      en: "Each animal yields one bit of information, dead or alive, so k animals distinguish at most 2^k cases. We need 2^k >= 1000, and 2^9 = 512 falls short while 2^10 = 1024 works. Concretely, write each bottle number in 10-bit binary and let animal i drink from every bottle whose bit i is 1; the death pattern reads off directly as the binary index of the poisoned bottle.",
    },
    answer: { kind: "text", accepted: ["10", "10 mice", "10 ตัว"], placeholder: "10" },
  },
  {
    id: "bt-h-12",
    type: "brain-teaser",
    difficulty: "hard",
    language: "javascript",
    code: `const arr = [0, 0, 1];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 0) {
    arr.splice(i, 1);
  }
}
console.log(JSON.stringify(arr));`,
    prompt: {
      th: "โค้ดนี้ตั้งใจลบเลข 0 ทั้งหมดออกจากอาร์เรย์ ผลลัพธ์ที่พิมพ์ออกมาจริง ๆ คืออะไร",
      en: "This code intends to remove every 0 from the array. What does it actually print?",
    },
    explanation: {
      th: "เมื่อ splice ลบสมาชิกออก สมาชิกที่อยู่ถัดไปจะเลื่อนลงมาแทนที่ index เดิม แต่ลูปยังเพิ่ม i ต่อไป ทำให้ข้ามตัวที่เลื่อนมาโดยไม่ตรวจ ไล่ดู i = 0 พบ 0 แล้วลบ อาร์เรย์เหลือ [0, 1] จากนั้น i = 1 อ่านค่า 1 ซึ่งไม่ใช่ 0 และ i = 2 ทำให้ลูปจบ ผลจึงเหลือ [0,1] วิธีแก้คือวนย้อนจากท้ายไปหน้า หรือลด i ลงหนึ่งหลังลบ หรือใช้ filter สร้างอาร์เรย์ใหม่",
      en: "When splice removes an element, the following elements shift down into the same index, but the loop still increments i, so the shifted element is skipped. Trace it: at i = 0 the 0 is removed leaving [0, 1]; at i = 1 the value is 1, not 0; at i = 2 the loop ends. The output is [0,1]. Fixes are iterating backwards, decrementing i after a removal, or building a new array with filter.",
    },
    answer: { kind: "choice", choices: ["[1]", "[0,1]", "[0,0,1]", "[]"], correctIndex: 1 },
  },
  {
    id: "bt-e-13",
    type: "brain-teaser",
    difficulty: "easy",
    language: "javascript",
    code: `let count = 0;
for (let i = 10; i > 0; i -= 3) {
  count++;
}
console.log(count);`,
    prompt: {
      th: "ลูปนี้ทำงานกี่รอบ (ค่า count ที่พิมพ์ออกมา)",
      en: "How many times does this loop run (the printed value of count)?",
    },
    explanation: {
      th: "ไล่ค่าที่ i รับได้ตามลำดับ 10, 7, 4, 1 ซึ่งยังผ่านเงื่อนไข i > 0 ทั้งสี่ค่า รอบถัดไป i เป็น -2 ทำให้ลูปจบ จึงได้ 4 รอบ เมื่อ step ไม่หารระยะทางลงตัว ต้องนับด้วยการปัดขึ้น ceil(10 / 3) = 4 ไม่ใช่ 10 / 3 แบบตัดเศษ",
      en: "The values i takes are 10, 7, 4 and 1, all of which pass i > 0; the next value is -2 and the loop stops, so it runs 4 times. When the step does not divide the distance exactly, the count is the ceiling ceil(10 / 3) = 4, not the truncated 10 / 3.",
    },
    answer: { kind: "text", accepted: ["4"], placeholder: "4" },
  },
  {
    id: "bt-e-14",
    type: "brain-teaser",
    difficulty: "easy",
    language: "javascript",
    code: `for (let i = 0; i < 3; i--) {
  console.log(i);
}`,
    prompt: {
      th: "ลูปนี้ไม่มีวันจบ เพราะเหตุใด",
      en: "This loop never terminates. Why?",
    },
    explanation: {
      th: "เงื่อนไขคาดว่า i จะเดินขึ้นไปจนถึง 3 แต่ส่วนอัปเดตเขียนเป็น i-- ซึ่งลดค่าลงทุกรอบ ค่า i จึงเป็น 0, -1, -2, ... และห่างจาก 3 มากขึ้นเรื่อย ๆ เงื่อนไข i < 3 เป็นจริงตลอด กฎง่าย ๆ คือทิศทางของส่วนอัปเดตต้องพาค่าไปหาจุดที่ทำให้เงื่อนไขเป็นเท็จ",
      en: "The condition expects i to climb toward 3, but the update is i--, which decreases it every pass, so i goes 0, -1, -2 and only moves further from 3, keeping i < 3 true forever. The rule of thumb is that the update must drive the variable toward the value that falsifies the condition.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "เพราะประกาศ i ด้วย let จึงถูกรีเซ็ตเป็น 0 ทุกรอบ", en: "because i is declared with let and is reset to 0 each pass" },
        { th: "เพราะ i ลดค่าลงทุกรอบ จึงห่างจาก 3 ขึ้นเรื่อย ๆ และ i < 3 เป็นจริงตลอด", en: "because i decreases every pass, moving away from 3, so i < 3 stays true forever" },
        { th: "เพราะ console.log ภายในลูปทำให้ส่วนอัปเดตไม่ถูกเรียก", en: "because the console.log inside the loop stops the update from running" },
        { th: "เพราะเงื่อนไขต้องใช้ <= จึงจะหยุดได้", en: "because the condition must use <= in order to stop" },
      ],
      correctIndex: 1,
    },
  },
  {
    id: "bt-e-15",
    type: "brain-teaser",
    difficulty: "easy",
    prompt: {
      th: "ให้ a และ b เป็นค่าความจริง (boolean) นิพจน์ใดสมมูลกับ !(a && b) ทุกกรณี",
      en: "Let a and b be booleans. Which expression is equivalent to !(a && b) in every case?",
    },
    explanation: {
      th: "นี่คือกฎเดอมอร์แกน การกระจาย not เข้าไปต้องสลับ and เป็น or ด้วย จึงได้ !a || !b ตรวจด้วยตารางค่าความจริงก็ได้ เช่น a เป็นจริง b เป็นเท็จ ทำให้ !(a && b) เป็นจริง และ !a || !b ก็เป็นจริง ในขณะที่ !a && !b เป็นเท็จ จึงตัดตัวเลือกนั้นออก",
      en: "This is De Morgan's law: pushing the not inside also flips and into or, giving !a || !b. A truth table confirms it, for example with a true and b false, !(a && b) is true and !a || !b is true, while !a && !b is false, which rules that option out.",
    },
    answer: {
      kind: "choice",
      choices: ["!a && !b", "!a || !b", "!(a || b)", "a || b"],
      correctIndex: 1,
    },
  },
  {
    id: "bt-e-16",
    type: "brain-teaser",
    difficulty: "easy",
    prompt: {
      th: "จำนวน 100 ในฐานสิบ เมื่อเขียนเป็นเลขฐานสองแล้วมีบิตที่เป็น 1 อยู่กี่บิต",
      en: "When decimal 100 is written in binary, how many bits are set to 1?",
    },
    explanation: {
      th: "แยก 100 เป็นผลบวกของกำลังของสองที่ไม่ซ้ำกัน 100 = 64 + 32 + 4 ได้เลขฐานสอง 1100100 ซึ่งมีบิต 1 อยู่ 3 บิต การแยกแบบนี้มีได้แบบเดียว จำนวนบิต 1 (population count) จึงเป็นค่าที่แน่นอนของทุกจำนวน",
      en: "Decompose 100 into distinct powers of two: 100 = 64 + 32 + 4, that is binary 1100100, which has 3 set bits. The decomposition is unique, so the population count is a well-defined property of every number.",
    },
    answer: { kind: "text", accepted: ["3"], placeholder: "3" },
  },
  {
    id: "bt-e-17",
    type: "brain-teaser",
    difficulty: "easy",
    language: "javascript",
    code: `let calls = 0;
function bump() {
  calls++;
  return true;
}
const ok = false && bump();
console.log(calls);`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่า calls เป็นเท่าใด",
      en: "What value of calls does this code print?",
    },
    explanation: {
      th: "ตัวดำเนินการ && ประเมินแบบลัดวงจร เมื่อฝั่งซ้ายเป็นเท็จ ผลของ and เป็นเท็จแน่นอนอยู่แล้ว จึงไม่ประเมินฝั่งขวาเลย ฟังก์ชัน bump จึงไม่ถูกเรียก และ calls ยังเป็น 0 ข้อควรระวังคืออย่าวางโค้ดที่มีผลข้างเคียงไว้ฝั่งขวาของ && หรือ ||",
      en: "The && operator short-circuits: if the left side is false the result is already false, so the right side is never evaluated. bump is never called and calls stays 0. The lesson is to avoid putting side-effecting code on the right of && or ||.",
    },
    answer: { kind: "text", accepted: ["0"], placeholder: "0" },
  },
  {
    id: "bt-m-13",
    type: "brain-teaser",
    difficulty: "medium",
    language: "javascript",
    code: `let ops = 0;
const n = 10;
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    ops++;
  }
}
console.log(ops);`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่า ops เป็นเท่าใด",
      en: "What value of ops does this code print?",
    },
    explanation: {
      th: "ลูปในทำงาน n - 1 - i รอบสำหรับแต่ละ i คือ 9, 8, 7, ..., 1, 0 ผลรวมคือ 9 + 8 + ... + 1 = 45 หรือใช้สูตร n(n-1)/2 = 10 * 9 / 2 = 45 นี่คือจำนวนคู่ที่ไม่เรียงลำดับของสมาชิก n ตัว จึงเป็นรูปแบบมาตรฐานของอัลกอริทึม O(n^2) ที่เทียบทุกคู่หนึ่งครั้ง",
      en: "The inner loop runs n - 1 - i times for each i, that is 9, 8, 7, ..., 1, 0, summing to 9 + 8 + ... + 1 = 45, matching n(n-1)/2 = 10 * 9 / 2 = 45. That is the number of unordered pairs of n items, the standard shape of an O(n^2) algorithm that visits each pair once.",
    },
    answer: { kind: "text", accepted: ["45"], placeholder: "45" },
  },
  {
    id: "bt-m-14",
    type: "brain-teaser",
    difficulty: "medium",
    prompt: {
      th: "ค้นหาแบบไบนารีในอาร์เรย์ที่เรียงลำดับแล้วขนาด 1,000,000 ตัว ในกรณีแย่ที่สุดต้องเทียบค่ากับสมาชิกกลางมากที่สุดกี่ครั้ง",
      en: "Binary search runs on a sorted array of 1,000,000 elements. In the worst case, how many times at most does it compare against a middle element?",
    },
    explanation: {
      th: "การเทียบแต่ละครั้งตัดช่วงที่เหลือลงประมาณครึ่ง ดังนั้นการเทียบ k ครั้งครอบคลุมช่วงได้ไม่เกิน 2^k - 1 ตัว หรือมองอีกแบบคือต้องการ 2^k >= 1,000,000 ซึ่ง 2^19 = 524288 ยังไม่พอ แต่ 2^20 = 1048576 พอ จึงได้ 20 ครั้ง เทียบเท่า floor(log2(1000000)) + 1 = 20",
      en: "Each comparison cuts the remaining range roughly in half, so k comparisons cover at most 2^k - 1 elements; equivalently we need 2^k >= 1,000,000, and 2^19 = 524288 is too small while 2^20 = 1048576 suffices. The answer is 20, matching floor(log2(1000000)) + 1 = 20.",
    },
    answer: { kind: "text", accepted: ["20", "20 comparisons", "20 ครั้ง"], placeholder: "20" },
  },
  {
    id: "bt-m-15",
    type: "brain-teaser",
    difficulty: "medium",
    language: "javascript",
    code: `let n = 0;
let out = "";
while (n < 5) {
  out += n;
  if (n % 2 === 0) continue;
  n++;
}`,
    prompt: {
      th: "ลูปนี้ไม่มีวันจบ เพราะเหตุใด",
      en: "This loop never terminates. Why?",
    },
    explanation: {
      th: "ในลูป while คำสั่ง continue กระโดดกลับไปตรวจเงื่อนไขทันที ไม่ได้ไปทำบรรทัดที่เหลือของ body ค่า n เริ่มที่ 0 ซึ่งเป็นเลขคู่ จึง continue ก่อนถึง n++ ทุกครั้ง ค่า n จึงค้างที่ 0 ตลอดและเงื่อนไข n < 5 เป็นจริงเสมอ (ต่างจากลูป for ที่ส่วนอัปเดตยังทำงานแม้ใช้ continue จึงไม่เกิดปัญหานี้)",
      en: "Inside a while loop, continue jumps straight back to the condition and skips the rest of the body. n starts at 0, which is even, so continue fires before n++ every single pass, n stays 0 and n < 5 is always true. A for loop differs: its update clause still runs on continue, which is why the same shape is safe there.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "เพราะ out += n ทำให้ n ถูกแปลงเป็นสตริง จึงเทียบกับ 5 ไม่ได้", en: "because out += n turns n into a string that cannot be compared with 5" },
        { th: "เพราะเงื่อนไข n < 5 ควรเป็น n <= 5 จึงจะหยุดได้", en: "because the condition n < 5 should be n <= 5 in order to stop" },
        { th: "เพราะ continue ข้ามคำสั่ง n++ เมื่อ n เป็นเลขคู่ ทำให้ n ค้างที่ 0 ตลอด", en: "because continue skips n++ whenever n is even, so n is stuck at 0 forever" },
        { th: "เพราะ continue ในลูป while ทำให้ออกจากลูปไม่ได้เลยในทุกกรณี", en: "because continue inside a while loop makes exiting the loop impossible in all cases" },
      ],
      correctIndex: 2,
    },
  },
  {
    id: "bt-m-16",
    type: "brain-teaser",
    difficulty: "medium",
    prompt: {
      th: "ให้ a และ b เป็นค่าความจริง (boolean) นิพจน์ (a && b) || (a && !b) ลดรูปให้สั้นที่สุดได้เป็นอะไร",
      en: "Let a and b be booleans. What is the simplest form of (a && b) || (a && !b)?",
    },
    explanation: {
      th: "ดึงตัวประกอบร่วม a ออกมาได้เป็น a && (b || !b) ส่วน b || !b เป็นจริงเสมอไม่ว่า b จะเป็นอะไร นิพจน์จึงเหลือ a เท่านั้น ตรวจอีกทางด้วยตารางค่าความจริง เมื่อ a เป็นเท็จ ทั้งสองพจน์เป็นเท็จ และเมื่อ a เป็นจริง พจน์ใดพจน์หนึ่งเป็นจริงตามค่าของ b เสมอ",
      en: "Factor out the common a to get a && (b || !b), and b || !b is always true whatever b is, so the whole expression reduces to a. A truth table agrees: when a is false both terms are false, and when a is true exactly one term is true depending on b.",
    },
    answer: {
      kind: "choice",
      choices: ["a && b", "b", "a || b", "a"],
      correctIndex: 3,
    },
  },
  {
    id: "bt-m-17",
    type: "brain-teaser",
    difficulty: "medium",
    language: "javascript",
    code: `let n = 0;
function tick() {
  n++;
  return false;
}
if (tick() || tick()) {
  // no-op
}
if (tick() && tick()) {
  // no-op
}
console.log(n);`,
    prompt: {
      th: "โค้ดนี้พิมพ์ค่า n เป็นเท่าใด",
      en: "What value of n does this code print?",
    },
    explanation: {
      th: "ฟังก์ชัน tick คืนค่าเท็จเสมอและเพิ่ม n ทุกครั้งที่ถูกเรียก ในเงื่อนไขแรกใช้ || ฝั่งซ้ายเป็นเท็จจึงยังต้องประเมินฝั่งขวาเพื่อสรุปผล จึงเรียกสองครั้ง (n เป็น 2) ในเงื่อนไขที่สองใช้ && ฝั่งซ้ายเป็นเท็จก็สรุปได้ทันที จึงเรียกครั้งเดียว (n เป็น 3) รวมพิมพ์ 3",
      en: "tick always returns false and increments n each call. The first condition uses ||, where a false left side still requires the right side to decide, so it calls twice (n becomes 2). The second uses &&, where a false left side already settles the result, so it calls once (n becomes 3). The printed value is 3.",
    },
    answer: { kind: "text", accepted: ["3"], placeholder: "3" },
  },
  {
    id: "bt-h-13",
    type: "brain-teaser",
    difficulty: "hard",
    language: "javascript",
    code: `const arr = [1, 5, 10, 2];
console.log(JSON.stringify(arr.sort()));`,
    prompt: {
      th: "โค้ดนี้พิมพ์อะไรออกมา",
      en: "What does this code print?",
    },
    explanation: {
      th: "Array.prototype.sort ที่ไม่ส่งฟังก์ชันเปรียบเทียบ จะแปลงสมาชิกเป็นสตริงแล้วเทียบตามลำดับรหัสอักขระ ไม่ใช่ตามค่าตัวเลข การเทียบสตริงทำทีละอักขระ ทำให้ \"10\" มาก่อน \"2\" เพราะอักขระตัวแรก \"1\" น้อยกว่า \"2\" ผลจึงเป็น [1,10,2,5] บั๊กนี้อันตรายเพราะซ่อนตัวได้สนิทเมื่อเลขทุกตัวมีจำนวนหลักเท่ากัน เช่น [1,5,2] เรียงได้ถูกต้อง วิธีแก้คือส่ง (a, b) => a - b",
      en: "Array.prototype.sort with no comparator converts elements to strings and orders them by character codes, not numeric value. String comparison goes character by character, so \"10\" sorts before \"2\" because \"1\" is less than \"2\", yielding [1,10,2,5]. The bug hides perfectly when all numbers have the same digit count, for instance [1,5,2] sorts correctly, which is what makes it dangerous. The fix is to pass (a, b) => a - b.",
    },
    answer: {
      kind: "choice",
      choices: ["[1,2,5,10]", "[1,10,2,5]", "[1,5,10,2]", "[10,5,2,1]"],
      correctIndex: 1,
    },
  },
  {
    id: "bt-h-14",
    type: "brain-teaser",
    difficulty: "hard",
    prompt: {
      th: "ในถุงมีลูกบอลสีขาว 20 ลูกและสีดำ 16 ลูก ทำซ้ำขั้นตอนนี้จนเหลือลูกเดียว หยิบออกมาสองลูก ถ้าสองลูกสีเดียวกันให้ใส่ลูกสีดำกลับไปหนึ่งลูก ถ้าสีต่างกันให้ใส่ลูกสีขาวกลับไปหนึ่งลูก (มีลูกสำรองไม่จำกัด) ลูกสุดท้ายที่เหลือเป็นสีอะไร",
      en: "A bag holds 20 white balls and 16 black balls. Repeat until one ball remains: draw two balls; if they match in colour put back one black ball, if they differ put back one white ball (spare balls are unlimited). What colour is the final ball?",
    },
    explanation: {
      th: "ค่าคงตัว (invariant) คือพาริตีของจำนวนลูกสีขาว ตรวจทั้งสามกรณี หยิบขาวสองลูกแล้วใส่ดำ ขาวลดลง 2 พาริตีคงเดิม หยิบดำสองลูกแล้วใส่ดำ ขาวไม่เปลี่ยน หยิบคนละสีแล้วใส่ขาว ขาวลดลง 1 แล้วเพิ่มกลับ 1 จึงไม่เปลี่ยน สรุปว่าจำนวนขาวเป็นเลขคู่ตลอดทุกขั้น เริ่มที่ 20 ซึ่งเป็นคู่ ตอนเหลือลูกเดียว จำนวนขาวจึงเป็น 0 ไม่ใช่ 1 ลูกสุดท้ายต้องเป็นสีดำเสมอ โดยไม่ขึ้นกับลำดับการหยิบเลย และจำนวนลูกลดลงหนึ่งลูกทุกขั้น จึงจบแน่นอน",
      en: "The invariant is the parity of the white count. Check all three cases: two whites removed and a black added drops white by 2, parity unchanged; two blacks removed and a black added leaves white untouched; a mixed pair removes one white and adds one white back, again unchanged. So the white count stays even at every step, starting from the even value 20. When one ball remains the white count must be 0 rather than 1, so the last ball is always black regardless of draw order. Each step removes one ball overall, so the process does terminate.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "สีดำเสมอ", en: "always black" },
        { th: "สีขาวเสมอ", en: "always white" },
        { th: "ขึ้นกับลำดับการหยิบ จึงเป็นสีใดก็ได้", en: "it depends on the draw order, so either colour is possible" },
        { th: "กระบวนการไม่จบ เพราะจำนวนลูกไม่ลดลง", en: "the process never ends because the ball count does not decrease" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "bt-h-15",
    type: "brain-teaser",
    difficulty: "hard",
    prompt: {
      th: "มีค่าที่ต่างกันทั้งหมด 8 ค่า ต้องการหาทั้งค่ามากที่สุดและค่ามากอันดับสอง ในกรณีแย่ที่สุดต้องเปรียบเทียบค่าน้อยที่สุดกี่ครั้ง",
      en: "Given 8 distinct values, you must find both the largest and the second largest. In the worst case, what is the minimum number of comparisons needed?",
    },
    explanation: {
      th: "จัดเป็นทัวร์นาเมนต์แบบแพ้คัดออก รอบแรกจับคู่ 4 ครั้ง รอบสอง 2 ครั้ง รอบชิง 1 ครั้ง รวม 7 ครั้ง ได้ค่ามากที่สุด (ทุกวิธีต้องใช้อย่างน้อย n - 1 = 7 ครั้ง เพราะต้องมีผู้แพ้ 7 ราย) ค่ามากอันดับสองต้องเคยแพ้ให้ค่ามากที่สุดโดยตรงเท่านั้น ซึ่งในทัวร์นาเมนต์ 8 ค่ามี log2(8) = 3 ราย หาค่ามากสุดในสามรายนี้ใช้อีก 3 - 1 = 2 ครั้ง รวม 7 + 2 = 9 ครั้ง ตรงกับสูตร n + ceil(log2 n) - 2 = 8 + 3 - 2 = 9 การไล่หาแบบตรงไปตรงมาโดยเก็บสองค่าสูงสุดจะใช้ราว 2n - 3 = 13 ครั้ง ซึ่งมากกว่า",
      en: "Run a knockout tournament: 4 comparisons in round one, 2 in round two, 1 in the final, so 7 comparisons give the largest, and no method can do better than n - 1 = 7 since 7 values must lose. The second largest can only be a value that lost directly to the winner, and in an 8-value tournament that is log2(8) = 3 values; picking the best of those 3 costs 3 - 1 = 2 more, for 7 + 2 = 9 in total, matching n + ceil(log2 n) - 2 = 8 + 3 - 2 = 9. A straightforward scan tracking the top two uses about 2n - 3 = 13 comparisons, which is worse.",
    },
    answer: { kind: "text", accepted: ["9", "9 comparisons", "9 ครั้ง"], placeholder: "9" },
  },
  {
    id: "bt-h-16",
    type: "brain-teaser",
    difficulty: "hard",
    language: "javascript",
    code: `function contains(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return true;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}
// arr is sorted ascending with distinct values`,
    prompt: {
      th: "ฟังก์ชันนี้ไม่มี error ตอนรัน และให้คำตอบถูกในหลายกรณี แต่มีข้อบกพร่องเชิงตรรกะอยู่ ข้อใดอธิบายข้อบกพร่องได้ถูกต้อง",
      en: "This function never throws and answers correctly in many cases, yet it has a logical defect. Which statement describes the defect correctly?",
    },
    explanation: {
      th: "เงื่อนไขวนลูปควรเป็น lo <= hi เพราะช่วงที่ยังต้องค้นหาแบบรวมปลายทั้งสองข้างจะว่างจริงเมื่อ lo > hi เท่านั้น เมื่อใช้ lo < hi ลูปหยุดตอนที่ lo เท่ากับ hi ซึ่งยังมีสมาชิกเหลืออยู่หนึ่งตัวที่ไม่เคยถูกเทียบ ฟังก์ชันจึงคืน false ทั้งที่ค่านั้นอาจอยู่ในอาร์เรย์ ทดลองกับ [1,2,3,4,5,6,7] จะพบว่าค้นหา 3 ได้ false (ลู่เข้าหาช่วงเดี่ยวที่ index 2 แล้วหลุดออก) ในขณะที่ค้นหา 4 ได้ true เพราะเจอที่ mid ตรงกลางพอดี กรณีอาร์เรย์ที่มีสมาชิกตัวเดียวก็คืน false ทุกครั้งเพราะลูปไม่ทำงานเลย",
      en: "The loop condition should be lo <= hi, because an inclusive search range is only truly empty once lo > hi. With lo < hi the loop stops while lo equals hi, leaving one candidate that is never compared, so the function reports false even when the value is present. On [1,2,3,4,5,6,7] searching for 3 returns false (the range narrows to the single index 2 and the loop exits) while 4 returns true because it lands on mid immediately, and a single-element array always returns false since the body never runs.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "การคำนวณ mid ผิด ต้องใช้ lo + (hi - lo) / 2 มิฉะนั้นผลจะคลาดเคลื่อนทุกครั้ง", en: "the mid computation is wrong and must be lo + (hi - lo) / 2, otherwise every result is off" },
        { th: "hi ควรเริ่มที่ arr.length ไม่ใช่ arr.length - 1 จึงจะครอบคลุมสมาชิกตัวสุดท้าย", en: "hi should start at arr.length, not arr.length - 1, to cover the last element" },
        { th: "เงื่อนไข lo < hi ทำให้ช่วงที่เหลือขนาดหนึ่งตัวไม่เคยถูกเทียบ จึงคืน false ทั้งที่ค่านั้นมีอยู่", en: "the lo < hi condition leaves a one-element range unchecked, so present values can be reported as missing" },
        { th: "การอัปเดต hi = mid - 1 ทำให้ค่าที่มากกว่า mid ถูกตัดทิ้งอย่างไม่ถูกต้อง", en: "the hi = mid - 1 update incorrectly discards values greater than mid" },
      ],
      correctIndex: 2,
    },
  },
  {
    id: "bt-h-17",
    type: "brain-teaser",
    difficulty: "hard",
    language: "javascript",
    code: `let n = 1000;
let steps = 0;
while (n > 0) {
  n = n & (n - 1);
  steps++;
}
console.log(steps);`,
    prompt: {
      th: "ลูปนี้พิมพ์ค่า steps เป็นเท่าใด",
      en: "What value of steps does this loop print?",
    },
    explanation: {
      th: "การดำเนินการ n & (n - 1) ลบบิต 1 ที่ต่ำที่สุดออกทีละบิตพอดี เพราะ n - 1 เปลี่ยนบิตต่ำสุดที่เป็น 1 ให้เป็น 0 และเปลี่ยนบิตที่ต่ำกว่านั้นทั้งหมดให้เป็น 1 การ AND จึงเก็บบิตสูงกว่าไว้ครบและตัดบิตต่ำสุดทิ้ง ดังนั้นจำนวนรอบเท่ากับจำนวนบิต 1 ของค่าเริ่มต้น (population count) โดยไม่ขึ้นกับขนาดของตัวเลข ที่นี่ 1000 = 512 + 256 + 128 + 64 + 32 + 8 คือ 1111101000 ในฐานสอง มีบิต 1 อยู่ 6 บิต จึงได้ 6 รอบ นี่คืออัลกอริทึมของ Kernighan ซึ่งเร็วกว่าการไล่ตรวจทีละบิตทั้ง 32 บิต",
      en: "The operation n & (n - 1) clears exactly the lowest set bit: n - 1 turns that bit into 0 and every bit below it into 1, so the AND keeps all higher bits and drops the lowest one. The iteration count therefore equals the population count of the starting value, independent of the number's magnitude. Here 1000 = 512 + 256 + 128 + 64 + 32 + 8, that is binary 1111101000 with 6 set bits, so the answer is 6. This is Kernighan's algorithm, faster than scanning all 32 bit positions.",
    },
    answer: { kind: "text", accepted: ["6"], placeholder: "6" },
  },
];
