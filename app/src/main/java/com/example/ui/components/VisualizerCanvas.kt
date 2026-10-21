package com.example.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.*
import com.example.ui.theme.*

@Composable
fun VisualizerCanvas(
    step: AlgorithmStep,
    algorithmId: String,
    modifier: Modifier = Modifier,
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(290.dp)
            .clip(RoundedCornerShape(12.dp))
            .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
            .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.6f), RoundedCornerShape(12.dp))
            .padding(12.dp),
        contentAlignment = Alignment.Center
    ) {
        when {
            step.stackState.isNotEmpty() || algorithmId == "stack_ds" -> {
                StackCanvas(stack = step.stackState)
            }
            step.queueState.isNotEmpty() || algorithmId == "queue_ds" -> {
                QueueCanvas(queue = step.queueState)
            }
            step.graphNodes.isNotEmpty() -> {
                GraphCanvas(nodes = step.graphNodes, edges = step.graphEdges)
            }
            step.dpTable != null -> {
                DpMatrixCanvas(dpTable = step.dpTable)
            }
            step.queensPlacement.isNotEmpty() || algorithmId == "n_queens" -> {
                NQueensCanvas(queens = step.queensPlacement)
            }
            step.arrayState.isNotEmpty() -> {
                ArrayBarsCanvas(
                    array = step.arrayState,
                    activeIndices = step.activeIndices,
                    swappedIndices = step.swappedIndices,
                    sortedIndices = step.sortedIndices,
                    pivotIndex = step.pivotIndex,
                    targetIndex = step.targetIndex
                )
            }
            else -> {
                Text(
                    text = "Awaiting input steps...",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

// 1. Interactive Animated Bar Chart for Sorting & Searching
@Composable
fun ArrayBarsCanvas(
    array: List<Int>,
    activeIndices: List<Int>,
    swappedIndices: List<Int>,
    sortedIndices: List<Int>,
    pivotIndex: Int?,
    targetIndex: Int?,
    modifier: Modifier = Modifier,
) {
    val maxVal = (array.maxOrNull() ?: 100).coerceAtLeast(10)

    Column(
        modifier = modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Bottom,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Legend row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 8.dp),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            LegendItem(color = VisDefault, label = "Default")
            Spacer(modifier = Modifier.width(10.dp))
            LegendItem(color = VisComparing, label = "Comparing")
            Spacer(modifier = Modifier.width(10.dp))
            LegendItem(color = VisSwapping, label = "Swapped")
            Spacer(modifier = Modifier.width(10.dp))
            LegendItem(color = VisSorted, label = "Sorted")
            if (pivotIndex != null) {
                Spacer(modifier = Modifier.width(10.dp))
                LegendItem(color = VisPivot, label = "Pivot / Mid")
            }
        }

        // Bars
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.Bottom
        ) {
            array.forEachIndexed { index, value ->
                val isSwapped = swappedIndices.contains(index)
                val isActive = activeIndices.contains(index)
                val isSorted = sortedIndices.contains(index)
                val isPivot = pivotIndex == index
                val isTarget = targetIndex == index

                val targetColor = when {
                    isSwapped -> VisSwapping
                    isActive -> VisComparing
                    isPivot -> VisPivot
                    isSorted -> VisSorted
                    isTarget -> AccentCyan
                    else -> VisDefault
                }

                val animatedColor by animateColorAsState(
                    targetValue = targetColor,
                    animationSpec = tween(durationMillis = 250),
                    label = "barColor_$index"
                )

                val targetHeightFraction = (value.toFloat() / maxVal).coerceIn(0.12f, 1.0f)
                val animatedHeightFraction by animateFloatAsState(
                    targetValue = targetHeightFraction,
                    animationSpec = tween(durationMillis = 250),
                    label = "barHeight_$index"
                )

                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Bottom,
                    modifier = Modifier.fillMaxHeight()
                ) {
                    // Value label on top of bar
                    Text(
                        text = "$value",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface,
                        fontFamily = FontFamily.Monospace,
                        modifier = Modifier.padding(bottom = 2.dp)
                    )

                    // Bar element
                    Box(
                        modifier = Modifier
                            .width(28.dp)
                            .fillMaxHeight(animatedHeightFraction)
                            .clip(RoundedCornerShape(topStart = 6.dp, topEnd = 6.dp))
                            .background(animatedColor)
                            .border(1.dp, animatedColor.copy(alpha = 0.8f), RoundedCornerShape(topStart = 6.dp, topEnd = 6.dp))
                    )

                    // Index label below bar
                    Text(
                        text = "[$index]",
                        fontSize = 10.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        fontFamily = FontFamily.Monospace,
                        modifier = Modifier.padding(top = 4.dp)
                    )
                }
            }
        }
    }
}

@Composable
private fun LegendItem(color: Color, label: String) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Box(
            modifier = Modifier
                .size(8.dp)
                .clip(RoundedCornerShape(2.dp))
                .background(color)
        )
        Spacer(modifier = Modifier.width(4.dp))
        Text(
            text = label,
            fontSize = 10.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

// 2. Stack (LIFO) Canister
@Composable
fun StackCanvas(stack: List<String>, modifier: Modifier = Modifier) {
    Row(
        modifier = modifier
            .fillMaxSize()
            .padding(8.dp),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.Bottom
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.width(180.dp)
        ) {
            Text(
                text = "TOP -> ${if (stack.isNotEmpty()) stack.last() else "(Empty)"}",
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                color = if (stack.isNotEmpty()) VisComparing else MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(bottom = 6.dp)
            )

            // Canister frame
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .clip(RoundedCornerShape(bottomStart = 8.dp, bottomEnd = 8.dp))
                    .background(MaterialTheme.colorScheme.surface)
                    .border(2.dp, MaterialTheme.colorScheme.primary, RoundedCornerShape(bottomStart = 8.dp, bottomEnd = 8.dp))
                    .padding(6.dp),
                contentAlignment = Alignment.BottomCenter
            ) {
                if (stack.isEmpty()) {
                    Text(
                        text = "Stack is Empty\n(Top = -1)",
                        fontSize = 11.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        textAlign = TextAlign.Center
                    )
                } else {
                    Column(
                        modifier = Modifier.fillMaxWidth(),
                        verticalArrangement = Arrangement.spacedBy(4.dp, Alignment.Bottom),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        stack.reversed().forEachIndexed { reverseIdx, item ->
                            val actualIdx = stack.size - 1 - reverseIdx
                            val isTop = reverseIdx == 0
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(34.dp)
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(if (isTop) VisComparing else VisDefault)
                                    .padding(horizontal = 8.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = "[$actualIdx]",
                                        fontSize = 10.sp,
                                        color = Color.White.copy(alpha = 0.8f),
                                        fontFamily = FontFamily.Monospace
                                    )
                                    Text(
                                        text = item,
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = Color.White
                                    )
                                    Text(
                                        text = if (isTop) "TOP" else "",
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = Color.White
                                    )
                                }
                            }
                        }
                    }
                }
            }
            Text(
                text = "Stack Bottom",
                fontSize = 10.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 4.dp)
            )
        }
    }
}

// 3. Queue (FIFO) Conveyor Belt
@Composable
fun QueueCanvas(queue: List<String>, modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(12.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = "▲ DEQUEUE (Front)", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = VisSwapping)
            Text(text = "ENQUEUE (Rear) ▲", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = VisSorted)
        }

        Spacer(modifier = Modifier.height(12.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(70.dp)
                .clip(RoundedCornerShape(8.dp))
                .background(MaterialTheme.colorScheme.surface)
                .border(2.dp, MaterialTheme.colorScheme.primary, RoundedCornerShape(8.dp))
                .padding(horizontal = 8.dp),
            contentAlignment = Alignment.Center
        ) {
            if (queue.isEmpty()) {
                Text(text = "Queue is Empty", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
            } else {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp, Alignment.Start),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    queue.forEachIndexed { index, item ->
                        val isFront = index == 0
                        val isRear = index == queue.size - 1
                        val bgColor = when {
                            isFront -> VisSwapping
                            isRear -> VisSorted
                            else -> VisDefault
                        }
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .height(50.dp)
                                .clip(RoundedCornerShape(6.dp))
                                .background(bgColor)
                                .padding(4.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text(
                                    text = item,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White
                                )
                                Text(
                                    text = if (isFront && isRear) "FR" else if (isFront) "FRONT" else if (isRear) "REAR" else "#$index",
                                    fontSize = 9.sp,
                                    color = Color.White.copy(alpha = 0.85f)
                                )
                            }
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "FIFO: First In, First Out | Order preserved",
            fontSize = 11.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

// 4. Graph Network Canvas (Nodes & Edges)
@Composable
fun GraphCanvas(
    nodes: List<GraphNodeState>,
    edges: List<GraphEdgeState>,
    modifier: Modifier = Modifier,
) {
    Canvas(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        val width = size.width
        val height = size.height

        val nodePositions = nodes.associate { node ->
            node.id to Offset(node.x * width, node.y * height)
        }

        // Draw Edges
        edges.forEach { edge ->
            val p1 = nodePositions[edge.from]
            val p2 = nodePositions[edge.to]
            if (p1 != null && p2 != null) {
                val edgeColor = if (edge.isHighlighted) VisComparing else Color.LightGray
                val strokeW = if (edge.isHighlighted) 3.5f else 1.5f
                drawLine(
                    color = edgeColor,
                    start = p1,
                    end = p2,
                    strokeWidth = strokeW,
                    cap = StrokeCap.Round
                )
            }
        }

        // Draw Nodes
        nodes.forEach { node ->
            val pos = nodePositions[node.id] ?: Offset.Zero
            val nodeColor = when (node.status) {
                NodeStatus.UNVISITED -> VisDefault
                NodeStatus.VISITING -> VisComparing
                NodeStatus.VISITED -> VisSorted
                NodeStatus.IN_PATH -> SecondaryIndigo
            }

            // Outer glow
            drawCircle(
                color = nodeColor.copy(alpha = 0.2f),
                radius = 24.dp.toPx(),
                center = pos
            )
            // Node circle
            drawCircle(
                color = nodeColor,
                radius = 18.dp.toPx(),
                center = pos
            )
        }
    }
}

// 5. Dynamic Programming Matrix Table
@Composable
fun DpMatrixCanvas(dpTable: DpTableState, modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(4.dp)
    ) {
        Text(
            text = dpTable.formulaExplanation,
            fontSize = 10.sp,
            fontWeight = FontWeight.SemiBold,
            color = PrimaryBlue,
            modifier = Modifier.padding(bottom = 4.dp)
        )

        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(2.dp)
        ) {
            // Header row
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(2.dp)
                ) {
                    Box(modifier = Modifier.width(60.dp).padding(2.dp)) {
                        Text(text = "i \\ W", fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    }
                    dpTable.colHeaders.forEach { colH ->
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .background(MaterialTheme.colorScheme.surfaceVariant)
                                .padding(vertical = 2.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(text = colH, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }

            // Matrix rows
            itemsIndexed(dpTable.matrix) { rowIdx, rowValues ->
                val rowLabel = dpTable.rowHeaders.getOrElse(rowIdx) { "R$rowIdx" }
                val isRowActive = dpTable.activeRow == rowIdx

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(2.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .width(60.dp)
                            .background(if (isRowActive) VisComparing.copy(alpha = 0.2f) else Color.Transparent)
                            .padding(2.dp)
                    ) {
                        Text(
                            text = rowLabel,
                            fontSize = 9.sp,
                            fontWeight = if (isRowActive) FontWeight.Bold else FontWeight.Normal,
                            maxLines = 1
                        )
                    }

                    rowValues.forEachIndexed { colIdx, cellVal ->
                        val isCellActive = isRowActive && dpTable.activeCol == colIdx
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .height(24.dp)
                                .clip(RoundedCornerShape(3.dp))
                                .background(
                                    when {
                                        isCellActive -> VisComparing
                                        cellVal > 0 -> VisSorted.copy(alpha = 0.2f)
                                        else -> MaterialTheme.colorScheme.surface
                                    }
                                )
                                .border(
                                    0.5.dp,
                                    if (isCellActive) VisComparing else MaterialTheme.colorScheme.outline.copy(alpha = 0.3f),
                                    RoundedCornerShape(3.dp)
                                ),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "$cellVal",
                                fontSize = 10.sp,
                                fontWeight = if (isCellActive) FontWeight.Bold else FontWeight.Normal,
                                color = if (isCellActive) Color.White else MaterialTheme.colorScheme.onSurface,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }
                }
            }
        }
    }
}

// 6. N-Queens Chessboard
@Composable
fun NQueensCanvas(queens: List<Int>, modifier: Modifier = Modifier) {
    val boardSize = 4
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(4.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "4x4 Chessboard Backtracking State",
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSurface,
            modifier = Modifier.padding(bottom = 6.dp)
        )

        Box(
            modifier = Modifier
                .size(190.dp)
                .clip(RoundedCornerShape(8.dp))
                .border(2.dp, MaterialTheme.colorScheme.primary, RoundedCornerShape(8.dp))
        ) {
            Column(modifier = Modifier.fillMaxSize()) {
                for (row in 0 until boardSize) {
                    Row(modifier = Modifier.weight(1f).fillMaxWidth()) {
                        for (col in 0 until boardSize) {
                            val isLight = (row + col) % 2 == 0
                            val hasQueen = queens.getOrNull(row) == col

                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .fillMaxHeight()
                                    .background(
                                        if (hasQueen) VisComparing.copy(alpha = 0.4f)
                                        else if (isLight) Color(0xFFF0D9B5)
                                        else Color(0xFFB58863)
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                if (hasQueen) {
                                    Text(
                                        text = "♛",
                                        fontSize = 24.sp,
                                        color = if (queens.size == 4) VisSorted else VisSwapping,
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
