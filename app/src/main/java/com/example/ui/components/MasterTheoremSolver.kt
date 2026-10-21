package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.*
import kotlin.math.log
import kotlin.math.roundToInt

@Composable
fun MasterTheoremSolver(
    modifier: Modifier = Modifier,
) {
    var aVal by remember { mutableStateOf(2.0) }
    var bVal by remember { mutableStateOf(2.0) }
    var kVal by remember { mutableStateOf(1.0) } // n^k
    var selectedPresetName by remember { mutableStateOf("Merge Sort: T(n) = 2T(n/2) + O(n)") }

    // Presets
    val presets = listOf(
        Triple("Merge Sort", Triple(2.0, 2.0, 1.0), "T(n) = 2T(n/2) + O(n)"),
        Triple("Binary Search", Triple(1.0, 2.0, 0.0), "T(n) = T(n/2) + O(1)"),
        Triple("Karatsuba Mult.", Triple(3.0, 2.0, 1.0), "T(n) = 3T(n/2) + O(n)"),
        Triple("Strassen's Matrix", Triple(7.0, 2.0, 2.0), "T(n) = 7T(n/2) + O(n^2)"),
    )

    // Computation
    val logBOfA = log(aVal, bVal)
    val epsilon = 0.001

    val (caseResult, complexity, explanation) = when {
        kVal < logBOfA - epsilon -> {
            val roundedLog = (logBOfA * 100).roundToInt() / 100.0
            Triple(
                "Case 1 (f(n) is polynomially smaller than n^(log_b a))",
                "Θ(n^(log_$bVal($aVal))) ≈ Θ(n^$roundedLog)",
                "Since k ($kVal) < log_b(a) (${"%.2f".format(logBOfA)}), the recursion tree work is dominated by the leaves."
            )
        }
        kotlin.math.abs(kVal - logBOfA) <= epsilon -> {
            Triple(
                "Case 2 (f(n) is asymptotically equal to n^(log_b a))",
                if (kVal == 0.0) "Θ(log n)" else if (kVal == 1.0) "Θ(n log n)" else "Θ(n^$kVal log n)",
                "Since k ($kVal) = log_b(a) (${"%.2f".format(logBOfA)}), work is evenly distributed across all log(n) levels."
            )
        }
        else -> {
            Triple(
                "Case 3 (f(n) is polynomially larger than n^(log_b a))",
                if (kVal == 1.0) "Θ(n)" else "Θ(n^$kVal)",
                "Since k ($kVal) > log_b(a) (${"%.2f".format(logBOfA)}), root level division work dominates."
            )
        }
    }

    Column(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(MaterialTheme.colorScheme.surface)
            .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.5f), RoundedCornerShape(12.dp))
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Column {
            Text(
                text = "Master Theorem Recurrence Solver",
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface
            )
            Text(
                text = "Solves T(n) = a·T(n/b) + Θ(n^k) for KCT DAA Unit 1",
                fontSize = 11.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }

        // Preset Chips
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            presets.forEach { (name, vals, label) ->
                val isSelected = selectedPresetName == label
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(if (isSelected) PrimaryBlue else MaterialTheme.colorScheme.surfaceVariant)
                        .clickable {
                            selectedPresetName = label
                            aVal = vals.first
                            bVal = vals.second
                            kVal = vals.third
                        }
                        .padding(horizontal = 6.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = name,
                        fontSize = 10.sp,
                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                        color = if (isSelected) MaterialTheme.colorScheme.surface else MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        }

        // Sliders for a, b, k
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Slider A
            Column(modifier = Modifier.weight(1f)) {
                Text(text = "a (subproblems) = ${aVal.toInt()}", fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
                Slider(
                    value = aVal.toFloat(),
                    onValueChange = {
                        aVal = it.toDouble().roundToInt().toDouble()
                        selectedPresetName = ""
                    },
                    valueRange = 1f..8f,
                    steps = 6
                )
            }

            // Slider B
            Column(modifier = Modifier.weight(1f)) {
                Text(text = "b (divisor) = ${bVal.toInt()}", fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
                Slider(
                    value = bVal.toFloat(),
                    onValueChange = {
                        bVal = it.toDouble().roundToInt().coerceAtLeast(2).toDouble()
                        selectedPresetName = ""
                    },
                    valueRange = 2f..4f,
                    steps = 1
                )
            }

            // Slider K
            Column(modifier = Modifier.weight(1f)) {
                Text(text = "k (power in n^k) = ${kVal.toInt()}", fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
                Slider(
                    value = kVal.toFloat(),
                    onValueChange = {
                        kVal = it.toDouble().roundToInt().toDouble()
                        selectedPresetName = ""
                    },
                    valueRange = 0f..3f,
                    steps = 2
                )
            }
        }

        // Result Card
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(8.dp))
                .background(AccentEmeraldLight.copy(alpha = 0.5f))
                .border(1.dp, AccentEmerald.copy(alpha = 0.3f), RoundedCornerShape(8.dp))
                .padding(10.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(text = caseResult, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = AccentEmerald)
                Text(
                    text = "Closed Form: $complexity",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Text(text = explanation, fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}
