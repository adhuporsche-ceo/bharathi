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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.engine.AlgorithmStepGenerators
import com.example.ui.theme.PrimaryBlue
import com.example.ui.theme.VisComparing
import com.example.ui.theme.VisSorted
import com.example.ui.theme.VisSwapping

@Composable
fun AlgorithmComparatorView(
    modifier: Modifier = Modifier,
) {
    val sampleInput = listOf(65, 35, 45, 90, 55, 75)

    var algo1 by remember { mutableStateOf("Bubble Sort") }
    var algo2 by remember { mutableStateOf("Selection Sort") }

    val steps1 = remember(algo1) {
        when (algo1) {
            "Bubble Sort" -> AlgorithmStepGenerators.generateBubbleSort(sampleInput)
            "Selection Sort" -> AlgorithmStepGenerators.generateSelectionSort(sampleInput)
            else -> AlgorithmStepGenerators.generateInsertionSort(sampleInput)
        }
    }

    val steps2 = remember(algo2) {
        when (algo2) {
            "Bubble Sort" -> AlgorithmStepGenerators.generateBubbleSort(sampleInput)
            "Selection Sort" -> AlgorithmStepGenerators.generateSelectionSort(sampleInput)
            else -> AlgorithmStepGenerators.generateInsertionSort(sampleInput)
        }
    }

    var progressFraction by remember { mutableStateOf(0.5f) }

    val idx1 = (progressFraction * (steps1.size - 1)).toInt().coerceIn(0, steps1.size - 1)
    val idx2 = (progressFraction * (steps2.size - 1)).toInt().coerceIn(0, steps2.size - 1)

    val currentStep1 = steps1[idx1]
    val currentStep2 = steps2[idx2]

    Column(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(MaterialTheme.colorScheme.surface)
            .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.5f), RoundedCornerShape(12.dp))
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Dual-Algorithm Synchronous Comparator",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = "Compare operations on identical input: $sampleInput",
                    fontSize = 11.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        // Algo Selectors
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            // Algo 1 selector
            Column(modifier = Modifier.weight(1f)) {
                Text("Left Algorithm:", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                    listOf("Bubble Sort", "Insertion Sort").forEach { name ->
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(4.dp))
                                .background(if (algo1 == name) PrimaryBlue else MaterialTheme.colorScheme.surfaceVariant)
                                .clickable { algo1 = name }
                                .padding(horizontal = 6.dp, vertical = 2.dp)
                        ) {
                            Text(
                                text = name.take(6),
                                fontSize = 10.sp,
                                color = if (algo1 == name) Color.White else MaterialTheme.colorScheme.onSurface
                            )
                        }
                    }
                }
            }

            // Algo 2 selector
            Column(modifier = Modifier.weight(1f)) {
                Text("Right Algorithm:", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                    listOf("Selection Sort", "Insertion Sort").forEach { name ->
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(4.dp))
                                .background(if (algo2 == name) PrimaryBlue else MaterialTheme.colorScheme.surfaceVariant)
                                .clickable { algo2 = name }
                                .padding(horizontal = 6.dp, vertical = 2.dp)
                        ) {
                            Text(
                                text = name.take(6),
                                fontSize = 10.sp,
                                color = if (algo2 == name) Color.White else MaterialTheme.colorScheme.onSurface
                            )
                        }
                    }
                }
            }
        }

        // Shared progress slider
        Column {
            Text(
                text = "Synchronized Progress: ${(progressFraction * 100).toInt()}%",
                fontSize = 11.sp,
                fontWeight = FontWeight.SemiBold
            )
            Slider(
                value = progressFraction,
                onValueChange = { progressFraction = it },
                valueRange = 0f..1f
            )
        }

        // Side-by-side states
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            // Side 1
            Column(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(8.dp))
                    .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
                    .padding(8.dp)
            ) {
                Text(text = algo1, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = PrimaryBlue)
                Text(
                    text = "Step $idx1 of ${steps1.size} (Total: ${steps1.size})",
                    fontSize = 10.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = currentStep1.arrayState.toString(),
                    fontSize = 10.sp,
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = currentStep1.description,
                    fontSize = 10.sp,
                    maxLines = 2,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            // Side 2
            Column(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(8.dp))
                    .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
                    .padding(8.dp)
            ) {
                Text(text = algo2, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = VisSorted)
                Text(
                    text = "Step $idx2 of ${steps2.size} (Total: ${steps2.size})",
                    fontSize = 10.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = currentStep2.arrayState.toString(),
                    fontSize = 10.sp,
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = currentStep2.description,
                    fontSize = 10.sp,
                    maxLines = 2,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}
