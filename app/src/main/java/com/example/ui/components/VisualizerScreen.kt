package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
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
import com.example.data.AlgorithmItem
import com.example.data.AlgorithmStep
import com.example.engine.AlgorithmStepGenerators
import com.example.ui.theme.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive

enum class VisualizerTab {
    ANIMATION,
    PREDICTION_MODE,
    DRY_RUN_WORKSHEET,
    CODE_TRACE
}

@Composable
fun VisualizerScreen(
    algorithm: AlgorithmItem,
    isCompleted: Boolean,
    onToggleCompleted: () -> Unit,
    onBackClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    var activeTab by remember { mutableStateOf(VisualizerTab.ANIMATION) }
    var currentInput by remember(algorithm.id) { mutableStateOf(algorithm.defaultInput) }

    // Generate steps based on algorithm and current input
    val steps = remember(algorithm.id, currentInput) {
        when (algorithm.id) {
            "bubble_sort" -> AlgorithmStepGenerators.generateBubbleSort(currentInput)
            "selection_sort" -> AlgorithmStepGenerators.generateSelectionSort(currentInput)
            "insertion_sort" -> AlgorithmStepGenerators.generateInsertionSort(currentInput)
            "binary_search" -> AlgorithmStepGenerators.generateBinarySearch(currentInput, target = 55)
            "stack_ds" -> AlgorithmStepGenerators.generateStackSteps()
            "queue_ds" -> AlgorithmStepGenerators.generateQueueSteps()
            "graph_bfs" -> AlgorithmStepGenerators.generateGraphBfs()
            "knapsack_dp" -> AlgorithmStepGenerators.generateKnapsackDp()
            "n_queens" -> AlgorithmStepGenerators.generateNQueens()
            else -> AlgorithmStepGenerators.generateBubbleSort(currentInput)
        }
    }

    var currentStepIndex by remember(algorithm.id, currentInput) { mutableStateOf(0) }
    var isPlaying by remember { mutableStateOf(false) }
    var playbackSpeed by remember { mutableStateOf(1.0f) }

    // Auto Playback Coroutine
    LaunchedEffect(isPlaying, currentStepIndex, steps.size, playbackSpeed) {
        if (isPlaying) {
            val delayMillis = (1000L / playbackSpeed).toLong().coerceAtLeast(150L)
            while (isActive && isPlaying && currentStepIndex < steps.size - 1) {
                delay(delayMillis)
                currentStepIndex++
            }
            if (currentStepIndex >= steps.size - 1) {
                isPlaying = false
            }
        }
    }

    val currentStep = steps.getOrElse(currentStepIndex) {
        AlgorithmStep(0, 1, "Initializing...")
    }

    val scrollState = rememberScrollState()

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(scrollState),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Top Bar Navigation & Title
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                IconButton(onClick = onBackClick) {
                    Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back", tint = PrimaryBlue)
                }
                Column {
                    Text(
                        text = algorithm.name,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = "KCT DAA · ${algorithm.complexity.paradigm}",
                        fontSize = 11.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            // Quick Mark Complete toggle
            IconButton(onClick = onToggleCompleted) {
                Icon(
                    imageVector = if (isCompleted) Icons.Default.CheckCircle else Icons.Default.RadioButtonUnchecked,
                    contentDescription = "Toggle completion",
                    tint = if (isCompleted) AccentEmerald else MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        // Mode Navigation Tabs
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(8.dp))
                .background(MaterialTheme.colorScheme.surfaceVariant)
                .padding(4.dp),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            listOf(
                VisualizerTab.ANIMATION to "Animation",
                VisualizerTab.PREDICTION_MODE to "Quiz Predict",
                VisualizerTab.DRY_RUN_WORKSHEET to "Dry Run",
                VisualizerTab.CODE_TRACE to "Code Trace"
            ).forEach { (tab, title) ->
                val isSelected = activeTab == tab
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(6.dp))
                        .background(if (isSelected) MaterialTheme.colorScheme.surface else Color.Transparent)
                        .clickable { activeTab = tab }
                        .padding(vertical = 6.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = title,
                        fontSize = 11.sp,
                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                        color = if (isSelected) PrimaryBlue else MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }

        // Live Step Explanation Banner
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(MaterialTheme.colorScheme.surface)
                .border(1.dp, PrimaryBlue.copy(alpha = 0.3f), RoundedCornerShape(12.dp))
                .padding(14.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "CURRENT STEP ACTION",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = PrimaryBlue,
                        letterSpacing = 1.sp
                    )
                    Text(
                        text = "Step ${currentStepIndex + 1} of ${steps.size}",
                        fontSize = 11.sp,
                        fontFamily = FontFamily.Monospace,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                Text(
                    text = currentStep.description,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = MaterialTheme.colorScheme.onSurface,
                    lineHeight = 18.sp
                )

                // Variables Row
                if (currentStep.variables.isNotEmpty()) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 4.dp),
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        currentStep.variables.forEach { (k, v) ->
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(4.dp))
                                    .background(MaterialTheme.colorScheme.surfaceVariant)
                                    .padding(horizontal = 6.dp, vertical = 2.dp)
                            ) {
                                Text(
                                    text = "$k: $v",
                                    fontSize = 10.sp,
                                    fontFamily = FontFamily.Monospace,
                                    color = MaterialTheme.colorScheme.onSurface
                                )
                            }
                        }
                    }
                }
            }
        }

        // Interactive Visualizer Canvas
        VisualizerCanvas(
            step = currentStep,
            algorithmId = algorithm.id
        )

        // Playback Controls
        PlaybackControls(
            currentStepIndex = currentStepIndex,
            totalSteps = steps.size,
            isPlaying = isPlaying,
            playbackSpeed = playbackSpeed,
            onPlayPauseToggle = { isPlaying = !isPlaying },
            onStepForward = {
                if (currentStepIndex < steps.size - 1) {
                    currentStepIndex++
                    isPlaying = false
                }
            },
            onStepBackward = {
                if (currentStepIndex > 0) {
                    currentStepIndex--
                    isPlaying = false
                }
            },
            onJumpToStart = {
                currentStepIndex = 0
                isPlaying = false
            },
            onJumpToEnd = {
                currentStepIndex = steps.size - 1
                isPlaying = false
            },
            onReset = {
                currentStepIndex = 0
                isPlaying = false
            },
            onSpeedChange = { playbackSpeed = it },
            onRandomizeInput = {
                currentInput = (1..6).map { (10..99).random() }
                currentStepIndex = 0
                isPlaying = false
            },
            onNearlySortedInput = {
                currentInput = listOf(20, 35, 42, 60, 58, 85)
                currentStepIndex = 0
                isPlaying = false
            },
            onReversedInput = {
                currentInput = listOf(95, 80, 65, 50, 35, 15)
                currentStepIndex = 0
                isPlaying = false
            },
            showInputPresets = currentStep.arrayState.isNotEmpty()
        )

        // Content according to selected tab
        when (activeTab) {
            VisualizerTab.ANIMATION -> {
                ComplexityAndDetailsCard(
                    algorithm = algorithm,
                    isCompleted = isCompleted,
                    onToggleCompleted = onToggleCompleted
                )
                CodeTracePanel(
                    codeSnippets = algorithm.codeSnippets,
                    activeLine = currentStep.codeLine
                )
            }
            VisualizerTab.PREDICTION_MODE -> {
                val currentQuiz = currentStep.quiz ?: steps.mapNotNull { it.quiz }.firstOrNull()
                if (currentQuiz != null) {
                    StepPredictionQuizView(quiz = currentQuiz)
                } else {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(12.dp))
                            .background(MaterialTheme.colorScheme.surface)
                            .padding(16.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "Interactive quiz: Navigate to Step 3 in Bubble Sort to test element swapping prediction!",
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
                ComplexityAndDetailsCard(
                    algorithm = algorithm,
                    isCompleted = isCompleted,
                    onToggleCompleted = onToggleCompleted
                )
            }
            VisualizerTab.DRY_RUN_WORKSHEET -> {
                DryRunWorksheetView(
                    steps = steps,
                    currentStepIndex = currentStepIndex,
                    onStepSelected = {
                        currentStepIndex = it
                        isPlaying = false
                    }
                )
                ComplexityAndDetailsCard(
                    algorithm = algorithm,
                    isCompleted = isCompleted,
                    onToggleCompleted = onToggleCompleted
                )
            }
            VisualizerTab.CODE_TRACE -> {
                CodeTracePanel(
                    codeSnippets = algorithm.codeSnippets,
                    activeLine = currentStep.codeLine
                )
                ComplexityAndDetailsCard(
                    algorithm = algorithm,
                    isCompleted = isCompleted,
                    onToggleCompleted = onToggleCompleted
                )
            }
        }

        Spacer(modifier = Modifier.height(24.dp))
    }
}
