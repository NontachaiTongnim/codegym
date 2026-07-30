import type { AngularQuestion } from "../types";

/**
 * Angular framework questions: mid-to-senior level concepts.
 * Covers: change detection, RxJS, dependency injection, routing,
 * signals, standalone components, lifecycle hooks, forms, and more.
 * Ids: ng-m-01.. (all medium difficulty for the 30-min exam format).
 */
export const angularQuestions: AngularQuestion[] = [
  {
    id: "ng-m-01",
    type: "angular",
    difficulty: "medium",
    code: `@Component({
  selector: 'app-counter',
  template: '{{ count }}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  count = 0;
  increment() { this.count++; }
}`,
    language: "javascript",
    prompt: {
      th: "ถ้าเรียก increment() จาก parent component ผ่าน ViewChild โดยไม่มี @Input เปลี่ยนแปลง template จะแสดงค่า count ใหม่หรือไม่ เพราะเหตุใด",
      en: "If increment() is called from the parent via ViewChild without any @Input change, will the template show the new count? Why?",
    },
    explanation: {
      th: "OnPush ตรวจจับการเปลี่ยนแปลงเมื่อ @Input เปลี่ยน, event ภายใน component เกิดขึ้น, หรือ async pipe ส่งค่าใหม่ การเรียก method จากภายนอกผ่าน ViewChild ไม่ trigger change detection",
      en: "OnPush only checks when @Input references change, an event originates inside the component, or an async pipe emits. Calling a method externally via ViewChild does not trigger change detection.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "แสดงค่าใหม่ทันที เพราะ method ทำงานแล้ว", en: "Shows new value immediately because the method ran" },
        { th: "ไม่แสดง เพราะ OnPush ไม่ถูก trigger จากการเรียก method ภายนอก", en: "Does not show because OnPush is not triggered by external method calls" },
        { th: "แสดงค่าใหม่เพราะ ViewChild เป็น reference เดียวกัน", en: "Shows new value because ViewChild is the same reference" },
        { th: "โยน error เพราะ OnPush ห้ามเรียก method จากภายนอก", en: "Throws an error because OnPush forbids external method calls" },
      ],
      correctIndex: 1,
    },
  },
  {
    id: "ng-m-02",
    type: "angular",
    difficulty: "medium",
    code: `@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = signal<User | null>(null);
  readonly user$ = this.user.asReadonly();
}`,
    language: "javascript",
    prompt: {
      th: "การใช้ signal แบบ asReadonly() ใน service มีข้อดีอะไรเมื่อเทียบกับ BehaviorSubject",
      en: "What advantage does using signal with asReadonly() in a service provide over BehaviorSubject?",
    },
    explanation: {
      th: "Signal ไม่ต้อง subscribe/unsubscribe, ทำงานกับ change detection แบบ zoneless ได้, และ asReadonly() ป้องกันการ mutate จากภายนอกโดยไม่ต้องสร้าง Observable wrapper",
      en: "Signals require no subscribe/unsubscribe, work with zoneless change detection, and asReadonly() prevents external mutation without needing an Observable wrapper.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "ไม่ต้อง subscribe/unsubscribe และทำงานกับ zoneless change detection ได้", en: "No subscribe/unsubscribe needed and works with zoneless change detection" },
        { th: "เร็วกว่า BehaviorSubject เสมอเพราะเป็น synchronous", en: "Always faster than BehaviorSubject because it is synchronous" },
        { th: "สามารถส่ง error ได้เหมือน Observable", en: "Can emit errors like an Observable" },
        { th: "ใช้แทน BehaviorSubject ได้ทุกกรณีโดยไม่มีข้อจำกัด", en: "Can replace BehaviorSubject in all cases without limitations" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-03",
    type: "angular",
    difficulty: "medium",
    code: `this.http.get('/api/data').pipe(
  switchMap(data => this.http.post('/api/process', data)),
  catchError(err => {
    console.error(err);
    return EMPTY;
  })
).subscribe();`,
    language: "javascript",
    prompt: {
      th: "ถ้า GET สำเร็จแต่ POST ล้มเหลว จะเกิดอะไรกับ subscription นี้",
      en: "If GET succeeds but POST fails, what happens to this subscription?",
    },
    explanation: {
      th: "catchError จับ error จาก POST แล้ว return EMPTY ซึ่งทำให้ outer Observable complete ทันที subscription จะถูก unsubscribe โดยอัตโนมัติและไม่สามารถ retry ได้อีก",
      en: "catchError catches the POST error and returns EMPTY which immediately completes the outer Observable. The subscription is automatically unsubscribed and cannot retry.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "Observable complete ทันทีหลัง catchError return EMPTY", en: "Observable completes immediately after catchError returns EMPTY" },
        { th: "Observable ยังคงรอรับค่าใหม่ต่อไป", en: "Observable keeps waiting for new values" },
        { th: "subscription ยังอยู่แต่หยุด emit ชั่วคราว", en: "Subscription stays alive but pauses emission temporarily" },
        { th: "โยน error ขึ้นไปที่ subscriber", en: "Throws the error up to the subscriber" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-04",
    type: "angular",
    difficulty: "medium",
    prompt: {
      th: "ใน Angular 17+ ถ้าใช้ @defer (on viewport) block จะมีพฤติกรรมอย่างไร",
      en: "In Angular 17+, what behavior does @defer (on viewport) provide?",
    },
    explanation: {
      th: "@defer (on viewport) จะ lazy load component ที่อยู่ภายใน block นั้นเมื่อ element เข้ามาใน viewport ของผู้ใช้ ช่วยลด initial bundle size",
      en: "@defer (on viewport) lazy loads the component inside that block when the element enters the user's viewport, reducing initial bundle size.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "Lazy load component เมื่อ element เข้ามาใน viewport", en: "Lazy loads component when element enters viewport" },
        { th: "Prerender component บน server ก่อนส่งให้ client", en: "Prerenders component on server before sending to client" },
        { th: "โหลด component ทันทีแต่ซ่อนจนกว่า viewport จะมาถึง", en: "Loads component immediately but hides until viewport reaches it" },
        { th: "โหลด component เมื่อ user click ที่ element", en: "Loads component when user clicks the element" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-05",
    type: "angular",
    difficulty: "medium",
    code: `@Component({
  standalone: true,
  imports: [CommonModule],
  template: \`
    @for (item of items; track item.id) {
      <app-item [data]="item" />
    }
  \`
})`,
    language: "javascript",
    prompt: {
      th: "track expression ใน @for block ของ Angular 17+ มีความสำคัญอย่างไร",
      en: "Why is the track expression in Angular 17+'s @for block important?",
    },
    explanation: {
      th: "track ใช้ระบุ identity ของแต่ละ item เพื่อให้ Angular ทำ DOM reconciliation ได้อย่างมีประสิทธิภาพ ถ้าไม่ track ถูกต้อง Angular อาจ recreate DOM elements ทั้งหมดเมื่อ list เปลี่ยน",
      en: "track identifies each item's identity for efficient DOM reconciliation. Without correct tracking, Angular may recreate all DOM elements when the list changes.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "ใช้ระบุ identity เพื่อ DOM reconciliation ที่มีประสิทธิภาพ", en: "Identifies item identity for efficient DOM reconciliation" },
        { th: "เป็นเพียง syntax sugar ไม่มีผลต่อ performance", en: "Just syntax sugar with no performance impact" },
        { th: "ใช้สำหรับ animation tracking เท่านั้น", en: "Used only for animation tracking" },
        { th: "ใช้เพื่อ sort items ตาม property ที่กำหนด", en: "Used to sort items by the specified property" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-06",
    type: "angular",
    difficulty: "medium",
    code: `const routes: Routes = [
  {
    path: 'admin',
    canActivate: [() => inject(AuthService).isAdmin()],
    loadChildren: () => import('./admin/routes')
  }
];`,
    language: "javascript",
    prompt: {
      th: "functional guard ใน Angular 15+ แตกต่างจาก class-based guard อย่างไร",
      en: "How do functional guards in Angular 15+ differ from class-based guards?",
    },
    explanation: {
      th: "Functional guards เป็น plain function ที่ใช้ inject() เพื่อเข้าถึง DI ไม่ต้องสร้าง class ที่ implement CanActivate interface ทำให้ code กระชับกว่าและ tree-shakable ได้ดีกว่า",
      en: "Functional guards are plain functions using inject() for DI access, no need to create a class implementing CanActivate. This results in more concise, better tree-shakable code.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "เป็น plain function ใช้ inject() ไม่ต้องสร้าง class กระชับกว่าและ tree-shakable", en: "Plain functions using inject(), no class needed, more concise and tree-shakable" },
        { th: "ทำงานเร็วกว่าเพราะไม่ผ่าน DI system", en: "Faster because they bypass the DI system" },
        { th: "รองรับ async ได้ แต่ class-based ไม่รองรับ", en: "Support async while class-based do not" },
        { th: "ไม่สามารถ inject service ได้ ต้องใช้ global state", en: "Cannot inject services, must use global state" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-07",
    type: "angular",
    difficulty: "medium",
    code: `effect(() => {
  const user = this.userSignal();
  console.log('User changed:', user);
});`,
    language: "javascript",
    prompt: {
      th: "ใน Angular signals ทำไม effect() ถึงไม่ควรใช้ set ค่า signal อื่นภายใน",
      en: "In Angular signals, why should you avoid setting another signal inside an effect()?",
    },
    explanation: {
      th: "การ set signal ภายใน effect อาจทำให้เกิด circular dependency หรือ infinite loop เพราะ effect track signal ที่ถูกอ่านอัตโนมัติ ถ้า signal ที่ถูก set ก็ถูก read ด้วยจะ trigger effect ซ้ำ Angular จะแจ้ง warning ใน dev mode",
      en: "Setting a signal inside an effect can cause circular dependencies or infinite loops because effects auto-track read signals. If the set signal is also read, it re-triggers the effect. Angular warns about this in dev mode.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "อาจเกิด circular dependency หรือ infinite loop", en: "May cause circular dependency or infinite loop" },
        { th: "effect() เป็น readonly ไม่สามารถ set ค่าได้เลย", en: "effect() is readonly and cannot set values at all" },
        { th: "จะทำให้ change detection หยุดทำงาน", en: "Will cause change detection to stop working" },
        { th: "ไม่มีปัญหาอะไร สามารถ set ได้อย่างอิสระ", en: "No problem at all, can set freely" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-08",
    type: "angular",
    difficulty: "medium",
    code: `@Component({
  providers: [DataService]
})
export class ParentComponent {}

@Component({})
export class ChildComponent {
  constructor(private data: DataService) {}
}`,
    language: "javascript",
    prompt: {
      th: "ถ้า DataService ถูก provide ที่ component level แบบนี้ จะเกิดอะไรเมื่อสร้าง ParentComponent หลายตัว",
      en: "If DataService is provided at the component level like this, what happens when multiple ParentComponents are created?",
    },
    explanation: {
      th: "แต่ละ ParentComponent instance จะมี DataService instance ของตัวเอง และ ChildComponent ที่อยู่ภายในจะ share instance เดียวกับ parent ของมัน ต่างจาก providedIn: 'root' ที่มี singleton เดียวทั้ง app",
      en: "Each ParentComponent instance gets its own DataService instance, and its ChildComponents share that same instance. This differs from providedIn: 'root' which creates a single app-wide singleton.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "แต่ละ ParentComponent มี DataService instance ของตัวเอง", en: "Each ParentComponent gets its own DataService instance" },
        { th: "ทุก ParentComponent ใช้ DataService ตัวเดียวกัน", en: "All ParentComponents share a single DataService" },
        { th: "เกิด error เพราะ DI ไม่อนุญาตให้ provide ที่ component level", en: "Error because DI does not allow component-level providing" },
        { th: "ChildComponent ไม่สามารถ inject DataService ได้เพราะไม่ได้ provide ที่ระดับตัวเอง", en: "ChildComponent cannot inject DataService because it is not provided at its own level" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-09",
    type: "angular",
    difficulty: "medium",
    code: `this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.api.search(term))
).subscribe(results => this.results = results);`,
    language: "javascript",
    prompt: {
      th: "ทำไมต้องใช้ switchMap แทน mergeMap ในกรณี search autocomplete",
      en: "Why use switchMap instead of mergeMap for search autocomplete?",
    },
    explanation: {
      th: "switchMap จะ cancel request ก่อนหน้าเมื่อมีค่าใหม่เข้ามา ป้องกันปัญหา race condition ที่ผลลัพธ์เก่ามาถึงหลังผลใหม่ ส่วน mergeMap จะรัน request ทั้งหมดพร้อมกันและอาจแสดงผลผิดลำดับ",
      en: "switchMap cancels the previous request when a new value arrives, preventing race conditions where old results arrive after newer ones. mergeMap runs all requests concurrently and may display results out of order.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "switchMap cancel request ก่อนหน้า ป้องกัน race condition", en: "switchMap cancels previous request, preventing race conditions" },
        { th: "switchMap เร็วกว่า mergeMap เสมอ", en: "switchMap is always faster than mergeMap" },
        { th: "mergeMap ไม่รองรับ HTTP requests", en: "mergeMap does not support HTTP requests" },
        { th: "ไม่มีข้อแตกต่าง ใช้ตัวไหนก็ได้", en: "No difference, either can be used" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-10",
    type: "angular",
    difficulty: "medium",
    code: `@Component({
  template: \`<input [formControl]="name" />\`
})
export class FormComponent {
  name = new FormControl('', {
    validators: [Validators.required],
    updateOn: 'blur'
  });
}`,
    language: "javascript",
    prompt: {
      th: "updateOn: 'blur' ส่งผลต่อ validation timing อย่างไร",
      en: "How does updateOn: 'blur' affect validation timing?",
    },
    explanation: {
      th: "validation จะทำงานเมื่อ input สูญเสีย focus เท่านั้น ไม่ใช่ทุกครั้งที่พิมพ์ ช่วยลด validation calls ที่ไม่จำเป็น เหมาะกับ form ที่ validation เป็น async หรือ expensive",
      en: "Validation runs only when the input loses focus, not on every keystroke. This reduces unnecessary validation calls, ideal for forms with async or expensive validation.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "Validation ทำงานเมื่อ input สูญเสีย focus เท่านั้น", en: "Validation runs only when the input loses focus" },
        { th: "Validation ทำงานทุกครั้งที่พิมพ์แต่แสดง error เมื่อ blur", en: "Validation runs on every keystroke but shows errors on blur" },
        { th: "Validation ถูก disable จนกว่าจะ submit form", en: "Validation is disabled until form submission" },
        { th: "ไม่มีผลต่อ validation ส่งผลแค่ต่อ value update", en: "No effect on validation, only affects value update" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-11",
    type: "angular",
    difficulty: "medium",
    prompt: {
      th: "HostListener กับ Renderer2.listen แตกต่างกันอย่างไรในเรื่อง memory management",
      en: "How do HostListener and Renderer2.listen differ regarding memory management?",
    },
    explanation: {
      th: "HostListener ถูก Angular จัดการ auto-cleanup เมื่อ component ถูก destroy แต่ Renderer2.listen return unlisten function ที่ต้องเรียกเองใน ngOnDestroy ถ้าลืมจะเกิด memory leak",
      en: "HostListener is auto-cleaned by Angular on component destroy, but Renderer2.listen returns an unlisten function that must be called manually in ngOnDestroy, causing memory leaks if forgotten.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "HostListener auto-cleanup แต่ Renderer2.listen ต้องเรียก unlisten เอง", en: "HostListener auto-cleans but Renderer2.listen requires manual unlisten" },
        { th: "ทั้งสอง auto-cleanup เหมือนกัน", en: "Both auto-clean identically" },
        { th: "Renderer2.listen เร็วกว่าเพราะไม่ผ่าน zone", en: "Renderer2.listen is faster because it bypasses zone" },
        { th: "HostListener ต้อง unsubscribe เองใน ngOnDestroy", en: "HostListener requires manual unsubscribe in ngOnDestroy" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-12",
    type: "angular",
    difficulty: "medium",
    code: `const injector = Injector.create({
  providers: [{ provide: Logger, useClass: ConsoleLogger }],
  parent: this.injector
});`,
    language: "javascript",
    prompt: {
      th: "การสร้าง child injector แบบนี้ใช้ในสถานการณ์ใด",
      en: "In what scenario would you create a child injector like this?",
    },
    explanation: {
      th: "ใช้เมื่อต้องการสร้าง dynamic component ที่ต้องการ DI context แยกจาก parent เช่น dialog, portal หรือ dynamically loaded component ที่ต้องการ override service บางตัว",
      en: "Used when creating dynamic components needing a separate DI context from the parent, such as dialogs, portals, or dynamically loaded components that need to override certain services.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "สร้าง dynamic component ที่ต้องการ DI context แยก เช่น dialog หรือ portal", en: "Creating dynamic components needing separate DI context like dialogs or portals" },
        { th: "เพื่อ performance optimization ลด lookup time", en: "For performance optimization to reduce lookup time" },
        { th: "เพื่อ lazy load module ใน standalone app", en: "To lazy load modules in a standalone app" },
        { th: "เพื่อ reset สถานะของ service ทุกครั้งที่เปิดหน้า", en: "To reset service state every time a page opens" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-13",
    type: "angular",
    difficulty: "medium",
    prompt: {
      th: "NgZone.runOutsideAngular() ใช้เมื่อใดและมีผลอย่างไร",
      en: "When is NgZone.runOutsideAngular() used and what is its effect?",
    },
    explanation: {
      th: "ใช้เมื่อต้องการรัน code ที่ไม่ต้อง trigger change detection เช่น animation loop, scroll listener ที่ถี่มาก หรือ WebSocket ช่วยลด unnecessary CD cycles",
      en: "Used to run code that should not trigger change detection, such as animation loops, frequent scroll listeners, or WebSocket messages. Reduces unnecessary CD cycles.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "รัน code ที่ไม่ต้อง trigger change detection เช่น animation loop", en: "Run code without triggering CD, like animation loops" },
        { th: "ทำให้ code ทำงานใน Web Worker แทน main thread", en: "Makes code run in a Web Worker instead of main thread" },
        { th: "ป้องกัน memory leak จาก subscription", en: "Prevents memory leaks from subscriptions" },
        { th: "ทำให้ component render เร็วขึ้น 2 เท่า", en: "Makes component render 2x faster" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-14",
    type: "angular",
    difficulty: "medium",
    code: `@Component({
  template: \`
    <ng-container *ngTemplateOutlet="tmpl; context: { $implicit: data, label: 'Name' }"></ng-container>
    <ng-template #tmpl let-value let-lbl="label">
      {{ lbl }}: {{ value }}
    </ng-template>
  \`
})`,
    language: "javascript",
    prompt: {
      th: "$implicit ใน template context คืออะไรและ let-value ทำงานอย่างไร",
      en: "What is $implicit in template context and how does let-value work?",
    },
    explanation: {
      th: "$implicit คือค่า default ที่ถูก bind เมื่อใช้ let-variable โดยไม่ระบุ key ส่วน let-lbl='label' จะ bind ค่าจาก context.label เข้ามาใน template variable lbl",
      en: "$implicit is the default value bound when using let-variable without specifying a key. let-lbl='label' binds the value from context.label into the template variable lbl.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "$implicit คือค่า default ที่ bind กับ let-variable ที่ไม่ระบุ key", en: "$implicit is the default value bound to let-variable without a key" },
        { th: "$implicit คือ keyword สำหรับ two-way binding ใน template", en: "$implicit is a keyword for two-way binding in templates" },
        { th: "$implicit ใช้กำหนด type ของ template variable", en: "$implicit defines the type of a template variable" },
        { th: "$implicit ทำให้ template เป็น lazy loaded", en: "$implicit makes the template lazy loaded" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-15",
    type: "angular",
    difficulty: "medium",
    prompt: {
      th: "ใน Angular Resolver ที่ return Observable ถ้า Observable ไม่ complete จะเกิดอะไร",
      en: "In an Angular Resolver that returns an Observable, what happens if the Observable never completes?",
    },
    explanation: {
      th: "Navigation จะค้างอยู่ตลอดเพราะ Router รอให้ Observable emit ค่าแรกและ complete ก่อนจึงจะ activate route ได้ ต้องใช้ take(1) หรือ first() เพื่อ auto-complete",
      en: "Navigation hangs indefinitely because the Router waits for the Observable to emit its first value and complete before activating the route. Use take(1) or first() to auto-complete.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "Navigation ค้างตลอด เพราะ Router รอ Observable complete", en: "Navigation hangs forever because Router waits for Observable to complete" },
        { th: "Router ใช้ค่าแรกที่ emit แล้ว navigate ต่อทันที", en: "Router takes first emitted value and navigates immediately" },
        { th: "เกิด timeout error หลัง 30 วินาที", en: "Timeout error after 30 seconds" },
        { th: "Route activate ทันทีโดยไม่มี resolved data", en: "Route activates immediately without resolved data" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-16",
    type: "angular",
    difficulty: "medium",
    code: `@Directive({ selector: '[highlight]' })
export class HighlightDirective {
  @Input() highlight = 'yellow';
  @HostBinding('style.backgroundColor')
  get bgColor() { return this.highlight; }
}`,
    language: "javascript",
    prompt: {
      th: "@HostBinding ทำหน้าที่อะไรในกรณีนี้",
      en: "What does @HostBinding do in this case?",
    },
    explanation: {
      th: "@HostBinding ผูก property ของ host element กับค่าใน directive โดยในกรณีนี้ผูก style.backgroundColor ของ element ที่ directive ถูกวางอยู่กับค่า highlight",
      en: "@HostBinding binds a host element property to a directive value. Here it binds the style.backgroundColor of the element the directive is placed on to the highlight value.",
    },
    answer: {
      kind: "choice",
      choices: [
        { th: "ผูก property ของ host element กับค่าใน directive", en: "Binds host element property to a directive value" },
        { th: "สร้าง event listener บน host element", en: "Creates an event listener on the host element" },
        { th: "Inject host element เข้ามาใน directive", en: "Injects the host element into the directive" },
        { th: "ทำ two-way binding ระหว่าง directive กับ parent", en: "Creates two-way binding between directive and parent" },
      ],
      correctIndex: 0,
    },
  },
  {
    id: "ng-m-17",
    type: "angular",
    difficulty: "medium",
    prompt: { th: "ContentChild กับ ViewChild ต่างกันอย่างไร", en: "How do ContentChild and ViewChild differ?" },
    explanation: { th: "ViewChild query element/component ที่อยู่ใน template ของ component นั้นเอง ส่วน ContentChild query element ที่ถูก project เข้ามาผ่าน ng-content", en: "ViewChild queries elements in the component's own template. ContentChild queries elements projected in via ng-content." },
    answer: { kind: "choice", choices: [{ th: "ViewChild = template ตัวเอง, ContentChild = projected content", en: "ViewChild = own template, ContentChild = projected content" }, { th: "ViewChild ใช้กับ directive เท่านั้น", en: "ViewChild only works with directives" }, { th: "ContentChild ทำงานเร็วกว่า ViewChild", en: "ContentChild is faster than ViewChild" }, { th: "ไม่มีความแตกต่าง ใช้แทนกันได้", en: "No difference, interchangeable" }], correctIndex: 0 },
  },
  {
    id: "ng-m-18",
    type: "angular",
    difficulty: "medium",
    prompt: { th: "EnvironmentInjector ใน Angular 14+ ใช้แทนอะไรและทำไม", en: "What does EnvironmentInjector in Angular 14+ replace and why?" },
    explanation: { th: "แทน NgModuleRef injector สำหรับ standalone components ทำให้สามารถ provide services ที่ระดับ route หรือ environment ได้โดยไม่ต้องมี NgModule", en: "Replaces NgModuleRef injector for standalone components, allowing service provision at route or environment level without NgModule." },
    answer: { kind: "choice", choices: [{ th: "แทน NgModuleRef injector สำหรับ standalone components", en: "Replaces NgModuleRef injector for standalone components" }, { th: "แทน ElementInjector สำหรับ lazy modules", en: "Replaces ElementInjector for lazy modules" }, { th: "เป็น wrapper รอบ root injector เท่านั้น", en: "Just a wrapper around root injector" }, { th: "ใช้สำหรับ testing เท่านั้น", en: "Used only for testing" }], correctIndex: 0 },
  },
  {
    id: "ng-m-19",
    type: "angular",
    difficulty: "medium",
    code: `computed(() => {
  const items = this.items();
  return items.filter(i => i.active).length;
});`,
    language: "javascript",
    prompt: { th: "computed() signal ต่างจาก effect() อย่างไร", en: "How does a computed() signal differ from an effect()?" },
    explanation: { th: "computed() สร้าง derived signal ที่ return ค่าใหม่เมื่อ dependency เปลี่ยน (pure, no side effects) ส่วน effect() ใช้สำหรับ side effects เท่านั้น ไม่ return ค่า", en: "computed() creates a derived signal returning a new value when dependencies change (pure, no side effects). effect() is only for side effects and returns nothing." },
    answer: { kind: "choice", choices: [{ th: "computed = derived value ไม่มี side effect, effect = side effect ไม่ return ค่า", en: "computed = derived value no side effect, effect = side effect no return value" }, { th: "computed ทำงานแบบ async, effect ทำงาน sync", en: "computed is async, effect is sync" }, { th: "ทั้งสอง return ค่าได้เหมือนกัน", en: "Both can return values equally" }, { th: "computed ต้อง subscribe, effect ไม่ต้อง", en: "computed requires subscription, effect does not" }], correctIndex: 0 },
  },
  {
    id: "ng-m-20",
    type: "angular",
    difficulty: "medium",
    prompt: { th: "ทำไม Angular ถึงแนะนำให้ใช้ takeUntilDestroyed() แทน manual unsubscribe", en: "Why does Angular recommend takeUntilDestroyed() over manual unsubscribe?" },
    explanation: { th: "takeUntilDestroyed() (จาก @angular/core/rxjs-interop) ใช้ DestroyRef ภายใน ทำให้ auto-unsubscribe เมื่อ component ถูก destroy โดยไม่ต้องจัดการ Subject หรือ ngOnDestroy เอง", en: "takeUntilDestroyed() (from @angular/core/rxjs-interop) uses DestroyRef internally, auto-unsubscribing on component destroy without managing Subject or ngOnDestroy manually." },
    answer: { kind: "choice", choices: [{ th: "ใช้ DestroyRef ภายใน auto-unsubscribe โดยไม่ต้องจัดการเอง", en: "Uses DestroyRef internally, auto-unsubscribes without manual management" }, { th: "เร็วกว่า manual unsubscribe 10 เท่า", en: "10x faster than manual unsubscribe" }, { th: "ใช้ได้กับ Promise ด้วย ไม่ใช่แค่ Observable", en: "Works with Promises too, not just Observables" }, { th: "เป็นเพียง coding convention ไม่มีผลทาง technical", en: "Just a coding convention with no technical effect" }], correctIndex: 0 },
  },
  {
    id: "ng-m-21", type: "angular", difficulty: "medium",
    prompt: { th: "ใน Angular ถ้า component A inject service ที่ providedIn: 'any' จะได้ instance จากที่ใด", en: "In Angular, if component A injects a service with providedIn: 'any', where does the instance come from?" },
    explanation: { th: "providedIn: 'any' สร้าง instance ใหม่ต่อทุก lazy-loaded module boundary ต่างจาก 'root' ที่มี singleton เดียว ใช้เมื่อต้องการ isolate state ระหว่าง lazy modules", en: "providedIn: 'any' creates a new instance per lazy-loaded module boundary, unlike 'root' which is a singleton. Used to isolate state between lazy modules." },
    answer: { kind: "choice", choices: [{ th: "instance ใหม่ต่อ lazy-loaded module boundary", en: "New instance per lazy-loaded module boundary" }, { th: "singleton เดียวทั้ง app เหมือน root", en: "Single app-wide singleton like root" }, { th: "instance ใหม่ทุกครั้งที่ inject", en: "New instance on every injection" }, { th: "เฉพาะ eagerly-loaded module เท่านั้น", en: "Only in eagerly-loaded modules" }], correctIndex: 0 },
  },
  {
    id: "ng-m-22", type: "angular", difficulty: "medium",
    prompt: { th: "ControlValueAccessor ใช้สำหรับอะไรและ method หลักมีอะไรบ้าง", en: "What is ControlValueAccessor used for and what are its key methods?" },
    explanation: { th: "ใช้สร้าง custom form control ที่ทำงานร่วมกับ Reactive Forms และ Template-driven Forms ได้ ต้อง implement writeValue, registerOnChange, registerOnTouched", en: "Used to create custom form controls compatible with both Reactive and Template-driven Forms. Must implement writeValue, registerOnChange, registerOnTouched." },
    answer: { kind: "choice", choices: [{ th: "สร้าง custom form control, implement writeValue/registerOnChange/registerOnTouched", en: "Create custom form control, implement writeValue/registerOnChange/registerOnTouched" }, { th: "validate form input, implement validate/registerOnValidatorChange", en: "Validate form input, implement validate/registerOnValidatorChange" }, { th: "สร้าง custom pipe สำหรับ form display", en: "Create custom pipe for form display" }, { th: "เชื่อมต่อ HTTP กับ form โดยตรง", en: "Connect HTTP directly to forms" }], correctIndex: 0 },
  },
  {
    id: "ng-m-23", type: "angular", difficulty: "medium",
    prompt: { th: "APP_INITIALIZER token ใช้ทำอะไรและมีข้อควรระวังอะไร", en: "What is APP_INITIALIZER token used for and what are its caveats?" },
    explanation: { th: "ใช้รัน logic ก่อน app bootstrap เสร็จ เช่น load config หรือ auth token ข้อควรระวังคือถ้า function ที่ return Promise/Observable ช้าเกินไป app จะค้าง", en: "Runs logic before app bootstrap completes, like loading config or auth tokens. Caveat: if the returned Promise/Observable is too slow, the app hangs." },
    answer: { kind: "choice", choices: [{ th: "รัน logic ก่อน app bootstrap เช่น load config ถ้าช้าจะทำให้ app ค้าง", en: "Runs logic before bootstrap like loading config; if slow, app hangs" }, { th: "Initialize component tree หลัง bootstrap เสร็จ", en: "Initializes component tree after bootstrap completes" }, { th: "ใช้สำหรับ register global error handler", en: "Used to register global error handler" }, { th: "เป็น testing utility เท่านั้น", en: "Testing utility only" }], correctIndex: 0 },
  },
  {
    id: "ng-m-24", type: "angular", difficulty: "medium",
    prompt: { th: "withComponentInputBinding() ใน provideRouter ทำอะไร", en: "What does withComponentInputBinding() in provideRouter do?" },
    explanation: { th: "ทำให้ route params, query params และ data resolve ถูก bind เข้า @Input() ของ component โดยอัตโนมัติ ไม่ต้อง inject ActivatedRoute แล้ว subscribe เอง", en: "Automatically binds route params, query params, and resolved data to component @Input() properties without needing to inject ActivatedRoute and subscribe manually." },
    answer: { kind: "choice", choices: [{ th: "Auto-bind route params/query params/data เข้า @Input()", en: "Auto-binds route params/query params/data to @Input()" }, { th: "Enable two-way binding ระหว่าง route กับ component", en: "Enables two-way binding between route and component" }, { th: "ทำให้ component lazy load ได้อัตโนมัติ", en: "Makes components auto-lazy-loadable" }, { th: "Register component สำหรับ SSR", en: "Registers component for SSR" }], correctIndex: 0 },
  },
  {
    id: "ng-m-25", type: "angular", difficulty: "medium",
    prompt: { th: "ใน Angular testing เมื่อใดควรใช้ fakeAsync + tick() แทน async/await", en: "In Angular testing, when should you use fakeAsync + tick() instead of async/await?" },
    explanation: { th: "ใช้เมื่อต้องการควบคุม time-based operations เช่น setTimeout, setInterval, debounceTime อย่างแม่นยำ tick() จำลองการเดินของเวลาแบบ synchronous", en: "Used when precise control over time-based operations like setTimeout, setInterval, debounceTime is needed. tick() simulates time passage synchronously." },
    answer: { kind: "choice", choices: [{ th: "ควบคุม time-based operations อย่างแม่นยำ tick() จำลองเวลาแบบ sync", en: "Precise control over time-based operations; tick() simulates time synchronously" }, { th: "เมื่อ test มี HTTP request", en: "When test has HTTP requests" }, { th: "เมื่อต้องการ test DOM rendering", en: "When testing DOM rendering" }, { th: "ใช้แทนกันได้ทุกกรณี", en: "Interchangeable in all cases" }], correctIndex: 0 },
  },
  {
    id: "ng-m-26", type: "angular", difficulty: "medium",
    prompt: { th: "inject() function-level DI ใน Angular 14+ ใช้ได้ใน context ไหนบ้าง", en: "In what contexts can Angular 14+'s inject() function-level DI be used?" },
    explanation: { th: "ใช้ได้ใน constructor, field initializer, factory function (useFactory) และ functional guards/resolvers/interceptors ที่อยู่ใน injection context ไม่สามารถเรียกใน method ทั่วไปหลัง construction", en: "Usable in constructors, field initializers, factory functions (useFactory), and functional guards/resolvers/interceptors within injection context. Cannot be called in regular methods after construction." },
    answer: { kind: "choice", choices: [{ th: "constructor, field initializer, factory function, functional guards ที่อยู่ใน injection context", en: "Constructor, field initializer, factory function, functional guards in injection context" }, { th: "ที่ไหนก็ได้ในทุก method", en: "Anywhere in any method" }, { th: "เฉพาะใน constructor เท่านั้น", en: "Only in constructors" }, { th: "เฉพาะใน ngOnInit เท่านั้น", en: "Only in ngOnInit" }], correctIndex: 0 },
  },
  {
    id: "ng-m-27", type: "angular", difficulty: "medium",
    prompt: { th: "ใน NgRx, Effect ที่ไม่ dispatch action ใหม่ต้องทำอย่างไร", en: "In NgRx, how do you handle an Effect that should not dispatch a new action?" },
    explanation: { th: "ใช้ { dispatch: false } ใน createEffect options ถ้าไม่ระบุ NgRx จะรอ action ใหม่จาก Observable และอาจเกิด error ถ้า Observable complete โดยไม่ emit action", en: "Use { dispatch: false } in createEffect options. Without it, NgRx expects a new action from the Observable and may error if it completes without emitting one." },
    answer: { kind: "choice", choices: [{ th: "ใช้ { dispatch: false } ใน createEffect options", en: "Use { dispatch: false } in createEffect options" }, { th: "return EMPTY ท้าย pipe", en: "Return EMPTY at end of pipe" }, { th: "ใช้ tap() แทน map() แล้วไม่ต้อง config อะไร", en: "Use tap() instead of map() with no config needed" }, { th: "ไม่สามารถทำได้ Effect ต้อง dispatch เสมอ", en: "Not possible, Effects must always dispatch" }], correctIndex: 0 },
  },
  {
    id: "ng-m-28", type: "angular", difficulty: "medium",
    prompt: { th: "multi: true ใน provider config ใช้สำหรับอะไร", en: "What is multi: true in provider config used for?" },
    explanation: { th: "ทำให้ DI token หนึ่งตัวสามารถมีหลาย provider ได้ inject แล้วได้ array ของทุก values เช่น HTTP_INTERCEPTORS หรือ APP_INITIALIZER", en: "Allows one DI token to have multiple providers, injecting returns an array of all values. Used in HTTP_INTERCEPTORS or APP_INITIALIZER." },
    answer: { kind: "choice", choices: [{ th: "ให้ token หนึ่งมีหลาย provider inject ได้เป็น array", en: "Allows one token to have multiple providers, injected as array" }, { th: "สร้าง multiple instances ของ service เดียว", en: "Creates multiple instances of a single service" }, { th: "ทำให้ service เป็น multi-threaded", en: "Makes service multi-threaded" }, { th: "provide service ให้หลาย module พร้อมกัน", en: "Provides service to multiple modules simultaneously" }], correctIndex: 0 },
  },
  {
    id: "ng-m-29", type: "angular", difficulty: "medium",
    prompt: { th: "afterNextRender() ใน Angular 16+ ต่างจาก ngAfterViewInit อย่างไร", en: "How does afterNextRender() in Angular 16+ differ from ngAfterViewInit?" },
    explanation: { th: "afterNextRender() เป็น callback ที่ทำงานหลัง next rendering cycle เสร็จ ใช้ได้กับ SSR-safe code เพราะจะไม่ทำงานบน server ส่วน ngAfterViewInit ทำงานบน server ด้วยใน SSR context", en: "afterNextRender() runs after the next rendering cycle completes and is SSR-safe (won't run on server). ngAfterViewInit runs on server in SSR context." },
    answer: { kind: "choice", choices: [{ th: "afterNextRender ทำงานหลัง render cycle และ SSR-safe (ไม่รันบน server)", en: "afterNextRender runs after render cycle and is SSR-safe (won't run on server)" }, { th: "ทำงานก่อน ngAfterViewInit เสมอ", en: "Always runs before ngAfterViewInit" }, { th: "ใช้แทน ngOnInit สำหรับ data fetching", en: "Replaces ngOnInit for data fetching" }, { th: "ไม่มีความแตกต่าง เป็นแค่ชื่อใหม่", en: "No difference, just a new name" }], correctIndex: 0 },
  },
  {
    id: "ng-m-30", type: "angular", difficulty: "medium",
    prompt: { th: "ใน Angular Router, relativeTo ใน router.navigate ใช้อย่างไรและทำไม", en: "How and why is relativeTo used in router.navigate?" },
    explanation: { th: "ใช้กำหนด base route สำหรับ relative navigation เช่น navigate(['edit'], { relativeTo: this.route }) จะ navigate ไปยัง child route ของ route ปัจจุบัน ถ้าไม่ระบุจะ navigate จาก root", en: "Specifies the base route for relative navigation. navigate(['edit'], { relativeTo: this.route }) navigates to a child of the current route. Without it, navigation starts from root." },
    answer: { kind: "choice", choices: [{ th: "กำหนด base route สำหรับ relative navigation ถ้าไม่ระบุจะเริ่มจาก root", en: "Sets base route for relative navigation; defaults to root if omitted" }, { th: "ใช้สำหรับ back navigation เท่านั้น", en: "Used only for back navigation" }, { th: "เป็น performance hint ให้ Router ไม่ต้อง resolve ใหม่", en: "Performance hint so Router skips re-resolving" }, { th: "ใช้กำหนด animation direction", en: "Sets animation direction" }], correctIndex: 0 },
  },
  { id: "ng-m-31", type: "angular", difficulty: "medium", prompt: { th: "ExpressionChangedAfterItHasBeenCheckedError เกิดจากอะไรและแก้ไขอย่างไร", en: "What causes ExpressionChangedAfterItHasBeenCheckedError and how to fix it?" }, explanation: { th: "เกิดเมื่อค่าใน template เปลี่ยนระหว่าง CD cycles ใน dev mode Angular ตรวจสอบ 2 รอบ แก้โดยย้าย logic ไป ngAfterViewInit กับ ChangeDetectorRef.detectChanges() หรือใช้ async pipe", en: "Occurs when template values change between CD cycles. In dev mode Angular checks twice. Fix by moving logic to ngAfterViewInit with ChangeDetectorRef.detectChanges() or using async pipe." }, answer: { kind: "choice", choices: [{ th: "ค่า template เปลี่ยนระหว่าง CD cycles แก้ด้วย detectChanges() หรือ async pipe", en: "Template value changed between CD cycles; fix with detectChanges() or async pipe" }, { th: "ใช้ OnPush แล้ว Input ไม่เปลี่ยน", en: "Using OnPush but Input didn't change" }, { th: "Template syntax ผิด", en: "Incorrect template syntax" }, { th: "เกิดจาก memory leak", en: "Caused by memory leak" }], correctIndex: 0 } },
  { id: "ng-m-32", type: "angular", difficulty: "medium", prompt: { th: "InjectionToken ใช้ทำอะไรและเมื่อไหร่ที่ต้องใช้", en: "What is InjectionToken for and when must you use it?" }, explanation: { th: "ใช้เป็น DI token สำหรับค่าที่ไม่ใช่ class เช่น interface, config object, หรือ primitive values เพราะ TypeScript interface หายไปตอน runtime ทำให้ DI ใช้ type เป็น key ไม่ได้", en: "Used as DI token for non-class values like interfaces, config objects, or primitives because TypeScript interfaces disappear at runtime so DI cannot use types as keys." }, answer: { kind: "choice", choices: [{ th: "เป็น DI token สำหรับค่าที่ไม่ใช่ class เช่น interface หรือ config object", en: "DI token for non-class values like interfaces or config objects" }, { th: "ใช้สร้าง unique key สำหรับ localStorage", en: "Creates unique keys for localStorage" }, { th: "เป็น alternative ของ @Inject decorator", en: "An alternative to @Inject decorator" }, { th: "ใช้สำหรับ tree-shaking optimization เท่านั้น", en: "Used for tree-shaking optimization only" }], correctIndex: 0 } },
  { id: "ng-m-33", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular SSR (Universal) ทำไมต้องใช้ isPlatformBrowser/isPlatformServer", en: "In Angular SSR (Universal), why use isPlatformBrowser/isPlatformServer?" }, explanation: { th: "บน server ไม่มี window, document, localStorage APIs เหล่านี้ต้องถูก guard ด้วย isPlatformBrowser เพื่อป้องกัน runtime error บน server", en: "On server there is no window, document, or localStorage. These APIs must be guarded with isPlatformBrowser to prevent runtime errors on server." }, answer: { kind: "choice", choices: [{ th: "ป้องกัน runtime error จากการเรียก browser-only APIs บน server", en: "Prevents runtime errors from calling browser-only APIs on server" }, { th: "เพิ่ม performance ของ SSR rendering", en: "Improves SSR rendering performance" }, { th: "ทำให้ SEO ดีขึ้น", en: "Improves SEO" }, { th: "จำเป็นสำหรับ hydration เท่านั้น", en: "Required only for hydration" }], correctIndex: 0 } },
  { id: "ng-m-34", type: "angular", difficulty: "medium", prompt: { th: "Angular Interceptor ใหม่แบบ functional (withInterceptors) ต่างจาก class-based อย่างไร", en: "How do new functional interceptors (withInterceptors) differ from class-based ones?" }, explanation: { th: "Functional interceptors เป็น plain function ที่รับ req กับ next ไม่ต้องสร้าง class ที่ implement HttpInterceptor กระชับกว่าและ tree-shakable ดีกว่า", en: "Functional interceptors are plain functions receiving req and next, no class implementing HttpInterceptor needed. More concise and better tree-shakable." }, answer: { kind: "choice", choices: [{ th: "เป็น function รับ req กับ next โดยตรง กระชับกว่า tree-shakable ดีกว่า", en: "Functions receiving req and next directly, more concise and tree-shakable" }, { th: "รองรับ WebSocket intercepting ด้วย", en: "Support WebSocket intercepting too" }, { th: "ไม่สามารถ modify request ได้ ทำได้แค่ read", en: "Cannot modify requests, only read" }, { th: "ทำงานได้เฉพาะกับ standalone components", en: "Only works with standalone components" }], correctIndex: 0 } },
  { id: "ng-m-35", type: "angular", difficulty: "medium", prompt: { th: "output() function ใน Angular 17.3+ ต่างจาก @Output() EventEmitter อย่างไร", en: "How does the output() function in Angular 17.3+ differ from @Output() EventEmitter?" }, explanation: { th: "output() เป็น declarative API ที่ไม่ต้อง new EventEmitter และ type-safe กว่า ใช้ .emit() เหมือนกัน แต่ไม่ extend Subject/Observable ทำให้ lightweight กว่า", en: "output() is a declarative API without new EventEmitter and more type-safe. Uses .emit() the same way but doesn't extend Subject/Observable, making it lighter." }, answer: { kind: "choice", choices: [{ th: "Declarative API, ไม่ extend Subject/Observable, lightweight กว่า", en: "Declarative API, doesn't extend Subject/Observable, lighter" }, { th: "รองรับ two-way binding อัตโนมัติ", en: "Supports automatic two-way binding" }, { th: "emit ค่าได้หลายครั้งพร้อมกัน", en: "Can emit multiple values simultaneously" }, { th: "ไม่รองรับ generic type", en: "Does not support generic types" }], correctIndex: 0 } },
  { id: "ng-m-36", type: "angular", difficulty: "medium", prompt: { th: "model() signal ใน Angular 17.2+ ใช้สำหรับอะไร", en: "What is model() signal in Angular 17.2+ used for?" }, explanation: { th: "model() สร้าง two-way bindable signal ที่ทำหน้าที่เหมือน @Input + @Output pattern ใช้ banana-in-a-box syntax [(model)] ได้โดยไม่ต้องสร้าง EventEmitter แยก", en: "model() creates a two-way bindable signal acting like @Input + @Output pattern, usable with [(model)] syntax without a separate EventEmitter." }, answer: { kind: "choice", choices: [{ th: "Two-way bindable signal ใช้ [()] ได้ ไม่ต้องสร้าง EventEmitter", en: "Two-way bindable signal, usable with [()], no EventEmitter needed" }, { th: "Model สำหรับ form validation", en: "Model for form validation" }, { th: "Data model class generator", en: "Data model class generator" }, { th: "State management แทน NgRx", en: "State management replacing NgRx" }], correctIndex: 0 } },
  { id: "ng-m-37", type: "angular", difficulty: "medium", prompt: { th: "viewChild() signal-based query ใน Angular 17+ ดีกว่า @ViewChild อย่างไร", en: "How is viewChild() signal-based query in Angular 17+ better than @ViewChild?" }, explanation: { th: "viewChild() return signal ที่ type-safe กว่า ไม่ต้องใช้ lifecycle hook เพื่อรอให้ view พร้อม signal จะ update อัตโนมัติเมื่อ referenced element เปลี่ยน", en: "viewChild() returns a more type-safe signal, no lifecycle hook needed to wait for view readiness. Signal auto-updates when referenced element changes." }, answer: { kind: "choice", choices: [{ th: "Return signal ที่ type-safe, auto-update ไม่ต้องรอ lifecycle hook", en: "Returns type-safe signal, auto-updates without waiting for lifecycle hooks" }, { th: "เร็วกว่า @ViewChild 5 เท่า", en: "5x faster than @ViewChild" }, { th: "ใช้ได้กับ ng-content ด้วย", en: "Works with ng-content too" }, { th: "ไม่ต้อง import อะไรเพิ่ม", en: "No additional imports needed" }], correctIndex: 0 } },
  { id: "ng-m-38", type: "angular", difficulty: "medium", prompt: { th: "HttpContext ใน Angular HttpClient ใช้ทำอะไร", en: "What is HttpContext in Angular HttpClient used for?" }, explanation: { th: "ใช้ส่ง metadata ไปกับ request ที่ interceptor สามารถอ่านได้ เช่น flag บอกว่า request นี้ไม่ต้อง show loading spinner หรือ skip auth header", en: "Sends metadata with requests that interceptors can read, like flags to skip loading spinner or skip auth header." }, answer: { kind: "choice", choices: [{ th: "ส่ง metadata ให้ interceptor อ่าน เช่น skip loading หรือ skip auth", en: "Sends metadata for interceptors like skip loading or skip auth" }, { th: "กำหนด HTTP headers เพิ่มเติม", en: "Sets additional HTTP headers" }, { th: "ใช้แทน query params", en: "Replaces query params" }, { th: "เก็บ response ไว้ใน context สำหรับ caching", en: "Stores response in context for caching" }], correctIndex: 0 } },
  { id: "ng-m-39", type: "angular", difficulty: "medium", prompt: { th: "ทำไม async pipe ถึงดีกว่า manual subscribe ใน template", en: "Why is async pipe better than manual subscribe in templates?" }, explanation: { th: "async pipe auto-unsubscribe เมื่อ component destroy, trigger OnPush change detection อัตโนมัติ, และลดโค้ดที่ต้องจัดการ subscription ใน component class", en: "async pipe auto-unsubscribes on component destroy, automatically triggers OnPush change detection, and reduces subscription management code in component class." }, answer: { kind: "choice", choices: [{ th: "Auto-unsubscribe, trigger OnPush CD, ลดโค้ดจัดการ subscription", en: "Auto-unsubscribes, triggers OnPush CD, reduces subscription code" }, { th: "เร็วกว่า manual subscribe เสมอ", en: "Always faster than manual subscribe" }, { th: "รองรับ error handling ที่ดีกว่า", en: "Better error handling support" }, { th: "ทำงานกับ Promise เท่านั้น ไม่รองรับ Observable", en: "Works only with Promises, not Observables" }], correctIndex: 0 } },
  { id: "ng-m-40", type: "angular", difficulty: "medium", prompt: { th: "input.required() ใน Angular 16+ ต่างจาก @Input() ธรรมดาอย่างไร", en: "How does input.required() in Angular 16+ differ from regular @Input()?" }, explanation: { th: "input.required() ทำให้ compiler บังคับว่า parent ต้อง pass ค่าเข้ามาเสมอ ถ้าไม่ pass จะ compile error ต่างจาก @Input() ที่ optional by default", en: "input.required() makes the compiler enforce that parent must always pass a value. Missing value causes a compile error, unlike @Input() which is optional by default." }, answer: { kind: "choice", choices: [{ th: "Compiler บังคับว่า parent ต้อง pass ค่า ถ้าไม่ pass จะ compile error", en: "Compiler enforces parent must pass value; missing causes compile error" }, { th: "ทำให้ Input เป็น two-way binding อัตโนมัติ", en: "Makes Input two-way binding automatically" }, { th: "Validate ค่าที่ pass เข้ามาว่าไม่ใช่ null", en: "Validates passed value is not null" }, { th: "ไม่สามารถมี default value ได้", en: "Cannot have a default value" }], correctIndex: 0 } },
  { id: "ng-m-41", type: "angular", difficulty: "medium", prompt: { th: "ResolveFn ใน Angular 15+ ใช้อย่างไร", en: "How is ResolveFn used in Angular 15+?" }, explanation: { th: "เป็น functional resolver ที่เป็น plain function แทน class-based Resolve interface ใช้ inject() เพื่อเข้าถึง service กระชับกว่าและ tree-shakable", en: "A functional resolver that's a plain function replacing class-based Resolve interface. Uses inject() for service access, more concise and tree-shakable." }, answer: { kind: "choice", choices: [{ th: "Plain function แทน class Resolve ใช้ inject() กระชับและ tree-shakable", en: "Plain function replacing Resolve class, uses inject(), concise and tree-shakable" }, { th: "ใช้ resolve DNS", en: "Resolves DNS" }, { th: "เป็น utility สำหรับ resolve Promise เท่านั้น", en: "Utility for resolving Promises only" }, { th: "ใช้กับ NgModule-based apps เท่านั้น", en: "Only works with NgModule-based apps" }], correctIndex: 0 } },
  { id: "ng-m-42", type: "angular", difficulty: "medium", prompt: { th: "linkedSignal() ใน Angular 19 ต่างจาก computed() อย่างไร", en: "How does linkedSignal() in Angular 19 differ from computed()?" }, explanation: { th: "linkedSignal() สร้าง writable signal ที่ reset ค่าเมื่อ source signal เปลี่ยน ต่างจาก computed() ที่เป็น readonly เหมาะสำหรับ form field ที่ต้อง reset เมื่อ parent data เปลี่ยน", en: "linkedSignal() creates a writable signal that resets when source signal changes, unlike readonly computed(). Ideal for form fields that reset when parent data changes." }, answer: { kind: "choice", choices: [{ th: "Writable signal ที่ reset เมื่อ source เปลี่ยน ต่างจาก computed ที่ readonly", en: "Writable signal that resets when source changes, unlike readonly computed" }, { th: "เป็น linked list ของ signals", en: "A linked list of signals" }, { th: "เหมือน computed แต่ lazy evaluation", en: "Same as computed but with lazy evaluation" }, { th: "ใช้เชื่อม signal ข้าม component", en: "Links signals across components" }], correctIndex: 0 } },
  { id: "ng-m-43", type: "angular", difficulty: "medium", prompt: { th: "resource() API ใน Angular 19 ใช้สำหรับอะไร", en: "What is the resource() API in Angular 19 used for?" }, explanation: { th: "resource() เป็น reactive primitive สำหรับ async data fetching ที่ทำงานร่วมกับ signals โดยอัตโนมัติ จัดการ loading, error, value states ให้ และ refetch เมื่อ dependency signal เปลี่ยน", en: "resource() is a reactive primitive for async data fetching that works with signals automatically, managing loading/error/value states and refetching when dependency signals change." }, answer: { kind: "choice", choices: [{ th: "Reactive async data fetching ที่จัดการ states และ refetch ตาม signal dependencies", en: "Reactive async data fetching managing states and refetching on signal dependencies" }, { th: "Resource module loader สำหรับ images", en: "Resource module loader for images" }, { th: "Memory resource management", en: "Memory resource management" }, { th: "ใช้แทน HttpClient ทั้งหมด", en: "Replaces HttpClient entirely" }], correctIndex: 0 } },
  { id: "ng-m-44", type: "angular", difficulty: "medium", prompt: { th: "HostDirective ใน Angular 15+ ใช้ทำอะไร", en: "What are HostDirectives in Angular 15+ used for?" }, explanation: { th: "ใช้ compose behavior จากหลาย directives เข้าด้วยกันโดย apply ไปที่ host element ของ component อัตโนมัติ เป็น composition pattern แทนการ inherit", en: "Used to compose behavior from multiple directives by auto-applying them to a component's host element. A composition pattern instead of inheritance." }, answer: { kind: "choice", choices: [{ th: "Compose behavior จากหลาย directives ที่ host element เป็น composition pattern", en: "Compose behavior from multiple directives at host element, composition pattern" }, { th: "สร้าง host component สำหรับ routing", en: "Creates host components for routing" }, { th: "เป็น directive ที่ทำงานบน server เท่านั้น", en: "Directive that only runs on server" }, { th: "Replace NgModule declarations", en: "Replaces NgModule declarations" }], correctIndex: 0 } },
  { id: "ng-m-45", type: "angular", difficulty: "medium", prompt: { th: "ใน RxJS shareReplay vs share ต่างกันอย่างไรใน Angular context", en: "How do RxJS shareReplay and share differ in Angular context?" }, explanation: { th: "shareReplay เก็บค่าล่าสุด N ค่าไว้ให้ late subscriber ได้รับทันที ส่วน share ไม่ replay ค่าเก่า late subscriber จะได้แต่ค่าใหม่ที่ emit หลังจาก subscribe", en: "shareReplay buffers the last N values for late subscribers to receive immediately. share does not replay; late subscribers only get new emissions after subscribing." }, answer: { kind: "choice", choices: [{ th: "shareReplay เก็บค่าเก่าให้ late subscriber, share ไม่ replay", en: "shareReplay buffers old values for late subscribers; share does not replay" }, { th: "share เร็วกว่า shareReplay เสมอ", en: "share is always faster than shareReplay" }, { th: "shareReplay ใช้กับ HTTP เท่านั้น", en: "shareReplay only works with HTTP" }, { th: "ไม่มีความแตกต่าง ใช้แทนกันได้", en: "No difference, interchangeable" }], correctIndex: 0 } },
  { id: "ng-m-46", type: "angular", difficulty: "medium", prompt: { th: "Incremental Hydration ใน Angular 19 ทำงานอย่างไร", en: "How does Incremental Hydration in Angular 19 work?" }, explanation: { th: "ร่วมกับ @defer blocks hydrate เฉพาะ component ที่ user interact ด้วย แทนที่จะ hydrate ทั้ง page ลด Time to Interactive (TTI) อย่างมาก", en: "Works with @defer blocks to hydrate only components the user interacts with, instead of hydrating the entire page. Significantly reduces Time to Interactive (TTI)." }, answer: { kind: "choice", choices: [{ th: "Hydrate เฉพาะ component ที่ user interact ด้วย ร่วมกับ @defer", en: "Hydrates only interacted components, works with @defer" }, { th: "Hydrate ทั้ง page แต่ทีละส่วน", en: "Hydrates entire page but part by part" }, { th: "ไม่ต้อง hydrate เลย ใช้ SSG แทน", en: "No hydration needed, uses SSG instead" }, { th: "Hydrate เฉพาะ above-the-fold content", en: "Hydrates only above-the-fold content" }], correctIndex: 0 } },
  { id: "ng-m-47", type: "angular", difficulty: "medium", prompt: { th: "toSignal() กับ toObservable() จาก rxjs-interop ใช้อย่างไร", en: "How are toSignal() and toObservable() from rxjs-interop used?" }, explanation: { th: "toSignal() แปลง Observable เป็น Signal (ต้องอยู่ใน injection context), toObservable() แปลง Signal เป็น Observable ทำให้สลับใช้ได้ระหว่าง reactive paradigms", en: "toSignal() converts Observable to Signal (must be in injection context), toObservable() converts Signal to Observable, enabling switching between reactive paradigms." }, answer: { kind: "choice", choices: [{ th: "toSignal แปลง Observable→Signal, toObservable แปลง Signal→Observable", en: "toSignal converts Observable→Signal, toObservable converts Signal→Observable" }, { th: "ทั้งสอง convert เป็น Promise", en: "Both convert to Promise" }, { th: "toSignal ใช้กับ HTTP only, toObservable ใช้กับ forms only", en: "toSignal for HTTP only, toObservable for forms only" }, { th: "เป็น deprecated API ที่ไม่ควรใช้", en: "Deprecated APIs that should not be used" }], correctIndex: 0 } },
  { id: "ng-m-48", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular CDK Virtual Scroll, trackBy ทำงานอย่างไรกับ viewport recycling", en: "In Angular CDK Virtual Scroll, how does trackBy work with viewport recycling?" }, explanation: { th: "trackBy ช่วยให้ CDK ระบุได้ว่า item ไหนยังเหมือนเดิมเมื่อ scroll ทำให้ recycle DOM nodes ได้อย่างมีประสิทธิภาพโดยไม่ destroy/recreate ถ้า identity ยังตรงกัน", en: "trackBy helps CDK identify unchanged items during scroll, efficiently recycling DOM nodes without destroy/recreate when identity still matches." }, answer: { kind: "choice", choices: [{ th: "ระบุ identity เพื่อ recycle DOM nodes อย่างมีประสิทธิภาพเมื่อ scroll", en: "Identifies items to efficiently recycle DOM nodes during scroll" }, { th: "ใช้ track scroll position เท่านั้น", en: "Only tracks scroll position" }, { th: "เป็น analytics tracking สำหรับ scroll events", en: "Analytics tracking for scroll events" }, { th: "ใช้กำหนด scroll speed", en: "Sets scroll speed" }], correctIndex: 0 } },
  { id: "ng-m-49", type: "angular", difficulty: "medium", prompt: { th: "provideHttpClient(withFetch()) ต่างจาก default XMLHttpRequest อย่างไร", en: "How does provideHttpClient(withFetch()) differ from default XMLHttpRequest?" }, explanation: { th: "ใช้ Fetch API แทน XMLHttpRequest ซึ่งรองรับ streaming, มี cleaner abort semantics และทำงานใน non-browser environments (SSR) ได้ดีกว่า", en: "Uses Fetch API instead of XMLHttpRequest, supporting streaming, cleaner abort semantics, and better non-browser environment (SSR) compatibility." }, answer: { kind: "choice", choices: [{ th: "ใช้ Fetch API รองรับ streaming และ SSR ดีกว่า", en: "Uses Fetch API, better streaming and SSR support" }, { th: "เร็วกว่า XHR เสมอ", en: "Always faster than XHR" }, { th: "รองรับ file upload ได้ดีกว่า", en: "Better file upload support" }, { th: "ไม่ต้อง CORS", en: "No CORS needed" }], correctIndex: 0 } },
  { id: "ng-m-50", type: "angular", difficulty: "medium", prompt: { th: "Self, SkipSelf, Optional, Host decorators ใน DI ต่างกันอย่างไร", en: "How do Self, SkipSelf, Optional, Host DI decorators differ?" }, explanation: { th: "Self = หาเฉพาะใน injector ตัวเอง, SkipSelf = ข้ามตัวเองไปหา parent, Optional = ถ้าหาไม่เจอ return null แทน throw, Host = หาถึงแค่ host component injector", en: "Self = search only own injector, SkipSelf = skip self go to parent, Optional = return null instead of throwing if not found, Host = search up to host component injector only." }, answer: { kind: "choice", choices: [{ th: "Self=ตัวเอง, SkipSelf=parent, Optional=null ถ้าไม่เจอ, Host=ถึง host", en: "Self=own, SkipSelf=parent, Optional=null if not found, Host=up to host" }, { th: "ทุกตัวทำหน้าที่เหมือนกันแต่ต่าง syntax", en: "All do the same thing with different syntax" }, { th: "ใช้กับ providedIn: 'root' เท่านั้น", en: "Only work with providedIn: 'root'" }, { th: "เป็น deprecated ใน Angular 17+", en: "Deprecated in Angular 17+" }], correctIndex: 0 } },
  { id: "ng-m-51", type: "angular", difficulty: "medium", prompt: { th: "FormArray กับ FormRecord ต่างกันอย่างไร", en: "How do FormArray and FormRecord differ?" }, explanation: { th: "FormArray เป็น array ของ controls จัดการด้วย index, FormRecord (Angular 14+) เป็น dynamic map ที่ key เป็น string ทุก value มี type เดียวกัน เหมาะกับ dynamic checkbox list", en: "FormArray is an array of controls managed by index. FormRecord (Angular 14+) is a dynamic map with string keys where all values share a type, ideal for dynamic checkbox lists." }, answer: { kind: "choice", choices: [{ th: "FormArray ใช้ index, FormRecord เป็น dynamic string-key map ที่ type เดียวกัน", en: "FormArray uses index; FormRecord is dynamic string-key map with same type" }, { th: "FormRecord เร็วกว่า FormArray", en: "FormRecord is faster than FormArray" }, { th: "FormArray ใช้กับ template-driven เท่านั้น", en: "FormArray only for template-driven forms" }, { th: "ไม่มีความแตกต่าง", en: "No difference" }], correctIndex: 0 } },
  { id: "ng-m-52", type: "angular", difficulty: "medium", prompt: { th: "เมื่อไหร่ควรใช้ BehaviorSubject แทน Signal ใน Angular", en: "When should you use BehaviorSubject over Signal in Angular?" }, explanation: { th: "เมื่อต้องการ features ของ Observable เช่น operators, error channel, complete semantics, หรือเมื่อต้อง share state ผ่าน async pipe กับ components ที่ยังไม่ migrate ไป signals", en: "When you need Observable features like operators, error channel, complete semantics, or sharing state via async pipe with components not yet migrated to signals." }, answer: { kind: "choice", choices: [{ th: "เมื่อต้องการ Observable features เช่น operators, error channel, complete", en: "When needing Observable features like operators, error channel, complete" }, { th: "ไม่ควรใช้เลย Signal ดีกว่าทุกกรณี", en: "Should never use; Signal is better in all cases" }, { th: "เมื่อต้องการ store ค่า primitive เท่านั้น", en: "Only when storing primitive values" }, { th: "เมื่อ component ใช้ Default change detection", en: "When component uses Default change detection" }], correctIndex: 0 } },
  { id: "ng-m-53", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular Router, paramsInheritanceStrategy: 'always' ทำอะไร", en: "What does paramsInheritanceStrategy: 'always' do in Angular Router?" }, explanation: { th: "ทำให้ child routes สามารถอ่าน params ของ parent routes ผ่าน ActivatedRoute.params ได้โดยตรง ไม่ต้องไล่ขึ้นไป parent route ทีละ level", en: "Allows child routes to read parent route params directly from ActivatedRoute.params without traversing up each parent level." }, answer: { kind: "choice", choices: [{ th: "Child routes อ่าน parent params ได้โดยตรงจาก ActivatedRoute", en: "Child routes read parent params directly from ActivatedRoute" }, { th: "Params ถูก share ข้าม sibling routes", en: "Params are shared across sibling routes" }, { th: "ทุก params ถูก inherit ไปยัง query params", en: "All params are inherited as query params" }, { th: "ป้องกัน params leak ข้าม route", en: "Prevents params leaking across routes" }], correctIndex: 0 } },
  { id: "ng-m-54", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular standalone component ทำไมต้อง import RouterModule หรือใช้ routerLink directive", en: "In standalone components, why must you import RouterModule or use routerLink directive?" }, explanation: { th: "Standalone components ไม่มี NgModule ที่ re-export directives ให้ ต้อง import ทุก dependency ที่ใช้ใน template โดยตรง รวมถึง RouterLink, RouterOutlet etc.", en: "Standalone components lack NgModule re-exports, so every template dependency must be directly imported including RouterLink, RouterOutlet, etc." }, answer: { kind: "choice", choices: [{ th: "ต้อง import ทุก template dependency โดยตรงเพราะไม่มี NgModule re-export", en: "Must directly import all template dependencies since no NgModule re-exports" }, { th: "เพื่อ enable lazy loading", en: "To enable lazy loading" }, { th: "เฉพาะ production build เท่านั้นที่ต้อง import", en: "Only production builds require import" }, { th: "Router ทำงานอัตโนมัติไม่ต้อง import", en: "Router works automatically without import" }], correctIndex: 0 } },
  { id: "ng-m-55", type: "angular", difficulty: "medium", prompt: { th: "CanDeactivate guard ใช้สำหรับอะไร", en: "What is CanDeactivate guard used for?" }, explanation: { th: "ใช้ป้องกัน user ออกจากหน้าที่มี unsaved changes เช่น form ที่ยังไม่ save แสดง confirm dialog ก่อน navigate ออก", en: "Prevents user from leaving a page with unsaved changes, like an unsaved form. Shows a confirm dialog before navigating away." }, answer: { kind: "choice", choices: [{ th: "ป้องกัน user ออกจากหน้าที่มี unsaved changes", en: "Prevents leaving page with unsaved changes" }, { th: "Deactivate component animations", en: "Deactivates component animations" }, { th: "ลบ component จาก DOM ทันที", en: "Removes component from DOM immediately" }, { th: "ป้องกัน route ถูก lazy load", en: "Prevents route from being lazy loaded" }], correctIndex: 0 } },
  { id: "ng-m-56", type: "angular", difficulty: "medium", prompt: { th: "untracked() ใน Angular signals ใช้เมื่อไหร่", en: "When is untracked() used in Angular signals?" }, explanation: { th: "ใช้อ่าน signal ภายใน reactive context (computed/effect) โดยไม่ register เป็น dependency ป้องกัน unnecessary re-computation เมื่อ signal นั้นเปลี่ยนค่า", en: "Reads a signal within a reactive context (computed/effect) without registering it as a dependency, preventing unnecessary re-computation when that signal changes." }, answer: { kind: "choice", choices: [{ th: "อ่าน signal โดยไม่ register เป็น dependency ป้องกัน unnecessary re-run", en: "Reads signal without registering as dependency, prevents unnecessary re-run" }, { th: "ลบ signal ออกจาก tracking system", en: "Removes signal from tracking system" }, { th: "ทำให้ signal เป็น readonly", en: "Makes signal readonly" }, { th: "ใช้ debug signal changes", en: "Used to debug signal changes" }], correctIndex: 0 } },
  { id: "ng-m-57", type: "angular", difficulty: "medium", prompt: { th: "ErrorHandler class ใน Angular ใช้ทำอะไร", en: "What is the ErrorHandler class used for in Angular?" }, explanation: { th: "เป็น global error handler ที่จับ uncaught errors ทั้ง app override ได้เพื่อ log errors ไปยัง external service เช่น Sentry หรือแสดง user-friendly error message", en: "A global error handler catching all uncaught errors app-wide. Override to log errors to external services like Sentry or show user-friendly error messages." }, answer: { kind: "choice", choices: [{ th: "Global error handler จับ uncaught errors ทั้ง app override เพื่อ log/report", en: "Global handler catching uncaught errors, override to log/report" }, { th: "จัดการ HTTP errors เท่านั้น", en: "Handles HTTP errors only" }, { th: "แสดง error boundary UI component", en: "Displays error boundary UI component" }, { th: "เป็น replacement สำหรับ try-catch", en: "Replacement for try-catch" }], correctIndex: 0 } },
  { id: "ng-m-58", type: "angular", difficulty: "medium", prompt: { th: "providedIn: 'platform' ใช้เมื่อไหร่", en: "When is providedIn: 'platform' used?" }, explanation: { th: "ใช้เมื่อมีหลาย Angular app ที่ share DOM (micro-frontends) ต้องการ share service เดียวกันข้าม applications บน page เดียวกัน", en: "Used when multiple Angular apps share the DOM (micro-frontends) and need to share the same service across applications on the same page." }, answer: { kind: "choice", choices: [{ th: "Share service ข้าม multiple Angular apps บน page เดียวกัน (micro-frontends)", en: "Shares service across multiple Angular apps on same page (micro-frontends)" }, { th: "ใช้กับ platform-specific code เช่น iOS/Android", en: "For platform-specific code like iOS/Android" }, { th: "เหมือน 'root' ทุกประการ", en: "Identical to 'root' in every way" }, { th: "ใช้กับ Web Workers เท่านั้น", en: "Only for Web Workers" }], correctIndex: 0 } },
  { id: "ng-m-59", type: "angular", difficulty: "medium", prompt: { th: "Zoneless Angular ต้อง configure อย่างไร", en: "How do you configure Zoneless Angular?" }, explanation: { th: "ใช้ provideExperimentalZonelessChangeDetection() ใน app config ต้อง remove zone.js จาก polyfills และใช้ signals หรือ markForCheck() เพื่อ trigger CD แทน", en: "Use provideExperimentalZonelessChangeDetection() in app config, remove zone.js from polyfills, and use signals or markForCheck() to trigger CD instead." }, answer: { kind: "choice", choices: [{ th: "provideExperimentalZonelessChangeDetection(), remove zone.js, ใช้ signals/markForCheck", en: "provideExperimentalZonelessChangeDetection(), remove zone.js, use signals/markForCheck" }, { th: "ตั้ง zone: false ใน angular.json", en: "Set zone: false in angular.json" }, { th: "ใช้ OnPush ทุก component ก็พอ", en: "Just use OnPush on every component" }, { th: "ไม่สามารถทำได้ใน Angular ปัจจุบัน", en: "Not possible in current Angular" }], correctIndex: 0 } },
  { id: "ng-m-60", type: "angular", difficulty: "medium", prompt: { th: "Route ที่ใช้ loadComponent แทน loadChildren ต่างกันอย่างไร", en: "How does a route with loadComponent differ from loadChildren?" }, explanation: { th: "loadComponent lazy load component เดียว, loadChildren lazy load ทั้ง route config (array of child routes) ใช้ loadComponent เมื่อ route มีแค่ component เดียวไม่มี children", en: "loadComponent lazy loads a single component. loadChildren lazy loads an entire route config (array of child routes). Use loadComponent when route has only one component without children." }, answer: { kind: "choice", choices: [{ th: "loadComponent = lazy load component เดียว, loadChildren = lazy load route config ทั้ง set", en: "loadComponent = lazy loads single component, loadChildren = lazy loads entire route config" }, { th: "loadComponent เร็วกว่าเสมอ", en: "loadComponent is always faster" }, { th: "loadChildren ใช้ได้กับ standalone เท่านั้น", en: "loadChildren only works with standalone" }, { th: "ไม่มีความแตกต่าง เป็น alias", en: "No difference, they are aliases" }], correctIndex: 0 } },
  { id: "ng-m-61", type: "angular", difficulty: "medium", prompt: { th: "NgOptimizedImage directive ช่วยเรื่องอะไร", en: "What does NgOptimizedImage directive help with?" }, explanation: { th: "Enforce best practices สำหรับ image loading เช่น lazy loading by default, require width/height เพื่อป้องกัน CLS, auto-generate srcset, preconnect hints", en: "Enforces image loading best practices: lazy loading by default, requires width/height to prevent CLS, auto-generates srcset, and preconnect hints." }, answer: { kind: "choice", choices: [{ th: "Enforce image best practices: lazy load, prevent CLS, srcset, preconnect", en: "Enforces image best practices: lazy load, prevent CLS, srcset, preconnect" }, { th: "Compress images at build time", en: "Compresses images at build time" }, { th: "Convert images to WebP format", en: "Converts images to WebP format" }, { th: "เป็น CDN connector", en: "CDN connector" }], correctIndex: 0 } },
  { id: "ng-m-62", type: "angular", difficulty: "medium", prompt: { th: "ใน RxJS exhaustMap ใช้เมื่อไหร่ใน Angular", en: "When is exhaustMap used in Angular RxJS?" }, explanation: { th: "ใช้เมื่อต้องการ ignore emissions ใหม่ขณะที่ inner Observable ยังทำงานอยู่ เช่น ป้องกัน double submit form หรือ prevent duplicate HTTP requests", en: "Used to ignore new emissions while inner Observable is still active, like preventing double form submit or duplicate HTTP requests." }, answer: { kind: "choice", choices: [{ th: "Ignore emissions ใหม่ขณะ inner Observable ยังทำงาน เช่น ป้องกัน double submit", en: "Ignores new emissions while inner is active, e.g., prevent double submit" }, { th: "ทำงานเหมือน switchMap ทุกประการ", en: "Works identically to switchMap" }, { th: "ใช้เมื่อต้องการ parallel requests", en: "Used when parallel requests are needed" }, { th: "ใช้สำหรับ error recovery เท่านั้น", en: "Only used for error recovery" }], correctIndex: 0 } },
  { id: "ng-m-63", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular testing, ComponentFixture.detectChanges() ทำอะไร", en: "In Angular testing, what does ComponentFixture.detectChanges() do?" }, explanation: { th: "Trigger change detection cycle บน component ที่กำลัง test ทำให้ template update ตาม data ที่เปลี่ยน ถ้าไม่เรียก template จะยังแสดงค่าเริ่มต้น", en: "Triggers a change detection cycle on the tested component, updating the template with changed data. Without calling it, template shows initial values." }, answer: { kind: "choice", choices: [{ th: "Trigger CD cycle ให้ template update ถ้าไม่เรียกจะเห็นแค่ค่าเริ่มต้น", en: "Triggers CD cycle to update template; without it only initial values show" }, { th: "Detect test failures", en: "Detects test failures" }, { th: "Re-create component instance", en: "Re-creates component instance" }, { th: "Run all async operations", en: "Runs all async operations" }], correctIndex: 0 } },
  { id: "ng-m-64", type: "angular", difficulty: "medium", prompt: { th: "CanMatch guard ต่างจาก CanActivate อย่างไร", en: "How does CanMatch guard differ from CanActivate?" }, explanation: { th: "CanMatch ตัดสินใจว่า route นี้ match กับ URL หรือไม่ ถ้า return false Router จะลอง route ถัดไป ส่วน CanActivate ทำงานหลัง match แล้วและ reject จะแสดง error/redirect", en: "CanMatch decides if the route matches the URL; returning false makes Router try next route. CanActivate runs after match and rejection shows error/redirect." }, answer: { kind: "choice", choices: [{ th: "CanMatch ตัดสินว่า route match ไหม return false ลอง route ถัดไป", en: "CanMatch decides if route matches; false tries next route" }, { th: "CanMatch เร็วกว่า CanActivate", en: "CanMatch is faster than CanActivate" }, { th: "CanMatch ใช้กับ lazy routes เท่านั้น", en: "CanMatch only for lazy routes" }, { th: "ไม่มีความแตกต่าง", en: "No difference" }], correctIndex: 0 } },
  { id: "ng-m-65", type: "angular", difficulty: "medium", prompt: { th: "ngOnChanges ได้รับ SimpleChanges object ที่มีข้อมูลอะไร", en: "What information does the SimpleChanges object in ngOnChanges contain?" }, explanation: { th: "มี previousValue, currentValue, firstChange (boolean) สำหรับแต่ละ @Input ที่เปลี่ยน ทำให้สามารถเปรียบเทียบค่าเก่ากับใหม่และรู้ว่าเป็นการเปลี่ยนครั้งแรกหรือไม่", en: "Contains previousValue, currentValue, firstChange (boolean) for each changed @Input, enabling comparison of old vs new values and knowing if it's the first change." }, answer: { kind: "choice", choices: [{ th: "previousValue, currentValue, firstChange สำหรับแต่ละ @Input ที่เปลี่ยน", en: "previousValue, currentValue, firstChange for each changed @Input" }, { th: "เฉพาะ currentValue เท่านั้น", en: "Only currentValue" }, { th: "ทุก @Input ไม่ว่าจะเปลี่ยนหรือไม่", en: "All @Inputs whether changed or not" }, { th: "เฉพาะ property names ที่เปลี่ยน", en: "Only property names that changed" }], correctIndex: 0 } },
  { id: "ng-m-66", type: "angular", difficulty: "medium", prompt: { th: "ng-container vs ng-template ต่างกันอย่างไร", en: "How do ng-container and ng-template differ?" }, explanation: { th: "ng-container render content ทันทีโดยไม่สร้าง DOM element เพิ่ม ส่วน ng-template ไม่ render เลยจนกว่าจะถูก reference (เช่น ผ่าน ngIf else, ngTemplateOutlet)", en: "ng-container renders content immediately without creating extra DOM elements. ng-template does not render until referenced (e.g., via ngIf else, ngTemplateOutlet)." }, answer: { kind: "choice", choices: [{ th: "ng-container render ทันทีไม่มี extra DOM, ng-template ไม่ render จนถูก reference", en: "ng-container renders immediately no extra DOM; ng-template doesn't render until referenced" }, { th: "ng-template เร็วกว่า ng-container", en: "ng-template is faster than ng-container" }, { th: "ng-container ใช้กับ structural directives เท่านั้น", en: "ng-container only for structural directives" }, { th: "ไม่มีความแตกต่าง", en: "No difference" }], correctIndex: 0 } },
  { id: "ng-m-67", type: "angular", difficulty: "medium", prompt: { th: "ทำไม trackBy ใน *ngFor ถึงสำคัญสำหรับ performance", en: "Why is trackBy in *ngFor important for performance?" }, explanation: { th: "ถ้าไม่มี trackBy Angular ใช้ object identity เป็น default ทำให้เมื่อ array ถูก replace (เช่น จาก HTTP response ใหม่) ทุก DOM element ถูก destroy/recreate trackBy ใช้ stable key เพื่อ reuse DOM", en: "Without trackBy, Angular uses object identity as default, so when array is replaced (e.g., new HTTP response) all DOM elements are destroyed/recreated. trackBy uses a stable key to reuse DOM." }, answer: { kind: "choice", choices: [{ th: "ใช้ stable key เพื่อ reuse DOM เมื่อ array reference เปลี่ยน", en: "Uses stable key to reuse DOM when array reference changes" }, { th: "เพิ่ม virtual scrolling อัตโนมัติ", en: "Adds automatic virtual scrolling" }, { th: "ลด memory usage ของ component", en: "Reduces component memory usage" }, { th: "ทำให้ *ngFor ทำงานแบบ async", en: "Makes *ngFor work asynchronously" }], correctIndex: 0 } },
  { id: "ng-m-68", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular Forms, setErrors vs setValidators ต่างกันอย่างไร", en: "In Angular Forms, how do setErrors and setValidators differ?" }, explanation: { th: "setErrors ตั้ง error state โดยตรง (manual override) ถูก clear เมื่อ user แก้ค่า ส่วน setValidators ตั้ง validation functions ที่จะถูกเรียกทุกครั้งที่ค่าเปลี่ยน", en: "setErrors directly sets error state (manual override), cleared when user changes value. setValidators sets validation functions called every time value changes." }, answer: { kind: "choice", choices: [{ th: "setErrors = manual error override ชั่วคราว, setValidators = ตั้ง validation functions ถาวร", en: "setErrors = temporary manual override, setValidators = permanent validation functions" }, { th: "ทั้งสองทำหน้าที่เดียวกัน", en: "Both do the same thing" }, { th: "setErrors ใช้กับ async validation เท่านั้น", en: "setErrors only for async validation" }, { th: "setValidators ทำงานครั้งเดียว", en: "setValidators runs only once" }], correctIndex: 0 } },
  { id: "ng-m-69", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular CDK Overlay, PositionStrategy มีกี่แบบและต่างกันอย่างไร", en: "In Angular CDK Overlay, what PositionStrategy types exist and how do they differ?" }, explanation: { th: "GlobalPositionStrategy = position fixed/absolute ตำแหน่ง global (เช่น center of screen), FlexibleConnectedPositionStrategy = ผูกกับ element อ้างอิง (เช่น dropdown, tooltip)", en: "GlobalPositionStrategy = fixed/absolute positioning globally (e.g., center of screen). FlexibleConnectedPositionStrategy = attached to a reference element (e.g., dropdown, tooltip)." }, answer: { kind: "choice", choices: [{ th: "Global = position fixed ตำแหน่ง global, FlexibleConnected = ผูกกับ element อ้างอิง", en: "Global = fixed positioning globally, FlexibleConnected = attached to reference element" }, { th: "มีแบบเดียวคือ absolute positioning", en: "Only one type: absolute positioning" }, { th: "Static = ไม่เคลื่อนที่, Dynamic = ตาม scroll", en: "Static = no movement, Dynamic = follows scroll" }, { th: "Top, Bottom, Left, Right", en: "Top, Bottom, Left, Right" }], correctIndex: 0 } },
  { id: "ng-m-70", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular ทำไม markForCheck() ถึงต่างจาก detectChanges()", en: "In Angular, why does markForCheck() differ from detectChanges()?" }, explanation: { th: "markForCheck() แค่ mark component และ ancestors ว่าต้อง check รอ CD cycle ถัดไป ส่วน detectChanges() trigger CD ทันทีบน component นั้นและ children synchronously", en: "markForCheck() only marks component and ancestors for checking in the next CD cycle. detectChanges() triggers CD immediately on that component and children synchronously." }, answer: { kind: "choice", choices: [{ th: "markForCheck = mark รอ CD ถัดไป, detectChanges = trigger CD ทันทีแบบ sync", en: "markForCheck = marks for next CD, detectChanges = triggers CD immediately sync" }, { th: "ทำงานเหมือนกันทุกประการ", en: "Work identically in every way" }, { th: "markForCheck ใช้กับ Default CD เท่านั้น", en: "markForCheck only for Default CD" }, { th: "detectChanges ใช้กับ OnPush เท่านั้น", en: "detectChanges only for OnPush" }], correctIndex: 0 } },
  { id: "ng-m-71", type: "angular", difficulty: "medium", prompt: { th: "inject(DestroyRef) ใช้ทำอะไร", en: "What is inject(DestroyRef) used for?" }, explanation: { th: "ใช้ register callback ที่จะทำงานเมื่อ component/directive/service ถูก destroy เป็น alternative ของ ngOnDestroy ที่ใช้ได้ใน function context", en: "Registers a callback to run when component/directive/service is destroyed. An alternative to ngOnDestroy usable in function contexts." }, answer: { kind: "choice", choices: [{ th: "Register cleanup callback เมื่อ destroy เป็น alternative ของ ngOnDestroy ในfunction context", en: "Registers cleanup callback on destroy, alternative to ngOnDestroy in function context" }, { th: "Destroy component ทันที", en: "Immediately destroys component" }, { th: "ใช้ detect memory leaks", en: "Detects memory leaks" }, { th: "Reference ถึง parent component ที่กำลังจะ destroy", en: "References parent component about to destroy" }], correctIndex: 0 } },
  { id: "ng-m-72", type: "angular", difficulty: "medium", prompt: { th: "Content projection กับ multi-slot projection ต่างกันอย่างไร", en: "How does single-slot vs multi-slot content projection differ?" }, explanation: { th: "Single slot ใช้ <ng-content> เดียวรับทุกอย่าง, multi-slot ใช้ select attribute เพื่อเลือกว่า content ไหนไปอยู่ slot ไหน เช่น select='[header]' select='.footer'", en: "Single slot uses one <ng-content> accepting everything. Multi-slot uses select attribute to route content to specific slots, like select='[header]' select='.footer'." }, answer: { kind: "choice", choices: [{ th: "Multi-slot ใช้ select attribute เลือก content ไปแต่ละ slot", en: "Multi-slot uses select attribute to route content to each slot" }, { th: "Multi-slot ช้ากว่า single slot มาก", en: "Multi-slot is much slower than single slot" }, { th: "ใช้ *ngIf เพื่อสร้าง multi-slot", en: "Use *ngIf to create multi-slot" }, { th: "Angular ไม่รองรับ multi-slot", en: "Angular does not support multi-slot" }], correctIndex: 0 } },
  { id: "ng-m-73", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular Router, Title strategy ใช้อย่างไร", en: "How is the Title strategy used in Angular Router?" }, explanation: { th: "ตั้ง title property ใน route config และ provide TitleStrategy เพื่อ customize behavior (เช่น prepend app name) Router จะ update document.title อัตโนมัติเมื่อ navigate", en: "Set title property in route config and provide TitleStrategy to customize behavior (e.g., prepend app name). Router auto-updates document.title on navigation." }, answer: { kind: "choice", choices: [{ th: "ตั้ง title ใน route config + TitleStrategy เพื่อ auto-update document.title", en: "Set title in route config + TitleStrategy to auto-update document.title" }, { th: "ใช้ meta tag service แทน", en: "Use meta tag service instead" }, { th: "ต้อง update title ด้วย ngOnInit เท่านั้น", en: "Must update title in ngOnInit only" }, { th: "Angular ไม่มี built-in title management", en: "Angular has no built-in title management" }], correctIndex: 0 } },
  { id: "ng-m-74", type: "angular", difficulty: "medium", prompt: { th: "Dependency Injection resolution order ใน Angular เป็นอย่างไร", en: "What is the DI resolution order in Angular?" }, explanation: { th: "เริ่มจาก ElementInjector ของ component ปัจจุบัน → ขึ้นไป parent ElementInjector → ถึง root → EnvironmentInjector (Module) → Platform → NullInjector (throw error)", en: "Starts at current component's ElementInjector → up to parent ElementInjector → root → EnvironmentInjector (Module) → Platform → NullInjector (throws error)." }, answer: { kind: "choice", choices: [{ th: "Element → Parent Element → Root → Environment → Platform → NullInjector", en: "Element → Parent Element → Root → Environment → Platform → NullInjector" }, { th: "Root → Module → Component", en: "Root → Module → Component" }, { th: "Component → Module → Root", en: "Component → Module → Root" }, { th: "Random order ที่ Angular เลือก", en: "Random order chosen by Angular" }], correctIndex: 0 } },
  { id: "ng-m-75", type: "angular", difficulty: "medium", prompt: { th: "ใน RxJS combineLatest vs forkJoin ต่างกันอย่างไร", en: "How do RxJS combineLatest and forkJoin differ?" }, explanation: { th: "combineLatest emit ทุกครั้งที่ source ตัวใดตัวหนึ่งเปลี่ยน (ต้อง emit อย่างน้อย 1 ครั้งทุกตัว), forkJoin emit ครั้งเดียวเมื่อทุก source complete", en: "combineLatest emits every time any source changes (all must emit at least once). forkJoin emits once when all sources complete." }, answer: { kind: "choice", choices: [{ th: "combineLatest emit ทุกครั้งที่ source เปลี่ยน, forkJoin emit ครั้งเดียวเมื่อ complete", en: "combineLatest emits on every source change; forkJoin emits once on complete" }, { th: "ทำงานเหมือนกัน", en: "Work the same" }, { th: "forkJoin ใช้กับ HTTP เท่านั้น", en: "forkJoin only for HTTP" }, { th: "combineLatest ใช้กับ 2 sources เท่านั้น", en: "combineLatest only for 2 sources" }], correctIndex: 0 } },
  { id: "ng-m-76", type: "angular", difficulty: "medium", prompt: { th: "providedIn: 'root' ต่างจากการ provide ใน Component providers อย่างไรในเรื่อง tree-shaking", en: "How does providedIn: 'root' differ from Component providers regarding tree-shaking?" }, explanation: { th: "providedIn: 'root' เป็น tree-shakable ถ้าไม่มี component inject ก็ไม่ถูกรวมใน bundle ส่วน Component providers ถูกรวมเสมอเพราะ bundler เห็นว่า reference อยู่ใน decorator", en: "providedIn: 'root' is tree-shakable; if no component injects it, it's excluded from bundle. Component providers are always included because the bundler sees the reference in the decorator." }, answer: { kind: "choice", choices: [{ th: "providedIn: 'root' tree-shakable ถ้าไม่ inject ไม่ถูกรวม, Component providers รวมเสมอ", en: "providedIn: 'root' is tree-shakable if not injected; Component providers always included" }, { th: "Component providers tree-shakable ดีกว่า", en: "Component providers are more tree-shakable" }, { th: "ทั้งสอง tree-shakable เท่ากัน", en: "Both equally tree-shakable" }, { th: "ไม่มี tree-shaking สำหรับ services", en: "No tree-shaking for services" }], correctIndex: 0 } },
  { id: "ng-m-77", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular Testing, TestBed.overrideComponent ใช้ทำอะไร", en: "What is TestBed.overrideComponent used for in Angular Testing?" }, explanation: { th: "ใช้ override providers, template หรือ imports ของ component ใน test เช่น replace real service ด้วย mock หรือ simplify template เพื่อ isolate behavior ที่จะ test", en: "Overrides providers, template, or imports of a component in tests. Like replacing real services with mocks or simplifying templates to isolate behavior under test." }, answer: { kind: "choice", choices: [{ th: "Override providers/template/imports ใน test เช่น replace service ด้วย mock", en: "Overrides providers/template/imports in test, e.g., replacing service with mock" }, { th: "Override component ใน production", en: "Overrides component in production" }, { th: "ใช้ override CSS styles เท่านั้น", en: "Only overrides CSS styles" }, { th: "Create shallow component rendering", en: "Creates shallow component rendering" }], correctIndex: 0 } },
  { id: "ng-m-78", type: "angular", difficulty: "medium", prompt: { th: "ViewEncapsulation มีกี่แบบและแต่ละแบบทำงานอย่างไร", en: "How many ViewEncapsulation modes exist and how does each work?" }, explanation: { th: "Emulated (default) = เพิ่ม attribute unique ให้ CSS scope เฉพาะ component, None = ไม่ encapsulate (global CSS), ShadowDom = ใช้ browser Shadow DOM จริง", en: "Emulated (default) = adds unique attributes for component-scoped CSS. None = no encapsulation (global CSS). ShadowDom = uses real browser Shadow DOM." }, answer: { kind: "choice", choices: [{ th: "Emulated=attribute scoping, None=global CSS, ShadowDom=browser Shadow DOM", en: "Emulated=attribute scoping, None=global CSS, ShadowDom=browser Shadow DOM" }, { th: "มีแบบเดียวคือ Emulated", en: "Only one: Emulated" }, { th: "Scoped, Global, Isolated", en: "Scoped, Global, Isolated" }, { th: "CSS Modules, Inline, External", en: "CSS Modules, Inline, External" }], correctIndex: 0 } },
  { id: "ng-m-79", type: "angular", difficulty: "medium", prompt: { th: "ใน NgRx, selectSignal ต่างจาก select pipe อย่างไร", en: "In NgRx, how does selectSignal differ from select pipe?" }, explanation: { th: "selectSignal return Signal แทน Observable ทำให้ใช้ใน template ได้ทันทีโดยไม่ต้อง async pipe เหมาะกับ signal-based components", en: "selectSignal returns a Signal instead of Observable, usable directly in templates without async pipe. Ideal for signal-based components." }, answer: { kind: "choice", choices: [{ th: "Return Signal แทน Observable ใช้ใน template ได้ทันทีไม่ต้อง async pipe", en: "Returns Signal instead of Observable, directly usable in template without async pipe" }, { th: "เร็วกว่า select pipe 10 เท่า", en: "10x faster than select pipe" }, { th: "ใช้กับ feature state เท่านั้น", en: "Only for feature state" }, { th: "เป็น deprecated API", en: "Deprecated API" }], correctIndex: 0 } },
  { id: "ng-m-80", type: "angular", difficulty: "medium", prompt: { th: "Dynamic component loading ใน Angular 16+ ทำอย่างไร", en: "How is dynamic component loading done in Angular 16+?" }, explanation: { th: "ใช้ ViewContainerRef.createComponent() โดยตรงกับ component class (ไม่ต้อง ComponentFactory อีกต่อไป) หรือใช้ NgComponentOutlet directive ใน template", en: "Use ViewContainerRef.createComponent() directly with component class (no ComponentFactory needed anymore), or NgComponentOutlet directive in templates." }, answer: { kind: "choice", choices: [{ th: "ViewContainerRef.createComponent(ComponentClass) หรือ NgComponentOutlet", en: "ViewContainerRef.createComponent(ComponentClass) or NgComponentOutlet" }, { th: "ต้องใช้ ComponentFactoryResolver เสมอ", en: "Must always use ComponentFactoryResolver" }, { th: "ใช้ document.createElement", en: "Use document.createElement" }, { th: "ไม่สามารถทำ dynamic loading ใน standalone", en: "Cannot do dynamic loading in standalone" }], correctIndex: 0 } },
  { id: "ng-m-81", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular, ChangeDetectorRef.detach() ใช้เมื่อไหร่", en: "When is ChangeDetectorRef.detach() used in Angular?" }, explanation: { th: "ใช้ถอด component ออกจาก CD tree ทั้งหมด ต้อง trigger manual ด้วย detectChanges() เหมาะกับ component ที่ update ไม่บ่อยเช่น static dashboard widgets", en: "Detaches component from the CD tree entirely, requiring manual detectChanges() triggers. Suitable for components that update infrequently like static dashboard widgets." }, answer: { kind: "choice", choices: [{ th: "ถอดจาก CD tree ต้อง trigger manual เหมาะกับ component ที่ update ไม่บ่อย", en: "Detaches from CD tree, needs manual trigger, for infrequently updating components" }, { th: "ทำให้ component invisible", en: "Makes component invisible" }, { th: "Remove component จาก DOM", en: "Removes component from DOM" }, { th: "หยุด memory allocation ของ component", en: "Stops component memory allocation" }], correctIndex: 0 } },
  { id: "ng-m-82", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular ทำไมไม่ควร subscribe ใน constructor", en: "In Angular, why should you avoid subscribing in the constructor?" }, explanation: { th: "Constructor ทำงานก่อน Angular initialize @Input values และก่อน lifecycle hooks ถ้า subscribe แล้ว emit ค่าทันที อาจอ่าน Input ที่ยังเป็น undefined", en: "Constructor runs before Angular initializes @Input values and before lifecycle hooks. If subscribing and emitting immediately, may read Inputs that are still undefined." }, answer: { kind: "choice", choices: [{ th: "Constructor ทำงานก่อน @Input ถูก set อาจอ่านค่า undefined", en: "Constructor runs before @Input is set, may read undefined values" }, { th: "Constructor ไม่รองรับ async operations", en: "Constructor doesn't support async operations" }, { th: "เป็น convention เท่านั้น ไม่มีผลทาง technical", en: "Just convention, no technical effect" }, { th: "subscribe ใน constructor ทำให้ memory leak", en: "Subscribing in constructor causes memory leak" }], correctIndex: 0 } },
  { id: "ng-m-83", type: "angular", difficulty: "medium", prompt: { th: "Token forwarding ด้วย useExisting ใน providers ใช้เมื่อไหร่", en: "When is useExisting token forwarding used in providers?" }, explanation: { th: "ใช้เมื่อต้องการให้ 2 tokens ชี้ไปที่ instance เดียวกัน เช่น provide abstract class ที่ชี้ไปหา concrete implementation ที่ registered แล้ว ไม่สร้าง instance ใหม่", en: "Used when two tokens should point to the same instance, like providing an abstract class pointing to an already-registered concrete implementation without creating a new instance." }, answer: { kind: "choice", choices: [{ th: "ให้ 2 tokens ชี้ instance เดียวกัน ไม่สร้างใหม่ เช่น abstract → concrete", en: "Makes 2 tokens point to same instance, no new creation, e.g., abstract → concrete" }, { th: "สร้าง alias สำหรับ import path", en: "Creates alias for import paths" }, { th: "ใช้ override existing service", en: "Overrides existing service" }, { th: "เป็น deprecated ให้ใช้ useClass แทน", en: "Deprecated, use useClass instead" }], correctIndex: 0 } },
  { id: "ng-m-84", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular i18n, $localize ใช้อย่างไร", en: "How is $localize used in Angular i18n?" }, explanation: { th: "$localize เป็น tagged template literal ที่ mark string สำหรับ translation ทำงานได้ทั้งใน TypeScript code (ไม่ใช่แค่ template) extract ด้วย ng extract-i18n", en: "$localize is a tagged template literal marking strings for translation, working in TypeScript code (not just templates). Extracted via ng extract-i18n." }, answer: { kind: "choice", choices: [{ th: "Tagged template literal mark string สำหรับ translation ใช้ได้ใน TS code", en: "Tagged template literal marking strings for translation, usable in TS code" }, { th: "ใช้ set locale ของ app", en: "Sets app locale" }, { th: "Import translations จาก JSON file", en: "Imports translations from JSON file" }, { th: "ใช้กับ template เท่านั้น", en: "Only for templates" }], correctIndex: 0 } },
  { id: "ng-m-85", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular, DOCUMENT token ใช้ทำอะไร", en: "What is the DOCUMENT token used for in Angular?" }, explanation: { th: "เป็น DI token สำหรับ inject document object แทนการ access window.document โดยตรง ทำให้ code ทำงานได้ทั้ง browser และ server (SSR) เพราะ server ไม่มี window", en: "DI token for injecting document object instead of directly accessing window.document. Makes code work in both browser and server (SSR) since server has no window." }, answer: { kind: "choice", choices: [{ th: "Inject document object ผ่าน DI ทำให้ code SSR-compatible", en: "Injects document object via DI, making code SSR-compatible" }, { th: "สร้าง virtual DOM document", en: "Creates virtual DOM document" }, { th: "ใช้สำหรับ document-level event listeners เท่านั้น", en: "Only for document-level event listeners" }, { th: "เป็น reference ถึง README document", en: "References the README document" }], correctIndex: 0 } },
  { id: "ng-m-86", type: "angular", difficulty: "medium", prompt: { th: "Preloading Strategy ใน Angular Router มีกี่แบบ", en: "What Preloading Strategies exist in Angular Router?" }, explanation: { th: "PreloadAllModules = preload ทุก lazy modules หลัง initial load, NoPreloading = ไม่ preload เลย, หรือ custom strategy เช่น preload เฉพาะ route ที่มี data: { preload: true }", en: "PreloadAllModules = preloads all lazy modules after initial load. NoPreloading = no preload. Or custom strategy, e.g., only preload routes with data: { preload: true }." }, answer: { kind: "choice", choices: [{ th: "PreloadAll = ทั้งหมด, NoPreloading = ไม่ preload, หรือ custom strategy", en: "PreloadAll = all, NoPreloading = none, or custom strategy" }, { th: "มีแบบเดียวคือ PreloadAll", en: "Only PreloadAll exists" }, { th: "Eager, Lazy, OnDemand", en: "Eager, Lazy, OnDemand" }, { th: "Angular ไม่มี preloading", en: "Angular has no preloading" }], correctIndex: 0 } },
  { id: "ng-m-87", type: "angular", difficulty: "medium", prompt: { th: "ทำไม HttpClient return Cold Observable", en: "Why does HttpClient return Cold Observables?" }, explanation: { th: "Cold Observable ไม่ส่ง request จนกว่าจะ subscribe ทำให้สามารถ compose operators ก่อน execute และแต่ละ subscription ได้ response อิสระจากกัน", en: "Cold Observables don't send requests until subscribed, allowing operator composition before execution. Each subscription gets an independent response." }, answer: { kind: "choice", choices: [{ th: "ไม่ส่ง request จนกว่า subscribe ทำให้ compose ก่อนได้และแต่ละ sub อิสระ", en: "Doesn't request until subscribe, enables pre-composition, each sub is independent" }, { th: "เพราะ HTTP เป็น cold protocol", en: "Because HTTP is a cold protocol" }, { th: "เพื่อประหยัด bandwidth", en: "To save bandwidth" }, { th: "เป็น Angular design flaw", en: "It's an Angular design flaw" }], correctIndex: 0 } },
  { id: "ng-m-88", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular Router, UrlTree ใช้ทำอะไร", en: "What is UrlTree used for in Angular Router?" }, explanation: { th: "เป็น parsed representation ของ URL ที่ Router เข้าใจ ใช้ใน guards เพื่อ redirect (return UrlTree แทน boolean false) และใน router.createUrlTree() สำหรับ programmatic navigation", en: "A parsed URL representation the Router understands. Used in guards for redirects (return UrlTree instead of boolean false) and in router.createUrlTree() for programmatic navigation." }, answer: { kind: "choice", choices: [{ th: "Parsed URL representation ใช้ใน guards เพื่อ redirect และ programmatic navigation", en: "Parsed URL representation for guard redirects and programmatic navigation" }, { th: "DOM tree ของ component", en: "Component DOM tree" }, { th: "Route configuration tree", en: "Route configuration tree" }, { th: "ใช้สำหรับ SEO sitemap generation", en: "For SEO sitemap generation" }], correctIndex: 0 } },
  { id: "ng-m-89", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular, ElementRef กับ Renderer2 ควรใช้อย่างไร", en: "How should ElementRef and Renderer2 be used in Angular?" }, explanation: { th: "ElementRef ให้ direct access ถึง native DOM element (ไม่ safe สำหรับ SSR/Web Worker) ควรใช้ Renderer2 แทนเพื่อ abstract DOM manipulation ให้ platform-agnostic", en: "ElementRef gives direct access to native DOM element (not safe for SSR/Web Worker). Use Renderer2 instead to abstract DOM manipulation for platform-agnostic code." }, answer: { kind: "choice", choices: [{ th: "ElementRef = direct DOM access (ไม่ safe SSR), ใช้ Renderer2 แทนเพื่อ platform-agnostic", en: "ElementRef = direct DOM (not SSR-safe), use Renderer2 for platform-agnostic" }, { th: "ElementRef ดีกว่าเสมอ", en: "ElementRef is always better" }, { th: "Renderer2 ช้ากว่าจึงไม่ควรใช้", en: "Renderer2 is slower so avoid it" }, { th: "ทั้งสอง deprecated ใน Angular 17", en: "Both deprecated in Angular 17" }], correctIndex: 0 } },
  { id: "ng-m-90", type: "angular", difficulty: "medium", prompt: { th: "ใน Angular Service Worker, SwUpdate.versionUpdates ใช้ทำอะไร", en: "What is SwUpdate.versionUpdates used for in Angular Service Worker?" }, explanation: { th: "เป็น Observable ที่แจ้งเมื่อมี app version ใหม่พร้อมใช้งาน ทำให้สามารถ prompt user ให้ reload เพื่ออัพเดทหรือ force refresh อัตโนมัติ", en: "Observable that notifies when a new app version is available, enabling prompting user to reload for update or auto-force refresh." }, answer: { kind: "choice", choices: [{ th: "Observable แจ้งเมื่อมี version ใหม่ เพื่อ prompt user ให้ reload", en: "Observable notifying of new version, to prompt user to reload" }, { th: "อัพเดท package.json version อัตโนมัติ", en: "Auto-updates package.json version" }, { th: "ใช้ check API version compatibility", en: "Checks API version compatibility" }, { th: "ใช้กับ Angular CLI update command", en: "Used with Angular CLI update command" }], correctIndex: 0 } },
];
