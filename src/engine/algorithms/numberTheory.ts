// Number Theory Trace Generators
// Implements: Euclidean GCD and Sieve of Eratosthenes Prime Generation
import { AlgorithmStep } from '../types';

export function generateEuclideanGcdSteps(input: number[] = [48, 18]): AlgorithmStep[] {
  let a = input[0] || 48;
  let b = input[1] || 18;
  const originalA = a;
  const originalB = b;
  const steps: AlgorithmStep[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Euclidean GCD Algorithm initialized. Computing gcd(${a}, ${b}). Invariant: gcd(a, b) = gcd(b, a mod b).`,
    codeLine: 1,
    arrayState: [a, b],
    variables: {
      'Dividend (a)': `${a}`,
      'Divisor (b)': `${b}`,
      'Lamé’s Theorem': 'Division steps <= 5 × number of decimal digits in smaller number (O(log min(a, b)))'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  let stepCount = 0;
  while (b !== 0) {
    stepCount++;
    const quotient = Math.floor(a / b);
    const remainder = a % b;

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Division Step ${stepCount}: ${a} = (${quotient} × ${b}) + ${remainder}. Remainder is ${remainder}.`,
      codeLine: 3,
      arrayState: [b, remainder],
      mathEquationState: {
        a,
        b,
        quotient,
        remainder,
        equation: `${a} = ${quotient} × ${b} + ${remainder}`
      },
      variables: {
        'Equation': `${a} = ${quotient} × ${b} + ${remainder}`,
        'Remainder': `${remainder}`,
        'Quotient': `${quotient}`,
        'Next Pair': `(${b}, ${remainder})`
      },
      stats: { comparisons: stepCount, swaps: 0, operations: stepCount * 2 }
    });

    a = b;
    b = remainder;
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: steps.length + 1,
    description: `Remainder reached 0! The last non-zero divisor is the Greatest Common Divisor: GCD(${originalA}, ${originalB}) = ${a}.`,
    codeLine: 6,
    arrayState: [a, a],
    variables: {
      'FINAL_GCD': `${a}`,
      'Status': 'Calculation Complete',
      'Coprime Check': a === 1 ? 'Coprime' : `Shares factor ${a}`
    },
    stats: { comparisons: stepCount, swaps: 0, operations: stepCount * 2 + 1 }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateSieveEratosthenesSteps(limit = 20): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = 20;
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  const numbers = Array.from({ length: n - 1 }, (_, i) => i + 2); // 2..20

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Sieve of Eratosthenes initialized for range 2..${n}. Mark all numbers as potential primes, then strike out composites.`,
    codeLine: 1,
    arrayState: [...numbers],
    variables: {
      'Range': `2 to ${n}`,
      'Strategy': 'For prime p, strike out 2p, 3p, 4p... up to sqrt(n)',
      'Time Complexity': 'O(n log log n)'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `Inspecting prime p = ${p}. Multiples of ${p} starting from ${p * p} (${p * p}, ${p * (p + 1)}...) are composite.`,
        codeLine: 3,
        arrayState: numbers.map(num => isPrime[num] ? num : 0),
        activeIndices: [numbers.indexOf(p)],
        variables: {
          'Active Prime': `${p}`,
          'First Multiple Struck': `${p * p}`
        },
        stats: { comparisons: p, swaps: 0, operations: steps.length + 1 }
      });

      for (let multiple = p * p; multiple <= n; multiple += p) {
        isPrime[multiple] = false;
        steps.push({
          stepIndex: steps.length,
          totalSteps: steps.length + 1,
          description: `Composite struck out: ${multiple} = ${p} × ${multiple / p}.`,
          codeLine: 5,
          arrayState: numbers.map(num => isPrime[num] ? num : 0),
          swappedIndices: [numbers.indexOf(multiple)],
          variables: {
            'Struck Out': `${multiple}`,
            'Factor': `${p}`
          },
          stats: { comparisons: p, swaps: 0, operations: steps.length + 1 }
        });
      }
    }
  }

  const primes = numbers.filter(num => isPrime[num]);
  steps.push({
    stepIndex: steps.length,
    totalSteps: steps.length + 1,
    description: `Sieve Complete! Primes <= ${n} found: [${primes.join(', ')}]. Total: ${primes.length} primes.`,
    codeLine: 8,
    arrayState: [...primes],
    sortedIndices: primes.map((_, idx) => idx),
    variables: {
      'Primes Found': primes.join(', '),
      'Total Count': `${primes.length}`,
      'Prime Density': `~ n / ln(n)`
    },
    stats: { comparisons: 20, swaps: 0, operations: steps.length + 1 }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}
