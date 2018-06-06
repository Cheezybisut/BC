var C012_AfterClass_Pub_CurrentStage = 0;
var C012_AfterClass_Pub_SidneyAvail = false;
var C012_AfterClass_Pub_EmptyPub = true;

// Calculates who's in the pub depending on the time of the day
function C012_AfterClass_Pub_WhoInIsPub() {

	// Sets who's at the pub at what time
	C012_AfterClass_Pub_SidneyAvail = ((CurrentTime >= 17 * 60 * 60 * 1000) && (CurrentTime <= 19 * 60 * 60 * 1000));
	C012_AfterClass_Pub_EmptyPub = (!C012_AfterClass_Pub_SidneyAvail);

}

// Chapter 12 After Class - Pub Load
function C012_AfterClass_Pub_Load() {
	
	// Loads the scene to search in the wardrobe
	LoadInteractions();
	LeaveIcon = "";
	LeaveScreen = "";
	C012_AfterClass_Pub_CurrentStage = 0;
	C012_AfterClass_Pub_WhoInIsPub();

}

// Chapter 12 After Class - Pub Run
function C012_AfterClass_Pub_Run() {
	BuildInteraction(C012_AfterClass_Pub_CurrentStage);
	if (CurrentActor != "") {
		DrawActor(CurrentActor, 500, 0, 1.3333);
		DrawImage(CurrentChapter + "/" + CurrentScreen + "/PubCounter.jpg", 600, 500);
	}
}

// Chapter 12 After Class - Pub Click
function C012_AfterClass_Pub_Click() {	

	// Regular interactions
	ClickInteraction(C012_AfterClass_Pub_CurrentStage);

}

// Chapter 12 After Class - When the player leaves the pub
function C012_AfterClass_Pub_Leave() {
	CurrentTime = CurrentTime + 290000;
	SetScene(CurrentChapter, "Dorm");
}

// Chapter 12 After Class - Wait for a while and recalculate who's in the pub
function C012_AfterClass_Pub_Wait() {
	CurrentTime = CurrentTime + 290000;	
	C012_AfterClass_Pub_WhoInIsPub();
}

// Chapter 12 After Class - Meets Sidney
function C012_AfterClass_Pub_SidneyStart() {
	ActorLoad("Sidney", "");
	ActorSetCloth("Shorts");
	ActorSetPose("Neutral");
	LeaveIcon = "";
}
