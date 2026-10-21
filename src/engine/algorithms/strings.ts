// String Algorithms Trace Generator
// Implements Knuth-Morris-Pratt (KMP) with π-table and Rabin-Karp Rolling Hash
import { AlgorithmStep } from '../types';

export function generateKmpSteps(textStr = 'ABABDABACDABABCABAB', patternStr = 'ABABCABAB'): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const text = textStr || 'ABABDABACDABABCABAB';
  const pattern = patternStr || 'ABABCABAB';
  const m = pattern.length;
  const n = text.length;

  // Phase 1: Precompute LPS table (Longest Proper Prefix which is also Suffix)
  const lps: number[] = new Array(m).fill(0);
  let len = 0;
  let i = 1;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `KMP String Search initialized. Text: "${text}" (length ${n}), Pattern: "${pattern}" (length ${m}). Building π-table (LPS array).`,
    codeLine: 1,
    stringPatternState: {
      text,
      pattern,
      textIndex: 0,
      patternIndex: 0,
      lpsTable: [...lps],
      isMatch: false
    },
    variables: {
      'Phase': '1: Building LPS Array',
      'Text Length (n)': `${n}`,
      'Pattern Length (m)': `${m}`,
      'LPS Concept': 'LPS[i] = length of the longest proper prefix of pattern[0..i] that is also a suffix of pattern[0..i]'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: steps.length + 1,
    description: `LPS Table computed: [${lps.join(', ')}]. Now scanning text. When mismatch occurs, KMP shifts pattern by LPS[j-1] without backtracking text pointer i!`,
    codeLine: 5,
    stringPatternState: {
      text,
      pattern,
      textIndex: 0,
      patternIndex: 0,
      lpsTable: [...lps],
      isMatch: false
    },
    variables: {
      'Phase': '2: Linear Search with LPS Shifts',
      'LPS Array': `[${lps.join(', ')}]`,
      'Advantage': 'O(n) linear time — text index i NEVER moves backward'
    },
    stats: { comparisons: m, swaps: 0, operations: m + 1 }
  });

  // Phase 2: Search text
  let ti = 0;
  let pi = 0;
  let comparisons = 0;

  while (ti < n) {
    comparisons++;
    const isCharMatch = text[ti] === pattern[pi];

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Comparing text[${ti}]='${text[ti]}' with pattern[${pi}]='${pattern[pi]}'. ${isCharMatch ? 'MATCH! Advance both pointers.' : 'MISMATCH! Consult LPS table for safe skip.'}`,
      codeLine: 8,
      stringPatternState: {
        text,
        pattern,
        textIndex: ti,
        patternIndex: pi,
        lpsTable: [...lps],
        isMatch: isCharMatch,
        mismatchIndex: isCharMatch ? undefined : pi
      },
      variables: {
        'Text Pointer (i)': `${ti}`,
        'Pattern Pointer (j)': `${pi}`,
        'text[i]': `'${text[ti]}'`,
        'pattern[j]': `'${pattern[pi]}'`,
        'Comparisons': `${comparisons}`
      },
      stats: { comparisons, swaps: 0, operations: comparisons + 2 }
    });

    if (isCharMatch) {
      ti++;
      pi++;
    }

    if (pi === m) {
      const matchIndex = ti - pi;
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `PATTERN FOUND! Complete pattern "${pattern}" matched at text index ${matchIndex}!`,
        codeLine: 12,
        stringPatternState: {
          text,
          pattern,
          textIndex: matchIndex,
          patternIndex: 0,
          lpsTable: [...lps],
          isMatch: true
        },
        variables: {
          'Result': `FOUND at index ${matchIndex}`,
          'Total Comparisons': `${comparisons}`,
          'Time Complexity': 'O(n + m)'
        },
        stats: { comparisons, swaps: 0, operations: comparisons + 3 }
      });
      pi = lps[pi - 1];
      break;
    } else if (ti < n && text[ti] !== pattern[pi]) {
      if (pi !== 0) {
        const shiftTo = lps[pi - 1];
        steps.push({
          stepIndex: steps.length,
          totalSteps: steps.length + 1,
          description: `Mismatch after ${pi} matching characters. Skipping redundant checks by setting pattern pointer j = LPS[${pi - 1}] = ${shiftTo}. Text pointer i remains at ${ti}!`,
          codeLine: 15,
          stringPatternState: {
            text,
            pattern,
            textIndex: ti,
            patternIndex: shiftTo,
            lpsTable: [...lps],
            isMatch: false,
            mismatchIndex: pi
          },
          variables: {
            'LPS Shift': `j shifted ${pi} -> ${shiftTo}`,
            'Text Pointer (i)': `${ti} (unmoved)`,
            'Skipped Shifts': `${pi - shiftTo}`
          },
          stats: { comparisons, swaps: 0, operations: comparisons + 3 }
        });
        pi = shiftTo;
      } else {
        ti++;
      }
    }
  }

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateRabinKarpSteps(textStr = 'ABCCDDAEFG', patternStr = 'CDD'): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const text = textStr || 'ABCCDDAEFG';
  const pattern = patternStr || 'CDD';
  const n = text.length;
  const m = pattern.length;
  const d = 256;
  const q = 101; // Prime modulus

  let pHash = 0;
  let tHash = 0;
  let h = 1;

  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }

  for (let i = 0; i < m; i++) {
    pHash = (d * pHash + pattern.charCodeAt(i)) % q;
    tHash = (d * tHash + text.charCodeAt(i)) % q;
  }

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Rabin-Karp Rolling Hash initialized. Base prime modulus q=${q}. Pattern "${pattern}" hash = ${pHash}. Window 0 "${text.substring(0, m)}" hash = ${tHash}.`,
    codeLine: 1,
    stringPatternState: {
      text,
      pattern,
      textIndex: 0,
      patternIndex: 0,
      isMatch: false
    },
    variables: {
      'Pattern Hash': `${pHash}`,
      'Current Window Hash': `${tHash}`,
      'Modulus Prime (q)': `${q}`,
      'Rolling Formula': 'tHash = (d * (tHash - text[i]*h) + text[i+m]) mod q'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  for (let i = 0; i <= n - m; i++) {
    const windowStr = text.substring(i, i + m);
    const hashesMatch = pHash === tHash;

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Window [${i}..${i + m - 1}] "${windowStr}": Hash = ${tHash}. ${hashesMatch ? `Hash MATCH with pattern (${pHash})! Verifying characters to avoid spurious collision.` : `Hash mismatch (${tHash} != ${pHash}). Roll hash forward.`}`,
      codeLine: 4,
      stringPatternState: {
        text,
        pattern,
        textIndex: i,
        patternIndex: 0,
        isMatch: hashesMatch
      },
      variables: {
        'Window Index': `${i}`,
        'Window Substring': `"${windowStr}"`,
        'Window Hash': `${tHash}`,
        'Pattern Hash': `${pHash}`,
        'Collision Check': hashesMatch ? 'Verifying Characters' : 'Safe to Slide'
      },
      stats: { comparisons: i + 1, swaps: 0, operations: (i + 1) * 2 }
    });

    if (hashesMatch) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        steps.push({
          stepIndex: steps.length,
          totalSteps: steps.length + 1,
          description: `MATCH CONFIRMED! Pattern "${pattern}" found at index ${i} with 0 false positives!`,
          codeLine: 6,
          stringPatternState: {
            text,
            pattern,
            textIndex: i,
            patternIndex: 0,
            isMatch: true
          },
          variables: {
            'Result': `MATCH at index ${i}`,
            'Average Time': 'O(n + m)'
          },
          stats: { comparisons: i + m, swaps: 0, operations: (i + 1) * 2 + 1 }
        });
        break;
      }
    }

    if (i < n - m) {
      tHash = (d * (tHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      if (tHash < 0) tHash = tHash + q;
    }
  }

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}
