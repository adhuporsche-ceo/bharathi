package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.HelpOutline
import androidx.compose.material.icons.filled.HighlightOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.QuizQuestion
import com.example.ui.theme.AccentEmerald
import com.example.ui.theme.AccentRose
import com.example.ui.theme.PrimaryBlue

@Composable
fun StepPredictionQuizView(
    quiz: QuizQuestion,
    modifier: Modifier = Modifier,
) {
    var selectedOption by remember(quiz) { mutableStateOf<Int?>(null) }
    val isAnswered = selectedOption != null
    val isCorrect = selectedOption == quiz.correctIndex

    Column(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(MaterialTheme.colorScheme.surface)
            .border(1.dp, PrimaryBlue.copy(alpha = 0.5f), RoundedCornerShape(12.dp))
            .padding(14.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            Icon(
                imageVector = Icons.Default.HelpOutline,
                contentDescription = null,
                tint = PrimaryBlue,
                modifier = Modifier.size(18.dp)
            )
            Text(
                text = "Step Prediction Challenge",
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                color = PrimaryBlue
            )
        }

        Spacer(modifier = Modifier.height(6.dp))

        Text(
            text = quiz.question,
            fontSize = 13.sp,
            fontWeight = FontWeight.SemiBold,
            color = MaterialTheme.colorScheme.onSurface
        )

        Spacer(modifier = Modifier.height(10.dp))

        quiz.options.forEachIndexed { index, optionText ->
            val isThisSelected = selectedOption == index
            val optionBg = when {
                !isAnswered -> MaterialTheme.colorScheme.surfaceVariant
                index == quiz.correctIndex -> AccentEmerald.copy(alpha = 0.15f)
                isThisSelected -> AccentRose.copy(alpha = 0.15f)
                else -> MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
            }
            val optionBorder = when {
                !isAnswered && isThisSelected -> PrimaryBlue
                index == quiz.correctIndex && isAnswered -> AccentEmerald
                isThisSelected && isAnswered -> AccentRose
                else -> Color.Transparent
            }

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 3.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(optionBg)
                    .border(1.dp, optionBorder, RoundedCornerShape(8.dp))
                    .clickable(enabled = !isAnswered) {
                        selectedOption = index
                    }
                    .padding(horizontal = 12.dp, vertical = 8.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "${('A'.code + index).toChar()}. $optionText",
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.onSurface,
                        fontWeight = if (isThisSelected) FontWeight.Bold else FontWeight.Normal
                    )

                    if (isAnswered) {
                        if (index == quiz.correctIndex) {
                            Icon(imageVector = Icons.Default.CheckCircle, contentDescription = null, tint = AccentEmerald, modifier = Modifier.size(16.dp))
                        } else if (isThisSelected) {
                            Icon(imageVector = Icons.Default.HighlightOff, contentDescription = null, tint = AccentRose, modifier = Modifier.size(16.dp))
                        }
                    }
                }
            }
        }

        if (isAnswered) {
            Spacer(modifier = Modifier.height(8.dp))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(6.dp))
                    .background(if (isCorrect) AccentEmerald.copy(alpha = 0.1f) else AccentRose.copy(alpha = 0.1f))
                    .padding(8.dp)
            ) {
                Text(
                    text = "${if (isCorrect) "✓ Correct!" else "✗ Incorrect."} ${quiz.explanation}",
                    fontSize = 11.sp,
                    color = if (isCorrect) AccentEmerald else AccentRose,
                    lineHeight = 15.sp
                )
            }
        }
    }
}
