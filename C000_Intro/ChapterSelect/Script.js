var C000_Intro_ChapterSelect_CurrentStage = 0;

// Chapter Select Load
function C000_Intro_ChapterSelect_Load() {
	LeaveIcon = "";
	LeaveScreen = "";
	LoadInteractions();
	StopTimer(7.6666667 * 60 * 60 * 1000);
}

// Chapter Select Run
function C000_Intro_ChapterSelect_Run() {
	BuildInteraction(C000_Intro_ChapterSelect_CurrentStage);
}

// Chapter Select Click
function C000_Intro_ChapterSelect_Click() {	
	ClickInteraction(C000_Intro_ChapterSelect_CurrentStage);
	StopTimer(7.6666667 * 60 * 60 * 1000);
}

// When the user selects a chapter, we load the intro for it
function C000_Intro_ChapterSelect_LoadChapter(ChapterToLoad) {
	C000_Intro_CreatePlayer_ChapterToLoad = ChapterToLoad;
	SetScene(CurrentChapter, "CreatePlayer");
}

// When the user selects a new language, we keep it and save it
function C000_Intro_ChapterSelect_SetLanguage(NewLanguageTag) {
	CurrentLanguageTag = NewLanguageTag;
	localStorage.setItem("CurrentLanguageTag", CurrentLanguageTag);
	LoadInteractions();
}

// When the user wants to load, we call the load screen
function C000_Intro_ChapterSelect_LoadScreen() {
	SetScene("C999_Common", "GameLoad");
}
