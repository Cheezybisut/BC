var C000_Intro_ChapterSelect_CurrentStage = 0;
var C000_Intro_ChapterSelect_CreditMode = false;
var C000_Intro_ChapterSelect_CreditPosition = 0;
var C000_Intro_ChapterSelect_Credits = [];
var C000_Intro_ChapterSelect_CreditActors = ["Player", "Amanda", "Sarah", "Sidney", "Jennifer", "Julia", "Yuki"];

// Chapter Select Load
function C000_Intro_ChapterSelect_Load() {
	LeaveIcon = "";
	LeaveScreen = "";
	LoadInteractions();
	ReadCSV("C000_Intro_ChapterSelect_Credits", CurrentChapter + "/" + CurrentScreen + "/GameCredits.csv");
	StopTimer(7.6666667 * 60 * 60 * 1000);
}

// Draw the credits 
function C000_Intro_ChapterSelect_DrawCredits() {

	// For each credits in the list
	var C;
	for(C = 0; C < C000_Intro_ChapterSelect_Credits.length; C++) {

		// Sets the Y position (it scrolls from bottom to top)
		var Y = 585 - C000_Intro_ChapterSelect_CreditPosition + (C * 40);

		// Draw the text if it's in drawing range
		if ((Y > 15) && (Y <= 585)) {

			// The "CreditTypeRepeat" starts scrolling again, other credit types are translated
			var Cred = C000_Intro_ChapterSelect_Credits[C][0];
			if (Cred == "CreditTypeRepeat") {
				C000_Intro_ChapterSelect_CreditPosition = 0;
				return;
			} else {
				if (Cred.substr(0, 10) == "CreditType") DrawText(GetText(Cred), 800, Y, "black");
				else DrawText(Cred, 800, Y, "black");
			}

			// Draw one of the main actors in the credit rolls
			DrawImageZoom("Actors/" + C000_Intro_ChapterSelect_CreditActors[Math.floor(C000_Intro_ChapterSelect_CreditPosition / 200) % C000_Intro_ChapterSelect_CreditActors.length] + "/Clothed_NoBondage_NoGag.png", 0, 0, 600, 900, 900, 0, 600 * 0.65, 900 * 0.65);

		}

	}

}

// Chapter Select Run
function C000_Intro_ChapterSelect_Run() {
	BuildInteraction(C000_Intro_ChapterSelect_CurrentStage);
	if (C000_Intro_ChapterSelect_CreditMode) {
		DrawRect(600, 0, 1200, 600, "white");
		if (C000_Intro_ChapterSelect_Credits.length > 1) C000_Intro_ChapterSelect_DrawCredits();
		C000_Intro_ChapterSelect_CreditPosition++;
	}
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

// When the game credit should roll or stop
function C000_Intro_ChapterSelect_RollCredits() {
	C000_Intro_ChapterSelect_CreditMode = !C000_Intro_ChapterSelect_CreditMode;
	C000_Intro_ChapterSelect_CreditPosition = 0;
}