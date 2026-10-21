package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.PrimaryBlue

@Composable
fun PlaybackControls(
    currentStepIndex: Int,
    totalSteps: Int,
    isPlaying: Boolean,
    playbackSpeed: Float,
    onPlayPauseToggle: () -> Unit,
    onStepForward: () -> Unit,
    onStepBackward: () -> Unit,
    onJumpToStart: () -> Unit,
    onJumpToEnd: () -> Unit,
    onReset: () -> Unit,
    onSpeedChange: (Float) -> Unit,
    onRandomizeInput: () -> Unit,
    onNearlySortedInput: () -> Unit,
    onReversedInput: () -> Unit,
    showInputPresets: Boolean = true,
    modifier: Modifier = Modifier,
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(MaterialTheme.colorScheme.surface)
            .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.5f), RoundedCornerShape(12.dp))
            .padding(12.dp)
    ) {
        // Step progress text and speed selector
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Step ${currentStepIndex + 1} of $totalSteps",
                style = MaterialTheme.typography.labelLarge,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface
            )

            // Speed options
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = "Speed:",
                    fontSize = 11.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                listOf(0.5f, 1.0f, 2.0f, 4.0f).forEach { speed ->
                    val isSelected = playbackSpeed == speed
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .background(if (isSelected) PrimaryBlue else MaterialTheme.colorScheme.surfaceVariant)
                            .clickable { onSpeedChange(speed) }
                            .padding(horizontal = 6.dp, vertical = 3.dp)
                    ) {
                        Text(
                            text = "${speed}x",
                            fontSize = 10.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                            color = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Playback buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Jump to Start
            IconButton(
                onClick = onJumpToStart,
                enabled = currentStepIndex > 0
            ) {
                Icon(
                    imageVector = Icons.Default.FirstPage,
                    contentDescription = "First Step",
                    tint = MaterialTheme.colorScheme.onSurface
                )
            }

            // Step Backward
            IconButton(
                onClick = onStepBackward,
                enabled = currentStepIndex > 0
            ) {
                Icon(
                    imageVector = Icons.Default.ChevronLeft,
                    contentDescription = "Previous Step",
                    tint = MaterialTheme.colorScheme.onSurface
                )
            }

            // Play / Pause Primary Button
            Button(
                onClick = onPlayPauseToggle,
                shape = CircleShape,
                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                modifier = Modifier.size(52.dp),
                contentPadding = PaddingValues(0.dp)
            ) {
                Icon(
                    imageVector = if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                    contentDescription = if (isPlaying) "Pause" else "Play",
                    tint = Color.White,
                    modifier = Modifier.size(28.dp)
                )
            }

            // Step Forward
            IconButton(
                onClick = onStepForward,
                enabled = currentStepIndex < totalSteps - 1
            ) {
                Icon(
                    imageVector = Icons.Default.ChevronRight,
                    contentDescription = "Next Step",
                    tint = MaterialTheme.colorScheme.onSurface
                )
            }

            // Jump to End
            IconButton(
                onClick = onJumpToEnd,
                enabled = currentStepIndex < totalSteps - 1
            ) {
                Icon(
                    imageVector = Icons.Default.LastPage,
                    contentDescription = "Last Step",
                    tint = MaterialTheme.colorScheme.onSurface
                )
            }

            // Reset
            IconButton(onClick = onReset) {
                Icon(
                    imageVector = Icons.Default.Refresh,
                    contentDescription = "Reset",
                    tint = MaterialTheme.colorScheme.onSurface
                )
            }
        }

        if (showInputPresets) {
            Spacer(modifier = Modifier.height(8.dp))
            HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
            Spacer(modifier = Modifier.height(8.dp))

            // Dataset preset buttons
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Presets:",
                    fontSize = 11.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Button(
                    onClick = onRandomizeInput,
                    modifier = Modifier.weight(1f).height(32.dp),
                    contentPadding = PaddingValues(horizontal = 6.dp, vertical = 0.dp),
                    shape = RoundedCornerShape(6.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Text(text = "Random", fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurface)
                }

                Button(
                    onClick = onNearlySortedInput,
                    modifier = Modifier.weight(1f).height(32.dp),
                    contentPadding = PaddingValues(horizontal = 6.dp, vertical = 0.dp),
                    shape = RoundedCornerShape(6.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Text(text = "Nearly Sorted", fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurface)
                }

                Button(
                    onClick = onReversedInput,
                    modifier = Modifier.weight(1f).height(32.dp),
                    contentPadding = PaddingValues(horizontal = 6.dp, vertical = 0.dp),
                    shape = RoundedCornerShape(6.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Text(text = "Reversed", fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurface)
                }
            }
        }
    }
}
