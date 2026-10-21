package com.example.data

data class AlgorithmCategory(
    val id: String,
    val indexStr: String, // e.g. "01", "02", ... "16"
    val title: String,
    val lessonCount: Int,
    val description: String,
    val iconType: String,
)

data class ComplexityInfo(
    val best: String,
    val average: String,
    val worst: String,
    val space: String,
    val paradigm: String = "Iterative / Divide & Conquer",
    val stability: String = "Stable",
    val inPlace: String = "Yes",
)

data class CodeSnippet(
    val pseudo: String,
    val cpp: String,
    val java: String,
    val python: String,
)

data class GlossaryItem(
    val term: String,
    val definition: String,
)

data class QuizQuestion(
    val question: String,
    val options: List<String>,
    val correctIndex: Int,
    val explanation: String,
)

data class GraphNodeState(
    val id: String,
    val label: String,
    val x: Float, // 0f to 1f normalized
    val y: Float, // 0f to 1f normalized
    val status: NodeStatus = NodeStatus.UNVISITED, // UNVISITED, VISITING, VISITED, IN_PATH
    val distance: String = "∞",
)

enum class NodeStatus {
    UNVISITED,
    VISITING,
    VISITED,
    IN_PATH,
}

data class GraphEdgeState(
    val from: String,
    val to: String,
    val weight: Int = 1,
    val isHighlighted: Boolean = false,
    val isPartOfMST: Boolean = false,
)

data class DpTableState(
    val rowHeaders: List<String>,
    val colHeaders: List<String>,
    val matrix: List<List<Int>>,
    val activeRow: Int = -1,
    val activeCol: Int = -1,
    val formulaExplanation: String = "",
)

data class AlgorithmStep(
    val stepIndex: Int,
    val totalSteps: Int,
    val description: String,
    val codeLine: Int = 1,
    val arrayState: List<Int> = emptyList(),
    val activeIndices: List<Int> = emptyList(),
    val swappedIndices: List<Int> = emptyList(),
    val sortedIndices: List<Int> = emptyList(),
    val pivotIndex: Int? = null,
    val targetIndex: Int? = null,
    val stackState: List<String> = emptyList(),
    val queueState: List<String> = emptyList(),
    val graphNodes: List<GraphNodeState> = emptyList(),
    val graphEdges: List<GraphEdgeState> = emptyList(),
    val dpTable: DpTableState? = null,
    val queensPlacement: List<Int> = emptyList(), // queen col at index row
    val variables: Map<String, String> = emptyMap(),
    val quiz: QuizQuestion? = null,
)

data class AlgorithmItem(
    val id: String,
    val categoryId: String,
    val name: String,
    val shortDesc: String,
    val complexity: ComplexityInfo,
    val commonMistake: String,
    val kctExamTip: String,
    val codeSnippets: CodeSnippet,
    val glossary: List<GlossaryItem>,
    val inputRequirement: String = "Array of 5 to 10 integers (e.g. 65, 35, 45, 90, 55, 75)",
    val defaultInput: List<Int> = listOf(65, 35, 45, 90, 55, 75),
)
