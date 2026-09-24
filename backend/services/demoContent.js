// Realistic, hand-crafted demo/fallback content used when ANTHROPIC_API_KEY is not set
// or when a live call fails. Keeps the whole app fully demoable without a real API key.

function topicKey(topic = '') {
  return (topic || '').toLowerCase();
}

const RICH_TOPICS = {
  normalization: {
    match: (t) => t.includes('normaliz'),
    explain: `## Normalization (DBMS)

**Definition:** Normalization is the process of organizing data in a relational database to reduce data redundancy and improve data integrity by dividing large tables into smaller, related tables and defining relationships between them.

**Why it is needed:**
- Eliminates redundant (duplicate) data
- Prevents update, insert, and delete anomalies
- Ensures data dependencies make logical sense
- Saves storage space and improves consistency

**Working:** Normalization is carried out in stages called **Normal Forms (NF)**, each building on the previous one by removing a specific type of redundancy.

**Types (Normal Forms):**
1. **1NF (First Normal Form):** Each column must hold atomic (indivisible) values; no repeating groups.
2. **2NF (Second Normal Form):** Must be in 1NF, and every non-key attribute must be fully functionally dependent on the whole primary key (removes partial dependency).
3. **3NF (Third Normal Form):** Must be in 2NF, and no transitive dependency of non-key attributes on the primary key.
4. **BCNF (Boyce-Codd Normal Form):** A stricter version of 3NF where every determinant must be a candidate key.

**Example:** Consider a table \`Student_Course(StudentID, StudentName, CourseID, CourseName, Instructor)\`. Here, \`CourseName\` and \`Instructor\` depend only on \`CourseID\`, not the full key. This is a partial dependency, so it violates 2NF. We split it into \`Student(StudentID, StudentName)\`, \`Course(CourseID, CourseName, Instructor)\`, and \`Enrollment(StudentID, CourseID)\`.

**Real-world analogy:** Think of a filing cabinet. Instead of writing a teacher's full contact details on every single student's file (causing repetition and risk of mismatched updates), you keep one "Teachers" folder and simply reference the teacher's ID in each student's file.

**Advantages:** Less redundancy, better consistency, smaller storage footprint, easier maintenance.
**Disadvantages:** More tables mean more JOIN operations, which can reduce read performance for very large systems (sometimes intentionally denormalized for performance).

**Exam points:**
- Define normalization and state its purpose (2 marks)
- List and briefly explain 1NF, 2NF, 3NF, BCNF with one example each (4-6 marks)
- Mention anomalies avoided: insertion, deletion, update anomalies
- Draw the dependency diagram if asked for full marks`,
    summary: `**Short summary:** Normalization organizes relational database tables to minimize redundancy and dependency by splitting large tables into smaller ones connected by relationships.

**Key points:**
- Reduces data redundancy and anomalies
- Achieved through Normal Forms: 1NF, 2NF, 3NF, BCNF
- Each NF removes a specific type of dependency issue

**Important definitions:**
- *Functional Dependency:* A relationship where one attribute uniquely determines another
- *Partial Dependency:* Non-key attribute depends on only part of a composite key
- *Transitive Dependency:* Non-key attribute depends on another non-key attribute

**Important formulas/rules:** X → Y (X functionally determines Y); BCNF requires X to be a super key for every dependency X → Y.

**Exam points:** Always state definition, then explain each normal form with a short example table.`,
  },
  deadlock: {
    match: (t) => t.includes('deadlock'),
    explain: `## Deadlock (Operating Systems)

**Definition:** A deadlock is a situation in a multiprogramming environment where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process in the same set, so none of them can proceed.

**Why it happens:** It occurs when multiple processes compete for a limited number of shared resources (like memory, files, or CPU) and the request/allocation sequence creates a circular wait.

**Necessary conditions (Coffman conditions) — all four must hold simultaneously:**
1. **Mutual Exclusion:** At least one resource is held in a non-shareable mode.
2. **Hold and Wait:** A process holding a resource is waiting to acquire additional resources held by others.
3. **No Preemption:** A resource cannot be forcibly taken away; it must be released voluntarily.
4. **Circular Wait:** A closed chain of processes exists, each waiting for a resource held by the next.

**Example:** Process P1 holds Resource R1 and requests R2. Process P2 holds R2 and requests R1. Neither can proceed — a classic circular wait deadlock.

**Real-world analogy:** Two cars meet on a single-lane bridge from opposite ends. Each is waiting for the other to reverse, but neither will move — they are stuck exactly like deadlocked processes.

**Handling deadlocks:**
- **Prevention:** Design the system so at least one Coffman condition can never hold.
- **Avoidance:** Use algorithms like the **Banker's Algorithm** to only grant requests that keep the system in a safe state.
- **Detection and Recovery:** Allow deadlocks to occur, detect them via resource-allocation graphs, then recover by process termination or resource preemption.
- **Ignorance (Ostrich Algorithm):** Assume deadlocks are rare and simply ignore them (used by some general-purpose OSes).

**Exam points:**
- Define deadlock and draw a resource allocation graph (2-4 marks)
- List all four Coffman/necessary conditions (4 marks)
- Explain any one handling method in detail, e.g. Banker's Algorithm (4-6 marks)`,
    summary: `**Short summary:** Deadlock is a state where a group of processes are stuck permanently, each waiting for a resource held by another process in the same group.

**Key points:**
- Caused by circular resource dependency among processes
- Four necessary conditions must hold together: mutual exclusion, hold-and-wait, no preemption, circular wait
- Handled via prevention, avoidance (Banker's Algorithm), detection & recovery, or ignoring it

**Important definitions:**
- *Safe State:* A state where the system can allocate resources to each process in some order and avoid deadlock
- *Resource Allocation Graph (RAG):* A graph showing process-resource assignment and request edges used to detect cycles

**Important formulas/rules:** A cycle in the RAG (with single-instance resources) implies a deadlock.

**Exam points:** State definition, list all 4 conditions, and explain the Banker's Algorithm with a small example table for full marks.`,
  },
};

function findRichTopic(topic) {
  const t = topicKey(topic);
  for (const key in RICH_TOPICS) {
    if (RICH_TOPICS[key].match(t)) return RICH_TOPICS[key];
  }
  return null;
}

function demoExplain(topic, subject = 'General', level = 'Intermediate') {
  const rich = findRichTopic(topic);
  if (rich) return rich.explain;
  const t = topic && topic.trim() ? topic.trim() : 'this topic';
  return `## ${t} (${subject})

**Definition:** ${t} is an important concept in ${subject}. In demo mode, this is a template explanation — connect a real ANTHROPIC_API_KEY to get a fully tailored, AI-generated answer for "${t}".

**Why it is needed:** Understanding ${t} helps build a strong foundation in ${subject} and is commonly tested in university exams and interviews.

**Working:** At a high level, ${t} involves a defined process or mechanism specific to ${subject}. A live AI response would break this down step-by-step for a ${level} learner.

**Types:** ${t} typically has multiple types/variations depending on context — a live response would enumerate and explain each with examples.

**Example:** A representative example of ${t} would be generated here based on your exact question when the AI service is fully connected.

**Real-world analogy:** Real-world analogies make abstract ${subject} concepts intuitive — the live AI will tailor one specifically to "${t}".

**Advantages:** Key benefits of understanding/applying ${t}.
**Disadvantages:** Common limitations or trade-offs associated with ${t}.

**Exam points:**
- Define ${t} clearly in the first line
- Explain the working/mechanism with a diagram if applicable
- Give one solved example
- Mention 2-3 real-world applications`;
}

function demoSummarize(text) {
  const rich = findRichTopic(text);
  if (rich) return rich.summary;
  const preview = (text || '').slice(0, 120).trim();
  return `**Short summary:** This is a demo-mode summary of the material you pasted (starting with: "${preview}${text && text.length > 120 ? '...' : ''}"). Connect a real ANTHROPIC_API_KEY for a genuine AI-generated summary of your exact content.

**Key points:**
- Point 1 extracted from your material (demo placeholder)
- Point 2 extracted from your material (demo placeholder)
- Point 3 extracted from your material (demo placeholder)

**Important definitions:** Key terms from your text would be identified and defined here by the live AI.

**Important formulas:** Any formulas present in your material would be extracted and listed here.

**Exam points:** The most exam-relevant lines from your material would be highlighted here in live mode.`;
}

function demoAsk(question, subject = 'General', level = 'Intermediate', style = 'Detailed') {
  const rich = findRichTopic(question);
  if (rich) return rich.explain;
  return `## Answer (${subject} · ${level} · ${style})

Thanks for your question: *"${question}"*

This is a **demo-mode response** because no ANTHROPIC_API_KEY is configured on the backend. Once a real key is added to \`backend/.env\`, this exact question will be answered live by Claude with a fully personalized, well-structured explanation tailored to your selected subject, learning level, and response style.

**What a live answer would include:**
- A clear, direct definition/answer to your question
- Step-by-step reasoning or working
- A relevant example
- Real-world context or analogy
- Exam-oriented key points if applicable

Try asking about **"DBMS Normalization"** or **"OS Deadlock"** to see a fully fleshed-out demo answer.`;
}

function demoExamAnswer(question, marks = 4) {
  const rich = findRichTopic(question);
  const base = rich ? rich.explain : demoExplain(question, 'General', 'Intermediate');
  if (marks <= 2) {
    return `**[${marks} Marks Answer]**\n\n${base.split('\n').slice(0, 4).join('\n')}\n\n*(Concise answer suitable for ${marks} marks — definition + one key point.)*`;
  }
  if (marks <= 4) {
    return `**[${marks} Marks Answer]**\n\n${base.split('\n').slice(0, 10).join('\n')}\n\n*(Answer includes definition, explanation, and one example — suitable for ${marks} marks.)*`;
  }
  return `**[${marks} Marks Answer]**\n\n${base}\n\n**Conclusion:** This covers the definition, working, types/conditions, a worked example, advantages/disadvantages, and exam-focused points — suitable for a ${marks}-mark descriptive answer.`;
}

function demoQuizQuestions(subject = 'General', topic = '', difficulty = 'Medium', count = 5) {
  const bank = {
    dbms: [
      {
        question: 'What is a candidate key in DBMS?',
        options: [
          'A key that can uniquely identify a tuple in a relation',
          'A key that is always the primary key',
          'A foreign key referencing another table',
          'An index used for sorting only',
        ],
        correctAnswer: 'A key that can uniquely identify a tuple in a relation',
        explanation: 'A candidate key is a minimal set of attributes that can uniquely identify a row; one candidate key is chosen as the primary key.',
      },
      {
        question: 'Which normal form removes partial dependency?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: '2NF',
        explanation: '2NF requires that every non-key attribute be fully functionally dependent on the entire primary key, removing partial dependency.',
      },
    ],
    os: [
      {
        question: 'Which of the following is NOT a necessary condition for deadlock?',
        options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption', 'Circular Wait'],
        correctAnswer: 'Preemption',
        explanation: 'Deadlock requires "No Preemption" (resources cannot be forcibly taken), not preemption itself.',
      },
      {
        question: "The Banker's Algorithm is used for:",
        options: ['Deadlock detection', 'Deadlock avoidance', 'CPU scheduling', 'Memory paging'],
        correctAnswer: 'Deadlock avoidance',
        explanation: "The Banker's Algorithm avoids deadlock by only granting resource requests that leave the system in a safe state.",
      },
    ],
  };
  const subj = (subject || '').toLowerCase();
  let pool = [];
  if (subj.includes('dbms') || (topic || '').toLowerCase().includes('normal') || (topic || '').toLowerCase().includes('key')) pool = pool.concat(bank.dbms);
  if (subj.includes('os') || subj.includes('operating') || (topic || '').toLowerCase().includes('deadlock')) pool = pool.concat(bank.os);
  const generated = [];
  const t = topic && topic.trim() ? topic.trim() : subject || 'General Topic';
  for (let i = 0; i < count; i++) {
    if (pool[i]) {
      generated.push(pool[i]);
    } else {
      const n = i + 1;
      generated.push({
        question: `[Demo Mode] Sample ${difficulty} question ${n} about ${t}?`,
        options: [
          `Correct concept related to ${t}`,
          `Plausible but incorrect option A`,
          `Plausible but incorrect option B`,
          `Plausible but incorrect option C`,
        ],
        correctAnswer: `Correct concept related to ${t}`,
        explanation: `This is a demo placeholder question. With a real ANTHROPIC_API_KEY, unique, accurate ${difficulty}-level questions about "${t}" would be generated.`,
      });
    }
  }
  return generated.slice(0, count);
}

function demoFlashcards(subject = 'General', topic = '', count = 6) {
  const t = topic && topic.trim() ? topic.trim() : subject;
  const rich = findRichTopic(topic);
  if (rich && topicKey(topic).includes('normaliz')) {
    return [
      { question: 'What is Normalization?', answer: 'The process of organizing DB tables to reduce redundancy and improve integrity.' },
      { question: 'What is 1NF?', answer: 'All column values must be atomic; no repeating groups.' },
      { question: 'What is 2NF?', answer: '1NF + no partial dependency on part of a composite key.' },
      { question: 'What is 3NF?', answer: '2NF + no transitive dependency between non-key attributes.' },
      { question: 'What is BCNF?', answer: 'A stricter 3NF where every determinant is a candidate key.' },
      { question: 'Name one anomaly normalization prevents.', answer: 'Update anomaly (also insertion and deletion anomalies).' },
    ].slice(0, count);
  }
  if (rich && topicKey(topic).includes('deadlock')) {
    return [
      { question: 'What is a Deadlock?', answer: 'A state where processes are stuck waiting on each other for resources indefinitely.' },
      { question: 'Name the 4 necessary conditions for deadlock.', answer: 'Mutual exclusion, hold and wait, no preemption, circular wait.' },
      { question: "What does the Banker's Algorithm do?", answer: 'Avoids deadlock by only granting requests that keep the system in a safe state.' },
      { question: 'What is a Resource Allocation Graph?', answer: 'A graph representing process-resource assignments used to detect deadlock cycles.' },
      { question: 'Name one deadlock recovery method.', answer: 'Process termination or resource preemption.' },
      { question: 'What is the Ostrich Algorithm?', answer: 'Ignoring deadlocks, assuming they are rare (used by some general OSes).' },
    ].slice(0, count);
  }
  const cards = [];
  for (let i = 1; i <= count; i++) {
    cards.push({
      question: `[Demo] Flashcard ${i}: Key question about ${t}?`,
      answer: `[Demo] Concise answer about ${t}. Connect a real API key for accurate, unique flashcards.`,
    });
  }
  return cards;
}

function demoStudyPlan({ subject, topics = [], hoursPerDay = 2, days = 7, examDate, level = 'Beginner' }) {
  const topicList = Array.isArray(topics) && topics.length ? topics : ['Core Concepts', 'Practice Problems', 'Revision'];
  const plan = [];
  for (let d = 1; d <= Number(days || 7); d++) {
    const topic = topicList[(d - 1) % topicList.length];
    plan.push({
      day: d,
      subject: subject || 'General',
      topic,
      hours: Number(hoursPerDay || 2),
      focus:
        d === Number(days)
          ? 'Full revision + solve previous year questions'
          : `Study "${topic}" concepts, examples, and solve practice questions`,
    });
  }
  return {
    summary: `Demo ${days}-day study plan for ${subject || 'your subject'} at ${level} level, ${hoursPerDay} hrs/day${examDate ? `, targeting exam on ${examDate}` : ''}.`,
    plan,
  };
}

module.exports = {
  demoExplain,
  demoSummarize,
  demoAsk,
  demoExamAnswer,
  demoQuizQuestions,
  demoFlashcards,
  demoStudyPlan,
};
