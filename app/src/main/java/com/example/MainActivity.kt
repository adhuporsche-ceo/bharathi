package com.example

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.*
import com.example.ui.components.*
import com.example.ui.theme.*
import kotlinx.coroutines.launch

enum class ScreenState {
    DASHBOARD,
    CATEGORY_DETAIL,
    VISUALIZER,
    MASTER_THEOREM,
    COMPARATOR
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            val systemDark = isSystemInDarkTheme()
            var isDarkMode by remember { mutableStateOf(systemDark) }

            MyApplicationTheme(darkTheme = isDarkMode) {
                MainContent(
                    isDarkMode = isDarkMode,
                    onToggleDarkMode = { isDarkMode = !isDarkMode }
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainContent(
    isDarkMode: Boolean,
    onToggleDarkMode: () -> Unit,
) {
    val context = LocalContext.current
    val sharedPrefs = remember {
        context.getSharedPreferences("bharthi_dsa_prefs", Context.MODE_PRIVATE)
    }

    // Load persisted completed algorithm IDs
    var completedAlgorithmIds by remember {
        val initialSet = sharedPrefs.getStringSet("completed_algorithms", emptySet()) ?: emptySet()
        mutableStateOf(initialSet.toSet())
    }

    fun toggleAlgorithmCompleted(algoId: String) {
        val updated = if (completedAlgorithmIds.contains(algoId)) {
            completedAlgorithmIds - algoId
        } else {
            completedAlgorithmIds + algoId
        }
        completedAlgorithmIds = updated
        sharedPrefs.edit().putStringSet("completed_algorithms", updated).apply()
    }

    var currentScreen by remember { mutableStateOf(ScreenState.DASHBOARD) }
    var selectedCategory by remember { mutableStateOf<AlgorithmCategory?>(null) }
    var selectedAlgorithm by remember { mutableStateOf<AlgorithmItem?>(null) }
    var searchQuery by remember { mutableStateOf("") }

    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val coroutineScope = rememberCoroutineScope()

    // Handle Android system back button cleanly
    BackHandler(enabled = currentScreen != ScreenState.DASHBOARD) {
        when (currentScreen) {
            ScreenState.VISUALIZER -> {
                currentScreen = if (selectedCategory != null) ScreenState.CATEGORY_DETAIL else ScreenState.DASHBOARD
            }
            ScreenState.CATEGORY_DETAIL, ScreenState.MASTER_THEOREM, ScreenState.COMPARATOR -> {
                currentScreen = ScreenState.DASHBOARD
            }
            ScreenState.DASHBOARD -> {}
        }
    }

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet(
                drawerContainerColor = MaterialTheme.colorScheme.surface,
                modifier = Modifier.width(310.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    // Drawer Header
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(38.dp)
                                .clip(RoundedCornerShape(8.dp))
                                .background(PrimaryBlue),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "B",
                                fontSize = 22.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        }
                        Column {
                            Text(
                                text = "Bharthi DSA",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                            Text(
                                text = "KCT CSE · DAA Syllabus",
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }

                    HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))

                    // Dashboard quick link
                    NavigationDrawerItem(
                        label = { Text("Home Syllabus Dashboard", fontSize = 13.sp, fontWeight = FontWeight.SemiBold) },
                        icon = { Icon(Icons.Default.Home, contentDescription = null, tint = PrimaryBlue) },
                        selected = currentScreen == ScreenState.DASHBOARD,
                        onClick = {
                            currentScreen = ScreenState.DASHBOARD
                            coroutineScope.launch { drawerState.close() }
                        }
                    )

                    // Master Theorem quick link
                    NavigationDrawerItem(
                        label = { Text("Master Theorem Solver", fontSize = 13.sp) },
                        icon = { Icon(Icons.Default.Calculate, contentDescription = null, tint = PrimaryBlue) },
                        selected = currentScreen == ScreenState.MASTER_THEOREM,
                        onClick = {
                            currentScreen = ScreenState.MASTER_THEOREM
                            coroutineScope.launch { drawerState.close() }
                        }
                    )

                    // Comparator quick link
                    NavigationDrawerItem(
                        label = { Text("Compare Mode", fontSize = 13.sp) },
                        icon = { Icon(Icons.Default.CompareArrows, contentDescription = null, tint = PrimaryBlue) },
                        selected = currentScreen == ScreenState.COMPARATOR,
                        onClick = {
                            currentScreen = ScreenState.COMPARATOR
                            coroutineScope.launch { drawerState.close() }
                        }
                    )

                    HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))

                    Text(
                        text = "16 DAA CURRICULUM CATEGORIES",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        letterSpacing = 1.sp
                    )

                    // 16 Categories Drawer List
                    LazyColumn(
                        modifier = Modifier.fillMaxWidth().weight(1f),
                        verticalArrangement = Arrangement.spacedBy(2.dp)
                    ) {
                        items(DaaRepository.categories) { cat ->
                            val isSelected = selectedCategory?.id == cat.id && currentScreen == ScreenState.CATEGORY_DETAIL
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(if (isSelected) PrimaryBlue.copy(alpha = 0.15f) else Color.Transparent)
                                    .clickable {
                                        selectedCategory = cat
                                        currentScreen = ScreenState.CATEGORY_DETAIL
                                        coroutineScope.launch { drawerState.close() }
                                    }
                                    .padding(horizontal = 8.dp, vertical = 6.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                                    modifier = Modifier.weight(1f)
                                ) {
                                    Text(
                                        text = cat.indexStr,
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = if (isSelected) PrimaryBlue else MaterialTheme.colorScheme.onSurfaceVariant,
                                        fontFamily = FontFamily.Monospace
                                    )
                                    Text(
                                        text = cat.title,
                                        fontSize = 12.sp,
                                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                                        color = if (isSelected) PrimaryBlue else MaterialTheme.colorScheme.onSurface,
                                        maxLines = 1
                                    )
                                }
                                Text(
                                    text = "${cat.lessonCount}",
                                    fontSize = 10.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }

                    // Drawer footer note (matching AlgoDrishti footer note from screenshot 1!)
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(8.dp))
                            .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
                            .padding(10.dp)
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Icon(Icons.Default.Lock, contentDescription = null, tint = PrimaryBlue, modifier = Modifier.size(16.dp))
                            Column {
                                Text(
                                    text = "Learn at your own pace.",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = MaterialTheme.colorScheme.onSurface
                                )
                                Text(
                                    text = "Your progress stays in this device.",
                                    fontSize = 10.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }
                }
            }
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(30.dp)
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(PrimaryBlue),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = "B",
                                    fontSize = 17.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White
                                )
                            }
                            Column {
                                Text(
                                    text = "Bharthi DSA Visualizer",
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Bold,
                                    maxLines = 1
                                )
                                Text(
                                    text = "Kumaraguru College of Technology (KCT)",
                                    fontSize = 10.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                    maxLines = 1
                                )
                            }
                        }
                    },
                    navigationIcon = {
                        IconButton(onClick = {
                            coroutineScope.launch { drawerState.open() }
                        }) {
                            Icon(imageVector = Icons.Default.Menu, contentDescription = "Menu")
                        }
                    },
                    actions = {
                        // Quick Compare Mode button
                        IconButton(onClick = { currentScreen = ScreenState.COMPARATOR }) {
                            Icon(
                                imageVector = Icons.Default.CompareArrows,
                                contentDescription = "Compare",
                                tint = if (currentScreen == ScreenState.COMPARATOR) PrimaryBlue else MaterialTheme.colorScheme.onSurface
                            )
                        }

                        // Master Theorem Solver button
                        IconButton(onClick = { currentScreen = ScreenState.MASTER_THEOREM }) {
                            Icon(
                                imageVector = Icons.Default.Functions,
                                contentDescription = "Master Theorem",
                                tint = if (currentScreen == ScreenState.MASTER_THEOREM) PrimaryBlue else MaterialTheme.colorScheme.onSurface
                            )
                        }

                        // Theme Toggle button
                        IconButton(onClick = onToggleDarkMode) {
                            Icon(
                                imageVector = if (isDarkMode) Icons.Default.LightMode else Icons.Default.DarkMode,
                                contentDescription = "Toggle Theme"
                            )
                        }
                    },
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = MaterialTheme.colorScheme.surface,
                        titleContentColor = MaterialTheme.colorScheme.onSurface
                    )
                )
            }
        ) { innerPadding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .background(MaterialTheme.colorScheme.background)
                    .padding(horizontal = 14.dp, vertical = 8.dp)
            ) {
                when (currentScreen) {
                    ScreenState.DASHBOARD -> {
                        HeroDashboard(
                            completedCount = completedAlgorithmIds.size,
                            categories = DaaRepository.categories,
                            searchQuery = searchQuery,
                            onSearchQueryChange = { searchQuery = it },
                            onExploreBubbleSort = {
                                selectedAlgorithm = DaaRepository.getAlgorithmById("bubble_sort")
                                selectedCategory = DaaRepository.getCategoryById("cat_sorting")
                                currentScreen = ScreenState.VISUALIZER
                            },
                            onCategoryClick = { category ->
                                selectedCategory = category
                                currentScreen = ScreenState.CATEGORY_DETAIL
                            },
                            onMasterTheoremClick = {
                                currentScreen = ScreenState.MASTER_THEOREM
                            },
                            onCompareClick = {
                                currentScreen = ScreenState.COMPARATOR
                            }
                        )
                    }

                    ScreenState.CATEGORY_DETAIL -> {
                        val currentCat = selectedCategory ?: DaaRepository.categories.first()
                        val catAlgos = DaaRepository.getAlgorithmsForCategory(currentCat.id)
                        CategoryDetailView(
                            category = currentCat,
                            algorithms = catAlgos,
                            completedIds = completedAlgorithmIds,
                            onAlgorithmClick = { algo ->
                                selectedAlgorithm = algo
                                currentScreen = ScreenState.VISUALIZER
                            },
                            onBackClick = {
                                currentScreen = ScreenState.DASHBOARD
                            }
                        )
                    }

                    ScreenState.VISUALIZER -> {
                        val algo = selectedAlgorithm ?: DaaRepository.algorithms.first()
                        VisualizerScreen(
                            algorithm = algo,
                            isCompleted = completedAlgorithmIds.contains(algo.id),
                            onToggleCompleted = {
                                toggleAlgorithmCompleted(algo.id)
                            },
                            onBackClick = {
                                currentScreen = if (selectedCategory != null) ScreenState.CATEGORY_DETAIL else ScreenState.DASHBOARD
                            }
                        )
                    }

                    ScreenState.MASTER_THEOREM -> {
                        Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                IconButton(onClick = { currentScreen = ScreenState.DASHBOARD }) {
                                    Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back", tint = PrimaryBlue)
                                }
                                Text(
                                    text = "Unit 1: Recurrence Analysis",
                                    fontSize = 18.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                            MasterTheoremSolver()
                        }
                    }

                    ScreenState.COMPARATOR -> {
                        Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                IconButton(onClick = { currentScreen = ScreenState.DASHBOARD }) {
                                    Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back", tint = PrimaryBlue)
                                }
                                Text(
                                    text = "Synchronized Algorithm Comparator",
                                    fontSize = 18.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                            AlgorithmComparatorView()
                        }
                    }
                }
            }
        }
    }
}
