package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
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
import com.example.data.CodeSnippet
import com.example.ui.theme.PrimaryBlue
import com.example.ui.theme.VisComparing

enum class CodeLanguage {
    PSEUDO, CPP, JAVA, PYTHON
}

@Composable
fun CodeTracePanel(
    codeSnippets: CodeSnippet,
    activeLine: Int,
    modifier: Modifier = Modifier,
) {
    var selectedLang by remember { mutableStateOf(CodeLanguage.CPP) }

    val rawCode = when (selectedLang) {
        CodeLanguage.PSEUDO -> codeSnippets.pseudo
        CodeLanguage.CPP -> codeSnippets.cpp
        CodeLanguage.JAVA -> codeSnippets.java
        CodeLanguage.PYTHON -> codeSnippets.python
    }

    val lines = rawCode.lines()

    Column(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(Color(0xFF1E2430))
            .border(1.dp, Color(0xFF334155), RoundedCornerShape(12.dp))
            .padding(12.dp)
    ) {
        // Tab selector row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Algorithm Implementation Trace",
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )

            Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                listOf(
                    CodeLanguage.CPP to "C++",
                    CodeLanguage.JAVA to "Java",
                    CodeLanguage.PYTHON to "Python",
                    CodeLanguage.PSEUDO to "Pseudo"
                ).forEach { (lang, label) ->
                    val isSelected = selectedLang == lang
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(4.dp))
                            .background(if (isSelected) PrimaryBlue else Color(0xFF2D3748))
                            .clickable { selectedLang = lang }
                            .padding(horizontal = 6.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = label,
                            fontSize = 10.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                            color = Color.White
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Code block with line numbers & active highlight
        val scrollState = rememberScrollState()
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(scrollState)
                .background(Color(0xFF161B22), RoundedCornerShape(6.dp))
                .padding(vertical = 8.dp)
        ) {
            lines.forEachIndexed { index, line ->
                val lineNum = index + 1
                val isActive = lineNum == activeLine

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(if (isActive) VisComparing.copy(alpha = 0.25f) else Color.Transparent)
                        .padding(horizontal = 8.dp, vertical = 2.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Line number
                    Text(
                        text = String.format("%2d ", lineNum),
                        fontSize = 11.sp,
                        fontFamily = FontFamily.Monospace,
                        color = if (isActive) VisComparing else Color(0xFF6B7280),
                        fontWeight = if (isActive) FontWeight.Bold else FontWeight.Normal
                    )

                    // Line content
                    Text(
                        text = line,
                        fontSize = 11.sp,
                        fontFamily = FontFamily.Monospace,
                        color = if (isActive) Color(0xFFFDE047) else Color(0xFFE2E8F0),
                        fontWeight = if (isActive) FontWeight.Bold else FontWeight.Normal
                    )
                }
            }
        }
    }
}
