// Divide and Conquer Algorithms Trace Generator
// Implements: Karatsuba Fast Multiplication and Closest Pair of Points
import { AlgorithmStep } from '../types';

export function generateKaratsubaSteps(x = 1234, y = 5678): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const numX = 1234;
  const numY = 5678;

  steps.push({
    stepIndex: 0,
    totalSteps: 5,
    description: `Karatsuba Fast Multiplication initialized. Multiplying X = ${numX} and Y = ${numY}. Standard multiplication uses 4 multiplications (O(n²)); Karatsuba computes in only 3 multiplications (O(n^1.585))!`,
    codeLine: 1,
    arrayState: [12, 34, 56, 78],
    variables: {
      'X': `${numX}`,
      'Y': `${numY}`,
      'Digits (n)': '4',
      'Recurrence': 'T(n) = 3T(n/2) + O(n) => O(n^log₂ 3) = O(n^1.585)'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  // Split into a, b, c, d (base 10^2)
  const a = 12;
  const b = 34;
  const c = 56;
  const d = 78;

  steps.push({
    stepIndex: 1,
    totalSteps: 5,
    description: `Split X and Y into high and low halves at m = 2 digits: X = ${a}·10² + ${b}, Y = ${c}·10² + ${d}. Four half-components: a=${a}, b=${b}, c=${c}, d=${d}.`,
    codeLine: 3,
    arrayState: [a, b, c, d],
    variables: {
      'a (X high)': `${a}`,
      'b (X low)': `${b}`,
      'c (Y high)': `${c}`,
      'd (Y low)': `${d}`,
      'Base (10^m)': '10² = 100'
    },
    stats: { comparisons: 1, swaps: 0, operations: 2 }
  });

  const z0 = b * d; // 34 * 78 = 2652
  const z2 = a * c; // 12 * 56 = 672
  const z1Cross = (a + b) * (c + d); // (12 + 34) * (56 + 78) = 46 * 134 = 6164
  const z1 = z1Cross - z2 - z0; // 6164 - 672 - 2652 = 2840

  steps.push({
    stepIndex: 2,
    totalSteps: 5,
    description: `Compute 3 recursive products: z2 = a·c = ${a}×${c} = ${z2}. z0 = b·d = ${b}×${d} = ${z0}. (a+b)·(c+d) = ${a + b}×${c + d} = ${z1Cross}.`,
    codeLine: 5,
    arrayState: [z2, z0, z1Cross],
    variables: {
      'z2 (high product)': `${z2}`,
      'z0 (low product)': `${z0}`,
      'Cross product': `${z1Cross}`
    },
    stats: { comparisons: 2, swaps: 0, operations: 4 }
  });

  steps.push({
    stepIndex: 3,
    totalSteps: 5,
    description: `Karatsuba Trick: Middle term z1 = (a+b)(c+d) - z2 - z0 = ${z1Cross} - ${z2} - ${z0} = ${z1}! No 4th multiplication needed!`,
    codeLine: 7,
    arrayState: [z2, z1, z0],
    variables: {
      'z1': `${z1}`,
      'Formula': 'z1 = (a+b)(c+d) - z2 - z0'
    },
    stats: { comparisons: 3, swaps: 0, operations: 6 }
  });

  const result = z2 * 10000 + z1 * 100 + z0; // 6720000 + 284000 + 2652 = 7006652
  steps.push({
    stepIndex: 4,
    totalSteps: 5,
    description: `Combine: Product = z2·10⁴ + z1·10² + z0 = ${z2}0000 + ${z1}00 + ${z0} = ${result}. Exactly matches ${numX} × ${numY}!`,
    codeLine: 9,
    arrayState: [result],
    variables: {
      'Result': `${result}`,
      'Verification': `${numX} * ${numY} = ${numX * numY}`,
      'Status': 'Multiplication Complete'
    },
    stats: { comparisons: 4, swaps: 0, operations: 8 }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}

export function generateClosestPairSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const points = [
    { id: 'P1', x: 2, y: 3 },
    { id: 'P2', x: 12, y: 30 },
    { id: 'P3', x: 40, y: 50 },
    { id: 'P4', x: 5, y: 1 },
    { id: 'P5', x: 12, y: 10 },
    { id: 'P6', x: 3, y: 4 }
  ];

  steps.push({
    stepIndex: 0,
    totalSteps: 5,
    description: 'Closest Pair of 2D Points initialized. Given 6 points in Cartesian plane. Brute force check requires O(n²) comparisons; Divide-and-Conquer solves in O(n log n).',
    codeLine: 1,
    arrayState: points.map(p => p.x),
    variables: {
      'Total Points': `${points.length}`,
      'Divide Line': 'Sort by x-coordinate, split down middle with vertical line L'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  // Sorted by x: (2,3), (3,4), (5,1), (12,10), (12,30), (40,50)
  steps.push({
    stepIndex: 1,
    totalSteps: 5,
    description: 'Phase 1: Points sorted by X-coordinate: P1(2,3), P6(3,4), P4(5,1) on Left; P5(12,10), P2(12,30), P3(40,50) on Right. Midline at x = 8.5.',
    codeLine: 3,
    arrayState: [2, 3, 5, 12, 12, 40],
    variables: {
      'Left Half': 'P1(2,3), P6(3,4), P4(5,1)',
      'Right Half': 'P5(12,10), P2(12,30), P3(40,50)',
      'Midline': 'x = 8.5'
    },
    stats: { comparisons: 3, swaps: 0, operations: 3 }
  });

  steps.push({
    stepIndex: 2,
    totalSteps: 5,
    description: 'Phase 2: Recursively find closest pair in Left half (d_left = dist(P1, P6) = sqrt((3-2)² + (4-3)²) = 1.41) and Right half (d_right = dist(P5, P2) = 20.0). Minimum delta δ = 1.41.',
    codeLine: 5,
    arrayState: [1, 20],
    variables: {
      'd_left': '1.41 (between P1 and P6)',
      'd_right': '20.00',
      'delta (δ)': '1.41'
    },
    stats: { comparisons: 5, swaps: 0, operations: 6 }
  });

  steps.push({
    stepIndex: 3,
    totalSteps: 5,
    description: 'Phase 3: Inspect vertical strip [midline - δ, midline + δ] around x = 8.5. Points inside strip: P4(5, 1). No other cross-boundary points exist within distance < 1.41.',
    codeLine: 7,
    arrayState: [1],
    variables: {
      'Strip Region': '[7.09 to 9.91]',
      'Points in Strip': '0 pairs closer than δ',
      'Geometric Lemma': 'Each point in strip needs comparison with at most 7 following points!'
    },
    stats: { comparisons: 6, swaps: 0, operations: 7 }
  });

  steps.push({
    stepIndex: 4,
    totalSteps: 5,
    description: 'Closest Pair Found! Minimal distance δ = 1.414 between P1(2, 3) and P6(3, 4). Solved in O(n log n) time.',
    codeLine: 9,
    arrayState: [1],
    sortedIndices: [0, 1],
    variables: {
      'Pair': 'P1(2,3) & P6(3,4)',
      'Minimal Distance': '1.414 units',
      'Recurrence': 'T(n) = 2T(n/2) + O(n log n) or O(n) with presorted Y'
    },
    stats: { comparisons: 7, swaps: 0, operations: 8 }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}
