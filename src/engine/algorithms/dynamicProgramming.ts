// Dynamic Programming: 0/1 Knapsack, LCS, Matrix Chain Multiplication, and Fibonacci
import { AlgorithmStep } from '../types';

export function generateKnapsackDpSteps(): AlgorithmStep[] {
  const weights = [2, 3, 4, 5];
  const values = [3, 4, 5, 8];
  const capacity = 5;
  const n = weights.length;

  const rowHeaders = ['Ø (0)', ...weights.map((w, idx) => `Item ${idx + 1} (w=${w}, v=${values[idx]})`)];
  const colHeaders = Array.from({ length: capacity + 1 }, (_, c) => `W=${c}`);

  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  const steps: AlgorithmStep[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 15,
    description: `0/1 Knapsack: Dynamic Programming table initialized for ${n} items with Knapsack capacity W = ${capacity}.`,
    codeLine: 1,
    dpTable: {
      rowHeaders,
      colHeaders,
      matrix: dp.map(row => [...row]),
      activeRow: 0,
      activeCol: 0,
      formulaExplanation: 'Base cases: dp[0][w] = 0 (no items) and dp[i][0] = 0 (zero capacity)'
    },
    variables: { items: `${n}`, capacity: `${capacity}`, approach: 'Bottom-Up Tabulation' },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  let ops = 0;
  for (let i = 1; i <= n; i++) {
    const w = weights[i - 1];
    const v = values[i - 1];
    for (let c = 1; c <= capacity; c++) {
      ops++;
      const withoutItem = dp[i - 1][c];
      const withItem = c >= w ? dp[i - 1][c - w] + v : -1;
      const chosen = Math.max(withoutItem, withItem);
      dp[i][c] = chosen;

      if (c === w || c === capacity || (i === n && c === capacity)) {
        steps.push({
          stepIndex: steps.length,
          totalSteps: 15,
          description: `Item ${i} (wt=${w}, val=${v}) at capacity ${c}: ${c >= w ? `max(without=${withoutItem}, with=${v} + dp[${i - 1}][${c - w}] (${withItem})) = ${chosen}` : `wt > cap, carry forward ${withoutItem}`}.`,
          codeLine: 4,
          dpTable: {
            rowHeaders,
            colHeaders,
            matrix: dp.map(row => [...row]),
            activeRow: i,
            activeCol: c,
            sourceCells: c >= w ? [{ row: i - 1, col: c }, { row: i - 1, col: c - w }] : [{ row: i - 1, col: c }],
            formulaExplanation: c >= w
              ? `dp[${i}][${c}] = max(dp[${i - 1}][${c}], dp[${i - 1}][${c - w}] + ${v}) = ${chosen}`
              : `dp[${i}][${c}] = dp[${i - 1}][${c}] = ${chosen}`
          },
          variables: { item: `${i}`, cap: `${c}`, 'dp[i][w]': `${chosen}`, operations: `${ops}` },
          comparisonsCount: ops,
          swapsCount: 0,
          stats: { comparisons: ops, swaps: 0, operations: ops }
        });
      }
    }
  }

  // Backtracking optimal items
  const selectedItems: number[] = [];
  let currC = capacity;
  for (let i = n; i > 0; i--) {
    if (dp[i][currC] !== dp[i - 1][currC]) {
      selectedItems.push(i);
      currC -= weights[i - 1];
    }
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: 15,
    description: `Optimal Knapsack Profit = ${dp[n][capacity]}! Solution items reconstructed: Items [${selectedItems.reverse().join(', ')}]. Time: O(n*W), Space: O(n*W).`,
    codeLine: 8,
    dpTable: {
      rowHeaders,
      colHeaders,
      matrix: dp.map(row => [...row]),
      activeRow: n,
      activeCol: capacity,
      formulaExplanation: `Optimal subset gives maximum total value ${dp[n][capacity]} within capacity limit.`
    },
    variables: { max_value: `${dp[n][capacity]}`, selected_items: `Items ${selectedItems.join(', ')}`, complexity: 'O(n * W)' },
    comparisonsCount: ops,
    swapsCount: 0,
    stats: { comparisons: ops, swaps: 0, operations: ops }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}

export function generateLcsSteps(str1 = 'STONE', str2 = 'LONGEST'): AlgorithmStep[] {
  const m = str1.length;
  const n = str2.length;
  const rowHeaders = ['Ø', ...str1.split('').map((ch, idx) => `${ch} (${idx + 1})`)];
  const colHeaders = ['Ø', ...str2.split('').map((ch, idx) => `${ch} (${idx + 1})`)];

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const steps: AlgorithmStep[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 10,
    description: `LCS: Finding Longest Common Subsequence between S1="${str1}" and S2="${str2}". Table size: ${m + 1}×${n + 1}.`,
    codeLine: 1,
    dpTable: {
      rowHeaders,
      colHeaders,
      matrix: dp.map(r => [...r]),
      activeRow: 0,
      activeCol: 0,
      formulaExplanation: 'dp[i][j] = length of LCS of prefixes S1[0..i-1] and S2[0..j-1]'
    },
    variables: { S1: str1, S2: str2, 'len(S1)': `${m}`, 'len(S2)': `${n}` },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  let comparisons = 0;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      comparisons++;
      const char1 = str1[i - 1];
      const char2 = str2[j - 1];
      const isMatch = char1 === char2;

      if (isMatch) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }

      if (isMatch || (i === m && j === n) || (i === 1 && j === 2)) {
        steps.push({
          stepIndex: steps.length,
          totalSteps: 10,
          description: `Compare S1[${i}]('${char1}') with S2[${j}]('${char2}'). ${isMatch ? `MATCH! dp[${i}][${j}] = 1 + diagonal (${dp[i - 1][j - 1]}) = ${dp[i][j]}.` : `Mismatch. dp[${i}][${j}] = max(top=${dp[i - 1][j]}, left=${dp[i][j - 1]}) = ${dp[i][j]}.`}`,
          codeLine: isMatch ? 3 : 5,
          dpTable: {
            rowHeaders,
            colHeaders,
            matrix: dp.map(r => [...r]),
            activeRow: i,
            activeCol: j,
            sourceCells: isMatch ? [{ row: i - 1, col: j - 1 }] : [{ row: i - 1, col: j }, { row: i, col: j - 1 }],
            formulaExplanation: isMatch ? `Match: dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}` : `Mismatch: max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = ${dp[i][j]}`
          },
          variables: { i: `${i}`, j: `${j}`, S1_char: char1, S2_char: char2, 'dp[i][j]': `${dp[i][j]}` },
          comparisonsCount: comparisons,
          swapsCount: 0,
          stats: { comparisons, swaps: 0, operations: comparisons }
        });
      }
    }
  }

  // Reconstruct LCS string
  let i = m;
  let j = n;
  const lcsChars: string[] = [];
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcsChars.push(str1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  const lcsString = lcsChars.reverse().join('');

  steps.push({
    stepIndex: steps.length,
    totalSteps: 10,
    description: `LCS Completed! Longest Common Subsequence length = ${dp[m][n]}. Reconstructed LCS string = "${lcsString}". Time: O(m*n), Space: O(m*n).`,
    codeLine: 8,
    dpTable: {
      rowHeaders,
      colHeaders,
      matrix: dp.map(r => [...r]),
      activeRow: m,
      activeCol: n,
      formulaExplanation: `Final LCS: "${lcsString}" of length ${dp[m][n]}`
    },
    variables: { lcs_result: lcsString, lcs_length: `${dp[m][n]}`, time: 'O(m*n)' },
    comparisonsCount: comparisons,
    swapsCount: 0,
    stats: { comparisons, swaps: 0, operations: comparisons }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}
