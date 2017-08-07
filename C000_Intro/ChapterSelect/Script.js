var C000_Intro_ChapterSelect_CurrentStage = 0;

// Chapter Select Load
function C000_Intro_ChapterSelect_Load() {
	LeaveIcon = "";
	LeaveScreen = "";
	LoadInteractions();
}

// Chapter Select Run
function C000_Intro_ChapterSelect_Run() {
	BuildInteraction(C000_Intro_ChapterSelect_CurrentStage);
}

// Chapter Select Click
function C000_Intro_ChapterSelect_Click() {	
	ClickInteraction(C000_Intro_ChapterSelect_CurrentStage);
}

// When the user selects a chapter, we load the intro for it
function C000_Intro_ChapterSelect_LoadChapter(ChapterToLoad) {
	SetScene(ChapterToLoad, "Intro");
}

// When the user wants to load, we call the load screen
function C000_Intro_ChapterSelect_LoadScreen() {
	SetScene("C999_Common", "GameLoad");
}
