package com.example.engine

import com.example.data.*

object AlgorithmStepGenerators {

    // 1. Bubble Sort Generator
    fun generateBubbleSort(input: List<Int>): List<AlgorithmStep> {
        val steps = mutableListOf<AlgorithmStep>()
        val arr = input.toMutableList()
        val n = arr.size
        val sortedIndices = mutableListOf<Int>()

        steps.add(
            AlgorithmStep(
                stepIndex = 0,
                totalSteps = 1,
                description = "Initial state: Array with ${arr.size} elements ready for Bubble Sort.",
                codeLine = 1,
                arrayState = arr.toList(),
                activeIndices = emptyList(),
                sortedIndices = emptyList(),
                variables = mapOf("n" to "$n", "status" to "Starting pass 1")
            )
        )

        for (i in 0 until n - 1) {
            var swapped = false
            for (j in 0 until n - i - 1) {
                // Comparison step
                val compareStep = AlgorithmStep(
                    stepIndex = steps.size,
                    totalSteps = steps.size + 1,
                    description = "Pass ${i + 1}: Comparing arr[$j]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}.",
                    codeLine = 3,
                    arrayState = arr.toList(),
                    activeIndices = listOf(j, j + 1),
                    sortedIndices = sortedIndices.toList(),
                    variables = mapOf("i" to "$i", "j" to "$j", "arr[j]" to "${arr[j]}", "arr[j+1]" to "${arr[j+1]}"),
                    quiz = if (steps.size == 2) {
                        QuizQuestion(
                            question = "Will ${arr[j]} and ${arr[j + 1]} be swapped?",
                            options = listOf("Yes, because ${arr[j]} > ${arr[j + 1]}", "No, because ${arr[j]} <= ${arr[j + 1]}", "Cannot determine yet"),
                            correctIndex = if (arr[j] > arr[j + 1]) 0 else 1,
                            explanation = if (arr[j] > arr[j + 1]) "${arr[j]} is strictly greater than ${arr[j + 1]}, so Bubble Sort swaps them." else "They are already in relative ascending order."
                        )
                    } else null
                )
                steps.add(compareStep)

                if (arr[j] > arr[j + 1]) {
                    val temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                    swapped = true

                    steps.add(
                        AlgorithmStep(
                            stepIndex = steps.size,
                            totalSteps = steps.size + 1,
                            description = "Swapped arr[$j] (${arr[j + 1]}) with arr[${j + 1}] (${arr[j]}) because ${arr[j + 1]} > ${arr[j]}.",
                            codeLine = 4,
                            arrayState = arr.toList(),
                            activeIndices = listOf(j, j + 1),
                            swappedIndices = listOf(j, j + 1),
                            sortedIndices = sortedIndices.toList(),
                            variables = mapOf("i" to "$i", "j" to "$j", "swapped" to "true")
                        )
                    )
                }
            }
            sortedIndices.add(n - i - 1)
            steps.add(
                AlgorithmStep(
                    stepIndex = steps.size,
                    totalSteps = steps.size + 1,
                    description = "End of Pass ${i + 1}: Element ${arr[n - i - 1]} at index ${n - i - 1} bubbled up to its correct final sorted position.",
                    codeLine = 6,
                    arrayState = arr.toList(),
                    sortedIndices = sortedIndices.toList(),
                    variables = mapOf("pass" to "${i + 1}", "settled" to "${arr[n - i - 1]}")
                )
            )
            if (!swapped) break
        }
        sortedIndices.clear()
        sortedIndices.addAll(0 until n)

        steps.add(
            AlgorithmStep(
                stepIndex = steps.size,
                totalSteps = steps.size + 1,
                description = "Bubble Sort Complete! The entire array is sorted in non-decreasing order.",
                codeLine = 7,
                arrayState = arr.toList(),
                sortedIndices = sortedIndices.toList(),
                variables = mapOf("status" to "Sorted", "comparisons" to "${steps.size}")
            )
        )

        val total = steps.size
        return steps.mapIndexed { idx, s -> s.copy(stepIndex = idx, totalSteps = total) }
    }

    // 2. Selection Sort Generator
    fun generateSelectionSort(input: List<Int>): List<AlgorithmStep> {
        val steps = mutableListOf<AlgorithmStep>()
        val arr = input.toMutableList()
        val n = arr.size
        val sortedIndices = mutableListOf<Int>()

        steps.add(
            AlgorithmStep(
                stepIndex = 0,
                totalSteps = 1,
                description = "Selection Sort initial state. Ready to find minimum in unsorted segment.",
                codeLine = 1,
                arrayState = arr.toList(),
                variables = mapOf("n" to "$n")
            )
        )

        for (i in 0 until n - 1) {
            var minIdx = i
            steps.add(
                AlgorithmStep(
                    stepIndex = steps.size,
                    totalSteps = steps.size + 1,
                    description = "Starting search for minimum element in range [$i, ${n - 1}]. Initial min assumed at index $i (val ${arr[i]}).",
                    codeLine = 2,
                    arrayState = arr.toList(),
                    pivotIndex = i,
                    sortedIndices = sortedIndices.toList(),
                    variables = mapOf("i" to "$i", "min_idx" to "$minIdx", "min_val" to "${arr[minIdx]}")
                )
            )

            for (j in i + 1 until n) {
                steps.add(
                    AlgorithmStep(
                        stepIndex = steps.size,
                        totalSteps = steps.size + 1,
                        description = "Comparing arr[$j]=${arr[j]} with current minimum arr[$minIdx]=${arr[minIdx]}.",
                        codeLine = 3,
                        arrayState = arr.toList(),
                        activeIndices = listOf(j),
                        pivotIndex = minIdx,
                        sortedIndices = sortedIndices.toList(),
                        variables = mapOf("i" to "$i", "j" to "$j", "min_idx" to "$minIdx")
                    )
                )

                if (arr[j] < arr[minIdx]) {
                    minIdx = j
                    steps.add(
                        AlgorithmStep(
                            stepIndex = steps.size,
                            totalSteps = steps.size + 1,
                            description = "Found smaller element at index $minIdx (val ${arr[minIdx]})! Updating min_idx to $minIdx.",
                            codeLine = 4,
                            arrayState = arr.toList(),
                            pivotIndex = minIdx,
                            sortedIndices = sortedIndices.toList(),
                            variables = mapOf("i" to "$i", "new_min_idx" to "$minIdx", "new_min_val" to "${arr[minIdx]}")
                        )
                    )
                }
            }

            if (minIdx != i) {
                val temp = arr[i]
                arr[i] = arr[minIdx]
                arr[minIdx] = temp
                steps.add(
                    AlgorithmStep(
                        stepIndex = steps.size,
                        totalSteps = steps.size + 1,
                        description = "Swapped minimum element ${arr[i]} into its correct position at index $i with ${arr[minIdx]}.",
                        codeLine = 5,
                        arrayState = arr.toList(),
                        swappedIndices = listOf(i, minIdx),
                        sortedIndices = (sortedIndices + i).toList(),
                        variables = mapOf("swapped" to "arr[$i] <-> arr[$minIdx]")
                    )
                )
            }
            sortedIndices.add(i)
        }
        sortedIndices.add(n - 1)
        steps.add(
            AlgorithmStep(
                stepIndex = steps.size,
                totalSteps = steps.size + 1,
                description = "Selection Sort finished! Total elements sorted: $n.",
                codeLine = 6,
                arrayState = arr.toList(),
                sortedIndices = sortedIndices.toList(),
                variables = mapOf("status" to "Completed")
            )
        )
        val total = steps.size
        return steps.mapIndexed { idx, s -> s.copy(stepIndex = idx, totalSteps = total) }
    }

    // 3. Insertion Sort Generator
    fun generateInsertionSort(input: List<Int>): List<AlgorithmStep> {
        val steps = mutableListOf<AlgorithmStep>()
        val arr = input.toMutableList()
        val n = arr.size
        val sortedIndices = mutableListOf<Int>(0)

        steps.add(
            AlgorithmStep(
                stepIndex = 0,
                totalSteps = 1,
                description = "Insertion Sort: Index 0 (${arr[0]}) is trivially considered a sorted sub-list of size 1.",
                codeLine = 1,
                arrayState = arr.toList(),
                sortedIndices = sortedIndices.toList(),
                variables = mapOf("sorted_sublist" to "[${arr[0]}]")
            )
        )

        for (i in 1 until n) {
            val key = arr[i]
            var j = i - 1

            steps.add(
                AlgorithmStep(
                    stepIndex = steps.size,
                    totalSteps = steps.size + 1,
                    description = "Extract key element arr[$i] = $key to insert into sorted sublist [0..${i - 1}].",
                    codeLine = 2,
                    arrayState = arr.toList(),
                    pivotIndex = i,
                    sortedIndices = sortedIndices.toList(),
                    variables = mapOf("i" to "$i", "key" to "$key")
                )
            )

            while (j >= 0 && arr[j] > key) {
                steps.add(
                    AlgorithmStep(
                        stepIndex = steps.size,
                        totalSteps = steps.size + 1,
                        description = "arr[$j] (${arr[j]}) is greater than key ($key). Shift arr[$j] right to index ${j + 1}.",
                        codeLine = 4,
                        arrayState = arr.toList(),
                        activeIndices = listOf(j, j + 1),
                        variables = mapOf("j" to "$j", "shifting" to "${arr[j]} -> ${j + 1}")
                    )
                )
                arr[j + 1] = arr[j]
                j--
            }
            arr[j + 1] = key
            sortedIndices.add(i)

            steps.add(
                AlgorithmStep(
                    stepIndex = steps.size,
                    totalSteps = steps.size + 1,
                    description = "Inserted key ($key) into vacant position index ${j + 1}. Sublist [0..$i] is now sorted.",
                    codeLine = 6,
                    arrayState = arr.toList(),
                    swappedIndices = listOf(j + 1),
                    sortedIndices = (0..i).toList(),
                    variables = mapOf("inserted_at" to "${j + 1}", "key" to "$key")
                )
            )
        }

        steps.add(
            AlgorithmStep(
                stepIndex = steps.size,
                totalSteps = steps.size + 1,
                description = "Insertion Sort finished successfully in O(n) best-case or O(n²) worst-case.",
                codeLine = 7,
                arrayState = arr.toList(),
                sortedIndices = (0 until n).toList(),
                variables = mapOf("status" to "Sorted")
            )
        )
        val total = steps.size
        return steps.mapIndexed { idx, s -> s.copy(stepIndex = idx, totalSteps = total) }
    }

    // 4. Binary Search Generator
    fun generateBinarySearch(input: List<Int>, target: Int = 55): List<AlgorithmStep> {
        val steps = mutableListOf<AlgorithmStep>()
        val arr = input.sorted()
        var low = 0
        var high = arr.size - 1

        steps.add(
            AlgorithmStep(
                stepIndex = 0,
                totalSteps = 1,
                description = "Binary Search requires a sorted array. Searching for target value: $target. Initial search range: [0, $high].",
                codeLine = 1,
                arrayState = arr,
                targetIndex = null,
                variables = mapOf("low" to "0", "high" to "$high", "target" to "$target")
            )
        )

        var foundIndex = -1
        while (low <= high) {
            val mid = low + (high - low) / 2
            val midVal = arr[mid]

            steps.add(
                AlgorithmStep(
                    stepIndex = steps.size,
                    totalSteps = steps.size + 1,
                    description = "Computed mid = ($low + $high) / 2 = $mid. Element at mid is arr[$mid] = $midVal.",
                    codeLine = 3,
                    arrayState = arr,
                    activeIndices = listOf(low, high),
                    pivotIndex = mid,
                    variables = mapOf("low" to "$low", "mid" to "$mid", "high" to "$high", "arr[mid]" to "$midVal")
                )
            )

            if (midVal == target) {
                foundIndex = mid
                steps.add(
                    AlgorithmStep(
                        stepIndex = steps.size,
                        totalSteps = steps.size + 1,
                        description = "Target $target FOUND at index $mid! Total comparisons: ${steps.size}.",
                        codeLine = 4,
                        arrayState = arr,
                        sortedIndices = listOf(mid),
                        pivotIndex = mid,
                        variables = mapOf("result" to "FOUND at $mid", "time" to "O(log n)")
                    )
                )
                break
            } else if (midVal < target) {
                steps.add(
                    AlgorithmStep(
                        stepIndex = steps.size,
                        totalSteps = steps.size + 1,
                        description = "arr[$mid] ($midVal) < target ($target). Discarding left half [0..$mid]. Shifting low = mid + 1 (${mid + 1}).",
                        codeLine = 5,
                        arrayState = arr,
                        pivotIndex = mid,
                        variables = mapOf("new_low" to "${mid + 1}", "high" to "$high")
                    )
                )
                low = mid + 1
            } else {
                steps.add(
                    AlgorithmStep(
                        stepIndex = steps.size,
                        totalSteps = steps.size + 1,
                        description = "arr[$mid] ($midVal) > target ($target). Discarding right half [$mid..$high]. Shifting high = mid - 1 (${mid - 1}).",
                        codeLine = 7,
                        arrayState = arr,
                        pivotIndex = mid,
                        variables = mapOf("low" to "$low", "new_high" to "${mid - 1}")
                    )
                )
                high = mid - 1
            }
        }

        if (foundIndex == -1) {
            steps.add(
                AlgorithmStep(
                    stepIndex = steps.size,
                    totalSteps = steps.size + 1,
                    description = "low ($low) > high ($high). Target $target not found in the array.",
                    codeLine = 9,
                    arrayState = arr,
                    variables = mapOf("result" to "NOT FOUND")
                )
            )
        }

        val total = steps.size
        return steps.mapIndexed { idx, s -> s.copy(stepIndex = idx, totalSteps = total) }
    }

    // 5. Stack Data Structure Operations (LIFO)
    fun generateStackSteps(): List<AlgorithmStep> {
        val steps = mutableListOf<AlgorithmStep>()
        val stack = mutableListOf<String>()

        steps.add(
            AlgorithmStep(
                stepIndex = 0,
                totalSteps = 7,
                description = "Empty Stack initialized. LIFO (Last-In-First-Out) principle. Capacity = 5.",
                codeLine = 1,
                stackState = emptyList(),
                variables = mapOf("top" to "-1", "size" to "0", "capacity" to "5")
            )
        )

        val pushOps = listOf("10", "25", "42", "77")
        for (item in pushOps) {
            stack.add(item)
            steps.add(
                AlgorithmStep(
                    stepIndex = steps.size,
                    totalSteps = 7,
                    description = "PUSH($item): Pushed element '$item' onto top of stack. Top pointer incremented.",
                    codeLine = 3,
                    stackState = stack.toList(),
                    variables = mapOf("top" to "${stack.size - 1}", "top_value" to item, "size" to "${stack.size}")
                )
            )
        }

        // PEEK
        steps.add(
            AlgorithmStep(
                stepIndex = steps.size,
                totalSteps = 7,
                description = "PEEK(): Inspect top of stack without removing. Top element = '${stack.last()}'. O(1) time.",
                codeLine = 5,
                stackState = stack.toList(),
                variables = mapOf("top" to "${stack.size - 1}", "peek_value" to stack.last())
            )
        )

        // POP
        val popped1 = stack.removeAt(stack.size - 1)
        steps.add(
            AlgorithmStep(
                stepIndex = steps.size,
                totalSteps = 7,
                description = "POP(): Removed and returned top element '$popped1'. Top pointer decremented to ${stack.size - 1}.",
                codeLine = 6,
                stackState = stack.toList(),
                variables = mapOf("popped_item" to popped1, "new_top" to "${stack.size - 1}")
            )
        )

        return steps.mapIndexed { idx, s -> s.copy(stepIndex = idx, totalSteps = steps.size) }
    }

    // 6. Queue Data Structure Operations (FIFO)
    fun generateQueueSteps(): List<AlgorithmStep> {
        val steps = mutableListOf<AlgorithmStep>()
        val queue = mutableListOf<String>()

        steps.add(
            AlgorithmStep(
                stepIndex = 0,
                totalSteps = 7,
                description = "Empty Queue initialized. FIFO (First-In-First-Out) principle. Front = 0, Rear = -1.",
                codeLine = 1,
                queueState = emptyList(),
                variables = mapOf("front" to "0", "rear" to "-1", "size" to "0")
            )
        )

        val enqueueOps = listOf("A (Task 1)", "B (Task 2)", "C (Task 3)", "D (Task 4)")
        for (item in enqueueOps) {
            queue.add(item)
            steps.add(
                AlgorithmStep(
                    stepIndex = steps.size,
                    totalSteps = 7,
                    description = "ENQUEUE('$item'): Inserted at rear of queue. Rear pointer advances.",
                    codeLine = 2,
                    queueState = queue.toList(),
                    variables = mapOf("rear" to "${queue.size - 1}", "front" to "0", "size" to "${queue.size}")
                )
            )
        }

        // DEQUEUE
        val dequeued = queue.removeAt(0)
        steps.add(
            AlgorithmStep(
                stepIndex = steps.size,
                totalSteps = 7,
                description = "DEQUEUE(): Removed front item '$dequeued'. First item entered is first serviced. O(1).",
                codeLine = 4,
                queueState = queue.toList(),
                variables = mapOf("serviced_item" to dequeued, "front" to "0", "remaining" to "${queue.size}")
            )
        )

        val dequeued2 = queue.removeAt(0)
        steps.add(
            AlgorithmStep(
                stepIndex = steps.size,
                totalSteps = 7,
                description = "DEQUEUE(): Removed front item '$dequeued2'. Front now points to '${queue.first()}'.",
                codeLine = 5,
                queueState = queue.toList(),
                variables = mapOf("serviced_item" to dequeued2, "remaining" to "${queue.size}")
            )
        )

        return steps.mapIndexed { idx, s -> s.copy(stepIndex = idx, totalSteps = steps.size) }
    }

    // 7. Graph Breadth-First Search (BFS)
    fun generateGraphBfs(): List<AlgorithmStep> {
        val nodes = listOf(
            GraphNodeState("A", "A (Root)", 0.2f, 0.2f),
            GraphNodeState("B", "B", 0.5f, 0.2f),
            GraphNodeState("C", "C", 0.2f, 0.6f),
            GraphNodeState("D", "D", 0.5f, 0.6f),
            GraphNodeState("E", "E", 0.8f, 0.4f),
            GraphNodeState("F", "F", 0.8f, 0.8f)
        )
        val edges = listOf(
            GraphEdgeState("A", "B"),
            GraphEdgeState("A", "C"),
            GraphEdgeState("B", "D"),
            GraphEdgeState("B", "E"),
            GraphEdgeState("C", "D"),
            GraphEdgeState("D", "F"),
            GraphEdgeState("E", "F")
        )

        val steps = mutableListOf<AlgorithmStep>()

        // Step 0
        steps.add(
            AlgorithmStep(
                stepIndex = 0,
                totalSteps = 8,
                description = "BFS Start: Starting traversal from source node 'A'. Initialize Queue = ['A']. Mark 'A' visited.",
                codeLine = 1,
                graphNodes = nodes.map { if (it.id == "A") it.copy(status = NodeStatus.VISITING, distance = "0") else it },
                graphEdges = edges,
                queueState = listOf("A"),
                variables = mapOf("queue" to "['A']", "visited" to "{A}")
            )
        )

        // Step 1: Dequeue A, visit B & C
        steps.add(
            AlgorithmStep(
                stepIndex = 1,
                totalSteps = 8,
                description = "Dequeue 'A'. Explore adjacent unvisited neighbors of A: 'B' (dist=1) and 'C' (dist=1). Enqueue B, C.",
                codeLine = 3,
                graphNodes = nodes.map {
                    when (it.id) {
                        "A" -> it.copy(status = NodeStatus.VISITED, distance = "0")
                        "B", "C" -> it.copy(status = NodeStatus.VISITING, distance = "1")
                        else -> it
                    }
                },
                graphEdges = edges.map { if (it.from == "A" && (it.to == "B" || it.to == "C")) it.copy(isHighlighted = true) else it },
                queueState = listOf("B", "C"),
                variables = mapOf("current" to "A", "queue" to "['B', 'C']", "level" to "1")
            )
        )

        // Step 2: Dequeue B, visit D & E
        steps.add(
            AlgorithmStep(
                stepIndex = 2,
                totalSteps = 8,
                description = "Dequeue 'B'. Mark 'B' visited. Explore neighbors of B: 'D' (dist=2) and 'E' (dist=2). Enqueue D, E.",
                codeLine = 4,
                graphNodes = nodes.map {
                    when (it.id) {
                        "A" -> it.copy(status = NodeStatus.VISITED, distance = "0")
                        "B" -> it.copy(status = NodeStatus.VISITED, distance = "1")
                        "C" -> it.copy(status = NodeStatus.VISITING, distance = "1")
                        "D", "E" -> it.copy(status = NodeStatus.VISITING, distance = "2")
                        else -> it
                    }
                },
                graphEdges = edges.map { if ((it.from == "B" && (it.to == "D" || it.to == "E")) || (it.from == "A" && it.to == "C")) it.copy(isHighlighted = true) else it },
                queueState = listOf("C", "D", "E"),
                variables = mapOf("current" to "B", "queue" to "['C', 'D', 'E']", "level" to "2")
            )
        )

        // Step 3: Dequeue C
        steps.add(
            AlgorithmStep(
                stepIndex = 3,
                totalSteps = 8,
                description = "Dequeue 'C'. Neighbor 'D' is already in queue. Mark 'C' as visited.",
                codeLine = 4,
                graphNodes = nodes.map {
                    when (it.id) {
                        "C" -> it.copy(status = NodeStatus.VISITED, distance = "1")
                        else -> it
                    }
                },
                graphEdges = edges,
                queueState = listOf("D", "E"),
                variables = mapOf("current" to "C", "queue" to "['D', 'E']")
            )
        )

        // Step 4: Dequeue D, visit F
        steps.add(
            AlgorithmStep(
                stepIndex = 4,
                totalSteps = 8,
                description = "Dequeue 'D'. Mark 'D' visited. Neighbor 'F' is unvisited (dist=3). Enqueue 'F'.",
                codeLine = 5,
                graphNodes = nodes.map {
                    when (it.id) {
                        "D" -> it.copy(status = NodeStatus.VISITED, distance = "2")
                        "F" -> it.copy(status = NodeStatus.VISITING, distance = "3")
                        else -> it
                    }
                },
                graphEdges = edges.map { if (it.from == "D" && it.to == "F") it.copy(isHighlighted = true) else it },
                queueState = listOf("E", "F"),
                variables = mapOf("current" to "D", "queue" to "['E', 'F']")
            )
        )

        // Step 5: Dequeue E and F
        steps.add(
            AlgorithmStep(
                stepIndex = 5,
                totalSteps = 8,
                description = "Dequeue 'E' and 'F'. All reachable vertices visited! BFS Traversal Order: A -> B -> C -> D -> E -> F.",
                codeLine = 7,
                graphNodes = nodes.map { it.copy(status = NodeStatus.IN_PATH) },
                graphEdges = edges.map { it.copy(isHighlighted = true) },
                queueState = emptyList(),
                variables = mapOf("status" to "Completed", "time" to "O(V + E)", "space" to "O(V)")
            )
        )

        return steps
    }

    // 8. 0/1 Knapsack Dynamic Programming Table
    fun generateKnapsackDp(): List<AlgorithmStep> {
        val weights = listOf(2, 3, 4, 5)
        val values = listOf(3, 4, 5, 8)
        val capacity = 5
        val n = weights.size

        val rowHeaders = listOf("Ø (0)") + weights.mapIndexed { idx, w -> "Item ${idx + 1} (w=$w, v=${values[idx]})" }
        val colHeaders = (0..capacity).map { "W=$it" }

        val dp = Array(n + 1) { IntArray(capacity + 1) }
        val steps = mutableListOf<AlgorithmStep>()

        steps.add(
            AlgorithmStep(
                stepIndex = 0,
                totalSteps = 15,
                description = "0/1 Knapsack: Capacity W=5, 4 items available. Base case: dp[0][w] = 0 and dp[i][0] = 0.",
                codeLine = 1,
                dpTable = DpTableState(
                    rowHeaders = rowHeaders,
                    colHeaders = colHeaders,
                    matrix = dp.map { it.toList() },
                    formulaExplanation = "dp[i][w] = max value achievable with subset of first i items under weight w"
                ),
                variables = mapOf("Capacity" to "5", "Items" to "4")
            )
        )

        for (i in 1..n) {
            val w = weights[i - 1]
            val v = values[i - 1]
            for (c in 1..capacity) {
                val withoutItem = dp[i - 1][c]
                val withItem = if (c >= w) dp[i - 1][c - w] + v else -1
                val chosen = maxOf(withoutItem, withItem)
                dp[i][c] = chosen

                if (c == w || c == capacity) {
                    steps.add(
                        AlgorithmStep(
                            stepIndex = steps.size,
                            totalSteps = 15,
                            description = "Evaluating Item $i (wt=$w, val=$v) at cap $c: ${if (c >= w) "max(without=$withoutItem, with=$v + dp[${i - 1}][${c - w}] ($withItem)) = $chosen" else "Item wt > cap, carry forward $withoutItem"}.",
                            codeLine = 4,
                            dpTable = DpTableState(
                                rowHeaders = rowHeaders,
                                colHeaders = colHeaders,
                                matrix = dp.map { it.toList() },
                                activeRow = i,
                                activeCol = c,
                                formulaExplanation = if (c >= w) "dp[$i][$c] = max(dp[${i - 1}][$c], dp[${i - 1}][${c - w}] + $v) = $chosen" else "dp[$i][$c] = dp[${i - 1}][$c] = $chosen"
                            ),
                            variables = mapOf("item" to "$i", "cap" to "$c", "dp[i][w]" to "$chosen")
                        )
                    )
                }
            }
        }

        steps.add(
            AlgorithmStep(
                stepIndex = steps.size,
                totalSteps = 15,
                description = "Optimal solution found! Maximum value in Knapsack = ${dp[n][capacity]} with weight <= $capacity.",
                codeLine = 8,
                dpTable = DpTableState(
                    rowHeaders = rowHeaders,
                    colHeaders = colHeaders,
                    matrix = dp.map { it.toList() },
                    activeRow = n,
                    activeCol = capacity,
                    formulaExplanation = "Max Value = dp[4][5] = ${dp[n][capacity]}"
                ),
                variables = mapOf("max_profit" to "${dp[n][capacity]}", "time" to "O(n * W)", "space" to "O(n * W)")
            )
        )

        return steps.mapIndexed { idx, s -> s.copy(stepIndex = idx, totalSteps = steps.size) }
    }

    // 9. N-Queens Backtracking Problem (4x4)
    fun generateNQueens(n: Int = 4): List<AlgorithmStep> {
        val steps = mutableListOf<AlgorithmStep>()

        steps.add(
            AlgorithmStep(
                stepIndex = 0,
                totalSteps = 8,
                description = "4-Queens Problem: Place 4 non-attacking queens on a 4x4 chessboard using Backtracking.",
                codeLine = 1,
                queensPlacement = emptyList(),
                variables = mapOf("board_size" to "4x4", "target_queens" to "4")
            )
        )

        // Row 0: Place at Col 1
        steps.add(
            AlgorithmStep(
                stepIndex = 1,
                totalSteps = 8,
                description = "Row 0: Trying Queen at Column 1 (index 1). Safe position. Move to Row 1.",
                codeLine = 2,
                queensPlacement = listOf(1),
                variables = mapOf("row" to "0", "col" to "1", "status" to "SAFE")
            )
        )

        // Row 1: Try Col 3
        steps.add(
            AlgorithmStep(
                stepIndex = 2,
                totalSteps = 8,
                description = "Row 1: Col 0 conflicts (same diagonal), Col 1 conflicts (same column), Col 2 conflicts (diagonal). Trying Col 3: Safe!",
                codeLine = 3,
                queensPlacement = listOf(1, 3),
                variables = mapOf("row" to "1", "col" to "3", "status" to "SAFE")
            )
        )

        // Row 2: Try Col 0
        steps.add(
            AlgorithmStep(
                stepIndex = 3,
                totalSteps = 8,
                description = "Row 2: Check cols. Col 0 is safe from queens at (0,1) and (1,3). Place Queen at (2,0).",
                codeLine = 3,
                queensPlacement = listOf(1, 3, 0),
                variables = mapOf("row" to "2", "col" to "0", "status" to "SAFE")
            )
        )

        // Row 3: Try Col 2
        steps.add(
            AlgorithmStep(
                stepIndex = 4,
                totalSteps = 8,
                description = "Row 3: Check cols. Col 0 (conflict), Col 1 (conflict), Col 2 is safe! Place Queen at (3,2).",
                codeLine = 4,
                queensPlacement = listOf(1, 3, 0, 2),
                variables = mapOf("row" to "3", "col" to "2", "status" to "SOLUTION REACHED")
            )
        )

        steps.add(
            AlgorithmStep(
                stepIndex = 5,
                totalSteps = 8,
                description = "VALID SOLUTION FOUND! All 4 queens are safely placed with no horizontal, vertical, or diagonal conflicts.",
                codeLine = 6,
                queensPlacement = listOf(1, 3, 0, 2),
                variables = mapOf("positions" to "(0,1), (1,3), (2,0), (3,2)", "time" to "O(N!)")
            )
        )

        return steps.mapIndexed { idx, s -> s.copy(stepIndex = idx, totalSteps = steps.size) }
    }
}
