var C012_AfterClass_Roommates_CurrentStage = 0;
var C012_AfterClass_Roommates_SidneyAvail = false;
var C012_AfterClass_Roommates_EmptyDorm = true;

// Chapter 12 After Class - Roommates Load
function C012_AfterClass_Roommates_Load() {
	
	// Loads the scene to search in the wardrobe
	LoadInteractions();
	LeaveIcon = "";
	LeaveScreen = "";
	C012_AfterClass_Roommates_CurrentStage = 0;

}

// Chapter 12 After Class - Roommates Run
function C012_AfterClass_Roommates_Run() {
	BuildInteraction(C012_AfterClass_Roommates_CurrentStage);
	if (CurrentActor != "") {
		DrawActor(CurrentActor, 500, 0, 1.3333);
	}
}

// Chapter 12 After Class - Roommates Click
function C012_AfterClass_Roommates_Click() {	

	// Regular interactions
	ClickInteraction(C012_AfterClass_Roommates_CurrentStage);

}

// Chapter 12 After Class - When the player leaves the roommates
function C012_AfterClass_Roommates_Leave() {
	CurrentTime = CurrentTime + 110000;
	SetScene(CurrentChapter, "Dorm");
}

// Chapter 12 After Class - Wait for a while and recalculate who's in the roommates
function C012_AfterClass_Roommates_Knock() {
}

// Chapter 12 After Class - Meets Sidney
function C012_AfterClass_Roommates_SidneyStart() {
	ActorLoad("Sidney", "");
	ActorSetCloth("Shorts");
	ActorSetPose("Neutral");
	LeaveIcon = "";
}
