// Analysis & Asymptotic Growth Trace Generators
// Conforms to KCT 23CS401 Unit 1 Syllabus
import { AlgorithmStep } from '../types';

export function generateAsymptoticGrowthSteps(input: number[] = [1, 2, 4, 8, 16]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const nValues = [1, 2, 4, 8, 16];

  // We compare 5 complexity classes across input scale n
  // 1: O(1) Constant
  // 2: O(log n) Logarithmic
  // 3: O(n) Linear
  // 4: O(n log n) Linearithmic
  // 5: O(n²) Quadratic
  // 6: O(2^n) Exponential

  steps.push({
    stepIndex: 0,
    totalSteps: 7,
    description: 'Asymptotic Analysis Laboratory initialized. Inspecting growth rates of major complexity classes as problem size n increases.',
    codeLine: 1,
    arrayState: [1, 2, 4, 8, 16],
    variables: {
      'Current Scale': 'n = 1',
      'Hierarchy': 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)',
      'Dominant Term': 'As n -> inf, higher-order terms overwhelm lower-order terms'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 },
    quiz: {
      question: 'Which growth function grows strictly faster as n -> ∞?',
      options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
      correctIndex: 1,
      explanation: 'O(n²) dominates O(n log n) because n² / (n log n) = n / log n -> ∞ as n increases.'
    }
  });

  const complexities = [
    { name: 'O(1) Constant', fn: (n: number) => 1, color: 'text-emerald-600', desc: 'Hash lookup, array index access. Flat curve regardless of n.' },
    { name: 'O(log n) Logarithmic', fn: (n: number) => Math.round(Math.log2(n) * 10) / 10, color: 'text-teal-600', desc: 'Binary search, balanced BST search. Halves remaining problem size at each step.' },
    { name: 'O(n) Linear', fn: (n: number) => n, color: 'text-sky-600', desc: 'Linear search, single loop traversal. Execution operations scale 1:1 with input length.' },
    { name: 'O(n log n) Linearithmic', fn: (n: number) => Math.round(n * Math.log2(n) * 10) / 10, color: 'text-indigo-600', desc: 'Merge sort, Heap sort, average Quick sort. Optimal comparison-based sorting bound.' },
    { name: 'O(n²) Quadratic', fn: (n: number) => n * n, color: 'text-amber-600', desc: 'Nested loops, Bubble sort, Selection sort. Impractical for large datasets (e.g. n > 100,000).' },
    { name: 'O(2ⁿ) Exponential', fn: (n: number) => Math.pow(2, n), color: 'text-rose-600', desc: 'Naive recursive Fibonacci, Power Set generation. Intractable for large inputs; doubles with each +1.' }
  ];

  complexities.forEach((comp, idx) => {
    const samples = nValues.map(n => comp.fn(n));
    steps.push({
      stepIndex: idx + 1,
      totalSteps: 7,
      description: `${comp.name}: ${comp.desc} Values at n=[1,2,4,8,16] are [${samples.join(', ')}].`,
      codeLine: idx + 2,
      arrayState: samples.map(v => Math.min(100, Math.round(v))),
      variables: {
        'Class': comp.name,
        'f(16)': `${samples[4]} ops`,
        'Asymptotic Class': comp.name.split(' ')[0],
        'KCT Exam Rule': 'Drop constant coefficients (e.g., 5n² -> O(n²)) and lower-order terms (e.g., n² + 100n -> O(n²)).'
      },
      stats: { comparisons: idx + 1, swaps: 0, operations: (idx + 1) * 3 }
    });
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}

export function generateMasterTheoremSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 5,
    description: 'Master Theorem Solver: Analyzes divide-and-conquer recurrences of the form T(n) = a·T(n/b) + f(n), where a >= 1, b > 1, f(n) = Θ(n^d).',
    codeLine: 1,
    arrayState: [2, 2, 1], // a=2, b=2, d=1 (Merge Sort)
    variables: {
      'Form': 'T(n) = a·T(n/b) + f(n)',
      'Example Recurrence': 'T(n) = 2T(n/2) + Θ(n)',
      'Subproblems (a)': '2',
      'Shrink Factor (b)': '2',
      'Work per Level (d)': 'n¹ (d = 1)'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  steps.push({
    stepIndex: 1,
    totalSteps: 5,
    description: 'Step 1: Compute critical exponent log_b(a) = log_2(2) = 1.0. This determines whether leaf subproblems or root work dominates.',
    codeLine: 2,
    arrayState: [1, 1],
    variables: {
      'log_b(a)': 'log₂(2) = 1.0',
      'd (from n^d)': '1.0',
      'Comparison': 'log_b(a) == d'
    },
    stats: { comparisons: 1, swaps: 0, operations: 2 }
  });

  steps.push({
    stepIndex: 2,
    totalSteps: 5,
    description: 'Step 2: Compare log_b(a) with d. Here log_2(2) = 1 and d = 1, so log_b(a) == d. Work is evenly balanced across all recursion levels!',
    codeLine: 3,
    arrayState: [1, 1],
    variables: {
      'Case Triggered': 'Case 2 (Equal Work Distribution)',
      'Level Work': 'Each recursion level does exactly Θ(n) work',
      'Tree Height': 'log_b(n) = log₂(n) levels'
    },
    stats: { comparisons: 2, swaps: 0, operations: 3 }
  });

  steps.push({
    stepIndex: 3,
    totalSteps: 5,
    description: 'Step 3: Apply Case 2 Formula: T(n) = Θ(n^(log_b(a)) · log n) = Θ(n¹ · log n) = Θ(n log n). Exactly matches Merge Sort!',
    codeLine: 4,
    arrayState: [2, 4, 8, 16],
    variables: {
      'Closed Form Solution': 'Θ(n log n)',
      'Anna Univ / KCT Mark Tip': 'Always verify the regularity condition a·f(n/b) <= c·f(n) for Case 3.'
    },
    stats: { comparisons: 2, swaps: 0, operations: 4 }
  });

  steps.push({
    stepIndex: 4,
    totalSteps: 5,
    description: 'Summary of 3 Master Cases: Case 1 (log_b(a) > d) -> Θ(n^(log_b a)); Case 2 (log_b(a) == d) -> Θ(n^d · log n); Case 3 (log_b(a) < d) -> Θ(f(n)).',
    codeLine: 5,
    arrayState: [1, 2, 3],
    variables: {
      'Status': 'Theorem Solved',
      'Result': 'T(n) = Θ(n log n)'
    },
    stats: { comparisons: 3, swaps: 0, operations: 5 }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}
