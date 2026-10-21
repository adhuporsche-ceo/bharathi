// Linear Data Structures: Stack (LIFO), Queue (FIFO), and Circular Queue (Modulo Wraparound)
import { AlgorithmStep } from '../types';

export function generateStackSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const stack: string[] = [];
  const maxCapacity = 5;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Stack initialized. LIFO (Last-In, First-Out) discipline. Capacity = ${maxCapacity}. Top pointer = -1 (empty).`,
    codeLine: 1,
    stackState: [],
    variables: { top: '-1', size: '0', capacity: `${maxCapacity}` },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  // Attempt Underflow on empty stack
  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `POP() check: top == -1. UNDERFLOW CONDITION! Cannot pop from an empty stack.`,
    codeLine: 2,
    stackState: [],
    variables: { top: '-1', status: 'STACK_UNDERFLOW_ERROR' },
    comparisonsCount: 1,
    swapsCount: 0,
    stats: { comparisons: 1, swaps: 0, operations: 2 }
  });

  const pushes = ['10', '25', '42', '77', '99'];
  for (const item of pushes) {
    stack.push(item);
    const topIdx = stack.length - 1;
    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `PUSH(${item}): Element '${item}' inserted onto stack. Top pointer increments to index ${topIdx}.`,
      codeLine: 4,
      stackState: [...stack],
      variables: { top: `${topIdx}`, top_element: item, size: `${stack.length}`, capacity: `${maxCapacity}` },
      comparisonsCount: steps.length,
      swapsCount: 0,
      stats: { comparisons: steps.length, swaps: 0, operations: steps.length + 1 }
    });
  }

  // Attempt Overflow on full stack
  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `PUSH(120) check: size == capacity (${maxCapacity}). OVERFLOW CONDITION! Stack is full, cannot insert.`,
    codeLine: 5,
    stackState: [...stack],
    variables: { top: `${stack.length - 1}`, status: 'STACK_OVERFLOW_ERROR' },
    comparisonsCount: steps.length + 1,
    swapsCount: 0,
    stats: { comparisons: steps.length + 1, swaps: 0, operations: steps.length + 2 }
  });

  // PEEK
  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `PEEK(): Inspect top element '${stack[stack.length - 1]}' at index ${stack.length - 1} without removing it. O(1) time.`,
    codeLine: 6,
    stackState: [...stack],
    variables: { top: `${stack.length - 1}`, peek_val: stack[stack.length - 1] },
    comparisonsCount: steps.length,
    swapsCount: 0,
    stats: { comparisons: steps.length, swaps: 0, operations: steps.length + 1 }
  });

  // POP elements
  while (stack.length > 2) {
    const popped = stack.pop();
    const newTop = stack.length - 1;
    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `POP(): Removed top element '${popped}'. Top pointer decrements to ${newTop}.`,
      codeLine: 8,
      stackState: [...stack],
      variables: { popped: popped || '', new_top: `${newTop}`, size: `${stack.length}` },
      comparisonsCount: steps.length,
      swapsCount: 0,
      stats: { comparisons: steps.length, swaps: 0, operations: steps.length + 1 }
    });
  }

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateQueueSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const queue: string[] = [];
  const maxCapacity = 5;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Linear Queue initialized. FIFO (First-In, First-Out) discipline. Front = 0, Rear = -1, Size = 0.`,
    codeLine: 1,
    queueState: [],
    variables: { front: '0', rear: '-1', size: '0', capacity: `${maxCapacity}` },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  const enqueues = ['Task A', 'Task B', 'Task C', 'Task D'];
  for (const item of enqueues) {
    queue.push(item);
    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `ENQUEUE('${item}'): Appended at Rear (index ${queue.length - 1}).`,
      codeLine: 3,
      queueState: [...queue],
      variables: { front: '0', rear: `${queue.length - 1}`, size: `${queue.length}`, arriving: item },
      comparisonsCount: steps.length,
      swapsCount: 0,
      stats: { comparisons: steps.length, swaps: 0, operations: steps.length + 1 }
    });
  }

  // Dequeue operations
  const dq1 = queue.shift();
  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `DEQUEUE(): Serviced and removed '${dq1}' from Front. Front shifts right.`,
    codeLine: 5,
    queueState: [...queue],
    variables: { serviced: dq1 || '', front: '0', rear: `${queue.length - 1}`, size: `${queue.length}` },
    comparisonsCount: steps.length,
    swapsCount: 0,
    stats: { comparisons: steps.length, swaps: 0, operations: steps.length + 1 }
  });

  const dq2 = queue.shift();
  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `DEQUEUE(): Serviced '${dq2}'. In Linear Queue, spaces vacated at the front cannot be reused without shifting!`,
    codeLine: 6,
    queueState: [...queue],
    variables: { serviced: dq2 || '', size: `${queue.length}` },
    comparisonsCount: steps.length,
    swapsCount: 0,
    stats: { comparisons: steps.length, swaps: 0, operations: steps.length + 1 }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateCircularQueueSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const capacity = 5;
  // Circular queue represented as fixed buffer of size 5
  const buffer: Array<string | null> = Array(capacity).fill(null);
  let front = -1;
  let rear = -1;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Circular Queue initialized with capacity ${capacity}. Solves linear queue memory waste using modulo formula: rear = (rear + 1) % capacity.`,
    codeLine: 1,
    isCircularQueue: true,
    circularQueueCapacity: capacity,
    circularQueueFront: front,
    circularQueueRear: rear,
    queueState: buffer.map(x => x || '—'),
    variables: { front: '-1', rear: '-1', size: '0', capacity: `${capacity}` },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  function enqueue(val: string) {
    if ((front === 0 && rear === capacity - 1) || ((rear + 1) % capacity === front)) {
      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `ENQUEUE('${val}') Failed: Circular Queue is FULL! (rear + 1) % cap == front.`,
        codeLine: 3,
        isCircularQueue: true,
        circularQueueCapacity: capacity,
        circularQueueFront: front,
        circularQueueRear: rear,
        queueState: buffer.map(x => x || '—'),
        variables: { status: 'OVERFLOW', front: `${front}`, rear: `${rear}` },
        comparisonsCount: steps.length,
        swapsCount: 0,
        stats: { comparisons: steps.length, swaps: 0, operations: steps.length + 1 }
      });
      return;
    }

    if (front === -1) {
      front = 0;
      rear = 0;
    } else {
      rear = (rear + 1) % capacity;
    }
    buffer[rear] = val;

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `ENQUEUE('${val}'): Placed at slot ${rear}. Rear pointer updated via (rear + 1) % ${capacity} = ${rear}.`,
      codeLine: 4,
      isCircularQueue: true,
      circularQueueCapacity: capacity,
      circularQueueFront: front,
      circularQueueRear: rear,
      queueState: buffer.map(x => x || '—'),
      variables: { front: `${front}`, rear: `${rear}`, buffer_slot: `${rear}`, item: val },
      comparisonsCount: steps.length,
      swapsCount: 0,
      stats: { comparisons: steps.length, swaps: 0, operations: steps.length + 1 }
    });
  }

  function dequeue(): string | null {
    if (front === -1) {
      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `DEQUEUE() Failed: Circular Queue is EMPTY (front == -1). UNDERFLOW!`,
        codeLine: 6,
        isCircularQueue: true,
        circularQueueCapacity: capacity,
        circularQueueFront: front,
        circularQueueRear: rear,
        queueState: buffer.map(x => x || '—'),
        variables: { status: 'UNDERFLOW' },
        comparisonsCount: steps.length,
        swapsCount: 0,
        stats: { comparisons: steps.length, swaps: 0, operations: steps.length + 1 }
      });
      return null;
    }

    const data = buffer[front];
    buffer[front] = null;
    const oldFront = front;

    if (front === rear) {
      front = -1;
      rear = -1;
    } else {
      front = (front + 1) % capacity;
    }

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `DEQUEUE(): Removed '${data}' from slot ${oldFront}. Front pointer advanced via (front + 1) % ${capacity} = ${front}. Vacated slot can be reused!`,
      codeLine: 7,
      isCircularQueue: true,
      circularQueueCapacity: capacity,
      circularQueueFront: front,
      circularQueueRear: rear,
      queueState: buffer.map(x => x || '—'),
      variables: { dequeued: data || '', new_front: `${front}`, rear: `${rear}` },
      comparisonsCount: steps.length,
      swapsCount: 0,
      stats: { comparisons: steps.length, swaps: 0, operations: steps.length + 1 }
    });

    return data;
  }

  // Demonstration: Enqueue 4 items, dequeue 2 items, enqueue 3 more to demonstrate modulo wraparound
  enqueue('Q1');
  enqueue('Q2');
  enqueue('Q3');
  enqueue('Q4');

  dequeue();
  dequeue();

  // Now rear wraps around to index 0 and 1!
  enqueue('Q5 (Wraparound)');
  enqueue('Q6 (Wraparound)');

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}
